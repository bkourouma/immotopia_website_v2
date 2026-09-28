// Tout le texte du site est centralisé ici pour pouvoir être modifié sans toucher aux composants.
// Règle éditoriale (23/09/2026) : le site peut présenter les fonctions en production ET celles en cours
// de développement. Ne jamais annoncer de date de livraison ; une fonction qui n'existe nulle part
// (ni en production ni en développement) ne s'annonce pas.

import { comparatifHref, domains } from "./comparatif-domains";
import type { Locale } from "./i18n";

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

type Bi = { fr: string; en: string };

// Partie commune (images, couleurs, ancres) + textes bilingues
type HeroCardSource = Omit<HeroCard, "eyebrow" | "title" | "description" | "cta" | "imageAlt"> & {
  eyebrow: Bi;
  title: Bi;
  description: Bi;
  cta: Bi;
  imageAlt: Bi;
};

const heroCardsSource: HeroCardSource[] = [
  {
    id: "payments",
    eyebrow: { fr: "Loyers et encaissements", en: "Rent & collections" },
    title: { fr: "Chaque loyer suivi, du rappel à la quittance.", en: "Every rent tracked, from reminder to receipt." },
    description: {
      fr: "Échéances générées depuis le bail, paiements enregistrés par moyen de règlement (espèces, virement, Wave, Orange Money, MTN, Moov) et déclarations des locataires validées en un clic.",
      en: "Due dates generated from the lease, payments recorded by method (cash, bank transfer, Wave, Orange Money, MTN, Moov) and tenant payment notices approved in one click.",
    },
    cta: { fr: "Voir le suivi des loyers", en: "See rent tracking" },
    href: "#roles-comptable",
    image: "/images/hero/paiements.jpg",
    imageAlt: {
      fr: "Jeune femme souriante réglant son loyer sur smartphone, sur un balcon d'Abidjan",
      en: "Smiling young woman paying her rent on her smartphone, on a balcony in Abidjan",
    },
    accent: "#2EE6A8",
  },
  {
    id: "owners",
    eyebrow: { fr: "Relation propriétaires", en: "Landlord relations" },
    title: { fr: "Donnez aux propriétaires une vue claire sur leurs loyers.", en: "Give landlords a clear view of their rents." },
    description: {
      fr: "Relevés de gérance par période et portail propriétaire : loyers encaissés, revenus, dépôts de garantie et tickets en cours, consultables à tout moment.",
      en: "Periodic management statements and a landlord portal: rent collected, income, security deposits and open tickets, available at any time.",
    },
    cta: { fr: "Voir l'espace propriétaire", en: "See the landlord portal" },
    href: "#roles-directeur",
    image: "/images/hero/proprietaires.jpg",
    imageAlt: {
      fr: "Directeur d'agence serrant la main d'un propriétaire dans une agence moderne",
      en: "Agency director shaking hands with a landlord in a modern office",
    },
    accent: "#8B8BFF",
  },
  {
    id: "accounting",
    eyebrow: { fr: "Pilotage", en: "Oversight" },
    title: { fr: "Toute votre activité, d'un coup d'œil.", en: "Your whole business, at a glance." },
    description: {
      fr: "Impayés, encaissements du mois face à l'objectif, taux d'occupation et file « À traiter aujourd'hui » : chaque rôle voit l'essentiel dès la connexion.",
      en: "Arrears, monthly collections against target, occupancy rate and a “To do today” queue: every role sees what matters the moment they log in.",
    },
    cta: { fr: "Découvrir le tableau de bord", en: "Explore the dashboard" },
    href: "#roles-directeur",
    image: "/images/hero/comptabilite.jpg",
    imageAlt: {
      fr: "Collaboratrice analysant les tableaux de bord de l'agence sur deux écrans",
      en: "Team member reviewing the agency dashboards on two screens",
    },
    accent: "#38BDF8",
  },
  {
    id: "ecosystem",
    eyebrow: { fr: "L'ERP tout-en-un", en: "The all-in-one ERP" },
    title: { fr: "Retrouvez vos biens, baux et encaissements au même endroit.", en: "Find your properties, leases and collections in one place." },
    description: {
      fr: "Biens, baux, encaissements, CRM, syndic, maintenance et communication sur une plateforme rapide, accessible depuis un navigateur, sur ordinateur comme sur mobile.",
      en: "Properties, leases, collections, CRM, condominium management, maintenance and communication on one fast platform, right in your browser, on desktop or mobile.",
    },
    cta: { fr: "Découvrir la suite complète", en: "Explore the full suite" },
    href: "#ecosysteme",
    image: "/images/hero/tout-en-un.jpg",
    imageAlt: {
      fr: "Femme d'affaires souriante consultant l'application sur tablette à son bureau",
      en: "Smiling businesswoman using the app on a tablet at her desk",
    },
    accent: "#FF8A3D",
  },
  {
    id: "crm",
    eyebrow: { fr: "CRM & relation client", en: "CRM & client relations" },
    title: { fr: "Suivez les demandes, les visites et les relances.", en: "Follow enquiries, viewings and follow-ups." },
    description: {
      fr: "Centralisez vos prospects et organisez vos visites. Ne ratez aucune affaire grâce au pipeline commercial visuel et au rapprochement entre besoins et biens disponibles.",
      en: "Keep all your leads in one place and organize your viewings. Never miss a deal with a visual sales pipeline and matching between client needs and available properties.",
    },
    cta: { fr: "Explorer le CRM", en: "Explore the CRM" },
    href: "#roles-agent",
    image: "/images/hero/crm.jpg",
    imageAlt: {
      fr: "Agente immobilière présentant un bien sur tablette à un couple d'acheteurs",
      en: "Real estate agent showing a property on a tablet to a couple of buyers",
    },
    imageClass: "object-bottom",
    accent: "#F472B6",
  },
  {
    id: "syndic",
    eyebrow: { fr: "Gestion de syndic", en: "condominium management" },
    title: { fr: "La copropriété gérée d'une main de maître.", en: "Condominium, masterfully managed." },
    description: {
      fr: "Budgets et appels de charges par lot selon les tantièmes, relances des impayés, assemblées générales avec votes et quorum, comptabilité de copropriété.",
      en: "Budgets and service charge calls per unit based on ownership shares, arrears follow-ups, general meetings with voting and quorum, and condominium accounting.",
    },
    cta: { fr: "Découvrir le module Syndic", en: "Explore the Condo module" },
    href: "#tarifs",
    image: "/images/hero/syndic.jpg",
    imageAlt: {
      fr: "Gestionnaire de copropriété échangeant avec des résidents devant leur immeuble",
      en: "Property manager talking with residents in front of their building",
    },
    imageClass: "object-bottom",
    accent: "#FACC15",
  },
  {
    id: "commissions",
    eyebrow: { fr: "E-mail & WhatsApp", en: "Email & WhatsApp" },
    title: { fr: "Des rappels qui partent tout seuls.", en: "Reminders that send themselves." },
    description: {
      fr: "Rappels d'échéance, confirmations de paiement, baux arrivant à terme : locataires et propriétaires sont prévenus par e-mail ou WhatsApp, selon leurs préférences.",
      en: "Due-date reminders, payment confirmations, leases nearing expiry: tenants and landlords are notified by email or WhatsApp, according to their preferences.",
    },
    cta: { fr: "Voir les rappels automatiques", en: "See automated reminders" },
    href: "#ecosysteme",
    image: "/images/hero/commissions.jpg",
    imageAlt: {
      fr: "Équipe d'agence souriante, libérée des relances manuelles",
      en: "Smiling agency team, freed from manual follow-ups",
    },
    imageClass: "object-bottom",
    accent: "#A78BFA",
  },
];

