import type { WikiDomain } from "./types";

export const syndicCopropriete: WikiDomain = {
  slug: "syndic-copropriete",
  title: "Syndic de copropriété",
  metaTitle: "Logiciel de syndic de copropriété en Côte d'Ivoire",
  summary:
    "Logiciel de syndic en Côte d'Ivoire : lots et tantièmes, budget prévisionnel, appels de charges, impayés, assemblées générales et comptabilité de copropriété.",
  intro:
    "Le module Syndic réunit tout ce qu'un cabinet de syndic gère au quotidien : la fiche de chaque copropriété, ses lots et leurs tantièmes, les copropriétaires et les occupants, les prestataires et les incidents. Côté finances, vous votez le budget prévisionnel, émettez les appels de charges, suivez les encaissements, relancez les impayés et tenez la comptabilité de la copropriété en partie double. Les assemblées générales se préparent et se tiennent dans le logiciel, jusqu'au procès-verbal. Il s'adresse aux cabinets de syndic et aux gestionnaires de copropriété en Côte d'Ivoire, et vos copropriétaires peuvent suivre leurs lots depuis leur portail copropriétaire.",
  features: [
    {
      slug: "coproprietes",
      title: "Copropriétés",
      metaTitle: "Gérer ses copropriétés : fiche et suivi en Côte d'Ivoire",
      summary:
        "Créez la fiche de chaque copropriété : adresse, immatriculation, exercice, immeuble lié, gestionnaire et statut. Vue d'ensemble de toutes vos copropriétés.",
      intro:
        "Chaque copropriété que vous gérez a sa fiche : identité, immeuble lié, gestionnaire en charge et règlement de copropriété. La liste vous montre d'un coup d'œil, pour chaque copropriété, le nombre de lots, d'appels de charges, de budgets, d'assemblées, de documents, de contrats et d'incidents. C'est le point de départ de tout le module Syndic.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Copropriétés",
      status: "disponible",
      actions: [
        {
          title: "Consulter la liste des copropriétés",
          goal: "Voir toutes les copropriétés gérées par votre cabinet, avec pour chacune le nombre de lots, d'appels de charges, de budgets, d'assemblées générales, de documents, de contrats et d'incidents.",
          output: "Un tableau de bord de votre portefeuille de copropriétés.",
        },
        {
          title: "Créer une copropriété",
          goal: "Enregistrer une nouvelle copropriété, et la rattacher si besoin à un immeuble de votre parc et au contact qui la gère.",
          input:
            "Le nom (seul champ obligatoire), l'adresse, le numéro d'immatriculation, l'exercice, la référence cadastrale, le nombre de lots et de bâtiments, le gestionnaire et l'immeuble lié.",
          output: "La fiche de la copropriété, prête à recevoir ses lots.",
          prereq:
            "Pour lier un immeuble, il doit exister dans vos biens et ne pas être déjà rattaché à une autre copropriété. Le gestionnaire doit être un contact de votre CRM.",
        },
        {
          title: "Consulter la fiche d'une copropriété",
          goal: "Tout voir sur une copropriété : l'immeuble lié, les lots avec leur propriétaire et leurs locataires en place, les appels de charges et les fonds.",
        },
        {
          title: "Modifier une copropriété",
          goal: "Mettre à jour les informations de la copropriété, changer son statut et y rattacher son règlement de copropriété.",
          input:
            "Les informations à corriger, le statut (active, en liquidation ou en litige) et le règlement de copropriété.",
        },
        {
          title: "Supprimer une copropriété",
          goal: "Retirer définitivement une copropriété créée par erreur.",
          prereq:
            "La copropriété doit être vide : aucun lot, budget, appel de charges, assemblée, document, contrat ni incident.",
        },
      ],
      faq: [
        {
          q: "Peut-on relier une copropriété à un immeuble déjà enregistré ?",
          a: "Oui. À la création ou plus tard, vous rattachez la copropriété à un immeuble de vos biens, à condition qu'il ne soit pas déjà lié à une autre copropriété.",
        },
        {
          q: "Quels statuts peut avoir une copropriété ?",
          a: "Une copropriété peut être active, en liquidation ou en litige. Vous changez le statut depuis sa fiche.",
        },
      ],
      related: [
        "syndic-copropriete/lots-et-tantiemes",
        "syndic-copropriete/coproprietaires-et-occupants",
        "syndic-copropriete/documents-copropriete",
      ],
    },
    {
      slug: "lots-et-tantiemes",
      title: "Lots et tantièmes",
      metaTitle: "Lots et tantièmes de copropriété : logiciel de syndic",
      summary:
        "Enregistrez les lots de chaque copropriété (appartements, parkings, caves, bureaux, commerces) avec leurs tantièmes, ou importez-les depuis vos biens existants.",
      intro:
        "Les lots et leurs tantièmes sont la base de toute la gestion de copropriété : répartition du budget, appels de charges, votes en assemblée générale. Vous créez chaque lot à la main ou vous l'importez en masse depuis les biens déjà enregistrés dans votre agence, y compris les unités d'un immeuble. Plus besoin de ressaisir un immeuble déjà décrit dans vos biens.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Copropriété",
      status: "disponible",
      actions: [
        {
          title: "Consulter les lots d'une copropriété",
          goal: "Afficher tous les lots d'une copropriété avec leur type et leurs tantièmes.",
          prereq: "La copropriété doit être créée.",
        },
        {
          title: "Créer un lot",
          goal: "Ajouter un lot à une copropriété, avec ses tantièmes.",
          input:
            "Le numéro du lot, son type (appartement, parking, cave, bureau, local commercial ou autre), ses tantièmes, la surface, l'étage, si un parking est inclus, et en option le bien lié et le copropriétaire.",
          output: "Le lot, prêt à être pris en compte dans le budget et les appels de charges.",
          prereq:
            "Le bien lié ne peut pas être un immeuble entier. Le copropriétaire doit être un contact de votre CRM.",
        },
        {
          title: "Importer des lots depuis des biens existants",
          goal: "Créer en une fois plusieurs lots à partir de biens déjà présents dans votre agence, y compris les unités d'un immeuble.",
          input: "Les biens à transformer en lots.",
          output:
            "Un résumé : lots créés, lignes ignorées (par exemple au-delà de la limite de lots de votre abonnement) et biens introuvables.",
        },
        {
          title: "Modifier un lot",
          goal: "Corriger le numéro, le type, les tantièmes, le bien lié ou le copropriétaire d'un lot.",
        },
      ],
      faq: [
        {
          q: "Faut-il ressaisir les appartements d'un immeuble déjà enregistré ?",
          a: "Non. Vous importez les lots directement depuis vos biens existants, y compris les unités d'un immeuble, et le logiciel vous donne un résumé des lots créés.",
        },
        {
          q: "À quoi servent les tantièmes saisis sur les lots ?",
          a: "Ils servent à répartir le budget prévisionnel entre les lots, donc à calculer les appels de charges, et à décompter les votes en assemblée générale.",
        },
      ],
      related: [
        "syndic-copropriete/coproprietes",
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/coproprietaires-et-occupants",
      ],
    },
    {
      slug: "coproprietaires-et-occupants",
      title: "Copropriétaires et occupants",
      metaTitle: "Copropriétaires et locataires des lots : suivi syndic",
      summary:
        "Sachez qui détient chaque lot et avec quelle quote-part, qui l'occupe en location et qui paie les charges. Ouvrez ou fermez l'accès au portail copropriétaire.",
      intro:
        "Pour chaque lot, vous enregistrez qui en est propriétaire, avec sa quote-part et ses dates de détention, et qui l'occupe en location. Vous indiquez si les charges sont facturées au locataire. Depuis la fiche d'un copropriétaire, vous l'invitez en un clic sur son portail copropriétaire, ou vous lui retirez cet accès.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Copropriété",
      status: "disponible",
      actions: [
        {
          title: "Consulter les propriétaires des lots",
          goal: "Voir qui possède quel lot et avec quelle quote-part, pour toute la copropriété ou pour un lot précis.",
        },
        {
          title: "Enregistrer le propriétaire d'un lot",
          goal: "Indiquer qui détient un lot, avec sa quote-part, et décider s'il a accès au portail copropriétaire.",
          input:
            "Le lot, le contact propriétaire, sa quote-part en pourcentage, les dates de début et de fin de détention, l'accès au portail et ses préférences de notification.",
          prereq: "Le lot doit exister et le propriétaire doit être un contact de votre agence.",
        },
        {
          title: "Modifier le propriétaire d'un lot",
          goal: "Mettre à jour la quote-part, les dates de détention, l'accès au portail ou désactiver un propriétaire qui a vendu.",
        },
        {
          title: "Inviter un copropriétaire sur son portail",
          goal: "Ouvrir au copropriétaire l'accès à son portail. Son compte est créé, ou réutilisé s'il en a déjà un.",
          output:
            "L'adresse e-mail utilisée, le lien d'invitation (activation ou connexion) et le nombre de lots ouverts sur son portail.",
          prereq: "Le propriétaire du lot doit être enregistré.",
        },
        {
          title: "Retirer l'accès au portail d'un copropriétaire",
          goal: "Fermer l'accès au portail copropriétaire, par exemple après la vente de son lot.",
          output: "Le nombre de lots fermés sur son portail.",
        },
        {
          title: "Affecter un locataire à un lot",
          goal: "Rattacher un locataire à un lot. L'affectation précédente du lot est automatiquement close.",
          input: "Le locataire, les dates de début et de fin, le bail concerné et des notes.",
          prereq: "Le locataire doit être un contact de votre agence.",
        },
        {
          title: "Clore l'affectation d'un locataire",
          goal: "Mettre fin au rattachement d'un locataire à un lot, par exemple à la fin de son bail.",
        },
        {
          title: "Consulter les locataires des lots",
          goal: "Voir qui occupe chaque lot en location, pour toute la copropriété ou pour un lot précis.",
        },
        {
          title: "Enregistrer le locataire d'un lot",
          goal: "Indiquer qu'un contact occupe un lot en location et préciser si les charges lui sont facturées.",
          input:
            "Le lot, le locataire, le bail, les dates d'occupation, si les charges sont facturées au locataire et s'il est l'occupant actuel.",
          prereq: "Le lot doit exister et le locataire doit être un contact de votre agence.",
        },
        {
          title: "Modifier le locataire d'un lot",
          goal: "Mettre à jour le bail, les dates, la facturation des charges ou indiquer que le locataire n'occupe plus le lot.",
        },
      ],
      faq: [
        {
          q: "Un lot peut-il avoir plusieurs propriétaires ?",
          a: "Oui. Chaque propriétaire est enregistré avec sa quote-part en pourcentage et ses dates de détention.",
        },
        {
          q: "Peut-on facturer les charges au locataire plutôt qu'au propriétaire ?",
          a: "Vous l'indiquez sur la fiche du locataire du lot : une case précise si les charges lui sont facturées.",
        },
      ],
      related: [
        "syndic-copropriete/lots-et-tantiemes",
        "syndic-copropriete/encaissements-comptes-coproprietaires",
      ],
    },
    {
      slug: "incidents-copropriete",
      title: "Incidents de copropriété",
      metaTitle: "Suivi des incidents de copropriété : pannes, fuites",
      summary:
        "Déclarez et suivez les incidents de copropriété (pannes, fuites, vandalisme, sécurité), affectez un prestataire et répartissez le coût entre budget, assurance ou tiers.",
      intro:
        "Une panne d'ascenseur, une fuite dans les parties communes, un acte de vandalisme : chaque incident est déclaré, suivi jusqu'à sa résolution et confié à un prestataire. Vous décidez ensuite qui paie : le budget de la copropriété, l'assurance, un copropriétaire ou un tiers. Les demandes de maintenance déjà ouvertes peuvent être rattachées à la copropriété.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Copropriété",
      status: "disponible",
      actions: [
        {
          title: "Consulter les incidents d'une copropriété",
          goal: "Voir tous les incidents déclarés (pannes, fuites, vandalisme, sécurité…), avec un filtre par statut.",
        },
        {
          title: "Déclarer un incident",
          goal: "Enregistrer directement un incident dans la copropriété.",
          input:
            "Qui le signale, le type d'incident, la description, le niveau d'urgence, la date du signalement, et en option le lot ou l'équipement commun concerné.",
          prereq: "Le déclarant doit être un contact de votre agence.",
        },
        {
          title: "Rattacher une demande de maintenance",
          goal: "Faire d'une demande de maintenance existante un incident de la copropriété, et préciser à qui revient le coût.",
          input:
            "La demande de maintenance, le lot concerné ou le fait qu'il s'agit des parties communes, et l'imputation du coût.",
          prereq: "La demande de maintenance doit déjà exister.",
        },
        {
          title: "Suivre un incident",
          goal: "Faire avancer l'incident (déclaré, assigné, en cours, résolu, clos), l'affecter à un prestataire et dater sa résolution.",
        },
        {
          title: "Répartir le coût d'un incident",
          goal: "Indiquer qui prend en charge le coût : le budget de la copropriété, l'assurance, un copropriétaire ou un tiers.",
          input:
            "Le type de prise en charge, le montant, et selon le cas la ligne budgétaire, le lot ou le contrat concerné, avec des notes.",
        },
      ],
      faq: [
        {
          q: "Peut-on mettre le coût d'une réparation à la charge d'un seul copropriétaire ?",
          a: "Oui. Pour chaque incident, vous imputez le coût au budget de la copropriété, à l'assurance, à un copropriétaire ou à un tiers.",
        },
      ],
      related: [
        "syndic-copropriete/prestataires-et-contrats",
        "syndic-copropriete/budget-previsionnel",
      ],
    },
    {
      slug: "prestataires-et-contrats",
      title: "Prestataires et contrats",
      metaTitle: "Prestataires et contrats d'entretien de copropriété",
      summary:
        "Tenez le carnet de vos prestataires et de leurs spécialités, et suivez les contrats d'entretien de chaque copropriété : montant annuel, dates et renouvellement.",
      intro:
        "Vos prestataires sont enregistrés une seule fois pour toute l'agence et réutilisés dans chaque copropriété. Pour chaque immeuble, vous suivez les contrats d'entretien en cours, leur montant annuel, leurs dates et leur délai d'alerte avant renouvellement. Vous voyez aussi les équipements communs de la copropriété.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Copropriété",
      status: "disponible",
      actions: [
        {
          title: "Consulter les prestataires de la copropriété",
          goal: "Voir vos prestataires avec les contrats qui les lient à cette copropriété, ainsi que les équipements communs.",
        },
        {
          title: "Ajouter un prestataire",
          goal: "Enregistrer un prestataire, réutilisable dans toutes vos copropriétés.",
          input: "Le nom, la spécialité, l'e-mail et le téléphone.",
        },
        {
          title: "Modifier un prestataire",
          goal: "Mettre à jour le nom, la spécialité ou les coordonnées d'un prestataire.",
        },
        {
          title: "Supprimer un prestataire",
          goal: "Retirer un prestataire de votre carnet.",
          prereq: "Le prestataire ne doit avoir aucun contrat ni incident lié.",
        },
        {
          title: "Consulter les contrats de la copropriété",
          goal: "Voir les contrats d'entretien rattachés à la copropriété, avec leur prestataire.",
        },
        {
          title: "Créer un contrat d'entretien",
          goal: "Conclure un contrat directement pour la copropriété avec l'un de vos prestataires.",
          input:
            "Le prestataire, la nature du contrat, les dates de début et de fin, le montant annuel, la devise et le délai d'alerte avant renouvellement, en jours.",
          prereq: "Le prestataire doit être enregistré.",
        },
        {
          title: "Rattacher un contrat existant",
          goal: "Relier à la copropriété un contrat d'entretien déjà enregistré dans votre agence.",
          input: "Le contrat, sa portée et, en option, la ligne du budget sur laquelle il est imputé.",
        },
        {
          title: "Consulter un contrat d'entretien",
          goal: "Voir le détail d'un contrat et de son prestataire.",
        },
        {
          title: "Modifier un contrat d'entretien",
          goal: "Changer le prestataire, la nature, les dates, le montant ou le statut d'un contrat.",
        },
        {
          title: "Supprimer un contrat d'entretien",
          goal: "Retirer un contrat qui n'a plus lieu d'être.",
        },
      ],
      faq: [
        {
          q: "Faut-il recréer un prestataire pour chaque copropriété ?",
          a: "Non. Un prestataire est enregistré une fois pour votre agence et vous le réutilisez dans toutes vos copropriétés.",
        },
      ],
      related: [
        "syndic-copropriete/incidents-copropriete",
        "syndic-copropriete/budget-previsionnel",
      ],
    },
    {
      slug: "budget-previsionnel",
      title: "Budget prévisionnel",
      metaTitle: "Budget prévisionnel de copropriété : logiciel syndic",
      summary:
        "Préparez le budget prévisionnel de la copropriété ligne par ligne, faites-le approuver en assemblée générale et obtenez la quote-part de chaque lot selon les tantièmes.",
      intro:
        "Vous construisez le budget prévisionnel de l'exercice ligne par ligne, avec une clé de répartition pour chacune. Le logiciel calcule aussitôt la part de chaque lot selon ses tantièmes. Une fois le budget approuvé, et relié si vous le souhaitez à la résolution d'assemblée qui l'a voté, il sert de base aux appels de charges.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter les budgets",
          goal: "Voir les budgets de la copropriété, avec leurs lignes et la répartition par lot, filtrés par exercice ou par statut.",
        },
        {
          title: "Créer un budget prévisionnel",
          goal: "Établir le budget de l'exercice avec ses lignes de dépenses.",
          input:
            "L'exercice, le libellé, le montant total, la devise et les lignes : catégorie, montant prévu, clé de répartition et, en option, le compte comptable associé.",
          output: "Le budget et la part de chaque lot, calculée automatiquement.",
          prereq: "Pour associer un compte comptable, il doit exister dans le plan comptable de la copropriété.",
        },
        {
          title: "Approuver un budget",
          goal: "Faire évoluer le budget de brouillon à approuvé, puis à révisé ou clos, en le reliant si besoin à la résolution d'assemblée générale qui l'a voté.",
          output: "Le budget approuvé, daté du jour de son approbation.",
        },
        {
          title: "Recalculer la répartition par lot",
          goal: "Recalculer la part de chaque lot, ligne par ligne, selon la clé de répartition, par exemple après une modification des tantièmes.",
          output: "La répartition détaillée par lot et par ligne de budget.",
          prereq: "Les lots doivent exister avec leurs tantièmes.",
        },
      ],
      faq: [
        {
          q: "Comment la part de chaque copropriétaire est-elle calculée ?",
          a: "Chaque ligne du budget a une clé de répartition. Le logiciel répartit le montant sur les lots selon leurs tantièmes et vous donne le détail par lot.",
        },
        {
          q: "Peut-on appeler les charges avant le vote du budget ?",
          a: "La génération automatique des appels depuis le budget exige un budget approuvé. Vous pouvez toutefois émettre des appels de charges à la main.",
        },
      ],
      related: [
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/assemblees-generales",
        "syndic-copropriete/lots-et-tantiemes",
      ],
    },
    {
      slug: "appels-de-charges",
      title: "Appels de charges",
      metaTitle: "Appels de charges de copropriété en Côte d'Ivoire",
      summary:
        "Émettez les appels de charges de copropriété pour un lot ou tout l'immeuble, ponctuels ou récurrents, ou générez-les depuis le budget voté. Avis par e-mail et WhatsApp.",
      intro:
        "Fini les appels de charges calculés à la main dans un tableur. Vous émettez un appel pour un lot, plusieurs lots ou toute la copropriété, une seule fois ou de façon récurrente, ou vous générez en un clic la campagne complète depuis le budget approuvé. Les copropriétaires sont prévenus par e-mail ou WhatsApp, et chaque appel est inscrit au compte du lot.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter les appels de charges",
          goal: "Voir tous les appels de charges avec leurs paiements, le lot et le propriétaire, filtrés par période ou par statut. Les appels échus non réglés apparaissent en retard.",
        },
        {
          title: "Émettre un appel de charges",
          goal: "Appeler les charges d'un lot, de plusieurs lots ou de tous les lots, ponctuellement ou de façon récurrente.",
          input:
            "La période, le montant, la devise, la date d'échéance, les lots concernés et, pour un appel récurrent, la fréquence et le nombre d'appels.",
          output:
            "Les appels de charges, inscrits au débit du compte de chaque lot. Les copropriétaires sont avisés par e-mail ou WhatsApp.",
          prereq: "La copropriété et les lots concernés doivent exister.",
        },
        {
          title: "Consulter un appel de charges",
          goal: "Voir le détail d'un appel : lot, copropriété, paiements reçus et statut.",
        },
        {
          title: "Générer les appels depuis le budget",
          goal: "Émettre en une fois la campagne d'appels de charges : un appel par lot, du montant de sa part du budget.",
          input: "Le libellé, la période, la date d'échéance et le type de campagne.",
          output: "La campagne et tous ses appels de charges. Les propriétaires sont avisés.",
          prereq: "Le budget doit être approuvé.",
        },
        {
          title: "Consulter les campagnes d'appels",
          goal: "Voir les campagnes d'appels de charges groupées, avec le budget d'origine et leurs appels, filtrées par période ou par statut.",
        },
        {
          title: "Créer une campagne d'appels à la main",
          goal: "Enregistrer une campagne d'appels de charges, avec ou sans référence à un budget.",
          input:
            "Le libellé, la période, la date d'échéance, le type de campagne, le montant total et la devise.",
        },
      ],
      faq: [
        {
          q: "Les copropriétaires sont-ils prévenus d'un nouvel appel de charges ?",
          a: "Oui. À l'émission d'un appel, ou d'une campagne générée depuis le budget, le copropriétaire reçoit un avis par e-mail ou WhatsApp.",
        },
        {
          q: "Peut-on programmer des appels de charges trimestriels ?",
          a: "Oui. Un appel peut être récurrent : vous choisissez la fréquence et le nombre d'appels à émettre.",
        },
      ],
      related: [
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "syndic-copropriete/impayes-et-relances",
      ],
    },
    {
      slug: "encaissements-comptes-coproprietaires",
      title: "Encaissements et comptes copropriétaires",
      metaTitle: "Encaissement des charges et compte de chaque copropriétaire",
      summary:
        "Enregistrez les paiements de charges et suivez le compte de chaque lot : appels, règlements, pénalités, ajustements. Relevé de compte en PDF pour le copropriétaire.",
      intro:
        "Chaque lot a son compte : les appels de charges y sont débités, les paiements crédités, les pénalités et les remises inscrites. Vous enregistrez un règlement en quelques secondes et le statut de l'appel se met à jour tout seul. En cas de réclamation, vous sortez le relevé du copropriétaire en PDF sur la période demandée.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer un paiement de charges",
          goal: "Saisir un règlement reçu sur un appel de charges.",
          input: "Le montant, la date du paiement, et en option le moyen de paiement et la référence.",
          output:
            "L'appel passe à « partiellement payé » ou « payé » et le compte du lot est crédité.",
          prereq: "Le paiement ne peut pas dépasser le reste dû sur l'appel.",
        },
        {
          title: "Consulter le compte d'un lot",
          goal: "Voir le solde du compte d'un lot, avec le copropriétaire et la copropriété. Le compte est ouvert automatiquement à la première consultation.",
        },
        {
          title: "Consulter les mouvements du compte",
          goal: "Voir le détail des mouvements du compte d'un lot : appels, paiements, pénalités, remises et ajustements, sur la période de votre choix.",
        },
        {
          title: "Ajuster le compte d'un lot",
          goal: "Passer à la main un débit ou un crédit sur le compte d'un lot, par exemple pour une régularisation ou un trop-perçu.",
          input: "Le sens (débit ou crédit), le montant, le libellé, et en option la référence et la date.",
        },
        {
          title: "Télécharger le relevé de compte en PDF",
          goal: "Produire le relevé du compte d'un copropriétaire sur une période, à lui remettre.",
          output: "Un relevé de compte en PDF.",
        },
      ],
      faq: [
        {
          q: "Peut-on enregistrer un paiement partiel ?",
          a: "Oui. L'appel passe alors en « partiellement payé » et le reste dû est suivi jusqu'au règlement complet.",
        },
        {
          q: "Le copropriétaire peut-il obtenir un relevé de son compte ?",
          a: "Vous téléchargez son relevé de compte en PDF sur la période de votre choix.",
        },
      ],
      related: [
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/impayes-et-relances",
      ],
    },
    {
      slug: "impayes-et-relances",
      title: "Impayés et relances",
      metaTitle: "Impayés de charges de copropriété : relances, pénalités",
      summary:
        "Repérez les charges de copropriété en retard, relancez les copropriétaires un par un ou tous en un clic, appliquez des pénalités et accordez des échéanciers.",
      intro:
        "Les impayés sont le premier souci d'un syndic. Un tableau des retards vous donne le nombre d'appels impayés et le montant en jeu. Vous relancez un copropriétaire précis ou tous les retardataires d'un coup, avec un niveau de relance qui monte à chaque envoi. Selon le cas, vous appliquez une pénalité de retard, vous la remettez, ou vous accordez un échéancier pour étaler la dette.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau des retards",
          goal: "Voir d'un coup d'œil tous les appels de charges en retard.",
          output: "La liste des appels en retard, leur nombre et le montant total impayé.",
        },
        {
          title: "Consulter l'historique des relances",
          goal: "Retrouver toutes les relances envoyées, avec leur canal, leur niveau, l'appel et le copropriétaire concernés.",
        },
        {
          title: "Relancer un copropriétaire",
          goal: "Envoyer une relance ponctuelle sur un appel de charges impayé.",
          input: "Le niveau de relance et le canal d'envoi.",
          output: "La relance est envoyée et inscrite à l'historique.",
          prereq: "L'appel de charges ne doit pas être soldé.",
        },
        {
          title: "Relancer tous les retardataires",
          goal: "Relancer en une fois tous les appels de charges en retard et non soldés de la copropriété. Le niveau de relance augmente à chaque campagne, jusqu'au quatrième niveau.",
          output: "Le nombre d'appels traités et de relances envoyées.",
        },
        {
          title: "Consulter les pénalités de retard",
          goal: "Voir les pénalités appliquées pour retard de paiement, avec l'appel et le copropriétaire concernés.",
        },
        {
          title: "Appliquer une pénalité de retard",
          goal: "Facturer une pénalité sur un appel de charges impayé. Elle est débitée du compte du lot.",
          input: "Le taux, le nombre de jours de retard, le montant et la date d'application.",
          prereq: "L'appel de charges ne doit pas être soldé.",
        },
        {
          title: "Remettre une pénalité",
          goal: "Annuler une pénalité déjà appliquée. Le montant remis est recrédité sur le compte du lot.",
          input: "Le motif de la remise, obligatoire.",
        },
        {
          title: "Accorder un échéancier de paiement",
          goal: "Étaler le paiement d'un appel de charges impayé en plusieurs échéances.",
          input: "La date de l'accord, le montant total et les échéances.",
          prereq: "L'appel ne doit pas être soldé et le total doit égaler la somme des échéances.",
        },
        {
          title: "Consulter les échéanciers",
          goal: "Suivre les échéanciers en cours ou soldés, avec leurs échéances, l'appel et le copropriétaire concernés.",
        },
      ],
      faq: [
        {
          q: "Peut-on relancer tous les copropriétaires en retard en même temps ?",
          a: "Oui. Une seule action relance tous les appels en retard et non soldés de la copropriété, en augmentant le niveau de relance à chaque fois, jusqu'au quatrième.",
        },
        {
          q: "Peut-on annuler une pénalité de retard ?",
          a: "Oui. Vous remettez la pénalité en indiquant un motif, et le montant est recrédité sur le compte du lot.",
        },
        {
          q: "Peut-on accorder un paiement échelonné à un copropriétaire ?",
          a: "Oui. Vous créez un échéancier sur l'appel impayé, avec des échéances dont la somme égale le montant total.",
        },
      ],
      related: [
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "syndic-copropriete/appels-de-charges",
      ],
    },
    {
      slug: "fonds-de-copropriete",
      title: "Fonds et synthèse financière",
      metaTitle: "Fonds de roulement et fonds travaux de copropriété",
      summary:
        "Suivez les fonds de chaque copropriété (fonds de roulement, fonds travaux) et sa synthèse financière : total appelé, payé, restant dû et retards en un coup d'œil.",
      intro:
        "La synthèse financière vous donne l'état d'une copropriété en un écran : soldes des fonds, total appelé, total payé, restant dû et retards. Vous créez les fonds dont la copropriété a besoin, comme le fonds de roulement ou le fonds travaux, et vous ajustez leur solde avec un motif. Chaque opération sur un fonds est tracée dans le journal d'audit.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter la synthèse financière",
          goal: "Avoir la vue d'ensemble des finances d'une copropriété.",
          output: "Les soldes des fonds, le total appelé, le total payé, le restant dû et les retards.",
        },
        {
          title: "Consulter les fonds",
          goal: "Voir les fonds de la copropriété, comme le fonds de roulement ou le fonds travaux, avec leur solde.",
        },
        {
          title: "Créer un fonds",
          goal: "Ouvrir un fonds pour la copropriété.",
          input: "Le nom du fonds, son solde de départ et sa devise (FCFA par défaut).",
        },
        {
          title: "Renommer un fonds",
          goal: "Changer le nom d'un fonds existant.",
        },
        {
          title: "Ajuster le solde d'un fonds",
          goal: "Créditer ou débiter un fonds à la main, avec un motif obligatoire.",
          input: "Le sens (crédit ou débit), le montant et le motif.",
          output: "Le nouveau solde du fonds, avec l'opération tracée dans le journal d'audit.",
        },
      ],
      related: [
        "syndic-copropriete/comptabilite-copropriete",
        "syndic-copropriete/appels-de-charges",
      ],
    },
    {
      slug: "comptabilite-copropriete",
      title: "Comptabilité de copropriété",
      metaTitle: "Comptabilité de copropriété en partie double",
      summary:
        "Tenez la comptabilité de chaque copropriété en partie double : plan comptable, journaux, écritures équilibrées et verrouillées, balance et grand livre.",
      intro:
        "Chaque copropriété a sa propre comptabilité en partie double. Vous organisez son plan comptable et ses journaux, vous saisissez les écritures, toujours équilibrées, et vous les verrouillez une fois validées. La balance et le grand livre sont disponibles à tout moment, sur la période de votre choix.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter le plan comptable",
          goal: "Voir les comptes de la copropriété, avec leur classe, leur type et leur rattachement à un compte parent. Seuls les comptes actifs sont affichés par défaut.",
        },
        {
          title: "Créer un compte comptable",
          goal: "Ajouter un compte au plan comptable de la copropriété, rattaché si besoin à un compte parent.",
          input:
            "Le numéro de compte, son intitulé, sa classe, son type, s'il s'agit d'un compte auxiliaire, et le compte parent.",
          prereq: "Le numéro de compte ne doit pas déjà exister.",
        },
        {
          title: "Consulter les journaux",
          goal: "Voir les journaux comptables de la copropriété (général, banque, caisse, charges) par exercice.",
        },
        {
          title: "Créer un journal",
          goal: "Ouvrir un journal comptable pour un exercice.",
          input: "Le type de journal, son libellé, son code et l'exercice.",
        },
        {
          title: "Consulter les écritures",
          goal: "Voir les écritures d'un journal avec leurs lignes, leurs comptes et les lots concernés, sur une période donnée.",
        },
        {
          title: "Saisir une écriture",
          goal: "Passer une écriture manuelle dans un journal.",
          input:
            "Le journal, la date, la référence, le libellé et au moins deux lignes, avec au moins un débit et un crédit.",
          prereq:
            "Le journal et les comptes utilisés doivent exister. L'écriture doit être équilibrée : total des débits égal au total des crédits.",
        },
        {
          title: "Verrouiller une écriture",
          goal: "Figer définitivement une écriture validée : elle ne peut plus être modifiée.",
        },
        {
          title: "Consulter la balance",
          goal: "Obtenir la balance générale de la copropriété sur une période.",
          output:
            "Le total des débits, des crédits et le solde de chaque compte, avec les totaux et le contrôle de l'équilibre général.",
        },
        {
          title: "Consulter le grand livre",
          goal: "Voir, dans l'ordre chronologique, toutes les lignes d'écriture, pour un compte ou pour toute la copropriété, sur une période.",
        },
      ],
      faq: [
        {
          q: "La comptabilité de chaque copropriété est-elle séparée ?",
          a: "Oui. Chaque copropriété a son propre plan comptable, ses journaux, ses écritures, sa balance et son grand livre.",
        },
        {
          q: "Peut-on empêcher la modification d'une écriture déjà validée ?",
          a: "Oui. Une fois verrouillée, une écriture ne peut plus être modifiée.",
        },
      ],
      related: [
        "syndic-copropriete/fonds-de-copropriete",
        "syndic-copropriete/budget-previsionnel",
      ],
    },
    {
      slug: "assemblees-generales",
      title: "Assemblées générales",
      metaTitle: "Assemblée générale de copropriété : convocation, vote, PV",
      summary:
        "Convoquez l'assemblée générale de copropriété, préparez l'ordre du jour, gérez les pouvoirs, saisissez les votes en tantièmes et générez le procès-verbal en Word.",
      intro:
        "De la convocation au procès-verbal, l'assemblée générale se prépare et se tient dans le logiciel. Vous fixez l'ordre du jour et les résolutions, enregistrez les pouvoirs, puis saisissez le vote de chaque lot : le résultat en tantièmes et le quorum se recalculent aussitôt. À la fin, le compte rendu est généré en Word, prêt à être relu et diffusé.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Assemblées et documents",
      status: "disponible",
      actions: [
        {
          title: "Consulter les assemblées générales",
          goal: "Voir les assemblées d'une copropriété avec leur ordre du jour, leurs résolutions et leurs pouvoirs, filtrées par statut.",
        },
        {
          title: "Convoquer une assemblée générale",
          goal: "Créer une assemblée ordinaire ou extraordinaire avec ses premières résolutions.",
          input:
            "Le type d'assemblée, la date, les heures de début et de fin, le lieu et les résolutions (titre, description, règle de majorité).",
          output: "L'assemblée et ses résolutions. Une notification de convocation est envoyée.",
        },
        {
          title: "Modifier ou faire avancer une assemblée",
          goal: "Changer le lieu ou les horaires, ouvrir la séance, la clôturer ou annuler une assemblée prévue.",
          output: "L'assemblée mise à jour et horodatée. À la clôture, les résultats et le quorum sont recalculés.",
        },
        {
          title: "Consulter le détail d'une assemblée",
          goal: "Tout voir sur une assemblée : ordre du jour, résolutions avec le décompte des voix en tantièmes, pouvoirs, présence et quorum.",
        },
        {
          title: "Ajouter une résolution",
          goal: "Ajouter un point soumis au vote, avec sa règle de majorité : article 24 (par défaut), 25 ou 26, ou unanimité.",
          input: "Le titre, la description et la règle de majorité.",
          prereq: "L'assemblée ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Ajouter un point à l'ordre du jour",
          goal: "Inscrire un point à l'ordre du jour, avec sa position et les éléments de discussion.",
          input: "Le titre, la position dans l'ordre du jour et les éléments de discussion.",
        },
        {
          title: "Modifier un point de l'ordre du jour",
          goal: "Changer le titre, la position ou les éléments de discussion d'un point.",
        },
        {
          title: "Supprimer un point de l'ordre du jour",
          goal: "Retirer un point de l'ordre du jour.",
        },
        {
          title: "Enregistrer le vote d'un lot",
          goal: "Saisir ou corriger le vote d'un lot sur une résolution : pour, contre ou abstention.",
          output: "Le résultat de la résolution et le quorum, recalculés immédiatement.",
          prereq: "L'assemblée ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Consulter les pouvoirs",
          goal: "Voir les pouvoirs donnés pour une assemblée, avec le mandant et le mandataire.",
        },
        {
          title: "Enregistrer un pouvoir",
          goal: "Noter qu'un copropriétaire donne pouvoir à un mandataire pour voter à sa place.",
          input: "Le copropriétaire qui donne pouvoir et son mandataire.",
          prereq:
            "Le mandant doit être copropriétaire d'au moins un lot et différent du mandataire. Un seul pouvoir par copropriétaire et par assemblée.",
        },
        {
          title: "Supprimer un pouvoir",
          goal: "Retirer un pouvoir enregistré par erreur ou révoqué.",
          prereq: "L'assemblée ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Générer le procès-verbal",
          goal: "Produire le compte rendu de l'assemblée : ordre du jour, résolutions, résultats en tantièmes et quorum.",
          output: "Un document Word, prêt à être relu et diffusé.",
        },
      ],
      faq: [
        {
          q: "Les votes sont-ils comptés en tantièmes ?",
          a: "Oui. Chaque lot vote pour, contre ou s'abstient, et le résultat de chaque résolution est décompté en tantièmes, avec le quorum recalculé aussitôt.",
        },
        {
          q: "Peut-on gérer les procurations ?",
          a: "Oui. Vous enregistrez les pouvoirs donnés par les copropriétaires à leurs mandataires, à raison d'un pouvoir par copropriétaire et par assemblée.",
        },
        {
          q: "Le procès-verbal est-il généré automatiquement ?",
          a: "Le logiciel génère le compte rendu en Word avec l'ordre du jour, les résolutions, les résultats en tantièmes et le quorum.",
        },
      ],
      related: [
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/documents-copropriete",
        "syndic-copropriete/coproprietaires-et-occupants",
      ],
    },
    {
      slug: "documents-copropriete",
      title: "Documents de copropriété",
      metaTitle: "Documents de copropriété : règlement, PV, assurance",
      summary:
        "Classez les documents de chaque copropriété (règlement, procès-verbaux, diagnostics, assurance, budget) avec leur date d'expiration, et retrouvez-les en un clic.",
      intro:
        "Règlement de copropriété, procès-verbaux d'assemblée, diagnostics, attestations d'assurance : tous les documents d'une copropriété sont rangés au même endroit, classés par type. Vous notez leur date d'expiration et les retrouvez en un clic.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Assemblées et documents",
      status: "disponible",
      actions: [
        {
          title: "Consulter les documents de la copropriété",
          goal: "Voir les documents de la copropriété, filtrés par type : règlement, procès-verbal, diagnostic, assurance, budget ou autre.",
        },
        {
          title: "Déposer un document",
          goal: "Ajouter un document à la copropriété, en envoyant le fichier ou en indiquant un lien.",
          input: "Le titre, le type, la date d'expiration éventuelle, et le fichier ou son lien.",
        },
        {
          title: "Télécharger un document",
          goal: "Récupérer le fichier d'un document de la copropriété, par exemple pour le transmettre à un copropriétaire.",
        },
      ],
      related: [
        "syndic-copropriete/assemblees-generales",
        "syndic-copropriete/coproprietes",
      ],
    },
  ],
};
