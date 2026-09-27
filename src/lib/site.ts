// Coordonnées et identité légale, centralisées ici (pied de page, contact, WhatsApp, mentions légales).

import { defaultLocale, type Locale } from "./i18n";

export const SITE_URL = "https://immotopia.cloud";
export const APP_LOGIN_URL = "https://app.immotopia.cloud/login";

export const contact = {
  phone: "+225 01 01 51 01 36",
  phoneHref: "tel:+2250101510136",
  whatsapp: "https://wa.me/2250101510136",
  whatsappMessage: {
    fr: "Bonjour ImmoTopia, je souhaite en savoir plus sur votre ERP immobilier.",
    en: "Hello ImmoTopia, I would like to know more about your real estate ERP.",
  } satisfies Record<Locale, string>,
  email: "support@immotopia.cloud",
  city: "Abidjan, Côte d'Ivoire",
};

export const legal = {
  publisher: "Alliance Consultants",
  rccm: "CI-ABJ-2014-B-20956",
  taxId: "1438224 S", // numéro de compte contribuable (CC)
  publicationDirector: "Baba KOUROUMA",
  publisherSite: "https://allianceconsultants.net",
  host: "Hostinger International Ltd.",
  hostAddress: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
  hostSite: "https://www.hostinger.com",
};

export function whatsappLink(locale: Locale = defaultLocale, message = contact.whatsappMessage[locale]) {
  return `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
