// Logique métier des événements : lecture, inscription (capacité, doublons, liste d'attente), administration, purge.
// Fichier serveur uniquement. Toutes les écritures sensibles passent par `transaction()` (verrou d'écriture SQLite) :
// deux inscriptions simultanées sur la dernière place sont sérialisées, la seconde part en liste d'attente.

import { randomBytes, randomUUID } from "node:crypto";
import type { DatabaseSync } from "node:sqlite";
import { getDb, transaction } from "./db.ts";
import type {
  Attendance,
  EventPhase,
  EventRecord,
  EventStats,
  Promo,
  ProgramItem,
  RegistrationRecord,
  RegistrationStatus,
} from "./types.ts";
import { companyKey, type RegistrationInput } from "./validation.ts";

export const POLICY_VERSION = "2026-11";
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans 0/O/1/I

type Row = Record<string, unknown>;

function json<T>(value: unknown, fallback: T): T {
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return fallback;
  }
}

function toEvent(r: Row): EventRecord {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    theme: String(r.theme),
    tagline: String(r.tagline),
    description: String(r.description),
    organizer: String(r.organizer),
    solution: String(r.solution),
    startsAt: String(r.starts_at),
    endsAt: String(r.ends_at),
    timezone: String(r.timezone),
    venueName: String(r.venue_name),
    venueCity: String(r.venue_city),
    venueDistrict: String(r.venue_district),
    venueStatus: r.venue_status as EventRecord["venueStatus"],
    capacity: Number(r.capacity),
    maxPerCompany: Number(r.max_per_company),
    waitlistEnabled: r.waitlist_enabled === 1,
    showRemaining: r.show_remaining === 1,
    feeLabel: String(r.fee_label),
    publicationStatus: r.publication_status as EventRecord["publicationStatus"],
    registrationStatus: r.registration_status as EventRecord["registrationStatus"],
    cancelled: r.cancelled === 1,
    image: String(r.image),
    audience: json<string[]>(r.audience, []),
    topics: json<string[]>(r.topics, []),
    program: json<ProgramItem[]>(r.program, []),
    practicalInfo: String(r.practical_info),
    promo: json<Promo>(r.promo, { visible: false, title: "", items: [], note: "" }),
    retentionMonths: Number(r.retention_months),
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
  };
}

function toRegistration(r: Row): RegistrationRecord {
  return {
    id: String(r.id),
    reference: String(r.reference),
    eventId: String(r.event_id),
    fullName: String(r.full_name),
    company: String(r.company),
    jobTitle: String(r.job_title),
    email: String(r.email),
    phone: String(r.phone),
    activity: String(r.activity),
    seats: Number(r.seats),
    comment: String(r.comment),
    status: r.status as RegistrationStatus,
    waitlistReason: (r.waitlist_reason as "" | "capacity" | "company") ?? "",
    attendance: r.attendance as Attendance,
    cancelToken: String(r.cancel_token),
    marketingConsentAt: (r.marketing_at as string | null) ?? null,
    processingConsentAt: (r.processing_at as string | null) ?? null,
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
    cancelledAt: (r.cancelled_at as string | null) ?? null,
  };
}

const REG_SELECT = `SELECT r.*,
  (SELECT granted_at FROM event_consents c WHERE c.registration_id = r.id AND c.kind = 'marketing' ORDER BY id DESC LIMIT 1) AS marketing_at,
  (SELECT granted_at FROM event_consents c WHERE c.registration_id = r.id AND c.kind = 'processing' ORDER BY id DESC LIMIT 1) AS processing_at
  FROM event_registrations r`;

// ---------- Lecture des événements ----------

export function getEventBySlug(slug: string): EventRecord | null {
  const r = getDb().prepare("SELECT * FROM events WHERE slug = ?").get(slug);
  return r ? toEvent(r) : null;
}

export function getEventById(id: string): EventRecord | null {
  const r = getDb().prepare("SELECT * FROM events WHERE id = ?").get(id);
  return r ? toEvent(r) : null;
}

/** Événements visibles publiquement (publiés ou archivés), les plus proches d'abord pour le futur. */
export function listPublicEvents(): EventRecord[] {
  return getDb()
    .prepare("SELECT * FROM events WHERE publication_status IN ('published','archived') ORDER BY starts_at DESC")
    .all()
    .map(toEvent);
}

