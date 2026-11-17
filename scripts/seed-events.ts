// Initialise le premier événement (Les Matinales de l'Immobilier Digital). Idempotent : relancer ne crée aucun doublon.
//   node scripts/seed-events.ts              insère s'il manque, ne touche à rien sinon
//   node scripts/seed-events.ts --force      remet le contenu aux valeurs d'origine (écrase les modifications faites en administration)
//   node scripts/seed-events.ts --publish    insère puis publie (par défaut : brouillon)
// La base visée est EVENTS_DB_PATH (défaut : data/events.db).

import { dbPath } from "../src/lib/events/db.ts";
import { matinales } from "../src/lib/events/seed-data.ts";
import { audit, setEventFlag, upsertEventBySlug } from "../src/lib/events/service.ts";

const force = process.argv.includes("--force");
const publish = process.argv.includes("--publish");

const { event, action } = upsertEventBySlug(matinales, force);
if (publish && event.publicationStatus !== "published") setEventFlag(event.id, { publicationStatus: "published" });
audit("seed", event.slug, `${action}${publish ? " + publication" : ""}`, "script");
console.log(`Événement « ${event.slug} » : ${action}${publish ? ", publié" : ""} (base : ${dbPath()}).`);
