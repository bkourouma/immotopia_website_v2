/**
 * Guides pratiques d'ImmoTopia (rubrique /guides), en français seulement : la rubrique entière est déclarée
 * dans src/lib/french-only.ts (préfixe « /guides »).
 *
 * Règle éditoriale (contenus.md) : on ne présente que ce qui est en production ; jamais de date de livraison,
 * jamais de chiffre, de client ou de prix inventé. Les prix ne s'écrivent pas ici : renvoyer vers /tarifs.
 * Les faits juridiques OHADA ne reprennent que ceux déjà sourcés dans src/app/[lang]/outils/bail-commercial/page.tsx
 * et dans src/lib/tools.ts (Acte uniforme du 15 décembre 2010, art. 101 à 134).
 *
 * Dans les textes, « [texte](/chemin) » devient un lien interne (voir src/components/inline-links.tsx).
 */

export type GuideListItem = string | { title: string; text: string };

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: GuideListItem[] }
  | { type: "ol"; items: GuideListItem[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][]; highlightLast?: boolean }
  | { type: "note"; text: string };

export type GuideSection = { id: string; title: string; blocks: GuideBlock[] };

export type GuideSource = { label: string; url: string };

export type Guide = {
  slug: string;
  /** Balise <title> complète (60 caractères au plus) */
  metaTitle: string;
  /** Meta description (160 caractères au plus) */
  metaDescription: string;
  /** Titre H1 de l'article */
  h1: string;
  /** Rubrique affichée au-dessus du titre */
  eyebrow: string;
  /** Résumé court pour les cartes de l'index */
  summary: string;
  intro: string;
  /** Dates ISO (AAAA-MM-JJ) : publication et dernière mise à jour réelle du contenu */
  published: string;
  updated: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Sources externes consultées (liens sortants) */
  sources?: { title: string; items: GuideSource[] };
  /** Mention affichée avant la FAQ (avertissement juridique…) */
  disclaimer?: string;
  /** Slugs d'autres guides à lire ensuite */
  related: string[];
  /** Pages produit à consulter, hors guides */
  productLinks: { label: string; href: string; text: string }[];
  cta: { title: string; text: string };
};

/* ------------------------------------------------------------------ Article 1 : choisir son CRM */

