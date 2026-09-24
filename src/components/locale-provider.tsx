"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, localizeHref, translator, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/** `const { locale, t, href } = useI18n();` puis `t("Bonjour", "Hello")` et `href("/tarifs")` */
export function useI18n() {
  const locale = useLocale();
  return { locale, t: translator(locale), href: (path: string) => localizeHref(locale, path) };
}
