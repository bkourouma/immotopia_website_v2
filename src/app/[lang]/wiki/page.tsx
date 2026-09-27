import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { WikiSearch } from "@/components/wiki/wiki-search";
import { breadcrumbLd, PackChips, StatusBadge } from "@/components/wiki/wiki-ui";
import { SITE_URL } from "@/lib/site";
import {
  allFeatures,
  domainPacks,
  packLabel,
  packOrder,
  profileLabel,
  searchEntries,
  statusMeta,
  WIKI_UPDATED_ON,
  wikiDomains,
  wikiHref,
  wikiStats,
} from "@/lib/wiki";

const title = "Wiki des fonctionnalités ImmoTopia — logiciel immobilier en Côte d'Ivoire";
const description = `Les ${wikiStats.features} fonctionnalités et ${wikiStats.actions} actions d'ImmoTopia expliquées une à une : gestion locative, syndic, CRM, portails, maintenance, finance et chantiers.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/wiki" },
  openGraph: { title, description, url: "/wiki", locale: "fr_CI" },
};

export default async function WikiPage({ params }: PageProps<"/[lang]/wiki">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();

  const crumbs = [{ label: "Wiki", href: "/wiki" }];
  return (
    <>
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(crumbs),
            {
              "@type": "CollectionPage",
              name: "Wiki des fonctionnalités ImmoTopia",
              description,
              url: `${SITE_URL}/wiki`,
              inLanguage: "fr-CI",
              hasPart: wikiDomains.map((d) => ({ "@type": "WebPage", name: d.title, url: `${SITE_URL}${wikiHref(d.slug)}` })),
            },
          ],
        }}
      />
      <main className="bg-paper">
        <PageHero eyebrow="Wiki des fonctionnalités" title="Tout ce que fait ImmoTopia, action par action.">
          <p>
            {`${wikiStats.features} fonctionnalités, ${wikiStats.actions} actions : ce que vous pouvez faire dans l'application, qui peut le faire, où le trouver et dans quel pack.`}
          </p>
          <WikiSearch entries={searchEntries()} />
        </PageHero>

        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Parcourir par domaine</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {wikiDomains.map((d) => {
              const actions = d.features.reduce((n, f) => n + f.actions.length, 0);
              return (
                <section key={d.slug} className="flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      <SmartLink href={wikiHref(d.slug)} className="hover:text-brand-600">
                        {d.title}
                      </SmartLink>
                    </h3>
                    <span className="shrink-0 text-xs font-medium text-ink-900/45">
                      {d.features.length} pages · {actions} actions
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-900/65">{d.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                    {d.features.map((f) => (
                      <li key={f.slug}>
                        <SmartLink href={wikiHref(d.slug, f.slug)} className="text-sm font-medium text-brand-600 hover:underline">
                          {f.title}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                    <PackChips packs={domainPacks(d)} />
                    <SmartLink href={wikiHref(d.slug)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-600">
                      Voir le domaine <ArrowRight className="size-4" aria-hidden />
                    </SmartLink>
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Ce que contient chaque pack</h2>
            <p className="mt-4 max-w-3xl text-lg text-ink-900/65">
              Chaque fonctionnalité indique les packs qui y donnent accès. Le pack Opérateur intégré réunit les trois autres.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {packOrder.map((p) => {
                const list = allFeatures.filter(({ feature }) => feature.packs.includes(p));
                const domains = wikiDomains.filter((d) => d.features.some((f) => f.packs.includes(p)));
                return (
                  <div key={p} className="rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07]">
                    <p className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase">Pack</p>
                    <h3 className="mt-1 font-display text-xl font-bold">{packLabel[p]}</h3>
                    <p className="mt-1 text-sm text-ink-900/60">{list.length} fonctionnalités</p>
                    <ul className="mt-4 space-y-1.5">
                      {domains.map((d) => (
                        <li key={d.slug}>
                          <SmartLink href={wikiHref(d.slug)} className="text-sm text-ink-900/75 hover:text-brand-600">
                            {d.title}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <SmartLink href="/tarifs" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
              Comparer les packs et leurs prix <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </section>

          <section className="mt-20 grid gap-5 md:grid-cols-2">
            <div className="rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] md:p-7">
              <h2 className="font-display text-xl font-bold">Comment lire ce wiki</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-900/70">
                {(["disponible", "deploiement"] as const).map((s) => (
                  <li key={s} className="flex flex-col items-start gap-1.5">
                    <StatusBadge status={s} />
                    {statusMeta[s].hint}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] md:p-7">
              <h2 className="font-display text-xl font-bold">Qui fait quoi</h2>
              <p className="mt-4 text-sm text-ink-900/70">
                Chaque page indique les profils qui ont accès à la fonctionnalité dans la configuration de départ :{" "}
                {Object.values(profileLabel).join(", ").toLowerCase()}. Votre agence peut ensuite réattribuer les droits à
                ses propres rôles.
              </p>
              <p className="mt-3 text-xs text-ink-900/45">Inventaire mis à jour le {WIKI_UPDATED_ON}.</p>
            </div>
          </section>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
