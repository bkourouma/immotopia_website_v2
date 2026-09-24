"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BookingFrame, Thanks } from "./booking-frame";
import { useI18n } from "./locale-provider";

// Lien public de réservation Calendly ou Cal.com (ex. https://calendly.com/immotopia).
// S'il est absent, un formulaire de qualification intégré est affiché à la place.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-ink-900 text-white shadow-2xl outline-none sm:rounded-[28px]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-mint-400 uppercase">{t("Démonstration personnalisée · 30 min", "Personalized demo · 30 min")}</p>
                <h2 id="demo-title" className="mt-1 font-display text-2xl font-bold md:text-3xl">
                  {t("Voyez ImmoTopia tourner sur vos propres cas.", "See ImmoTopia at work on your own portfolio.")}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label={t("Fermer", "Close")}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {BOOKING_URL ? (
                <BookingFrame url={BOOKING_URL} onDone={onClose} />
              ) : (
                <LeadForm onDone={onClose} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// La valeur transmise reste en français (données homogènes côté n8n / Airtable) ; seul le libellé est traduit.
type Option = { value: string; en: string };
const structures: Option[] = [
  { value: "Agence (location, transaction)", en: "Agency (lettings, sales)" },
  { value: "Syndic de copropriété", en: "Condominium management" },
  { value: "Promoteur immobilier", en: "Property developer" },
  { value: "Plusieurs métiers", en: "Several of these" },
];
const volumes: Option[] = [
  { value: "Moins de 100 lots", en: "Fewer than 100 units" },
  { value: "100 à 500 lots", en: "100 to 500 units" },
  { value: "500 à 2 000 lots", en: "500 to 2,000 units" },
  { value: "Plus de 2 000 lots", en: "More than 2,000 units" },
];
const roles: Option[] = [
  { value: "Directeur / Gérant", en: "Director / Manager" },
  { value: "Comptable", en: "Accountant" },
  { value: "Gestionnaire / Agent", en: "Property manager / Agent" },
  { value: "Autre", en: "Other" },
];

function LeadForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { locale, t } = useI18n();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <Thanks
        onDone={onDone}
        text={t(
          "Un expert ImmoTopia vous recontacte sous 24 h ouvrées pour fixer le créneau de votre démonstration.",
          "An ImmoTopia expert will get back to you within one business day to schedule your demo.",
        )}
      />
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 p-6 md:grid-cols-2">
      <Choice name="structure" label={t("Vous êtes…", "You are…")} options={structures} />
      <Choice name="volume" label={t("Nombre de lots gérés", "Units under management")} options={volumes} />
      <Choice name="role" label={t("Votre fonction", "Your role")} options={roles} className="md:col-span-2" />
      <Field name="name" label={t("Nom complet", "Full name")} autoComplete="name" required />
      <Field name="company" label={t("Agence / Cabinet", "Agency / Firm")} autoComplete="organization" required />
      <Field name="email" label={t("E-mail professionnel", "Work email")} type="email" autoComplete="email" required />
      <Field name="phone" label={t("Téléphone / WhatsApp", "Phone / WhatsApp")} type="tel" autoComplete="tel" placeholder="+225 07 00 00 00 00" required />
      {/* Champ piège anti-robots, invisible pour les humains */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="shine flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 py-4 font-semibold shadow-[0_10px_40px_-10px_rgba(91,91,247,0.9)] disabled:opacity-70"
        >
          {state === "sending" ? <Loader2 className="size-5 animate-spin" /> : <CalendarCheck className="size-5" />}
          {t("Réserver ma démonstration", "Book my demo")}
        </button>
        {state === "error" && (
          <p role="alert" className="mt-3 text-center text-sm text-rose-300">
            {t("L'envoi a échoué. Vérifiez votre connexion et réessayez.", "Something went wrong. Please check your connection and try again.")}
          </p>
        )}
        <p className="mt-3 text-center text-xs text-white/40">
          {t("Vos informations servent uniquement à organiser la démonstration.", "Your details are used only to arrange your demo.")}
        </p>
      </div>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/75">{label}</span>
      <input
        {...props}
        maxLength={120}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-400 focus:bg-white/[0.08] focus:ring-4 focus:ring-brand-500/20"
      />
    </label>
  );
}

function Choice({ name, label, options, className = "" }: { name: string; label: string; options: Option[]; className?: string }) {
  const { locale } = useI18n();
  return (
    <fieldset className={className}>
      <legend className="text-sm font-medium text-white/75">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} required={i === 0} className="peer sr-only" />
            <span className="block rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-sm text-white/75 transition peer-checked:border-brand-400 peer-checked:bg-brand-500 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/30 hover:bg-white/10">
              {locale === "en" ? o.en : o.value}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
