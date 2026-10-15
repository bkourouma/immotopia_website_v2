// Historique des versions de l'application ImmoTopia (page /versions).
// Source de vérité des notes de version : les tags vX.Y.Z du dépôt bkourouma/immotopia reprennent ces textes.
// La plus récente en tête. Règle éditoriale de content.ts : uniquement ce qui est livré, jamais de date à venir.

type Bilingual = { fr: string; en: string };

export type Release = {
  version: string;
  /** Date de publication, AAAA-MM-JJ */
  date: string;
  title: Bilingual;
  items: Bilingual[];
};

/** Mise à jour corrective (x.y.z avec z > 0) */
export const isPatch = (r: Release) => !r.version.endsWith(".0");

export const releases: Release[] = [
  {
    version: "1.13.0",
    date: "2026-10-15",
    title: { fr: "Assemblée générale en direct et modèles de documents", en: "Live general meetings and document templates" },
    items: [
      {
        fr: "Syndic : assemblée générale en direct, avec feuille de présence, quorum calculé en temps réel, vote en ligne par lien personnel et écran de projection",
        en: "Condominium: live general meetings, with attendance sheet, real-time quorum, online voting through personal links and a projection screen",
      },
      {
        fr: "Téléchargement au format Word de l'avis d'appel de charges, de la quittance et de la convocation d'AG",
        en: "Word download of service charge notices, receipts and general meeting notices",
      },
      {
        fr: "Modèles de documents standard avec en-tête, logo de l'agence et champs à compléter",
        en: "Standard document templates with header, agency logo and fill-in fields",
      },
    ],
  },
  {
    version: "1.12.1",
    date: "2026-10-13",
    title: { fr: "Fiabilité d'ImmoCopilot", en: "ImmoCopilot reliability" },
    items: [
      {
        fr: "ImmoCopilot vérifie un plan d'écriture avant de l'exécuter et nomme les champs en erreur",
        en: "ImmoCopilot checks a write plan before running it and names the fields in error",
      },
    ],
  },
  {
    version: "1.12.0",
    date: "2026-10-06",
    title: { fr: "Stock de chantier et menus par agence", en: "Site inventory and per-agency menus" },
    items: [
      {
        fr: "Contrôle du stock de chantier et gabarit de mobilier pour les états des lieux",
        en: "Construction site stock control and furniture template for inventory reports",
      },
      { fr: "Inventaire de chantier par WhatsApp, assisté par l'IA", en: "Site inventory over WhatsApp, assisted by AI" },
      { fr: "Menus personnalisables pour chaque agence", en: "Menus customisable for each agency" },
      { fr: "Réponses d'ImmoCopilot plus rapides", en: "Faster ImmoCopilot answers" },
    ],
  },
  {
    version: "1.11.0",
    date: "2026-10-04",
    title: { fr: "ImmoCopilot v2", en: "ImmoCopilot v2" },
    items: [
      { fr: "Assistant en pleine page, avec tableaux et documents produits dans la conversation", en: "Full-page assistant, with tables and documents produced in the conversation" },
      { fr: "Lecture de l'ensemble des données de l'agence, dans la limite des droits de l'utilisateur", en: "Reads all agency data, within the user's permissions" },
      { fr: "Écritures proposées par l'assistant, exécutées seulement après votre accord", en: "Changes proposed by the assistant, only applied once you approve them" },
    ],
  },
  {
    version: "1.10.0",
    date: "2026-10-02",
    title: { fr: "Patrimoine étendu et journal d'audit", en: "Extended portfolio management and audit log" },
    items: [
      { fr: "Patrimoine multi-actifs et valeur nette consolidée", en: "Multi-asset portfolio and consolidated net worth" },
      {
        fr: "Projections, simulations et ratios bancaires ; plan de trésorerie prévisionnel",
        en: "Projections, simulations and banking ratios; cash flow forecast",
      },
      {
        fr: "Assurances, sinistres et carnet d'entretien d'un bien ; suivi de la régularisation foncière",
        en: "Insurance, claims and maintenance log per property; land title regularisation tracking",
      },
      {
        fr: "Import en masse des biens, accès en lecture seule pour les tiers de confiance, lien de paiement Mobile Money d'un loyer",
        en: "Bulk property import, read-only access for trusted third parties, Mobile Money payment link for rent",
      },
      { fr: "Espace particulier avec palier gratuit", en: "Individual space with a free tier" },
      { fr: "Journal d'audit à deux niveaux : agence et plateforme", en: "Two-level audit log: agency and platform" },
    ],
  },
  {
    version: "1.9.0",
    date: "2026-10-01",
    title: { fr: "Exploitation et fiabilité", en: "Operations and reliability" },
    items: [
      { fr: "Envoi des e-mails de la plateforme", en: "Platform e-mail delivery" },
      { fr: "Sauvegardes copiées hors du serveur", en: "Backups copied off the server" },
      { fr: "Recette de bout en bout des six packs d'abonnement", en: "End-to-end acceptance testing of the six subscription packs" },
    ],
  },
  {
    version: "1.8.0",
    date: "2026-09-29",
    title: { fr: "Assistant IA ImmoCopilot", en: "ImmoCopilot AI assistant" },
    items: [
      { fr: "Première version d'ImmoCopilot, l'assistant IA intégré à l'application", en: "First release of ImmoCopilot, the AI assistant built into the app" },
      { fr: "Quittances, relevés et contrats de bail générés à partir des modèles Word", en: "Receipts, statements and leases generated from Word templates" },
    ],
  },
  {
    version: "1.7.1",
    date: "2026-09-29",
    title: { fr: "Correctifs Syndic", en: "Condominium fixes" },
    items: [
      {
        fr: "Corrections sur les assemblées générales, les incidents, les avis d'appel, la clôture de budget et les téléchargements",
        en: "Fixes to general meetings, incidents, charge notices, budget closing and downloads",
      },
    ],
  },
  {
    version: "1.7.0",
    date: "2026-09-28",
    title: { fr: "Pack Patrimoine", en: "Portfolio pack" },
    items: [
      { fr: "Pack Patrimoine Essentiel et Pro", en: "Portfolio pack, Essential and Pro" },
      { fr: "Entités détentrices et fiscalité", en: "Holding entities and taxation" },
      { fr: "Exports PDF et Excel, alertes d'échéance", en: "PDF and Excel exports, due date alerts" },
      { fr: "Vue patrimoine dans le portail propriétaire", en: "Portfolio view in the owner portal" },
      { fr: "Fonds de copropriété crédités par les paiements", en: "Condominium funds credited by payments" },
    ],
  },
  {
    version: "1.6.0",
    date: "2026-09-27",
    title: { fr: "Syndic complet", en: "Full condominium management" },
    items: [
      { fr: "Identité des documents par agence mandante", en: "Document branding per managing agency" },
      { fr: "Affectation des paiements, avances et suivi mensuel", en: "Payment allocation, advances and monthly follow-up" },
      { fr: "Reçus et quittances de charges, envoi et impression groupés", en: "Service charge receipts, sent and printed in bulk" },
      { fr: "Appels de charges automatiques et avis d'appel PDF", en: "Automatic service charge calls and PDF notices" },
      { fr: "Portail copropriétaire enrichi", en: "Enhanced co-owner portal" },
      { fr: "Factures et paiements des prestataires", en: "Supplier invoices and payments" },
      { fr: "Export complet des données d'une agence", en: "Full export of an agency's data" },
    ],
  },
  {
    version: "1.5.1",
    date: "2026-09-27",
    title: { fr: "Correctifs abonnements et Syndic", en: "Subscription and condominium fixes" },
    items: [
      { fr: "Message clair en cas de dépassement du quota de lots", en: "Clear message when the unit quota is exceeded" },
      { fr: "Corrections issues de la recette Syndic", en: "Fixes from condominium acceptance testing" },
    ],
  },
  {
    version: "1.5.0",
    date: "2026-09-25",
    title: { fr: "Multi-agences, paiement en ligne et abonnements", en: "Multi-agency, online payment and subscriptions" },
    items: [
      { fr: "Agences totalement cloisonnées et création d'une agence en un clic", en: "Fully isolated agencies and one-click agency creation" },
      { fr: "Paiement des loyers en ligne", en: "Online rent payment" },
      { fr: "Abonnements par packs cumulables, quotas de lots et facturation", en: "Stackable subscription packs, unit quotas and billing" },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-09-24",
    title: { fr: "Gestion locative et nouveau design", en: "Property management and new design" },
    items: [
      { fr: "Gestion locative complète, conforme SYSCOHADA", en: "Complete property management, SYSCOHADA compliant" },
      { fr: "Nouveau design aux couleurs de la marque", en: "New design in the brand colours" },
      { fr: "Syndic organisé en quatre onglets, trésorerie détaillée", en: "Condominium module in four tabs, detailed treasury" },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-08-17",
    title: { fr: "Application trilingue", en: "Trilingual application" },
    items: [
      { fr: "Application en français, anglais et arabe", en: "Application in French, English and Arabic" },
      { fr: "Import des suivis Excel existants", en: "Import of existing Excel trackers" },
      { fr: "Duplication des pièces de caisse, factures et bons de commande", en: "Duplication of cash vouchers, invoices and purchase orders" },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-06-15",
    title: { fr: "Module Finance", en: "Finance module" },
    items: [
      { fr: "Comptes de tiers, balance, relevés et campagnes", en: "Third-party accounts, trial balance, statements and campaigns" },
      { fr: "Fournisseurs, chantiers et caisse", en: "Suppliers, construction sites and cash desk" },
      { fr: "Budgets, avenants, bons de commande et pilotage de l'engagé", en: "Budgets, amendments, purchase orders and commitment tracking" },
      { fr: "Baux de terrain, associations, salaires, tâcherons, retenues et clôture", en: "Land leases, associations, salaries, contractors, retentions and closing" },
      { fr: "Gestion du stock", en: "Stock management" },
      { fr: "Menus adaptés à chaque rôle et tableau de bord d'accueil", en: "Role-based menus and home dashboard" },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-04-15",
    title: { fr: "Socle sécurisé et nouvelle interface", en: "Secure foundation and new interface" },
    items: [
      { fr: "Renforcement de la sécurité et cloisonnement des données entre agences", en: "Security hardening and data isolation between agencies" },
      { fr: "Interface unifiée, portails propriétaire et locataire intégrés", en: "Unified interface, owner and tenant portals integrated" },
      {
        fr: "Nouveaux écrans des biens, échéances, pénalités, paiements, documents et calendrier",
        en: "New screens for properties, due dates, penalties, payments, documents and calendar",
      },
      { fr: "Vue d'ensemble des programmes de travaux du patrimoine", en: "Overview of portfolio works programmes" },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-04-15",
    title: { fr: "Première version d'ImmoTopia", en: "First release of ImmoTopia" },
    items: [
      { fr: "Biens et lots, annonces publiques", en: "Properties and units, public listings" },
      { fr: "Gestion locative : baux, échéances, paiements et pénalités", en: "Property management: leases, due dates, payments and penalties" },
      { fr: "CRM des contacts et des prospects", en: "Contact and lead CRM" },
      { fr: "Gestion de copropriété", en: "Condominium management" },
      { fr: "Portail propriétaire avec relevés, portail locataire avec demandes de maintenance", en: "Owner portal with statements, tenant portal with maintenance requests" },
      { fr: "Documents, notifications par e-mail et WhatsApp, newsletter", en: "Documents, e-mail and WhatsApp notifications, newsletter" },
      { fr: "Administration, rôles et droits", en: "Administration, roles and permissions" },
    ],
  },
];
