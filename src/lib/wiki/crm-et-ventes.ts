import type { WikiDomain } from "./types";

export const crmEtVentes: WikiDomain = {
  slug: "crm-et-ventes",
  title: "CRM et ventes",
  metaTitle: "Logiciel CRM immobilier et ventes en Côte d'Ivoire",
  summary:
    "Contacts, affaires, relances, rapprochement de biens et mandats de vente : le CRM immobilier d'ImmoTopia pour suivre chaque prospect jusqu'à la vente.",
  intro:
    "Ce domaine couvre tout le travail commercial de l'agence : fichier de contacts, affaires en cours, activités et relances, calendrier, rapprochement entre biens et acquéreurs. Il se prolonge par la vente : mandats de vente, offres d'achat, compromis, conditions suspensives, échéancier de l'acquéreur et commissions. Il s'adresse aux directeurs d'agence, aux gestionnaires et aux agents commerciaux. Chaque prospect a son historique complet, et chaque vente se suit du mandat jusqu'à l'acte.",
  features: [
    {
      slug: "contacts-prospects",
      title: "Contacts et prospects",
      metaTitle: "Fichier clients et prospects pour agence immobilière",
      summary:
        "Centralisez prospects, propriétaires, locataires et acquéreurs dans un fichier unique : fiche détaillée, étiquettes, rôles et passage de prospect à client.",
      intro:
        "Le fichier de contacts réunit toutes les personnes et sociétés avec qui l'agence travaille. Chaque fiche montre les rôles du contact, ses affaires, ses échanges et les zones qu'il recherche. Vos équipes ne cherchent plus un numéro dans un cahier ou un téléphone : tout est au même endroit, filtrable et partagé.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "CRM › Contacts",
      status: "disponible",
      actions: [
        {
          title: "Créer un contact",
          goal: "Enregistrer un prospect ou un client, particulier ou société.",
          input:
            "Nom, prénom et e-mail, puis au besoin la civilité, les coordonnées, l'adresse et la zone, la situation professionnelle, le projet immobilier, l'origine du contact et ses consentements.",
          output:
            "La fiche du contact, prête à être suivie. Une société s'affiche sous sa raison sociale dans les listes, et un e-mail déjà utilisé est refusé avec un message clair.",
          prereq: "La commune est requise, même si vous n'avez pas ouvert l'onglet Contact du formulaire.",
        },
        {
          title: "Consulter la fiche d'un contact",
          goal: "Voir sur un seul écran les rôles du contact, ses affaires, ses activités, ses étiquettes et les zones qu'il recherche.",
        },
        {
          title: "Lister et filtrer les contacts",
          goal: "Retrouver rapidement les bons contacts dans une liste paginée.",
          input:
            "Un ou plusieurs filtres : statut, origine, collaborateur responsable, étiquette, texte libre, dates, affaire en cours, prochaine action prévue.",
        },
        {
          title: "Modifier un contact",
          goal: "Mettre à jour les informations du contact, y compris son statut, le collaborateur qui le suit et ses consentements.",
        },
        {
          title: "Supprimer un contact",
          goal: "Effacer définitivement un contact et ses données commerciales liées : étiquettes, zones, rôles, activités et affaires.",
        },
        {
          title: "Étiqueter un contact",
          goal: "Classer vos contacts par étiquette pour les retrouver et les regrouper facilement.",
          output: "L'étiquette apparaît sur la fiche. Si elle y était déjà, rien ne change.",
          prereq: "L'étiquette existe dans la liste de l'agence.",
        },
        {
          title: "Retirer une étiquette d'un contact",
          goal: "Enlever une étiquette qui ne correspond plus au contact.",
        },
        {
          title: "Créer une étiquette",
          goal: "Ajouter une étiquette réutilisable par toute l'équipe.",
          input: "Un nom et, si vous le souhaitez, une couleur.",
          output: "L'étiquette rejoint la liste de l'agence. Un nom déjà utilisé est refusé.",
        },
        {
          title: "Consulter les étiquettes de l'agence",
          goal: "Voir la liste commune des étiquettes disponibles pour classer les contacts.",
        },
        {
          title: "Convertir un prospect en client",
          goal: "Donner au contact un ou plusieurs rôles : propriétaire, locataire, copropriétaire ou acquéreur.",
          output: "Le contact passe au statut de client actif avec ses rôles.",
          prereq: "Le contact est encore au statut de prospect.",
        },
        {
          title: "Mettre à jour les rôles d'un contact",
          goal: "Ajouter et retirer des rôles en une seule fois.",
          output:
            "Les rôles sont à jour. Un contact sans aucun rôle redevient prospect ; avec au moins un rôle, il est client actif.",
        },
        {
          title: "Retirer un rôle à un contact",
          goal: "Supprimer un rôle précis, par exemple quand un locataire a quitté le logement.",
          output: "Le rôle disparaît. S'il n'en reste aucun, le contact redevient prospect.",
        },
      ],
      faq: [
        {
          q: "Comment distinguer un prospect d'un client ?",
          a: "Un contact reste prospect tant qu'il n'a aucun rôle. Dès que vous lui attribuez un rôle (propriétaire, locataire, copropriétaire ou acquéreur), il devient client actif.",
        },
        {
          q: "Peut-on classer les contacts par catégorie ?",
          a: "Oui. Vous créez des étiquettes, avec une couleur si vous le souhaitez, puis vous les posez sur les contacts et filtrez la liste par étiquette.",
        },
      ],
      related: [
        "crm-et-ventes/recherche-avancee-contacts",
        "crm-et-ventes/affaires-et-activites",
        "communication-et-documents/listes-de-diffusion-newsletter",
      ],
    },
    {
      slug: "recherche-avancee-contacts",
      title: "Recherche avancée de contacts",
      metaTitle: "Recherche multicritère de contacts pour agence immobilière",
      summary:
        "Retrouvez les bons contacts par budget, zone, étiquette, rôle ou consentement, enregistrez vos recherches et exportez les résultats en CSV en un clic.",
      intro:
        "La recherche avancée permet de combiner de nombreux critères pour cibler précisément une partie de votre fichier : acquéreurs d'un budget donné, propriétaires d'une zone, contacts sans relance prévue. Vous enregistrez les recherches que vous refaites souvent. Les résultats servent au suivi commercial comme à la préparation de vos envois.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "CRM › Contacts",
      status: "disponible",
      actions: [
        {
          title: "Rechercher des contacts selon plusieurs critères",
          goal: "Isoler un groupe de contacts précis, pour le suivi commercial ou pour préparer une liste de diffusion.",
          input:
            "Les critères utiles : statut, budget, zone, étiquettes, rôles, consentements, dates, activité récente… Des suggestions s'affichent pendant la saisie.",
          output:
            "La liste des contacts correspondants, avec leurs étiquettes, leurs affaires en cours, leurs rôles et leur prochaine action.",
        },
        {
          title: "Enregistrer une recherche",
          goal: "Garder un jeu de filtres sous un nom pour le réutiliser plus tard.",
          input: "Un nom, une description si besoin, et les filtres de la recherche.",
        },
        {
          title: "Retrouver ses recherches enregistrées",
          goal: "Afficher la liste des recherches que vous avez enregistrées.",
        },
        {
          title: "Relancer une recherche enregistrée",
          goal: "Obtenir en un clic les résultats à jour d'une recherche déjà enregistrée.",
        },
        {
          title: "Supprimer une recherche enregistrée",
          goal: "Retirer une recherche dont vous n'avez plus besoin.",
        },
        {
          title: "Exporter les résultats en CSV",
          goal: "Télécharger la liste des contacts trouvés pour la travailler dans un tableur.",
          output: "Un fichier CSV des contacts filtrés.",
        },
      ],
      related: [
        "crm-et-ventes/contacts-prospects",
        "communication-et-documents/listes-de-diffusion-newsletter",
      ],
    },
    {
      slug: "affaires-et-activites",
      title: "Affaires et activités",
      metaTitle: "Pipeline commercial et suivi des affaires immobilières",
      summary:
        "Ouvrez une affaire par projet client, faites-la avancer de la qualification à la signature et gardez l'historique de chaque appel, visite ou message.",
      intro:
        "Une affaire, c'est un projet concret d'un contact : acheter, louer, vendre, confier une gestion ou un mandat. Vous la faites avancer étape par étape jusqu'à la réussite ou l'abandon. Chaque appel, visite ou message s'enregistre comme une activité, avec la date de la prochaine relance. Le directeur voit où en est chaque dossier, sans réunion de point.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Créer une affaire",
          goal: "Ouvrir un dossier d'achat, de location, de vente, de gestion ou de mandat pour un contact.",
          input:
            "Le contact, le type d'affaire, le budget minimum et maximum, la zone, les critères recherchés, la valeur attendue et le collaborateur responsable.",
          output: "Une affaire au stade « nouvelle », prête à être qualifiée.",
          prereq: "Le contact est enregistré.",
        },
        {
          title: "Consulter une affaire",
          goal: "Voir le contact, les activités récentes et les biens qui correspondent à sa recherche.",
        },
        {
          title: "Lister et filtrer les affaires",
          goal: "Suivre l'ensemble des dossiers en cours.",
          input: "Des filtres : type, étape, collaborateur, contact, budget, dates.",
        },
        {
          title: "Faire avancer une affaire dans le pipeline",
          goal: "Passer l'affaire d'une étape à l'autre : nouvelle, qualifiée, visite, négociation, puis gagnée ou perdue. Vous ajustez aussi le budget, les critères, la probabilité de succès ou le collaborateur.",
          output:
            "L'affaire à jour. Une affaire gagnée ou perdue est close avec sa date et son motif. Si un collègue l'a modifiée entre-temps, vous en êtes averti au lieu d'écraser son travail.",
        },
        {
          title: "Enregistrer une activité",
          goal: "Garder la trace d'un échange avec un contact : appel, e-mail, WhatsApp, visite, réunion, note ou tâche.",
          input:
            "Le contact, le type d'activité, le compte rendu et, si besoin, l'affaire concernée, le sens de l'échange et la date de la prochaine relance.",
          output:
            "L'activité apparaît dans l'historique et la date du dernier échange du contact est mise à jour. Une erreur se corrige par une activité de correction liée à la première.",
          prereq: "Le contact est enregistré.",
        },
        {
          title: "Consulter l'historique des activités",
          goal: "Relire les échanges passés, avec leurs corrections éventuelles.",
          input: "Des filtres : contact, affaire, type d'activité, auteur, période.",
        },
      ],
      faq: [
        {
          q: "Quelles sont les étapes d'une affaire ?",
          a: "Nouvelle, qualifiée, visite, négociation, puis gagnée ou perdue. Une affaire close garde sa date et son motif de clôture.",
        },
        {
          q: "Peut-on programmer une relance après un appel ?",
          a: "Oui. En enregistrant l'activité, vous indiquez la date de la prochaine action ; elle apparaît ensuite dans le calendrier CRM.",
        },
      ],
      related: [
        "crm-et-ventes/calendrier-et-tableau-de-bord-crm",
        "crm-et-ventes/rapprochement-de-biens",
        "crm-et-ventes/contacts-prospects",
      ],
    },
    {
      slug: "calendrier-et-tableau-de-bord-crm",
      title: "Calendrier et tableau de bord CRM",
      metaTitle: "Calendrier des relances et tableau de bord CRM immobilier",
      summary:
        "Relances et visites dans un seul calendrier, indicateurs commerciaux en un coup d'œil : suivez l'activité de l'équipe et ne laissez filer aucun prospect.",
      intro:
        "Le calendrier CRM rassemble les relances prévues et les visites de biens, pour vous seul ou pour toute l'agence. Le tableau de bord résume l'activité commerciale : nouveaux prospects, conversions, affaires gagnées, relances en retard. Le directeur voit où agir, l'agent sait quoi faire aujourd'hui.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau de bord CRM",
          goal: "Voir en un coup d'œil la santé commerciale de l'agence.",
          output:
            "Les nouveaux prospects, les conversions, les affaires créées et gagnées, les relances en retard, le pipeline, l'entonnoir de conversion, l'évolution dans le temps, une liste de travail et la performance de l'équipe.",
        },
        {
          title: "Consulter le calendrier CRM",
          goal: "Voir sur une période les relances à faire et les visites de biens prévues.",
          input:
            "La période (de début et de fin obligatoires, 366 jours au plus), la portée (toute l'agence ou vous seul) et les types d'événements à afficher.",
        },
        {
          title: "Reprogrammer une relance",
          goal: "Décaler la date de la prochaine action prévue sur une activité.",
          prereq: "Une activité avec une date de relance.",
        },
        {
          title: "Marquer une relance comme faite",
          goal: "Retirer une relance du calendrier une fois qu'elle est traitée.",
          prereq: "Une activité avec une date de relance.",
        },
      ],
      related: [
        "crm-et-ventes/affaires-et-activites",
        "crm-et-ventes/commissions-de-vente",
      ],
    },
    {
      slug: "rapprochement-de-biens",
      title: "Rapprochement de biens",
      metaTitle: "Rapprochement biens et acquéreurs pour agence immobilière",
      summary:
        "Trouvez les biens qui correspondent à chaque client selon son budget, sa zone, les pièces et la surface, puis suivez votre sélection de biens proposés.",
      intro:
        "Depuis la fiche d'une affaire, ImmoTopia compare les critères du client avec vos biens disponibles et donne un score de correspondance expliqué. Vous gardez une sélection de biens pour chaque client et suivez ce qui a été proposé, visité ou refusé. Fini les recherches à la main dans le portefeuille à chaque nouvelle demande.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Lancer un rapprochement de biens",
          goal: "Calculer, pour une affaire, la correspondance entre les critères du client et les biens disponibles.",
          output:
            "Une liste de biens classés par score, avec l'explication du score (budget, localisation, nombre de pièces, surface).",
          prereq: "Les critères du client (budget, zone, pièces, surface) sont renseignés dans l'affaire.",
        },
        {
          title: "Lancer un rapprochement par l'ancien écran",
          goal: "Un second chemin, conservé pour compatibilité, permet aussi de lancer le rapprochement d'une affaire, d'ajouter un bien à la sélection et d'en changer le statut. Le résultat est le même qu'avec le chemin principal.",
        },
        {
          title: "Consulter les biens retenus pour une affaire",
          goal: "Revoir les biens déjà mis en correspondance ou sélectionnés, du meilleur score au plus faible.",
        },
        {
          title: "Ajouter un bien à la sélection d'un client",
          goal: "Retenir un bien à la main pour une affaire, même hors rapprochement automatique.",
          input: "Le bien et, si besoin, un score, une explication et le propriétaire à l'origine du bien.",
          prereq: "L'affaire et le bien sont enregistrés.",
        },
        {
          title: "Suivre le statut d'un bien proposé",
          goal: "Indiquer où en est chaque bien de la sélection : proposé, visité, refusé…",
          prereq: "Le bien fait partie de la sélection de l'affaire.",
        },
      ],
      faq: [
        {
          q: "Sur quels critères se fait le rapprochement ?",
          a: "Le score compare le budget, la localisation, le nombre de pièces et la surface recherchés par le client avec ceux de vos biens disponibles.",
        },
      ],
      related: [
        "crm-et-ventes/affaires-et-activites",
        "crm-et-ventes/mandats-de-vente",
      ],
    },
    {
      slug: "mandats-de-vente",
      title: "Mandats de vente",
      metaTitle: "Logiciel de gestion des mandats de vente en Côte d'Ivoire",
      summary:
        "Enregistrez vos mandats de vente avec prix demandé, prix plancher et commission, suivez-les par statut et révoquez-les proprement si le vendeur se retire.",
      intro:
        "Le mandat de vente formalise l'engagement du vendeur envers l'agence. Vous y fixez le prix demandé, le prix plancher, la commission et le négociateur. Chaque mandat reçoit un numéro par année, et la fiche réunit les co-vendeurs, les offres, le compromis et la commission. Un bien ne peut avoir qu'un seul mandat actif à la fois.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Ventes › Mandats de vente",
      status: "disponible",
      actions: [
        {
          title: "Créer un mandat de vente",
          goal: "Enregistrer le mandat confié par le vendeur pour vendre un bien.",
          input:
            "Le bien, le vendeur, le type de mandat, le prix demandé et le prix plancher, le mode et le taux de commission (en pourcentage : supérieur à 0 et de 20 % au plus), qui paie la commission, la date de début et le négociateur.",
          output: "Le mandat, avec un numéro qui suit l'ordre de l'année.",
          prereq:
            "Le bien et le vendeur sont enregistrés, le négociateur est un collaborateur actif, et le bien n'a pas déjà un mandat actif.",
        },
        {
          title: "Lister et filtrer les mandats de vente",
          goal: "Suivre tous les mandats de l'agence.",
          input: "Le statut, le bien, ou une recherche par numéro, bien ou vendeur.",
        },
        {
          title: "Consulter un mandat",
          goal: "Voir la fiche complète : co-vendeurs, offres reçues, compromis et commission.",
        },
        {
          title: "Modifier un mandat",
          goal: "Ajuster le prix, la commission (même règle sur le taux : supérieur à 0 et de 20 % au plus), les dates ou le négociateur.",
          prereq: "Le mandat est actif et aucun compromis n'est signé ou conclu.",
        },
        {
          title: "Révoquer un mandat",
          goal: "Mettre fin au mandat avant son terme, avec un motif.",
          output: "Le mandat est révoqué et les offres encore ouvertes sont closes.",
          prereq:
            "Le mandat est actif, sans compromis signé et sans offre acceptée en cours (à retirer d'abord).",
        },
      ],
      faq: [
        {
          q: "Peut-on avoir deux mandats actifs sur le même bien ?",
          a: "Non. Un bien ne peut avoir qu'un seul mandat de vente actif à la fois.",
        },
        {
          q: "Peut-on modifier un mandat après la signature du compromis ?",
          a: "Non. Le mandat se modifie tant qu'il est actif et qu'aucun compromis n'est signé ou conclu.",
        },
      ],
      related: [
        "crm-et-ventes/offres-et-compromis-de-vente",
        "crm-et-ventes/commissions-de-vente",
        "crm-et-ventes/rapprochement-de-biens",
      ],
    },
    {
      slug: "offres-et-compromis-de-vente",
      title: "Offres et compromis de vente",
      metaTitle: "Offres d'achat et compromis de vente : logiciel immobilier",
      summary:
        "Enregistrez les offres d'achat, négociez par contre-offre, puis passez au compromis de vente jusqu'à la conclusion à l'acte, étape par étape dans ImmoTopia.",
      intro:
        "Depuis la fiche d'un mandat, vous enregistrez les offres des acquéreurs, faites des contre-offres, acceptez ou refusez. L'offre acceptée devient un compromis : prix, dépôt, notaire, date d'acte prévue. À la conclusion, le bien passe en vendu, le mandat se termine, l'affaire est gagnée et la commission est créée. Chaque étape met à jour le statut du bien pour toute l'équipe.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Ventes › Mandats de vente",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer une offre d'achat",
          goal: "Déposer l'offre d'un acquéreur sur un mandat en cours. Le choix de l'affaire d'origine affiche le contact, le type et le montant, sans les affaires déjà gagnées ou perdues.",
          input:
            "L'acquéreur, le montant, le mode de financement et, si besoin, l'affaire liée, les conditions et la date limite de validité.",
          output: "L'offre, avec son numéro.",
          prereq: "Le mandat est actif et l'acquéreur est enregistré comme contact.",
        },
        {
          title: "Faire une contre-offre",
          goal: "Répondre à l'acquéreur avec un autre montant.",
          input: "Le montant de la contre-offre.",
        },
        {
          title: "Accepter une offre",
          goal: "Retenir l'offre de l'acquéreur.",
          output: "L'offre est acceptée et le bien est réservé.",
        },
        {
          title: "Refuser ou retirer une offre",
          goal: "Écarter une offre, avec un motif obligatoire.",
          output: "L'offre est close. Si elle avait été acceptée, le statut du bien est mis à jour.",
        },
        {
          title: "Préparer le compromis de vente",
          goal: "Créer le compromis à partir de l'offre acceptée.",
          input: "Le prix, le montant du dépôt et qui le détient, le notaire, la date prévue de l'acte.",
          output: "Un compromis en brouillon.",
          prereq: "L'offre est acceptée. Une offre ne donne lieu qu'à un seul compromis.",
        },
        {
          title: "Lister et filtrer les compromis",
          goal: "Suivre tous les compromis de l'agence par statut.",
        },
        {
          title: "Consulter un compromis",
          goal: "Voir la fiche du compromis avec ses conditions suspensives, l'échéancier de l'acquéreur et la commission.",
        },
        {
          title: "Modifier un compromis",
          goal: "Ajuster le prix, le dépôt, le notaire ou la date prévue de l'acte.",
          prereq: "Le compromis n'est ni conclu ni annulé.",
        },
        {
          title: "Signer un compromis",
          goal: "Enregistrer la signature du compromis.",
          input: "La date de signature.",
          output: "Le compromis est signé et le bien passe « sous offre ».",
          prereq: "Le compromis est en brouillon.",
        },
        {
          title: "Conclure la vente à l'acte",
          goal: "Clore la vente une fois l'acte passé.",
          input: "La date de l'acte.",
          output:
            "Le bien passe en vendu, le mandat est terminé, les autres offres sont closes, l'affaire liée est gagnée et la commission de vente est créée automatiquement.",
          prereq:
            "Le compromis est signé et toutes les conditions suspensives sont levées (satisfaites ou abandonnées).",
        },
        {
          title: "Annuler un compromis",
          goal: "Annuler un compromis en brouillon ou signé, avec un motif.",
          output: "Le compromis est annulé et le bien redevient disponible.",
          prereq: "Le compromis n'est pas conclu.",
        },
      ],
      faq: [
        {
          q: "Que se passe-t-il quand la vente est conclue ?",
          a: "Le bien passe en vendu, le mandat se termine, les autres offres sont closes, l'affaire liée est marquée gagnée et la commission de vente est créée automatiquement.",
        },
        {
          q: "Peut-on conclure la vente si le prêt de l'acquéreur n'est pas encore obtenu ?",
          a: "Non. Toutes les conditions suspensives du compromis doivent être levées, satisfaites ou abandonnées, avant de conclure à l'acte.",
        },
      ],
      related: [
        "crm-et-ventes/mandats-de-vente",
        "crm-et-ventes/conditions-suspensives-et-echeancier",
        "crm-et-ventes/commissions-de-vente",
      ],
    },
    {
      slug: "conditions-suspensives-et-echeancier",
      title: "Conditions suspensives et échéancier",
      metaTitle: "Conditions suspensives et échéancier de paiement de vente",
      summary:
        "Suivez les conditions suspensives d'un compromis, comme l'obtention du prêt, et fixez l'échéancier de paiement de l'acquéreur jusqu'à la signature de l'acte.",
      intro:
        "Entre le compromis et l'acte, plusieurs clauses doivent être levées : obtention d'un prêt, pièce administrative… Vous les listez avec leur échéance et suivez leur sort. Vous fixez aussi les échéances de paiement de l'acquéreur. La vente ne peut être conclue que lorsque toutes les conditions sont levées.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Ventes › Mandats de vente",
      status: "disponible",
      actions: [
        {
          title: "Ajouter une condition suspensive",
          goal: "Inscrire une clause à lever avant l'acte, par exemple l'obtention d'un prêt.",
          input: "Le libellé, l'échéance et, si besoin, le statut de départ.",
          prereq: "Le compromis existe et n'est ni conclu ni annulé.",
        },
        {
          title: "Mettre à jour une condition suspensive",
          goal: "Changer le libellé ou l'échéance, ou indiquer que la condition est satisfaite, abandonnée ou non réalisée.",
          prereq: "Le compromis n'est ni conclu ni annulé.",
        },
        {
          title: "Supprimer une condition suspensive",
          goal: "Retirer une condition ajoutée par erreur.",
          prereq: "Le compromis est encore en brouillon.",
        },
        {
          title: "Établir l'échéancier de paiement de l'acquéreur",
          goal: "Définir, ou refaire entièrement, la liste des paiements attendus de l'acquéreur.",
          input: "Pour chaque échéance : un libellé, un montant et une date.",
          output: "L'échéancier du compromis, à jour.",
          prereq: "Le compromis existe et n'est pas annulé.",
        },
      ],
      related: [
        "crm-et-ventes/offres-et-compromis-de-vente",
        "crm-et-ventes/commissions-de-vente",
      ],
    },
    {
      slug: "commissions-de-vente",
      title: "Commissions et tableau des ventes",
      metaTitle: "Suivi des ventes et commissions d'agence immobilière",
      summary:
        "Mandats, offres, compromis et ventes du mois sur un tableau unique, et suivi des commissions de vente : montant dû, règlements encaissés, reste à percevoir.",
      intro:
        "Le tableau des ventes donne l'état du portefeuille : mandats actifs et expirés, offres ouvertes, compromis signés, ventes du mois et commissions. Chaque vente conclue crée sa commission, que vous encaissez en un ou plusieurs règlements. Le directeur et le comptable savent à tout moment ce qui est dû, payé et restant.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe", "comptable"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau des ventes",
          goal: "Voir l'activité de vente de l'agence depuis Ventes › Tableau des ventes.",
          output:
            "Le nombre et la valeur des mandats actifs et expirés, les offres ouvertes, les compromis signés et leur valeur, les ventes du mois, les commissions dues et encaissées ce mois.",
        },
        {
          title: "Lister les commissions de vente",
          goal: "Suivre toutes les commissions par statut.",
          output: "La liste des commissions avec les totaux dû, payé et restant.",
          prereq: "Une vente conclue à l'acte, qui crée la commission.",
        },
        {
          title: "Consulter une commission",
          goal: "Voir le détail d'une commission : base de calcul, montants hors taxe, TVA et toutes taxes comprises, part du négociateur et règlements reçus.",
        },
        {
          title: "Encaisser un règlement de commission",
          goal: "Enregistrer un paiement reçu sur une commission.",
          input: "Le montant, la date, le moyen de paiement, le compte de trésorerie et une référence si besoin.",
          output:
            "Le règlement est enregistré, l'écriture comptable est passée automatiquement et la commission devient partiellement payée ou payée.",
          prereq:
            "La commission n'est pas annulée, le montant ne dépasse pas le reste dû et un compte de trésorerie est disponible.",
        },
        {
          title: "Annuler un règlement de commission",
          goal: "Revenir sur un règlement enregistré par erreur, avec un motif.",
          output: "Le règlement est annulé, son écriture est contrepassée et le statut de la commission est recalculé.",
        },
      ],
      faq: [
        {
          q: "La commission est-elle créée automatiquement ?",
          a: "Oui. Quand la vente est conclue à l'acte, la commission de vente est créée automatiquement ; il ne reste qu'à encaisser ses règlements.",
        },
        {
          q: "Peut-on encaisser une commission en plusieurs fois ?",
          a: "Oui. Chaque règlement s'ajoute, dans la limite du reste dû, et la commission passe de due à partiellement payée puis payée.",
        },
      ],
      related: [
        "crm-et-ventes/offres-et-compromis-de-vente",
        "crm-et-ventes/mandats-de-vente",
      ],
    },
  ],
};
