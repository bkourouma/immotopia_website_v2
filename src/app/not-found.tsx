import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Page introuvable | ImmoTopia",
  robots: { index: false },
};

const links = [
  { href: "/", label: "Accueil", text: "Découvrir l'ERP immobilier" },
  { href: "/tarifs", label: "Tarifs", text: "Les packs et le simulateur" },
  { href: "/outils", label: "Outils gratuits", text: "Quittances, baux, calculateurs" },
  { href: "/contact", label: "Contact", text: "Réserver une démonstration" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow="Erreur 404" title="Cette page n'existe pas (ou plus).">
          Elle a peut-être été déplacée lors de la refonte du site. Voici par où continuer :
        </PageHero>
        <section className="mx-auto grid max-w-4xl gap-4 px-5 py-14 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
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
