/**
 * Pages thématiques reprises de l'ancien site, à leurs URL d'origine (référencement acquis).
 * Contenu en français uniquement. Règle éditoriale : on présente ce qui existe et ce qui est
 * en cours de déploiement (en le disant, sans date) ; jamais ce qui n'existe pas.
 */

import { fcfa } from "./format";
import { frenchOnlyPaths } from "./french-only";
import { extensions, packs, promoteurPrice, type PackId } from "./pricing";

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
const patrimoineEssentiel = pack("patrimoine-essentiel");
const patrimoinePro = pack("patrimoine-pro");
const integre = pack("integre");
const chantierSup = promoteurPrice(3, 150) - promoteurPrice(2, 150); // un chantier actif de plus
const blocLots = promoteurPrice(2, 160) - promoteurPrice(2, 150); // un bloc de 10 lots de plus
const ext = (start: string) => extensions.find((e) => e.name.fr.startsWith(start))!;
const extSignature = ext("Signatures"); // bloc de 50 signatures
const extVisio = ext("Visio");
const extBiens = ext("Bloc de 10 biens");
const extInventaire = ext("Inventaire WhatsApp"); // bloc de 500 photos

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
          {
            title: "États des lieux d'entrée et de sortie",
            text: "Pièces, compteurs, clés et photos par pièce, signature électronique (option payante) et export PDF, depuis un ordinateur, un téléphone ou une tablette, avec la comparaison entrée / sortie. Voir la [fiche du wiki](/wiki/gestion-locative/etats-des-lieux) et le [guide des critères de choix](/guides/logiciel-etat-des-lieux-comparatif).",
          },
          {
            title: "Signature électronique des baux, états des lieux et mandats",
            text: `Envoyez un bail, un état des lieux ou un mandat de gestion à signer à distance, suivez les demandes dans l'écran Signatures et laissez les rappels partir aux signataires. C'est une option payante, avec tous les packs : « ${extSignature.name.fr} », ${extSignature.price.fr} HT, aucune signature n'étant incluse dans un pack. Voir la [fiche du wiki](/wiki/gestion-locative/signature-electronique).`,
          },
          {
            title: "Prélèvement bancaire des loyers",
            text: "Mandats de prélèvement par bail, remises de prélèvement et prénotification : ImmoTopia prépare la remise, prévient les locataires et produit le fichier à déposer à la banque de l'agence, qui la marque ensuite comme déposée. Sans commission ImmoTopia. Inclus dans la gestion locative (packs Agence, Opérateur intégré, Patrimoine Essentiel et Pro). Voir la [fiche du wiki](/wiki/gestion-locative/prelevement-bancaire).",
          },
          { title: "Renouvellement, avenant et résiliation du bail", text: "Le bail se renouvelle, se modifie par avenant ou se résilie depuis l'application, avec l'historique conservé. Une échéance déjà réglée n'est jamais modifiée ; la résiliation contre-passe les échéances futures." },
          { title: "Honoraires, compte courant et reversements", text: "Honoraires de gestion à trois niveaux (le bail l'emporte sur le propriétaire, qui l'emporte sur l'agence ; pourcentage ou forfait), compte courant de chaque propriétaire visible dans son portail, et reversements numérotés, plafonnés au solde dû." },
          { title: "Révision du loyer, solde de tout compte et historique du bail", text: "Une révision de loyer recalcule les échéances non réglées à partir du mois choisi (une révision à date future est planifiée). Chaque événement du bail est tracé dans son historique, et le solde de tout compte estime, en fin de bail, la somme à rendre au locataire : dépôt détenu, arriérés et retenues de l'état des lieux de sortie." },
          { title: "Comptabilité de l'agence et export comptable", text: "Journal, grand livre et balance consultables sur la période de votre choix, avec les écritures de la gestion locative (loyers, honoraires, dépenses et reversements), passées automatiquement pour les biens sous mandat comme pour les biens en propre, et exportables en CSV ou en Excel pour votre cabinet comptable. Vous réglez l'assujettissement et le taux de TVA de l'agence, ainsi que les comptes comptables de la gestion locative." },
          { title: "Quittances et documents", text: "Quittances, reçus, contrats et avenants générés depuis vos propres modèles Word, avec numérotation continue." },
          { title: "Relances e-mail et WhatsApp", text: "Rappel avant l'échéance, confirmation de paiement, alerte de fin de bail : les messages partent seuls, selon le consentement de chaque destinataire." },
          { title: "Portails propriétaire et locataire", text: "Chacun consulte ses baux, échéances, paiements et documents. Les comptes propriétaires et locataires ne sont pas facturés." },
        ],
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
        q: "Les baux peuvent-ils être signés électroniquement ?",
        a: `Oui : le bail, l'état des lieux et le mandat de gestion s'envoient à signer à distance, avec un suivi dans l'écran Signatures. C'est une option payante : « ${extSignature.name.fr} », ${extSignature.price.fr} HT, avec tous les packs.`,
      },
      {
        q: "Peut-on prélever les loyers sur le compte bancaire du locataire ?",
        a: "Oui, avec un mandat de prélèvement par bail. ImmoTopia prépare la remise, prévient les locataires (prénotification) et produit le fichier à déposer à la banque de l'agence, qui la marque ensuite comme déposée ; le suivi du retour de la banque n'est pas inclus. Le prélèvement bancaire est inclus dans la gestion locative et ImmoTopia ne prend aucune commission.",
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
          { title: "Gestion locative", text: "Baux, échéancier, paiements, prélèvement bancaire des loyers, pénalités, cautions, quittances, relevés de gérance et signature électronique en option." },
          { title: "Syndic de copropriété", text: "Lots et tantièmes, budgets, appels de charges payables par Mobile Money, recouvrement, assemblées générales en direct avec vote en ligne et comptabilité de copropriété." },
          { title: "Maintenance", text: "Tickets avec photos et priorités, prestataires, fil d'échange et notifications à chaque étape." },
          { title: "Patrimoine", text: "Suivi des biens détenus en propre : valeur, emprunts, assurances, trésorerie. Voir le [logiciel de gestion de patrimoine immobilier](/logiciel-gestion-patrimoine-immobilier-cote-divoire)." },
          { title: "Promotion", text: "Chantiers, lots, budget, stock et tâcherons du module Promoteur. Voir le [logiciel promoteur immobilier](/logiciel-promoteur-immobilier-cote-divoire)." },
          { title: "Communication", text: "Rappels et notifications par e-mail et WhatsApp, newsletter, historique de tous les messages." },
        ],
      },
      {
        title: "Pensé pour la Côte d'Ivoire",
        bullets: [
          "Prix en FCFA, sans commission sur vos loyers.",
          "Mobile Money reconnu partout : Orange Money, MTN MoMo, Moov Money et Wave.",
          "WhatsApp intégré, le canal que vos clients lisent vraiment.",
          "Application web : ordinateur, tablette et téléphone, sans magasin d'applications, et installable sur l'écran d'accueil du téléphone.",
          "Tous les tableaux s'exportent en Excel, CSV ou PDF.",
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
      { q: "Faut-il installer quelque chose ?", a: "Non. ImmoTopia s'utilise depuis un navigateur, sur ordinateur, tablette ou téléphone, et peut aussi s'installer sur l'écran d'accueil du téléphone comme une application, sans passer par un magasin d'applications." },
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
          { title: "Paiement en ligne des charges", text: "Le copropriétaire règle son appel de charges par Mobile Money depuis le lien « Payer cet appel » ou son portail ; le paiement revient au bon lot et les fonds sont reversés vers le compte bancaire de la copropriété. ImmoTopia ne prend aucune commission. Voir [payer un appel de charges](/wiki/portails-clients/payer-un-appel-de-charges)." },
          { title: "Compte par lot", text: "Relevé, transactions et ajustements pour chaque copropriétaire." },
          { title: "Portail copropriétaire", text: "Chaque copropriétaire invité suit en ligne ses lots, ses appels de charges, ses reçus et les procès-verbaux d'assemblée dans le [portail de la copropriété](/wiki/portails-clients/portail-coproprietaire), et peut régler un appel de charges par Mobile Money." },
        ],
      },
      {
        title: "Assemblées générales et comptabilité",
        items: [
          { title: "Assemblées générales", text: "Ordre du jour, résolutions, votes et pouvoirs par lot, calcul du quorum et compte rendu archivé." },
          { title: "Assemblée en direct et vote en ligne", text: "Émargement en ligne, quorum calculé en temps réel, vote de chaque copropriétaire par lien personnel, sans compte, et écran de projection pour la salle. Voir l'[assemblée par lien personnel](/wiki/portails-clients/assemblee-par-lien-personnel)." },
          { title: "Visio des assemblées", text: `Salle de visio avec main levée et parole donnée par le gestionnaire, discussion écrite modérée et enregistrement de la séance. C'est une option payante : ${extVisio.price.fr} HT par cabinet, toutes copropriétés confondues. Voir la [fiche du wiki](/wiki/syndic-copropriete/visio-des-assemblees).` },
          { title: "Comptabilité de copropriété", text: "Plan de comptes, journaux, écritures en partie double verrouillables, grand livre et balance." },
          { title: "Parties communes", text: "Incidents avec imputation des coûts, prestataires, contrats de maintenance et équipements." },
        ],
      },
    ],
    faq: [
      { q: "Combien coûte le pack Syndic ?", a: "49 900 FCFA HT par mois pour 2 copropriétés et 100 lots, puis 10 000 FCFA par copropriété et 150 FCFA par lot supplémentaires. Le premier mois est offert, sans engagement." },
      { q: "Je fais aussi de la gestion locative : dois-je payer deux fois ?", a: "Les packs Agence et Syndic se combinent avec 10 % de remise sur le moins cher des deux, et vos contacts restent communs." },
      { q: "Les copropriétaires peuvent-ils payer leurs charges en ligne ?", a: "Oui, par Mobile Money, depuis le lien « Payer cet appel » ou leur portail. Le paiement est rattaché au bon lot, les fonds sont reversés vers le compte bancaire de la copropriété et ImmoTopia ne prend aucune commission. Inclus dans les packs Syndic et Opérateur intégré." },
      { q: "Peut-on tenir l'assemblée générale en visioconférence ?", a: `Oui. L'assemblée en direct, avec émargement et vote en ligne, est incluse dans le pack Syndic. La visio (salle, discussion modérée, enregistrement) est une option payante à ${extVisio.price.fr} HT par cabinet.` },
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
        note: "Les messages WhatsApp ne partent qu'aux contacts qui ont donné leur accord, et leur envoi suppose que le service WhatsApp soit configuré pour votre agence. Fréquence et exemples de messages : [guide des relances en CRM immobilier](/guides/crm-immobilier-relances).",
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
        note: "La colonne « CRM généraliste » décrit des tendances d'ensemble, à vérifier outil par outil. Pour choisir, le guide [Comment choisir son CRM immobilier](/guides/crm-immobilier-bonnes-pratiques) détaille dix critères. Pour aller plus loin : [ImmoTopia vs Excel](/immotopia-vs-excel) et le [comparatif avec d'autres logiciels immobiliers](/comparatif).",
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
          { title: "Inventaire de chantier par WhatsApp", text: `Le chef de chantier envoie des photos du stock sur WhatsApp et l'IA propose le comptage, à valider. C'est une option payante : « ${extInventaire.name.fr} », ${extInventaire.price.fr} HT, cumulable. Voir l'[inventaire par WhatsApp](/wiki/promotion-et-chantiers/inventaire-par-whatsapp).` },
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
        note: "Les colonnes « CRM généraliste » et « Outil sur mesure » décrivent des tendances d'ensemble, qui varient selon l'outil ou le prestataire. Pour choisir, voir le guide [Comment choisir son CRM immobilier](/guides/crm-immobilier-bonnes-pratiques) ; pour comparer avec d'autres logiciels immobiliers, voir le [comparatif](/comparatif).",
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
    related: ["crm-immobilier-cote-divoire", "logiciel-promoteur-immobilier-cote-divoire", "immotopia-vs-excel"],
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
          "Pour les charges de copropriété, le copropriétaire peut aussi payer en ligne par Mobile Money, sans commission ImmoTopia.",
        ],
        note: "Pour les loyers, ImmoTopia enregistre et suit les paiements Mobile Money. Pour les appels de charges de copropriété, le paiement en ligne passe par le lien « Payer cet appel » (voir [payer un appel de charges](/wiki/portails-clients/payer-un-appel-de-charges)) ; pour les loyers, parlez-en avec l'équipe en démonstration.",
      },
    ],
    faq: [
      { q: "Quels opérateurs sont pris en charge ?", a: "Orange Money, MTN Mobile Money, Moov Money et Wave, ainsi que les espèces, virements, chèques et cartes." },
      { q: "Les copropriétaires peuvent-ils payer leurs charges par Mobile Money ?", a: "Oui : depuis le lien « Payer cet appel » ou le portail copropriétaire, avec un rattachement automatique au bon lot et sans commission ImmoTopia. Inclus dans les packs Syndic et Opérateur intégré." },
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
          "Application web utilisable sur téléphone, installable sur l'écran d'accueil sans magasin d'applications.",
          "Prélèvement bancaire des loyers : remises préparées dans l'application et déposées à la banque de l'agence.",
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
      { q: "Puis-je garder Excel pour certains tableaux ?", a: "Oui : tous les tableaux s'exportent en Excel, CSV ou PDF, et les tableaux de bord intégrés remplacent la plupart des tableaux croisés." },
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
  {
    slug: "logiciel-gestion-patrimoine-immobilier-cote-divoire",
    metaTitle: "Logiciel de gestion de patrimoine immobilier en Côte d'Ivoire",
    metaDescription: `Logiciel de gestion de patrimoine immobilier pour propriétaires bailleurs et diaspora : biens, baux, emprunts, trésorerie, assurances. Dès ${fcfa(patrimoineEssentiel.monthly)} HT/mois.`,
    eyebrow: "Gestion de patrimoine",
    h1: "Logiciel de gestion de patrimoine immobilier en Côte d'Ivoire",
    intro:
      "Biens, baux, loyers, emprunts, travaux, assurances, titres de propriété : ImmoTopia réunit dans une seule application le suivi du patrimoine immobilier que vous détenez en propre. Il s'adresse aux propriétaires bailleurs, aux familles qui détiennent des biens en société civile immobilière (SCI) et à la diaspora ivoirienne qui suit ses biens depuis l'étranger.",
    sections: [
      {
        title: "Les difficultés d'un patrimoine immobilier suivi sans outil",
        items: [
          { title: "Des papiers et des chiffres éparpillés", text: "Titre de propriété, acte notarié, contrat d'assurance, tableau d'amortissement du prêt : chaque pièce vit dans un dossier, un classeur ou une boîte mail différente." },
          { title: "Des échéances qu'on découvre trop tard", text: "Une assurance qui expire, un bail qui se termine, un entretien oublié ou une garantie de travaux qui s'achève : sans rappel, on s'en aperçoit après coup." },
          { title: "Des loyers suivis à la main", text: "Quittances retapées, paiements notés dans un tableur, relances faites de mémoire : à distance, le suivi des locataires devient vite un casse-tête." },
        ],
      },
      {
        title: "Pour qui ?",
        items: [
          { title: "Propriétaires bailleurs", text: "Vous louez vous-même vos biens : baux, échéances, quittances et dépenses de chaque bien sont suivis au même endroit." },
          { title: "SCI et holdings familiales", text: "La société qui détient les biens se décrit une seule fois dans ImmoTopia. Voir plus bas la section dédiée." },
          { title: "Diaspora ivoirienne", text: "L'application est en ligne : elle s'ouvre depuis un navigateur, sur ordinateur, tablette ou téléphone, et les rappels partent par e-mail ou WhatsApp." },
          { title: "Entreprises et institutionnels", text: "Le pack Patrimoine Pro suit un parc plus étendu de biens détenus en propre, loués ou non." },
        ],
        note: "Un propriétaire dont les biens sont gérés par une agence qui utilise ImmoTopia dispose, de son côté, d'un [portail propriétaire](/wiki/portails-clients/portail-proprietaire) pour consulter ses biens, ses baux, ses loyers et ses documents. Les comptes propriétaires ne sont pas facturés.",
      },
      {
        title: "Suivre chaque bien et l'ensemble du patrimoine",
        intro: "Tout part de la fiche du bien : sa valeur, ses prêts, ses dépenses, ses travaux et ses documents y sont rattachés. La [vue consolidée](/wiki/biens-et-patrimoine/vue-consolidee-du-patrimoine) donne ensuite le total.",
        items: [
          { title: "Valeur et historique des estimations", text: "Chaque estimation (manuelle, de marché ou d'expertise) est enregistrée avec sa date, ainsi que le coût et la date d'acquisition. Voir la [valorisation des biens](/wiki/biens-et-patrimoine/valorisation-des-biens)." },
          { title: "Rendement et plus-value latente", text: "Valeur totale du patrimoine, rendement brut, net et net-net de chaque bien, plus-value latente et projection sur plusieurs années selon vos propres hypothèses." },
          { title: "Emprunts", text: "Banque, capital emprunté et restant dû, taux, mensualité et statut de chaque prêt, rattachés au bien qu'il finance. Voir les [emprunts immobiliers](/wiki/biens-et-patrimoine/emprunts-immobiliers)." },
          { title: "Charges et dépenses", text: "Réparations, taxes, assurances : chaque dépense est saisie avec son fournisseur et son justificatif, pour savoir ce que coûte réellement chaque bien. Voir les [charges et dépenses](/wiki/biens-et-patrimoine/charges-et-depenses)." },
          { title: "Travaux", text: "Programmes de travaux par bien, avec coût estimé puis réel, dates prévues et statut. Voir les [programmes de travaux](/wiki/biens-et-patrimoine/programmes-de-travaux)." },
          { title: "Titres et documents patrimoniaux", text: "Titre de propriété, acte notarié, assurance, diagnostic, plan ou permis sont classés sur la fiche du bien, avec leur date d'expiration et une alerte par e-mail avant l'échéance. Voir les [documents patrimoniaux](/wiki/biens-et-patrimoine/documents-patrimoniaux)." },
          { title: "Régularisation foncière", text: "Un dossier par bien, étape par étape : échéances, frais engagés, pièces justificatives et relance par e-mail des étapes en retard. La filière proposée est une trame de travail à faire valider par un juriste local. Voir la [régularisation foncière](/wiki/patrimoine-multi-actifs/regularisation-fonciere)." },
          { title: "Import depuis Excel ou CSV", text: "Un gabarit guide la reprise de vos biens et de leurs valorisations, avec un aperçu ligne par ligne avant tout enregistrement. Les baux et les locataires ne s'importent pas par cet écran. Voir l'[import du patrimoine](/wiki/patrimoine-multi-actifs/importer-mon-patrimoine)." },
        ],
      },
      {
        title: "Louer vos propres biens et anticiper la trésorerie",
        items: [
          { title: "Baux et échéancier", text: "Chaque bail génère son échéancier (loyer, charges, statut, reste à encaisser), avec renouvellement, avenant, révision de loyer et résiliation. Voir la [gestion locative](/gestion-locative-cote-divoire) et les [baux](/wiki/gestion-locative/gestion-des-baux)." },
          { title: "Encaissement des loyers", text: "Loyers reçus en espèces, virement, chèque ou Mobile Money, affectés aux échéances du bail. Voir l'[encaissement des loyers](/wiki/gestion-locative/encaissement-des-loyers)." },
          { title: "Quittances et états des lieux", text: "Quittances et contrats générés depuis vos modèles Word, états des lieux d'entrée et de sortie avec photos et export PDF. Voir les [états des lieux](/wiki/gestion-locative/etats-des-lieux)." },
          { title: "Prélèvement bancaire des loyers", text: "ImmoTopia prépare la remise et le fichier à déposer à la banque, sans commission ImmoTopia. Voir le [prélèvement bancaire](/wiki/gestion-locative/prelevement-bancaire)." },
          { title: "Lien de paiement Mobile Money (en cours de déploiement)", text: "Un lien de paiement par échéance, envoyé au locataire par WhatsApp ou e-mail, lui permet de payer son loyer en Mobile Money. Cette fonction est en cours de déploiement. Voir les [liens de paiement de loyer](/wiki/gestion-locative/liens-de-paiement-loyer)." },
          { title: "Plan de trésorerie sur 12 ou 24 mois", text: "Loyers attendus, mensualités d'emprunt, travaux, dépenses périodiques et taxe foncière estimée, avec le solde cumulé mois par mois et une alerte au premier mois où il passerait sous zéro. Voir la [trésorerie prévisionnelle](/wiki/patrimoine-multi-actifs/tresorerie-previsionnelle)." },
        ],
      },
      {
        title: "Assurances, entretien et alertes",
        items: [
          { title: "Polices d'assurance", text: "Assureur, couverture, dates et prime annuelle de chaque police, avec un statut calculé (à venir, active, expire bientôt, expirée). Voir les [polices d'assurance](/wiki/patrimoine-multi-actifs/polices-d-assurance)." },
          { title: "Sinistres", text: "Déclaration et suivi d'un sinistre jusqu'à la clôture : montant réclamé, franchise, montant indemnisé, reste à charge et pièces jointes. Voir les [sinistres d'un bien](/wiki/patrimoine-multi-actifs/sinistres-d-un-bien)." },
          { title: "Carnet d'entretien", text: "Historique des interventions de chaque bien, prestataires, coûts, garanties et prochaines échéances, exportable en CSV. Voir le [carnet d'entretien](/wiki/patrimoine-multi-actifs/carnet-d-entretien)." },
          { title: "Alertes par e-mail", text: "Un rappel part 30 jours avant la fin d'une police d'assurance, une échéance d'entretien ou la fin d'une garantie de travaux. Voir les [alertes d'assurance et d'entretien](/wiki/patrimoine-multi-actifs/alertes-assurance-et-entretien)." },
        ],
      },
      {
        title: "SCI, holdings et fiscalité",
        intro: "Pour un patrimoine détenu par une ou plusieurs sociétés, ImmoTopia sépare ce qui appartient à chaque détenteur.",
        items: [
          { title: "Entités détentrices", text: "SCI, holdings, sociétés ou personnes physiques, décrites une seule fois avec leur forme juridique, leur pays (Côte d'Ivoire ou Mali), leur numéro RCCM, leur identifiant fiscal et, au besoin, leur entité mère. Voir les [entités détentrices](/wiki/patrimoine-multi-actifs/entites-detentrices)." },
          { title: "Quotes-parts par bien", text: "Un bien peut être détenu par plusieurs entités, chacune pour une quote-part, dans la limite de 100 %. Voir le [rattachement d'un bien à une entité](/wiki/patrimoine-multi-actifs/rattachement-bien-entite)." },
          { title: "Consolidation par entité", text: "Valeur, dette, flux de trésorerie et rendement de tout ce que détient une SCI ou une holding, pondérés par ses parts, avec le détail bien par bien." },
          { title: "Fiscalité Côte d'Ivoire et Mali", text: "Estimation de l'impôt foncier et de l'impôt sur les revenus fonciers, répartie entre les détenteurs. Ces montants sont des estimations indicatives, à valider par un conseil fiscal avant toute déclaration. Voir la [fiscalité](/wiki/patrimoine-multi-actifs/fiscalite-cote-d-ivoire-mali)." },
          { title: "Export PDF ou Excel", text: "Une synthèse PDF ou un classeur Excel de tout le patrimoine immobilier, ou d'un seul bien, à partager avec un banquier, un notaire ou un associé. Voir l'[export du patrimoine](/wiki/patrimoine-multi-actifs/export-du-patrimoine)." },
        ],
        note: "Le détail de ces fonctions est dans le [wiki du patrimoine multi-actifs](/wiki/patrimoine-multi-actifs). Pour les voir appliquées à votre structure, [réservez une démonstration](/contact).",
      },
      {
        title: "Ce qui est en cours de développement",
        intro: "Ces fonctions ne sont pas encore disponibles ; elles sont signalées pour que vous sachiez où va le produit, sans date annoncée.",
        bullets: [
          "Le suivi de tous les actifs au-delà de l'immobilier : parts de sociétés, épargne, véhicules, créances.",
          "Les dettes personnelles et les parts détenues dans un actif.",
          "La valeur nette consolidée, sa répartition par classe d'actif et son évolution mois par mois.",
          "Les projections de la valeur nette sur 1 à 30 ans, selon trois scénarios, et les simulations de vente, d'achat ou d'emprunt.",
        ],
        note: "Le détail de chacune est dans le [wiki du patrimoine multi-actifs](/wiki/patrimoine-multi-actifs).",
      },
      {
        title: "Tarifs des packs Patrimoine",
        table: {
          caption: "Comparaison des packs Patrimoine Essentiel et Patrimoine Pro",
          head: ["", patrimoineEssentiel.name, patrimoinePro.name],
          rows: [
            ["Public", patrimoineEssentiel.audience, patrimoinePro.audience],
            ["Prix mensuel", `${fcfa(patrimoineEssentiel.monthly)} HT`, `${fcfa(patrimoinePro.monthly)} HT`],
            ["Biens inclus", patrimoineEssentiel.included, patrimoinePro.included],
            ["Au-delà", patrimoineEssentiel.extension, patrimoinePro.extension],
            ["Mise en route accompagnée (facultative)", `${fcfa(patrimoineEssentiel.setup)} HT, facturés une fois`, `${fcfa(patrimoinePro.setup)} HT, facturés une fois`],
          ],
        },
        paragraphs: [
          "Les packs Patrimoine offrent la gestion locative directe de vos propres biens, sans mandat ni propriétaire tiers. Le premier mois est offert, sans engagement. Voir [tous les tarifs](/tarifs).",
        ],
      },
    ],
    faq: [
      {
        q: "À qui s'adresse ce logiciel de gestion de patrimoine immobilier ?",
        a: "Aux propriétaires bailleurs, aux familles qui détiennent des biens en SCI, à la diaspora ivoirienne, aux entreprises et aux institutionnels qui suivent des biens détenus en propre. Pour gérer les biens de clients sous mandat, voir plutôt la [gestion locative](/gestion-locative-cote-divoire).",
      },
      {
        q: "Puis-je louer mes biens sans passer par une agence ?",
        a: "Oui. Les packs Patrimoine offrent la gestion locative directe de vos propres biens : baux, échéances, encaissements, quittances et prélèvement bancaire des loyers, sans mandat ni propriétaire tiers.",
      },
      {
        q: "Le logiciel convient-il à une SCI ?",
        a: "ImmoTopia sait décrire une SCI ou une holding comme entité détentrice, répartir les quotes-parts de chaque bien, consolider les biens d'une entité et estimer l'impôt par détenteur (voir le [wiki](/wiki/patrimoine-multi-actifs/entites-detentrices)). Pour voir ces fonctions appliquées à votre structure et à votre abonnement, demandez une [démonstration](/contact).",
      },
      {
        q: "Puis-je suivre mes biens depuis l'étranger ?",
        a: "ImmoTopia est une application en ligne, accessible depuis un navigateur sur ordinateur, tablette ou téléphone. Les rappels (échéances de loyer, assurances, entretien) partent par e-mail ou WhatsApp selon les cas. Si une agence gère vos biens avec ImmoTopia, son portail propriétaire vous donne accès à vos baux, loyers et documents.",
      },
      {
        q: "La valeur nette et les projections sur 30 ans sont-elles disponibles ?",
        a: "Pas encore : la valeur nette consolidée et les projections sur 1 à 30 ans sont en cours de développement. Sont disponibles aujourd'hui la valeur de chaque bien, le rendement brut, net et net-net, la plus-value latente, une projection selon vos hypothèses et le plan de trésorerie sur 12 ou 24 mois.",
      },
      {
        q: "Combien coûte le pack Patrimoine Essentiel ?",
        a: `${fcfa(patrimoineEssentiel.monthly)} HT par mois pour ${patrimoineEssentiel.included}. Chaque bloc de 10 biens détenus de plus coûte ${extBiens.price.fr} HT. Le premier mois est offert, sans engagement. Le pack Patrimoine Pro est à ${fcfa(patrimoinePro.monthly)} HT par mois pour ${patrimoinePro.included}. Voir les [tarifs](/tarifs).`,
      },
      {
        q: "Puis-je reprendre mes biens depuis un fichier Excel ?",
        a: "Oui : un gabarit Excel guide l'import de vos biens et de leurs valorisations, avec un aperçu ligne par ligne avant enregistrement et un rapport final. Les baux et les locataires ne s'importent pas par cet écran.",
      },
    ],
    related: ["gestion-locative-cote-divoire", "logiciel-immobilier-cote-divoire", "tableaux-de-bord-kpi-immobilier-cote-divoire"],
  },
  {
    slug: "logiciel-promoteur-immobilier-cote-divoire",
    metaTitle: "Logiciel promoteur immobilier : chantier et lots | ImmoTopia",
    metaDescription: `Logiciel promoteur immobilier : chantiers, lots et coût de revient, budget, avancement, stock, tâcherons et CRM. Pack Promoteur dès ${fcfa(promoteur.monthly)} HT/mois.`,
    eyebrow: "Promotion immobilière",
    h1: "Logiciel promoteur immobilier en Côte d'Ivoire : du chantier aux lots",
    intro:
      "Budget, dépenses en espèces, matériaux, tâcherons, avancement, coût de revient de chaque lot : le module Promoteur d'ImmoTopia suit un programme de la première dépense à la clôture du chantier. Il s'adresse aux promoteurs et aux groupes immobiliers ivoiriens qui construisent, et se relie au CRM pour le suivi commercial.",
    sections: [
      {
        title: "Les difficultés de la promotion immobilière sur le terrain",
        items: [
          { title: "Un budget qui dérape sans qu'on le voie", text: "Quand les dépenses sont saisies en fin de mois dans un tableur, le dépassement se constate après coup, quand il est difficile de corriger." },
          { title: "Des dépenses en espèces, des matériaux, des tâcherons", text: "Pièces de caisse, sorties de stock, situations de travaux et salaires circulent sur papier ou dans des fichiers séparés, et le coût réel d'un chantier se reconstitue à la main." },
          { title: "Un coût de revient par lot incertain", text: "Sans règle de répartition du coût réel entre les lots, le prix de revient de chaque villa ou appartement reste une estimation." },
        ],
        note: "La comparaison complète avec le tableur est dans [ImmoTopia vs Excel](/immotopia-vs-excel).",
      },
      {
        title: "Piloter chaque chantier de l'ouverture à la clôture",
        items: [
          { title: "Registre des chantiers", text: "Statut, coût réel et avancement de chaque chantier. Avant la clôture, le logiciel montre ce qui reste à régler. Voir le [suivi des chantiers](/wiki/promotion-et-chantiers/suivi-des-chantiers)." },
          { title: "Budget et avenants", text: "Budget prévisionnel poste par poste, validé comme référence de pilotage, puis révisé par des avenants tracés et validés. Voir le [budget de chantier](/wiki/promotion-et-chantiers/budget-de-chantier)." },
          { title: "Avancement et alertes de dépassement", text: "Budget, montants engagés, coût réel, avancement et écart par chantier, avec la courbe d'avancement dans le temps et des alertes quand un chantier consomme son budget plus vite que prévu. Voir l'[avancement et le tableau de bord](/wiki/promotion-et-chantiers/avancement-et-tableau-de-bord)." },
          { title: "Dépenses et pièces de caisse", text: "Dépenses par poste, pièces de caisse émises, validées, imprimables et annulables proprement, avec le lien vers le compte comptable. Voir les [dépenses de chantier](/wiki/promotion-et-chantiers/depenses-de-chantier)." },
          { title: "Bons de commande par chantier", text: "Commandes aux fournisseurs par chantier, rapprochées des factures reçues, pour suivre l'engagé. Voir les [bons de commande](/wiki/finance-et-comptabilite/bons-de-commande)." },
          { title: "Baux de terrain", text: "Quand le programme est construit sur un terrain loué, chaque bail est enregistré avec ses chantiers, ses loyers fonciers et la charge constatée mois par mois. Voir les [baux de terrain](/wiki/promotion-et-chantiers/baux-de-terrain)." },
        ],
      },
      {
        title: "Lots et coût de revient",
        paragraphs: [
          "Un programme se vend ou se loue lot par lot. Chaque chantier se découpe en lots (villa, appartement, local) ; le coût réel est réparti entre eux à la surface ou par quote-part, et chaque lot affiche alors son coût de revient. Voir [lots et coût de revient](/wiki/promotion-et-chantiers/lots-et-cout-de-revient).",
          "En fin de chantier, chaque lot achevé peut être transféré au patrimoine avec son coût de revient définitif, sans ressaisie.",
        ],
      },
      {
        title: "Matériaux, main-d'œuvre et tâcherons",
        items: [
          { title: "Stock de matériaux", text: "Articles, magasins et lieux de stockage de chantier, quantités restantes et valeur au coût moyen pondéré, historique de tous les mouvements. Voir le [stock de matériaux](/wiki/promotion-et-chantiers/stock-de-materiaux)." },
          { title: "Entrées et sorties", text: "Réception des matériaux achetés, sortie vers un chantier au coût moyen, transfert entre dépôts et rapprochement entre acheté, consommé et restant. Voir les [entrées et sorties de stock](/wiki/promotion-et-chantiers/entrees-et-sorties-de-stock)." },
          { title: "Inventaire de stock", text: "Comptage physique par magasin ou par chantier, justification de chaque écart, puis validation pour ajuster le stock et la comptabilité. Voir l'[inventaire de stock](/wiki/promotion-et-chantiers/inventaire-de-stock)." },
          { title: "Inventaire par photo WhatsApp", text: `Pour compter depuis le chantier, le chef envoie une photo sur WhatsApp ; l'IA reconnaît l'article parmi ceux de l'entreprise et propose un total, qu'il valide. Option payante : « ${extInventaire.name.fr} », ${extInventaire.price.fr} HT, cumulable. Voir l'[inventaire par WhatsApp](/wiki/promotion-et-chantiers/inventaire-par-whatsapp).` },
          { title: "Salaires et main-d'œuvre", text: "Registre des employés, salaire dû chaque mois imputé au bon chantier et règlements suivis. Voir les [salaires](/wiki/promotion-et-chantiers/salaires-main-d-oeuvre)." },
          { title: "Tâcherons et situations de travaux", text: "Marché par chantier, situations de travaux validées, puis règlements : ce qui a été convenu, facturé et payé. Voir les [tâcherons](/wiki/promotion-et-chantiers/tacherons)." },
          { title: "Retenues de garantie", text: "Une retenue se pose sur une facture fournisseur ou une situation de tâcheron ; les sommes retenues se suivent chantier par chantier, et la somme devient due quand la retenue est libérée. Voir les [retenues de garantie](/wiki/promotion-et-chantiers/retenues-de-garantie)." },
        ],
      },
      {
        title: "Le suivi commercial du programme",
        paragraphs: [
          "Le suivi commercial se fait dans le CRM, qui partage les contacts et la base du module Promoteur : prospects, contacts, pipeline des affaires, visites, relances et rapprochement entre la demande d'un client et les biens disponibles. Tout est détaillé dans la page [CRM pour promoteur immobilier](/crm-promoteur-immobilier-cote-divoire).",
        ],
      },
      {
        title: "Après la livraison : location et copropriété",
        paragraphs: [
          "Les baux, les loyers, les états des lieux et la copropriété ne font pas partie du pack Promoteur seul. Ils se gèrent avec le pack Opérateur intégré, qui réunit les modules Agence, Syndic et Promoteur dans un seul compte, un même lot n'étant compté qu'une fois, du chantier à la gestion. Pour la seule location, voir la [gestion locative](/gestion-locative-cote-divoire) (pack Agence) ; pour la copropriété, le [logiciel de syndic](/logiciel-syndic-copropriete-cote-divoire) (pack Syndic).",
        ],
      },
      {
        title: "Tarifs du pack Promoteur",
        paragraphs: [
          `Le pack Promoteur démarre à ${fcfa(promoteur.monthly)} HT par mois et couvre ${promoteur.included}. Pour aller plus loin, comptez ${fcfa(chantierSup)} HT par mois pour chaque chantier actif de plus et ${fcfa(blocLots)} HT par mois pour chaque bloc de 10 lots de plus.`,
          `Une mise en route accompagnée est proposée en option (${fcfa(promoteur.setup)} HT, une seule fois), et le premier mois est offert, sans engagement. Le pack Opérateur intégré (${fcfa(integre.monthly)} HT par mois) s'adresse aux groupes qui construisent, vendent, louent et gèrent. Voir [tous les tarifs](/tarifs) ou [réserver une démonstration](/contact).`,
        ],
      },
    ],
    faq: [
      {
        q: "Que comprend le module Promoteur ?",
        a: "Les chantiers et leurs lots, le budget et les avenants, l'avancement et les alertes de dépassement, les dépenses et pièces de caisse, les baux de terrain, le stock de matériaux avec inventaire, les salaires, les tâcherons et leurs situations de travaux, et les retenues de garantie. Il est disponible avec les packs Promoteur et Opérateur intégré.",
      },
      {
        q: "Combien coûte le pack Promoteur ?",
        a: `À partir de ${fcfa(promoteur.monthly)} HT par mois pour ${promoteur.included}, plus ${fcfa(chantierSup)} HT par mois par chantier actif de plus et ${fcfa(blocLots)} HT par mois par bloc de 10 lots de plus. Le simulateur de la page [Tarifs](/tarifs) donne le total pour votre programme.`,
      },
      {
        q: "Peut-on suivre plusieurs chantiers en même temps ?",
        a: `Oui. Le pack Promoteur comprend ${promoteur.included}, et le tableau de bord présente les chantiers côte à côte, avec leur budget, leur coût réel, leur avancement et leur écart.`,
      },
      {
        q: "Comment est établi le coût de revient d'un lot ?",
        a: "Le coût réel d'un chantier se compose des dépenses imputées (factures, pièces de caisse, salaires, sorties de stock). Vous choisissez la clé de répartition, à la surface ou par quote-part, puis chaque lot affiche son coût de revient. À la clôture, le lot peut rejoindre le patrimoine à ce coût définitif.",
      },
      {
        q: "Peut-on gérer la vente des lots jusqu'à l'acte ?",
        a: "Le suivi commercial (prospects, contacts, pipeline, visites, relances, rapprochement) se fait dans le [CRM](/crm-promoteur-immobilier-cote-divoire). Pour la vente des lots d'un promoteur, ImmoTopia ne propose ni réservation de lots, ni échéancier de l'acquéreur, ni portail acquéreur : le parcours offre, compromis et échéancier de l'acquéreur existe seulement pour une vente sous mandat d'agence, pour le compte d'un propriétaire.",
      },
      {
        q: "Le chef de chantier peut-il travailler depuis son téléphone ?",
        a: `L'application est en ligne et s'ouvre depuis un navigateur sur téléphone. Pour compter le stock, le chef de chantier peut aussi envoyer des photos sur WhatsApp, avec l'option payante « ${extInventaire.name.fr} » (${extInventaire.price.fr} HT) : l'IA propose le comptage, et l'ajustement du stock se valide au bureau.`,
      },
    ],
    related: ["crm-promoteur-immobilier-cote-divoire", "gestion-locative-cote-divoire", "logiciel-syndic-copropriete-cote-divoire"],
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
        q: "Quelles options payantes existent en plus des packs ?",
        a: `Trois extensions à la carte : « ${extSignature.name.fr} » (${extSignature.price.fr} HT, avec tous les packs), « ${extVisio.name.fr} » (${extVisio.price.fr} HT par cabinet, avec Syndic ou Opérateur intégré) et « ${extInventaire.name.fr} » (${extInventaire.price.fr} HT, avec Promoteur ou Opérateur intégré). Le détail est sur la page [Tarifs](/tarifs).`,
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
        a: "Le paiement est enregistré avec son opérateur (Orange Money, MTN MoMo, Moov Money, Wave), ou déclaré par le locataire depuis son portail puis validé par l'agence. Pour les charges de copropriété, le copropriétaire peut aussi payer en ligne par Mobile Money depuis le lien « Payer cet appel », sans commission ImmoTopia.",
      },
      {
        q: "Peut-on signer les baux et les mandats électroniquement ?",
        a: `Oui : baux, états des lieux et mandats s'envoient à signer à distance, avec un écran de suivi et des rappels automatiques. C'est une option payante (« ${extSignature.name.fr} », ${extSignature.price.fr} HT), avec tous les packs.`,
      },
      {
        q: "Peut-on prélever les loyers directement sur le compte bancaire du locataire ?",
        a: "Oui : le prélèvement bancaire des loyers est inclus dans la gestion locative, sans commission ImmoTopia. ImmoTopia gère les mandats, prépare la remise, prévient les locataires (prénotification) et produit le fichier à déposer à la banque de l'agence ; il ne débite pas lui-même les comptes.",
      },
      {
        q: "Peut-on exporter ses données ?",
        a: "Oui : tous les tableaux de l'application s'exportent en Excel, CSV ou PDF.",
      },
      {
        q: "Le module syndic gère-t-il les assemblées générales ?",
        a: "Oui : ordre du jour, résolutions, votes et pouvoirs par lot, quorum et compte rendu archivé, avec une assemblée en direct (émargement et vote en ligne par lien personnel) ; la visio est une option payante. S'y ajoutent les tantièmes, budgets, appels de charges et la comptabilité de copropriété.",
      },
      { q: "Peut-on publier des annonces ?", a: "Oui, et une API d'annonces alimente votre site internet. La publication d'un bien peut aussi être diffusée dans le groupe WhatsApp de l'agence." },
      {
        q: "Et le module Promoteur ?",
        a: "Le module Promoteur est disponible : chantiers, lots et coût de revient, budget et avenants, avancement, dépenses, stock de matériaux, main-d'œuvre, tâcherons, retenues de garantie et transfert au patrimoine. Voir le [CRM pour promoteur immobilier](/crm-promoteur-immobilier-cote-divoire). L'inventaire de chantier par photos WhatsApp est une option payante. La finance opérationnelle est, elle, en cours de déploiement : parlez-en avec l'équipe en démonstration.",
      },
    ],
  },
  {
    title: "Utilisation et sécurité",
    items: [
      { q: "Faut-il installer un logiciel ?", a: "Non. ImmoTopia s'utilise depuis un navigateur, sur ordinateur, tablette ou téléphone, et peut s'installer sur l'écran d'accueil du téléphone comme une application." },
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
