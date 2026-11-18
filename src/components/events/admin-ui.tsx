import { saveEvent } from "@/app/admin/evenements/actions";
import { eventToFormValues } from "@/lib/events/event-form";
import type { EventRecord } from "@/lib/events/types";

export const btn = "inline-flex min-h-9 items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-brand-500/30";
export const btnPrimary = `${btn} bg-brand-600 text-white hover:bg-brand-500`;
export const btnGhost = `${btn} border border-ink-900/15 bg-white text-ink-900 hover:bg-ink-900/5`;
export const btnDanger = `${btn} border border-red-300 bg-white text-red-700 hover:bg-red-50`;
const field = "mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20";

export function Flash({ ok, err }: { ok?: string; err?: string }) {
  if (!ok && !err) return null;
  return (
    <p role={err ? "alert" : "status"} className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${err ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>
      {err || ok}
    </p>
  );
}

function Label({ text, children, wide = false }: { text: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block text-sm font-medium ${wide ? "md:col-span-2" : ""}`}>
      {text}
      {children}
    </label>
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
    <form action={saveEvent} className="space-y-8">
      {event && <input type="hidden" name="id" value={event.id} />}
      <fieldset className="grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] md:grid-cols-2">
        <legend className="px-1 font-display text-lg font-bold">Identité</legend>
        <Label text="Titre *"><input name="title" required defaultValue={v?.title} className={field} /></Label>
        <Label text="Adresse (slug) * — /evenements/…"><input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={v?.slug} className={field} /></Label>
        <Label text="Thème" wide><input name="theme" defaultValue={v?.theme} className={field} /></Label>
        <Label text="Accroche" wide><input name="tagline" defaultValue={v?.tagline} className={field} /></Label>
        <Label text="Description (paragraphes séparés par une ligne vide)" wide><textarea name="description" rows={7} defaultValue={v?.description} className={field} /></Label>
        <Label text="Organisateur"><input name="organizer" defaultValue={v?.organizer ?? "Alliance Consultants RCI"} className={field} /></Label>
        <Label text="Solution présentée"><input name="solution" defaultValue={v?.solution ?? "ImmoTopia"} className={field} /></Label>
        <Label text="Image de couverture (/images/… ou https://…)" wide><input name="image" defaultValue={v?.image} className={field} /></Label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] md:grid-cols-2">
        <legend className="px-1 font-display text-lg font-bold">Date et lieu</legend>
        <Label text="Début * (heure locale du fuseau)"><input type="datetime-local" name="startsLocal" required defaultValue={v?.startsLocal} className={field} /></Label>
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
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] md:grid-cols-2">
        <legend className="px-1 font-display text-lg font-bold">Inscriptions et publication</legend>
        <Label text="Capacité (places)"><input type="number" min={0} name="capacity" defaultValue={v?.capacity ?? 30} className={field} /></Label>
        <Label text="Inscriptions max. par entreprise (0 = illimité ; au-delà : liste d'attente)"><input type="number" min={0} name="maxPerCompany" defaultValue={v?.maxPerCompany ?? 2} className={field} /></Label>
        <Label text="Conservation des données (mois après l'événement)"><input type="number" min={1} max={120} name="retentionMonths" defaultValue={v?.retentionMonths ?? 24} className={field} /></Label>
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
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] md:grid-cols-2">
        <legend className="px-1 font-display text-lg font-bold">Contenu</legend>
        <Label text="Public concerné (une ligne par public)"><textarea name="audience" rows={6} defaultValue={v?.audienceText} className={field} /></Label>
        <Label text="Thématiques (une par ligne)"><textarea name="topics" rows={6} defaultValue={v?.topicsText} className={field} /></Label>
        <Label text="Programme (une ligne par séquence : « 09h00 – 09h15 | Accueil »)" wide><textarea name="program" rows={6} defaultValue={v?.programText} className={`${field} font-mono`} /></Label>
        <Label text="Informations pratiques" wide><textarea name="practicalInfo" rows={3} defaultValue={v?.practicalInfo} className={field} /></Label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] md:grid-cols-2">
        <legend className="px-1 font-display text-lg font-bold">Offre commerciale (communication seulement, aucun effet sur la facturation)</legend>
        <div className="md:col-span-2">{check("promoVisible", "Afficher l'offre sur la page publique", v?.promo.visible ?? false)}</div>
        <Label text="Titre de l'offre"><input name="promoTitle" defaultValue={v?.promo.title} className={field} /></Label>
        <Label text="Mention de validité"><input name="promoNote" defaultValue={v?.promo.note} className={field} /></Label>
        <Label text="Avantages (un par ligne)" wide><textarea name="promoItems" rows={4} defaultValue={v?.promoItemsText} className={field} /></Label>
      </fieldset>

      <button type="submit" className={btnPrimary}>Enregistrer</button>
    </form>
  );
}
