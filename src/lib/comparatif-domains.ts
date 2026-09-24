// Domaines du comparatif, sans les données : le menu les importe sur toutes les pages.
// Libellés bilingues : `d.label[locale]`, `d.pitch[locale]`.

export const domains = [
  { id: "socle", label: { fr: "Socle", en: "Foundation" }, pitch: { fr: "Plusieurs agences, droits par rôle, trois langues.", en: "Several agencies, role-based access, three languages." } },
  { id: "pilotage", label: { fr: "Pilotage", en: "Management" }, pitch: { fr: "Le travail du jour et l'objectif du mois, dès la connexion.", en: "Today's work and this month's target, as soon as you log in." } },
  { id: "biens-commercial", label: { fr: "Biens & commercial", en: "Properties & sales" }, pitch: { fr: "Du mandat à la visite, avec un vrai pipeline CRM.", en: "From mandate to viewing, with a real CRM pipeline." } },
  { id: "gestion-locative", label: { fr: "Gestion locative", en: "Property management" }, pitch: { fr: "Baux, échéances, paiements et compte du propriétaire.", en: "Leases, due dates, payments and the owner's account." } },
  { id: "portails-service", label: { fr: "Portails & service", en: "Portals & service" }, pitch: { fr: "Propriétaires et locataires ont chacun leur espace.", en: "Owners and tenants each have their own space." } },
  { id: "finance-documents", label: { fr: "Finance & documents", en: "Finance & documents" }, pitch: { fr: "Balances, caisse contrôlée, comptabilité exportable.", en: "Trial balances, controlled cash desk, exportable accounting." } },
  { id: "syndic", label: { fr: "Syndic", en: "Condominium" }, pitch: { fr: "Tantièmes, appels de fonds, assemblées et votes.", en: "Ownership shares, calls for funds, general meetings and votes." } },
  { id: "chantiers-btp", label: { fr: "Chantiers & BTP", en: "Construction sites" }, pitch: { fr: "Budget, stock, tâcherons et coût de revient par lot.", en: "Budget, stock, subcontractors and cost price per unit." } },
  { id: "patrimoine", label: { fr: "Patrimoine", en: "Portfolio" }, pitch: { fr: "Valeur, rendement et crédits de chaque bien.", en: "Value, yield and loans for each property." } },
  { id: "communication", label: { fr: "Communication", en: "Communication" }, pitch: { fr: "E-mail, WhatsApp et newsletter qui partent seuls.", en: "E-mail, WhatsApp and newsletters that go out on their own." } },
  { id: "integrations", label: { fr: "Intégrations", en: "Integrations" }, pitch: { fr: "Une API pour publier vos annonces ailleurs.", en: "An API to publish your listings elsewhere." } },
] as const;

export type DomainId = (typeof domains)[number]["id"];

/** Chemin sans préfixe de langue : passer par SmartLink ou `href()` (useI18n) pour le localiser. */
export const comparatifHref = (domain?: DomainId) => (domain ? `/comparatif#${domain}` : "/comparatif");
