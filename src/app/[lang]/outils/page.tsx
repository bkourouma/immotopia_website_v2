import type { Metadata } from "next";
import { Lock, Sparkles, Zap } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { ToolsGrid } from "@/components/tools/tools-grid";
import { alternates, hasLocale, ogLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  const title = t(
    "Outils gratuits pour la gestion locative en Côte d'Ivoire | ImmoTopia",
    "Free property management tools for Côte d'Ivoire | ImmoTopia",
  );
  const description = t(
    "Quittance de loyer, bail d'habitation, bail commercial OHADA, caution, rendement locatif, commission d'agence et charges de copropriété : des outils gratuits, sans inscription.",
    "Rent receipts, residential leases, OHADA commercial leases, deposits, rental yield, agency commission and condominium charges: free tools, no sign-up required.",
  );
  return {
    title,
    description,
    alternates: alternates(lang, "/outils"),
    openGraph: { title, description, locale: ogLocale[lang], type: "website" },
  };
}

export default async function OutilsPage() {
  const { t } = await getI18n();
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
                "Quittances, baux, caution, rendement, commissions, charges de copropriété : générez vos documents et faites vos calculs en quelques secondes. Et quand vous voulez que tout se fasse tout seul, ImmoTopia prend le relais.",
                "Rent receipts, leases, deposits, yield, commissions, condominium charges: generate your documents and run your numbers in seconds. And when you want it all to run on its own, ImmoTopia takes over.",
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
      </main>
      <FinalCta />
    </>
  );
}
