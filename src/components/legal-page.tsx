import type { ReactNode } from "react";
import { getI18n } from "@/lib/i18n-server";
import { FinalCta } from "./final-cta";
import { Navbar } from "./navbar";
import { PageHero } from "./page-hero";

/** Gabarit des pages légales : texte long, lisible, typographie sobre. */
export async function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  const { t } = await getI18n();
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow={t("Informations légales", "Legal information")} title={title}>
          <p className="text-base">{t("Dernière mise à jour :", "Last updated:")} {updated}</p>
        </PageHero>
        <article className="mx-auto max-w-3xl px-5 py-10 text-[15px] leading-relaxed break-words text-ink-900/75 sm:py-14 md:text-[length:inherit] md:leading-[inherit] [&_a]:font-medium [&_a]:break-words [&_a]:text-brand-600 [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl sm:[&_h2]:mt-10 sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_strong]:text-ink-900 [&_ul]:mb-4 [&_ul]:space-y-1.5">
          {children}
        </article>
      </main>
      <FinalCta />
    </>
  );
}