export function listAllEvents(): EventRecord[] {
  return getDb().prepare("SELECT * FROM events ORDER BY starts_at DESC").all().map(toEvent);
}

function seatSum(db: DatabaseSync, eventId: string, status: RegistrationStatus): number {
  const r = db.prepare("SELECT COALESCE(SUM(seats),0) AS n FROM event_registrations WHERE event_id = ? AND status = ?").get(eventId, status) as { n: number };
  return Number(r.n);
}

export function getStats(eventId: string): EventStats {
  const db = getDb();
  const ev = db.prepare("SELECT capacity FROM events WHERE id = ?").get(eventId) as { capacity: number } | undefined;
  const confirmedSeats = seatSum(db, eventId, "confirmed");
  const waitlistSeats = seatSum(db, eventId, "waitlist");
  const count = (status: string) => Number((db.prepare("SELECT COUNT(*) AS n FROM event_registrations WHERE event_id = ? AND status = ?").get(eventId, status) as { n: number }).n);
  const att = (a: Attendance) =>
    Number((db.prepare("SELECT COALESCE(SUM(seats),0) AS n FROM event_registrations WHERE event_id = ? AND status = 'confirmed' AND attendance = ?").get(eventId, a) as { n: number }).n);
  const byActivity = db
    .prepare("SELECT activity, SUM(seats) AS count FROM event_registrations WHERE event_id = ? AND status <> 'cancelled' GROUP BY activity ORDER BY count DESC")
    .all(eventId)
    .map((r) => ({ activity: String(r.activity), count: Number(r.count) }));
  const confirmedRegistrations = count("confirmed");
  const waitlistRegistrations = count("waitlist");
  return {
    confirmedSeats,
    waitlistSeats,
    remaining: Math.max(0, (ev?.capacity ?? 0) - confirmedSeats),
    registrations: confirmedRegistrations + waitlistRegistrations,
    confirmedRegistrations,
    waitlistRegistrations,
    cancelledRegistrations: count("cancelled"),
    present: att("present"),
    absent: att("absent"),
    byActivity,
  };
}

/** État d'inscription affiché au public. */
export function eventPhase(event: EventRecord, stats: Pick<EventStats, "remaining">, now = Date.now()): EventPhase {
  if (event.cancelled) return "cancelled";
  if (Date.parse(event.endsAt) < now || event.publicationStatus === "archived") return "past";
  if (event.registrationStatus === "closed") return "closed";
  if (stats.remaining <= 0) return event.waitlistEnabled ? "waitlist" : "full";
  return "open";
}

// ---------- Inscription ----------

export type RegisterResult =
  | { ok: true; registration: RegistrationRecord; event: EventRecord }
  | { ok: false; code: "not_found" | "closed" | "duplicate" | "full" | "company_limit" };

function newReference(db: DatabaseSync): string {
  for (let i = 0; i < 10; i++) {
    const bytes = randomBytes(8);
    const ref = "EVT-" + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
    if (!db.prepare("SELECT 1 FROM event_registrations WHERE reference = ?").get(ref)) return ref;
  }
  throw new Error("Impossible de générer une référence unique");
}

