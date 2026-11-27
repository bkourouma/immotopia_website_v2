// Conversion du formulaire d'administration d'un événement en données validées (et inversement pour pré-remplir).

import type { EventInput } from "./service.ts";
import { isValidTimeZone, utcToZonedInput, zonedToUtc } from "./time.ts";
import type { EventRecord, ProgramItem } from "./types.ts";
import { clean, safeImage, SLUG_RE } from "./validation.ts";

const lines = (v: string, max = 200) =>
  v.split(/\r?\n/).map((l) => clean(l, max)).filter(Boolean).slice(0, 40);

export function parseEventForm(f: FormData): { ok: true; data: EventInput } | { ok: false; errors: string[] } {
  const get = (k: string, max = 200) => clean(f.get(k), max);
  const errors: string[] = [];

  const slug = get("slug", 80).toLowerCase();
  if (!SLUG_RE.test(slug)) errors.push("L'adresse (slug) ne peut contenir que des minuscules, chiffres et tirets.");
  const title = get("title", 160);
  if (title.length < 3) errors.push("Le titre est obligatoire.");

  const timezone = get("timezone", 60) || "Africa/Abidjan";
  if (!isValidTimeZone(timezone)) errors.push("Fuseau horaire inconnu (ex. Africa/Abidjan).");
  const startsAt = isValidTimeZone(timezone) ? zonedToUtc(get("startsLocal", 20), timezone) : null;
  const endsAt = isValidTimeZone(timezone) ? zonedToUtc(get("endsLocal", 20), timezone) : null;
  if (!startsAt) errors.push("La date de début est invalide.");
  if (!endsAt) errors.push("La date de fin est invalide.");
  if (startsAt && endsAt && endsAt <= startsAt) errors.push("La fin doit être après le début.");

  const capacity = Number(get("capacity", 6));
  if (!Number.isInteger(capacity) || capacity < 0 || capacity > 100000) errors.push("La capacité doit être un entier positif.");
  const directSeats = Number(get("directSeats", 6) || 0);
  if (!Number.isInteger(directSeats) || directSeats < 0 || directSeats > 100000) errors.push("Le nombre d'inscrits directs doit être un entier positif.");
  const maxPerCompany = Number(get("maxPerCompany", 4) || 0);
  if (!Number.isInteger(maxPerCompany) || maxPerCompany < 0 || maxPerCompany > 1000) errors.push("Le plafond par entreprise doit être un entier positif (0 = illimité).");
  const retentionMonths = Number(get("retentionMonths", 4) || 24);
  if (!Number.isInteger(retentionMonths) || retentionMonths < 1 || retentionMonths > 120) errors.push("La durée de conservation doit être de 1 à 120 mois.");

  const image = safeImage(get("image", 300));
  if (get("image", 300) && !image) errors.push("L'image doit être un chemin du site (/images/…) ou une URL https.");

  const program: ProgramItem[] = lines(get("program", 4000).replace(/\n/g, "\n"), 200)
    .map((l) => {
      const [time, ...rest] = l.split("|");
      return { time: clean(time, 40), label: clean(rest.join("|"), 160) };
    })
    .filter((p) => p.time && p.label);

  const oneOf = <T extends string>(k: string, allowed: readonly T[], fallback: T): T => {
    const v = get(k, 30);
    return (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
  };

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      slug,
      title,
      theme: get("theme", 300),
      tagline: get("tagline", 300),
      description: clean(f.get("description"), 6000).replace(/ ?\n ?/g, "\n"),
      organizer: get("organizer", 120),
      solution: get("solution", 120),
      startsAt: startsAt!,
      endsAt: endsAt!,
      timezone,
      venueName: get("venueName", 120),
      venueCity: get("venueCity", 80),
      venueDistrict: get("venueDistrict", 80),
      venueStatus: oneOf("venueStatus", ["provisional", "confirmed"] as const, "provisional"),
      capacity,
      directSeats,
      maxPerCompany,
      waitlistEnabled: f.get("waitlistEnabled") === "on",
      showRemaining: f.get("showRemaining") === "on",
      feeLabel: get("feeLabel", 120) || "Gratuit, sur inscription",
      publicationStatus: oneOf("publicationStatus", ["draft", "published", "archived"] as const, "draft"),
      registrationStatus: oneOf("registrationStatus", ["open", "closed"] as const, "open"),
      cancelled: f.get("cancelled") === "on",
      image,
      audience: lines(get("audience", 4000)),
      topics: lines(get("topics", 4000)),
      program,
      practicalInfo: clean(f.get("practicalInfo"), 2000),
      promo: { visible: f.get("promoVisible") === "on", title: get("promoTitle", 120), items: lines(get("promoItems", 4000)), note: get("promoNote", 200) },
      retentionMonths,
    },
  };
}

export function eventToFormValues(e: EventRecord) {
  return {
    ...e,
    startsLocal: utcToZonedInput(e.startsAt, e.timezone),
    endsLocal: utcToZonedInput(e.endsAt, e.timezone),
    audienceText: e.audience.join("\n"),
    topicsText: e.topics.join("\n"),
    programText: e.program.map((p) => `${p.time} | ${p.label}`).join("\n"),
    promoItemsText: e.promo.items.join("\n"),
  };
}
