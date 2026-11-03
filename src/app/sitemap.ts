import type { MetadataRoute } from "next";
import { localizeHref, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { guideHref, guides } from "@/lib/guides";
import { landings } from "@/lib/landings";
import { tools } from "@/lib/tools";
import { allFeatures, wikiDomains, wikiHref } from "@/lib/wiki";

// Domaines du wiki laissés en ligne mais hors sitemap : documentation d'administration de la plateforme (réservée aux équipes
// ImmoTopia), sans intérêt pour une recherche publique. Les pages restent indexables (pas de noindex), seulement non recommandées.
const wikiDomainsOutOfSitemap = ["administration-plateforme"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (href: string) => `${SITE_URL}${href === "/" ? "" : href}`;
  // Chaque page existe en français (sans préfixe) et en anglais (/en), reliées par hreflang
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") =>
    locales.map((locale) => ({
      url: url(localizeHref(locale, path)),
      lastModified: now,
      changeFrequency,
      priority,
      // x-default = français, comme dans les balises hreflang de chaque page (src/lib/i18n.ts, alternates())
      alternates: { languages: { ...Object.fromEntries(locales.map((l) => [l, url(localizeHref(l, path))])), "x-default": url(path) } },
    }));
  return [
    ...page("/", 1, "weekly"),
    ...page("/tarifs", 0.9),
    ...page("/comparatif", 0.9),
    ...page("/contact", 0.8),
    ...page("/outils", 0.8),
    ...page("/versions", 0.5),
    ...tools.flatMap((t) => page(`/outils/${t.slug}`, 0.7)),
    // Pages thématiques et FAQ : en français seulement
    ...["/faq", ...landings.map((l) => `/${l.slug}`)].map((path) => ({ url: url(path), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    // Wiki des fonctionnalités : en français seulement
    ...[
      { path: "/wiki", priority: 0.8 },
      ...wikiDomains.filter((d) => !wikiDomainsOutOfSitemap.includes(d.slug)).map((d) => ({ path: wikiHref(d.slug), priority: 0.7 })),
      ...allFeatures
        .filter(({ domain }) => !wikiDomainsOutOfSitemap.includes(domain.slug))
        .map(({ domain, feature }) => ({ path: wikiHref(domain.slug, feature.slug), priority: 0.6 })),
    ].map(({ path, priority }) => ({ url: url(path), lastModified: now, changeFrequency: "monthly" as const, priority })),
    // Guides : en français seulement, datés de la dernière mise à jour réelle de chaque article
    {
      url: url(guideHref()),
      lastModified: new Date(Math.max(...guides.map((g) => Date.parse(g.updated)))),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...guides.map((g) => ({ url: url(guideHref(g.slug)), lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...page("/mentions-legales", 0.2, "yearly"),
    ...page("/confidentialite", 0.2, "yearly"),
  ];
}
