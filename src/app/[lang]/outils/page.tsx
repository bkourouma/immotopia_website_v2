import type { Metadata } from "next";
import { Lock, Sparkles, Zap } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { SmartLink } from "@/components/smart-link";
import { ToolsGrid } from "@/components/tools/tools-grid";
import { alternates, hasLocale, ogLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  const title = t(
    "Outils gratuits de gestion locative en Côte d'Ivoire",
    "Free property management tools for Côte d'Ivoire",
  );
  const description = t(
    "Quittance de loyer, bail d'habitation, bail commercial OHADA, état des lieux, caution, rendement, commission, charges : outils gratuits, sans inscription.",
    "Rent receipts, residential and OHADA commercial leases, inventories, deposits, yield, commission and condominium charges: free tools, no sign-up.",
  );
  return {
    title,
    description,
    alternates: alternates(lang, "/outils"),
    openGraph: { title, description, locale: ogLocale[lang], type: "website" },
  };
}

export default async function OutilsPage() {
  const { locale, t } = await getI18n();
  const badges = [
    { Icon: Sparkles, label: t("100 % gratuit", "100% free") },
    { Icon: Zap, label: t("Sans inscription", "No sign-up") },
    { Icon: Lock, label: t("Aucune donnée conservée", "No data stored") },
  ];
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-20 text-center text-white md:pb-28">
          <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 h-[800px] w-[1300px] -translate-x-1/2"
            style={{
              background: "radial-gradient(closest-side, rgba(91,91,247,0.32), rgba(255,138,61,0.12) 55%, transparent)",
            }}
          />
          <div className="mx-auto max-w-4xl px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-mint-400" /> {t("Outils gratuits", "Free tools")}
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.03] font-bold tracking-tight text-balance md:text-7xl">
              {t("La boîte à outils ", "The property manager's ")}
              <span className="text-gradient">{t("du gestionnaire immobilier.", "toolbox.")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
              {t(
                "Quittances, baux, états des lieux, caution, rendement, commissions, charges de copropriété : générez vos documents et faites vos calculs en quelques secondes. Et quand vous voulez que tout se fasse tout seul, ImmoTopia prend le relais.",
                "Rent receipts, leases, inventories, deposits, yield, commissions, condominium charges: generate your documents and run your numbers in seconds. And when you want it all to run on its own, ImmoTopia takes over.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/70">
              {badges.map(({ Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">
                  <Icon className="size-4 text-mint-400" /> {label}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto -mt-10 max-w-6xl px-5 pb-24">
          <ToolsGrid />
        </section>
        {/* Page de destination française seulement : pas de bandeau en anglais */}
        {locale === "fr" && (
          <section className="mx-auto max-w-6xl px-5 pb-24">
            <div className="flex flex-col gap-5 rounded-[28px] bg-white p-8 ring-1 ring-ink-900/[0.07] md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Vos clients et vos visites méritent mieux qu&apos;un tableur</h2>
                <p className="mt-3 text-ink-900/65">
                  Les outils gratuits règlent un besoin ponctuel. Pour suivre vos prospects, vos visites, vos offres et vos relances au quotidien, découvrez le{" "}
                  <SmartLink href="/crm-immobilier-cote-divoire" className="font-medium text-brand-600 hover:underline">
                    logiciel CRM immobilier
                  </SmartLink>{" "}
                  d&apos;ImmoTopia, pour les agences comme pour les promoteurs.
                </p>
              </div>
              <SmartLink
                href="/crm-immobilier-cote-divoire"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Découvrir le CRM immobilier
              </SmartLink>
            </div>
          </section>
        )}
      </main>
      <FinalCta />
    </>
  );
}
