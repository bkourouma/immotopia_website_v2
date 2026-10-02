// Grille tarifaire (source : catalogue d'abonnement de l'application, packages/api/src/lib/subscription/catalog.ts).
// Tous les montants sont en FCFA, hors taxes. Modifier ici met à jour les cartes, le tableau et le simulateur.
// Le français fait foi (repris tel quel par l'assistant) ; l'anglais est une surcouche des textes affichés.

import type { Locale } from "./i18n";

export type PackId = "agence" | "syndic" | "promoteur" | "integre" | "patrimoine-essentiel" | "patrimoine-pro";

export type Pack = {
  id: PackId;
  name: string;
  audience: string;
  monthly: number;
  included: string;
  extension: string;
  setup: number; // mise en route accompagnée (facultative)
  highlights: string[];
  /** limite à rappeler sur la carte */
  limit?: string;
  featured?: boolean;
  /** false = pack masqué sur le site et pour l'assistant */
  available: boolean;
};

export const ANNUAL_MONTHS = 11; // l'annuel payé d'avance = 11 mensualités (12 mois pour 11)
export const FREE_TRIAL_MONTHS = 1; // premier mois offert sur tous les packs (essai de 30 jours), sans engagement
export const TRIAL_TEXT = "Premier mois offert, sans engagement";
export const trialText: Record<Locale, string> = { fr: TRIAL_TEXT, en: "First month free, no commitment" };
export const COMBO_DISCOUNT = 0.1; // 10 % sur le prix de base du moins cher des packs combinés
export const VAT_RATE = 0.18; // TVA ajoutée sur les factures émises par Alliance Consultants

export const packs: Pack[] = [
  {
    id: "agence",
    name: "Agence",
    audience: "Agences de transaction et de gestion locative",
    monthly: 29_900,
    included: "100 lots (logements sous mandat de gestion)",
    extension: "Bloc de 10 lots : 1 500 FCFA/mois (150 FCFA le lot), 750 FCFA au-delà du 300e lot",
    setup: 100_000,
    available: true,
    highlights: [
      "CRM : contacts et prospects, ventes",
      "Gestion locative : baux, échéances, paiements",
      "Portails propriétaire et locataire",
      "Patrimoine, biens et documents",
      "Finance, maintenance et communication",
      "Rôles et audit",
    ],
  },
  {
    id: "syndic",
    name: "Syndic",
    audience: "Cabinets de copropriété",
    monthly: 49_900,
    included: "2 copropriétés actives et 100 lots principaux",
    extension: "+10 000 FCFA/copropriété active ; bloc de 10 lots : 1 500 FCFA/mois",
    setup: 150_000,
    available: true,
    highlights: [
      "Copropriétés, lots et tantièmes",
      "Appels de charges et relances",
      "Assemblées générales",
      "Portail copropriétaire",
      "Biens, contacts, documents et finance",
      "Maintenance, communication, rôles et audit",
    ],
  },
  {
    id: "promoteur",
    name: "Promoteur",
    audience: "Promoteurs qui construisent et commercialisent",
    monthly: 149_900,
    included: "2 chantiers actifs et 150 lots de programme",
    extension: "+40 000 FCFA/chantier actif ; bloc de 10 lots : 1 000 FCFA/mois",
    setup: 450_000,
    available: true,
    highlights: [
      "Construction : chantiers, BTP, stock",
      "CRM et ventes",
      "Patrimoine",
      "Biens, contacts, documents et finance",
      "Maintenance, communication, rôles et audit",
    ],
  },
  {
    id: "integre",
    name: "Opérateur intégré",
    audience: "Groupes qui construisent, vendent, louent et gèrent",
    monthly: 249_900,
    included: "3 chantiers, 3 copropriétés et 300 lots distincts",
    extension: "+35 000 FCFA/chantier ; +10 000 FCFA/copropriété ; bloc de 10 lots : 1 000 FCFA/mois",
    setup: 650_000,
    featured: true,
    available: true,
    highlights: [
      "Tout Agence, Syndic et Promoteur dans un seul compte",
      "Un même lot compté une seule fois, du chantier à la gestion",
      "Toutes les fonctions transversales incluses",
    ],
  },
  {
    id: "patrimoine-essentiel",
    name: "Patrimoine Essentiel",
    audience: "Particuliers et diaspora",
    monthly: 9_900,
    included: "10 biens détenus en propre, loués ou non",
    extension: "Bloc de 10 biens détenus : 9 900 FCFA/mois (990 FCFA le bien)",
    setup: 30_000,
    available: true,
    limit: "Gestion locative directe de vos propres biens, sans mandat ni propriétaire tiers.",
    highlights: [
      "Vue patrimoniale : valeur des biens, emprunts, ratios bancaires, projections par bien",
      "Gestion locative directe de vos propres biens : baux, loyers, quittances",
      "Documents, finance, maintenance et communication",
      "Rôles et audit",
      "Valeur nette et projections consolidées : bientôt (en développement)",
    ],
  },
  {
    id: "patrimoine-pro",
    name: "Patrimoine Pro",
    audience: "Entreprises et institutionnels",
    monthly: 29_900,
    included: "100 biens détenus en propre, loués ou non",
    extension: "Dépassement : 2 990 FCFA le bloc de 10 biens (299 FCFA le bien)",
    setup: 90_000,
    available: true,
    limit: "Gestion locative directe de vos propres biens, sans mandat ni propriétaire tiers. Ne se cumule pas avec l'Essentiel : on change de pack.",
    highlights: [
      "Vue patrimoniale : valeur des biens, emprunts, ratios bancaires, projections par bien",
      "Gestion locative directe de vos propres biens : baux, loyers, quittances",
      "Documents, finance, maintenance et communication",
      "Rôles et audit",
      "Valeur nette et projections consolidées : bientôt (en développement)",
    ],
  },
];