const crmChoisir: Guide = {
  slug: "crm-immobilier-bonnes-pratiques",
  metaTitle: "CRM immobilier : définition, fonctions et 10 critères",
  metaDescription:
    "Qu'est-ce qu'un CRM immobilier ? Fonctions clés, différence agence / promoteur et 10 critères pour choisir le bon logiciel CRM, avec tableau d'essai.",
  h1: "CRM immobilier : comment choisir le bon logiciel (10 critères)",
  eyebrow: "Guide CRM immobilier",
  summary: "Dix critères, la différence entre agence et promoteur, les bonnes pratiques de pipeline et de relance, et un tableau pour comparer vos essais.",
  intro:
    "Un logiciel CRM immobilier remplace le carnet de notes, le fichier Excel et les messages dispersés dans les téléphones par un historique partagé par toute l'équipe. Encore faut-il choisir un outil adapté à son métier : une agence qui vend et gère pour des propriétaires n'a pas les mêmes besoins qu'un promoteur, et un CRM pour promoteur doit suivre un programme vendu pendant que le chantier avance. Ce guide propose dix critères de choix, explique la différence entre agence et promoteur, donne des bonnes pratiques de pipeline et de relance, et se termine par un tableau à utiliser pendant vos essais.",
  published: "2026-10-13",
  updated: "2026-10-13",
  sections: [
    {
      id: "a-quoi-sert-un-crm",
      title: "À quoi sert un CRM immobilier ?",
      blocks: [
        {
          type: "p",
          text: "Un CRM (gestion de la relation client) garde au même endroit chaque contact, chaque projet d'achat ou de location, chaque appel et chaque visite. Il répond à trois questions qu'un tableur tient mal : qui faut-il rappeler aujourd'hui, où en est chaque dossier, et quel bien correspond à quelle demande.",
        },
        {
          type: "p",
          text: "Il ne remplace pas un logiciel de gestion locative ou de syndic, mais il doit s'y relier : un prospect devenu locataire ou propriétaire ne se ressaisit pas. C'est l'un des dix critères ci-dessous.",
        },
      ],
    },
    {
      id: "agence-ou-promoteur",
      title: "Agence ou promoteur : deux métiers, deux besoins",
      blocks: [
        { type: "p", text: "Le même mot, « CRM », recouvre deux façons de vendre. Avant de comparer des outils, notez laquelle est la vôtre." },
        {
          type: "ul",
          items: [
            {
              title: "Agence immobilière",
              text: "beaucoup de petits dossiers en parallèle (locations, ventes, mandats de gestion). Il faut un fichier de contacts à plusieurs rôles (prospect, propriétaire, locataire, acquéreur), un rapprochement entre les demandes et le portefeuille, des visites planifiées et, pour la vente sous mandat, le suivi des mandats, des offres et des compromis.",
            },
            {
              title: "Promoteur",
              text: "moins de produits, mais une vente qui dure des mois pendant que le chantier avance. Il faut suivre de nombreux prospects pour un même programme, planifier des relances longues et garder le lien avec les lots, le budget et l'avancement des travaux.",
            },
          ],
        },
        {
          type: "p",
          text: "ImmoTopia propose le même CRM aux deux métiers : voir le [CRM immobilier pour agences](/crm-immobilier-cote-divoire) et le [CRM pour promoteur immobilier](/crm-promoteur-immobilier-cote-divoire), où le module Promoteur prolonge le suivi commercial côté construction.",
        },
      ],
    },
    {
      id: "dix-criteres",
      title: "Les 10 critères pour choisir un CRM immobilier",
      blocks: [
        {
          type: "ol",
          items: [
            { title: "Un pipeline adapté à l'immobilier", text: "des étapes claires, de la nouvelle demande à l'affaire gagnée ou perdue, avec un motif de clôture. Un pipeline générique se détourne, mais demande du paramétrage." },
            { title: "Un fichier de contacts unique", text: "une seule fiche par personne, avec ses rôles multiples et tout son historique ; vérifiez le traitement des doublons et l'export de vos données." },
            { title: "Des relances datées", text: "chaque échange se termine par la date de la prochaine action, visible dans un calendrier et signalée quand elle est en retard." },
            { title: "Le rapprochement entre demandes et biens", text: "l'outil compare le budget, la zone, le nombre de pièces et la surface recherchés avec les biens disponibles, et explique son résultat." },
            { title: "Les visites et l'agenda", text: "visites planifiées, collaborateur affecté, calendrier partagé par l'équipe." },
            { title: "La suite de la vente", text: "pour une agence, les mandats, offres, compromis et commissions ; pour un promoteur, le lien avec les lots et le chantier." },
            { title: "Les canaux de contact", text: "appels, e-mails et WhatsApp consignés dans l'historique, notifications paramétrables, respect du consentement du contact." },
            { title: "Les indicateurs", text: "nouveaux prospects, conversions, affaires par étape, relances en retard : la direction voit où agir sans réunion de point." },
            { title: "Le travail en équipe", text: "rôles et droits, responsable de chaque affaire, avertissement quand deux personnes modifient le même dossier, journal des actions sensibles." },
            { title: "Le lien avec le reste et le coût", text: "passage du prospect au bail ou au propriétaire sans ressaisie, reprise de vos données, mode de tarification (par utilisateur ou par capacité) et conditions de sortie." },
          ],
        },
      ],
    },
    {
      id: "tableau-de-criteres",
      title: "Tableau de critères à utiliser pendant l'essai",
      blocks: [
        {
          type: "table",
          caption: "Les dix critères de choix d'un CRM immobilier, pour une agence et pour un promoteur",
          head: ["Critère", "À vérifier pendant l'essai", "Pour une agence", "Pour un promoteur"],
          rows: [
            ["1. Pipeline", "Étapes lisibles, motif de clôture", "Location, vente et mandat de gestion", "Prospects d'un même programme"],
            ["2. Contacts", "Fiche unique, rôles multiples, doublons", "Propriétaires, locataires, acquéreurs", "Prospects, acquéreurs, partenaires"],
            ["3. Relances", "Prochaine action datée, retards signalés", "Beaucoup de petits dossiers à rappeler", "Relances longues, sur plusieurs mois"],
            ["4. Rapprochement", "Budget, zone, pièces, surface", "Demandes face au portefeuille", "Demandes face aux biens disponibles du programme"],
            ["5. Visites", "Planification, collaborateur, calendrier", "Plusieurs visites par semaine", "Visites regroupées sur le programme"],
            ["6. Suite de la vente", "Ce qui suit la visite", "Mandat, offre, compromis, commission", "Lots, budget et avancement du chantier"],
            ["7. Canaux", "Appel, e-mail, WhatsApp, consentement", "Échanges quotidiens avec les clients", "Informations envoyées à de nombreux prospects"],
            ["8. Indicateurs", "Conversions, retards, activité", "Activité par agent", "Conversions par programme"],
            ["9. Équipe", "Droits, responsable, alerte de conflit, journal", "Plusieurs agents sur les mêmes contacts", "Équipe commerciale et direction de projet"],
            ["10. Lien avec le reste", "Reprise des données, prix, sortie", "Du prospect au bail ou au propriétaire", "Du CRM au chantier, puis au patrimoine"],
          ],
        },
      ],
    },
    {
      id: "bonnes-pratiques",
      title: "Trois bonnes pratiques, quel que soit l'outil",
      blocks: [
        { type: "h3", text: "Un pipeline court et défini par écrit" },
        {
          type: "p",
          text: "Limitez-vous à cinq ou six étapes que toute l'équipe comprend de la même façon, et écrivez ce qui fait passer une affaire d'une étape à l'autre (par exemple : budget et zone confirmés pour passer à « qualifiée »). Clôturez toujours avec un motif : les affaires perdues enseignent autant que les gagnées. Ne laissez jamais une affaire sans responsable.",
        },
        { type: "h3", text: "Une relance fixée à la fin de chaque échange" },
        {
          type: "p",
          text: "Une affaire sans date de prochaine action finit oubliée. Alternez les canaux : un appel pour qualifier, un message WhatsApp pour confirmer une visite, un e-mail pour envoyer un récapitulatif. Le guide [Relances en CRM immobilier](/guides/crm-immobilier-relances) détaille la fréquence et les messages.",
        },
        { type: "h3", text: "Des critères de recherche renseignés dès la qualification" },
        {
          type: "p",
          text: "Un rapprochement n'est aussi bon que les champs qui l'alimentent : budget minimum et maximum, zone, nombre de pièces, surface. Proposez deux ou trois biens à la fois, notez ce qui a été proposé, visité ou refusé, et relancez la recherche quand un nouveau bien entre au portefeuille.",
        },
      ],
    },
    {
      id: "immotopia",
      title: "Ce que couvre ImmoTopia sur ces critères",
      blocks: [
        {
          type: "p",
          text: "Le CRM d'ImmoTopia réunit un [fichier de contacts](/wiki/crm-et-ventes/contacts-prospects) partagé, des [affaires suivies dans un pipeline](/wiki/crm-et-ventes/affaires-et-activites) (nouvelle, qualifiée, visite, négociation, gagnée ou perdue), des activités (appel, e-mail, WhatsApp, visite, note, tâche) avec la date de la prochaine relance, un [calendrier et un tableau de bord](/wiki/crm-et-ventes/calendrier-et-tableau-de-bord-crm) et un [rapprochement de biens](/wiki/crm-et-ventes/rapprochement-de-biens) avec un score expliqué.",
        },
        {
          type: "p",
          text: "Pour une vente sous mandat, l'agence y ajoute les mandats de vente, les offres et les compromis. Le CRM partage les mêmes contacts et les mêmes biens que la gestion locative, le syndic et le module Promoteur. Toutes les fonctions sont décrites dans le [wiki CRM et ventes](/wiki/crm-et-ventes).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Quelle différence entre un CRM immobilier et un fichier Excel ?",
      a: "Un tableur convient pour quelques contacts. Dès que plusieurs agents appellent et visitent en parallèle, il ne garde ni l'historique partagé, ni les relances en retard, ni la correspondance entre une demande et les biens. Le CRM centralise ces trois éléments.",
    },
    {
      q: "Un CRM d'agence convient-il à un promoteur ?",
      a: "Pour le suivi commercial (contacts, pipeline, visites, relances, rapprochement), oui. Le chantier demande en plus un module dédié : lots, coût de revient, budget, avancement. La vente sous mandat (mandat, offre, compromis) concerne l'agence qui vend pour un propriétaire.",
    },
    {
      q: "Comment tester un CRM avant de choisir ?",
      a: "Chargez une vingtaine de contacts réels, ouvrez quelques affaires, programmez des relances et faites travailler deux collègues sur les mêmes dossiers pendant une ou deux semaines. Utilisez le tableau de critères ci-dessus pour noter chaque outil.",
    },
    {
      q: "Peut-on reprendre son fichier de contacts Excel ?",
      a: "Posez la question avant de choisir. Avec ImmoTopia, vous pouvez saisir vos contacts vous-même, sans frais ; une mise en route accompagnée, facultative, comprend une reprise préparée de vos données dans un périmètre défini (voir les [tarifs](/tarifs)). Pour votre fichier précis, l'équipe l'étudie en démonstration.",
    },
    {
      q: "Un CRM immobilier envoie-t-il des messages WhatsApp ?",
      a: "Cela dépend de l'outil. Dans ImmoTopia, les échanges WhatsApp s'enregistrent comme des activités, et une partie des notifications automatiques du CRM peut partir par e-mail et par WhatsApp, à condition que le service WhatsApp soit configuré pour l'agence et que le contact ait donné son accord.",
    },
  ],
  related: ["crm-immobilier-relances", "logiciel-etat-des-lieux-comparatif"],
  productLinks: [
    { label: "Logiciel CRM immobilier", href: "/crm-immobilier-cote-divoire", text: "Contacts, pipeline, visites, mandats, offres et relances pour les agences." },
    { label: "CRM pour promoteur immobilier", href: "/crm-promoteur-immobilier-cote-divoire", text: "Le suivi commercial relié aux lots, au budget et à l'avancement du chantier." },
    { label: "Wiki CRM et ventes", href: "/wiki/crm-et-ventes", text: "Chaque fonction du CRM, action par action." },
  ],
  cta: {
    title: "Voyez le CRM d'ImmoTopia sur votre propre portefeuille",
    text: "Une démonstration de 30 minutes, sans engagement, pour tester les dix critères sur vos contacts et vos dossiers.",
  },
};

/* ------------------------------------------------------------------ Article 2 : logiciel d'état des lieux */

const etatDesLieux: Guide = {
  slug: "logiciel-etat-des-lieux-comparatif",
  metaTitle: "Logiciel d'état des lieux : critères de choix | ImmoTopia",
  metaDescription:
    "Mobile, photos, signature électronique, PDF, comparaison entrée et sortie : les sept critères pour choisir un logiciel d'état des lieux, en tableau.",
  h1: "Logiciel d'état des lieux : comparatif des critères de choix",
  eyebrow: "Guide état des lieux",
  summary: "Mobile, photos, signature, PDF, comparaison entrée et sortie : sept critères pour choisir un logiciel d'état des lieux.",
  intro:
    "L'état des lieux est le document qui évite la plupart des litiges sur le dépôt de garantie : signé à l'entrée puis à la sortie, il dit ce que le bailleur a remis et ce que le locataire doit rendre. Sur papier, il se froisse, se perd et se discute. Un logiciel d'état des lieux le rend plus rapide à établir et plus facile à défendre, à condition de bien le choisir. Voici les critères à comparer, un tableau pour noter chaque outil, et ce que fait ImmoTopia sur chacun.",
  published: "2026-10-13",
  updated: "2026-10-13",
  sections: [
    {
      id: "papier-ou-logiciel",
      title: "Papier, modèle PDF ou logiciel : que choisir ?",
      blocks: [
        {
          type: "p",
          text: "Pour un logement de temps en temps, un modèle à imprimer suffit : notre [modèle d'état des lieux en PDF](/outils/etat-des-lieux) est gratuit et se remplit sur place. Dès qu'une agence gère de nombreux baux, le papier devient coûteux : documents à ressaisir, photos dans des téléphones, exemplaires introuvables au moment de la restitution du dépôt.",
        },
        {
          type: "p",
          text: "Un logiciel range l'état des lieux avec le bail, garde les photos rattachées à la pièce concernée et permet de comparer l'entrée et la sortie sans rouvrir deux dossiers. C'est là que les critères de choix prennent leur importance.",
        },
      ],
    },
    {
      id: "sept-criteres",
      title: "Les sept critères à comparer",
      blocks: [
        {
          type: "ol",
          items: [
            { title: "L'utilisation sur téléphone ou tablette", text: "l'état des lieux se fait dans le logement, pas au bureau. Vérifiez que l'outil fonctionne sur le téléphone de l'agent, et si une connexion Internet est nécessaire sur place." },
            { title: "Les photos par pièce", text: "elles doivent être rattachées à la pièce ou à l'élément, avec une légende, et ne plus pouvoir être ajoutées ni retirées une fois le document finalisé." },
            { title: "La signature électronique", text: "elle évite de faire circuler un exemplaire papier. Vérifiez qui signe (agence, locataire), à quel moment, et si le document est verrouillé ensuite." },
            { title: "L'export et l'impression en PDF", text: "chaque partie doit pouvoir recevoir un exemplaire lisible, imprimable, avec les photos et les signatures." },
            { title: "La comparaison entrée et sortie", text: "à la sortie, l'outil doit reprendre les pièces de l'entrée et montrer, élément par élément, ce qui s'est dégradé." },
            { title: "Le lien avec le bail et le dépôt de garantie", text: "l'état des lieux doit rester attaché au bail, et les retenues constatées à la sortie doivent se retrouver au moment de restituer le dépôt." },
            { title: "Un modèle gratuit pour essayer", text: "un modèle gratuit permet de juger la logique de l'outil (pièces, éléments, compteurs, clés) avant de s'engager." },
          ],
        },
      ],
    },
    {
      id: "tableau",
      title: "Tableau de comparaison des critères",
      blocks: [
        {
          type: "table",
          caption: "Critères de choix d'un logiciel d'état des lieux et réponse d'ImmoTopia",
          head: ["Critère", "Question à poser", "Pourquoi c'est important", "ImmoTopia"],
          rows: [
            ["Mobile", "Fonctionne-t-il sur un téléphone, avec ou sans connexion ?", "L'état des lieux se fait sur place", "Dans le navigateur d'un téléphone ou d'une tablette, sans application native ; connexion Internet nécessaire"],
            ["Photos", "Par pièce, avec légende, verrouillées à la fin ?", "Elles servent de preuve en cas de désaccord", "Photos par pièce ou par élément, avec légende ; plus de modification une fois finalisé"],
            ["Signature", "Qui signe, et le document est-il verrouillé ?", "Un état des lieux signé fait référence", "Signature électronique de l'agence et du locataire, puis finalisation"],
            ["PDF", "Export et impression possibles ?", "Chaque partie garde un exemplaire", "Export et impression en PDF ; l'agence le transmet elle-même"],
            ["Entrée et sortie", "L'outil compare-t-il les deux ?", "Seul l'écart au-delà de l'usure normale compte", "Pièces d'entrée reprises à la sortie, tableau comparatif élément par élément"],
            ["Bail et dépôt", "Rattaché au bail, retenues tracées ?", "Les retenues se justifient avec le même document", "Rangé avec le bail ; retenues réglées sur la fiche du dépôt de garantie"],
            ["Modèle gratuit", "Peut-on essayer sans s'inscrire ?", "Juger l'outil avant de s'engager", "[Modèle PDF gratuit](/outils/etat-des-lieux), sans inscription"],
          ],
          highlightLast: true,
        },
      ],
    },
    {
      id: "deposit",
      title: "L'état des lieux au service du dépôt de garantie",
      blocks: [
        {
          type: "p",
          text: "Le dépôt de garantie est restitué à la fin du bail, déduction faite des sommes dues et des réparations locatives constatées à la sortie. Deux états des lieux précis, détaillés et signés permettent de justifier chaque retenue, ou de la contester. Seule la différence au-delà de l'usure normale peut donner lieu à réparation : un outil qui montre cet écart élément par élément rend la discussion beaucoup plus factuelle.",
        },
        {
          type: "p",
          text: "Pour calculer le montant d'une caution, essayez le [calculateur de caution et d'avance](/outils/caution-et-avance).",
        },
      ],
    },
    {
      id: "tester",
      title: "Comment tester un logiciel en une heure",
      blocks: [
        {
          type: "ol",
          items: [
            "Créez un bail fictif de trois pièces et ouvrez un état des lieux d'entrée depuis votre téléphone.",
            "Ajoutez deux photos dans une pièce, avec une légende, et relevez un compteur.",
            "Faites signer l'agence et le locataire, finalisez, puis tentez de modifier le document : il doit être verrouillé.",
            "Exportez le PDF et ouvrez-le sur un autre appareil pour vérifier qu'il est lisible.",
            "Ouvrez l'état des lieux de sortie, modifiez deux éléments et regardez la comparaison avec l'entrée.",
          ],
        },
      ],
    },
    {
      id: "checklist",
      title: "Réussir un état des lieux, quel que soit l'outil",
      blocks: [
        {
          type: "ul",
          items: [
            "Faites-le avec le locataire présent, et notez son nom comme celui de l'agent.",
            "Procédez pièce par pièce : murs, plafond, sol, portes et serrures, fenêtres, prises et interrupteurs, puis équipements de la cuisine et de la salle de bain.",
            "Relevez les compteurs d'eau et d'électricité et comptez les clés remises.",
            "Photographiez les défauts avec leur emplacement, et ajoutez une légende.",
            "Utilisez le même plan à la sortie, pour comparer chaque élément à ce qui avait été noté à l'entrée.",
            "Remettez un exemplaire à chaque partie et conservez le vôtre avec le bail.",
          ],
        },
        {
          type: "p",
          text: "Ces règles de bon sens ne remplacent pas votre contrat : pour la règle exacte applicable à votre bail, demandez conseil à un professionnel du droit.",
        },
      ],
    },
    {
      id: "immotopia",
      title: "Ce que fait ImmoTopia pour vos états des lieux",
      blocks: [
        {
          type: "p",
          text: "ImmoTopia permet à l'agence de réaliser l'état des lieux d'entrée et celui de sortie de chaque bail, pièce par pièce, depuis un ordinateur, une tablette ou un téléphone. L'agent décrit chaque élément, ajoute des photos, relève compteurs et clés, puis fait signer l'agence et le locataire par voie électronique. Le document se finalise, s'exporte ou s'imprime en PDF. Le détail est dans la fiche [États des lieux du wiki](/wiki/gestion-locative/etats-des-lieux).",
        },
        {
          type: "p",
          text: "Les retenues notées à la sortie se règlent ensuite sur la fiche du [dépôt de garantie](/wiki/gestion-locative/depot-de-garantie), où chaque retenue et chaque restitution est tracée. L'ensemble s'inscrit dans la [gestion locative](/gestion-locative-cote-divoire) d'ImmoTopia.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Un état des lieux est-il obligatoire ?",
      a: "C'est une pratique très recommandée : il fixe l'état du logement à l'entrée et sert de référence à la sortie, et votre contrat peut le prévoir. Pour la règle exacte applicable à votre bail, demandez conseil à un professionnel du droit.",
    },
    {
      q: "Peut-on faire un état des lieux sur téléphone ?",
      a: "Oui avec ImmoTopia : l'application s'utilise dans le navigateur d'un téléphone ou d'une tablette, sans application mobile native. Une connexion Internet est nécessaire.",
    },
    {
      q: "Peut-on modifier un état des lieux après la signature ?",
      a: "Dans ImmoTopia, une fois l'état des lieux finalisé, il ne peut plus être modifié, et l'on ne peut plus ajouter ni supprimer de photo. Tant qu'il est en brouillon, il reste modifiable.",
    },
    {
      q: "Comment comparer l'entrée et la sortie ?",
      a: "À l'ouverture de l'état des lieux de sortie, les pièces et les éléments de l'entrée sont repris à vide. Un tableau compare ensuite, élément par élément, l'état à l'entrée, l'état à la sortie et ce qui s'est dégradé.",
    },
    {
      q: "Le locataire reçoit-il le PDF automatiquement ?",
      a: "Non : l'agence exporte le PDF et le transmet elle-même au locataire et au propriétaire. Aucun envoi automatique n'est documenté.",
    },
  ],
  related: ["crm-immobilier-bonnes-pratiques", "bail-commercial-ohada-cote-divoire"],
  productLinks: [
    { label: "Fiche États des lieux du wiki", href: "/wiki/gestion-locative/etats-des-lieux", text: "Chaque action : ouvrir, remplir, signer, finaliser, exporter, comparer." },
    { label: "Modèle d'état des lieux gratuit", href: "/outils/etat-des-lieux", text: "Un PDF d'entrée ou de sortie à remplir sur place, sans inscription." },
    { label: "Gestion locative en Côte d'Ivoire", href: "/gestion-locative-cote-divoire", text: "Baux, échéances, cautions, quittances et portails." },
  ],
  cta: {
    title: "Voyez un état des lieux sur téléphone, de l'entrée à la sortie",
    text: "Une démonstration de 30 minutes, sans engagement, pour réaliser, signer et comparer un état des lieux avec vos propres cas.",
  },
};

/* ------------------------------------------------------------------ Article 3 : bail commercial OHADA */

const OHADA_PAGE = "https://www.ohada.org/droit-commercial-general/";
const OHADA_TEXT = "https://faolex.fao.org/docs/pdf/oha195620.pdf";
const REGISTRATION_PROCEDURE = "https://cotedivoire.eregulations.org/procedure/99/5/step/29?l=fr";

const bailCommercial: Guide = {
  slug: "bail-commercial-ohada-cote-divoire",
  metaTitle: "Bail commercial OHADA en Côte d'Ivoire : guide et modèle PDF",
  metaDescription:
    "Bail commercial OHADA en Côte d'Ivoire : clauses, délais clés (renouvellement, congé, mise en demeure), étapes de signature et modèle PDF gratuit.",
  h1: "Bail commercial OHADA en Côte d'Ivoire : guide et modèle PDF",
  eyebrow: "Guide bail commercial",
  summary: "Les clauses à régler, les délais à retenir et les étapes de signature d'un bail commercial, avec ses références dans l'Acte uniforme OHADA.",
  intro:
    "Louer une boutique, des bureaux ou un atelier en Côte d'Ivoire passe par un bail commercial, que le droit OHADA appelle « bail à usage professionnel ». Ce guide explique comment s'y prendre : les points à régler avant de signer, les délais qui comptent, puis les étapes de la signature et de l'enregistrement. Il s'appuie sur l'Acte uniforme OHADA portant sur le droit commercial général. Pour obtenir le document lui-même, utilisez notre modèle de contrat de bail commercial OHADA en PDF, présenté plus bas.",
  published: "2026-10-13",
  updated: "2026-10-13",
  sections: [
    {
      id: "bail-commercial-ou-usage-professionnel",
      title: "Bail commercial ou bail à usage professionnel ?",
      blocks: [
        {
          type: "p",
          text: "Dans l'Acte uniforme OHADA, il n'existe qu'un seul régime : le « bail à usage professionnel ». Il s'applique aux baux de locaux ou d'immeubles à usage commercial, industriel, artisanal ou à tout autre usage professionnel (art. 101). Ce que l'on appelle couramment « bail commercial » est donc ce même contrat, que ce soit pour une boutique, un atelier, des bureaux ou un cabinet.",
        },
        {
          type: "p",
          text: "Il se distingue du bail d'habitation, qui relève du Code de la construction et de l'habitat. Les 17 États membres de l'OHADA, dont la Côte d'Ivoire, appliquent l'Acte uniforme, révisé à Lomé le 15 décembre 2010, dont les articles 101 à 134 sont consacrés à ces baux.",
        },
      ],
    },
    {
      id: "points-a-regler",
      title: "Les points à régler avant de signer",
      blocks: [
        { type: "p", text: "Chaque point ci-dessous se discute entre bailleur et preneur, puis s'écrit dans le contrat. Adaptez-les à votre situation." },
        {
          type: "ul",
          items: [
            { title: "Durée", text: "les parties la fixent librement, déterminée ou indéterminée. Sans écrit ni terme fixé, le bail est réputé conclu pour une durée indéterminée (art. 103 et 104)." },
            { title: "Loyer et révision", text: "le loyer est librement fixé (art. 116 et 117). Il est révisable dans les conditions prévues par les parties ou, à défaut, lors de chaque renouvellement : mieux vaut une clause de révision claire." },
            { title: "Dépôt de garantie", text: "les articles de l'Acte uniforme sur le bail n'en fixent ni le montant ni le plafond. Le contrat doit préciser la somme versée et les conditions de sa restitution." },
            { title: "Destination des locaux", text: "le preneur exploite les lieux selon l'activité prévue au bail. Il peut y ajouter des activités connexes ou complémentaires en prévenant le bailleur ; un changement d'activité exige l'accord préalable et exprès du bailleur." },
            { title: "Sous-location", text: "elle est interdite sauf stipulation contraire du bail (art. 121). Si elle est autorisée, elle doit être portée à la connaissance du bailleur par écrit, sinon elle ne lui est pas opposable." },
            { title: "Cession du bail", text: "elle doit être signifiée ou notifiée au bailleur (art. 118 à 120), avec l'identité complète du cessionnaire. Son accord est requis, sauf si le preneur cède le bail avec la totalité des éléments qui permettent l'activité." },
            { title: "Réparations", text: "les grosses réparations incombent au bailleur et les réparations d'entretien au preneur ; le contrat peut détailler la répartition." },
          ],
        },
      ],
    },
    {
      id: "delais",
      title: "Les délais à retenir",
      blocks: [
        {
          type: "table",
          caption: "Délais clés d'un bail à usage professionnel dans l'Acte uniforme OHADA",
          head: ["Situation", "Règle", "Articles"],
          rows: [
            ["Droit au renouvellement", "Acquis au preneur qui a exploité l'activité prévue pendant au moins deux ans", "123 et 124"],
            ["Durée du bail renouvelé", "Trois ans au minimum", "123 et 124"],
            ["Demander le renouvellement (bail à durée déterminée)", "Au plus tard trois mois avant l'expiration, par signification d'huissier ou notification permettant d'établir la réception ; passé ce délai, le droit est perdu", "123 et 124"],
            ["Mettre fin à un bail à durée indéterminée", "Congé au moins six mois à l'avance, par signification d'huissier ou notification permettant d'établir la réception", "125"],
            ["Refuser le renouvellement", "Le bailleur verse une indemnité d'éviction, sauf cas limités (motif grave et légitime, démolition et reconstruction)", "126 et 127"],
            ["Demander la résiliation en justice", "Mise en demeure préalable, indiquant les clauses non respectées, avec un délai d'un mois à compter de sa réception", "133"],
          ],
        },
        {
          type: "note",
          text: "Plusieurs de ces règles sont d'ordre public, notamment celles sur le renouvellement (art. 123 à 127) et sur la résiliation (art. 133) : le contrat ne peut pas les écarter (art. 134).",
        },
      ],
    },
    {
      id: "etapes",
      title: "De la négociation à l'enregistrement : les étapes",
      blocks: [
        {
          type: "ol",
          items: [
            { title: "Identifier les parties et les locaux", text: "bailleur, preneur, adresse, usage prévu." },
            { title: "Fixer les conditions", text: "durée, loyer et révision, dépôt de garantie, répartition des réparations, sous-location et cession." },
            { title: "Rédiger un écrit", text: "la convention peut être « écrite ou non » (art. 103), mais l'écrit reste le meilleur moyen de prouver la durée, le loyer et la destination des locaux." },
            { title: "Faire valider le contrat", text: "par un avocat ou un notaire, avant la signature." },
            { title: "Signer et remettre un exemplaire à chaque partie", text: "puis constater l'état des lieux d'entrée (voir le [guide du logiciel d'état des lieux](/guides/logiciel-etat-des-lieux-comparatif))." },
            { title: "Enregistrer le contrat", text: "les articles 101 à 134 ne traitent pas de l'enregistrement fiscal. En pratique, en Côte d'Ivoire, le bail est généralement enregistré auprès des services des impôts : renseignez-vous sur les droits et délais." },
            { title: "Suivre les échéances", text: "notez les dates de renouvellement et de congé dès la signature." },
          ],
        },
      ],
    },
    {
      id: "modele-pdf",
      title: "Le modèle de contrat de bail commercial OHADA en PDF",
      blocks: [
        {
          type: "p",
          text: "Ce guide explique la règle ; le document se génère sur la page dédiée. Notre [modèle de contrat de bail commercial OHADA](/outils/bail-commercial) est gratuit, sans inscription : vous renseignez les parties, le local, le loyer et les clauses, vérifiez l'aperçu, puis téléchargez le PDF. Rien n'est enregistré, le document est produit dans votre navigateur.",
        },
        {
          type: "p",
          text: "Les agences qui gèrent des locaux professionnels peuvent aussi produire leurs baux depuis leurs propres modèles Word : voir la [génération de baux et quittances](/wiki/communication-et-documents/generation-baux-quittances), où le bail commercial s'applique à un bureau, une boutique ou un entrepôt.",
        },
      ],
    },
  ],
  sources: {
    title: "Sources consultées",
    items: [
      { label: "Page de l'Acte uniforme sur le droit commercial général, ohada.org", url: OHADA_PAGE },
      { label: "Texte intégral de l'Acte uniforme du 15 décembre 2010 (FAOLEX)", url: OHADA_TEXT },
      { label: "Portail eRegulations Côte d'Ivoire : procédure d'enregistrement", url: REGISTRATION_PROCEDURE },
    ],
  },
  disclaimer:
    "Ce guide est fourni à titre d'information et ne remplace pas un conseil juridique. Faites valider votre contrat par un avocat ou un notaire avant de le signer.",
  faq: [
    {
      q: "Le bail commercial doit-il être écrit ?",
      a: "L'Acte uniforme OHADA reconnaît un bail conclu par une convention « écrite ou non » (art. 103). Mais à défaut d'écrit ou de terme fixé, il est réputé conclu pour une durée indéterminée (art. 104). Un écrit signé reste donc fortement conseillé.",
    },
    {
      q: "Quelle est la durée d'un bail commercial OHADA ?",
      a: "Les parties fixent librement la durée, déterminée ou indéterminée. Le preneur qui a exploité l'activité prévue pendant au moins deux ans a droit au renouvellement ; en cas de renouvellement, le bail est conclu pour trois ans au minimum.",
    },
    {
      q: "Le preneur peut-il sous-louer ou céder le bail ?",
      a: "Sauf stipulation contraire du bail, toute sous-location est interdite (art. 121). La cession est possible : elle doit être signifiée ou notifiée au bailleur, et son accord est requis, sauf si le preneur cède le bail avec la totalité des éléments qui permettent l'activité (art. 118 à 120).",
    },
    {
      q: "Faut-il enregistrer le bail commercial ?",
      a: "Les articles 101 à 134 ne traitent pas de l'enregistrement fiscal. En pratique, en Côte d'Ivoire, le bail est généralement enregistré auprès des services des impôts. Vérifiez les droits et les délais auprès de l'administration fiscale ou de votre avocat ou notaire.",
    },
    {
      q: "Où trouver un modèle de bail commercial OHADA en PDF ?",
      a: "Sur la page du [modèle de contrat de bail commercial OHADA](/outils/bail-commercial) : il est gratuit et se télécharge en PDF. Il est fourni à titre indicatif et doit être validé par un avocat ou un notaire.",
    },
  ],
  related: ["logiciel-etat-des-lieux-comparatif", "crm-immobilier-bonnes-pratiques"],
  productLinks: [
    { label: "Modèle de bail commercial OHADA (PDF)", href: "/outils/bail-commercial", text: "Générez et téléchargez le contrat, gratuitement et sans inscription." },
    { label: "Modèle de bail d'habitation", href: "/outils/bail-habitation", text: "Pour louer un logement plutôt qu'un local professionnel." },
    { label: "Gestion locative en Côte d'Ivoire", href: "/gestion-locative-cote-divoire", text: "Baux, échéances, cautions et quittances dans une seule application." },
  ],
  cta: {
    title: "Suivez vos baux et vos échéances au même endroit",
    text: "Une démonstration de 30 minutes, sans engagement, pour voir comment ImmoTopia range vos baux, vos loyers et vos documents.",
  },
};

/* ------------------------------------------------------------------ Article 4 : relances */

const relances: Guide = {
  slug: "crm-immobilier-relances",
  metaTitle: "Relances en CRM immobilier : fréquence, messages, WhatsApp",
  metaDescription:
    "Quand et comment relancer un prospect immobilier : repères de fréquence, trois modèles de message, bon usage de WhatsApp et de l'e-mail dans un CRM.",
  h1: "Relances en CRM immobilier : fréquence, messages, WhatsApp",
  eyebrow: "Guide CRM immobilier",
  summary: "Quand relancer, quoi écrire, quel canal choisir : des repères simples pour ne perdre aucun prospect.",
  intro:
    "Un prospect qui n'est pas relancé est un prospect perdu, et la plupart des relances oubliées ne sont pas des refus : ce sont des rappels qui n'avaient pas de date. Voici des repères pour fixer le rythme, écrire des messages courts, bien utiliser WhatsApp et l'e-mail, et garder la trace de chaque échange dans votre CRM. Ces repères sont à adapter à votre marché : ce ne sont pas des statistiques.",
  published: "2026-10-13",
  updated: "2026-10-13",
  sections: [
    {
      id: "frequence",
      title: "À quelle fréquence relancer ?",
      blocks: [
        { type: "p", text: "Le bon rythme dépend de la maturité du projet. Une règle simple : relancez d'autant plus vite que le prospect est proche de décider." },
        {
          type: "table",
          caption: "Repères de fréquence de relance selon l'étape de l'affaire",
          head: ["Situation", "Repère de relance", "Canal conseillé"],
          rows: [
            ["Après une visite", "Dans les jours qui suivent, tant que le souvenir est frais", "Appel ou message WhatsApp"],
            ["Négociation en cours", "Plusieurs fois par semaine si le dossier avance", "Appel, puis récapitulatif par e-mail"],
            ["Projet encore flou", "Une fois par semaine ou toutes les deux semaines", "Message court, une proposition de bien"],
            ["Prospect silencieux", "Une dernière relance, puis clôture avec un motif", "Message WhatsApp ou e-mail"],
          ],
        },
      ],
    },
    {
      id: "messages",
      title: "Trois messages courts à adapter",
      blocks: [
        {
          type: "ul",
          items: [
            { title: "Après une visite", text: "« Bonjour, merci pour votre visite de ce matin. Avez-vous des questions sur le bien ? Je peux vous envoyer le détail des conditions. »" },
            { title: "Proposition d'un bien", text: "« Bonjour, un bien correspond à votre recherche (zone, budget, nombre de pièces). Souhaitez-vous le visiter cette semaine ? »" },
            { title: "Dernière relance", text: "« Bonjour, je n'ai pas eu de retour : votre projet est-il toujours d'actualité ? Dites-moi simplement oui ou non, je clôture sinon votre dossier. »" },
          ],
        },
        { type: "p", text: "Un bon message tient en deux ou trois phrases, rappelle le contexte et pose une seule question." },
      ],
    },
    {
      id: "whatsapp-ou-email",
      title: "WhatsApp ou e-mail ?",
      blocks: [
        {
          type: "ul",
          items: [
            { title: "WhatsApp", text: "rapide et lu vite, idéal pour confirmer une visite ou envoyer une photo. N'écrivez qu'aux contacts qui ont donné leur accord, et évitez les heures tardives." },
            { title: "E-mail", text: "mieux adapté à un récapitulatif, un document ou une offre détaillée." },
            { title: "Appel", text: "pour qualifier un projet ou débloquer une négociation." },
          ],
        },
      ],
    },
    {
      id: "dans-le-crm",
      title: "Garder la trace dans le CRM",
      blocks: [
        {
          type: "p",
          text: "Dans ImmoTopia, chaque échange s'enregistre comme une [activité](/wiki/crm-et-ventes/affaires-et-activites) (appel, e-mail, WhatsApp, visite, réunion, note ou tâche) avec la date de la prochaine relance. Cette date apparaît dans le [calendrier CRM](/wiki/crm-et-ventes/calendrier-et-tableau-de-bord-crm), peut être reprogrammée ou marquée comme faite, et les relances en retard remontent dans le tableau de bord.",
        },
        {
          type: "p",
          text: "Une partie des notifications automatiques du CRM peut aussi partir par e-mail et par WhatsApp, à condition que le service WhatsApp soit configuré pour votre agence et que le contact ait donné son accord : voir les [notifications e-mail et WhatsApp](/wiki/communication-et-documents/notifications-email-whatsapp). Pour choisir l'outil, lisez le guide [Comment choisir son CRM immobilier](/guides/crm-immobilier-bonnes-pratiques).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Combien de relances avant d'abandonner un prospect ?",
      a: "Il n'y a pas de chiffre universel. Fixez une règle d'équipe (par exemple une série de relances espacées, puis une dernière relance claire) et clôturez l'affaire avec un motif plutôt que de la laisser ouverte.",
    },
    {
      q: "Peut-on relancer par WhatsApp tous les contacts ?",
      a: "Non : n'écrivez par WhatsApp qu'aux contacts qui ont donné leur accord. Dans ImmoTopia, les messages WhatsApp ne partent qu'aux contacts qui ont donné leur accord.",
    },
    {
      q: "Comment ne plus oublier une relance ?",
      a: "En fixant la date de la prochaine action à la fin de chaque échange. Dans ImmoTopia, elle apparaît dans le calendrier CRM, et les relances en retard sont signalées dans le tableau de bord.",
    },
  ],
  related: ["crm-immobilier-bonnes-pratiques"],
  productLinks: [
    { label: "Logiciel CRM immobilier", href: "/crm-immobilier-cote-divoire", text: "Contacts, pipeline, visites, mandats, offres et relances." },
    { label: "Wiki CRM et ventes", href: "/wiki/crm-et-ventes", text: "Chaque fonction du CRM, action par action." },
  ],
  cta: {
    title: "Voyez les relances d'ImmoTopia sur vos propres dossiers",
    text: "Une démonstration de 30 minutes, sans engagement, pour programmer, suivre et rattraper vos relances.",
  },
};

/* ------------------------------------------------------------------ Accès */

export const guides: Guide[] = [crmChoisir, relances, etatDesLieux, bailCommercial];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
export const guideHref = (slug?: string) => (slug ? `/guides/${slug}` : "/guides");

/** Texte brut d'une chaîne qui contient des liens « [texte](/chemin) » */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");

const itemText = (item: GuideListItem) => (typeof item === "string" ? item : `${item.title} ${item.text}`);

const blockText = (b: GuideBlock): string[] => {
  switch (b.type) {
    case "p":
    case "h3":
    case "note":
      return [b.text];
    case "ul":
    case "ol":
      return b.items.map(itemText);
    case "table":
      return [...b.head, ...b.rows.flat()];
  }
};

/** Tout le texte visible de l'article (titre, introduction, sections, FAQ), pour compter les mots. */
export function guideText(g: Guide): string {
  return [
    g.h1,
    g.intro,
    ...g.sections.flatMap((s) => [s.title, ...s.blocks.flatMap(blockText)]),
    ...g.faq.flatMap((f) => [f.q, f.a]),
  ]
    .map(plain)
    .join(" ");
}

export const guideWordCount = (g: Guide) => guideText(g).split(/\s+/).filter(Boolean).length;

/** Temps de lecture en minutes (environ 200 mots par minute), 1 minute au minimum */
export const guideReadingMinutes = (g: Guide) => Math.max(1, Math.round(guideWordCount(g) / 200));

export { plain as guidePlain };

// Les titres de page doivent tenir dans l'affichage de Google : le build échoue sinon.
for (const g of guides) {
  if (g.metaTitle.length > 60) throw new Error(`Titre trop long (${g.metaTitle.length}) : ${g.slug}`);
  if (g.metaDescription.length > 160) throw new Error(`Meta description trop longue (${g.metaDescription.length}) : ${g.slug}`);
  for (const r of g.related) if (!guideBySlug(r)) throw new Error(`Guide lié inconnu : ${r} (dans ${g.slug})`);
}
