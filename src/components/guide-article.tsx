import { ArrowRight, Clock } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { DemoButton } from "@/components/demo-button";
import { InlineLinks, stripLinks } from "@/components/inline-links";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { breadcrumbLd, WikiBreadcrumb } from "@/components/wiki/wiki-ui";
import {
  guideBySlug,
  guideHref,
  guideReadingMinutes,
  type Guide,
  type GuideBlock,
  type GuideListItem,
} from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

/** « 2026-10-13 » → « 13 octobre 2026 » (en UTC, pour ne pas dépendre du fuseau du serveur) */
const longDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const eyebrow = "text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase";

function Item({ item }: { item: GuideListItem }) {
  if (typeof item === "string") return <InlineLinks text={item} />;
  return (
    <>
      <strong className="font-semibold text-ink-900">{item.title}</strong> : <InlineLinks text={item.text} />
    </>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 leading-relaxed text-ink-900/75">
          <InlineLinks text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-ink-900/75 marker:text-brand-500">
          {block.items.map((item, i) => (
            <li key={i}>
              <Item item={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-ink-900/75 marker:font-semibold marker:text-brand-600">
          {block.items.map((item, i) => (
            <li key={i}>
              <Item item={item} />
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="mt-5 rounded-2xl bg-sun-500/10 px-5 py-4 text-sm text-ink-900/70 ring-1 ring-sun-500/25">
          <InlineLinks text={block.text} />
        </p>
      );
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr className="border-b border-ink-900/[0.07] bg-ink-900/[0.03]">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className={`px-4 py-3.5 font-display font-bold ${block.highlightLast && i === block.head.length - 1 ? "text-brand-600" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-ink-900/[0.06] align-top last:border-b-0">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3.5 font-semibold">
                        <InlineLinks text={cell} />
                      </th>
                    ) : (
                      <td
                        key={i}
                        className={`px-4 py-3.5 leading-relaxed ${block.highlightLast && i === row.length - 1 ? "bg-brand-500/[0.04] font-medium text-ink-900" : "text-ink-900/65"}`}
                      >
                        <InlineLinks text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Ligne « publié le… · mis à jour le… · temps de lecture » */
export function GuideMeta({ guide, className = "" }: { guide: Guide; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${className}`}>
      <span>
        Publié le <time dateTime={guide.published}>{longDate(guide.published)}</time>
      </span>
      {guide.updated !== guide.published && (
        <span>
          Mis à jour le <time dateTime={guide.updated}>{longDate(guide.updated)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" aria-hidden /> {guideReadingMinutes(guide)} min de lecture
      </span>
    </p>
  );
}

/** Données structurées de l'article : Article, fil d'Ariane et FAQ (la FAQ est visible sur la page). */
function articleJsonLd(guide: Guide) {
  const url = `${SITE_URL}${guideHref(guide.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd([
        { label: "Guides", href: guideHref() },
        { label: guide.h1, href: guideHref(guide.slug) },
      ]),
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.metaDescription,
        url,
        mainEntityOfPage: url,
        inLanguage: "fr-CI",
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) } })),
      },
    ],
  };
}

/** Gabarit d'un guide : en-tête, sommaire, sections, sources, FAQ, guides liés et appel à l'action. */
export function GuideArticle({ guide }: { guide: Guide }) {
  const crumbs = [
    { label: "Guides", href: guideHref() },
    { label: guide.h1, href: guideHref(guide.slug) },
  ];
  const related = guide.related.map(guideBySlug).filter((g): g is Guide => !!g);

  return (
    <>
      <Navbar />
      <JsonLd data={articleJsonLd(guide)} />
      <main className="bg-paper">
        <PageHero eyebrow={guide.eyebrow} title={guide.h1}>
          <p>
            <InlineLinks text={guide.intro} linkClassName="font-medium text-white underline underline-offset-2 hover:text-mint-400" />
          </p>
          <GuideMeta guide={guide} className="mt-6 justify-center text-white/60" />
        </PageHero>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:py-16 lg:grid-cols-[250px_1fr]">
          <aside className="order-first">
            <nav aria-label="Sommaire de l'article" className="lg:sticky lg:top-28">
              <p className={eyebrow}>Dans cet article</p>
              <ul className="mt-3 space-y-0.5 border-l border-ink-900/10">
                {guide.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-900/60 transition hover:border-brand-500 hover:text-ink-900">
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#questions" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-900/60 transition hover:border-brand-500 hover:text-ink-900">
                    Questions fréquentes
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <WikiBreadcrumb items={crumbs} />

            {guide.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28 first-of-type:mt-8">
                <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{s.title}</h2>
                <div className="max-w-3xl">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}

            {guide.sources && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold tracking-tight">{guide.sources.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-900/75 marker:text-brand-500">
                  {guide.sources.items.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline-offset-2 hover:underline">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {guide.disclaimer && <p className="mt-8 rounded-2xl bg-sun-500/10 px-5 py-4 text-sm font-medium text-ink-900/80 ring-1 ring-sun-500/25">{guide.disclaimer}</p>}

            <section id="questions" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Questions fréquentes</h2>
              <div className="mt-5 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                {guide.faq.map((f) => (
                  <details key={f.q} className="group p-6">
                    <summary className="cursor-pointer list-none font-semibold marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span className="text-brand-600 transition-transform group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-ink-900/65">
                      <InlineLinks text={f.a} />
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold tracking-tight">Pour aller plus loin</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {guide.productLinks.map((l) => (
                  <SmartLink key={l.href} href={l.href} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:ring-brand-500/30">
                    <span className="block font-semibold group-hover:text-brand-600">{l.label}</span>
                    <span className="mt-1 block text-sm text-ink-900/60">{l.text}</span>
                  </SmartLink>
                ))}
                {related.map((g) => (
                  <SmartLink key={g.slug} href={guideHref(g.slug)} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:ring-brand-500/30">
                    <span className={eyebrow}>Guide</span>
                    <span className="mt-1 block font-semibold group-hover:text-brand-600">{g.h1}</span>
                    <span className="mt-1 block text-sm text-ink-900/60">{g.summary}</span>
                  </SmartLink>
                ))}
              </div>
            </section>

            <GuideCta title={guide.cta.title} text={guide.cta.text} />
          </article>
        </div>
      </main>
      <FinalCta />
    </>
  );
}

/** Encadré sombre de fin d'article : démonstration (fenêtre de réservation), contact et tarifs. */
export function GuideCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="relative isolate mt-14 overflow-hidden rounded-[28px] bg-ink-950 px-6 py-10 text-center text-white md:px-12">
      <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-72 w-[640px] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.35), transparent)" }} />
      <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/65">{text}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <DemoButton />
        <SmartLink
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
        >
          Nous contacter <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
      </div>
    </section>
  );
}