/** Packs actuellement commercialisés (affichés sur le site et connus de l'assistant) */
export const activePacks = packs.filter((p) => p.available);

/** Textes anglais des packs (prix, capacités et disponibilité restent ceux de la version française) */
const packsEnText: Record<PackId, Pick<Pack, "name" | "audience" | "included" | "extension" | "highlights" | "limit">> = {
  agence: {
    name: "Agency",
    audience: "Sales and property management agencies",
    included: "100 lots (units under management)",
    extension: "Block of 10 lots: 1,500 FCFA/month (150 FCFA per lot), 750 FCFA beyond the 300th lot",
    highlights: [
      "CRM: contacts and prospects, sales",
      "Property management: leases, due dates, payments",
      "Owner and tenant portals",
      "Portfolio, properties and documents",
      "Finance, maintenance and communication",
      "Roles and audit trail",
    ],
  },
  syndic: {
    name: "Condo Management",
    audience: "Condominium management firms",
    included: "2 active condominiums and 100 main lots",
    extension: "+10,000 FCFA/active condominium; block of 10 lots: 1,500 FCFA/month",
    highlights: [
      "Condominiums, lots and ownership shares",
      "Service charge calls and reminders",
      "General meetings",
      "Co-owner portal",
      "Properties, contacts, documents and finance",
      "Maintenance, communication, roles and audit trail",
    ],
  },
  promoteur: {
    name: "Developer",
    audience: "Developers who build and sell",
    included: "2 active sites and 150 project lots",
    extension: "+40,000 FCFA/active site; block of 10 lots: 1,000 FCFA/month",
    highlights: [
      "Construction: sites, building works, stock",
      "CRM and sales",
      "Portfolio",
      "Properties, contacts, documents and finance",
      "Maintenance, communication, roles and audit trail",
    ],
  },
  integre: {
    name: "Integrated Operator",
    audience: "Groups that build, sell, rent and manage",
    included: "3 sites, 3 condominiums and 300 distinct lots",
    extension: "+35,000 FCFA/site; +10,000 FCFA/condominium; block of 10 lots: 1,000 FCFA/month",
    highlights: [
      "Everything in Agency, Condo Management and Developer, in one account",
      "Each lot counted once, from construction to management",
      "All cross-cutting features included",
    ],
  },
  "patrimoine-essentiel": {
    name: "Portfolio Essential",
    audience: "Individuals and the diaspora",
    included: "10 owned properties, rented or not",
    extension: "Block of 10 owned properties: 9,900 FCFA/month (990 FCFA per property)",
    limit: "Direct rental management of your own properties, with no mandate and no third-party owner.",
    highlights: [
      "Portfolio view: property values, loans, bank ratios, per-property projections",
      "Direct rental management of your own properties: leases, rent, receipts",
      "Documents, finance, maintenance and communication",
      "Roles and audit trail",
      "Consolidated net worth and projections: coming soon (in development)",
    ],
  },
  "patrimoine-pro": {
    name: "Portfolio Pro",
    audience: "Companies and institutions",
    included: "100 owned properties, rented or not",
    extension: "Overage: 2,990 FCFA per block of 10 properties (299 FCFA per property)",
    limit: "Direct rental management of your own properties, with no mandate and no third-party owner. Cannot be combined with Essential: switch packs instead.",
    highlights: [
      "Portfolio view: property values, loans, bank ratios, per-property projections",
      "Direct rental management of your own properties: leases, rent, receipts",
      "Documents, finance, maintenance and communication",
      "Roles and audit trail",
      "Consolidated net worth and projections: coming soon (in development)",
    ],
  },
};

