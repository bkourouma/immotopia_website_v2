// Inscription publique à un événement : POST { slug, … }. Sans compte. Protections : même origine, champ piège, délai minimal
// de remplissage, limite de débit par IP et par e-mail, validation serveur, capacité contrôlée en transaction.

import { renderEmail, sendEmail } from "@/lib/events/email";
import { allow, clientIp } from "@/lib/events/rate-limit";
import { jsonNoStore, readJson, sameOrigin } from "@/lib/events/request";
import { eventPhase, getStats, registerForEvent } from "@/lib/events/service";
import { validateRegistration } from "@/lib/events/validation";
import { SITE_URL } from "@/lib/site";

const WINDOW = 10 * 60 * 1000;

export async function POST(request: Request) {
  if (!sameOrigin(request.headers)) return jsonNoStore({ error: "Requête refusée." }, 403);
  const body = (await readJson(request)) as Record<string, unknown> | null;
  if (!body || typeof body.slug !== "string") return jsonNoStore({ error: "Requête invalide." }, 400);

  // Robots : champ piège rempli ou formulaire envoyé en moins de 2 s → on répond « ok » sans rien enregistrer
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if ((typeof body.website === "string" && body.website.trim() !== "") || elapsed < 2000) {
    return jsonNoStore({ ok: true, status: "confirmed", reference: "EVT-XXXXXXXX" });
  }

  const ip = clientIp(request.headers);
  if (!allow(`reg:ip:${ip}`, 8, WINDOW)) return jsonNoStore({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, 429);

  const parsed = validateRegistration(body);
  if (!parsed.ok) return jsonNoStore({ error: "Certains champs sont à corriger.", fields: parsed.errors }, 400);
  if (!allow(`reg:mail:${body.slug}:${parsed.data.email}`, 3, WINDOW)) return jsonNoStore({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, 429);

  try {
    const result = registerForEvent(body.slug, parsed.data);
    if (!result.ok) {
      const messages = {
        not_found: ["Cet événement est introuvable.", 404],
        closed: ["Les inscriptions à cet événement sont closes.", 409],
        duplicate: ["Une inscription existe déjà avec cet e-mail pour cet événement.", 409],
        full: ["Cet événement est complet.", 409],
        company_limit: ["Le nombre d'inscriptions pour votre entreprise est atteint.", 409],
      } as const;
      const [error, status] = messages[result.code];
      return jsonNoStore({ error, code: result.code }, status);
    }
    const { registration, event } = result;
    // L'e-mail ne bloque pas la réponse : son échec n'invalide jamais l'inscription
    void sendEmail(renderEmail(registration.status === "waitlist" ? "waitlist" : "confirmation", event, registration, SITE_URL));
    const stats = getStats(event.id);
    return jsonNoStore({
      ok: true,
      status: registration.status,
      waitlistReason: registration.waitlistReason,
      reference: registration.reference,
      remaining: event.showRemaining ? stats.remaining : null,
      phase: eventPhase(event, stats),
    });
  } catch (err) {
    console.error("[evenements] Échec d'inscription :", err instanceof Error ? err.message : "erreur");
    return jsonNoStore({ error: "Une erreur est survenue. Réessayez dans un instant." }, 500);
  }
}
