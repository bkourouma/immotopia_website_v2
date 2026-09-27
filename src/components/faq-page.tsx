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
        <div className="mx-auto max-w-3xl px-5 py-16">
          {faqGroups.map((g) => (
            <section key={g.title} className="mb-12">
              <h2 className="font-display text-2xl font-bold tracking-tight">{g.title}</h2>
              <div className="mt-5 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                {g.items.map((f) => (
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
          ))}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight">Pour aller plus loin</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              <li>
                <SmartLink href="/wiki" className="text-sm font-medium text-brand-600 hover:underline">
                  Wiki des fonctionnalités : toutes les actions, une à une
                </SmartLink>
              </li>
              {landings.map((l) => (
                <li key={l.slug}>
                  <SmartLink href={`/${l.slug}`} className="text-sm font-medium text-brand-600 hover:underline">
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
