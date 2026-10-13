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
    "Comparatif ImmoTopia : ChezvousBO, Logestimmo et WIMMO",
    "Comparison: ImmoTopia vs ChezvousBO, Logestimmo, WIMMO",
  );
  const description = t(
    `${rows.length} fonctionnalités comparées par domaine : gestion locative, syndic, finance, chantiers, CRM. Sources publiques des éditeurs, septembre 2026.`,
    `${rows.length} features compared by domain: property management, condo management, finance, construction, CRM. Vendors' public sources, September 2026.`,
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