const heroCardsFor = (locale: Locale): HeroCard[] =>
  heroCardsSource.map((c) => ({
    ...c,
    eyebrow: c.eyebrow[locale],
    title: c.title[locale],
    description: c.description[locale],
    cta: c.cta[locale],
    imageAlt: c.imageAlt[locale],
  }));

export const heroCards: Record<Locale, HeroCard[]> = { fr: heroCardsFor("fr"), en: heroCardsFor("en") };

export type Partner = { name: string; color: string; badge?: boolean };

// Bandeau : moyens de paiement suivis dans l'application et canaux réellement intégrés
const paymentPartners: Partner[] = [
  { name: "Wave", color: "#1DC8FF" },
  { name: "Orange Money", color: "#FF7900" },
  { name: "MTN MoMo", color: "#FFCB05" },
  { name: "Moov Money", color: "#0066B3" },
  { name: "WhatsApp", color: "#25D366" },
];

export const partners: Record<Locale, Partner[]> = {
  fr: [
    ...paymentPartners,
    { name: "Portails propriétaire & locataire", color: "#5B5BF7", badge: true },
    { name: "Newsletter & e-mail", color: "#FF8A3D", badge: true },
    { name: "Rôles & journal d'audit", color: "#2EE6A8", badge: true },
  ],
  en: [
    ...paymentPartners,
    { name: "Landlord & tenant portals", color: "#5B5BF7", badge: true },
    { name: "Newsletter & email", color: "#FF8A3D", badge: true },
    { name: "Roles & audit log", color: "#2EE6A8", badge: true },
  ],
};

export type RoleId = "directeur" | "comptable" | "agent";

export type Role = {
  id: RoleId;
  label: string;
  headline: string;
  pitch: string;
  features: { title: string; text: string }[];
};

