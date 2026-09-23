// Tout le texte du site est centralisé ici pour pouvoir être modifié sans toucher aux composants.

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
    eyebrow: "Encaissements automatisés",
    title: "Laissez les loyers venir à vous.",
    description:
      "Finies les saisies manuelles. ImmoTopia intègre le Mobile Money (Wave, CinetPay) et rapproche chaque versement au bon dossier en temps réel.",
    cta: "Découvrir le rapprochement",
    href: "#ecosysteme",
    image: "/images/hero/paiements.jpg",
    imageAlt: "Jeune femme souriante réglant son loyer sur smartphone, sur un balcon d'Abidjan",
    accent: "#2EE6A8",
  },
  {
    id: "owners",
    eyebrow: "Gestion des mandants",
    title: "Une transparence qui fidélise vos propriétaires.",
    description:
      "Générez vos relevés de gérance sans ouvrir Excel. L'ERP calcule automatiquement vos commissions et prépare le net à reverser.",
    cta: "Voir l'espace propriétaire",
    href: "#roles-directeur",
    image: "/images/hero/proprietaires.jpg",
    imageAlt: "Directeur d'agence serrant la main d'un propriétaire dans une agence moderne",
    accent: "#8B8BFF",
  },
  {
    id: "accounting",
    eyebrow: "Contrôle financier & OHADA",
    title: "Sécurisez votre trésorerie, certifiez vos comptes.",
    description:
      "Maîtrisez vos flux grâce aux clôtures de caisse physiques. Séparez les fonds de tiers pour une comptabilité conforme.",
    cta: "Explorer la comptabilité",
    href: "#roles-comptable",
    image: "/images/hero/comptabilite.jpg",
    imageAlt: "Comptable travaillant devant un double écran de tableaux de bord",
    accent: "#38BDF8",
  },
  {
    id: "ecosystem",
    eyebrow: "L'ERP tout-en-un",
    title: "Toute votre agence sur un seul écran.",
    description:
      "Centralisez l'intégralité de votre activité sur une plateforme rapide, fluide et accessible de n'importe où.",
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
      "Centralisez vos prospects et organisez vos visites. Ne ratez aucune affaire grâce au pipeline commercial visuel.",
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
      "Automatisez la répartition des charges, suivez les tickets d'intervention et gérez votre comptabilité en partie double.",
    cta: "Découvrir le module Syndic",
    href: "#tarifs",
    image: "/images/hero/syndic.jpg",
    imageAlt: "Gestionnaire de copropriété échangeant avec des résidents devant leur immeuble",
    imageClass: "object-bottom",
    accent: "#FACC15",
  },
  {
    id: "commissions",
    eyebrow: "Répartition des commissions",
    title: "Une rémunération transparente pour des équipes motivées.",
    description:
      "Paramétrez vos règles de partage entre l'agence et vos apporteurs d'affaires, et laissez l'ERP calculer les primes en temps réel.",
    cta: "Voir le calcul des commissions",
    href: "#roles-directeur",
    image: "/images/hero/commissions.jpg",
    imageAlt: "Équipe commerciale célébrant la signature d'un contrat",
    imageClass: "object-bottom",
    accent: "#A78BFA",
  },
];

export const partners = [
  { name: "Wave", color: "#1DC8FF" },
  { name: "CinetPay", color: "#20C997" },
  { name: "Orange Money", color: "#FF7900" },
  { name: "MTN MoMo", color: "#FFCB05" },
  { name: "Conforme SYSCOHADA", color: "#5B5BF7", badge: true },
  { name: "WhatsApp Business", color: "#25D366" },
  { name: "Droit OHADA", color: "#2EE6A8", badge: true },
  { name: "API & Webhooks", color: "#A78BFA", badge: true },
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
      "Tableaux de bord en temps réel, validation des clôtures de caisse depuis votre téléphone et calcul automatique des commissions pour motiver vos équipes.",
    features: [
      { title: "Validation à distance", text: "Approuvez clôtures et décaissements en un geste." },
      { title: "Commissions automatiques", text: "Règles agence / agents / apporteurs paramétrables." },
      { title: "Relevés propriétaires", text: "Net à reverser calculé et prêt à envoyer." },
    ],
  },
  {
    id: "comptable",
    label: "Comptable",
    headline: "Des comptes justes, sans ressaisie.",
    pitch:
      "Chaque encaissement génère ses écritures. Les fonds de tiers restent strictement séparés et vos exports sont conformes SYSCOHADA.",
    features: [
      { title: "Écritures automatiques", text: "Journal alimenté à chaque paiement Mobile Money." },
      { title: "Fonds de tiers séparés", text: "Comptes mandants isolés de la trésorerie agence." },
      { title: "Exports OHADA", text: "Balance, grand livre et journaux en un clic." },
    ],
  },
  {
    id: "agent",
    label: "Agent commercial",
    headline: "Toute l'agence dans votre poche.",
    pitch:
      "Pipeline CRM, agenda des visites, baux signés numériquement et relances WhatsApp automatiques : l'outil pensé pour le terrain.",
    features: [
      { title: "Baux numériques", text: "Rédaction, signature et archivage sans papier." },
      { title: "Relances WhatsApp", text: "Rappels de loyer envoyés automatiquement." },
      { title: "Visites organisées", text: "Agenda partagé et fiche prospect sur mobile." },
    ],
  },
];

// Les tarifs sont dans src/lib/pricing.ts

export const navLinks = [
  { label: "Fonctionnalités", href: "#top" },
  { label: "Rôles", href: "#roles" },
  { label: "Écosystème", href: "#ecosysteme" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Outils gratuits", href: "/outils" },
];
