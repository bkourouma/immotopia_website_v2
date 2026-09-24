import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolsGrid } from "./tools/tools-grid";
import { Eyebrow } from "./ui";
import { localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

/** Section « Outils gratuits » de la page d'accueil */
export async function ToolsSection() {
  const { locale, t } = await getI18n();
  return (
    <section id="outils" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{t("Outils gratuits", "Free tools")}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
              {t("Essayez avant même ", "Try it before you ")}
              <span className="text-gradient-dark">{t("de nous parler.", "even talk to us.")}</span>
            </h2>
            <p className="mt-5 text-lg text-ink-900/60">
              {t(
                "Quittances, baux et calculateurs, gratuits et sans inscription.",
                "Rent receipts, leases and calculators, free and with no sign-up.",
              )}
            </p>
          </div>
          <Link
            href={localizeHref(locale, "/outils")}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold transition hover:bg-ink-900 hover:text-white"
          >
            {t("Tous les outils", "All tools")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12">
          <ToolsGrid />
        </div>
      </div>
    </section>
  );
}