export const roles: Record<Locale, Role[]> = {
  fr: [
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
  ],
  en: [
    {
      id: "directeur",
      label: "Agency director",
      headline: "Drive growth, even from afar.",
      pitch:
        "A dashboard that cuts straight to what matters: arrears, monthly collections against target, occupancy rate and today's work queue. Role-based permissions and an audit log keep you in control.",
      features: [
        { title: "Dashboard", text: "Arrears, monthly collections and occupancy on one screen." },
        { title: "Roles & permissions", text: "Everyone sees only what concerns them." },
        { title: "Audit log", text: "Who did what, when, and to which record." },
      ],
    },
    {
      id: "comptable",
      label: "Accountant",
      headline: "Rent tracked, no double entry.",
      pitch:
        "Due dates are generated from leases, each payment is allocated to its installments, late fees calculate themselves and every security deposit is tracked. For condominium management, full condominium accounting.",
      features: [
        { title: "Due dates & payments", text: "Status, outstanding balance and history per tenant." },
        { title: "Automatic late fees", text: "Fixed amount or percentage, with a grace period." },
        { title: "Condominium accounting", text: "Journals, general ledger and condominium trial balance." },
      ],
    },
    {
      id: "agent",
      label: "Sales agent",
      headline: "Your whole agency in your pocket.",
      pitch:
        "CRM pipeline, viewing calendar, contracts generated from your templates and automatic reminders by email or WhatsApp: a tool built for the field, ready on mobile.",
      features: [
        { title: "Generated contracts", text: "Leases, amendments and receipts from your Word templates." },
        { title: "WhatsApp reminders", text: "Tenants automatically reminded of due dates." },
        { title: "Organized viewings", text: "Shared calendar and lead profiles on mobile." },
      ],
    },
  ],
};

// Les tarifs sont dans src/lib/pricing.ts

export type NavChild = { label: string; href: string; text: string };
export type NavLink = {
  label: string;
  /** Adresse du libellé lui-même (clic sur « Produit », « Comparatif »…) */
  href: string;
  /** Sous-menu : ouvert au survol sur ordinateur, en accordéon sur mobile */
  children?: NavChild[];
  /** Lien mis en avant en bas du sous-menu */
  footer?: { label: string; href: string };
  /** Sous-menu sur deux colonnes (listes longues) */
  wide?: boolean;
};

// Adresses sans préfixe de langue : SmartLink les localise.
// Le wiki et la FAQ n'existent qu'en français : absents du menu anglais.
export const navLinks: Record<Locale, NavLink[]> = {
  fr: [
    {
      label: "Produit",
      href: "#top",
      children: [
        { label: "Fonctionnalités", href: "#top", text: "Les grands volets d'ImmoTopia en un coup d'œil" },
        { label: "Rôles", href: "#roles", text: "Une interface pour chaque métier de l'agence" },
        { label: "Écosystème", href: "#ecosysteme", text: "Contacts, biens, baux et finances reliés" },
        { label: "Wiki des fonctionnalités", href: "/wiki", text: "Chaque action détaillée, pack par pack" },
      ],
    },
    {
      label: "Comparatif",
      href: comparatifHref(),
      wide: true,
      children: domains.map((d) => ({ label: d.label.fr, href: comparatifHref(d.id), text: d.pitch.fr })),
      footer: { label: "Voir tout le comparatif, avec les sources", href: comparatifHref() },
    },
    {
      label: "Ressources",
      href: "/wiki",
      children: [
        { label: "Wiki des fonctionnalités", href: "/wiki", text: "Tout ce que fait ImmoTopia, action par action" },
        { label: "Outils gratuits", href: "/outils", text: "Quittance, bail, rendement locatif, commission…" },
        { label: "FAQ", href: "/faq", text: "Les réponses aux questions fréquentes" },
        { label: "Contact", href: "/contact", text: "Parler à l'équipe, réserver une démonstration" },
      ],
    },
    { label: "Tarifs", href: "/tarifs" },
  ],
  en: [
    {
      label: "Product",
      href: "#top",
      children: [
        { label: "Features", href: "#top", text: "ImmoTopia's main modules at a glance" },
        { label: "Roles", href: "#roles", text: "An interface for every job in the agency" },
        { label: "Ecosystem", href: "#ecosysteme", text: "Contacts, properties, leases and finance, connected" },
      ],
    },
    {
      label: "Comparison",
      href: comparatifHref(),
      wide: true,
      children: domains.map((d) => ({ label: d.label.en, href: comparatifHref(d.id), text: d.pitch.en })),
      footer: { label: "See the full comparison, with sources", href: comparatifHref() },
    },
    {
      label: "Resources",
      href: "/outils",
      children: [
        { label: "Free tools", href: "/outils", text: "Rent receipt, lease, rental yield, commission…" },
        { label: "Contact", href: "/contact", text: "Talk to the team, book a demo" },
      ],
    },
    { label: "Pricing", href: "/tarifs" },
  ],
};

/** Colonne « Produit » du pied de page : le menu à plat, sans doublon ni Contact (colonne « Entreprise »). */
export const footerProductLinks = (locale: Locale): { label: string; href: string }[] => {
  const seen = new Set<string>(["/contact"]);
  return navLinks[locale]
    .flatMap((l): { label: string; href: string }[] =>
      l.footer ? [{ label: l.label, href: l.href }] : (l.children ?? [l]).map(({ label, href }) => ({ label, href })),
    )
    .filter((l) => !seen.has(l.href) && seen.add(l.href));
};
