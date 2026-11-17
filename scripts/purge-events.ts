// Supprime les inscriptions dont la durée de conservation est dépassée (par événement : retention_months après la fin).
// À planifier (cron) ou à lancer à la main : node scripts/purge-events.ts

import { purgeExpiredRegistrations } from "../src/lib/events/service.ts";

const r = purgeExpiredRegistrations();
console.log(`Purge : ${r.registrations} inscription(s) supprimée(s) sur ${r.events} événement(s).`);
