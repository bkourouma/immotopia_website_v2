import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { breadcrumbLd, PackChips, StatusBadge, WikiBreadcrumb, WikiCta } from "@/components/wiki/wiki-ui";
import { actionAnchor, domainBySlug, wikiDomains, wikiHref } from "@/lib/wiki";

// Wiki en français seulement : une page par domaine, générée au build.
export const dynamicParams = false;

export function generateStaticParams() {
  return wikiDomains.map((d) => ({ lang: "fr", domaine: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/wiki/[domaine]">): Promise<Metadata> {
  const { lang, domaine } = await params;
  const d = domainBySlug(domaine);
  if (lang !== "fr" || !d) return {};
  const title = `${d.metaTitle} | ImmoTopia`;
  const url = wikiHref(d.slug);
  return {
    title: { absolute: title },
    description: d.summary,
    alternates: { canonical: url },
    openGraph: { title, description: d.summary, url, locale: "fr_CI" },
  };
}

export default async function WikiDomainPage({ params }: PageProps<"/[lang]/wiki/[domaine]">) {
  const { lang, domaine } = await params;
  const d = domainBySlug(domaine);
  if (lang !== "fr" || !d) notFound();

  const crumbs = [
    { label: "Wiki", href: "/wiki" },
    { label: d.title, href: wikiHref(d.slug) },
  ];
  const others = wikiDomains.filter((x) => x.slug !== d.slug);

  return (
    <>
      <Navbar />
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbLd(crumbs) }} />
      <main className="bg-paper">
        <PageHero eyebrow="Wiki des fonctionnalités" title={d.title}>
          <p>{d.intro}</p>
        </PageHero>

        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <WikiBreadcrumb items={crumbs} />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {d.features.map((f) => (
              <article key={f.slug} className="flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="font-display text-xl font-bold tracking-tight">
                    <SmartLink href={wikiHref(d.slug, f.slug)} className="hover:text-brand-600">
                      {f.title}
                    </SmartLink>
                  </h2>
                  <StatusBadge status={f.status} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/65">{f.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {f.actions.slice(0, 5).map((a) => (
                    <li key={a.title}>
                      <SmartLink href={`${wikiHref(d.slug, f.slug)}#${actionAnchor(a)}`} className="text-ink-900/75 hover:text-brand-600">
                        {a.title}
                      </SmartLink>
                    </li>
                  ))}
                  {f.actions.length > 5 && <li className="text-ink-900/45">et {f.actions.length - 5} autres actions</li>}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <PackChips packs={f.packs} />
                  <SmartLink
                    href={wikiHref(d.slug, f.slug)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-600"
                  >
                    Lire la fiche <ArrowRight className="size-4" aria-hidden />
                  </SmartLink>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <WikiCta title={`${d.title} : voyez-le en démonstration`} />
          </div>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">Les autres domaines</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((x) => (
                <li key={x.slug}>
                  <SmartLink
                    href={wikiHref(x.slug)}
                    className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900/75 ring-1 ring-ink-900/[0.08] transition hover:text-brand-600 hover:ring-brand-500/30"
                  >
                    {x.title}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
