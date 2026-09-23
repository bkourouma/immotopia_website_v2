import type { NextConfig } from "next";

// Redirections 301 des adresses de l'ancien site (Astro) vers leur équivalent le plus proche,
// pour conserver le référencement acquis. Les règles précises passent avant les règles génériques.
const legacyRedirects: [string, string][] = [
  // Modèles de documents → outils gratuits équivalents
  ["/modeles/quittance-loyer-cote-divoire", "/outils/quittance-de-loyer"],
  ["/modeles/contrat-bail-habitation-cote-divoire", "/outils/bail-habitation"],
  ["/modeles/bail-commercial-cote-divoire", "/outils/bail-commercial"],
  ["/modeles/appel-de-charges-copropriete-cote-divoire", "/outils/repartition-charges-copropriete"],
  ["/modeles/:slug", "/outils"],
  ["/modeles", "/outils"],
  // Contenus éditoriaux → hub des outils gratuits
  ["/ressources/faq", "/contact"],
  ["/faq", "/contact"],
  ["/ressources/:slug", "/outils"],
  ["/ressources", "/outils"],
  ["/blog/:slug", "/outils"],
  ["/blog", "/outils"],
  ["/guides/:slug", "/outils"],
  ["/vision/:slug", "/"],
  // Pages produit et pages métier → accueil (carrousel, rôles, écosystème)
  ["/fonctionnalites/:slug", "/"],
  ["/fonctionnalites", "/"],
  ["/la-solution/:slug", "/"],
  ["/la-solution", "/"],
  ["/pour-qui/:slug", "/"],
  ["/pour-qui", "/"],
  ["/pourquoi-immotopia", "/"],
  ["/gestion-locative-cote-divoire", "/"],
  ["/logiciel-immobilier-cote-divoire", "/"],
  ["/logiciel-annonces-immobilieres-cote-divoire", "/"],
  ["/logiciel-syndic-copropriete-cote-divoire", "/tarifs"],
  ["/meilleur-logiciel-immobilier-cote-divoire", "/"],
  ["/crm-immobilier-cote-divoire", "/"],
  ["/paiement-loyer-charges-mobile-money-cote-divoire", "/"],
  ["/maintenance-immobiliere-ticketing-cote-divoire", "/"],
  ["/tableaux-de-bord-kpi-immobilier-cote-divoire", "/"],
  ["/logiciel-immobilier-afrique", "/"],
  ["/immotopia-vs-excel", "/"],
  ["/gestion-locative-vs-excel", "/"],
  ["/index.html", "/"],
  // Accès clients : vers l'application
  ["/login", "https://app.immotopia.cloud/login"],
  ["/connexion", "https://app.immotopia.cloud/login"],
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
};

export default nextConfig;
