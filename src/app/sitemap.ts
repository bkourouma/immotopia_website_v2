import type { MetadataRoute } from "next";
import { localizeHref, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { landings } from "@/lib/landings";
import { tools } from "@/lib/tools";
import { allFeatures, wikiDomains, wikiHref } from "@/lib/wiki";

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
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, url(localizeHref(l, path))])) },
    }));
  return [
    ...page("/", 1, "weekly"),
    ...page("/tarifs", 0.9),
    ...page("/comparatif", 0.9),
    ...page("/contact", 0.8),
    ...page("/outils", 0.8),
    ...tools.flatMap((t) => page(`/outils/${t.slug}`, 0.7)),
    // Pages thématiques et FAQ : en français seulement
    ...["/faq", ...landings.map((l) => `/${l.slug}`)].map((path) => ({ url: url(path), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    // Wiki des fonctionnalités : en français seulement
    ...[
      { path: "/wiki", priority: 0.8 },
      ...wikiDomains.map((d) => ({ path: wikiHref(d.slug), priority: 0.7 })),
      ...allFeatures.map(({ domain, feature }) => ({ path: wikiHref(domain.slug, feature.slug), priority: 0.6 })),
    ].map(({ path, priority }) => ({ url: url(path), lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...page("/mentions-legales", 0.2, "yearly"),
    ...page("/confidentialite", 0.2, "yearly"),
  ];
}
