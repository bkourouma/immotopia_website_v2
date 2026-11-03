// Modèle du wiki des fonctionnalités (/wiki), en français seulement.
// Source : « ImmoTopia_Wiki_Fonctionnalites.xlsx » (inventaire tiré du code de l'application, 27/09/2026),
// réécrit pour les visiteurs : ni route technique, ni nom de permission, ni point de sécurité interne.
// Règle éditoriale de content.ts : ce qui est en cours de déploiement est signalé comme tel, jamais de date.

import type { PackId } from "../pricing";

export type { PackId };

/** Packs du wiki : les six packs commercialisés, plus les paliers Particulier encore en développement (non commercialisés). */
export type WikiPackId = PackId | "particulier-gratuit" | "particulier-plus";

/** « disponible » : en production. « deploiement » : présent dans l'application, en cours de déploiement. */
export type WikiStatus = "disponible" | "deploiement" | "developpement";

/** Profils de la configuration de départ (une agence peut réattribuer les droits dans « Rôles et permissions »). */
export type WikiProfile =
  | "direction" // administrateur de l'agence : directeur, gérant
  | "gestionnaire" // gestionnaire, responsable d'équipe
  | "agent" // agent immobilier, commercial
  | "comptable"
  | "equipe" // tout collaborateur de l'agence qui a le droit correspondant
  | "proprietaire" // depuis son portail
  | "locataire" // depuis son portail
  | "coproprietaire" // depuis son portail
  | "visiteur"; // sans compte (site d'annonces de l'agence, première connexion…)

export type WikiAction = {
  /** Verbe à l'infinitif, sans jargon : « Créer un bien ». */
  title: string;
  /** À quoi sert l'action, en une ou deux phrases. */
  goal: string;
  /** « Ce que vous renseignez », en langage courant. */
  input?: string;
  /** « Ce que vous obtenez ». */
  output?: string;
  /** « Avant de commencer » : ce qui doit exister d'abord. */
  prereq?: string;
  /** Seulement si différent des profils de la fonctionnalité. */
  profiles?: WikiProfile[];
  /** Seulement si différent du statut de la fonctionnalité. */
  status?: WikiStatus;
};

export type WikiFaq = { q: string; a: string };

/** Un paragraphe (chaîne) ou une liste à puces (tableau de chaînes). Les liens internes s'écrivent « [texte](/chemin) ». */
export type WikiBlock = string | string[];

/** Section éditoriale (titre H2 et texte), affichée avant « Ce que vous pouvez faire ». */
export type WikiSection = { title: string; body: WikiBlock[] };

export type WikiFeature = {
  /** Segment d'URL, en minuscules sans accents : « fiche-bien ». */
  slug: string;
  /** Titre court : menus, fil d'Ariane, listes. Sert aussi de H1 quand `h1` est absent. */
  title: string;
  /** H1 de la page quand il doit différer du titre court : requête de recherche + précision métier. */
  h1?: string;
  /** Titre de la balise <title> (sans « | ImmoTopia », ajouté par la page), 60 caractères environ. */
  metaTitle: string;
  /** Méta-description : 140 à 160 caractères. */
  summary: string;
  /** Deux à quatre phrases : à quoi sert la fonctionnalité, pour qui, ce qu'elle change au quotidien. Accepte les liens « [texte](/chemin) ». */
  intro: string;
  /** Sections éditoriales facultatives (H2) : usage, définitions, contenu attendu… Avant la liste des actions. */
  sections?: WikiSection[];
  packs: WikiPackId[];
  profiles: WikiProfile[];
  /** Chemin dans le menu de l'application : « Biens › Toutes les propriétés ». */
  menu?: string;
  status: WikiStatus;
  actions: WikiAction[];
  faq?: WikiFaq[];
  /** Fonctionnalités liées, sous la forme « domaine/fonctionnalite ». */
  related?: string[];
};

export type WikiDomain = {
  slug: string;
  title: string;
  metaTitle: string;
  summary: string;
  intro: string;
  features: WikiFeature[];
};
