import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t("Page introuvable | ImmoTopia", "Page not found | ImmoTopia"), robots: { index: false } };
}

export default async function NotFound() {
  const { locale, t } = await getI18n();
  const links = [
    { href: "/", label: t("Accueil", "Home"), text: t("Découvrir l'ERP immobilier", "Discover the real estate ERP") },
    { href: "/tarifs", label: t("Tarifs", "Pricing"), text: t("Les packs et le simulateur", "Packs and price simulator") },
    { href: "/outils", label: t("Outils gratuits", "Free tools"), text: t("Quittances, baux, calculateurs", "Rent receipts, leases, calculators") },
    { href: "/contact", label: "Contact", text: t("Réserver une démonstration", "Book a demo") },
  ];
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow={t("Erreur 404", "Error 404")} title={t("Cette page n'existe pas (ou plus).", "This page doesn't exist (anymore).")}>
          {t(
            "Elle a peut-être été déplacée lors de la refonte du site. Voici par où continuer :",
            "It may have moved during the website redesign. Here's where to go next:",
          )}
        </PageHero>
        <section className="mx-auto grid max-w-4xl gap-4 px-5 py-14 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={localizeHref(locale, l.href)}
              className="group flex items-center justify-between rounded-[22px] border border-ink-900/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>
                <span className="block font-display text-lg font-bold">{l.label}</span>
                <span className="block text-sm text-ink-900/60">{l.text}</span>
              </span>
              <ArrowRight className="size-5 text-brand-600 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </section>
      </main>
      <FinalCta />
    </>
  );
}
