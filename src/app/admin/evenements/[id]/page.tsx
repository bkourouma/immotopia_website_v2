import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminBar, Badge, btnDanger, btnGhost, btnOnDark, btnPrimary, card, EventForm, fieldInput, Flash, Gauge, Hero } from "@/components/events/admin-ui";
import { ACTIVITIES } from "@/lib/events/types";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";
import { getEventById, getStats, listRegistrations } from "@/lib/events/service";
import { formatDateFr } from "@/lib/events/time";
import { bulkDeleteRegistrations, quickEvent, registrationAction } from "../actions";

export const dynamic = "force-dynamic";

const statusLabel = { confirmed: "Confirmée", waitlist: "Liste d'attente", cancelled: "Annulée" } as const;
const h2 = "font-display text-xl font-bold scroll-mt-16";
const navLink = "border-b-2 border-transparent py-3 text-ink-900/70 hover:border-brand-500 hover:text-ink-900";

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
  const filtered = Boolean(sp.q || sp.activity || sp.status);

  const tile = (label: string, value: string | number) => (
    <div className={`${card} border-t-4 border-brand-500/70`}>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-900/55">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold tabular-nums">{value}</p>
    </div>
  );
  const pubBadge = event.cancelled ? <Badge tone="red">Annulé</Badge> : event.publicationStatus === "published" ? <Badge tone="green">Publié</Badge> : event.publicationStatus === "draft" ? <Badge tone="amber">Brouillon</Badge> : <Badge>Archivé</Badge>;
  const statusBadge = (st: keyof typeof statusLabel) => <Badge tone={st === "confirmed" ? "green" : st === "waitlist" ? "amber" : "gray"}>{statusLabel[st]}</Badge>;
  const attBadge = (a: string) => (a === "present" ? <Badge tone="blue">Présent</Badge> : a === "absent" ? <Badge tone="red">Absent</Badge> : null);

  return (
    <>
      <AdminBar>
        <a href={`/evenements/${event.slug}`} target="_blank" rel="noopener noreferrer" className={btnOnDark}>{event.publicationStatus === "draft" ? "Aperçu" : "Voir la page"}</a>
      </AdminBar>
      <Hero lead="pb-16">
        <Link href="/admin/evenements" className="text-sm text-brand-300 hover:text-white">← Retour aux événements</Link>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{event.title}</h1>
        <p className="mt-1.5 text-white/65">{formatDateFr(event.startsAt, event.timezone)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pubBadge}
          <Badge tone={event.registrationStatus === "open" ? "green" : "gray"}>Inscriptions {event.registrationStatus === "open" ? "ouvertes" : "closes"}</Badge>
          <Badge tone={event.venueStatus === "confirmed" ? "green" : "amber"}>Lieu {event.venueStatus === "confirmed" ? "confirmé" : "provisoire"}</Badge>
        </div>
      </Hero>
      <nav aria-label="Sections" className="sticky top-[53px] z-20 border-b border-ink-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 text-sm font-medium">
          <a href="#tableau" className={navLink}>Tableau de bord</a>
          <a href="#inscriptions" className={navLink}>Inscriptions</a>
          <a href="#modifier" className={navLink}>Modifier</a>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <Flash ok={sp.ok} err={sp.err} />

        <div className={`${card} flex flex-wrap items-center gap-2`}>
          {event.publicationStatus === "published" ? <Quick id={id} op="unpublish" label="Dépublier" /> : <Quick id={id} op="publish" label="Publier" />}
          {event.publicationStatus !== "archived" && <Quick id={id} op="archive" label="Archiver" />}
          {event.registrationStatus === "open" ? <Quick id={id} op="close" label="Fermer les inscriptions" /> : <Quick id={id} op="open" label="Ouvrir les inscriptions" />}
          {event.venueStatus === "provisional" ? <Quick id={id} op="venue_confirmed" label="Confirmer le lieu" /> : <Quick id={id} op="venue_provisional" label="Lieu : repasser en provisoire" />}
          <span className="ml-auto">{event.cancelled ? <Quick id={id} op="uncancel" label="Rétablir l'événement" /> : <Quick id={id} op="cancel" label="Annuler l'événement" danger />}</span>
        </div>

        <h2 id="tableau" className={`${h2} mt-10`}>Tableau de bord</h2>
        <div className={`${card} mt-3`}>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-900/55">Remplissage</p>
          <div className="mt-1"><Gauge value={stats.confirmedSeats + stats.directSeats} max={event.capacity} /></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {tile("Inscrits site (actifs)", stats.registrations)}
          {tile("Places retenues", `${stats.confirmedSeats + stats.directSeats} / ${event.capacity}`)}
          {tile("Inscrits directs", stats.directSeats)}
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
            <label className="text-sm font-medium">Capacité<input type="number" min={0} name="capacity" defaultValue={event.capacity} className={`${fieldInput} w-28`} /></label>
            <button className={btnGhost}>Modifier</button>
          </form>
          <form action={quickEvent} className="flex items-end gap-2">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="op" value="direct_seats" />
            <label className="text-sm font-medium">Inscrits directs<input type="number" min={0} name="directSeats" defaultValue={event.directSeats} className={`${fieldInput} w-28`} /></label>
            <button className={btnGhost}>Modifier</button>
          </form>
          <p className="text-sm text-ink-900/70">
            Par activité : {stats.byActivity.length === 0 ? "—" : stats.byActivity.map((a) => `${a.activity} (${a.count})`).join(", ")}
          </p>
        </div>

        <h2 id="inscriptions" className={`${h2} mt-10`}>Inscriptions <span className="text-base font-normal text-ink-900/55">({regs.length})</span></h2>
        <form method="get" action="#inscriptions" className={`${card} mt-3 flex flex-wrap items-end gap-3`}>
          <label className="text-sm font-medium">Recherche<input name="q" defaultValue={sp.q} placeholder="Nom, entreprise, e-mail" className={fieldInput} /></label>
          <label className="text-sm font-medium">Activité
            <select name="activity" defaultValue={sp.activity ?? ""} className={fieldInput}>
              <option value="">Toutes</option>
              {ACTIVITIES.map((a) => <option key={a}>{a}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Statut
            <select name="status" defaultValue={sp.status ?? ""} className={fieldInput}>
              <option value="">Tous</option>
              <option value="confirmed">Confirmées</option>
              <option value="waitlist">Liste d&apos;attente</option>
              <option value="cancelled">Annulées</option>
              <option value="present">Présents</option>
              <option value="absent">Absents</option>
            </select>
          </label>
          <button className={btnPrimary}>Filtrer</button>
          {filtered && <a href={`${returnTo}#inscriptions`} className="py-2 text-sm text-brand-600 hover:underline">Réinitialiser</a>}
          <a href={`/admin/evenements/${id}/export${exportQuery ? `?${exportQuery}` : ""}`} className={`${btnGhost} sm:ml-auto`}>Exporter en CSV</a>
        </form>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/[0.07]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-900/10 bg-ink-900/[0.02] text-xs uppercase tracking-wide text-ink-900/60">
              <tr><th scope="col" className="p-3"><span className="sr-only">Sélection</span></th><th scope="col" className="p-3">Participant</th><th scope="col" className="p-3">Contact</th><th scope="col" className="p-3">Activité</th><th scope="col" className="p-3">Statut</th><th scope="col" className="p-3">Actions</th></tr>
            </thead>
            <tbody>
              {regs.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-ink-900/60">{filtered ? "Aucun résultat pour ces filtres." : "Aucune inscription pour le moment."}</td></tr>}
              {regs.map((r) => (
                <tr key={r.id} className="border-b border-ink-900/5 align-top last:border-0 hover:bg-brand-500/[0.03]">
                  <td className="p-3"><input type="checkbox" name="ids" value={r.id} form="bulk-delete" aria-label={`Sélectionner ${r.fullName}`} className="size-4" /></td>
                  <td className="p-3"><p className="font-semibold">{r.fullName}{r.seats > 1 ? ` (+${r.seats - 1})` : ""}</p><p className="text-ink-900/60">{r.company} · {r.jobTitle}</p><p className="font-mono text-xs text-ink-900/50">{r.reference}</p></td>
                  <td className="p-3"><p>{r.email}</p><p>{r.phone}</p>{r.comment && <p className="mt-1 text-ink-900/60">« {r.comment} »</p>}</td>
                  <td className="p-3">{r.activity}{r.marketingConsentAt ? <p className="text-xs text-emerald-700">Accepte les communications</p> : null}</td>
                  <td className="p-3"><div className="flex flex-col items-start gap-1">{statusBadge(r.status)}{r.status === "confirmed" && attBadge(r.attendance)}</div></td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {r.status !== "confirmed" && <RegButton id={r.id} op="confirm" label="Confirmer" returnTo={returnTo} />}
                      {r.status !== "cancelled" && <RegButton id={r.id} op="cancel" label="Annuler" returnTo={returnTo} danger />}
                      {r.status === "confirmed" && <RegButton id={r.id} op="present" label="Présent" returnTo={returnTo} />}
                      {r.status === "confirmed" && <RegButton id={r.id} op="absent" label="Absent" returnTo={returnTo} />}
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs font-medium text-ink-900/55 hover:text-ink-900">Plus d&apos;options</summary>
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
          <form id="bulk-delete" action={bulkDeleteRegistrations} className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-red-200 bg-red-50/50 p-4 text-sm">
            <input type="hidden" name="returnTo" value={returnTo} />
            <label className="flex items-center gap-1"><input type="checkbox" name="confirmDelete" /> Je confirme la suppression définitive des inscriptions cochées (effacement des données)</label>
            <button className={btnDanger}>Supprimer la sélection</button>
          </form>
        )}

        <h2 id="modifier" className={`${h2} mt-12`}>Modifier l&apos;événement</h2>
        <div className="mt-4"><EventForm event={event} /></div>
      </main>
    </>
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
