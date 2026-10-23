// Indique si le lien de réservation Calendly est utilisable. Calendly affiche « This Calendly URL is not valid »
// dans l'iframe (inspectable seulement depuis Calendly) : on interroge donc son API publique côté serveur, avec un
// cache court, pour que le site propose les contacts plutôt qu'un calendrier cassé. Aucun paramètre n'est lu dans la requête.

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;
const TTL_MS = 5 * 60 * 1000;

let cache: { ok: boolean; at: number } | null = null;

async function check(): Promise<boolean> {
  if (!BOOKING_URL) return false;
  let url: URL;
  try {
    url = new URL(BOOKING_URL);
  } catch {
    return false;
  }
  // Autre prestataire (Cal.com…) : pas de vérification possible, on laisse l'iframe s'afficher
  if (!url.hostname.endsWith("calendly.com")) return true;
  const [profile, event] = url.pathname.split("/").filter(Boolean);
  if (!profile || !event) return false;
  try {
    const api = new URL("https://calendly.com/api/booking/event_types/lookup");
    api.searchParams.set("profile_slug", profile);
    api.searchParams.set("event_type_slug", event);
    const res = await fetch(api, { signal: AbortSignal.timeout(5000), cache: "no-store" });
    if (!res.ok) return true; // API injoignable ou changée : mieux vaut tenter l'iframe
    const data = (await res.json()) as { unavailability_reason?: unknown };
    return !data.unavailability_reason;
  } catch {
    return true;
  }
}

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL_MS) cache = { ok: await check(), at: Date.now() };
  return Response.json({ ok: cache.ok }, { headers: { "Cache-Control": "no-store" } });
}
