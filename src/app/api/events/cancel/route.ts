// Annulation par le participant : POST { ref, token } (lien reçu par e-mail). Le jeton secret évite qu'on annule l'inscription d'autrui.

import { timingSafeEqual } from "node:crypto";
import { renderEmail, sendEmail } from "@/lib/events/email";
import { allow, clientIp } from "@/lib/events/rate-limit";
import { jsonNoStore, readJson, sameOrigin } from "@/lib/events/request";
import { cancelRegistration, getEventById, getRegistrationByReference } from "@/lib/events/service";
import { SITE_URL } from "@/lib/site";

export async function POST(request: Request) {
  if (!sameOrigin(request.headers)) return jsonNoStore({ error: "Requête refusée." }, 403);
  if (!allow(`cancel:${clientIp(request.headers)}`, 10, 10 * 60 * 1000)) return jsonNoStore({ error: "Trop de tentatives." }, 429);
  const body = (await readJson(request, 1000)) as { ref?: unknown; token?: unknown } | null;
  if (!body || typeof body.ref !== "string" || typeof body.token !== "string") return jsonNoStore({ error: "Requête invalide." }, 400);

  const reg = getRegistrationByReference(body.ref.slice(0, 40));
  const a = Buffer.from(body.token);
  const b = Buffer.from(reg?.cancelToken ?? "");
  // Même réponse pour « inconnue » et « jeton faux » : on ne révèle pas quelles références existent
  if (!reg || a.length !== b.length || !timingSafeEqual(a, b)) return jsonNoStore({ error: "Lien d'annulation invalide." }, 404);

  if (reg.status !== "cancelled") {
    const cancelled = cancelRegistration(reg.id);
    const event = getEventById(reg.eventId);
    if (cancelled && event) void sendEmail(renderEmail("cancellation", event, cancelled, SITE_URL));
  }
  return jsonNoStore({ ok: true });
}
