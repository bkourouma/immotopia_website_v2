import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/tarifs", 0.9),
    page("/comparatif", 0.9),
    page("/contact", 0.8),
    page("/outils", 0.8),
    ...tools.map((t) => page(`/outils/${t.slug}`, 0.7)),
    page("/mentions-legales", 0.2, "yearly"),
    page("/confidentialite", 0.2, "yearly"),
  ];
}
