import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CalendarDays, Gift, MapPin, Ticket, Users } from "lucide-react";
import { CoverImage, phaseLabel, venueText } from "@/components/events/event-ui";
import { RegistrationForm } from "@/components/events/registration-form";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";
import { eventPhase, getEventBySlug, getStats } from "@/lib/events/service";
import { formatDateFr, formatTimeFr } from "@/lib/events/time";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

async function load(slug: string) {
  const event = getEventBySlug(slug);
  if (!event) return null;
  // Un brouillon n'est visible que par l'administrateur connecté (aperçu), et jamais indexé
  const preview = event.publicationStatus === "draft";
  if (preview && !verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value)) return null;
  return { event, preview };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/evenements/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "fr") return {};
  const found = await load(slug);
  if (!found) return { robots: { index: false, follow: false } };
  const { event, preview } = found;
  const url = `/evenements/${event.slug}`;
  const title = `${event.title} — ${formatDateFr(event.startsAt, event.timezone)}`;
  const description = `${event.tagline} ${event.venueCity}, ${formatTimeFr(event.startsAt, event.timezone)}–${formatTimeFr(event.endsAt, event.timezone)}. ${event.feeLabel}.`;
  const images = event.image ? [{ url: event.image.startsWith("/") ? `${SITE_URL}${event.image}` : event.image, alt: event.title }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: preview ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url, locale: "fr_CI", type: "website", siteName: "ImmoTopia", images },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
  };
}