export const packsByLocale: Record<Locale, Pack[]> = {
  fr: packs,
  en: packs.map((p) => ({ ...p, ...packsEnText[p.id] })),
};

/** Packs commercialisés dans la langue voulue */
export const getActivePacks = (locale: Locale) => packsByLocale[locale].filter((p) => p.available);

/**
 * Couverture fonctionnelle : [domaine, agence, syndic, promoteur, intégré, patrimoine essentiel, patrimoine pro].
 * « live: false » = domaine pas encore en production, jamais affiché.
 */
type Cells = [boolean, boolean, boolean, boolean, boolean, boolean];
const coverageAll: { label: string; en: string; cells: Cells; live: boolean }[] = [
  { label: "Biens et documents", en: "Properties and documents", cells: [true, true, true, true, true, true], live: true },
  { label: "Contacts, rôles, audit, tableaux de bord", en: "Contacts, roles, audit trail, dashboards", cells: [true, true, true, true, true, true], live: true },
  { label: "CRM, mandats, annonces, visites et suivi commercial", en: "CRM, mandates, listings, viewings and sales follow-up", cells: [true, false, true, true, false, false], live: true },
  { label: "Baux, loyers, échéances, paiements et quittances", en: "Leases, rent, due dates, payments and receipts", cells: [true, false, false, true, true, true], live: true },
  { label: "Pénalités de retard et dépôts de garantie", en: "Late fees and security deposits", cells: [true, false, false, true, false, false], live: true },
  { label: "Portails propriétaire et locataire", en: "Owner and tenant portals", cells: [true, false, false, true, false, false], live: true },
  { label: "Maintenance et interventions", en: "Maintenance and work orders", cells: [true, true, true, true, true, true], live: true },
  { label: "Syndic : copropriétés, tantièmes, charges, impayés, AG", en: "Condominiums: ownership shares, service charges, arrears, general meetings", cells: [false, true, false, true, false, false], live: true },
  { label: "Comptabilité de copropriété et budgets", en: "Condominium accounting and budgets", cells: [false, true, false, true, false, false], live: true },
  { label: "Chantiers : budgets, coûts, achats, avancement, lots, clôture", en: "Construction sites: budgets, costs, purchasing, progress, lots, close-out", cells: [false, false, true, true, false, false], live: true },
  { label: "BTP : matériaux et stock, personnel, tâcherons, terrain", en: "Construction: materials and stock, staff, subcontractors, field work", cells: [false, false, true, true, false, false], live: true },
  { label: "Finance", en: "Finance", cells: [true, true, true, true, true, true], live: true },
  { label: "Patrimoine : valeur des biens, emprunts, ratios bancaires, projections par bien", en: "Portfolio: property values, loans, bank ratios, per-property projections", cells: [true, false, true, true, true, true], live: true },
  { label: "Communication : e-mail, modèles, rappels, WhatsApp, newsletter", en: "Communication: email, templates, reminders, WhatsApp, newsletter", cells: [true, true, true, true, true, true], live: true },
];

const activeIdx = packs.map((p, i) => (p.available ? i : -1)).filter((i) => i >= 0);

/** Lignes du tableau comparatif, limitées aux domaines en production et aux packs commercialisés */
export const coverage: [string, ...boolean[]][] = coverageAll
  .filter((r) => r.live)
  .map((r) => [r.label, ...activeIdx.map((i) => r.cells[i])]);

