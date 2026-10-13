/**
 * Pages thématiques reprises de l'ancien site, à leurs URL d'origine (référencement acquis).
 * Contenu en français uniquement. Règle éditoriale : on présente ce qui existe et ce qui est
 * en cours de déploiement (en le disant, sans date) ; jamais ce qui n'existe pas.
 */

import { fcfa } from "./format";
import { frenchOnlyPaths } from "./french-only";
import { packs, promoteurPrice, type PackId } from "./pricing";

export type LandingItem = { title: string; text: string };
/** Tableau comparatif : la première colonne de chaque ligne sert d'en-tête de ligne. */
export type LandingTable = { caption: string; head: string[]; rows: string[][] };
/**
 * Dans les textes (intro, paragraphes, cartes, puces, cellules, note, réponses de FAQ), « [texte](/chemin) » devient
 * un lien interne dans la langue courante (voir src/components/inline-links.tsx).
 */
export type LandingSection = {
  title: string;
  intro?: string;
  /** Paragraphes de texte courant, avant les cartes. */
  paragraphs?: string[];
  items?: LandingItem[];
  bullets?: string[];
  table?: LandingTable;
  note?: string;
};
export type Landing = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faq: { q: string; a: string }[];
  related: string[];
};

// Prix et capacités : repris de pricing.ts (source de vérité), jamais recopiés dans les textes.
const pack = (id: PackId) => packs.find((p) => p.id === id)!;
const agence = pack("agence");
const promoteur = pack("promoteur");
const integre = pack("integre");
const chantierSup = promoteurPrice(3, 150) - promoteurPrice(2, 150); // un chantier actif de plus
const blocLots = promoteurPrice(2, 160) - promoteurPrice(2, 150); // un bloc de 10 lots de plus

