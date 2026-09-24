"use client";

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "./locale-provider";

// Calendrier de réservation (Calendly ou Cal.com) intégré dans la page.
// À n'afficher que côté navigateur : l'adresse d'intégration utilise le domaine courant.
export function BookingFrame({ url, onDone, className = "h-[72dvh]" }: { url: string; onDone?: () => void; className?: string }) {
  const [booked, setBooked] = useState(false);
  const { t } = useI18n();

  // Calendly prévient la page parente quand un créneau est réservé
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com" && e.data?.event === "calendly.event_scheduled") setBooked(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (booked)
    return (
      <Thanks
        onDone={onDone}
        text={t(
          "Votre démonstration est réservée. Vous allez recevoir la confirmation et l'invitation par e-mail.",
          "Your demo is booked. You'll receive the confirmation and calendar invite by email.",
        )}
      />
    );

  const src = new URL(url);
  if (src.hostname.endsWith("calendly.com")) {
    src.searchParams.set("embed_domain", window.location.hostname);
    src.searchParams.set("embed_type", "Inline");
    src.searchParams.set("hide_gdpr_banner", "1");
  }
  return <iframe src={src.toString()} title={t("Réserver une démonstration", "Book a demo")} className={`w-full bg-white ${className}`} />;
}

export function Thanks({ text, onDone }: { text: string; onDone?: () => void }) {
  const { t } = useI18n();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center p-10 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-mint-400 text-ink-950">
        <CalendarCheck className="size-8" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold">{t("C'est noté !", "You're all set!")}</h3>
      <p className="mt-2 max-w-md text-white/65">{text}</p>
      {onDone && (
        <button onClick={onDone} className="mt-6 cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950">
          {t("Fermer", "Close")}
        </button>
      )}
    </motion.div>
  );
}

