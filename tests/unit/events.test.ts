import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";

process.env.EVENTS_DB_PATH = ":memory:";
process.env.EVENTS_ADMIN_PASSWORD = "mot-de-passe-de-test-long";
process.env.EVENTS_ADMIN_SECRET = "secret-de-test-assez-long-pour-hmac";

const load = (rel: string) => import(new URL(`../../${rel}`, import.meta.url).href);
const dbm = await load("src/lib/events/db.ts");
const svc = await load("src/lib/events/service.ts");
const val = await load("src/lib/events/validation.ts");
const csv = await load("src/lib/events/csv.ts");
const time = await load("src/lib/events/time.ts");
const auth = await load("src/lib/events/auth.ts");
const mail = await load("src/lib/events/email.ts");
const rl = await load("src/lib/events/rate-limit.ts");
const { matinales } = await load("src/lib/events/seed-data.ts");

const base = {
  fullName: "Awa Koné",
  company: "Syndic Plateau",
  jobTitle: "Directrice",
  email: "awa@example.ci",
  phone: "+225 01 02 03 04 05",
  activity: "Syndic de copropriété",
  seats: 1,
  comment: "",
  consentProcessing: true,
  consentMarketing: false,
};
const reg = (n: number, extra: Record<string, unknown> = {}) => ({ ...base, email: `p${n}@example.ci`, ...extra });

function seed(overrides: Record<string, unknown> = {}) {
  const { event } = svc.upsertEventBySlug({ ...matinales, publicationStatus: "published", ...overrides }, true);
  return event;
}

beforeEach(() => {
  dbm.closeDb();
  rl.resetRateLimits();
});

describe("initialisation du premier événement", () => {
  it("est idempotente : deux exécutions, un seul événement", () => {
    const a = svc.upsertEventBySlug(matinales);
    const b = svc.upsertEventBySlug(matinales);
    assert.equal(a.action, "created");
    assert.equal(b.action, "unchanged");
    assert.equal(svc.listAllEvents().length, 1);
    assert.equal(svc.upsertEventBySlug(matinales, true).action, "updated");
    assert.equal(svc.listAllEvents().length, 1);
  });

  it("enregistre les valeurs attendues (30 places, 10 décembre 2026, lieu provisoire, brouillon)", () => {
    const e = svc.upsertEventBySlug(matinales).event;
    assert.equal(e.capacity, 30);
    assert.equal(e.venueStatus, "provisional");
    assert.equal(e.publicationStatus, "draft");
    assert.equal(time.formatDateFr(e.startsAt, e.timezone), "Jeudi 10 décembre 2026");
    assert.equal(time.formatTimeFr(e.startsAt, e.timezone), "09h00");
    assert.equal(e.program.length, 5);
    assert.equal(e.promo.visible, true);
  });
});

describe("validation", () => {
  it("accepte une inscription valide", () => assert.equal(val.validateRegistration(base).ok, true));

  it("rejette les champs invalides", () => {
    const r = val.validateRegistration({ ...base, fullName: "A", email: "pas-un-mail", phone: "12", activity: "Pirate", seats: 9, consentProcessing: false, company: "", jobTitle: "" });
    assert.equal(r.ok, false);
    assert.deepEqual(Object.keys(r.errors).sort(), ["activity", "company", "consentProcessing", "email", "fullName", "jobTitle", "phone", "seats"]);
  });

  it("n'accepte pas de consentement commercial implicite", () => {
    assert.equal(val.validateRegistration(base).data.consentMarketing, false);
    assert.equal(val.validateRegistration({ ...base, consentMarketing: "true" }).data.consentMarketing, false);
  });

  it("n'accepte que des images sûres", () => {
    assert.equal(val.safeImage("javascript:alert(1)"), "");
    assert.equal(val.safeImage("//evil.com/x.png"), "");
    assert.equal(val.safeImage("/images/a.jpg"), "/images/a.jpg");
    assert.equal(val.safeImage("https://cdn.example.com/a.jpg"), "https://cdn.example.com/a.jpg");
  });
});

