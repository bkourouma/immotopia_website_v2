// Grille tarifaire (source : PROPOSITION_MODELE_ECONOMIQUE_2026.md, 23/09/2026).
// Tous les montants sont en FCFA, hors taxes. Modifier ici met à jour les cartes, le tableau et le simulateur.

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
};

export const ANNUAL_MONTHS = 11; // l'annuel payé d'avance = 11 mensualités (1 mois offert)
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
    highlights: [
      "CRM, mandats, annonces et visites",
      "Baux, échéances, paiements, pénalités et dépôts",
      "Portails propriétaire et locataire",
      "Caisse, validations et finance opérationnelle",
      "Patrimoine : valorisation et rendement",
      "Relances e-mail et WhatsApp",
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
    highlights: [
      "Copropriétés, tantièmes et répartition des charges",
      "Appels de fonds, impayés et assemblées générales",
      "Comptabilité de copropriété et budgets",
      "Maintenance et tickets d'intervention",
      "Caisse, validations et finance opérationnelle",
      "Communication avec les copropriétaires",
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
    highlights: [
      "Tous les modules : Agence, Syndic et Promoteur",
      "Un même lot compté une seule fois, du chantier à la gestion",
      "Toutes les fonctions transversales incluses",
      "Aucun supplément finance, CRM ou patrimoine",
      "Formations par rôle à la mise en route",
    ],
  },
];

/** Tableau de couverture fonctionnelle : [domaine, agence, syndic, promoteur, intégré] */
export const coverage: [string, boolean, boolean, boolean, boolean][] = [
  ["Socle : biens, contacts, documents, rôles, audit, tableaux de bord", true, true, true, true],
  ["CRM, mandats, annonces, visites et suivi commercial", true, false, true, true],
  ["Baux, échéances, paiements, pénalités, dépôts", true, false, false, true],
  ["Portails propriétaire et locataire", true, false, false, true],
  ["Maintenance et interventions", true, true, true, true],
  ["Syndic : copropriétés, tantièmes, charges, impayés, AG", false, true, false, true],
  ["Comptabilité de copropriété et budgets", false, true, false, true],
  ["Chantiers : budgets, coûts, achats, avancement, lots, clôture", false, false, true, true],
  ["BTP : matériaux et stock, personnel, tâcherons, terrain", false, false, true, true],
  ["Finance opérationnelle : tiers, fournisseurs, caisse, validations", true, true, true, true],
  ["Patrimoine : valorisation, rendement, emprunts, travaux", true, false, true, true],
  ["Communication : e-mail, modèles, relances, WhatsApp", true, true, true, true],
];

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
