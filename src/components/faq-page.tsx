import { faqGroups, landings } from "@/lib/landings";
import { FinalCta } from "./final-cta";
import { Navbar } from "./navbar";
import { PageHero } from "./page-hero";
import { SmartLink } from "./smart-link";

/** FAQ générale (reprise de l'ancienne page /ressources/faq). */
export function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-paper">
        <PageHero eyebrow="FAQ" title="Vos questions sur ImmoTopia">
          Tarifs, fonctionnalités, sécurité, démarrage : les réponses aux questions les plus fréquentes.
        </PageHero>
        <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
          {faqGroups.map((g) => (
            <section key={g.title} className="mb-10 sm:mb-12">
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{g.title}</h2>
              <div className="mt-5 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                {g.items.map((f) => (
                  <details key={f.q} className="group px-4 md:p-6">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center py-3 font-semibold marker:hidden md:min-h-0 md:py-0">
                      <span className="flex w-full items-center justify-between gap-4 break-words">
                        {f.q}
                        <span className="shrink-0 text-xl leading-none text-brand-600 md:text-[length:inherit] md:leading-[inherit] transition-transform group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="pb-4 text-[15px] leading-relaxed break-words text-ink-900/65 md:mt-3 md:pb-0 md:text-[length:inherit] md:leading-[inherit]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Pour aller plus loin</h2>
            <ul className="mt-5 grid gap-1 sm:grid-cols-2 md:gap-2">
              <li>
                <SmartLink href="/wiki" className="inline-block py-3 text-sm font-medium break-words md:py-0 text-brand-600 hover:underline">
                  Wiki des fonctionnalités : toutes les actions, une à une
                </SmartLink>
              </li>
              {landings.map((l) => (
                <li key={l.slug}>
                  <SmartLink href={`/${l.slug}`} className="inline-block py-3 text-sm font-medium break-words md:py-0 text-brand-600 hover:underline">
                    {l.h1}
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
