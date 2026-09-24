import type { Metadata } from "next";
import { ComparatifView } from "@/components/comparatif/comparatif-view";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { rows } from "@/lib/comparatif";
import { alternates, hasLocale, ogLocale, translator } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/comparatif">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  const title = t(
    "Comparatif — ImmoTopia face à ChezvousBO, Logestimmo et WIMMO | ImmoTopia",
    "Comparison — ImmoTopia vs ChezvousBO, Logestimmo and WIMMO | ImmoTopia",
  );
  const description = t(
    `${rows.length} fonctionnalités comparées domaine par domaine : gestion locative, syndic, finance, chantiers, CRM et communication. Sources publiques des éditeurs, consultées en septembre 2026.`,
    `${rows.length} features compared domain by domain: property management, condominium management, finance, construction sites, CRM and communication. Vendors' public sources, consulted in September 2026.`,
  );
  return {
    title,
    description,
    alternates: alternates(lang, "/comparatif"),
    openGraph: { title, description, locale: ogLocale[lang] },
  };
}

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
