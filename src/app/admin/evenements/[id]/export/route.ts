// Export CSV des inscriptions (compatible Excel). Protégé par le cookie d'administration ; l'export est journalisé.

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";
import { toCsv } from "@/lib/events/csv";
import { audit, getEventById, listRegistrations } from "@/lib/events/service";

const STATUS = { confirmed: "Confirmée", waitlist: "Liste d'attente", cancelled: "Annulée" } as const;
const ATT = { unknown: "", present: "Présent", absent: "Absent" } as const;

export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const cookie = request.headers.get("cookie")?.split(/;\s*/).find((c) => c.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  if (!verifySessionToken(cookie ? decodeURIComponent(cookie) : undefined)) return new Response("Non autorisé", { status: 401, headers: { "Cache-Control": "no-store" } });

  const { id } = await ctx.params;
  const event = getEventById(id);
  if (!event) return new Response("Introuvable", { status: 404 });

  const url = new URL(request.url);
  const regs = listRegistrations(id, { q: url.searchParams.get("q")?.slice(0, 100) || undefined, activity: url.searchParams.get("activity") || undefined, status: url.searchParams.get("status") || undefined });
  const body = toCsv(
    ["Référence", "Nom et prénom", "Entreprise", "Fonction", "E-mail", "Téléphone", "Activité", "Personnes", "Statut", "Présence", "Commentaire", "Communications commerciales", "Date d'inscription", "Date d'annulation"],
    regs.map((r) => [r.reference, r.fullName, r.company, r.jobTitle, r.email, r.phone, r.activity, r.seats, STATUS[r.status], ATT[r.attendance], r.comment, r.marketingConsentAt ? "Oui" : "Non", r.createdAt, r.cancelledAt ?? ""]),
  );
  audit("export_csv", event.slug, `${regs.length} ligne(s)`);
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscriptions-${event.slug}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