/** Même tableau, libellés dans la langue voulue */
export const coverageByLocale: Record<Locale, [string, ...boolean[]][]> = {
  fr: coverage,
  en: coverageAll.filter((r) => r.live).map((r) => [r.en, ...activeIdx.map((i) => r.cells[i])]),
};

/** Extensions à la carte, affichées sous la grille et connues de l'assistant */
export const extensions: { name: Record<Locale, string>; price: Record<Locale, string>; note: Record<Locale, string> }[] = [
  {
    name: { fr: "Bloc de 10 lots", en: "Block of 10 lots" },
    price: { fr: "1 500 FCFA/mois", en: "1,500 FCFA/month" },
    note: {
      fr: "150 FCFA le lot. 1 000 avec Promoteur ou Intégré ; 750 pour l'Agence seule au-delà du 300e lot. Réservé aux packs Agence, Syndic, Promoteur et Intégré.",
      en: "150 FCFA per lot. 1,000 with Developer or Integrated; 750 for Agency alone beyond the 300th lot. Agency, Condo Management, Developer and Integrated packs only.",
    },
  },
  {
    name: { fr: "Copropriété supplémentaire", en: "Additional condominium" },
    price: { fr: "10 000 FCFA/mois", en: "10,000 FCFA/month" },
    note: { fr: "+1 copropriété active. Syndic ou Intégré.", en: "+1 active condominium. Condo Management or Integrated." },
  },
  {
    name: { fr: "Chantier supplémentaire", en: "Additional site" },
    price: { fr: "40 000 FCFA/mois", en: "40,000 FCFA/month" },
    note: { fr: "+1 chantier actif. 35 000 avec l'Intégré. Promoteur ou Intégré.", en: "+1 active site. 35,000 with Integrated. Developer or Integrated." },
  },
  {
    name: { fr: "Bloc de 10 biens détenus", en: "Block of 10 owned properties" },
    price: { fr: "9 900 FCFA/mois", en: "9,900 FCFA/month" },
    note: {
      fr: "990 FCFA le bien, avec Patrimoine Essentiel. Avec le Pro, le dépassement est facturé 2 990 FCFA le bloc de 10 (299 FCFA le bien).",
      en: "990 FCFA per property, with Portfolio Essential. With Pro, overage is billed 2,990 FCFA per block of 10 (299 FCFA per property).",
    },
  },
];

/** Règles commerciales affichées sous la grille et reprises par l'assistant */
export const commercialRules: Record<Locale, string[]> = {
  fr: [
    "Combinaison de packs : 10 % de remise sur le prix de base du pack le moins cher.",
    "Factures émises par Alliance Consultants, TVA 18 % ajoutée.",
    "Dépassement de capacité : facturé, pas bloqué.",
    "Paiement annuel d'avance : 12 mois pour le prix de 11.",
  ],
  en: [
    "Pack combination: 10% off the base price of the cheapest pack.",
    "Invoices issued by Alliance Consultants, 18% VAT added.",
    "Capacity overage: billed, not blocked.",
    "Annual payment in advance: 12 months for the price of 11.",
  ],
};

/* ------------------------------------------------------------------ calcul des prix */

const over = (n: number, limit: number) => Math.max(0, n - limit);

export function agencePrice(units: number) {
  return 29_900 + Math.min(over(units, 100), 200) * 150 + over(units, 300) * 75;
}
export function syndicPrice(copros: number, lots: number) {
  return 49_900 + over(copros, 2) * 10_000 + over(lots, 100) * 150;
}
export function promoteurPrice(sites: number, lots: number) {
  return 149_900 + over(sites, 2) * 40_000 + over(lots, 150) * 100;
}
export function integrePrice(sites: number, copros: number, lots: number) {
  return 249_900 + over(sites, 3) * 35_000 + over(copros, 3) * 10_000 + over(lots, 300) * 100;
}

/** Combinaison de packs : 10 % de remise sur le prix de base du moins cher (`bases`) */
export function comboPrice(prices: number[], bases: number[] = prices) {
  const total = prices.reduce((a, p) => a + p, 0);
  const discount = prices.length >= 2 ? Math.min(...bases) * COMBO_DISCOUNT : 0;
  return { total: total - discount, discount };
}
