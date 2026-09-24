import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { Pricing } from "@/components/pricing";
import { SoftwareJsonLd } from "@/components/json-ld";
import { alternates, hasLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata({ params }: PageProps<"/[lang]/tarifs">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    title: t("Tarifs — Packs Agence, Syndic et Promoteur | ImmoTopia", "Pricing — Agency, Condo Management and Developer packs | ImmoTopia"),
    description: t(
      "Tarifs ImmoTopia en FCFA : Agence dès 29 900, Syndic dès 49 900, Promoteur dès 149 900 FCFA HT/mois, et forfait Opérateur intégré. Premier mois offert, sans engagement. Aucune commission sur les loyers.",
      "ImmoTopia pricing in FCFA: Agency from 29,900, Condo Management from 49,900, Developer from 149,900 FCFA excl. VAT/month, plus an all-in Integrated Operator plan. First month free, no commitment. No commission on rent.",
    ),
    alternates: alternates(lang, "/tarifs"),
  };
}

export default async function TarifsPage() {
  const { t } = await getI18n();
  return (
    <>
      <Navbar />
      <SoftwareJsonLd />
      <main>
        <PageHero eyebrow={t("Tarifs", "Pricing")} title={t("Des tarifs clairs, en FCFA.", "Clear pricing, in FCFA.")}>
          {t(
            "Choisissez le pack de votre métier, estimez votre abonnement en quelques secondes, et réservez une démonstration.",
            "Pick the pack for your business, estimate your subscription in seconds, and book a demo.",
          )}
        </PageHero>
        <Pricing comparisonOpen />
      </main>
      <FinalCta />
    </>
  );
}
