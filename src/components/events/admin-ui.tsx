import Link from "next/link";
import { saveEvent } from "@/app/admin/evenements/actions";
import { eventToFormValues } from "@/lib/events/event-form";
import type { EventRecord } from "@/lib/events/types";

export const btn = "inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30";
export const btnPrimary = `${btn} bg-brand-600 text-white hover:bg-brand-500`;
export const btnGhost = `${btn} border border-ink-900/15 bg-white text-ink-900 hover:bg-ink-900/5`;
export const btnOnDark = `${btn} border border-white/20 bg-white/10 text-white hover:bg-white/20`;
export const btnDanger = `${btn} border border-red-300 bg-white text-red-700 hover:bg-red-50`;
export const card = "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-900/[0.07]";
export const fieldInput = "mt-1 block rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20";
const field = "mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20";

export function Flash({ ok, err }: { ok?: string; err?: string }) {
  if (!ok && !err) return null;
  return (
    <p role={err ? "alert" : "status"} className={`mb-6 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${err ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
      <span aria-hidden="true">{err ? "⚠" : "✓"}</span>
      <span>{err || ok}</span>
    </p>
  );
}

function Label({ text, hint, children, wide = false }: { text: string; hint?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block text-sm font-medium ${wide ? "md:col-span-2" : ""}`}>
      {text}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-ink-900/55">{hint}</span>}
    </label>
  );
}

const tones = {
  green: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  gray: "bg-ink-900/5 text-ink-900/70 ring-ink-900/10",
  blue: "bg-brand-500/10 text-brand-600 ring-brand-600/20",
} as const;

