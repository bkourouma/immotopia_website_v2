import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { blogUrl, PostMeta } from "@/components/blog-article";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { blogHref, postContent, posts } from "@/lib/blog";
import { alternates, hasLocale, ogLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { SITE_URL } from "@/lib/site";

const copy = (lang: "fr" | "en") => {
  const t = translator(lang);
  return {
    title: t("Blog ImmoTopia : gestion locative et immobilier", "ImmoTopia blog: property management and real estate"),
    description: t(
      "Conseils, méthodes et repères pour les agences, syndics, promoteurs et propriétaires : rendement locatif, loyers impayés, gestion immobilière en Côte d'Ivoire.",
      "Tips, methods and benchmarks for agencies, trustees, developers and landlords: rental yield, unpaid rent, property management in Côte d'Ivoire.",
    ),
  };
};

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, description } = copy(lang);
  return {
    title: { absolute: title },
    description,
    alternates: alternates(lang, blogHref()),
    openGraph: { title, description, url: blogHref(), locale: ogLocale[lang], type: "website" },
  };
}

export default async function BlogIndexPage() {
  const { locale, t } = await getI18n();
  const { description } = copy(locale);
  return (
    <>
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t("Accueil", "Home"), item: `${SITE_URL}${locale === "fr" ? "" : "/en"}` },
                { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl(locale) },
              ],
            },
            {
              "@type": "Blog",
              name: t("Blog ImmoTopia", "ImmoTopia blog"),
              description,
              url: blogUrl(locale),
              inLanguage: locale === "fr" ? "fr-CI" : "en",
              publisher: { "@id": `${SITE_URL}/#organization` },
              blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: postContent(p, locale).h1,
                url: blogUrl(locale, p.slug),
                datePublished: p.published,
                dateModified: p.updated,
              })),
            },
          ],
        }}
      />
      <main className="bg-paper">
        <PageHero eyebrow="Blog" title={t("Conseils et méthodes pour l'immobilier en Côte d'Ivoire.", "Tips and methods for real estate in Côte d'Ivoire.")}>
          <p>{t("Gestion locative, investissement, relances : des articles concrets pour les agences, les syndics, les promoteurs et les propriétaires.", "Property management, investment, rent collection: practical articles for agencies, trustees, developers and landlords.")}</p>
        </PageHero>

        <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("Derniers articles", "Latest articles")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((p) => {
              const c = postContent(p, locale);
              return (
                <article key={p.slug} className="group relative flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-ink-900/[0.07] transition hover:-translate-y-0.5 hover:shadow-lg md:p-7">
                  <span className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">{c.category}</span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-balance">
                    <SmartLink href={blogHref(p.slug)} className="after:absolute after:inset-0 hover:text-brand-600">
                      {c.h1}
                    </SmartLink>
                  </h3>
                  <p className="mt-3 flex-1 text-ink-900/65">{c.summary}</p>
                  <PostMeta post={p} className="mt-5 text-ink-900/50" />
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    {t("Lire l'article", "Read the article")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
