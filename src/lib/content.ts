// Tout le texte du site est centralisé ici pour pouvoir être modifié sans toucher aux composants.
// Règle éditoriale (23/09/2026) : le site peut présenter les fonctions en production ET celles en cours
// de développement. Ne jamais annoncer de date de livraison ; une fonction qui n'existe nulle part
// (ni en production ni en développement) ne s'annonce pas.

import { comparatifHref, domains } from "./comparatif-domains";

export type MockupKind =
  | "payments"
  | "owners"
  | "accounting"
  | "ecosystem"
  | "crm"
  | "syndic"
  | "commissions";

export type HeroCard = {
  id: MockupKind;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Cadrage de la photo : les groupes sont calés en bas pour que le titre ne couvre pas les visages */
  imageClass?: string;
  accent: string; // couleur d'accent de la carte (halo, sur-titre)
};

export const heroCards: HeroCard[] = [
  {
    id: "payments",
    eyebrow: "Loyers et encaissements",
    title: "Chaque loyer suivi, du rappel à la quittance.",
    description:
      "Échéances générées depuis le bail, paiements enregistrés par moyen de règlement (espèces, virement, Wave, Orange Money, MTN, Moov) et déclarations des locataires validées en un clic.",
    cta: "Découvrir la gestion locative",
    href: "#roles-comptable",
    image: "/images/hero/paiements.jpg",
    imageAlt: "Jeune femme souriante réglant son loyer sur smartphone, sur un balcon d'Abidjan",
    accent: "#2EE6A8",
  },
  {
    id: "owners",
    eyebrow: "Relation propriétaires",
    title: "Une transparence qui fidélise vos propriétaires.",
    description:
      "Relevés de gérance par période et portail propriétaire : loyers encaissés, revenus, dépôts de garantie et tickets en cours, consultables à tout moment.",
    cta: "Voir l'espace propriétaire",
    href: "#roles-directeur",
    image: "/images/hero/proprietaires.jpg",
    imageAlt: "Directeur d'agence serrant la main d'un propriétaire dans une agence moderne",
    accent: "#8B8BFF",
  },
  {
    id: "accounting",
    eyebrow: "Pilotage",
    title: "Toute votre activité, d'un coup d'œil.",
    description:
      "Impayés, encaissements du mois face à l'objectif, taux d'occupation et file « À traiter aujourd'hui » : chaque rôle voit l'essentiel dès la connexion.",
    cta: "Découvrir le tableau de bord",
    href: "#roles-directeur",
    image: "/images/hero/comptabilite.jpg",
    imageAlt: "Collaboratrice analysant les tableaux de bord de l'agence sur deux écrans",
    accent: "#38BDF8",
  },
  {
    id: "ecosystem",
    eyebrow: "L'ERP tout-en-un",
    title: "Toute votre agence sur un seul écran.",
    description:
      "Biens, baux, encaissements, CRM, syndic, maintenance et communication sur une plateforme rapide, accessible depuis un navigateur, sur ordinateur comme sur mobile.",
    cta: "Découvrir la suite complète",
    href: "#ecosysteme",
    image: "/images/hero/tout-en-un.jpg",
    imageAlt: "Femme d'affaires souriante consultant l'application sur tablette à son bureau",
    accent: "#FF8A3D",
  },
  {
    id: "crm",
    eyebrow: "CRM & relation client",
    title: "Convertissez chaque contact en opportunité.",
    description:
      "Centralisez vos prospects et organisez vos visites. Ne ratez aucune affaire grâce au pipeline commercial visuel et au rapprochement entre besoins et biens disponibles.",
    cta: "Explorer le CRM",
    href: "#roles-agent",
    image: "/images/hero/crm.jpg",
    imageAlt: "Agente immobilière présentant un bien sur tablette à un couple d'acheteurs",
    imageClass: "object-bottom",
    accent: "#F472B6",
  },
  {
    id: "syndic",
    eyebrow: "Gestion de syndic",
    title: "La copropriété gérée d'une main de maître.",
    description:
      "Budgets et appels de charges par lot selon les tantièmes, relances des impayés, assemblées générales avec votes et quorum, comptabilité de copropriété.",
    cta: "Découvrir le module Syndic",
    href: "#tarifs",
    image: "/images/hero/syndic.jpg",
    imageAlt: "Gestionnaire de copropriété échangeant avec des résidents devant leur immeuble",
    imageClass: "object-bottom",
    accent: "#FACC15",
  },
  {
    id: "commissions",
    eyebrow: "E-mail & WhatsApp",
    title: "Des rappels qui partent tout seuls.",
    description:
      "Rappels d'échéance, confirmations de paiement, baux arrivant à terme : locataires et propriétaires sont prévenus par e-mail ou WhatsApp, selon leurs préférences.",
    cta: "Voir les rappels automatiques",
    href: "#ecosysteme",
    image: "/images/hero/commissions.jpg",
    imageAlt: "Équipe d'agence souriante, libérée des relances manuelles",
    imageClass: "object-bottom",
    accent: "#A78BFA",
  },
];

