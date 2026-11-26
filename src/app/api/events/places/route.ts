// Places restantes de l'événement mis en avant (lecture seule, aucune donnée personnelle) : GET → { remaining, capacity }.
// Alimente le bandeau de l'accueil, qui est statique et ne lit pas la base.

import { featuredEvent } from "@/lib/events/featured";
import { allow, clientIp } from "@/lib/events/rate-limit";
import { jsonNoStore } from "@/lib/events/request";
import { getEventBySlug, getStats } from "@/lib/events/service";

export async function GET(request: Request) {
  if (!allow(`places:${clientIp(request.headers)}`, 60, 60 * 1000)) return jsonNoStore({ error: "Trop de requêtes." }, 429);
  const event = getEventBySlug(featuredEvent.slug);
  if (!event || event.publicationStatus === "draft" || !event.showRemaining) return jsonNoStore({ remaining: null });
  return jsonNoStore({ remaining: getStats(event.id).remaining, capacity: event.capacity });
}
