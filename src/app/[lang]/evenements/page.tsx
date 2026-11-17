import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/event-ui";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { eventPhase, getStats, listPublicEvents } from "@/lib/events/service";
import { SITE_URL } from "@/lib/site";

// Événements en français seulement (rubrique déclarée dans src/lib/french-only.ts). Contenu lu en base : rendu à chaque requête.
export const dynamic = "force-dynamic";

const title = "Événements ImmoTopia : matinales et rencontres immobilier";
const description = "Matinales, démonstrations et rencontres pour les syndics, agences et gestionnaires immobiliers d'Abidjan. Découvrez les prochains événements et inscrivez-vous en ligne.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/evenements" },
  openGraph: { title, description, url: "/evenements", locale: "fr_CI" },
};

export default async function EvenementsPage({ params }: PageProps<"/[lang]/evenements">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();

  const items = listPublicEvents().map((event) => ({ event, phase: eventPhase(event, getStats(event.id)) }));
  const upcoming = items.filter((i) => i.phase !== "past" && i.phase !== "cancelled").sort((a, b) => a.event.startsAt.localeCompare(b.event.startsAt));
  const past = items.filter((i) => i.phase === "past" || i.phase === "cancelled");

  return (
    <>
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Événements ImmoTopia",
          description,
          url: `${SITE_URL}/evenements`,
          inLanguage: "fr-CI",
        }}
      />
      <main className="bg-paper">
        <PageHero eyebrow="Événements" title="Rencontres et matinales de l'immobilier digital.">
          <p>Démonstrations, retours d&apos;expérience et échanges entre professionnels. Inscription en ligne, sans création de compte.</p>
        </PageHero>

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-5 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">À venir</h2>
          {upcoming.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-white p-6 text-ink-900/70 ring-1 ring-ink-900/[0.07]">Aucun événement n&apos;est programmé pour le moment. Revenez bientôt.</p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {upcoming.map(({ event, phase }) => (
                <EventCard key={event.id} event={event} phase={phase} />
              ))}
            </div>
          )}

          {past.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-3xl font-bold tracking-tight md:text-4xl">Événements passés</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {past.map(({ event, phase }) => (
                  <EventCard key={event.id} event={event} phase={phase} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <FinalCta />
    </>
  );
}
