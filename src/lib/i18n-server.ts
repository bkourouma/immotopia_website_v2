// Langue courante dans les composants serveur, sans la faire descendre de page en page.

import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, translator, type Locale } from "./i18n";

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** `const { locale, t } = await getI18n();` puis `t("Bonjour", "Hello")` */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: translator(locale) };
}