// Bandeau : moyens de paiement suivis dans l'application et canaux réellement intégrés
export const partners = [
  { name: "Wave", color: "#1DC8FF" },
  { name: "Orange Money", color: "#FF7900" },
  { name: "MTN MoMo", color: "#FFCB05" },
  { name: "Moov Money", color: "#0066B3" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "Portails propriétaire & locataire", color: "#5B5BF7", badge: true },
  { name: "Newsletter & e-mail", color: "#FF8A3D", badge: true },
  { name: "Rôles & journal d'audit", color: "#2EE6A8", badge: true },
];

export type RoleId = "directeur" | "comptable" | "agent";

export const roles: {
  id: RoleId;
  label: string;
  headline: string;
  pitch: string;
  features: { title: string; text: string }[];
}[] = [
  {
    id: "directeur",
    label: "Directeur d'agence",
    headline: "Pilotez la croissance, même à distance.",
    pitch:
      "Un tableau de bord qui va à l'essentiel : impayés, encaissements du mois face à l'objectif, taux d'occupation et file de travail du jour. Des droits par rôle et un journal d'audit pour garder le contrôle.",
    features: [
      { title: "Tableau de bord", text: "Impayés, encaissé du mois, occupation, en un écran." },
      { title: "Rôles et permissions", text: "Chacun voit uniquement ce qui le concerne." },
      { title: "Journal d'audit", text: "Qui a fait quoi, quand, sur quelle donnée." },
    ],
  },
  {
    id: "comptable",
    label: "Comptable",
    headline: "Des loyers suivis sans ressaisie.",
    pitch:
      "Les échéances sont générées depuis les baux, chaque paiement est affecté à ses échéances, les pénalités de retard se calculent seules et chaque dépôt de garantie est tracé. Côté syndic, une comptabilité de copropriété complète.",
    features: [
      { title: "Échéances et paiements", text: "Statut, reste à encaisser, historique par locataire." },
      { title: "Pénalités automatiques", text: "Montant fixe ou pourcentage, avec délai de grâce." },
      { title: "Comptabilité syndic", text: "Journaux, grand livre et balance de copropriété." },
    ],
  },
  {
    id: "agent",
    label: "Agent commercial",
    headline: "Toute l'agence dans votre poche.",
    pitch:
      "Pipeline CRM, agenda des visites, contrats générés depuis vos modèles et rappels automatiques par e-mail ou WhatsApp : l'outil pensé pour le terrain, utilisable sur mobile.",
    features: [
      { title: "Contrats générés", text: "Baux, avenants et quittances depuis vos modèles Word." },
      { title: "Rappels WhatsApp", text: "Échéances rappelées automatiquement aux locataires." },
      { title: "Visites organisées", text: "Agenda partagé et fiche prospect sur mobile." },
    ],
  },
];

// Les tarifs sont dans src/lib/pricing.ts

export type NavLink = { label: string; href: string; children?: { label: string; href: string; text: string }[] };

export const navLinks: NavLink[] = [
  { label: "Fonctionnalités", href: "#top" },
  { label: "Rôles", href: "#roles" },
  { label: "Écosystème", href: "#ecosysteme" },
  {
    label: "Comparatif",
    href: comparatifHref(),
    children: domains.map((d) => ({ label: d.label, href: comparatifHref(d.id), text: d.pitch })),
  },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Outils gratuits", href: "/outils" },
];
