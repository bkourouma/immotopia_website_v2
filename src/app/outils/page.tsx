import type { Metadata } from "next";
import { Lock, Sparkles, Zap } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { ToolsGrid } from "@/components/tools/tools-grid";

export const metadata: Metadata = {
  title: "Outils gratuits pour la gestion locative en Côte d'Ivoire | ImmoTopia",
  description:
    "Quittance de loyer, bail d'habitation, bail commercial OHADA, caution, rendement locatif, commission d'agence et charges de copropriété : des outils gratuits, sans inscription.",
  alternates: { canonical: "/outils" },
};

export default function OutilsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-20 text-center text-white md:pb-28">
          <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
          <div aria-hidden className="absolute top-10 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500/40 to-sun-500/30 blur-[130px]" />
          <div className="mx-auto max-w-4xl px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-mint-400" /> Outils gratuits
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.03] font-bold tracking-tight text-balance md:text-7xl">
              La boîte à outils <span className="text-gradient">du gestionnaire immobilier.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
              Quittances, baux, caution, rendement, commissions, charges de copropriété : générez vos documents et faites vos calculs
              en quelques secondes. Et quand vous voulez que tout se fasse tout seul, ImmoTopia prend le relais.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/70">
              {[
                [Sparkles, "100 % gratuit"],
                [Zap, "Sans inscription"],
                [Lock, "Aucune donnée conservée"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Lock;
                return (
                  <span key={label as string} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">
                    <I className="size-4 text-mint-400" /> {label as string}
                  </span>
                );
              })}
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
