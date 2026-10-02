// Wiki des fonctionnalités (/wiki) : une page par domaine et une page par fonctionnalité, en français seulement.
// Les textes vivent dans un fichier par domaine (même dossier) ; ce fichier les assemble, porte les libellés
// communs et vérifie au build que les adresses sont uniques et que les liens entre pages existent.

import { administrationPlateforme } from "./administration-plateforme";
import { agenceEtAbonnement } from "./agence-et-abonnement";
import { biensEtPatrimoine } from "./biens-et-patrimoine";
import { communicationEtDocuments } from "./communication-et-documents";
import { crmEtVentes } from "./crm-et-ventes";
import { financeEtComptabilite } from "./finance-et-comptabilite";
import { gestionLocative } from "./gestion-locative";
import { maintenance } from "./maintenance";
import { patrimoineMultiActifs } from "./patrimoine-multi-actifs";
import { portailsClients } from "./portails-clients";
import { promotionEtChantiers } from "./promotion-et-chantiers";
import { syndicCopropriete } from "./syndic-copropriete";
import type { WikiPackId, WikiAction, WikiDomain, WikiFeature, WikiProfile, WikiStatus } from "./types";

export type * from "./types";

/** Date de l'inventaire dont le wiki est tiré. */
export const WIKI_UPDATED_ON = "2 octobre 2026";

export const wikiDomains: WikiDomain[] = [
  gestionLocative,
  biensEtPatrimoine,
  patrimoineMultiActifs,
  crmEtVentes,
  syndicCopropriete,
  portailsClients,
  maintenance,
  communicationEtDocuments,
  financeEtComptabilite,
  promotionEtChantiers,
  agenceEtAbonnement,
  administrationPlateforme,
];

export const wikiHref = (domain?: string, feature?: string) =>
  ["/wiki", domain, feature].filter(Boolean).join("/");

export const domainBySlug = (slug: string) => wikiDomains.find((d) => d.slug === slug);

export function featureBySlug(domain: string, feature: string) {
  const d = domainBySlug(domain);
  const f = d?.features.find((x) => x.slug === feature);
  return d && f ? { domain: d, feature: f } : undefined;
}

/** « domaine/fonctionnalite » → fonctionnalité et domaine. */
export const featureByRef = (ref: string) => featureBySlug(...(ref.split("/") as [string, string]));

/** Ancre d'une action dans sa page : « Créer un bien » → « creer-un-bien ». */
export const actionAnchor = (a: WikiAction) =>
  a.title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const packLabel: Record<WikiPackId, string> = {
  agence: "Agence",
  syndic: "Syndic",
  promoteur: "Promoteur",
  integre: "Opérateur intégré",
  "patrimoine-essentiel": "Patrimoine Essentiel",
  "patrimoine-pro": "Patrimoine Pro",
  "particulier-gratuit": "Particulier gratuit (en développement)",
  "particulier-plus": "Particulier plus (en développement)",
};
export const packOrder: WikiPackId[] = ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro", "particulier-gratuit", "particulier-plus"];

export const profileLabel: Record<WikiProfile, string> = {
  direction: "Direction de l'agence",
  gestionnaire: "Gestionnaire",
  agent: "Agent commercial",
  comptable: "Comptable",
  equipe: "Collaborateurs habilités",
  proprietaire: "Propriétaire (portail)",
  locataire: "Locataire (portail)",
  coproprietaire: "Copropriétaire (portail)",
  visiteur: "Visiteur, sans compte",
};

export const statusMeta: Record<WikiStatus, { label: string; hint: string }> = {
  disponible: { label: "Disponible", hint: "En production dans l'application." },
  deploiement: {
    label: "En cours de déploiement",
    hint: "Présent dans l'application et en cours de déploiement : sa disponibilité pour votre agence se confirme en démonstration.",
  },
  developpement: {
    label: "En développement",
    hint: "Fonction en cours de développement : pas encore en production. Elle figure ici pour information, sans date.",
  },
};

export const actionStatus = (f: WikiFeature, a: WikiAction): WikiStatus => a.status ?? f.status;

export const allFeatures = wikiDomains.flatMap((domain) => domain.features.map((feature) => ({ domain, feature })));

export const wikiStats = {
  domains: wikiDomains.length,
  features: allFeatures.length,
  actions: allFeatures.reduce((n, { feature }) => n + feature.actions.length, 0),
};

/** Packs qui ouvrent au moins une fonctionnalité du domaine. */
export const domainPacks = (d: WikiDomain) => packOrder.filter((p) => d.features.some((f) => f.packs.includes(p)));

/** Fonctionnalités précédente et suivante dans l'ordre du wiki (navigation en bas de page). */
export function neighbours(domain: string, feature: string) {
  const i = allFeatures.findIndex((x) => x.domain.slug === domain && x.feature.slug === feature);
  return { prev: allFeatures[i - 1], next: allFeatures[i + 1] };
}

/** Index léger pour la recherche côté navigateur (titres seulement, pas les textes). */
export type WikiSearchEntry = { title: string; context: string; href: string; kind: "fonctionnalite" | "action" };

export function searchEntries(): WikiSearchEntry[] {
  return allFeatures.flatMap(({ domain, feature }) => {
    const href = wikiHref(domain.slug, feature.slug);
    return [
      { title: feature.title, context: domain.title, href, kind: "fonctionnalite" as const },
      ...feature.actions.map((a) => ({
        title: a.title,
        context: `${domain.title} › ${feature.title}`,
        href: `${href}#${actionAnchor(a)}`,
        kind: "action" as const,
      })),
    ];
  });
}

// Contrôles au chargement (donc au build) : une erreur ici casse `next build` plutôt qu'une page.
for (const d of wikiDomains) {
  const seen = new Set<string>();
  for (const f of d.features) {
    if (seen.has(f.slug)) throw new Error(`Wiki : fonctionnalité en double « ${d.slug}/${f.slug} »`);
    seen.add(f.slug);
    const anchors = new Set<string>();
    for (const a of f.actions) {
      const id = actionAnchor(a);
      if (anchors.has(id)) throw new Error(`Wiki : action en double « ${a.title} » dans ${d.slug}/${f.slug}`);
      anchors.add(id);
    }
    for (const r of f.related ?? []) {
      if (!featureByRef(r)) throw new Error(`Wiki : lien « ${r} » introuvable dans ${d.slug}/${f.slug}`);
    }
  }
}
if (new Set(wikiDomains.map((d) => d.slug)).size !== wikiDomains.length) throw new Error("Wiki : domaine en double");