export function Badge({ tone = "gray", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}

/** Jauge de remplissage (places confirmées / capacité). */
export function Gauge({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const color = pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="min-w-24">
      <p className="text-sm font-semibold tabular-nums">{value} / {max}</p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-900/10" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label="Remplissage">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Barre supérieure commune à toutes les pages d'administration. */
export function AdminBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-900/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/admin/evenements" className="flex items-center gap-2.5 font-display text-base font-bold">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-sun-500 text-sm">I</span>
          ImmoTopia <span className="hidden font-sans text-sm font-medium text-white/55 sm:inline">· Administration</span>
        </Link>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}

/** Section de formulaire : en-tête numéroté + grille de champs. */
function Section({ n, title, desc, children }: { n: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <fieldset className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/[0.07]">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center gap-3 border-b border-ink-900/[0.06] bg-gradient-to-r from-brand-500/[0.07] to-transparent px-5 py-4">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 font-display text-sm font-bold text-white">{n}</span>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight">{title}</h3>
          <p className="text-xs text-ink-900/55">{desc}</p>
        </div>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** Bandeau d'en-tête sombre des pages d'administration. */
export function Hero({ children, lead = "pb-20" }: { children: React.ReactNode; lead?: string }) {
  return (
    <div className="relative overflow-hidden bg-ink-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-brand-500/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-sun-500/15 blur-3xl" />
      <div className={`relative mx-auto max-w-6xl px-4 pt-8 ${lead}`}>{children}</div>
    </div>
  );
}

/** Formulaire de création / modification d'un événement (sans JavaScript client : formulaire HTML + Server Action). */
export function EventForm({ event }: { event?: EventRecord }) {
  const v = event ? eventToFormValues(event) : null;
  const check = (name: string, label: string, checked: boolean) => (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={checked} className="size-4 accent-brand-600" /> {label}
    </label>
  );
  return (
    <form action={saveEvent} className="space-y-6">
      {event && <input type="hidden" name="id" value={event.id} />}
      <Section n="1" title="Identité" desc="Titre, adresse et présentation de l'événement.">
        <Label text="Titre *"><input name="title" required defaultValue={v?.title} className={field} /></Label>
        <Label text="Adresse (slug) *" hint="Lettres minuscules, chiffres et tirets. Page publique : /evenements/votre-adresse"><input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={v?.slug} className={field} /></Label>
        <Label text="Thème" wide><input name="theme" defaultValue={v?.theme} className={field} /></Label>
        <Label text="Accroche" wide><input name="tagline" defaultValue={v?.tagline} className={field} /></Label>
        <Label text="Description" hint="Séparez les paragraphes par une ligne vide." wide><textarea name="description" rows={7} defaultValue={v?.description} className={field} /></Label>
        <Label text="Organisateur"><input name="organizer" defaultValue={v?.organizer ?? "Alliance Consultants RCI"} className={field} /></Label>
        <Label text="Solution présentée"><input name="solution" defaultValue={v?.solution ?? "ImmoTopia"} className={field} /></Label>
        <Label text="Image de couverture" hint="Chemin /images/… ou adresse https://…" wide><input name="image" defaultValue={v?.image} className={field} /></Label>
      </Section>

      <Section n="2" title="Date et lieu" desc="Quand et où l'événement se déroule.">
        <Label text="Début *" hint="Heure locale du fuseau horaire choisi ci-dessous."><input type="datetime-local" name="startsLocal" required defaultValue={v?.startsLocal} className={field} /></Label>
        <Label text="Fin *"><input type="datetime-local" name="endsLocal" required defaultValue={v?.endsLocal} className={field} /></Label>
        <Label text="Fuseau horaire"><input name="timezone" defaultValue={v?.timezone ?? "Africa/Abidjan"} className={field} /></Label>
        <Label text="Participation"><input name="feeLabel" defaultValue={v?.feeLabel ?? "Gratuite, sur inscription"} className={field} /></Label>
        <Label text="Établissement"><input name="venueName" defaultValue={v?.venueName} className={field} /></Label>
        <Label text="Commune"><input name="venueDistrict" defaultValue={v?.venueDistrict} className={field} /></Label>
        <Label text="Ville"><input name="venueCity" defaultValue={v?.venueCity ?? "Abidjan"} className={field} /></Label>
        <Label text="Statut du lieu">
          <select name="venueStatus" defaultValue={v?.venueStatus ?? "provisional"} className={field}>
            <option value="provisional">Provisoire (à confirmer)</option>
            <option value="confirmed">Confirmé</option>
          </select>
        </Label>
      </Section>

      <Section n="3" title="Inscriptions et publication" desc="Capacité, règles d'inscription et visibilité.">
        <Label text="Capacité (places)"><input type="number" min={0} name="capacity" defaultValue={v?.capacity ?? 30} className={field} /></Label>
        <Label text="Inscriptions max. par entreprise" hint="0 = illimité ; au-delà, les inscrits passent en liste d'attente."><input type="number" min={0} name="maxPerCompany" defaultValue={v?.maxPerCompany ?? 2} className={field} /></Label>
        <Label text="Conservation des données (mois)" hint="Durée après l'événement avant effacement."><input type="number" min={1} max={120} name="retentionMonths" defaultValue={v?.retentionMonths ?? 24} className={field} /></Label>
        <Label text="Publication">
          <select name="publicationStatus" defaultValue={v?.publicationStatus ?? "draft"} className={field}>
            <option value="draft">Brouillon (non visible)</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé (visible, terminé)</option>
          </select>
        </Label>
        <Label text="Inscriptions">
          <select name="registrationStatus" defaultValue={v?.registrationStatus ?? "open"} className={field}>
            <option value="open">Ouvertes</option>
            <option value="closed">Fermées</option>
          </select>
        </Label>
        <div className="space-y-2 md:col-span-2">
          {check("waitlistEnabled", "Liste d'attente quand c'est complet", v?.waitlistEnabled ?? true)}
          {check("showRemaining", "Afficher le nombre de places restantes", v?.showRemaining ?? true)}
          {check("cancelled", "Événement annulé", v?.cancelled ?? false)}
        </div>
      </Section>

      <Section n="4" title="Contenu" desc="Public, thématiques et programme affichés sur la page.">
        <Label text="Public concerné" hint="Une ligne par public."><textarea name="audience" rows={6} defaultValue={v?.audienceText} className={field} /></Label>
        <Label text="Thématiques" hint="Une par ligne."><textarea name="topics" rows={6} defaultValue={v?.topicsText} className={field} /></Label>
        <Label text="Programme" hint="Une ligne par séquence, par exemple : 09h00 – 09h15 | Accueil" wide><textarea name="program" rows={6} defaultValue={v?.programText} className={`${field} font-mono`} /></Label>
        <Label text="Informations pratiques" wide><textarea name="practicalInfo" rows={3} defaultValue={v?.practicalInfo} className={field} /></Label>
      </Section>

      <Section n="5" title="Offre commerciale" desc="Communication seulement : aucun effet sur la facturation.">
        <div className="md:col-span-2">{check("promoVisible", "Afficher l'offre sur la page publique", v?.promo.visible ?? false)}</div>
        <Label text="Titre de l'offre"><input name="promoTitle" defaultValue={v?.promo.title} className={field} /></Label>
        <Label text="Mention de validité"><input name="promoNote" defaultValue={v?.promo.note} className={field} /></Label>
        <Label text="Avantages" hint="Un par ligne." wide><textarea name="promoItems" rows={4} defaultValue={v?.promoItemsText} className={field} /></Label>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t border-ink-900/10 bg-white/95 px-4 py-3 backdrop-blur">
        <p className="text-xs text-ink-900/60">Les champs marqués * sont obligatoires.</p>
        <button type="submit" className={btnPrimary}>Enregistrer les modifications</button>
      </div>
    </form>
  );
}
