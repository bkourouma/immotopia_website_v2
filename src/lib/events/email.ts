// E-mails transactionnels des événements. Envoi par l'API HTTP de Resend si RESEND_API_KEY et EVENTS_EMAIL_FROM sont définies ;
// sinon l'envoi est ignoré (journal sans donnée personnelle) et l'inscription reste valide.
// Aucune campagne commerciale n'est envoyée ici : seuls des messages liés à l'inscription de la personne.

import { formatDateFr, formatTimeFr } from "./time.ts";
import type { EventRecord, RegistrationRecord } from "./types.ts";

export type EmailKind = "confirmation" | "waitlist" | "cancellation" | "reminder";
export type EmailMessage = { to: string; subject: string; html: string; text: string };

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function venueLine(e: EventRecord): string {
  const place = [e.venueName, e.venueDistrict, e.venueCity].filter(Boolean).join(", ");
  return e.venueStatus === "provisional" ? `${place} (lieu en cours de confirmation : nous vous écrirons dès qu'il sera validé)` : place;
}

/** Construit le message ; `baseUrl` sert aux liens (annulation, page de l'événement). */
export function renderEmail(kind: EmailKind, event: EventRecord, reg: RegistrationRecord, baseUrl: string): EmailMessage {
  const date = formatDateFr(event.startsAt, event.timezone);
  const hours = `${formatTimeFr(event.startsAt, event.timezone)} – ${formatTimeFr(event.endsAt, event.timezone)}`;
  const eventUrl = `${baseUrl}/evenements/${event.slug}`;
  const cancelUrl = `${baseUrl}/evenements/annulation?ref=${encodeURIComponent(reg.reference)}&token=${encodeURIComponent(reg.cancelToken)}`;
  const first = reg.fullName.split(" ")[0];

  const detailLines: [string, string][] = [
    ["Événement", event.title],
    ["Date", date],
    ["Horaires", hours],
    ["Lieu", venueLine(event)],
    ["Référence", reg.reference],
    ["Personnes", String(reg.seats)],
  ];

  let subject: string;
  let intro: string;
  let outro = "";
  switch (kind) {
    case "confirmation":
      subject = `Inscription confirmée : ${event.title}`;
      intro = `Bonjour ${first},\n\nMerci pour votre inscription. Votre place est confirmée.`;
      outro = `Pensez à vous présenter 15 minutes avant le début avec votre référence.\nUn empêchement ? Annulez en un clic pour libérer votre place : ${cancelUrl}`;
      break;
    case "waitlist":
      subject = `Liste d'attente : ${event.title}`;
      intro = `Bonjour ${first},\n\nNous avons bien enregistré votre demande. Les places sont toutes prises : votre inscription est en liste d'attente et votre place n'est pas encore confirmée. Nous vous écrirons si une place se libère.`;
      outro = `Vous n'êtes plus intéressé(e) ? Annulez ici : ${cancelUrl}`;
      break;
    case "cancellation":
      subject = `Inscription annulée : ${event.title}`;
      intro = `Bonjour ${first},\n\nVotre inscription est bien annulée. Elle ne vous engage plus.`;
      outro = `Vous pouvez vous réinscrire tant que l'événement est ouvert : ${eventUrl}`;
      break;
    case "reminder":
      // Modèle prêt pour les rappels avant l'événement (envoi planifié à brancher plus tard).
      subject = `Rappel : ${event.title}`;
      intro = `Bonjour ${first},\n\nPetit rappel : l'événement approche.`;
      outro = `Détails et accès : ${eventUrl}`;
      break;
  }

  const text = [intro, "", ...detailLines.map(([k, v]) => `${k} : ${v}`), "", outro, "", `${event.organizer} — ${event.solution}`].join("\n");
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f7f7fb;font-family:Arial,Helvetica,sans-serif;color:#0a0e1c">
<div style="max-width:560px;margin:0 auto;padding:24px">
<div style="background:#fff;border-radius:16px;padding:28px">
<h1 style="font-size:20px;margin:0 0 16px">${escapeHtml(subject)}</h1>
${intro.split("\n\n").map((p) => `<p style="line-height:1.55">${escapeHtml(p)}</p>`).join("")}
<table style="width:100%;border-collapse:collapse;margin:16px 0">
${detailLines.map(([k, v]) => `<tr><td style="padding:6px 0;color:#667;width:110px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`).join("")}
</table>
${outro.split("\n").map((l) => `<p style="line-height:1.55;font-size:14px">${escapeHtml(l)}</p>`).join("")}
</div>
<p style="font-size:12px;color:#889;margin:16px 4px">${escapeHtml(event.organizer)} · ${escapeHtml(event.solution)}. Cet e-mail concerne uniquement votre inscription. Vos données sont traitées pour gérer l'événement ; pour les consulter ou les supprimer, répondez à ce message.</p>
</div></body></html>`;
  return { to: reg.email, subject, html, text };
}

export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY?.trim() && !!process.env.EVENTS_EMAIL_FROM?.trim();
}

/** Envoie le message ; ne lève jamais d'exception (l'inscription ne doit pas échouer à cause du courriel). Renvoie true si envoyé. */
export async function sendEmail(msg: EmailMessage): Promise<boolean> {
  if (!emailConfigured()) {
    console.warn("[evenements] Service e-mail non configuré (RESEND_API_KEY / EVENTS_EMAIL_FROM) : e-mail non envoyé.");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EVENTS_EMAIL_FROM!.trim(),
        to: [msg.to],
        reply_to: process.env.EVENTS_EMAIL_REPLY_TO?.trim() || undefined,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.error("[evenements] Échec d'envoi d'e-mail :", err instanceof Error ? err.message : "erreur");
    return false;
  }
}
