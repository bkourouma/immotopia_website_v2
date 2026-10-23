// Identifiant de mesure Google Analytics 4 (public : il figure dans le HTML servi). Les caractères 4, 8 et 12 sont le chiffre zéro (aucune lettre O).
export const GA_MEASUREMENT_ID = "G-W0VCK0DK70";

/** Cookies _ga valables 13 mois au plus (395 jours, en secondes). */
export const GA_COOKIE_EXPIRES = 34128000;

export const GA_CONFIG = {
  cookie_expires: GA_COOKIE_EXPIRES,
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
} as const;

export const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

/** Code d'initialisation de gtag, inséré seulement après « Accepter ». */
export function buildGtagInitScript(): string {
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', ${JSON.stringify(GA_CONFIG)});`;
}