export function registerForEvent(slug: string, input: RegistrationInput, now = new Date()): RegisterResult {
  return transaction((db) => {
    const row = db.prepare("SELECT * FROM events WHERE slug = ?").get(slug);
    if (!row) return { ok: false, code: "not_found" } as const;
    const event = toEvent(row);
    if (event.publicationStatus !== "published" || event.cancelled || event.registrationStatus !== "open" || Date.parse(event.endsAt) < now.getTime()) {
      return { ok: false, code: event.publicationStatus === "published" ? "closed" : "not_found" } as const;
    }
    const dup = db.prepare("SELECT 1 FROM event_registrations WHERE event_id = ? AND email = ? AND status <> 'cancelled'").get(event.id, input.email);
    if (dup) return { ok: false, code: "duplicate" } as const;

    // Les places déjà promises (confirmées) + celles demandées ne doivent jamais dépasser la capacité.
    const taken = seatSum(db, event.id, "confirmed");
    // File d'attente « complet » existante : on ne la double pas (la file « entreprise » ne bloque personne d'autre)
    const queued = Number((db.prepare("SELECT COALESCE(SUM(seats),0) AS n FROM event_registrations WHERE event_id = ? AND status = 'waitlist' AND waitlist_reason = 'capacity'").get(event.id) as { n: number }).n);
    const fits = taken + input.seats <= event.capacity && !(event.waitlistEnabled && queued > 0);
    // Plafond par entreprise : nombre d'inscriptions actives (confirmées ou en attente) de la même entreprise
    const key = companyKey(input.company);
    const sameCompany = Number((db.prepare("SELECT COUNT(*) AS n FROM event_registrations WHERE event_id = ? AND company_key = ? AND status <> 'cancelled'").get(event.id, key) as { n: number }).n);
    const companyFull = event.maxPerCompany > 0 && key !== "" && sameCompany >= event.maxPerCompany;
    let status: RegistrationStatus = "confirmed";
    let waitlistReason: "" | "capacity" | "company" = "";
    if (companyFull || !fits) {
      if (!event.waitlistEnabled) return { ok: false, code: companyFull ? "company_limit" : "full" } as const;
      status = "waitlist";
      waitlistReason = companyFull ? "company" : "capacity";
    }

    const id = randomUUID();
    const ts = now.toISOString();
    const reference = newReference(db);
    db.prepare(
      `INSERT INTO event_registrations (id, reference, event_id, full_name, company, job_title, email, phone, activity, seats, comment, status, waitlist_reason, company_key, cancel_token, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    ).run(id, reference, event.id, input.fullName, input.company, input.jobTitle, input.email, input.phone, input.activity, input.seats, input.comment, status, waitlistReason, key, randomBytes(18).toString("base64url"), ts, ts);
    const consent = db.prepare("INSERT INTO event_consents (registration_id, kind, granted_at, policy_version) VALUES (?,?,?,?)");
    consent.run(id, "processing", ts, POLICY_VERSION);
    if (input.consentMarketing) consent.run(id, "marketing", ts, POLICY_VERSION);

    const registration = toRegistration(db.prepare(`${REG_SELECT} WHERE r.id = ?`).get(id)!);
    return { ok: true, registration, event } as const;
  });
}

export function getRegistrationByReference(reference: string): RegistrationRecord | null {
  const r = getDb().prepare(`${REG_SELECT} WHERE r.reference = ?`).get(reference);
  return r ? toRegistration(r) : null;
}

export function getRegistration(id: string): RegistrationRecord | null {
  const r = getDb().prepare(`${REG_SELECT} WHERE r.id = ?`).get(id);
  return r ? toRegistration(r) : null;
}

export type RegistrationFilter = { q?: string; activity?: string; status?: string };

export function listRegistrations(eventId: string, filter: RegistrationFilter = {}): RegistrationRecord[] {
  const where = ["r.event_id = ?"];
  const args: (string | number)[] = [eventId];
  if (filter.q) {
    const like = `%${filter.q.replace(/[%_\\]/g, (c) => "\\" + c)}%`;
    where.push("(r.full_name LIKE ? ESCAPE '\\' OR r.company LIKE ? ESCAPE '\\' OR r.email LIKE ? ESCAPE '\\')");
    args.push(like, like, like);
  }
  if (filter.activity) {
    where.push("r.activity = ?");
    args.push(filter.activity);
  }
  if (filter.status) {
    if (filter.status === "present" || filter.status === "absent") {
      where.push("r.attendance = ? AND r.status = 'confirmed'");
      args.push(filter.status);
    } else {
      where.push("r.status = ?");
      args.push(filter.status);
    }
  }
  return getDb()
    .prepare(`${REG_SELECT} WHERE ${where.join(" AND ")} ORDER BY r.created_at ASC`)
    .all(...args)
    .map(toRegistration);
}

/** Annulation : par le participant (jeton de l'e-mail) ou par l'administration. Libère les places. */
export function cancelRegistration(id: string): RegistrationRecord | null {
  return transaction((db) => {
    const r = db.prepare("SELECT status FROM event_registrations WHERE id = ?").get(id) as { status: string } | undefined;
    if (!r) return null;
    if (r.status !== "cancelled") {
      const ts = new Date().toISOString();
      db.prepare("UPDATE event_registrations SET status = 'cancelled', cancelled_at = ?, updated_at = ? WHERE id = ?").run(ts, ts, id);
    }
    return toRegistration(db.prepare(`${REG_SELECT} WHERE r.id = ?`).get(id)!);
  });
}

export type ConfirmResult = { ok: true; registration: RegistrationRecord } | { ok: false; code: "not_found" | "no_capacity" | "duplicate" };

/** Confirme une inscription en liste d'attente (ou réactive une annulée). `force` ignore la capacité (décision explicite de l'admin). */
export function confirmRegistration(id: string, force = false): ConfirmResult {
  return transaction((db) => {
    const r = db.prepare("SELECT * FROM event_registrations WHERE id = ?").get(id);
    if (!r) return { ok: false, code: "not_found" } as const;
    if (r.status === "confirmed") return { ok: true, registration: toRegistration(db.prepare(`${REG_SELECT} WHERE r.id = ?`).get(id)!) } as const;
    const ev = db.prepare("SELECT capacity FROM events WHERE id = ?").get(r.event_id) as { capacity: number };
    if (!force && seatSum(db, String(r.event_id), "confirmed") + Number(r.seats) > ev.capacity) return { ok: false, code: "no_capacity" } as const;
    if (r.status === "cancelled") {
      const dup = db.prepare("SELECT 1 FROM event_registrations WHERE event_id = ? AND email = ? AND status <> 'cancelled' AND id <> ?").get(r.event_id, r.email, id);
      if (dup) return { ok: false, code: "duplicate" } as const;
    }
    const ts = new Date().toISOString();
    db.prepare("UPDATE event_registrations SET status = 'confirmed', waitlist_reason = '', cancelled_at = NULL, updated_at = ? WHERE id = ?").run(ts, id);
    return { ok: true, registration: toRegistration(db.prepare(`${REG_SELECT} WHERE r.id = ?`).get(id)!) } as const;
  });
}

export function setAttendance(id: string, attendance: Attendance): void {
  getDb().prepare("UPDATE event_registrations SET attendance = ?, updated_at = ? WHERE id = ?").run(attendance, new Date().toISOString(), id);
}

/** Effacement définitif d'une inscription (droit à l'effacement). */
export function deleteRegistration(id: string): boolean {
  return Number(getDb().prepare("DELETE FROM event_registrations WHERE id = ?").run(id).changes) > 0;
}

/** Export des données d'une personne (droit d'accès) : toutes ses inscriptions, tous événements confondus. */
export function exportPersonalData(email: string): unknown[] {
  return getDb()
    .prepare(`${REG_SELECT} WHERE r.email = ? ORDER BY r.created_at`)
    .all(email.trim().toLowerCase())
    .map((r) => {
      const { cancelToken: _omit, ...rest } = toRegistration(r);
      void _omit;
      return rest;
    });
}

// ---------- Administration des événements ----------

export type EventInput = Omit<EventRecord, "id" | "createdAt" | "updatedAt">;

const COLS = [
  "slug", "title", "theme", "tagline", "description", "organizer", "solution", "starts_at", "ends_at", "timezone",
  "venue_name", "venue_city", "venue_district", "venue_status", "capacity", "max_per_company", "waitlist_enabled", "show_remaining", "fee_label",
  "publication_status", "registration_status", "cancelled", "image", "audience", "topics", "program", "practical_info", "promo", "retention_months",
] as const;

function eventValues(e: EventInput): (string | number)[] {
  return [
    e.slug, e.title, e.theme, e.tagline, e.description, e.organizer, e.solution, e.startsAt, e.endsAt, e.timezone,
    e.venueName, e.venueCity, e.venueDistrict, e.venueStatus, e.capacity, e.maxPerCompany, e.waitlistEnabled ? 1 : 0, e.showRemaining ? 1 : 0, e.feeLabel,
    e.publicationStatus, e.registrationStatus, e.cancelled ? 1 : 0, e.image, JSON.stringify(e.audience), JSON.stringify(e.topics), JSON.stringify(e.program), e.practicalInfo, JSON.stringify(e.promo), e.retentionMonths,
  ];
}

export function createEvent(input: EventInput): EventRecord {
  const db = getDb();
  const id = randomUUID();
  const ts = new Date().toISOString();
  db.prepare(`INSERT INTO events (id, ${COLS.join(", ")}, created_at, updated_at) VALUES (?, ${COLS.map(() => "?").join(", ")}, ?, ?)`).run(id, ...eventValues(input), ts, ts);
  return getEventById(id)!;
}

export function updateEvent(id: string, input: EventInput): EventRecord | null {
  const db = getDb();
  const res = db.prepare(`UPDATE events SET ${COLS.map((c) => `${c} = ?`).join(", ")}, updated_at = ? WHERE id = ?`).run(...eventValues(input), new Date().toISOString(), id);
  return Number(res.changes) > 0 ? getEventById(id) : null;
}

/** Insère l'événement s'il n'existe pas (clé : slug). Avec `overwrite`, remplace son contenu. Idempotent. */
export function upsertEventBySlug(input: EventInput, overwrite = false): { event: EventRecord; action: "created" | "updated" | "unchanged" } {
  const existing = getEventBySlug(input.slug);
  if (!existing) return { event: createEvent(input), action: "created" };
  if (!overwrite) return { event: existing, action: "unchanged" };
  return { event: updateEvent(existing.id, input)!, action: "updated" };
}

export function setEventFlag(id: string, patch: Partial<Pick<EventRecord, "publicationStatus" | "registrationStatus" | "cancelled" | "capacity" | "venueStatus">>): void {
  const sets: string[] = [];
  const args: (string | number)[] = [];
  if (patch.publicationStatus) {
    sets.push("publication_status = ?");
    args.push(patch.publicationStatus);
  }
  if (patch.registrationStatus) {
    sets.push("registration_status = ?");
    args.push(patch.registrationStatus);
  }
  if (patch.cancelled !== undefined) {
    sets.push("cancelled = ?");
    args.push(patch.cancelled ? 1 : 0);
  }
  if (patch.capacity !== undefined) {
    sets.push("capacity = ?");
    args.push(patch.capacity);
  }
  if (patch.venueStatus) {
    sets.push("venue_status = ?");
    args.push(patch.venueStatus);
  }
  if (sets.length === 0) return;
  getDb().prepare(`UPDATE events SET ${sets.join(", ")}, updated_at = ? WHERE id = ?`).run(...args, new Date().toISOString(), id);
}

export function slugTaken(slug: string, exceptId?: string): boolean {
  const r = getDb().prepare("SELECT id FROM events WHERE slug = ?").get(slug) as { id: string } | undefined;
  return !!r && r.id !== exceptId;
}

// ---------- Journal et conservation ----------

/** Journal administratif. `detail` ne doit jamais contenir de donnée personnelle (utiliser des références). */
export function audit(action: string, target = "", detail = "", actor = "admin"): void {
  getDb().prepare("INSERT INTO event_audit_log (at, actor, action, target, detail) VALUES (?,?,?,?,?)").run(new Date().toISOString(), actor, action, target, detail.slice(0, 300));
}

export function listAudit(limit = 50): { at: string; actor: string; action: string; target: string; detail: string }[] {
  return getDb().prepare("SELECT at, actor, action, target, detail FROM event_audit_log ORDER BY id DESC LIMIT ?").all(limit) as never;
}

/** Supprime les inscriptions des événements terminés depuis plus longtemps que leur durée de conservation. */
export function purgeExpiredRegistrations(now = new Date()): { events: number; registrations: number } {
  return transaction((db) => {
    const events = db.prepare("SELECT id, ends_at, retention_months FROM events").all();
    let purgedEvents = 0;
    let purged = 0;
    for (const e of events) {
      const limit = new Date(String(e.ends_at));
      limit.setUTCMonth(limit.getUTCMonth() + Number(e.retention_months));
      if (limit.getTime() > now.getTime()) continue;
      const n = Number(db.prepare("DELETE FROM event_registrations WHERE event_id = ?").run(String(e.id)).changes);
      if (n > 0) {
        purgedEvents++;
        purged += n;
        db.prepare("INSERT INTO event_audit_log (at, actor, action, target, detail) VALUES (?,?,?,?,?)").run(now.toISOString(), "system", "purge", String(e.id), `${n} inscription(s) supprimée(s)`);
      }
    }
    return { events: purgedEvents, registrations: purged };
  });
}
