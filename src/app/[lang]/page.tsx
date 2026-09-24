import type { Metadata } from "next";
import { ComparatifTeaser } from "@/components/comparatif/comparatif-teaser";
import { Ecosystem } from "@/components/ecosystem";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Navbar } from "@/components/navbar";
import { Pricing } from "@/components/pricing";
import { SoftwareJsonLd } from "@/components/json-ld";
import { Roles } from "@/components/roles";
import { ToolsSection } from "@/components/tools-section";
import { alternates, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { alternates: alternates(lang, "/") } : {};
}

export default function Home() {
  return (
    <>
      <Navbar />
      <SoftwareJsonLd />
      <main>
        <Hero />
        <Marquee />
        <Roles />
        <Ecosystem />
        <ComparatifTeaser />
        <ToolsSection />
        <Pricing />
      </main>
      <FinalCta />
    </>
  );
}
