import { ArrowRight, Check } from "lucide-react";
import { landingBySlug, type Landing } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";
import { DemoButton } from "./demo-button";
import { FinalCta } from "./final-cta";
import { Navbar } from "./navbar";
import { PageHero } from "./page-hero";
import { SmartLink } from "./smart-link";

/** Gabarit des pages thématiques reprises de l'ancien site (référencement). */
export function LandingPage({ landing }: { landing: Landing }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: landing.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: landing.eyebrow, item: `${SITE_URL}/${landing.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="bg-paper">
        <PageHero eyebrow={landing.eyebrow} title={landing.h1}>
          <p>{landing.intro}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <DemoButton />
            <SmartLink
              href="/tarifs"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Voir les tarifs
            </SmartLink>
          </div>
        </PageHero>

        <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          {landing.sections.map((s) => (
            <section key={s.title} className="mb-16 last:mb-0">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{s.title}</h2>
              {s.intro && <p className="mt-4 max-w-3xl text-lg text-ink-900/65">{s.intro}</p>}
              {s.items && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((it) => (
                    <div key={it.title} className="rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07]">
                      <h3 className="font-display text-lg font-bold">{it.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-900/65">{it.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {s.bullets && (
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-ink-900/75 ring-1 ring-ink-900/[0.07]">
                      <Check className="mt-0.5 size-4.5 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.note && <p className="mt-5 rounded-2xl bg-sun-500/10 px-5 py-4 text-sm text-ink-900/70 ring-1 ring-sun-500/25">{s.note}</p>}
            </section>
          ))}

          {landing.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Questions fréquentes</h2>
              <div className="mt-6 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                {landing.faq.map((f) => (
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
              <p className="mt-4 text-sm text-ink-900/60">
                D&apos;autres questions ?{" "}
                <SmartLink href="/faq" className="font-medium text-brand-600 hover:underline">
                  Consultez la FAQ
                </SmartLink>{" "}
                ou{" "}
                <SmartLink href="/comparatif" className="font-medium text-brand-600 hover:underline">
                  le comparatif
                </SmartLink>
                .
              </p>
            </section>
          )}

          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">À lire aussi</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {landing.related
                .map((slug) => landingBySlug(slug))
                .filter((l): l is Landing => !!l)
                .map((l) => (
                  <SmartLink
                    key={l.slug}
                    href={`/${l.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-[22px] bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span>
                      <span className="block text-xs font-semibold tracking-wide text-brand-600 uppercase">{l.eyebrow}</span>
                      <span className="mt-1 block text-sm font-semibold">{l.h1}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
                  </SmartLink>
                ))}
            </div>
          </section>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
