"use server";

// Actions d'administration des événements. Chacune revérifie la session (cookie signé) : jamais de confiance dans la page.
// Les actions sensibles sont journalisées (event_audit_log) sans donnée personnelle (références seulement).
// CSRF : les Server Actions vérifient Origin/Host (Next) et le cookie est SameSite=Strict.

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, checkPassword, createSessionToken, SESSION_MS, verifySessionToken } from "@/lib/events/auth";
import { renderEmail, sendEmail } from "@/lib/events/email";
import { parseEventForm } from "@/lib/events/event-form";
import { allow, clientIp } from "@/lib/events/rate-limit";
import { matinales } from "@/lib/events/seed-data";
import {
  audit,
  cancelRegistration,
  confirmRegistration,
  createEvent,
  deleteRegistration,
  getEventById,
  getRegistration,
  setAttendance,
  setEventFlag,
  slugTaken,
  updateEvent,
  upsertEventBySlug,
} from "@/lib/events/service";
import { SITE_URL } from "@/lib/site";

const BASE = "/admin/evenements";

async function requireAdmin() {
  if (!verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value)) redirect(BASE);
}

const back = (path: string, msg: string, kind: "ok" | "err" = "ok"): never => redirect(`${path}${path.includes("?") ? "&" : "?"}${kind}=${encodeURIComponent(msg)}`);

export async function login(formData: FormData) {
  if (!adminConfigured()) back(BASE, "Administration non configurée sur ce serveur.", "err");
  const ip = clientIp(await headers());
  if (!allow(`login:${ip}`, 5, 15 * 60 * 1000)) back(BASE, "Trop de tentatives. Réessayez dans 15 minutes.", "err");
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    audit("login_failed", "", "", "inconnu");
    back(BASE, "Mot de passe incorrect.", "err");
  }
  (await cookies()).set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MS / 1000,
  });
  audit("login");
  redirect(BASE);
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect(BASE);
}

export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = parseEventForm(formData);
  const path = id ? `${BASE}/${id}` : `${BASE}/nouveau`;
  if (!parsed.ok) back(path, parsed.errors.join(" "), "err");
  else {
    if (slugTaken(parsed.data.slug, id || undefined)) back(path, "Cette adresse (slug) est déjà utilisée.", "err");
    if (id) {
      const before = getEventById(id);
      const updated = updateEvent(id, parsed.data);
      if (!updated) back(BASE, "Événement introuvable.", "err");
      audit("event_update", parsed.data.slug, before && before.publicationStatus !== parsed.data.publicationStatus ? `publication : ${before.publicationStatus} → ${parsed.data.publicationStatus}` : "");
      back(path, "Événement enregistré.");
    } else {
      const created = createEvent(parsed.data);
      audit("event_create", created.slug);
      back(`${BASE}/${created.id}`, "Événement créé.");
    }
  }
}

/** Boutons rapides : publier, dépublier, archiver, ouvrir/fermer les inscriptions, annuler l'événement, lieu confirmé. */
export async function quickEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const op = String(formData.get("op"));
  const ev = getEventById(id);
  if (!ev) back(BASE, "Événement introuvable.", "err");
  const path = `${BASE}/${id}`;
  switch (op) {
    case "publish": setEventFlag(id, { publicationStatus: "published" }); break;
    case "unpublish": setEventFlag(id, { publicationStatus: "draft" }); break;
    case "archive": setEventFlag(id, { publicationStatus: "archived" }); break;
    case "open": setEventFlag(id, { registrationStatus: "open" }); break;
    case "close": setEventFlag(id, { registrationStatus: "closed" }); break;
    case "cancel": setEventFlag(id, { cancelled: true }); break;
    case "uncancel": setEventFlag(id, { cancelled: false }); break;
    case "venue_confirmed": setEventFlag(id, { venueStatus: "confirmed" }); break;
    case "venue_provisional": setEventFlag(id, { venueStatus: "provisional" }); break;
    case "capacity": {
      const n = Number(formData.get("capacity"));
      if (!Number.isInteger(n) || n < 0 || n > 100000) back(path, "Capacité invalide.", "err");
      setEventFlag(id, { capacity: n });
      audit("event_capacity", ev!.slug, `capacité : ${ev!.capacity} → ${n}`);
      back(path, "Capacité mise à jour.");
      break;
    }
    default: back(path, "Action inconnue.", "err");
  }
  audit(`event_${op}`, ev!.slug);
  back(path, "Modification enregistrée.");
}

export async function registrationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const op = String(formData.get("op"));
  const returnTo = String(formData.get("returnTo") || BASE);
  const safeReturn = returnTo.startsWith(`${BASE}/`) ? returnTo : BASE;
  const reg = getRegistration(id);
  if (!reg) back(safeReturn, "Inscription introuvable.", "err");
  const event = getEventById(reg!.eventId)!;
  const mail = (kind: "confirmation" | "cancellation", r: NonNullable<typeof reg>) => void sendEmail(renderEmail(kind, event, r, SITE_URL));

  switch (op) {
    case "confirm": {
      const r = confirmRegistration(id, formData.get("force") === "on");
      if (!r.ok) back(safeReturn, r.code === "no_capacity" ? "Capacité atteinte : augmentez-la ou forcez la confirmation." : "Doublon : une inscription active existe déjà pour cet e-mail.", "err");
      else mail("confirmation", r.registration);
      break;
    }
    case "cancel": {
      const r = cancelRegistration(id);
      if (r && reg!.status !== "cancelled") mail("cancellation", r);
      break;
    }
    case "present": setAttendance(id, "present"); break;
    case "absent": setAttendance(id, "absent"); break;
    case "unknown": setAttendance(id, "unknown"); break;
    case "delete":
      if (formData.get("confirmDelete") !== "on") back(safeReturn, "Cochez la case pour confirmer la suppression définitive.", "err");
      deleteRegistration(id);
      break;
    default: back(safeReturn, "Action inconnue.", "err");
  }
  audit(`registration_${op}`, reg!.reference, event.slug);
  back(safeReturn, "Inscription mise à jour.");
}

/** Insère « Les Matinales de l'Immobilier Digital » si elle n'existe pas (idempotent ; ne touche pas à une version existante). */
export async function seedFirstEvent() {
  await requireAdmin();
  const { event, action } = upsertEventBySlug(matinales);
  audit("seed", event.slug, action);
  back(`${BASE}/${event.id}`, action === "created" ? "Événement initial créé (brouillon)." : "L'événement initial existe déjà : rien n'a été modifié.");
}
