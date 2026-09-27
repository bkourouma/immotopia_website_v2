import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { breadcrumbLd, PackChips, StatusBadge, WikiBreadcrumb, WikiCta } from "@/components/wiki/wiki-ui";
import { SITE_URL } from "@/lib/site";
import {
  actionAnchor,
  actionStatus,
  allFeatures,
  featureByRef,
  featureBySlug,
  neighbours,
  profileLabel,
  statusMeta,
  wikiHref,
  type WikiAction,
} from "@/lib/wiki";

// Wiki en français seulement : une page par fonctionnalité, générée au build.
export const dynamicParams = false;

export function generateStaticParams() {
  return allFeatures.map(({ domain, feature }) => ({ lang: "fr", domaine: domain.slug, fonctionnalite: feature.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/wiki/[domaine]/[fonctionnalite]">): Promise<Metadata> {
  const { lang, domaine, fonctionnalite } = await params;
  const found = featureBySlug(domaine, fonctionnalite);
  if (lang !== "fr" || !found) return {};
  const { feature } = found;
  const title = `${feature.metaTitle} | ImmoTopia`;
  const url = wikiHref(domaine, fonctionnalite);
  return {
    title: { absolute: title },
    description: feature.summary,
    alternates: { canonical: url },
    openGraph: { title, description: feature.summary, url, locale: "fr_CI", type: "article" },
  };
}

const details: [keyof WikiAction, string][] = [
  ["input", "Ce que vous renseignez"],
  ["output", "Ce que vous obtenez"],
  ["prereq", "Avant de commencer"],
];

export default async function WikiFeaturePage({ params }: PageProps<"/[lang]/wiki/[domaine]/[fonctionnalite]">) {
  const { lang, domaine, fonctionnalite } = await params;
  const found = featureBySlug(domaine, fonctionnalite);
  if (lang !== "fr" || !found) notFound();
  const { domain, feature } = found;

  const url = wikiHref(domain.slug, feature.slug);
  const crumbs = [
    { label: "Wiki", href: "/wiki" },
    { label: domain.title, href: wikiHref(domain.slug) },
    { label: feature.title, href: url },
  ];
  const related = (feature.related ?? []).map(featureByRef).filter((x) => x !== undefined);
  const { prev, next } = neighbours(domain.slug, feature.slug);

  const graph: object[] = [
    breadcrumbLd(crumbs),
    {
      "@type": "TechArticle",
      headline: feature.title,
      description: feature.summary,
      url: `${SITE_URL}${url}`,
      inLanguage: "fr-CI",
      about: { "@type": "SoftwareApplication", name: "ImmoTopia", applicationCategory: "BusinessApplication" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];
  if (feature.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: feature.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <>
      <Navbar />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <main className="bg-paper">
        <PageHero eyebrow={domain.title} title={feature.title}>
          <p>{feature.intro}</p>
        </PageHero>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:py-16 lg:grid-cols-[250px_1fr]">
          {/* Sommaire du domaine */}
          <aside className="order-last lg:order-first">
            <nav aria-label={`Fonctionnalités : ${domain.title}`} className="lg:sticky lg:top-28">
              <SmartLink href={wikiHref(domain.slug)} className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase hover:text-brand-600">
                {domain.title}
              </SmartLink>
              <ul className="mt-3 space-y-0.5 border-l border-ink-900/10">
                {domain.features.map((f) => {
                  const current = f.slug === feature.slug;
                  return (
                    <li key={f.slug}>
                      <SmartLink
                        href={wikiHref(domain.slug, f.slug)}
                        aria-current={current ? "page" : undefined}
                        className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${
                          current ? "border-brand-500 font-semibold text-ink-900" : "border-transparent text-ink-900/60 hover:text-ink-900"
                        }`}
                      >
                        {f.title}
                      </SmartLink>
                    </li>
                  );
                })}
              </ul>
              <SmartLink href="/wiki" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
                <ArrowLeft className="size-4" aria-hidden /> Tout le wiki
              </SmartLink>
            </nav>
          </aside>

          <div className="min-w-0">
            <WikiBreadcrumb items={crumbs} />

            {/* Fiche d'identité */}
            <dl className="mt-6 grid gap-5 rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase">Statut</dt>
                <dd className="mt-2">
                  <StatusBadge status={feature.status} />
                  <p className="mt-2 text-sm text-ink-900/60">{statusMeta[feature.status].hint}</p>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase">Inclus dans les packs</dt>
                <dd className="mt-2">
                  <PackChips packs={feature.packs} link />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase">Qui y a accès</dt>
                <dd className="mt-2 text-sm text-ink-900/75">
                  {feature.profiles.map((p) => profileLabel[p]).join(", ")}
                  <span className="mt-1 block text-xs text-ink-900/45">Configuration de départ, modifiable par votre agence.</span>
                </dd>
              </div>
              {feature.menu && (
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase">Où le trouver</dt>
                  <dd className="mt-2 text-sm font-medium text-ink-900/75">{feature.menu}</dd>
                </div>
              )}
            </dl>

            {/* Actions */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Ce que vous pouvez faire <span className="text-ink-900/35">({feature.actions.length})</span>
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {feature.actions.map((a) => (
                  <li key={a.title}>
                    <a
                      href={`#${actionAnchor(a)}`}
                      className="inline-block rounded-full bg-white px-3.5 py-1.5 text-sm text-ink-900/70 ring-1 ring-ink-900/[0.08] transition hover:text-brand-600 hover:ring-brand-500/30"
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4">
                {feature.actions.map((a) => {
                  const status = actionStatus(feature, a);
                  return (
                    <article
                      key={a.title}
                      id={actionAnchor(a)}
                      className="scroll-mt-28 rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] target:ring-2 target:ring-brand-500/50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-bold">{a.title}</h3>
                        {status !== feature.status && <StatusBadge status={status} />}
                      </div>
                      <p className="mt-2 leading-relaxed text-ink-900/70">{a.goal}</p>
                      {(a.input || a.output || a.prereq || a.profiles) && (
                        <dl className="mt-4 grid gap-3 border-t border-ink-900/[0.06] pt-4 text-sm sm:grid-cols-2">
                          {details.map(([key, label]) =>
                            a[key] ? (
                              <div key={key}>
                                <dt className="font-semibold text-ink-900/80">{label}</dt>
                                <dd className="mt-0.5 text-ink-900/60">{a[key] as string}</dd>
                              </div>
                            ) : null,
                          )}
                          {a.profiles && (
                            <div>
                              <dt className="font-semibold text-ink-900/80">Qui peut le faire</dt>
                              <dd className="mt-0.5 text-ink-900/60">{a.profiles.map((p) => profileLabel[p]).join(", ")}</dd>
                            </div>
                          )}
                        </dl>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>

            {feature.faq && feature.faq.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Questions fréquentes</h2>
                <div className="mt-5 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                  {feature.faq.map((f) => (
                    <details key={f.q} className="group p-6">
                      <summary className="cursor-pointer list-none font-semibold marker:hidden">
                        <span className="flex items-center justify-between gap-4">
                          {f.q}
                          <span className="text-brand-600 transition-transform group-open:rotate-45" aria-hidden>
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-ink-900/65">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-tight">À lire aussi</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {related.map(({ domain: d, feature: f }) => (
                    <SmartLink
                      key={`${d.slug}/${f.slug}`}
                      href={wikiHref(d.slug, f.slug)}
                      className="group rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:ring-brand-500/30"
                    >
                      <span className="text-xs text-ink-900/45">{d.title}</span>
                      <span className="mt-0.5 block font-semibold group-hover:text-brand-600">{f.title}</span>
                    </SmartLink>
                  ))}
                </div>
              </section>
            )}

            <nav aria-label="Fiche précédente et suivante" className="mt-14 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <SmartLink
                  href={wikiHref(prev.domain.slug, prev.feature.slug)}
                  className="group rounded-2xl p-5 ring-1 ring-ink-900/[0.08] transition hover:bg-white"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-900/45">
                    <ArrowLeft className="size-3.5" aria-hidden /> Précédent
                  </span>
                  <span className="mt-1 block font-semibold group-hover:text-brand-600">{prev.feature.title}</span>
                </SmartLink>
              ) : (
                <span />
              )}
              {next && (
                <SmartLink
                  href={wikiHref(next.domain.slug, next.feature.slug)}
                  className="group rounded-2xl p-5 text-right ring-1 ring-ink-900/[0.08] transition hover:bg-white"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-900/45">
                    Suivant <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                  <span className="mt-1 block font-semibold group-hover:text-brand-600">{next.feature.title}</span>
                </SmartLink>
              )}
            </nav>

            <div className="mt-14">
              <WikiCta title={`${feature.title} : voyez-le en démonstration`} />
            </div>
          </div>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
