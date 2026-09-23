import type { Metadata } from "next";
import { ComparatifView } from "@/components/comparatif/comparatif-view";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { rows } from "@/lib/comparatif";

export const metadata: Metadata = {
  title: "Comparatif — ImmoTopia face à ChezvousBO, Logestimmo et WIMMO | ImmoTopia",
  description: `${rows.length} fonctionnalités comparées domaine par domaine : gestion locative, syndic, finance, chantiers, CRM et communication. Sources publiques des éditeurs, consultées en septembre 2026.`,
  alternates: { canonical: "/comparatif" },
};

export default function ComparatifPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <ComparatifView />
      </main>
      <FinalCta />
    </>
  );
}
