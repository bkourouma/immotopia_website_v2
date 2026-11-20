import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { btnDanger, btnGhost, btnPrimary, EventForm, Flash } from "@/components/events/admin-ui";
import { ACTIVITIES } from "@/lib/events/types";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";
import { getEventById, getStats, listRegistrations } from "@/lib/events/service";
import { formatDateFr } from "@/lib/events/time";
import { bulkDeleteRegistrations, quickEvent, registrationAction } from "../actions";

export const dynamic = "force-dynamic";

const statusLabel = { confirmed: "Confirmée", waitlist: "Liste d'attente", cancelled: "Annulée" } as const;
const attLabel = { unknown: "—", present: "Présent", absent: "Absent" } as const;

function Quick({ id, op, label, danger = false }: { id: string; op: string; label: string; danger?: boolean }) {
  return (
    <form action={quickEvent}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="op" value={op} />
      <button className={danger ? btnDanger : btnGhost}>{label}</button>
    </form>
  );
}

export default async function AdminEvent({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string; q?: string; activity?: string; status?: string }> }) {
  if (!verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value)) redirect("/admin/evenements");
  const { id } = await params;
  const sp = await searchParams;
  const event = getEventById(id);
  if (!event) notFound();

  const stats = getStats(id);
  const regs = listRegistrations(id, { q: sp.q?.slice(0, 100), activity: sp.activity, status: sp.status });
  const returnTo = `/admin/evenements/${id}`;
  const exportQuery = new URLSearchParams({ ...(sp.q ? { q: sp.q } : {}), ...(sp.activity ? { activity: sp.activity } : {}), ...(sp.status ? { status: sp.status } : {}) }).toString();

  const tile = (label: string, value: string | number) => (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-ink-900/[0.07]">
      <p className="text-xs uppercase tracking-wide text-ink-900/55">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/admin/evenements" className="text-sm text-brand-600 hover:underline">← Événements</Link>
      <h1 className="mt-2 font-display text-3xl font-bold">{event.title}</h1>
      <p className="text-ink-900/65">{formatDateFr(event.startsAt, event.timezone)} · {event.cancelled ? "Annulé" : event.publicationStatus === "published" ? "Publié" : event.publicationStatus === "draft" ? "Brouillon" : "Archivé"} · inscriptions {event.registrationStatus === "open" ? "ouvertes" : "closes"} · lieu {event.venueStatus === "confirmed" ? "confirmé" : "provisoire"}</p>
      <div className="mt-4"><Flash ok={sp.ok} err={sp.err} /></div>

      <div className="flex flex-wrap gap-2">
        {event.publicationStatus === "published" ? <Quick id={id} op="unpublish" label="Dépublier" /> : <Quick id={id} op="publish" label="Publier" />}
        {event.publicationStatus !== "archived" && <Quick id={id} op="archive" label="Archiver" />}
        {event.registrationStatus === "open" ? <Quick id={id} op="close" label="Fermer les inscriptions" /> : <Quick id={id} op="open" label="Ouvrir les inscriptions" />}
        {event.venueStatus === "provisional" ? <Quick id={id} op="venue_confirmed" label="Confirmer le lieu" /> : <Quick id={id} op="venue_provisional" label="Lieu : repasser en provisoire" />}
        {event.cancelled ? <Quick id={id} op="uncancel" label="Rétablir l'événement" /> : <Quick id={id} op="cancel" label="Annuler l'événement" danger />}
        <a href={`/evenements/${event.slug}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>{event.publicationStatus === "draft" ? "Aperçu" : "Voir la page"}</a>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">Tableau de bord</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tile("Inscrits (actifs)", stats.registrations)}
        {tile("Places confirmées", `${stats.confirmedSeats} / ${event.capacity}`)}
        {tile("Places disponibles", stats.remaining)}
        {tile("En attente (personnes)", stats.waitlistSeats)}
        {tile("Annulations", stats.cancelledRegistrations)}
        {tile("Présents", stats.present)}
        {tile("Absents", stats.absent)}
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-6">
        <form action={quickEvent} className="flex items-end gap-2">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="op" value="capacity" />
          <label className="text-sm font-medium">Capacité<input type="number" min={0} name="capacity" defaultValue={event.capacity} className="mt-1 block w-28 rounded-lg border border-ink-900/15 px-3 py-2" /></label>
          <button className={btnGhost}>Modifier</button>
        </form>
        <p className="text-sm text-ink-900/70">
          Par activité : {stats.byActivity.length === 0 ? "—" : stats.byActivity.map((a) => `${a.activity} (${a.count})`).join(", ")}
        </p>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">Inscriptions</h2>
      <form method="get" className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-sm font-medium">Recherche<input name="q" defaultValue={sp.q} placeholder="Nom, entreprise, e-mail" className="mt-1 block rounded-lg border border-ink-900/15 px-3 py-2" /></label>
        <label className="text-sm font-medium">Activité
          <select name="activity" defaultValue={sp.activity ?? ""} className="mt-1 block rounded-lg border border-ink-900/15 px-3 py-2">
            <option value="">Toutes</option>
            {ACTIVITIES.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Statut
          <select name="status" defaultValue={sp.status ?? ""} className="mt-1 block rounded-lg border border-ink-900/15 px-3 py-2">
            <option value="">Tous</option>
            <option value="confirmed">Confirmées</option>
            <option value="waitlist">Liste d&apos;attente</option>
            <option value="cancelled">Annulées</option>
            <option value="present">Présents</option>
            <option value="absent">Absents</option>
          </select>
        </label>
        <button className={btnPrimary}>Filtrer</button>
        <a href={`/admin/evenements/${id}/export${exportQuery ? `?${exportQuery}` : ""}`} className={btnGhost}>Exporter en CSV</a>
      </form>

      <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-ink-900/[0.07]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-900/10 text-xs uppercase text-ink-900/60">
            <tr><th className="p-3"><span className="sr-only">Sélection</span></th><th className="p-3">Participant</th><th className="p-3">Contact</th><th className="p-3">Activité</th><th className="p-3">Statut</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {regs.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-ink-900/60">Aucune inscription.</td></tr>}
            {regs.map((r) => (
              <tr key={r.id} className="border-b border-ink-900/5 align-top last:border-0">
                <td className="p-3"><input type="checkbox" name="ids" value={r.id} form="bulk-delete" aria-label={`Sélectionner ${r.fullName}`} className="size-4" /></td>
                <td className="p-3"><p className="font-semibold">{r.fullName}{r.seats > 1 ? ` (+${r.seats - 1})` : ""}</p><p className="text-ink-900/60">{r.company} · {r.jobTitle}</p><p className="font-mono text-xs text-ink-900/50">{r.reference}</p></td>
                <td className="p-3"><p>{r.email}</p><p>{r.phone}</p>{r.comment && <p className="mt-1 text-ink-900/60">« {r.comment} »</p>}</td>
                <td className="p-3">{r.activity}{r.marketingConsentAt ? <p className="text-xs text-emerald-700">Accepte les communications</p> : null}</td>
                <td className="p-3"><p>{statusLabel[r.status]}</p>{r.status === "confirmed" && <p className="text-ink-900/60">{attLabel[r.attendance]}</p>}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    {r.status !== "confirmed" && <RegButton id={r.id} op="confirm" label="Confirmer" returnTo={returnTo} />}
                    {r.status !== "cancelled" && <RegButton id={r.id} op="cancel" label="Annuler" returnTo={returnTo} danger />}
                    {r.status === "confirmed" && <RegButton id={r.id} op="present" label="Présent" returnTo={returnTo} />}
                    {r.status === "confirmed" && <RegButton id={r.id} op="absent" label="Absent" returnTo={returnTo} />}
                  </div>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-ink-900/55">Plus</summary>
                    <form action={registrationAction} className="mt-2 space-y-2 text-xs">
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      {r.status === "waitlist" && <label className="flex items-center gap-1"><input type="checkbox" name="force" /> Forcer la confirmation (dépasse la capacité)</label>}
                      <label className="flex items-center gap-1"><input type="checkbox" name="confirmDelete" /> Je confirme la suppression définitive (effacement des données)</label>
                      <button name="op" value="delete" className={btnDanger}>Supprimer définitivement</button>
                    </form>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {regs.length > 0 && (
        <form id="bulk-delete" action={bulkDeleteRegistrations} className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <input type="hidden" name="returnTo" value={returnTo} />
          <label className="flex items-center gap-1"><input type="checkbox" name="confirmDelete" /> Je confirme la suppression définitive des inscriptions cochées (effacement des données)</label>
          <button className={btnDanger}>Supprimer la sélection</button>
        </form>
      )}

      <h2 className="mt-12 font-display text-xl font-bold">Modifier l&apos;événement</h2>
      <div className="mt-4"><EventForm event={event} /></div>
    </main>
  );
}

function RegButton({ id, op, label, returnTo, danger = false }: { id: string; op: string; label: string; returnTo: string; danger?: boolean }) {
  return (
    <form action={registrationAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button name="op" value={op} className={danger ? btnDanger : btnGhost}>{label}</button>
    </form>
  );
}
