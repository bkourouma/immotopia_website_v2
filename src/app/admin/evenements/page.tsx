import { cookies } from "next/headers";
import Link from "next/link";
import { AdminBar, Badge, btn, btnGhost, btnOnDark, btnPrimary, card, fieldInput, Flash, Gauge, Hero } from "@/components/events/admin-ui";
import { ADMIN_COOKIE, adminConfigured, verifySessionToken } from "@/lib/events/auth";
import { getStats, listAllEvents, listAudit } from "@/lib/events/service";
import { formatDateFr } from "@/lib/events/time";
import { login, logout, seedFirstEvent } from "./actions";

export const dynamic = "force-dynamic";

const pub = { draft: "Brouillon", published: "Publié", archived: "Archivé" } as const;

export default async function AdminEvents({ searchParams }: { searchParams: Promise<{ ok?: string; err?: string }> }) {
  const sp = await searchParams;
  const authed = verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);

  if (!authed) {
    return (
      <main className="grid min-h-dvh place-items-center px-4 py-16">
        <div className={`${card} w-full max-w-sm p-7`}>
          <p className="text-sm font-semibold text-brand-600">ImmoTopia</p>
          <h1 className="mt-1 font-display text-2xl font-bold">Administration des événements</h1>
          <p className="mt-1 text-sm text-ink-900/60">Accès réservé à l&apos;équipe.</p>
          <div className="mt-6">
            <Flash ok={sp.ok} err={sp.err} />
            {!adminConfigured() ? (
              <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Accès fermé : définissez EVENTS_ADMIN_PASSWORD (12 caractères minimum) et EVENTS_ADMIN_SECRET (24 minimum) sur le serveur.</p>
            ) : (
              <form action={login} className="space-y-4">
                <label className="block text-sm font-medium">
                  Mot de passe
                  <input type="password" name="password" required autoFocus autoComplete="current-password" className={`${fieldInput} w-full`} />
                </label>
                <button className={`${btnPrimary} w-full`}>Se connecter</button>
              </form>
            )}
          </div>
        </div>
      </main>
    );
  }

  const events = listAllEvents();
  const log = listAudit(15);
  const rows = events.map((e) => ({ e, s: getStats(e.id) }));
  const totalSeats = rows.reduce((n, r) => n + r.s.confirmedSeats + r.s.directSeats, 0);
  const totalWait = rows.reduce((n, r) => n + r.s.waitlistSeats, 0);
  const published = events.filter((e) => e.publicationStatus === "published" && !e.cancelled).length;
  const kpi = (label: string, value: number) => (
    <div className={`${card} border-t-4 border-brand-500`}>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-900/55">{label}</p>
      <p className="mt-1 font-display text-4xl font-bold tabular-nums">{value}</p>
    </div>
  );
  const statusBadge = (e: (typeof events)[number]) =>
    e.cancelled ? <Badge tone="red">Annulé</Badge>
    : e.publicationStatus === "published" ? <Badge tone="green">{pub.published}</Badge>
    : e.publicationStatus === "draft" ? <Badge tone="amber">{pub.draft}</Badge>
    : <Badge>{pub.archived}</Badge>;

  return (
    <>
      <AdminBar><form action={logout}><button className={btnOnDark}>Se déconnecter</button></form></AdminBar>
      <Hero>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-300">Administration</p>
            <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">Événements</h1>
            <p className="mt-2 text-sm text-white/65">Créez, publiez et suivez les inscriptions.</p>
          </div>
          <Link href="/admin/evenements/nouveau" className={`${btn} bg-white text-ink-900 hover:bg-brand-300`}>+ Nouvel événement</Link>
        </div>
      </Hero>
      <main className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 pb-16">
        <Flash ok={sp.ok} err={sp.err} />

        {events.length === 0 ? (
          <div className={card}>
            <p>Aucun événement. Vous pouvez créer le premier (« Les Matinales de l&apos;Immobilier Digital », 10 décembre 2026) en un clic, en brouillon :</p>
            <form action={seedFirstEvent} className="mt-4"><button className={btnPrimary}>Initialiser l&apos;événement des Matinales</button></form>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {kpi("Événements", events.length)}
              {kpi("Publiés", published)}
              {kpi("Places confirmées", totalSeats)}
              {kpi("En liste d'attente", totalWait)}
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/[0.07]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-ink-900/10 bg-ink-900/[0.02] text-xs uppercase tracking-wide text-ink-900/60">
                  <tr>
                    <th scope="col" className="p-3">Événement</th>
                    <th scope="col" className="p-3">Date</th>
                    <th scope="col" className="p-3">Statut</th>
                    <th scope="col" className="p-3">Places</th>
                    <th scope="col" className="p-3">Attente</th>
                    <th scope="col" className="hidden p-3 lg:table-cell"><span className="sr-only">Action</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ e, s }) => (
                    <tr key={e.id} className="border-b border-ink-900/5 transition last:border-0 hover:bg-brand-500/[0.04]">
                      <td className="min-w-48 p-3 font-semibold"><Link href={`/admin/evenements/${e.id}`} className="text-ink-900 hover:text-brand-600 hover:underline">{e.title}</Link></td>
                      <td className="whitespace-nowrap p-3">{formatDateFr(e.startsAt, e.timezone)}</td>
                      <td className="p-3"><div className="flex flex-wrap gap-1">{statusBadge(e)}{e.registrationStatus === "closed" && <Badge tone="gray">Inscriptions closes</Badge>}</div></td>
                      <td className="p-3"><Gauge value={s.confirmedSeats + s.directSeats} max={e.capacity} /></td>
                      <td className="p-3 tabular-nums">{s.waitlistSeats}</td>
                      <td className="hidden p-3 text-right lg:table-cell"><Link href={`/admin/evenements/${e.id}`} className={btnGhost}>Gérer</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2 className="mt-12 font-display text-xl font-bold">Journal des actions récentes</h2>
        {log.length === 0 ? (
          <p className="mt-3 text-sm text-ink-900/60">Aucune action enregistrée.</p>
        ) : (
          <ul className="mt-3 divide-y divide-ink-900/5 rounded-2xl bg-white text-sm shadow-sm ring-1 ring-ink-900/[0.07]">
            {log.map((l, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 px-4 py-2.5">
                <span className="font-mono text-xs text-ink-900/50">{l.at.slice(0, 19).replace("T", " ")}</span>
                <span className="font-medium">{l.action}</span>
                <span className="text-ink-900/60">{[l.actor, l.target, l.detail].filter(Boolean).join(" · ")}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
