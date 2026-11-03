import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guide-article";
import { guideBySlug, guideHref, guides } from "@/lib/guides";

// Guides en français seulement (rubrique déclarée dans src/lib/french-only.ts) : une page par article, générée au build.
// Un slug inconnu répond 404 : aucune redirection générique.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ lang: "fr", slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = guideBySlug(slug);
  if (lang !== "fr" || !guide) return {};
  const url = guideHref(guide.slug);
  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      locale: "fr_CI",
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  const guide = guideBySlug(slug);
  if (lang !== "fr" || !guide) notFound();
  return <GuideArticle guide={guide} />;
}
