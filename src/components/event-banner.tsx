import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { featuredEvent } from "@/lib/events/featured";
import { getLocale } from "@/lib/i18n-server";
import { EventLive } from "./event-live";
import { SmartLink } from "./smart-link";

/** Affiche en haut de l'accueil : visuel de l'événement, informations clés et lien d'inscription (français seulement). */
export function EventBanner({ show }: { show: boolean }) {
  return show ? <EventBannerContent /> : null;
}

/** Vrai tant que le bandeau doit s'afficher : version française et événement pas encore terminé. */
export async function showEventBanner(): Promise<boolean> {
  return (await getLocale()) === "fr" && Date.now() < new Date(featuredEvent.endsAt).getTime();
}

function EventBannerContent() {
  const e = featuredEvent;
  const href = `/evenements/${e.slug}`;
  const facts = [
    { Icon: CalendarDays, text: "Jeudi 10 décembre 2026 · 9h00 – 11h00" },
    { Icon: MapPin, text: "Hôtel Tiama, Abidjan-Plateau" },
    { Icon: Users, text: "Gratuit, sans frais d'entrée · sur inscription", strong: true },
  ];
  return (
    <section aria-labelledby="event-banner-title" className="relative isolate bg-ink-950 pt-24 text-white sm:pt-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,340px)_1fr] md:gap-12 lg:px-8">
        <SmartLink href={href} className="mx-auto block w-full max-w-[300px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 transition hover:ring-white/40 md:max-w-none">
          <Image src={e.poster} alt={e.posterAlt} width={e.posterWidth} height={e.posterHeight} sizes="(min-width: 768px) 340px, 300px" priority className="h-auto w-full" />
        </SmartLink>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold tracking-wide text-sun-400 uppercase">Prochain événement</p>
            <span className="rounded-full bg-sun-500 px-3.5 py-1 text-sm font-extrabold tracking-wide text-ink-950 uppercase shadow-lg shadow-sun-500/30">Participation 100 % gratuite</span>
          </div>
          <h2 id="event-banner-title" className="mt-2 font-display text-3xl font-bold text-balance sm:text-4xl">
            Les Matinales de l&apos;Immobilier Digital
          </h2>
          <p className="mt-3 max-w-xl text-lg text-white/80">Syndics et agences immobilières : optimisez votre gestion grâce au digital et à l&apos;intelligence artificielle.</p>
          <ul className="mt-5 space-y-2.5">
            {facts.map(({ Icon, text, strong }) => (
              <li key={text} className={`flex items-start gap-3 ${strong ? "font-bold text-sun-400" : "text-white/90"}`}>
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-sun-400" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <EventLive startsAt={e.startsAt} />
          <div className="mt-7 flex flex-wrap gap-3">
            <SmartLink href={`${href}#inscription`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sun-500 px-6 py-3 font-semibold text-ink-950 transition hover:bg-sun-400 focus-visible:ring-4 focus-visible:ring-sun-400/40">
              S&apos;inscrire gratuitement <ArrowRight aria-hidden className="size-4" />
            </SmartLink>
            <SmartLink href={href} className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Voir le programme
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