export const landings: Landing[] = [
  {
    slug: "gestion-locative-cote-divoire",
    metaTitle: "Logiciel de gestion locative en Côte d'Ivoire | ImmoTopia",
    metaDescription:
      "Gestion locative en Côte d'Ivoire : baux, échéances, Mobile Money, pénalités, cautions, quittances et portails propriétaire et locataire dans ImmoTopia.",
    eyebrow: "Gestion locative",
    h1: "Gestion locative en Côte d'Ivoire",
    intro:
      "Baux, loyers, relances, cautions et relevés de gérance : ImmoTopia réunit tout le cycle de la gestion locative dans une seule application, pensée pour les agences et administrateurs de biens d'Abidjan et de toute la Côte d'Ivoire.",
    sections: [
      {
        title: "Les réalités du terrain",
        items: [
          { title: "Des impayés repérés trop tard", text: "Sans échéancier partagé, un retard de loyer se découvre en fin de mois, quand la relance est déjà difficile." },
          { title: "Des paiements dispersés", text: "Espèces, virements, Orange Money, MTN MoMo, Moov Money, Wave : sans enregistrement rattaché au bail, retrouver qui a payé quoi prend des heures." },
          { title: "Des documents refaits à la main", text: "Quittances, reçus et avenants retapés dans Word, avec des erreurs de montant et de numérotation." },
        ],
      },
      {
        title: "Ce que fait ImmoTopia",
        items: [
          { title: "Baux et échéancier automatique", text: "Chaque bail (avec colocataires, périodicité mensuelle à annuelle) génère son échéancier : loyer, charges, statut et reste à encaisser pour chaque échéance." },
          { title: "Paiements par tous moyens", text: "Espèces, virement, chèque, carte ou Mobile Money avec l'opérateur. Un paiement peut solder plusieurs échéances, et les paiements partiels sont suivis." },
          { title: "Déclaration par le locataire", text: "Le locataire déclare son paiement depuis son portail ; l'agence le valide en un clic dans sa file « À traiter aujourd'hui »." },
          { title: "Pénalités de retard", text: "Montant fixe ou pourcentage, avec période de grâce : les pénalités se calculent automatiquement et restent ajustables." },
          { title: "Cautions tracées", text: "Constitution, retenues et restitutions du dépôt de garantie, chaque mouvement étant conservé." },
          { title: "Quittances et documents", text: "Quittances, reçus, contrats et avenants générés depuis vos propres modèles Word, avec numérotation continue." },
          { title: "Relances e-mail et WhatsApp", text: "Rappel avant l'échéance, confirmation de paiement, alerte de fin de bail : les messages partent seuls, selon le consentement de chaque destinataire." },
          { title: "Portails propriétaire et locataire", text: "Chacun consulte ses baux, échéances, paiements et documents. Les comptes propriétaires et locataires ne sont pas facturés." },
        ],
      },
      {
        title: "En cours de déploiement",
        bullets: [
          "Renouvellement, avenant et résiliation du bail avec historique conservé.",
          "États des lieux d'entrée et de sortie (pièces, compteurs, clés, photos) et retenues sur dépôt.",
          "Honoraires de gestion à trois niveaux, compte courant propriétaire et reversements.",
        ],
        note: "Ces fonctions sont en cours de déploiement : leur disponibilité se confirme en démonstration.",
      },
    ],
    faq: [
      {
        q: "La gestion locative est-elle un module séparé ?",
        a: "Non. Elle partage les mêmes contacts, biens et documents que le CRM, le syndic et le patrimoine : un propriétaire saisi une fois est bailleur, destinataire des relevés et copropriétaire sans double saisie.",
      },
      {
        q: "Le Mobile Money est-il obligatoire ?",
        a: "Non. Tous les moyens de paiement sont acceptés. Pour le Mobile Money, l'opérateur est enregistré avec le paiement, et le locataire peut déclarer lui-même son règlement depuis son portail.",
      },
      {
        q: "Est-ce adapté à une petite agence ?",
        a: "Oui. Le pack Agence inclut 100 logements sous mandat, et le premier mois est offert, sans engagement.",
      },
    ],
    related: ["paiement-loyer-charges-mobile-money-cote-divoire", "gestion-locative-vs-excel", "maintenance-immobiliere-ticketing-cote-divoire"],
  },
  {
    slug: "logiciel-immobilier-cote-divoire",
    metaTitle: "Logiciel immobilier en Côte d'Ivoire | ERP ImmoTopia",
    metaDescription:
      "Logiciel immobilier en ligne pour les professionnels en Côte d'Ivoire : CRM, gestion locative, syndic, portails clients, maintenance, e-mail et WhatsApp.",
    eyebrow: "ERP immobilier",
    h1: "Logiciel immobilier en Côte d'Ivoire : un ERP complet pour les professionnels",
    intro:
      "ImmoTopia est un logiciel de gestion immobilière en ligne, conçu à Abidjan pour les agences, gestionnaires, syndics et promoteurs. Un seul fichier de clients, un seul parc de biens, et chaque métier activé selon votre activité.",
    sections: [
      {
        title: "Un seul outil pour tous vos métiers",
        items: [
          { title: "Transaction et CRM", text: "Un [logiciel CRM immobilier](/crm-immobilier-cote-divoire) complet : contacts, pipeline de ventes et de locations, visites, rapprochement entre la demande d'un client et les biens disponibles." },
          { title: "Biens et annonces", text: "Fiches par type de bien, médias, mandats, score de qualité de l'annonce et publication vers votre site grâce à l'API d'annonces." },
          { title: "Gestion locative", text: "Baux, échéancier, paiements, pénalités, cautions, quittances et relevés de gérance." },
          { title: "Syndic de copropriété", text: "Lots et tantièmes, budgets, appels de charges, recouvrement, assemblées générales et comptabilité de copropriété." },
          { title: "Maintenance", text: "Tickets avec photos et priorités, prestataires, fil d'échange et notifications à chaque étape." },
          { title: "Communication", text: "Rappels et notifications par e-mail et WhatsApp, newsletter, historique de tous les messages." },
        ],
      },
      {
        title: "Pensé pour la Côte d'Ivoire",
        bullets: [
          "Prix en FCFA, sans commission sur vos loyers.",
          "Mobile Money reconnu partout : Orange Money, MTN MoMo, Moov Money et Wave.",
          "WhatsApp intégré, le canal que vos clients lisent vraiment.",
          "Application web : ordinateur, tablette et téléphone, sans installation.",
          "Équipe basée à Abidjan (Alliance Consultants).",
        ],
      },
      {
        title: "Contrôle et sécurité",
        items: [
          { title: "Rôles et permissions", text: "Administrateur, manager, agent, comptable : chacun ne voit que ce qui le concerne." },
          { title: "Journal d'audit", text: "Les actions sensibles sont enregistrées : qui, quoi, quand, sur quelle donnée." },
          { title: "Données cloisonnées", text: "Les données de chaque organisation sont strictement séparées de celles des autres." },
        ],
      },
    ],
    faq: [
      { q: "Faut-il installer quelque chose ?", a: "Non. ImmoTopia s'utilise depuis un navigateur, sur ordinateur, tablette ou téléphone." },
      { q: "Combien coûte ImmoTopia ?", a: "Le pack Agence commence à 29 900 FCFA HT par mois et le pack Syndic à 49 900 FCFA HT. Le premier mois est offert, sans engagement. Le détail et un simulateur sont sur la page Tarifs." },
      { q: "Puis-je reprendre mes fichiers Excel ?", a: "Oui : la mise en route accompagnée comprend la reprise de vos biens, contacts, baux ou copropriétés. Elle est facultative si vous saisissez vous-même vos données." },
    ],
    related: ["meilleur-logiciel-immobilier-cote-divoire", "immotopia-vs-excel", "logiciel-immobilier-afrique"],
  },
  {
    slug: "logiciel-annonces-immobilieres-cote-divoire",
    metaTitle: "Logiciel d'annonces immobilières en Côte d'Ivoire",
    metaDescription:
      "Gérez votre stock de biens et vos annonces : fiches par type de bien, statuts, médias, score de qualité, API d'annonces et diffusion WhatsApp.",
    eyebrow: "Biens et annonces",
    h1: "Logiciel d'annonces immobilières en Côte d'Ivoire : stock, publication et prospects",
    intro:
      "Un stock de biens à jour, des annonces complètes et des demandes qui arrivent directement dans votre CRM : ImmoTopia relie vos biens, vos annonces et votre suivi commercial.",
    sections: [
      {
        title: "Un stock de biens fiable",
        items: [
          { title: "Fiches adaptées au type de bien", text: "Appartement, villa, studio, terrain, bureau… les champs s'adaptent à la nature du bien." },
          { title: "Statuts et historique", text: "Brouillon, disponible, réservé, sous offre, loué, vendu : chaque changement de statut est daté et conservé." },
          { title: "Médias et documents", text: "Photos avec photo principale et ordre d'affichage, pièces jointes, titre foncier, mandat et plans rattachés au bien." },
          { title: "Mandats", text: "Mandats de gestion et de vente rattachés à chaque bien." },
        ],
      },
      {
        title: "Des annonces qui travaillent pour vous",
        items: [
          { title: "Score de qualité", text: "ImmoTopia mesure la complétude de chaque annonce et indique ce qui manque avant publication." },
          { title: "API d'annonces", text: "Vos annonces publiées alimentent votre site internet via une interface dédiée ; retirer un bien le retire du site." },
          { title: "Diffusion WhatsApp", text: "La publication d'un bien peut être annoncée automatiquement dans le groupe WhatsApp de l'agence." },
          { title: "Recherche multicritère", text: "Retrouvez en quelques secondes le bien qui correspond à la demande d'un client." },
        ],
      },
      {
        title: "Du bien au client",
        bullets: [
          "Rapprochement entre le besoin d'un client et les biens disponibles.",
          "Visites planifiées avec les collaborateurs affectés et vue calendrier.",
          "Pipeline commercial pour la vente comme pour la location.",
        ],
        note: "ImmoTopia ne fournit pas de site vitrine clé en main ni de diffusion automatique vers les portails d'annonces tiers : l'API d'annonces alimente le site que vous avez déjà.",
      },
    ],
    faq: [
      { q: "Mes annonces apparaissent-elles sur mon site ?", a: "Oui, si votre site est branché sur l'API d'annonces d'ImmoTopia : les biens publiés s'y affichent et disparaissent quand vous les retirez." },
      { q: "Peut-on gérer location et vente pour un même bien ?", a: "Oui, un bien peut être proposé en vente, en location ou en courte durée, et cumuler plusieurs modes." },
    ],
    related: ["crm-immobilier-cote-divoire", "logiciel-immobilier-cote-divoire", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "logiciel-syndic-copropriete-cote-divoire",
    metaTitle: "Logiciel de syndic de copropriété en Côte d'Ivoire",
    metaDescription:
      "Syndic en Côte d'Ivoire : lots et tantièmes, budgets, appels de charges, recouvrement, assemblées générales. Pack Syndic dès 49 900 FCFA HT/mois.",
    eyebrow: "Syndic de copropriété",
    h1: "Logiciel de syndic de copropriété en Côte d'Ivoire",
    intro:
      "Tantièmes, appels de charges, relances, assemblées générales et comptabilité : le module Syndic d'ImmoTopia donne aux cabinets de copropriété un outil complet, en FCFA, avec les relances WhatsApp que les copropriétaires lisent.",
    sections: [
      {
        title: "Copropriétés et lots",
        items: [
          { title: "Fiche copropriété", text: "Adresse, bâtiments, nombre de lots, référence cadastrale et documents dans un coffre dédié." },
          { title: "Lots et tantièmes", text: "Tantièmes, copropriétaires et occupants par lot ; import des lots à partir des biens déjà saisis." },
        ],
      },
      {
        title: "Charges et recouvrement",
        items: [
          { title: "Budget d'exercice", text: "Lignes budgétaires et clés de répartition ; les appels de charges par lot se génèrent depuis le budget." },
          { title: "Appels de charges", text: "Appels individuels ou en masse, encaissements et suivi du taux de recouvrement." },
          { title: "Recouvrement", text: "Vue des retards, relances individuelles ou groupées par e-mail et WhatsApp, pénalités et échéanciers de paiement." },
          { title: "Compte par lot", text: "Relevé, transactions et ajustements pour chaque copropriétaire." },
          { title: "Portail copropriétaire", text: "Chaque copropriétaire invité suit en ligne, en lecture seule, ses lots, ses appels de charges, ses reçus et les procès-verbaux d'assemblée dans le [portail de la copropriété](/wiki/portails-clients/portail-coproprietaire)." },
        ],
      },
      {
        title: "Assemblées générales et comptabilité",
        items: [
          { title: "Assemblées générales", text: "Ordre du jour, résolutions, votes et pouvoirs par lot, calcul du quorum et compte rendu archivé." },
          { title: "Comptabilité de copropriété", text: "Plan de comptes, journaux, écritures en partie double verrouillables, grand livre et balance." },
          { title: "Parties communes", text: "Incidents avec imputation des coûts, prestataires, contrats de maintenance et équipements." },
        ],
      },
    ],
    faq: [
      { q: "Combien coûte le pack Syndic ?", a: "49 900 FCFA HT par mois pour 2 copropriétés et 100 lots, puis 10 000 FCFA par copropriété et 150 FCFA par lot supplémentaires. Le premier mois est offert, sans engagement." },
      { q: "Je fais aussi de la gestion locative : dois-je payer deux fois ?", a: "Les packs Agence et Syndic se combinent avec 10 % de remise sur le moins cher des deux, et vos contacts restent communs." },
      { q: "Les copropriétaires reçoivent-ils les relances par WhatsApp ?", a: "Oui, par e-mail, WhatsApp ou les deux, selon les préférences et le consentement de chacun." },
    ],
    related: ["paiement-loyer-charges-mobile-money-cote-divoire", "maintenance-immobiliere-ticketing-cote-divoire", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "meilleur-logiciel-immobilier-cote-divoire",
    metaTitle: "Meilleur logiciel immobilier en Côte d'Ivoire : les critères",
    metaDescription:
      "Comment choisir le meilleur logiciel immobilier en Côte d'Ivoire : métiers couverts, Mobile Money, WhatsApp, portails, prix en FCFA, reprise des données.",
    eyebrow: "Guide de choix",
    h1: "Meilleur logiciel immobilier en Côte d'Ivoire : comment choisir ?",
    intro:
      "Le « meilleur » logiciel est celui qui couvre vos métiers réels, parle le langage de vos clients et que votre équipe utilisera vraiment. Voici les critères qui comptent en Côte d'Ivoire, et la façon dont ImmoTopia y répond.",
    sections: [
      {
        title: "Les critères qui comptent",
        items: [
          { title: "1. Couvrir tous vos métiers", text: "Transaction, gestion locative, syndic, promotion : un seul outil évite les doubles saisies entre logiciels." },
          { title: "2. Le Mobile Money", text: "Orange Money, MTN MoMo, Moov Money et Wave doivent être des moyens de paiement reconnus, pas des « autres »." },
          { title: "3. WhatsApp", text: "Les rappels et confirmations doivent partir sur le canal que vos locataires et copropriétaires lisent." },
          { title: "4. Des portails clients", text: "Propriétaires et locataires qui consultent eux-mêmes leurs documents, ce sont des appels en moins." },
          { title: "5. Des prix clairs en FCFA", text: "Sans commission sur les loyers, et sans facturer chaque propriétaire ou locataire." },
          { title: "6. Une équipe proche", text: "Mise en route, reprise des données et formation par une équipe qui connaît le marché local." },
        ],
      },
      {
        title: "Checklist avant de signer",
        bullets: [
          "Demandez une démonstration sur vos propres cas : un bail, une copropriété, un impayé.",
          "Vérifiez qui peut voir quoi : rôles, permissions et journal d'audit.",
          "Faites chiffrer la reprise de vos fichiers Excel.",
          "Testez l'outil sur téléphone.",
          "Lisez les conditions : engagement, période d'essai, frais de mise en route.",
        ],
      },
      {
        title: "Comparer en toute transparence",
        intro:
          "Notre page Comparatif met ImmoTopia face à trois logiciels similaires, sur une centaine de fonctionnalités, à partir des pages publiques de chaque éditeur et avec les sources.",
      },
    ],
    faq: [
      { q: "ImmoTopia propose-t-il un essai ?", a: "Le premier mois d'abonnement est offert sur tous les packs, sans engagement." },
      { q: "Où voir la comparaison avec les autres logiciels ?", a: "Sur la page Comparatif du site, domaine par domaine et avec les sources." },
    ],
    related: ["logiciel-immobilier-cote-divoire", "immotopia-vs-excel", "logiciel-immobilier-afrique"],
  },
  {
    slug: "crm-immobilier-cote-divoire",
    metaTitle: "Logiciel CRM immobilier pour agences à Abidjan | ImmoTopia",
    metaDescription:
      "Logiciel CRM immobilier pour agences et promoteurs en Côte d'Ivoire : contacts, pipeline, visites, mandats, offres, relances. Essai offert.",
    eyebrow: "CRM immobilier",
    h1: "Logiciel CRM immobilier pour agences et promoteurs en Côte d'Ivoire",
    intro:
      "Chaque appel, chaque visite, chaque affaire au même endroit. ImmoTopia est un logiciel CRM immobilier conçu à Abidjan pour les agences et les promoteurs : il remplace le fichier Excel et le carnet de notes par un pipeline partagé par toute l'équipe, relié à vos biens et à votre gestion locative. Un prospect devenu locataire ou propriétaire ne se ressaisit jamais.",
    sections: [
      {
        title: "Pourquoi un CRM immobilier plutôt qu'un fichier Excel ?",
        intro:
          "Un tableur suffit tant que l'on suit quelques contacts. Dès que plusieurs agents appellent, visitent et négocient en parallèle, les mêmes problèmes reviennent.",
        items: [
          { title: "Des prospects qui se perdent", text: "La prochaine relance n'existe que dans la mémoire de l'agent ou sur un bout de papier. Un client qui a visité deux fois n'est plus rappelé, et personne ne s'en aperçoit." },
          { title: "Un historique éparpillé", text: "Appels, messages WhatsApp, visites et promesses se retrouvent dans des téléphones différents. Quand un agent s'absente, son dossier part avec lui." },
          { title: "Des demandes et des biens qui ne se rencontrent pas", text: "Le client cherche un trois-pièces dans un quartier précis, un bien correspondant est disponible, mais personne ne fait le lien : la comparaison se fait de tête." },
        ],
        note: "Le point par point avec Excel est détaillé dans [ImmoTopia vs Excel](/immotopia-vs-excel).",
      },
      {
        title: "Ce que fait le CRM",
        items: [
          { title: "Contacts complets", text: "Prospects, clients, propriétaires, locataires, acquéreurs ; rôles multiples, étiquettes, zones recherchées et notes. Un [fichier unique](/wiki/crm-et-ventes/contacts-prospects) pour toute l'agence." },
          { title: "Pipeline par étapes", text: "Nouveau, qualifié, visite, négociation, gagné ou perdu, pour la vente comme pour la location, avec l'entonnoir valorisé et le collaborateur responsable de chaque [affaire](/wiki/crm-et-ventes/affaires-et-activites)." },
          { title: "Rapprochement", text: "ImmoTopia met en face le besoin d'un client (budget, zone, nombre de pièces, surface) et les biens disponibles, avec un score de [correspondance expliqué](/wiki/crm-et-ventes/rapprochement-de-biens)." },
          { title: "Visites et agenda", text: "Rendez-vous et visites avec les collaborateurs affectés, en vue calendrier." },
          { title: "Activités", text: "Appels, e-mails, WhatsApp, tâches et notes rattachés aux contacts et aux affaires : l'historique suit le client, même quand l'agent change." },
          { title: "Tableau de bord commercial", text: "Nouveaux prospects, conversions, affaires par étape, relances en retard, recherches enregistrées et export CSV, dans le [tableau de bord CRM](/wiki/crm-et-ventes/calendrier-et-tableau-de-bord-crm)." },
        ],
      },
      {
        title: "Un CRM pour agence ou pour promoteur ?",
        intro:
          "Les deux métiers vendent des biens, mais pas de la même façon. ImmoTopia propose un CRM commun et laisse chaque métier activer ce dont il a besoin.",
        items: [
          {
            title: "Agence de transaction et de gestion",
            text: `Mandats de gestion et de vente, rapprochement entre les demandes et le portefeuille, visites planifiées, annonces publiées vers votre site grâce à l'API d'annonces, puis passage du bien trouvé au bail. Le CRM est inclus dans le pack Agence, à partir de ${fcfa(agence.monthly)} HT par mois.`,
          },
          {
            title: "Promoteur",
            text: "Un programme se vend pendant des mois et se construit en parallèle. Le CRM suit les prospects, les visites et les relances ; le module Promoteur suit les lots, le budget et l'avancement du chantier. Voir le [CRM pour promoteur immobilier](/crm-promoteur-immobilier-cote-divoire).",
          },
          {
            title: "Les deux à la fois",
            text: "Un groupe qui construit, vend et gère ses biens garde un seul fichier de contacts et un seul parc de biens avec le pack Opérateur intégré.",
          },
        ],
      },
      {
        title: "Mandats, offres et compromis dans le même outil",
        intro:
          "La vente ne s'arrête pas à la visite. Quand l'agence vend pour le compte d'un propriétaire, le CRM accompagne l'affaire depuis la fiche du mandat jusqu'à l'acte, sans ressaisie ni fichier parallèle.",
        items: [
          { title: "Mandats de vente", text: "Prix demandé, prix plancher, commission et négociateur ; un numéro par année et un seul mandat actif par bien. Détail des [mandats de vente](/wiki/crm-et-ventes/mandats-de-vente)." },
          { title: "Offres d'achat", text: "Enregistrez les offres des acquéreurs, répondez par une contre-offre, acceptez ou refusez avec un motif. Chaque étape met à jour le statut du bien pour toute l'équipe." },
          { title: "Compromis de vente", text: "Prix, dépôt, notaire et date prévue de l'acte, avec les conditions suspensives à lever (l'obtention d'un prêt, par exemple) et l'échéancier de paiement de l'acquéreur. Voir [offres et compromis](/wiki/crm-et-ventes/offres-et-compromis-de-vente)." },
          { title: "Conclusion à l'acte", text: "Le bien passe en vendu, le mandat se termine, l'affaire est gagnée et la commission de vente est créée automatiquement." },
          { title: "Commissions", text: "Montant dû, règlements encaissés en une ou plusieurs fois et reste à percevoir. Voir les [commissions et le tableau des ventes](/wiki/crm-et-ventes/commissions-de-vente)." },
          { title: "Un pas vers la gestion", text: "Le bien loué ou le propriétaire signé rejoint la [gestion locative](/gestion-locative-cote-divoire) avec ses contacts et ses documents, sans nouvelle saisie." },
        ],
      },
      {
        title: "Relances par e-mail et WhatsApp",
        intro:
          "Un prospect non relancé est un prospect perdu. Le CRM garde la date de la prochaine action et la fait apparaître dans le calendrier et dans le tableau de bord, y compris quand elle est en retard.",
        items: [
          { title: "Une relance datée à chaque échange", text: "Après un appel ou une visite, vous indiquez la date de la prochaine action. Vous pouvez ensuite la reprogrammer ou la marquer comme faite." },
          { title: "Notifications par e-mail et WhatsApp", text: "Parmi les notifications automatiques de l'application, celles du CRM peuvent partir par e-mail et par WhatsApp. Vous choisissez lesquelles sont actives et vous adaptez leur texte. Voir les [notifications e-mail et WhatsApp](/wiki/communication-et-documents/notifications-email-whatsapp)." },
          { title: "Le groupe WhatsApp de l'agence", text: "Invitez en une fois vos contacts dans le groupe WhatsApp de l'agence et diffusez-y vos annonces." },
          { title: "Campagnes", text: "Vos listes de contacts reçoivent une campagne par e-mail, et par WhatsApp quand le contact a un numéro et a donné son accord." },
        ],
        note: "Les messages WhatsApp ne partent qu'aux contacts qui ont donné leur accord, et leur envoi suppose que le service WhatsApp soit configuré pour votre agence.",
      },
      {
        title: "ImmoTopia, Excel ou CRM généraliste : que choisir ?",
        intro: "Trois options reviennent dans les agences et chez les promoteurs. Voici leurs différences sur ce qui compte au quotidien.",
        table: {
          caption: "Comparaison d'ImmoTopia, d'Excel et d'un CRM généraliste pour un usage immobilier",
          head: ["", "Excel", "CRM généraliste", "ImmoTopia"],
          rows: [
            ["Contacts partagés par l'équipe", "Un fichier par personne, des copies qui divergent", "Oui, base commune", "Oui, un seul fichier pour toute l'agence"],
            ["Biens et mandats", "Colonnes à tenir à la main", "Souvent à construire avec des champs personnalisés", "Fiches par type de bien, mandats de gestion et de vente"],
            ["Demande d'un client et biens disponibles", "Recherche manuelle", "Rarement fourni d'origine", "Rapprochement avec un score expliqué"],
            ["Offres, compromis, commissions", "Dans des fichiers séparés", "À paramétrer", "Intégrés à la fiche du mandat"],
            ["Relances", "À la main", "E-mail en général, WhatsApp selon l'outil", "Relances datées, notifications e-mail et WhatsApp"],
            ["Après la vente ou la location", "Un autre fichier", "Un autre logiciel", "Gestion locative, syndic et chantiers dans la même base"],
            ["Traçabilité", "Une cellule écrasée ne laisse aucune trace", "Historique des modifications, selon l'outil", "Journal d'audit des actions sensibles"],
            ["Prix", "Gratuit", "Abonnement, variable selon l'outil", `Pack Agence à partir de ${fcfa(agence.monthly)} HT par mois`],
          ],
        },
        note: "La colonne « CRM généraliste » décrit des tendances d'ensemble, à vérifier outil par outil. Pour aller plus loin : [ImmoTopia vs Excel](/immotopia-vs-excel) et le [comparatif avec d'autres logiciels immobiliers](/comparatif).",
      },
      {
        title: "Relié au reste de l'agence",
        bullets: [
          "Le bien trouvé devient un bail en quelques clics.",
          "Les contacts qui ont accepté WhatsApp peuvent être invités dans le groupe WhatsApp de l'agence.",
          "Les résultats d'une recherche de contacts s'exportent en CSV.",
          "Les annonces publiées alimentent votre site grâce à l'[API d'annonces](/logiciel-annonces-immobilieres-cote-divoire).",
        ],
      },
      {
        title: "Combien coûte le CRM ?",
        paragraphs: [
          `Le CRM est inclus dans le pack Agence, à partir de ${fcfa(agence.monthly)} HT par mois pour ${agence.included.toLowerCase()}, et dans le pack Promoteur (${fcfa(promoteur.monthly)} HT par mois), qui y ajoute les chantiers. Le premier mois est offert, sans engagement, et les collaborateurs ne sont pas facturés à l'utilisateur. Voir [les tarifs et le simulateur](/tarifs).`,
        ],
      },
    ],
    faq: [
      {
        q: "Combien coûte un CRM immobilier avec ImmoTopia ?",
        a: `Le CRM est inclus dans le pack Agence, à partir de ${fcfa(agence.monthly)} HT par mois, et dans le pack Promoteur, à ${fcfa(promoteur.monthly)} HT par mois avec les chantiers. Les prix sont hors taxes, sans commission sur vos loyers ni sur le prix de vente. Détail et simulateur sur la page [Tarifs](/tarifs).`,
      },
      {
        q: "Existe-t-il un essai gratuit ou une démonstration ?",
        a: "Le premier mois d'abonnement est offert, sans engagement, sur tous les packs. Une démonstration gratuite de 30 minutes permet aussi de voir le CRM appliqué à votre portefeuille.",
      },
      {
        q: "Puis-je reprendre mon fichier de contacts Excel ?",
        a: `Vous pouvez saisir vous-même vos contacts, sans frais de prestation. La mise en route accompagnée, facultative (${fcfa(agence.setup)} HT pour le pack Agence, facturés une fois), comprend une reprise préparée de vos données dans un périmètre défini. Pour votre fichier précis, l'équipe l'étudie en démonstration.`,
      },
      {
        q: "Combien d'utilisateurs peut-on créer ?",
        a: "Le prix d'un pack dépend de sa capacité (logements sous mandat pour l'agence, chantiers et lots pour le promoteur), pas du nombre de comptes : les collaborateurs ne sont pas facturés à l'utilisateur.",
      },
      {
        q: "Peut-on travailler à plusieurs agents sur les mêmes contacts ?",
        a: "Oui. Tous les collaborateurs partagent le même fichier de contacts, chaque affaire a un collaborateur responsable et les listes se filtrent par collaborateur. Les rôles et permissions (administrateur, manager, agent, comptable) définissent ce que chacun voit et modifie. Si un collègue a modifié une affaire entre-temps, vous en êtes averti au lieu d'écraser son travail.",
      },
      {
        q: "Mes données sont-elles séparées de celles des autres agences ?",
        a: "Oui : les données de chaque organisation sont strictement séparées de celles des autres, et les actions sensibles sont enregistrées dans un journal d'audit. Vos listes de contacts s'exportent en CSV. Pour une exigence précise de conservation ou d'hébergement, posez la question lors de la démonstration.",
      },
    ],
    related: ["crm-promoteur-immobilier-cote-divoire", "logiciel-annonces-immobilieres-cote-divoire", "immotopia-vs-excel"],
  },
  {
    slug: "crm-promoteur-immobilier-cote-divoire",
    metaTitle: "CRM promoteur immobilier : prospects et lots | ImmoTopia",
    metaDescription:
      "CRM pour promoteur immobilier en Côte d'Ivoire : prospects, visites et relances, puis lots, coût de revient, budget et avancement du chantier.",
    eyebrow: "CRM promoteur",
    h1: "CRM pour promoteur immobilier en Côte d'Ivoire",
    intro:
      "Vendre un programme, c'est suivre des dizaines de prospects pendant que le chantier avance, coûte et se règle. ImmoTopia relie les deux dans un seul logiciel : le CRM suit les prospects, les visites et les relances ; le module Promoteur suit les lots, le coût de revient, le budget et l'avancement.",
    sections: [
      {
        title: "Pourquoi Excel ne suffit plus pour suivre un programme",
        intro: "Un tableur convient pour une première opération, pas pour plusieurs programmes.",
        items: [
          { title: "Des prospects dans tous les téléphones", text: "Appels, WhatsApp, visites : sans fichier commun, personne ne sait qui a été rappelé." },
          { title: "Un budget découvert trop tard", text: "Avec des dépenses saisies en fin de mois, un dépassement se voit après coup." },
          { title: "Le commercial et le chantier séparés", text: "Suivi commercial et travaux vivent dans des fichiers différents : la direction recoupe à la main." },
        ],
        note: "La comparaison complète est dans [ImmoTopia vs Excel](/immotopia-vs-excel).",
      },
      {
        title: "Suivre prospects, visites et relances",
        intro: "Le CRM du pack Promoteur est le même [logiciel CRM immobilier](/crm-immobilier-cote-divoire) que celui des agences.",
        items: [
          { title: "Prospects et contacts", text: "Une fiche par contact avec ses rôles, ses étiquettes, les zones et le budget recherchés, et tout l'historique des échanges." },
          { title: "Pipeline des affaires", text: "Nouveau, qualifié, visite, négociation, puis gagné ou perdu, avec le collaborateur responsable et l'entonnoir valorisé." },
          { title: "Visites et relances", text: "Visites et relances datées dans un calendrier commun, avec les relances en retard dans le tableau de bord." },
          { title: "Rapprochement", text: "ImmoTopia met en face le besoin d'un prospect (budget, zone, nombre de pièces, surface) et les biens disponibles, avec un [score expliqué](/wiki/crm-et-ventes/rapprochement-de-biens)." },
          { title: "Tableau de bord et recherches", text: "Nouveaux prospects, conversions, relances en retard, recherches enregistrées et export CSV des contacts, dans le [tableau de bord CRM](/wiki/crm-et-ventes/calendrier-et-tableau-de-bord-crm)." },
        ],
      },
      {
        title: "Du commercial au chantier : lots, coût de revient, budget, avancement",
        intro: "Le module Promoteur prolonge le CRM côté construction. Chaque chantier se découpe en lots, se budgète et se suit jusqu'à la clôture.",
        items: [
          { title: "Lots et coût de revient", text: "Découpez le chantier en lots, répartissez le coût réel à la surface ou par quote-part et connaissez le coût de revient de chaque lot. Voir [lots et coût de revient](/wiki/promotion-et-chantiers/lots-et-cout-de-revient)." },
          { title: "Budget et avenants", text: "Budget prévisionnel poste par poste, validé comme référence, puis révisé par des avenants datés et motivés. Voir le [budget de chantier](/wiki/promotion-et-chantiers/budget-de-chantier)." },
          { title: "Avancement et alertes", text: "Pourcentage d'avancement physique saisi à chaque point, courbe dans le temps et alertes quand les dépenses engagées dépassent un seuil du budget. Voir [avancement et tableau de bord](/wiki/promotion-et-chantiers/avancement-et-tableau-de-bord)." },
          { title: "Dépenses et pièces de caisse", text: "Dépenses suivies par poste, pièces de caisse émises, validées et imprimables. Voir les [dépenses de chantier](/wiki/promotion-et-chantiers/depenses-de-chantier)." },
          { title: "Stock, main-d'œuvre et tâcherons", text: "Réceptions et sorties de matériaux vers les chantiers, salaires, marchés et situations de travaux. Voir le [stock de matériaux](/wiki/promotion-et-chantiers/stock-de-materiaux) et les [tâcherons](/wiki/promotion-et-chantiers/tacherons)." },
          { title: "Retenues de garantie", text: "Retenue d'un pourcentage sur les factures fournisseurs et les situations de tâcherons, suivi par chantier, libération à l'échéance. Voir les [retenues de garantie](/wiki/promotion-et-chantiers/retenues-de-garantie)." },
        ],
        note: "En fin de chantier, chaque lot achevé peut être transféré au patrimoine avec son coût de revient définitif, sans ressaisie.",
      },
      {
        title: "Le tableau de bord du promoteur",
        paragraphs: [
          "Le [tableau de bord de chantier](/wiki/promotion-et-chantiers/avancement-et-tableau-de-bord) montre, chantier par chantier, le budget, les montants engagés, le coût réel, l'avancement et l'écart. Il peut se limiter aux chantiers en dépassement.",
          "Côté commercial, le tableau de bord CRM résume les nouveaux prospects, les conversions, les affaires gagnées et les relances en retard.",
        ],
        bullets: [
          "Budget, engagé, coût réel et écart par chantier.",
          "Alertes de dépassement de budget et courbe d'avancement.",
          "Prospects, conversions et relances en retard.",
        ],
      },
      {
        title: "CRM de promotion immobilière ou ERP ?",
        intro:
          "Un CRM de promotion immobilière suit surtout les prospects et le commercial. Un logiciel de promotion immobilière plus large suit aussi le chantier. Trois approches existent.",
        table: {
          caption: "Comparaison d'un CRM généraliste, d'un outil sur mesure et d'ImmoTopia pour un promoteur",
          head: ["", "CRM généraliste", "Outil sur mesure", "ImmoTopia"],
          rows: [
            ["Ce qu'il couvre", "Prospects et suivi commercial ; le chantier reste à part", "Ce que vous avez fait spécifier", "Prospects et suivi commercial, puis chantiers, lots, budget, stock et tâcherons"],
            ["Commercial et chantier ensemble", "Rarement : deux outils à relier", "Oui, si le cahier des charges le prévoit", "Oui : mêmes contacts, même base"],
            ["Coût", "Abonnement, variable selon l'outil", "Investissement initial, puis maintenance", `Abonnement mensuel en FCFA, pack Promoteur à partir de ${fcfa(promoteur.monthly)} HT`],
          ],
        },
        note: "Les colonnes « CRM généraliste » et « Outil sur mesure » décrivent des tendances d'ensemble, qui varient selon l'outil ou le prestataire. Pour comparer avec d'autres logiciels immobiliers, voir le [comparatif](/comparatif).",
      },
      {
        title: "Tarifs du pack Promoteur",
        paragraphs: [
          `Le pack Promoteur coûte ${fcfa(promoteur.monthly)} HT par mois. Il comprend ${promoteur.included}. Au-delà, chaque chantier actif supplémentaire coûte ${fcfa(chantierSup)} HT par mois, et chaque bloc de 10 lots ${fcfa(blocLots)} HT par mois.`,
          `La mise en route accompagnée est facultative (${fcfa(promoteur.setup)} HT, facturés une fois). Le premier mois est offert, sans engagement, et les collaborateurs ne sont pas facturés à l'utilisateur. Pour construire, vendre et gérer, voir le pack Opérateur intégré (${fcfa(integre.monthly)} HT par mois). Voir [tous les tarifs](/tarifs).`,
        ],
      },
    ],
    faq: [
      {
        q: "Quelle différence entre un CRM d'agence et un CRM pour promoteur ?",
        a: "Le CRM est le même : contacts, pipeline, visites, relances et rapprochement. Le promoteur y ajoute le module chantiers : lots, budget, avancement, dépenses, stock, tâcherons et retenues de garantie. L'agence y ajoute les mandats, les offres et les compromis quand elle vend pour le compte d'un propriétaire, ainsi que la gestion locative.",
      },
      {
        q: "Peut-on suivre plusieurs programmes en même temps ?",
        a: `Oui. Le pack Promoteur comprend ${promoteur.included} ; chaque chantier actif supplémentaire coûte ${fcfa(chantierSup)} HT par mois. Le tableau de bord les présente dans un même écran.`,
      },
      {
        q: "Le coût de revient de chaque lot est-il calculé ?",
        a: "Oui. Le coût réel du chantier vient des dépenses imputées ; vous choisissez la clé de répartition entre les lots (à la surface ou par quote-part saisie) et le coût de revient de chaque lot s'affiche. Après la clôture du chantier, un lot peut être transféré au patrimoine avec son coût définitif.",
      },
      {
        q: "Combien coûte le pack Promoteur ?",
        a: `${fcfa(promoteur.monthly)} HT par mois, avec ${promoteur.included}. Les extensions sont détaillées sur la page [Tarifs](/tarifs), avec un simulateur.`,
      },
      {
        q: "Y a-t-il un essai gratuit ?",
        a: "Le premier mois d'abonnement est offert, sans engagement. Une démonstration gratuite de 30 minutes permet aussi de voir le CRM et le suivi de chantier appliqués à votre programme.",
      },
      {
        q: "Peut-on reprendre mes fichiers Excel de chantier ?",
        a: "Vous pouvez saisir vous-même vos données, sans frais. La mise en route accompagnée du pack Promoteur couvre deux chantiers, la nomenclature des coûts et des stocks et la formation des équipes ; un historique plus complexe fait l'objet d'un devis.",
      },
    ],
    related: ["crm-immobilier-cote-divoire", "immotopia-vs-excel", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "paiement-loyer-charges-mobile-money-cote-divoire",
    metaTitle: "Loyers et charges par Mobile Money en Côte d'Ivoire",
    metaDescription:
      "Suivez les loyers payés par Orange Money, MTN MoMo, Moov Money et Wave : enregistrement, déclaration du locataire, validation et relances dans ImmoTopia.",
    eyebrow: "Mobile Money",
    h1: "Paiement des loyers et charges par Mobile Money en Côte d'Ivoire",
    intro:
      "En Côte d'Ivoire, une grande partie des loyers passe par le Mobile Money. ImmoTopia en fait un moyen de paiement à part entière : chaque règlement est rattaché au bon bail et à la bonne échéance, avec son opérateur.",
    sections: [
      {
        title: "Comment ça fonctionne",
        items: [
          { title: "1. Le locataire paie", text: "Par Orange Money, MTN MoMo, Moov Money ou Wave, comme il en a l'habitude." },
          { title: "2. Il déclare son paiement", text: "Depuis son portail, il indique le montant, l'opérateur et la référence de la transaction." },
          { title: "3. L'agence valide", text: "La déclaration arrive dans la file « À traiter aujourd'hui » ; une fois validée, l'échéance est soldée." },
          { title: "4. Tout le monde est informé", text: "Confirmation de paiement par e-mail ou WhatsApp, et situation à jour dans les portails." },
        ],
      },
      {
        title: "Ce que vous y gagnez",
        bullets: [
          "Chaque paiement rattaché à son bail et à ses échéances, même partiel.",
          "La répartition des encaissements par moyen de paiement dans le tableau de bord.",
          "Des relances automatiques avant et après l'échéance.",
          "Le même fonctionnement pour les charges de copropriété.",
        ],
        note: "ImmoTopia enregistre et suit les paiements Mobile Money. L'encaissement en ligne avec confirmation automatique par l'opérateur n'est pas proposé aujourd'hui : parlez-en avec l'équipe en démonstration.",
      },
    ],
    faq: [
      { q: "Quels opérateurs sont pris en charge ?", a: "Orange Money, MTN Mobile Money, Moov Money et Wave, ainsi que les espèces, virements, chèques et cartes." },
      { q: "ImmoTopia prend-il une commission sur les loyers ?", a: "Non, aucune. Vous payez un abonnement mensuel en FCFA." },
    ],
    related: ["gestion-locative-cote-divoire", "logiciel-syndic-copropriete-cote-divoire", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "maintenance-immobiliere-ticketing-cote-divoire",
    metaTitle: "Maintenance immobilière : tickets d'incident, Côte d'Ivoire",
    metaDescription:
      "Maintenance en Côte d'Ivoire : tickets avec photos et priorités, prestataires, fil d'échange et notifications, en location comme en copropriété.",
    eyebrow: "Maintenance",
    h1: "Maintenance immobilière en Côte d'Ivoire : tickets, prestataires et suivi centralisé",
    intro:
      "Une fuite, une panne, une porte qui ferme mal : avec ImmoTopia, chaque demande devient un ticket suivi de bout en bout, visible par l'agence, le locataire et le propriétaire.",
    sections: [
      {
        title: "Du signalement à la clôture",
        items: [
          { title: "Signalement depuis le portail", text: "Le locataire ouvre un ticket avec photos depuis son portail ; l'agence peut aussi en créer." },
          { title: "Catégories et priorités", text: "Plomberie, électricité… et priorité urgente, haute, moyenne ou basse." },
          { title: "Prestataires", text: "Annuaire des prestataires et affectation de l'intervention." },
          { title: "Fil d'échange", text: "Commentaires et pièces jointes entre l'agence, le locataire et le propriétaire, avec l'historique des statuts." },
          { title: "Notifications", text: "Chaque partie est prévenue par e-mail ou WhatsApp à chaque étape." },
          { title: "Copropriété", text: "Incidents des parties communes avec imputation des coûts, contrats de maintenance et équipements." },
        ],
      },
      {
        title: "Deux vues, un seul ticket",
        bullets: [
          "« Tickets de l'agence » pour le gestionnaire, avec les urgences en tête.",
          "« Mes demandes » pour le locataire, qui suit l'avancement sans appeler.",
          "Le propriétaire voit les tickets en cours sur ses biens dans son portail.",
        ],
      },
    ],
    faq: [
      { q: "Le locataire doit-il télécharger une application ?", a: "Non, son portail s'ouvre depuis le navigateur de son téléphone." },
      { q: "La maintenance est-elle dans tous les packs ?", a: "Oui, la maintenance et les interventions sont incluses dans tous les packs." },
    ],
    related: ["gestion-locative-cote-divoire", "logiciel-syndic-copropriete-cote-divoire", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "tableaux-de-bord-kpi-immobilier-cote-divoire",
    metaTitle: "Tableaux de bord et KPI immobilier en Côte d'Ivoire",
    metaDescription:
      "Pilotez votre activité : impayés, encaissements face à l'objectif, occupation, trésorerie sur 12 mois, pipeline commercial et tickets dans ImmoTopia.",
    eyebrow: "Pilotage",
    h1: "Tableaux de bord immobilier en Côte d'Ivoire : vos KPI d'un coup d'œil",
    intro:
      "Le tableau de bord d'ImmoTopia est un poste de travail : les chiffres qui comptent en haut, et en dessous la liste de ce qu'il faut traiter aujourd'hui.",
    sections: [
      {
        title: "Les indicateurs de tête",
        items: [
          { title: "Impayés", text: "Montant et nombre d'échéances en retard." },
          { title: "À encaisser sous 7 jours", text: "Ce qui doit rentrer dans la semaine." },
          { title: "Encaissé du mois", text: "Comparé à votre objectif mensuel." },
          { title: "Parc", text: "Nombre de biens, taux d'occupation et biens publiés." },
          { title: "Commercial", text: "Contacts et affaires en cours." },
          { title: "Service", text: "Tickets ouverts et déclarations de paiement à valider." },
        ],
      },
      {
        title: "« À traiter aujourd'hui »",
        intro:
          "Une seule file de travail qui réunit les échéances en retard, les tickets de maintenance et les déclarations de paiement à valider. Plus besoin de chercher dans cinq écrans.",
      },
      {
        title: "Les analyses",
        bullets: [
          "Trésorerie sur 12 mois : encaissé face à attendu.",
          "Échéances par statut et encaissements par moyen de paiement.",
          "Parc par statut et par type de bien.",
          "Entonnoir commercial et contacts par catégorie.",
          "Tickets par priorité et taux de recouvrement des appels de charges.",
          "Tableaux de bord dédiés : CRM, patrimoine, portails propriétaire et locataire.",
        ],
      },
    ],
    faq: [
      { q: "Chaque collaborateur voit-il les mêmes chiffres ?", a: "Le tableau de bord s'adapte au rôle : un agent ne voit pas la même chose qu'un directeur ou un comptable." },
      { q: "Les propriétaires ont-ils un tableau de bord ?", a: "Oui, dans leur portail : leurs biens, leurs revenus avec graphiques, et les tickets en cours." },
    ],
    related: ["crm-immobilier-cote-divoire", "gestion-locative-cote-divoire", "logiciel-immobilier-cote-divoire"],
  },
  {
    slug: "logiciel-immobilier-afrique",
    metaTitle: "Logiciel immobilier en Afrique : local ou étranger ?",
    metaDescription:
      "Logiciel immobilier en Afrique de l'Ouest : pourquoi une solution conçue localement (FCFA, Mobile Money, WhatsApp) s'adapte mieux. Critères et vigilance.",
    eyebrow: "Afrique",
    h1: "Logiciel immobilier en Afrique : solution locale ou étrangère ?",
    intro:
      "Les logiciels immobiliers européens sont solides, mais pensés pour d'autres usages : prélèvements bancaires, courriers recommandés, comptabilité française. En Afrique de l'Ouest, les habitudes de paiement et de communication sont différentes.",
    sections: [
      {
        title: "Ce qui change en Afrique de l'Ouest",
        items: [
          { title: "Les paiements", text: "Le Mobile Money et les espèces dominent ; le prélèvement bancaire reste rare." },
          { title: "La communication", text: "WhatsApp est souvent plus lu que l'e-mail." },
          { title: "La monnaie et les prix", text: "Un abonnement en euros pèse lourd ; un prix en FCFA reste lisible." },
          { title: "L'accompagnement", text: "La mise en route et la formation se font mieux avec une équipe sur le même fuseau horaire." },
        ],
      },
      {
        title: "La réponse d'ImmoTopia",
        bullets: [
          "Conçu à Abidjan par Alliance Consultants.",
          "Prix en FCFA, sans commission sur les loyers.",
          "Mobile Money (Orange Money, MTN MoMo, Moov Money, Wave) reconnu partout.",
          "Relances et notifications par WhatsApp et e-mail.",
          "Interface en français, avec l'anglais et l'arabe disponibles.",
          "Application web utilisable sur téléphone, sans installation.",
        ],
      },
    ],
    faq: [
      { q: "ImmoTopia fonctionne-t-il hors de Côte d'Ivoire ?", a: "L'application est en ligne et utilisable depuis n'importe quel pays ; les prix sont en FCFA. Pour un projet hors de Côte d'Ivoire, parlez-en avec l'équipe." },
    ],
    related: ["logiciel-immobilier-cote-divoire", "meilleur-logiciel-immobilier-cote-divoire", "paiement-loyer-charges-mobile-money-cote-divoire"],
  },
  {
    slug: "immotopia-vs-excel",
    metaTitle: "ImmoTopia vs Excel : pourquoi passer à un ERP immobilier",
    metaDescription:
      "Excel suffit pour démarrer, pas pour piloter une agence. Comparez Excel et ImmoTopia : CRM, loyers, syndic, Mobile Money, relances et tableaux de bord.",
    eyebrow: "Comparaison",
    h1: "ImmoTopia vs Excel : quel outil pour gérer l'immobilier en Côte d'Ivoire ?",
    intro:
      "Excel est gratuit, souple et connu de tous. Mais au-delà de quelques dizaines de biens, les fichiers se multiplient, les versions divergent et les impayés passent entre les mailles.",
    sections: [
      {
        title: "Excel ou ImmoTopia, point par point",
        items: [
          { title: "Données partagées", text: "Excel : un fichier par personne, des copies qui divergent. ImmoTopia : une seule base, à jour pour toute l'équipe." },
          { title: "Impayés", text: "Excel : il faut chercher. ImmoTopia : les retards remontent seuls dans le tableau de bord." },
          { title: "Relances", text: "Excel : messages envoyés à la main. ImmoTopia : rappels e-mail et WhatsApp automatiques." },
          { title: "Documents", text: "Excel : quittances retapées. ImmoTopia : générées depuis vos modèles, numérotées." },
          { title: "Clients", text: "Excel : les clients appellent pour savoir. ImmoTopia : ils consultent leur portail." },
          { title: "Traçabilité", text: "Excel : une cellule écrasée ne laisse aucune trace. ImmoTopia : journal d'audit des actions sensibles." },
        ],
      },
      {
        title: "Passer d'Excel à ImmoTopia",
        bullets: [
          "Vos fichiers existants servent de base : la mise en route comprend la reprise de vos biens, contacts, baux ou copropriétés.",
          "Si vous saisissez vous-même vos données, la mise en route est gratuite.",
          "Premier mois offert, sans engagement : vous comparez sur votre propre activité.",
        ],
      },
    ],
    faq: [
      { q: "Puis-je garder Excel pour certains tableaux ?", a: "Oui : les contacts s'exportent en CSV ou Excel, et les tableaux de bord intégrés remplacent la plupart des tableaux croisés." },
    ],
    related: ["gestion-locative-vs-excel", "logiciel-immobilier-cote-divoire", "meilleur-logiciel-immobilier-cote-divoire"],
  },
  {
    slug: "gestion-locative-vs-excel",
    metaTitle: "Gestion locative : Excel ou logiciel ? | ImmoTopia",
    metaDescription:
      "Excel suffit pour débuter, mais devient risqué pour suivre loyers, impayés et quittances. Comparez Excel et ImmoTopia : échéancier, relances, portails.",
    eyebrow: "Comparaison",
    h1: "Gestion locative : Excel ou logiciel, que choisir en Côte d'Ivoire ?",
    intro:
      "Avec cinq appartements, un tableur suffit. Avec cinquante, chaque mois devient une course aux paiements, aux relances et aux quittances. Voici à quel moment un logiciel devient rentable.",
    sections: [
      {
        title: "Les signes qu'Excel ne suffit plus",
        bullets: [
          "Vous découvrez un impayé plusieurs semaines après l'échéance.",
          "Vous ne savez plus quel paiement Mobile Money correspond à quel locataire.",
          "Vos quittances sont retapées chaque mois.",
          "Deux collaborateurs travaillent sur deux versions du même fichier.",
          "Les propriétaires vous appellent pour connaître leur situation.",
        ],
      },
      {
        title: "Ce qu'apporte ImmoTopia",
        items: [
          { title: "Échéancier automatique", text: "Généré depuis le bail, avec le statut et le reste à payer de chaque échéance." },
          { title: "Paiements rattachés", text: "Chaque règlement, Mobile Money compris, est affecté aux bonnes échéances." },
          { title: "Relances automatiques", text: "Rappels avant l'échéance et en cas de retard, par e-mail et WhatsApp." },
          { title: "Pénalités calculées", text: "Selon vos règles, avec période de grâce." },
          { title: "Documents générés", text: "Quittances et reçus depuis vos modèles Word, numérotés." },
          { title: "Portails", text: "Propriétaires et locataires consultent eux-mêmes leur situation." },
        ],
      },
    ],
    faq: [
      { q: "À partir de combien de logements un logiciel est-il rentable ?", a: "Dès que les relances et la recherche de paiements vous prennent plus de quelques heures par mois. Le pack Agence inclut 100 logements pour 29 900 FCFA HT par mois." },
    ],
    related: ["gestion-locative-cote-divoire", "immotopia-vs-excel", "paiement-loyer-charges-mobile-money-cote-divoire"],
  },
];

export const landingBySlug = (slug: string) => landings.find((l) => l.slug === slug);

// Le sélecteur de langue doit connaître chaque page publiée en français seulement
for (const l of landings) {
  if (!frenchOnlyPaths.includes(`/${l.slug}`)) throw new Error(`Ajouter /${l.slug} dans src/lib/french-only.ts`);
}

/* ------------------------------------------------------------------ FAQ générale */

export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Général",
    items: [
      {
        q: "Qu'est-ce qu'ImmoTopia ?",
        a: "Un logiciel de gestion immobilière en ligne (ERP en abonnement) pour les professionnels : transaction, gestion locative, syndic de copropriété et promotion, avec CRM, portails clients, maintenance et communication e-mail et WhatsApp.",
      },
      {
        q: "Qui peut utiliser ImmoTopia ?",
        a: "Les agences immobilières, gestionnaires locatifs, cabinets de syndic, promoteurs et groupes qui cumulent ces métiers. Leurs propriétaires et locataires accèdent gratuitement à leurs portails.",
      },
      { q: "Qui édite ImmoTopia ?", a: "Alliance Consultants, société basée à Abidjan (RCCM CI-ABJ-2014-B-20956)." },
    ],
  },
  {
    title: "Tarifs et engagement",
    items: [
      {
        q: "Combien coûte ImmoTopia ?",
        a: "Six packs, en FCFA HT par mois : Patrimoine Essentiel 9 900 (particuliers, diaspora), Patrimoine Pro 29 900 (entreprises, institutionnels), Agence 29 900, Syndic 49 900, Promoteur 149 900 et Opérateur intégré 249 900. Un simulateur est disponible sur la page Tarifs.",
      },
      {
        q: "Je suis un particulier ou je vis à l'étranger : quel pack ?",
        a: "Patrimoine Essentiel : 9 900 FCFA HT par mois pour 10 biens détenus en propre, loués ou non, avec vue patrimoniale (valeur des biens, emprunts, ratios bancaires, projections par bien), gestion locative directe de vos propres biens (baux, loyers, quittances), documents, finance, maintenance et communication. Pas de mandat de gestion ni de propriétaire tiers. La valeur nette et les projections consolidées sont en développement.",
      },
      {
        q: "Quelle est la différence entre Patrimoine Essentiel et Patrimoine Pro ?",
        a: "Le Pro (29 900 FCFA HT par mois) couvre 100 biens détenus en propre, pour les entreprises et institutionnels ; l'Essentiel (9 900) en couvre 10. Les fonctionnalités et la limite sont les mêmes (gestion de vos propres biens : ni mandat ni propriétaire tiers). Les deux ne se cumulent pas : on passe de l'un à l'autre par changement de pack.",
      },
      {
        q: "Que se passe-t-il si je dépasse la capacité de mon pack ?",
        a: "Le dépassement est facturé, pas bloqué. Des extensions à la carte existent : bloc de 10 lots (1 500 FCFA par mois), copropriété supplémentaire (10 000), chantier supplémentaire (40 000), bloc de 10 biens détenus (9 900 avec Patrimoine Essentiel ; 2 990 de dépassement avec le Pro).",
      },
      {
        q: "Les prix incluent-ils la TVA ?",
        a: "Non : les prix sont hors taxes. Les factures sont émises par Alliance Consultants, avec une TVA de 18 % ajoutée.",
      },
      { q: "Y a-t-il une période d'essai ?", a: "Le premier mois d'abonnement est offert (essai de 30 jours) sur tous les packs, sans engagement." },
      { q: "Y a-t-il une remise en annuel ?", a: "Oui : en paiement annuel d'avance, vous payez 11 mensualités pour 12 mois. Les packs combinés bénéficient de 10 % de remise sur le prix de base du pack le moins cher." },
      { q: "ImmoTopia prend-il une commission sur les loyers ?", a: "Non. Les comptes collaborateurs, propriétaires et locataires ne sont pas facturés non plus." },
      { q: "WhatsApp est-il inclus ?", a: "Les e-mails sont inclus ; les messages WhatsApp sont facturés à la consommation." },
    ],
  },
  {
    title: "Fonctionnalités",
    items: [
      {
        q: "Comment fonctionne la gestion locative ?",
        a: "Chaque bail génère son échéancier. Les paiements, par tous moyens dont le Mobile Money, soldent les échéances ; les pénalités, relances et quittances suivent automatiquement.",
      },
      {
        q: "Comment sont gérés les paiements Mobile Money ?",
        a: "Le paiement est enregistré avec son opérateur (Orange Money, MTN MoMo, Moov Money, Wave), ou déclaré par le locataire depuis son portail puis validé par l'agence.",
      },
      {
        q: "Le module syndic gère-t-il les assemblées générales ?",
        a: "Oui : ordre du jour, résolutions, votes et pouvoirs par lot, quorum et compte rendu archivé, en plus des tantièmes, budgets, appels de charges et de la comptabilité de copropriété.",
      },
      { q: "Peut-on publier des annonces ?", a: "Oui, et une API d'annonces alimente votre site internet. La publication d'un bien peut aussi être diffusée dans le groupe WhatsApp de l'agence." },
      {
        q: "Et le module Promoteur ?",
        a: "Les chantiers, le stock de matériaux, les tâcherons et la finance opérationnelle sont en cours de déploiement. Parlez-en avec l'équipe en démonstration.",
      },
    ],
  },
  {
    title: "Utilisation et sécurité",
    items: [
      { q: "Faut-il installer un logiciel ?", a: "Non. ImmoTopia s'utilise depuis un navigateur, sur ordinateur, tablette ou téléphone." },
      { q: "Puis-je gérer plusieurs collaborateurs ?", a: "Oui, avec des rôles (administrateur, manager, agent, comptable) et des permissions par domaine." },
      {
        q: "Mes données sont-elles protégées ?",
        a: "Mots de passe chiffrés, sessions limitées dans le temps, limitation des tentatives de connexion, contrôle d'accès par rôle, cloisonnement strict entre organisations et journal d'audit.",
      },
      { q: "Dans quelles langues ?", a: "En français, avec l'anglais et l'arabe disponibles dans l'application." },
    ],
  },
  {
    title: "Démarrage",
    items: [
      {
        q: "Comment reprendre mes données existantes ?",
        a: "La mise en route accompagnée comprend la reprise de vos biens, contacts, baux ou copropriétés et la formation. Elle est gratuite si vous saisissez vous-même vos données.",
      },
      { q: "Comment voir l'application ?", a: "Réservez une démonstration de 30 minutes : nous vous montrons ImmoTopia appliqué à votre portefeuille." },
    ],
  },
];