export default async function EventPage({ params }: PageProps<"/[lang]/evenements/[slug]">) {
  const { lang, slug } = await params;
  const found = lang === "fr" ? await load(slug) : null;
  if (!found) notFound();
  const { event, preview } = found;

  const stats = getStats(event.id);
  const phase = eventPhase(event, stats);
  const badge = phaseLabel[phase];
  const canRegister = phase === "open" || phase === "waitlist";
  const date = formatDateFr(event.startsAt, event.timezone);
  const hours = `${formatTimeFr(event.startsAt, event.timezone)} – ${formatTimeFr(event.endsAt, event.timezone)}`;
  const absoluteImage = event.image ? (event.image.startsWith("/") ? `${SITE_URL}${event.image}` : event.image) : undefined;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.tagline,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventStatus: event.cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "fr-CI",
    image: absoluteImage ? [absoluteImage] : undefined,
    location: { "@type": "Place", name: event.venueName || event.venueCity, address: { "@type": "PostalAddress", addressLocality: event.venueCity, addressRegion: event.venueDistrict, addressCountry: "CI" } },
    organizer: { "@type": "Organization", name: event.organizer },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/evenements/${event.slug}`,
      price: 0,
      priceCurrency: "XOF",
      availability: stats.remaining > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
  };

  return (
    <>
      <Navbar />
      {!preview && <JsonLd data={ld} />}
      <main className="bg-paper">
        <section className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-12 text-white sm:pt-36 md:pb-16">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-5 lg:grid-cols-2 lg:gap-12">
            <div>
              {preview && <p className="mb-4 inline-block rounded-full bg-sun-500 px-3 py-1 text-xs font-bold text-ink-950">APERÇU — brouillon non publié</p>}
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>{badge.label}</span>
              <h1 className="mt-4 font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">{event.title}</h1>
              <p className="mt-4 text-lg text-white/75 text-balance">{event.theme}</p>
              <ul className="mt-6 space-y-3 text-base text-white/85">
                <li className="flex gap-3"><CalendarDays className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />{date}, {hours}</li>
                <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />{venueText(event)}</li>
                <li className="flex gap-3"><Users className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />Organisé par {event.organizer}</li>
                <li className="flex gap-3"><Ticket className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />{event.feeLabel}</li>
              </ul>
              {event.showRemaining && phase === "open" && (
                <p className="mt-4 text-sm font-semibold text-mint-400">
                  {stats.remaining} place{stats.remaining > 1 ? "s" : ""} restante{stats.remaining > 1 ? "s" : ""} sur {event.capacity}
                </p>
              )}
              {canRegister && (
                <a href="#inscription" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-brand-600 px-7 py-3 text-base font-semibold text-white transition hover:bg-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/40">
                  {phase === "waitlist" ? "Rejoindre la liste d'attente" : "Je m'inscris"}
                </a>
              )}
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] ring-1 ring-white/10">
              <CoverImage src={event.image} alt={`Visuel de l'événement ${event.title}`} priority />
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 md:py-16 lg:grid-cols-[1fr_minmax(0,28rem)]">
          <div className="space-y-12">
            <section aria-labelledby="presentation">
              <h2 id="presentation" className="font-display text-2xl font-bold tracking-tight md:text-3xl">Présentation</h2>
              <p className="mt-3 text-lg font-medium text-ink-900/80">{event.tagline}</p>
              <div className="mt-4 space-y-4 text-ink-900/75">
                {event.description.split(/\n{2,}/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {event.audience.length > 0 && (
              <section aria-labelledby="public">
                <h2 id="public" className="font-display text-2xl font-bold tracking-tight md:text-3xl">À qui s&apos;adresse cette rencontre</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {event.audience.map((a) => (
                    <li key={a} className="rounded-xl bg-white px-4 py-3 ring-1 ring-ink-900/[0.07]">{a}</li>
                  ))}
                </ul>
              </section>
            )}

            {event.topics.length > 0 && (
              <section aria-labelledby="themes">
                <h2 id="themes" className="font-display text-2xl font-bold tracking-tight md:text-3xl">Thématiques abordées</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-900/75">
                  {event.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            )}

            {event.program.length > 0 && (
              <section aria-labelledby="programme">
                <h2 id="programme" className="font-display text-2xl font-bold tracking-tight md:text-3xl">Programme</h2>
                <ol className="mt-4 divide-y divide-ink-900/10 overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/[0.07]">
                  {event.program.map((p, i) => (
                    <li key={i} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-6">
                      <span className="shrink-0 font-mono text-sm font-semibold text-brand-600 sm:w-36">{p.time}</span>
                      <span>{p.label}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-2 text-sm text-ink-900/50">Programme indicatif, susceptible d&apos;évoluer.</p>
              </section>
            )}

            {event.promo.visible && event.promo.items.length > 0 && (
              <section aria-labelledby="offre" className="rounded-[22px] bg-ink-950 p-6 text-white md:p-8">
                <h2 id="offre" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
                  <Gift className="size-6 text-sun-400" aria-hidden /> {event.promo.title}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-white/85">
                  {event.promo.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {event.promo.note && <p className="mt-4 text-sm font-semibold text-sun-400">{event.promo.note}</p>}
              </section>
            )}

            <section aria-labelledby="immotopia">
              <h2 id="immotopia" className="font-display text-2xl font-bold tracking-tight md:text-3xl">À propos d&apos;ImmoTopia</h2>
              <p className="mt-3 text-ink-900/75">
                ImmoTopia est l&apos;ERP immobilier conçu pour la Côte d&apos;Ivoire : gestion locative, syndic de copropriété, CRM, portails propriétaire et locataire, rappels e-mail et WhatsApp, sur une seule plateforme. Il est édité par Alliance Consultants.
              </p>
            </section>

            <section aria-labelledby="pratique">
              <h2 id="pratique" className="font-display text-2xl font-bold tracking-tight md:text-3xl">Informations pratiques</h2>
              <dl className="mt-4 grid gap-3 text-ink-900/80 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold">Date</dt><dd>{date}</dd>
                <dt className="font-semibold">Horaires</dt><dd>{hours} (heure d&apos;Abidjan)</dd>
                <dt className="font-semibold">Lieu</dt><dd>{venueText(event)}</dd>
                <dt className="font-semibold">Participation</dt><dd>{event.feeLabel}</dd>
              </dl>
              {event.practicalInfo && <p className="mt-4 text-ink-900/75">{event.practicalInfo}</p>}
            </section>
          </div>

          <aside id="inscription" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Inscription</h2>
            {canRegister ? (
              <RegistrationForm slug={event.slug} waitlist={phase === "waitlist"} eventTitle={event.title} />
            ) : (
              <p className="rounded-2xl bg-white p-6 text-ink-900/75 ring-1 ring-ink-900/[0.07]">
                {phase === "past" ? "Cet événement est terminé." : phase === "cancelled" ? "Cet événement est annulé." : phase === "full" ? "Cet événement est complet." : "Les inscriptions sont closes."}
              </p>
            )}
          </aside>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
