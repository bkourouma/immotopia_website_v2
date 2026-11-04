import { ArrowRight, Clock } from "lucide-react";
import { Block } from "@/components/guide-article";
import { DemoButton } from "@/components/demo-button";
import { FinalCta } from "@/components/final-cta";
import { InlineLinks, stripLinks } from "@/components/inline-links";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { WikiBreadcrumb } from "@/components/wiki/wiki-ui";
import { blogHref, postBySlug, postContent, postReadingMinutes, type BlogPost } from "@/lib/blog";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { SITE_URL } from "@/lib/site";

const dateLocale: Record<Locale, string> = { fr: "fr-FR", en: "en-GB" };
/** « 2026-11-04 » → « 4 novembre 2026 » (en UTC, pour ne pas dépendre du fuseau du serveur) */
const longDate = (iso: string, locale: Locale) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(dateLocale[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const eyebrow = "text-xs font-semibold tracking-[0.14em] text-ink-900/45 uppercase";

/** Adresse absolue d'une page du blog dans la langue voulue */
export const blogUrl = (locale: Locale, slug?: string) => `${SITE_URL}${localizeHref(locale, blogHref(slug))}`;

/** Ligne « publié le… · mis à jour le… · temps de lecture » */
export async function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  const { locale, t } = await getI18n();
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${className}`}>
      <span>
        {t("Publié le", "Published on")} <time dateTime={post.published}>{longDate(post.published, locale)}</time>
      </span>
      {post.updated !== post.published && (
        <span>
          {t("Mis à jour le", "Updated on")} <time dateTime={post.updated}>{longDate(post.updated, locale)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" aria-hidden /> {postReadingMinutes(postContent(post, locale))} {t("min de lecture", "min read")}
      </span>
    </p>
  );
}

export async function BlogArticle({ post }: { post: BlogPost }) {
  const { locale, t } = await getI18n();
  const c = postContent(post, locale);
  const url = blogUrl(locale, post.slug);
  const crumbs = [
    { label: "Blog", href: blogHref() },
    { label: c.h1, href: blogHref(post.slug) },
  ];
  const related = post.related.map(postBySlug).filter((p): p is BlogPost => !!p);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: t("Accueil", "Home"), item: `${SITE_URL}${localizeHref(locale, "/")}`.replace(/\/$/, "") },
          { name: "Blog", item: blogUrl(locale) },
          { name: c.h1, item: url },
        ].map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })),
      },
      {
        "@type": "BlogPosting",
        headline: c.h1,
        description: c.metaDescription,
        url,
        mainEntityOfPage: url,
        inLanguage: locale === "fr" ? "fr-CI" : "en",
        datePublished: post.published,
        dateModified: post.updated,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) } })),
      },
    ],
  };

  const tocLink = "-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-900/60 transition hover:border-brand-500 hover:text-ink-900";
  return (
    <>
      <Navbar />
      <JsonLd data={ld} />
      <main className="bg-paper">
        <PageHero eyebrow={c.category} title={c.h1}>
          <p>
            <InlineLinks text={c.intro} linkClassName="font-medium text-white underline underline-offset-2 hover:text-mint-400" />
          </p>
          <PostMeta post={post} className="mt-6 justify-center text-white/60" />
        </PageHero>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:py-16 lg:grid-cols-[250px_1fr]">
          <aside className="order-first">
            <nav aria-label={t("Sommaire de l'article", "Article contents")} className="lg:sticky lg:top-28">
              <p className={eyebrow}>{t("Dans cet article", "In this article")}</p>
              <ul className="mt-3 space-y-0.5 border-l border-ink-900/10">
                {c.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={tocLink}>
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#questions" className={tocLink}>
                    {t("Questions fréquentes", "FAQ")}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <WikiBreadcrumb items={crumbs} />

            {c.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28 first-of-type:mt-8">
                <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{s.title}</h2>
                <div className="max-w-3xl">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}

            <section id="questions" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{t("Questions fréquentes", "Frequently asked questions")}</h2>
              <div className="mt-5 divide-y divide-ink-900/[0.07] rounded-[22px] bg-white ring-1 ring-ink-900/[0.07]">
                {c.faq.map((f) => (
                  <details key={f.q} className="group p-6">
                    <summary className="cursor-pointer list-none font-semibold marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span className="text-brand-600 transition-transform group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-ink-900/65">
                      <InlineLinks text={f.a} />
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold tracking-tight">{t("Pour aller plus loin", "Go further")}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.productLinks.map((l) => (
                  <SmartLink key={l.href} href={l.href} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:ring-brand-500/30">
                    <span className="block font-semibold group-hover:text-brand-600">{l.label}</span>
                    <span className="mt-1 block text-sm text-ink-900/60">{l.text}</span>
                  </SmartLink>
                ))}
                {related.map((p) => (
                  <SmartLink key={p.slug} href={blogHref(p.slug)} className="group rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07] transition hover:ring-brand-500/30">
                    <span className={eyebrow}>Blog</span>
                    <span className="mt-1 block font-semibold group-hover:text-brand-600">{postContent(p, locale).h1}</span>
                    <span className="mt-1 block text-sm text-ink-900/60">{postContent(p, locale).summary}</span>
                  </SmartLink>
                ))}
              </div>
            </section>

            <section className="relative isolate mt-14 overflow-hidden rounded-[28px] bg-ink-950 px-6 py-10 text-center text-white md:px-12">
              <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-72 w-[640px] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.35), transparent)" }} />
              <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{c.cta.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/65">{c.cta.text}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <DemoButton label={t("Demander une démonstration", "Request a demo")} />
                <SmartLink
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
                >
                  {t("Nous contacter", "Contact us")} <ArrowRight className="size-4" aria-hidden />
                </SmartLink>
              </div>
            </section>
          </article>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
