import type { Metadata } from "next";
import { EventBanner, showEventBanner } from "@/components/event-banner";
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

export default async function Home() {
  const banner = await showEventBanner();
  return (
    <>
      <Navbar />
      <SoftwareJsonLd />
      <main>
        <EventBanner show={banner} />
        <Hero afterBanner={banner} />
        <Marquee />
        <Roles />
        <Ecosystem />
        <Pricing />
        <ComparatifTeaser />
        <ToolsSection />
      </main>
      <FinalCta />
    </>
  );
}
