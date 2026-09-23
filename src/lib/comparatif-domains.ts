// Domaines du comparatif, sans les données : le menu les importe sur toutes les pages.

export const domains = [
  { id: "socle", label: "Socle", pitch: "Plusieurs agences, droits par rôle, trois langues." },
  { id: "pilotage", label: "Pilotage", pitch: "Le travail du jour et l'objectif du mois, dès la connexion." },
  { id: "biens-commercial", label: "Biens & commercial", pitch: "Du mandat à la visite, avec un vrai pipeline CRM." },
  { id: "gestion-locative", label: "Gestion locative", pitch: "Baux, échéances, paiements et compte du propriétaire." },
  { id: "portails-service", label: "Portails & service", pitch: "Propriétaires et locataires ont chacun leur espace." },
  { id: "finance-documents", label: "Finance & documents", pitch: "Balances, caisse contrôlée, comptabilité exportable." },
  { id: "syndic", label: "Syndic", pitch: "Tantièmes, appels de fonds, assemblées et votes." },
  { id: "chantiers-btp", label: "Chantiers & BTP", pitch: "Budget, stock, tâcherons et coût de revient par lot." },
  { id: "patrimoine", label: "Patrimoine", pitch: "Valeur, rendement et crédits de chaque bien." },
  { id: "communication", label: "Communication", pitch: "E-mail, WhatsApp et newsletter qui partent seuls." },
  { id: "integrations", label: "Intégrations", pitch: "Une API pour publier vos annonces ailleurs." },
] as const;

export type DomainId = (typeof domains)[number]["id"];

export const comparatifHref = (domain?: DomainId) => (domain ? `/comparatif#${domain}` : "/comparatif");