describe("inscription, capacité et doublons", () => {
  it("enregistre, attribue une référence unique et un statut confirmé", () => {
    seed();
    const r = svc.registerForEvent("matinales-immobilier-digital-2026", base, new Date("2026-11-20T10:00:00Z"));
    assert.equal(r.ok, true);
    assert.match(r.registration.reference, /^EVT-[A-Z2-9]{8}$/);
    assert.equal(r.registration.status, "confirmed");
    assert.ok(r.registration.processingConsentAt);
    assert.equal(r.registration.marketingConsentAt, null);
  });

  it("refuse un doublon (même e-mail, casse différente) mais autorise après annulation", () => {
    seed();
    const slug = "matinales-immobilier-digital-2026";
    const first = svc.registerForEvent(slug, base);
    assert.equal(svc.registerForEvent(slug, { ...base, email: "AWA@example.ci".toLowerCase() }).code, "duplicate");
    svc.cancelRegistration(first.registration.id);
    assert.equal(svc.registerForEvent(slug, base).ok, true);
  });

  it("respecte la limite de 30 places puis bascule en liste d'attente", () => {
    const ev = seed();
    const slug = ev.slug;
    for (let i = 1; i <= 30; i++) assert.equal(svc.registerForEvent(slug, reg(i)).registration.status, "confirmed");
    const w = svc.registerForEvent(slug, reg(31));
    assert.equal(w.registration.status, "waitlist");
    const s = svc.getStats(ev.id);
    assert.equal(s.confirmedSeats, 30);
    assert.equal(s.remaining, 0);
    assert.equal(s.waitlistRegistrations, 1);
  });

  it("n'accorde pas une réservation de 3 places quand il n'en reste qu'une", () => {
    const ev = seed({ capacity: 3 });
    svc.registerForEvent(ev.slug, reg(1, { seats: 2 }));
    assert.equal(svc.registerForEvent(ev.slug, reg(2, { seats: 2 })).registration.status, "waitlist");
    assert.equal(svc.getStats(ev.id).confirmedSeats, 2);
  });

  it("refuse (sans liste d'attente) quand c'est complet", () => {
    const ev = seed({ capacity: 1, waitlistEnabled: false });
    svc.registerForEvent(ev.slug, reg(1));
    assert.equal(svc.registerForEvent(ev.slug, reg(2)).code, "full");
  });

  it("deux inscriptions successives sur la dernière place : une seule confirmée", async () => {
    const ev = seed({ capacity: 1 });
    // Appels « simultanés » : chaque inscription passe par une transaction IMMEDIATE, donc sérialisée.
    const results = await Promise.all([1, 2].map((n) => Promise.resolve().then(() => svc.registerForEvent(ev.slug, reg(n)))));
    const statuses = results.map((r: { registration: { status: string } }) => r.registration.status).sort();
    assert.deepEqual(statuses, ["confirmed", "waitlist"]);
    assert.equal(svc.getStats(ev.id).confirmedSeats, 1);
  });

  it("refuse les inscriptions sur un brouillon, des inscriptions fermées ou un événement annulé", () => {
    const ev = seed({ publicationStatus: "draft" });
    assert.equal(svc.registerForEvent(ev.slug, base).code, "not_found");
    svc.setEventFlag(ev.id, { publicationStatus: "published", registrationStatus: "closed" });
    assert.equal(svc.registerForEvent(ev.slug, base).code, "closed");
    svc.setEventFlag(ev.id, { registrationStatus: "open", cancelled: true });
    assert.equal(svc.registerForEvent(ev.slug, base).code, "closed");
  });

  it("enregistre le consentement commercial séparément quand il est donné", () => {
    const ev = seed();
    const r = svc.registerForEvent(ev.slug, { ...base, consentMarketing: true });
    assert.ok(r.registration.marketingConsentAt);
  });
});

