import { cookies } from "next/headers";
import Link from "next/link";
import { btnGhost, btnPrimary, Flash } from "@/components/events/admin-ui";
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
      <main className="mx-auto max-w-sm px-4 py-24">
        <h1 className="font-display text-2xl font-bold">Administration des événements</h1>
        <div className="mt-6">
          <Flash ok={sp.ok} err={sp.err} />
          {!adminConfigured() ? (
            <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Accès fermé : définissez EVENTS_ADMIN_PASSWORD (12 caractères minimum) et EVENTS_ADMIN_SECRET (24 minimum) sur le serveur.</p>
          ) : (
            <form action={login} className="space-y-4">
              <label className="block text-sm font-medium">
                Mot de passe
                <input type="password" name="password" required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20" />
              </label>
              <button className={btnPrimary}>Se connecter</button>
            </form>
          )}
        </div>
      </main>
    );
  }

  const events = listAllEvents();
  const log = listAudit(15);
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">Événements</h1>
        <div className="flex gap-2">
          <Link href="/admin/evenements/nouveau" className={btnPrimary}>Nouvel événement</Link>
          <form action={logout}><button className={btnGhost}>Se déconnecter</button></form>
        </div>
      </div>
      <div className="mt-6"><Flash ok={sp.ok} err={sp.err} /></div>

      {events.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-900/[0.07]">
          <p>Aucun événement. Vous pouvez créer le premier (« Les Matinales de l&apos;Immobilier Digital », 10 décembre 2026) en un clic, en brouillon :</p>
          <form action={seedFirstEvent} className="mt-4"><button className={btnPrimary}>Initialiser l&apos;événement des Matinales</button></form>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-ink-900/[0.07]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-900/10 text-xs uppercase text-ink-900/60">
              <tr><th className="p-3">Événement</th><th className="p-3">Date</th><th className="p-3">Statut</th><th className="p-3">Places</th><th className="p-3">Attente</th></tr>
            </thead>
            <tbody>
              {events.map((e) => {
                const s = getStats(e.id);
                return (
                  <tr key={e.id} className="border-b border-ink-900/5 last:border-0">
                    <td className="p-3 font-semibold"><Link href={`/admin/evenements/${e.id}`} className="text-brand-600 hover:underline">{e.title}</Link></td>
                    <td className="p-3">{formatDateFr(e.startsAt, e.timezone)}</td>
                    <td className="p-3">{e.cancelled ? "Annulé" : pub[e.publicationStatus]}{e.registrationStatus === "closed" ? " · inscriptions closes" : ""}</td>
                    <td className="p-3">{s.confirmedSeats} / {e.capacity}</td>
                    <td className="p-3">{s.waitlistSeats}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mt-12 font-display text-xl font-bold">Journal des actions récentes</h2>
      <ul className="mt-3 space-y-1 text-sm text-ink-900/70">
        {log.map((l, i) => (
          <li key={i}><span className="font-mono text-xs">{l.at.slice(0, 19).replace("T", " ")}</span> · {l.actor} · {l.action} {l.target && `· ${l.target}`} {l.detail && `· ${l.detail}`}</li>
        ))}
      </ul>
    </main>
  );
}
