import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { landingBySlug, landings } from "@/lib/landings";
import { hasLocale } from "@/lib/i18n";

// Pages thématiques en français, à leurs URL historiques (référencement de l'ancien site).
export const dynamicParams = false;

export function generateStaticParams() {
  return landings.map((l) => ({ lang: "fr", landing: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[landing]">): Promise<Metadata> {
  const { lang, landing } = await params;
  const l = landingBySlug(landing);
  if (!hasLocale(lang) || lang !== "fr" || !l) return {};
  return {
    title: { absolute: l.metaTitle },
    description: l.metaDescription,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { title: l.metaTitle, description: l.metaDescription, url: `/${l.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/[landing]">) {
  const { lang, landing } = await params;
  const l = landingBySlug(landing);
  if (lang !== "fr" || !l) notFound();
  return <LandingPage landing={l} />;
}
