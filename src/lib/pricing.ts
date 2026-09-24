// Grille tarifaire (source : PROPOSITION_MODELE_ECONOMIQUE_2026.md, 23/09/2026).
// Tous les montants sont en FCFA, hors taxes. Modifier ici met à jour les cartes, le tableau et le simulateur.
// Le français fait foi (repris tel quel par l'assistant) ; l'anglais est une surcouche des textes affichés.

import type { Locale } from "./i18n";

export type PackId = "agence" | "syndic" | "promoteur" | "integre";

export type Pack = {
  id: PackId;
  name: string;
  audience: string;
  monthly: number;
  included: string;
  extension: string;
  setup: number; // mise en route accompagnée (facultative)
  highlights: string[];
  featured?: boolean;
  /** false = pack masqué sur le site et pour l'assistant */
  available: boolean;
};

export const ANNUAL_MONTHS = 11; // l'annuel payé d'avance = 11 mensualités (12 mois pour 11)
export const FREE_TRIAL_MONTHS = 1; // premier mois offert sur tous les packs, sans engagement
export const TRIAL_TEXT = "Premier mois offert, sans engagement";
export const trialText: Record<Locale, string> = { fr: TRIAL_TEXT, en: "First month free, no commitment" };
export const COMBO_DISCOUNT = 0.1; // 10 % sur le moins cher des packs combinés

export const packs: Pack[] = [
  {
    id: "agence",
    name: "Agence",
    audience: "Transaction et gestion locative",
    monthly: 29_900,
    included: "100 logements sous mandat de gestion",
    extension: "+150 FCFA/logement du 101e au 300e, puis +75 FCFA",
    setup: 100_000,
    available: true,
    highlights: [
      "CRM, mandats, annonces et visites",
      "Baux, échéances, paiements et dépôts de garantie",
      "Pénalités de retard calculées automatiquement",
      "Portails propriétaire et locataire",
      "Quittances et contrats générés depuis vos modèles",
      "Rappels e-mail et WhatsApp, maintenance, patrimoine",
    ],
  },
  {
    id: "syndic",
    name: "Syndic",
    audience: "Cabinets de copropriété",
    monthly: 49_900,
    included: "2 copropriétés actives et 100 lots principaux",
    extension: "+10 000 FCFA/copropriété ; +150 FCFA/lot au-delà de 100",
    setup: 150_000,
    available: true,
    highlights: [
      "Copropriétés, lots et tantièmes",
      "Budgets et appels de charges par lot",
      "Recouvrement, relances et pénalités de retard",
      "Assemblées générales : votes, pouvoirs et quorum",
      "Comptabilité de copropriété : journaux, grand livre, balance",
      "Maintenance, incidents et prestataires",
    ],
  },
  {
    id: "promoteur",
    name: "Promoteur",
    audience: "Promoteurs qui construisent et commercialisent",
    monthly: 149_900,
    included: "2 chantiers actifs et 150 lots de programme",
    extension: "+40 000 FCFA/chantier ; +100 FCFA/lot au-delà de 150",
    setup: 450_000,
    available: true,
    highlights: [
      "Chantiers : budgets, coûts, achats et avancement",
      "Matériaux, stock, personnel et tâcherons",
      "CRM et suivi commercial des lots",
      "Caisse, fournisseurs et validations",
      "Patrimoine, emprunts et travaux",
      "Communication et relances",
    ],
  },
  {
    id: "integre",
    name: "Opérateur intégré",
    audience: "Groupes qui construisent, vendent, louent et gèrent",
    monthly: 249_900,
    included: "3 chantiers, 3 copropriétés et 300 lots distincts",
    extension: "+35 000 FCFA/chantier ; +10 000 FCFA/copropriété ; +100 FCFA/lot",
    setup: 650_000,
    featured: true,
    available: true,
    highlights: [
      "Tous les modules : Agence, Syndic et Promoteur",
      "Un même lot compté une seule fois, du chantier à la gestion",
      "Toutes les fonctions transversales incluses",
      "Aucun supplément finance, CRM ou patrimoine",
      "Formations par rôle à la mise en route",
    ],
  },
];

/** Packs actuellement commercialisés (affichés sur le site et connus de l'assistant) */
export const activePacks = packs.filter((p) => p.available);

