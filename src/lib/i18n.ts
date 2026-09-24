// Langues du site. Le français reste à la racine (« /tarifs »), l'anglais est servi sous « /en » (« /en/tarifs »).
// Le proxy (src/proxy.ts) réécrit les adresses sans préfixe vers app/[lang] avec lang = « fr ».
// Utilisable côté serveur comme côté client.

import type { Metadata } from "next";
import { frenchOnlyPaths } from "./french-only";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string | undefined): value is Locale => !!value && (locales as readonly string[]).includes(value);

/** Texte bilingue : `t("Bonjour", "Hello")` rend la version de la langue courante. */
export type Translate = <T>(fr: T, en: T) => T;
export const translator = (locale: Locale): Translate => (fr, en) => (locale === "en" ? en : fr);

/** Adresse interne dans la langue voulue : « /tarifs » → « /en/tarifs » ; ancres et liens externes inchangés. */
export function localizeHref(locale: Locale, href: string) {
  if (locale === defaultLocale || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#") || href.startsWith("/?")) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

/** Retire le préfixe de langue d'un chemin visible : « /en/tarifs » → { locale: "en", path: "/tarifs" } */
export function splitPath(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(en|fr)(?=\/|$)(.*)$/);
  if (m) return { locale: m[1] as Locale, path: m[2] || "/" };
  return { locale: defaultLocale, path: pathname || "/" };
}

/** Même page dans l'autre langue */
export function switchLocalePath(pathname: string, target: Locale) {
  const { path } = splitPath(pathname);
  if (target !== defaultLocale && frenchOnlyPaths.includes(path)) return localizeHref(target, "/");
  return localizeHref(target, path);
}

export const htmlLang: Record<Locale, string> = { fr: "fr", en: "en" };
export const ogLocale: Record<Locale, string> = { fr: "fr_CI", en: "en_US" };
export const localeLabel: Record<Locale, { short: string; name: string }> = {
  fr: { short: "FR", name: "Français" },
  en: { short: "EN", name: "English" },
};

/** Canonique et liens hreflang d'une page (chemin exprimé sans préfixe de langue). */
export function alternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizeHref(locale, path),
    languages: { fr: path, en: localizeHref("en", path), "x-default": path },
  };
}
