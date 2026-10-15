import type { Metadata } from "next";
import { Check } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { alternates, hasLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { isPatch, releases } from "@/lib/releases";

export async function generateMetadata({ params }: PageProps<"/[lang]/versions">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    title: t("Historique des versions | ImmoTopia", "Version history | ImmoTopia"),
    description: t(
      "Les nouveautés de l'application ImmoTopia, version par version : gestion locative, syndic, patrimoine, finance et assistant IA ImmoCopilot.",
      "What's new in the ImmoTopia app, release by release: property management, condominium, portfolio, finance and the ImmoCopilot AI assistant.",
    ),
    alternates: alternates(lang, "/versions"),
  };
}

export default async function VersionsPage() {
  const { t, locale } = await getI18n();
  // En UTC, pour ne pas dépendre du fuseau du serveur
  const date = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(t("fr-FR", "en-GB"), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const [latest] = releases;

  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow={t("Historique des versions", "Version history")} title={t("Ce qui a changé dans ImmoTopia.", "What's new in ImmoTopia.")}>
          {t(
            `Version actuelle : ${latest.version}, publiée le ${date(latest.date)}. Chaque version, ses nouveautés et ses corrections.`,
            `Current version: ${latest.version}, released on ${date(latest.date)}. Every release, with its new features and fixes.`,
          )}
        </PageHero>

        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <ol className="relative border-l border-ink-900/10 pl-8">
            {releases.map((r, i) => (
              <li key={r.version} id={`v${r.version}`} className="relative scroll-mt-28 pb-12 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[38px] size-3 rounded-full ring-4 ring-paper ${i === 0 ? "bg-brand-600" : isPatch(r) ? "bg-ink-900/25" : "bg-sun-500"}`}
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-display text-2xl font-bold tracking-tight">v{r.version}</h2>
                  <time dateTime={r.date} className="text-sm text-ink-900/50">
                    {date(r.date)}
                  </time>
                  {i === 0 && (
                    <span className="rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-semibold text-brand-600">{t("Actuelle", "Current")}</span>
                  )}
                  {isPatch(r) && (
                    <span className="rounded-full bg-ink-900/[0.06] px-2.5 py-0.5 text-xs font-semibold text-ink-900/60">{t("Correctifs", "Fixes")}</span>
                  )}
                </div>
                <p className="mt-1 font-semibold text-ink-900/80">{r.title[locale]}</p>
                <ul className="mt-4 space-y-2.5">
                  {r.items.map((item) => (
                    <li key={item.fr} className="flex gap-2.5 text-ink-900/70">
                      <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden />
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
