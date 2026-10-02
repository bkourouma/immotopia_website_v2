import type { WikiDomain } from "./types";

export const maintenance: WikiDomain = {
  slug: "maintenance",
  title: "Maintenance",
  metaTitle: "Gestion de la maintenance immobilière en Côte d'Ivoire",
  summary:
    "Tickets d'intervention, suivi par statut, prestataires, pièces jointes et notifications e-mail et WhatsApp : pilotez la maintenance de vos biens loués.",
  intro:
    "Le module Maintenance centralise les pannes et demandes d'intervention sur vos biens loués. Chaque demande devient un ticket suivi de sa déclaration à sa résolution, avec photos, commentaires et historique. Vous désignez le bon prestataire ou un collaborateur, et le locataire comme le propriétaire sont tenus informés. Il sert aux agences, gestionnaires locatifs, syndics et promoteurs.",
  features: [
    {
      slug: "demandes-d-intervention",
      title: "Demandes d'intervention",
      metaTitle: "Déclarer une panne dans un logement loué : ticket en ligne",
      summary:
        "Enregistrez les pannes signalées par vos locataires : plomberie, électricité, climatisation. Photos, commentaires et suivi de la demande jusqu'à sa résolution.",
      intro:
        "Quand un locataire signale une fuite ou une panne, votre équipe enregistre la demande en son nom, rattachée au bien et, le cas échéant, au bail. Un agent peut aussi déclarer une panne sur un bien sans bail, par exemple un bien en vente ou détenu en propre. La demande porte une catégorie, une priorité et une description précise. Vous y joignez photos ou PDF et suivez les échanges dans un fil de commentaires. Tant qu'elle n'est pas prise en charge, la demande peut encore être corrigée.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Maintenance › Mes demandes",
      status: "disponible",
      actions: [
        {
          title: "Déclarer une demande d'intervention",
          goal: "Ouvrir un ticket pour un incident sur un bien loué.",
          input:
            "Un titre, la catégorie (plomberie, électricité, climatisation ou autre), la priorité (basse, moyenne, haute ou urgente), une description, l'endroit précis dans le logement, le bien et, si besoin, le bail.",
          output: "Un ticket au statut « déclaré », rattaché au bien, au bail et au locataire.",
          prereq:
            "Pour une demande de locataire, un bail actif doit exister sur ce bien (et pour ce locataire s'il est précisé). Un agent peut déclarer sur un bien sans bail ; s'il y a un bail actif, la demande s'y rattache.",
        },
        {
          title: "Consulter mes demandes",
          goal: "Retrouver les demandes déjà enregistrées.",
          input: "Si besoin, un filtre par statut, bien, locataire ou bail.",
          output: "La liste des demandes, par pages.",
        },
        {
          title: "Consulter le détail d'une demande",
          goal: "Voir une demande avec ses pièces jointes, ses commentaires et l'historique de ses statuts.",
        },
        {
          title: "Modifier une demande",
          goal: "Corriger le titre, la description, la catégorie, la priorité ou l'endroit concerné.",
          prereq: "La demande doit être encore au statut « déclaré ».",
        },
        {
          title: "Joindre une photo ou un PDF",
          goal: "Montrer le problème en image ou joindre un document.",
          input: "Une photo JPEG, PNG ou WebP, ou un PDF, de 5 Mo au plus. Jusqu'à 10 pièces jointes par demande.",
          prereq: "La demande doit déjà être enregistrée.",
        },
        {
          title: "Commenter une demande",
          goal: "Ajouter un message au fil de la demande, au nom du locataire.",
          input: "Le message, jusqu'à 5 000 caractères.",
        },
        {
          title: "Annuler une demande",
          goal: "Annuler une demande déclarée ou en cours qui n'a plus lieu d'être.",
        },
        {
          title: "Supprimer une demande",
          goal: "Effacer définitivement une demande qui n'a pas été traitée, avec ses pièces jointes.",
          prereq: "La demande doit être au statut « déclaré » ou « annulé ».",
        },
      ],
      faq: [
        {
          q: "Peut-on corriger une demande après l'avoir enregistrée ?",
          a: "Oui, tant qu'elle est au statut « déclaré » : titre, description, catégorie, priorité et endroit concerné restent modifiables.",
        },
        {
          q: "Quels fichiers peut-on joindre ?",
          a: "Des photos JPEG, PNG ou WebP et des PDF, de 5 Mo au plus chacun, jusqu'à 10 pièces jointes par demande.",
        },
      ],
      related: ["maintenance/tickets-de-maintenance"],
    },
    {
      slug: "tickets-de-maintenance",
      title: "Traitement des tickets",
      metaTitle: "Suivi des tickets de maintenance et des interventions",
      summary:
        "Suivez tous les tickets de maintenance de l'agence : filtres, changement de statut, prestataire assigné, notes de résolution et historique de chaque bien.",
      intro:
        "Côté agence, les gestionnaires voient tous les tickets, quel que soit le déclarant. Ils les font avancer étape par étape, désignent un prestataire ou un collaborateur et notent la résolution. À chaque étape, le locataire et le propriétaire sont prévenus par e-mail ou WhatsApp. L'historique de maintenance de chaque bien reste consultable depuis sa fiche.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Maintenance › Tickets de l'agence",
      status: "disponible",
      actions: [
        {
          title: "Consulter tous les tickets de l'agence",
          goal: "Avoir une vue d'ensemble des tickets et les trier selon vos besoins.",
          input: "Si besoin, des filtres : bien, statut, priorité, prestataire assigné, période.",
          output: "La liste des tickets, par pages.",
        },
        {
          title: "Consulter le détail d'un ticket",
          goal: "Voir le ticket complet, quel que soit le déclarant : pièces jointes, commentaires, historique des statuts.",
        },
        {
          title: "Faire avancer un ticket",
          goal: "Passer le ticket d'une étape à la suivante : déclaré, en cours, assigné, puis résolu, ou bien annulé. Aucune étape ne peut être sautée.",
          output:
            "Le statut mis à jour, l'historique complété, et le locataire et le propriétaire prévenus par e-mail ou WhatsApp.",
          prereq: "Pour passer à « assigné », un prestataire ou un collaborateur doit déjà être désigné.",
        },
        {
          title: "Assigner un prestataire ou un collaborateur",
          goal: "Désigner qui intervient et qui suit le ticket.",
          input: "Le prestataire, le collaborateur responsable, ou les deux.",
          output: "Le ticket assigné. S'il était en cours, il passe automatiquement au statut « assigné ».",
          prereq:
            "Le prestataire doit être enregistré et actif ; le collaborateur doit être un membre actif de l'agence.",
        },
        {
          title: "Revoir la priorité et noter la résolution",
          goal: "Réévaluer l'urgence d'un ticket ou documenter la façon dont il a été réglé.",
          input: "La nouvelle priorité et les notes de résolution, jusqu'à 1 000 caractères.",
        },
        {
          title: "Répondre sur un ticket",
          goal: "Ajouter un commentaire de gestionnaire, visible sur le ticket.",
          input: "Le message, jusqu'à 5 000 caractères.",
        },
        {
          title: "Ouvrir une pièce jointe",
          goal: "Consulter une photo ou un PDF joint à un ticket, depuis les tickets de l'agence ou les demandes.",
        },
        {
          title: "Consulter l'historique de maintenance d'un bien",
          goal: "Depuis la fiche du bien, voir tous ses tickets passés et en cours, du plus récent au plus ancien.",
          input: "Si besoin, un filtre par statut ou par catégorie.",
        },
        {
          title: "Prévenir automatiquement les parties",
          goal: "À la création d'un ticket et à chaque changement de statut, l'agence, le locataire et le propriétaire sont prévenus par e-mail, et par WhatsApp s'ils l'ont accepté.",
          output: "Des messages envoyés selon les réglages de notification de l'agence.",
        },
      ],
      faq: [
        {
          q: "Le propriétaire est-il tenu informé ?",
          a: "Oui. À la création du ticket et à chaque changement de statut, le locataire et le propriétaire sont prévenus par e-mail, et par WhatsApp s'ils l'ont accepté.",
        },
        {
          q: "Peut-on retrouver toutes les pannes d'un même bien ?",
          a: "Oui. L'historique de maintenance du bien liste tous ses tickets, passés et en cours, filtrables par statut et par catégorie.",
        },
      ],
      related: ["maintenance/demandes-d-intervention", "maintenance/prestataires-de-maintenance"],
    },
    {
      slug: "prestataires-de-maintenance",
      title: "Prestataires",
      metaTitle: "Gérer vos prestataires de maintenance immobilière",
      summary:
        "Tenez à jour le carnet de vos artisans et prestataires : coordonnées, spécialités, activation. Le même carnet sert à la maintenance et au module Syndic.",
      intro:
        "Plombier, électricien, frigoriste : vos prestataires habituels sont enregistrés une fois, avec leurs coordonnées et leurs spécialités. Vous les retrouvez au moment d'assigner un ticket. Un prestataire avec qui vous ne travaillez plus se désactive sans perdre son historique. Le carnet est partagé avec le module Syndic.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Maintenance › Prestataires",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer un prestataire",
          goal: "Ajouter un prestataire au carnet de l'agence.",
          input: "Son nom, son téléphone, son e-mail, son adresse et ses spécialités.",
          output: "Un prestataire actif, prêt à être assigné.",
          prereq:
            "Le nom ne doit pas déjà exister dans le carnet de l'agence, sans tenir compte des majuscules ni des espaces autour.",
        },
        {
          title: "Consulter la liste des prestataires",
          goal: "Parcourir le carnet et retrouver un prestataire.",
          input: "Si besoin, une recherche et un filtre actifs ou inactifs.",
        },
        {
          title: "Consulter la fiche d'un prestataire",
          goal: "Voir le nom, les coordonnées, les spécialités et l'état actif ou inactif d'un prestataire.",
        },
        {
          title: "Modifier un prestataire",
          goal: "Mettre à jour ses coordonnées, ses spécialités ou le rendre de nouveau actif.",
          prereq: "Si vous changez le nom, il doit rester unique dans le carnet de l'agence.",
        },
        {
          title: "Désactiver un prestataire",
          goal: "Retirer un prestataire de la liste des prestataires assignables, sans le supprimer.",
          prereq: "Aucun ticket non résolu ne doit lui être assigné.",
        },
        {
          title: "Lister les prestataires actifs pour une assignation",
          goal: "Alimenter la liste de choix des prestataires au moment d'assigner un ticket.",
          output: "Les prestataires actifs seulement.",
          status: "deploiement",
        },
        {
          title: "Supprimer définitivement un prestataire",
          goal: "Effacer un prestataire qui n'a jamais servi.",
          prereq:
            "Il ne doit avoir reçu aucun ticket, même résolu, ni être lié à un contrat de maintenance du module Syndic.",
        },
      ],
      faq: [
        {
          q: "Peut-on supprimer un prestataire qui a déjà travaillé pour nous ?",
          a: "Non : il reste dans l'historique de ses tickets. Vous pouvez en revanche le désactiver dès qu'il n'a plus de ticket non résolu, pour qu'il ne soit plus proposé.",
        },
      ],
      related: ["maintenance/tickets-de-maintenance"],
    },
  ],
};
