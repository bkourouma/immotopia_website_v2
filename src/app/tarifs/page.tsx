import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { Pricing } from "@/components/pricing";
import { SoftwareJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Tarifs — Packs Agence, Syndic, Promoteur et Opérateur intégré | ImmoTopia",
  description:
    "Tarifs ImmoTopia en FCFA : pack Agence dès 29 900 FCFA HT/mois, Syndic, Promoteur et Opérateur intégré. Aucune commission sur les loyers, 1 mois offert en annuel.",
  alternates: { canonical: "/tarifs" },
};

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <SoftwareJsonLd />
      <main>
        <PageHero eyebrow="Tarifs" title="Des tarifs clairs, en FCFA.">
          Choisissez le pack de votre métier, estimez votre abonnement en quelques secondes, et réservez une démonstration.
        </PageHero>
        <Pricing />
      </main>
      <FinalCta />
    </>
  );
}
