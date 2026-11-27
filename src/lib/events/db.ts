// Stockage des événements et des inscriptions : SQLite (module intégré à Node, aucune dépendance).
// Le fichier vit dans EVENTS_DB_PATH (volume Docker en production) ; le schéma est migré au premier accès.
// Fichier serveur uniquement : ne jamais l'importer depuis un composant client.

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const MIGRATIONS: string[] = [
  `
  CREATE TABLE events (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    theme TEXT NOT NULL DEFAULT '',
    tagline TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    organizer TEXT NOT NULL DEFAULT '',
    solution TEXT NOT NULL DEFAULT '',
    starts_at TEXT NOT NULL,
    ends_at TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'Africa/Abidjan',
    venue_name TEXT NOT NULL DEFAULT '',
    venue_city TEXT NOT NULL DEFAULT '',
    venue_district TEXT NOT NULL DEFAULT '',
    venue_status TEXT NOT NULL DEFAULT 'provisional' CHECK (venue_status IN ('provisional','confirmed')),
    capacity INTEGER NOT NULL DEFAULT 30 CHECK (capacity >= 0),
    waitlist_enabled INTEGER NOT NULL DEFAULT 1,
    show_remaining INTEGER NOT NULL DEFAULT 1,
    fee_label TEXT NOT NULL DEFAULT 'Gratuit, sur inscription',
    publication_status TEXT NOT NULL DEFAULT 'draft' CHECK (publication_status IN ('draft','published','archived')),
    registration_status TEXT NOT NULL DEFAULT 'open' CHECK (registration_status IN ('open','closed')),
    cancelled INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL DEFAULT '',
    audience TEXT NOT NULL DEFAULT '[]',
    topics TEXT NOT NULL DEFAULT '[]',
    program TEXT NOT NULL DEFAULT '[]',
    practical_info TEXT NOT NULL DEFAULT '',
    promo TEXT NOT NULL DEFAULT '{}',
    retention_months INTEGER NOT NULL DEFAULT 24 CHECK (retention_months >= 1),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE INDEX events_publication_idx ON events (publication_status, starts_at);

  CREATE TABLE event_registrations (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL UNIQUE,
    event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    activity TEXT NOT NULL,
    seats INTEGER NOT NULL DEFAULT 1 CHECK (seats >= 1),
    comment TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL CHECK (status IN ('confirmed','waitlist','cancelled')),
    attendance TEXT NOT NULL DEFAULT 'unknown' CHECK (attendance IN ('unknown','present','absent')),
    cancel_token TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    cancelled_at TEXT
  );
  CREATE INDEX registrations_event_status_idx ON event_registrations (event_id, status);
  -- Une seule inscription active par e-mail et par événement ; une personne annulée peut se réinscrire.
  CREATE UNIQUE INDEX registrations_unique_active_idx ON event_registrations (event_id, email) WHERE status <> 'cancelled';

  -- Consentements enregistrés séparément de l'inscription (preuve datée, par finalité).
  CREATE TABLE event_consents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id TEXT NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (kind IN ('processing','marketing')),
    granted_at TEXT NOT NULL,
    policy_version TEXT NOT NULL
  );
  CREATE INDEX event_consents_registration_idx ON event_consents (registration_id);

  -- Journal des actions administratives sensibles (jamais de donnée personnelle dans « detail »).
  CREATE TABLE event_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at TEXT NOT NULL,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    target TEXT NOT NULL DEFAULT '',
    detail TEXT NOT NULL DEFAULT ''
  );
  `,
  // 2 : plafond d'inscriptions par entreprise (0 = illimité) ; clé d'entreprise normalisée et motif de la liste d'attente
  `
  ALTER TABLE events ADD COLUMN max_per_company INTEGER NOT NULL DEFAULT 2 CHECK (max_per_company >= 0);
  ALTER TABLE event_registrations ADD COLUMN company_key TEXT NOT NULL DEFAULT '';
  ALTER TABLE event_registrations ADD COLUMN waitlist_reason TEXT NOT NULL DEFAULT '';
  CREATE INDEX registrations_company_idx ON event_registrations (event_id, company_key);
  `,
  // 3 : inscriptions reçues directement hors site (téléphone…), déduites des places restantes
  `
  ALTER TABLE events ADD COLUMN direct_seats INTEGER NOT NULL DEFAULT 0 CHECK (direct_seats >= 0);
  UPDATE events SET direct_seats = 10 WHERE slug = 'matinales-immobilier-digital-2026';
  `,
];

let instance: DatabaseSync | null = null;
let instancePath = "";

export function dbPath(): string {
  const configured = process.env.EVENTS_DB_PATH?.trim();
  if (configured === ":memory:") return configured;
  return resolve(/*turbopackIgnore: true*/ configured || "data/events.db");
}

function migrate(db: DatabaseSync) {
  const row = db.prepare("PRAGMA user_version").get() as { user_version: number };
  for (let v = row.user_version; v < MIGRATIONS.length; v++) {
    db.exec("BEGIN IMMEDIATE");
    try {
      db.exec(MIGRATIONS[v]);
      db.exec(`PRAGMA user_version = ${v + 1}`);
      db.exec("COMMIT");
    } catch (err) {
      db.exec("ROLLBACK");
      throw err;
    }
  }
}

/** Ouvre (une fois par processus) la base et applique les migrations. `:memory:` est accepté pour les tests. */
export function getDb(): DatabaseSync {
  const path = dbPath();
  if (instance && instancePath === path) return instance;
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  migrate(db);
  instance = db;
  instancePath = path;
  return db;
}

/** Pour les tests : ferme la connexion courante. */
export function closeDb() {
  instance?.close();
  instance = null;
  instancePath = "";
}

/** Exécute `fn` dans une transaction qui verrouille l'écriture : deux inscriptions simultanées se sérialisent. */
export function transaction<T>(fn: (db: DatabaseSync) => T): T {
  const db = getDb();
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn(db);
    db.exec("COMMIT");
    return result;
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}
