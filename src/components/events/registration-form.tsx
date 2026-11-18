"use client";

import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ACTIVITIES } from "@/lib/events/types";
import { EMAIL_RE } from "@/lib/events/validation";

type Fields = "fullName" | "company" | "jobTitle" | "email" | "phone" | "activity" | "consentProcessing";
type Done = { status: "confirmed" | "waitlist"; reference: string; reason?: "capacity" | "company" | "" };

const input = "mt-1.5 w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-base text-ink-900 outline-none transition placeholder:text-ink-900/35 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 aria-[invalid=true]:border-red-500";

/** Formulaire d'inscription : validation d'aide côté client, la vraie validation reste sur le serveur (/api/events/register). */
export function RegistrationForm({ slug, waitlist, eventTitle }: { slug: string; waitlist: boolean; eventTitle: string }) {
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const payload = {
      slug,
      fullName: get("fullName"),
      company: get("company"),
      jobTitle: get("jobTitle"),
      email: get("email"),
      phone: get("phone"),
      activity: get("activity"),
      comment: get("comment"),
      consentProcessing: f.get("consentProcessing") === "on",
      consentMarketing: f.get("consentMarketing") === "on",
      website: get("website"),
      elapsedMs: Date.now() - startedAt.current,
    };

    const local: Partial<Record<Fields, string>> = {};
    if (payload.fullName.length < 3 || !payload.fullName.includes(" ")) local.fullName = "Indiquez votre nom et votre prénom.";
    if (payload.company.length < 2) local.company = "Indiquez le nom de votre entreprise.";
    if (payload.jobTitle.length < 2) local.jobTitle = "Indiquez votre fonction.";
    if (!EMAIL_RE.test(payload.email)) local.email = "Indiquez une adresse e-mail valide.";
    const digits = payload.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) local.phone = "Indiquez un numéro valide (ex. +225 01 02 03 04 05).";
    if (!payload.activity) local.activity = "Choisissez votre activité principale.";
    if (!payload.consentProcessing) local.consentProcessing = "Ce consentement est nécessaire pour gérer votre inscription.";
    setErrors(local);
    setFormError("");
    if (Object.keys(local).length > 0) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/events/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setDone({ status: data.status, reference: data.reference, reason: data.waitlistReason });
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFormError(data.error || "L'inscription a échoué. Réessayez dans un instant.");
    } catch {
      setFormError("Connexion impossible. Vérifiez votre réseau puis réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    const wait = done.status === "waitlist";
    return (
      <div role="status" className="rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] md:p-8">
        {wait ? <Clock className="size-10 text-sun-500" aria-hidden /> : <CheckCircle2 className="size-10 text-emerald-600" aria-hidden />}
        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{wait ? "Vous êtes sur liste d'attente" : "Inscription confirmée"}</h3>
        <p className="mt-2 text-ink-900/70">
          {wait
            ? done.reason === "company"
              ? `Plusieurs personnes de votre entreprise sont déjà inscrites à « ${eventTitle} » : votre demande est enregistrée en liste d'attente et votre place n'est pas encore confirmée. Nous reviendrons vers vous selon les places disponibles.`
              : `Les places sont toutes prises : votre demande pour « ${eventTitle} » est enregistrée, mais votre place n'est pas encore confirmée. Nous vous écrirons si une place se libère.`
            : `Merci ! Votre place pour « ${eventTitle} » est confirmée. Un e-mail de confirmation vous est envoyé si le service e-mail est actif.`}
        </p>
        <p className="mt-4 text-sm text-ink-900/60">Votre référence</p>
        <p className="font-mono text-xl font-bold tracking-wider">{done.reference}</p>
      </div>
    );
  }

  const err = (k: Fields) => (errors[k] ? <p id={`err-${k}`} className="mt-1 text-sm text-red-600">{errors[k]}</p> : null);
  const a11y = (k: Fields) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[22px] bg-white p-5 ring-1 ring-ink-900/[0.07] sm:p-6 md:p-8" aria-label="Inscription à l'événement">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium sm:col-span-2">
          Nom et prénom *
          <input name="fullName" autoComplete="name" required maxLength={120} className={input} {...a11y("fullName")} />
          {err("fullName")}
        </label>
        <label className="block text-sm font-medium">
          Entreprise *
          <input name="company" autoComplete="organization" required maxLength={120} className={input} {...a11y("company")} />
          {err("company")}
        </label>
        <label className="block text-sm font-medium">
          Fonction *
          <input name="jobTitle" autoComplete="organization-title" required maxLength={120} className={input} {...a11y("jobTitle")} />
          {err("jobTitle")}
        </label>
        <label className="block text-sm font-medium">
          E-mail professionnel *
          <input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} className={input} {...a11y("email")} />
          {err("email")}
        </label>
        <label className="block text-sm font-medium">
          Téléphone / WhatsApp *
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} placeholder="+225 …" className={input} {...a11y("phone")} />
          {err("phone")}
        </label>
        <label className="block text-sm font-medium">
          Activité principale *
          <select name="activity" required defaultValue="" className={input} {...a11y("activity")}>
            <option value="" disabled>
              Choisir…
            </option>
            {ACTIVITIES.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          {err("activity")}
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Besoin particulier ou commentaire (facultatif)
          <textarea name="comment" rows={3} maxLength={1000} className={input} />
        </label>
      </div>

      {/* Champ piège : invisible pour les personnes, rempli par les robots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <label className="flex gap-3">
          <input type="checkbox" name="consentProcessing" className="mt-1 size-5 shrink-0 accent-brand-600" {...a11y("consentProcessing")} />
          <span>
            J&apos;accepte que mes données soient traitées par Alliance Consultants pour gérer mon inscription à cet événement (
            <a href="/confidentialite" className="underline" target="_blank" rel="noopener noreferrer">
              politique de confidentialité
            </a>
            ). *
          </span>
        </label>
        {err("consentProcessing")}
        <label className="flex gap-3">
          <input type="checkbox" name="consentMarketing" className="mt-1 size-5 shrink-0 accent-brand-600" />
          <span>Je souhaite recevoir les actualités et offres commerciales d&apos;ImmoTopia (facultatif, désabonnement à tout moment).</span>
        </label>
      </div>

      {formError && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/30 disabled:opacity-60 sm:w-auto"
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {loading ? "Envoi en cours…" : waitlist ? "Rejoindre la liste d'attente" : "Je m'inscris"}
      </button>
      <p className="mt-3 text-xs text-ink-900/50">Aucun compte n&apos;est nécessaire. Les champs marqués * sont obligatoires.</p>
    </form>
  );
}
