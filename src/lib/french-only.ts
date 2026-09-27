// Pages publiées en français seulement (pages thématiques et FAQ) : le sélecteur de langue
// renvoie vers l'accueil anglais plutôt que vers une page inexistante.
// Liste tenue à jour avec src/lib/landings.ts (vérifié par le build : voir landings.ts).
export const frenchOnlyPaths = [
  "/faq",
  "/gestion-locative-cote-divoire",
  "/logiciel-immobilier-cote-divoire",
  "/logiciel-annonces-immobilieres-cote-divoire",
  "/logiciel-syndic-copropriete-cote-divoire",
  "/meilleur-logiciel-immobilier-cote-divoire",
  "/crm-immobilier-cote-divoire",
  "/paiement-loyer-charges-mobile-money-cote-divoire",
  "/maintenance-immobiliere-ticketing-cote-divoire",
  "/tableaux-de-bord-kpi-immobilier-cote-divoire",
  "/logiciel-immobilier-afrique",
  "/immotopia-vs-excel",
  "/gestion-locative-vs-excel",
];

// Rubriques entières en français seulement (toutes leurs sous-pages) : le wiki des fonctionnalités.
export const frenchOnlyPrefixes = ["/wiki"];

export const isFrenchOnly = (path: string) =>
  frenchOnlyPaths.includes(path) || frenchOnlyPrefixes.some((p) => path === p || path.startsWith(`${p}/`));