describe("annulation, liste d'attente, présence", () => {
  it("l'annulation libère la place ; la confirmation depuis la liste d'attente vérifie la capacité", () => {
    const ev = seed({ capacity: 1 });
    const a = svc.registerForEvent(ev.slug, reg(1)).registration;
    const w = svc.registerForEvent(ev.slug, reg(2)).registration;
    assert.equal(svc.confirmRegistration(w.id).code, "no_capacity");
    svc.cancelRegistration(a.id);
    assert.equal(svc.confirmRegistration(w.id).ok, true);
    assert.equal(svc.getStats(ev.id).confirmedSeats, 1);
  });

  it("modifier la capacité change les places restantes", () => {
    const ev = seed({ capacity: 2 });
    svc.registerForEvent(ev.slug, reg(1));
    svc.setEventFlag(ev.id, { capacity: 10 });
    assert.equal(svc.getStats(ev.id).remaining, 9);
  });

  it("marque les présences et calcule la répartition par activité", () => {
    const ev = seed();
    const a = svc.registerForEvent(ev.slug, reg(1)).registration;
    svc.registerForEvent(ev.slug, reg(2, { activity: "Gestion locative" }));
    svc.setAttendance(a.id, "present");
    const s = svc.getStats(ev.id);
    assert.equal(s.present, 1);
    assert.equal(s.byActivity.length, 2);
  });

  it("recherche et filtre les inscrits", () => {
    const ev = seed();
    svc.registerForEvent(ev.slug, reg(1, { company: "Alpha Immo" }));
    svc.registerForEvent(ev.slug, reg(2, { company: "Beta", activity: "Gestion locative" }));
    assert.equal(svc.listRegistrations(ev.id, { q: "alpha" }).length, 1);
    assert.equal(svc.listRegistrations(ev.id, { activity: "Gestion locative" }).length, 1);
    assert.equal(svc.listRegistrations(ev.id, { q: "100%" }).length, 0);
  });

  it("supprime une inscription (effacement) et purge selon la durée de conservation", () => {
    const ev = seed({ retentionMonths: 1 });
    const a = svc.registerForEvent(ev.slug, reg(1)).registration;
    svc.registerForEvent(ev.slug, reg(2));
    assert.equal(svc.deleteRegistration(a.id), true);
    assert.equal(svc.purgeExpiredRegistrations(new Date("2026-12-20T00:00:00Z")).registrations, 0);
    assert.equal(svc.purgeExpiredRegistrations(new Date("2027-02-01T00:00:00Z")).registrations, 1);
  });
});

describe("export CSV et formules", () => {
  it("neutralise l'injection de formule et échappe séparateurs et guillemets", () => {
    assert.equal(csv.csvCell("=1+1"), "'=1+1");
    assert.equal(csv.csvCell("@SUM(A1)"), "'@SUM(A1)");
    assert.equal(csv.csvCell("+1+cmd|' /C calc'!A0"), "'+1+cmd|' /C calc'!A0");
    assert.equal(csv.csvCell("+225 01 02 03 04 05"), "+225 01 02 03 04 05");
    assert.equal(csv.csvCell('a;"b"'), '"a;""b"""');
    const out = csv.toCsv(["a", "b"], [["x", "y"]]);
    assert.ok(out.startsWith("﻿a;b\r\n"));
  });
});

describe("fuseaux, authentification, e-mails, débit", () => {
  it("convertit l'heure locale d'Abidjan et revient", () => {
    assert.equal(time.zonedToUtc("2026-12-10T09:00", "Africa/Abidjan"), "2026-12-10T09:00:00.000Z");
    assert.equal(time.zonedToUtc("2026-12-10T09:00", "Europe/Paris"), "2026-12-10T08:00:00.000Z");
    assert.equal(time.utcToZonedInput("2026-12-10T08:00:00.000Z", "Europe/Paris"), "2026-12-10T09:00");
    assert.equal(time.zonedToUtc("n'importe quoi", "Africa/Abidjan"), null);
  });

  it("signe et vérifie la session administrateur", () => {
    assert.equal(auth.checkPassword("mauvais"), false);
    assert.equal(auth.checkPassword("mot-de-passe-de-test-long"), true);
    const t = auth.createSessionToken(1000);
    assert.equal(auth.verifySessionToken(t, 2000), true);
    assert.equal(auth.verifySessionToken(t, 1000 + auth.SESSION_MS + 1), false);
    assert.equal(auth.verifySessionToken(t.slice(0, -2) + "xx", 2000), false);
    assert.equal(auth.verifySessionToken(undefined), false);
  });

  it("produit les e-mails sans HTML injecté et avec le statut du lieu", () => {
    const ev = svc.upsertEventBySlug(matinales).event;
    const r = { ...base, fullName: "<b>Awa</b> K", reference: "EVT-AAAAAAAA", cancelToken: "tok" };
    for (const kind of ["confirmation", "waitlist", "cancellation", "reminder"]) {
      const m = mail.renderEmail(kind, ev, r, "https://immotopia.cloud");
      assert.ok(!m.html.includes("<b>Awa</b>"));
      assert.ok(m.text.includes("EVT-AAAAAAAA"));
    }
    assert.ok(mail.renderEmail("confirmation", ev, r, "https://x").text.includes("en cours de confirmation"));
    assert.ok(mail.renderEmail("waitlist", ev, r, "https://x").text.includes("pas encore confirmée"));
  });

  it("limite le débit", () => {
    assert.equal(rl.allow("k", 2, 1000, 0), true);
    assert.equal(rl.allow("k", 2, 1000, 1), true);
    assert.equal(rl.allow("k", 2, 1000, 2), false);
    assert.equal(rl.allow("k", 2, 1000, 2000), true);
  });
});
