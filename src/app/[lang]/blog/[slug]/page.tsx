import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { blogHref, postBySlug, postContent, posts } from "@/lib/blog";
import { alternates, hasLocale, locales, ogLocale } from "@/lib/i18n";

// Une page par article et par langue, générée au build. Un slug inconnu répond 404 : aucune redirection générique.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = postBySlug(slug);
  if (!hasLocale(lang) || !post) return {};
  const c = postContent(post, lang);
  const alt = alternates(lang, blogHref(slug));
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: alt,
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: alt.canonical as string,
      locale: ogLocale[lang],
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const post = postBySlug(slug);
  if (!hasLocale(lang) || !post) notFound();
  return <BlogArticle post={post} />;
}