/** Textes anglais des packs (prix, capacités et disponibilité restent ceux de la version française) */
const packsEnText: Record<PackId, Pick<Pack, "name" | "audience" | "included" | "extension" | "highlights">> = {
  agence: {
    name: "Agency",
    audience: "Sales and property management",
    included: "100 units under management",
    extension: "+150 FCFA/unit from the 101st to the 300th, then +75 FCFA",
    highlights: [
      "CRM, mandates, listings and viewings",
      "Leases, due dates, payments and security deposits",
      "Late fees calculated automatically",
      "Owner and tenant portals",
      "Receipts and contracts generated from your templates",
      "Email and WhatsApp reminders, maintenance, portfolio",
    ],
  },
  syndic: {
    name: "Condo Management",
    audience: "Condominium management firms",
    included: "2 active condominiums and 100 main lots",
    extension: "+10,000 FCFA/condominium; +150 FCFA/lot beyond 100",
    highlights: [
      "Condominiums, lots and ownership shares",
      "Budgets and service charge calls per lot",
      "Collections, reminders and late fees",
      "General meetings: votes, proxies and quorum",
      "Condominium accounting: journals, general ledger, trial balance",
      "Maintenance, incidents and contractors",
    ],
  },
  promoteur: {
    name: "Developer",
    audience: "Developers who build and sell",
    included: "2 active sites and 150 project lots",
    extension: "+40,000 FCFA/site; +100 FCFA/lot beyond 150",
    highlights: [
      "Sites: budgets, costs, purchasing and progress",
      "Materials, stock, staff and subcontractors",
      "CRM and sales tracking for lots",
      "Cash desk, suppliers and approvals",
      "Portfolio, loans and works",
      "Communication and reminders",
    ],
  },
  integre: {
    name: "Integrated Operator",
    audience: "Groups that build, sell, rent and manage",
    included: "3 sites, 3 condominiums and 300 distinct lots",
    extension: "+35,000 FCFA/site; +10,000 FCFA/condominium; +100 FCFA/lot",
    highlights: [
      "Every module: Agency, Condo Management and Developer",
      "Each lot counted once, from construction to management",
      "All cross-cutting features included",
      "No extra charge for finance, CRM or portfolio",
      "Role-based training during onboarding",
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
 * Couverture fonctionnelle : [domaine, agence, syndic, promoteur, intégré].
 * « live: false » = domaine pas encore en production, jamais affiché.
 */
const coverageAll: { label: string; en: string; cells: [boolean, boolean, boolean, boolean]; live: boolean }[] = [
  { label: "Socle : biens, contacts, documents, rôles, audit, tableaux de bord", en: "Core: properties, contacts, documents, roles, audit trail, dashboards", cells: [true, true, true, true], live: true },
  { label: "CRM, mandats, annonces, visites et suivi commercial", en: "CRM, mandates, listings, viewings and sales follow-up", cells: [true, false, true, true], live: true },
  { label: "Baux, échéances, paiements, pénalités, dépôts de garantie", en: "Leases, due dates, payments, late fees, security deposits", cells: [true, false, false, true], live: true },
  { label: "Portails propriétaire et locataire", en: "Owner and tenant portals", cells: [true, false, false, true], live: true },
  { label: "Maintenance et interventions", en: "Maintenance and work orders", cells: [true, true, true, true], live: true },
  { label: "Syndic : copropriétés, tantièmes, charges, impayés, AG", en: "Condominiums: ownership shares, service charges, arrears, general meetings", cells: [false, true, false, true], live: true },
  { label: "Comptabilité de copropriété et budgets", en: "Condominium accounting and budgets", cells: [false, true, false, true], live: true },
  { label: "Chantiers : budgets, coûts, achats, avancement, lots, clôture", en: "Construction sites: budgets, costs, purchasing, progress, lots, close-out", cells: [false, false, true, true], live: true },
  { label: "BTP : matériaux et stock, personnel, tâcherons, terrain", en: "Construction: materials and stock, staff, subcontractors, field work", cells: [false, false, true, true], live: true },
  { label: "Finance opérationnelle : fournisseurs, caisse, validations", en: "Operational finance: suppliers, cash desk, approvals", cells: [true, true, true, true], live: true },
  { label: "Patrimoine : valorisation, rendement, emprunts, travaux", en: "Portfolio: valuation, yield, loans, works", cells: [true, false, true, true], live: true },
  { label: "Communication : e-mail, modèles, rappels, WhatsApp, newsletter", en: "Communication: email, templates, reminders, WhatsApp, newsletter", cells: [true, true, true, true], live: true },
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

/** Combinaison de packs : 10 % de remise sur le moins cher des abonnements */
export function comboPrice(prices: number[]) {
  const total = prices.reduce((a, p) => a + p, 0);
  const discount = prices.length >= 2 ? Math.min(...prices) * COMBO_DISCOUNT : 0;
  return { total: total - discount, discount };
}
