import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { SmartLink } from "@/components/smart-link";
import { formatDateFr, formatTimeFr } from "@/lib/events/time";
import type { EventPhase, EventRecord } from "@/lib/events/types";

export const phaseLabel: Record<EventPhase, { label: string; className: string }> = {
  open: { label: "Inscriptions ouvertes", className: "bg-emerald-100 text-emerald-800" },
  waitlist: { label: "Complet — liste d'attente", className: "bg-amber-100 text-amber-800" },
  full: { label: "Complet", className: "bg-amber-100 text-amber-800" },
  closed: { label: "Inscriptions closes", className: "bg-ink-900/10 text-ink-900/70" },
  past: { label: "Terminé", className: "bg-ink-900/10 text-ink-900/70" },
  cancelled: { label: "Annulé", className: "bg-red-100 text-red-800" },
};

export function venueText(e: EventRecord) {
  const place = [e.venueName, e.venueDistrict, e.venueCity].filter(Boolean).join(", ");
  return e.venueStatus === "provisional" ? `${place} (lieu à confirmer)` : place;
}

/** Image de couverture : `unoptimized` pour les URL externes (aucun domaine à déclarer dans next.config). */
export function CoverImage({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  if (!src) return <div className={`bg-ink-900 ${className}`} aria-hidden />;
  return <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" priority={priority} unoptimized={src.startsWith("https://")} className={`object-cover ${className}`} />;
}

export function EventCard({ event, phase }: { event: EventRecord; phase: EventPhase }) {
  const p = phaseLabel[phase];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-ink-900/[0.07] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/9] w-full">
        <CoverImage src={event.image} alt="" />
        <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${p.className}`}>{p.label}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-xl font-bold tracking-tight text-balance">
          <SmartLink href={`/evenements/${event.slug}`} className="after:absolute after:inset-0 hover:text-brand-600">
            {event.title}
          </SmartLink>
        </h3>
        <p className="mt-2 flex-1 text-ink-900/65">{event.tagline}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-900/70">
          <li className="flex gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
            {formatDateFr(event.startsAt, event.timezone)}, {formatTimeFr(event.startsAt, event.timezone)} – {formatTimeFr(event.endsAt, event.timezone)}
          </li>
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
            {venueText(event)}
          </li>
        </ul>
      </div>
    </article>
  );
}
