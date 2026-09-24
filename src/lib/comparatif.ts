// Comparatif ImmoTopia face à trois éditeurs ivoiriens.
// Les lignes et les sources sont générées depuis l'Excel de veille (voir comparatif-data.ts) ;
// ce fichier porte ce qui ne se déduit pas du tableau : produits, domaines, libellés.
// Le comparatif reprend tout le périmètre de l'Excel, fonctions en cours de développement comprises,
// comme le permet la règle éditoriale de content.ts. Régénérer les données :
// python scripts/comparatif-from-excel.py <chemin de l'Excel>
// puis mettre à jour la traduction comparatif-data.en.ts et vérifier : node scripts/check-comparatif-en.mjs

import { compareRows, compareSources } from "./comparatif-data";
import { compareRowsEn, compareSourcesEn } from "./comparatif-data.en";
import type { DomainId } from "./comparatif-domains";
import type { Locale } from "./i18n";

export type Status = "oui" | "partiel" | "nd" | "absent" | "verif";

export type CompareRow = {
  domain: DomainId;
  feature: string;
  /** ImmoTopia, ChezvousBO, Logestimmo, WIMMO */
  statuses: [Status, Status, Status, Status];
  note: string;
  sources: string[];
};

export type CompareSource = { ref: string; editor: string; page: string; url: string; limit: string };

export const CONSULTED_ON: Record<Locale, string> = { fr: "23 septembre 2026", en: "23 September 2026" };

export const products = [
  { id: "immotopia", name: "ImmoTopia", color: "#5B5BF7", site: "" },
  { id: "chezvousbo", name: "ChezvousBO", color: "#F472B6", site: "https://onboarding.chez-vous.ci/" },
  { id: "logestimmo", name: "Logestimmo", color: "#38BDF8", site: "https://logestimmo.com/" },
  { id: "wimmo", name: "WIMMO", color: "#FACC15", site: "https://www.wimmo-ci.com/" },
] as const;

export { comparatifHref, domains, type DomainId } from "./comparatif-domains";

type StatusInfo = { label: string; short: string; hint: string };

/** Libellés des statuts par langue : `statusMeta[locale][status]`. */
export const statusMeta: Record<Locale, Record<Status, StatusInfo>> = {
  fr: {
    oui: { label: "Annoncé", short: "Oui", hint: "Fonction annoncée explicitement par l'éditeur." },
    partiel: { label: "Partiel", short: "Partiel", hint: "Fonction proche, ou décrite en partie seulement." },
    nd: { label: "Non documenté", short: "—", hint: "Rien trouvé dans les pages publiques examinées. Cela ne prouve pas que la fonction est absente." },
    absent: { label: "Absent", short: "Absent", hint: "L'éditeur signale lui-même que la fonction manque." },
    verif: { label: "En cours de vérification", short: "…", hint: "Pages publiques de l'éditeur pas encore examinées pour cette fonction." },
  },
  en: {
    oui: { label: "Advertised", short: "Yes", hint: "Feature explicitly advertised by the vendor." },
    partiel: { label: "Partial", short: "Partial", hint: "A similar feature, or one only partly described." },
    nd: { label: "Not documented", short: "—", hint: "Nothing found in the public pages reviewed. This does not prove the feature is missing." },
    absent: { label: "Missing", short: "Missing", hint: "The vendor itself states that the feature is missing." },
    verif: { label: "Being verified", short: "…", hint: "The vendor's public pages have not yet been reviewed for this feature." },
  },
};

/** Lignes en français (ordre et statuts identiques dans les deux langues). */
export const rows = compareRows;
export const sources = compareSources;

export const rowsFor = (locale: Locale): CompareRow[] => (locale === "en" ? compareRowsEn : compareRows);
export const sourcesFor = (locale: Locale): CompareSource[] => (locale === "en" ? compareSourcesEn : compareSources);

export const rowsOf = (domain: DomainId, locale: Locale = "fr") => rowsFor(locale).filter((r) => r.domain === domain);

/** Nombre de fonctions annoncées (« Oui ») par produit, sur un ensemble de lignes. */
export function scores(list: CompareRow[] = rows) {
  return products.map((_, i) => list.filter((r) => r.statuses[i] === "oui").length);
}

/** Ce qu'ImmoTopia annonce et qu'aucun des trois autres ne documente pleinement. */
export const isExclusive = (r: CompareRow) => r.statuses[0] === "oui" && r.statuses.slice(1).every((s) => s !== "oui");
