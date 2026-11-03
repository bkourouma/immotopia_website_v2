import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GuideCta, GuideMeta } from "@/components/guide-article";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { breadcrumbLd } from "@/components/wiki/wiki-ui";
import { guideHref, guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

const title = "Guides ImmoTopia : CRM, états des lieux, baux";
const description = "Guides pratiques pour les agences et les promoteurs de Côte d'Ivoire : choisir son CRM immobilier, états des lieux, bail commercial OHADA, relances.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/guides" },
  openGraph: { title, description, url: "/guides", locale: "fr_CI" },
};

export default async function GuidesIndexPage({ params }: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();

  return (
    <>
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd([{ label: "Guides", href: guideHref() }]),
            {
              "@type": "CollectionPage",
              name: "Guides ImmoTopia",
              description,
              url: `${SITE_URL}${guideHref()}`,
              inLanguage: "fr-CI",
              hasPart: guides.map((g) => ({ "@type": "Article", headline: g.h1, url: `${SITE_URL}${guideHref(g.slug)}`, datePublished: g.published, dateModified: g.updated })),
            },
          ],
        }}
      />
      <main className="bg-paper">
        <PageHero eyebrow="Guides" title="Guides pratiques pour l'immobilier en Côte d'Ivoire.">
          <p>Choisir un CRM, réussir un état des lieux, comprendre le bail commercial OHADA : des guides concrets, rédigés pour les agences, les syndics et les promoteurs.</p>
        </PageHero>

        <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Tous les guides</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {guides.map((g) => (
              <article key={g.slug} className="group relative flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] transition hover:-translate-y-0.5 hover:shadow-lg md:p-7">
                <span className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">{g.eyebrow}</span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-balance">
                  <SmartLink href={guideHref(g.slug)} className="after:absolute after:inset-0 hover:text-brand-600">
                    {g.h1}
                  </SmartLink>
                </h3>
                <p className="mt-3 flex-1 text-ink-900/65">{g.summary}</p>
                <GuideMeta guide={g} className="mt-5 text-ink-900/50" />
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Lire le guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </article>
            ))}
          </div>

          <GuideCta title="Un doute sur votre cas ? Voyez-le en démonstration" text="Une démonstration de 30 minutes, sans engagement, pour appliquer ces guides à votre agence ou à votre programme." />
        </div>
      </main>
      <FinalCta />
    </>
  );
}
