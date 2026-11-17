// Dates d'un événement : stockées en UTC (ISO) avec le fuseau de l'événement, saisies et affichées en heure locale.

/** Décalage (en minutes) d'un fuseau à un instant donné. */
function offsetMinutes(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second"));
  return Math.round((asUtc - utcMs) / 60000);
}

/** « 2026-12-10T09:00 » dans le fuseau donné → ISO UTC. Renvoie null si la saisie est invalide. */
export function zonedToUtc(local: string, timeZone: string): string | null {
  const m = local.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  if (Number.isNaN(guess)) return null;
  try {
    let ms = guess - offsetMinutes(guess, timeZone) * 60000;
    ms = guess - offsetMinutes(ms, timeZone) * 60000; // second passage : bascule d'heure d'été
    return new Date(ms).toISOString();
  } catch {
    return null;
  }
}

/** ISO UTC → « 2026-12-10T09:00 » dans le fuseau donné (valeur d'un champ datetime-local). */
export function utcToZonedInput(iso: string, timeZone: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  const d = new Date(ms + offsetMinutes(ms, timeZone) * 60000);
  return d.toISOString().slice(0, 16);
}

export function formatDateFr(iso: string, timeZone: string): string {
  const s = new Intl.DateTimeFormat("fr-FR", { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatTimeFr(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("fr-FR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(iso)).replace(":", "h");
}

export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("fr-FR", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
