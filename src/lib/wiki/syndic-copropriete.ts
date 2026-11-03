import type { WikiDomain } from "./types";

export const syndicCopropriete: WikiDomain = {
  slug: "syndic-copropriete",
  title: "Syndic de copropriété",
  metaTitle: "Logiciel de syndic de copropriété en Côte d'Ivoire",
  summary:
    "Logiciel de syndic en Côte d'Ivoire : lots et tantièmes, budget prévisionnel, appels de charges, impayés, assemblées générales et comptabilité de copropriété.",
  intro:
    "Le module Syndic réunit tout ce qu'un cabinet de syndic gère au quotidien : la fiche de chaque copropriété, ses lots et leurs tantièmes, les copropriétaires et les occupants, les prestataires et les incidents. Côté finances, vous votez le budget prévisionnel, émettez les appels de charges, suivez les encaissements (y compris les paiements en ligne par mobile money), relancez les impayés et tenez la comptabilité de la copropriété en partie double. Les assemblées générales se préparent et se tiennent dans le logiciel : émargement et votes en direct, visio en option, jusqu'au procès-verbal. Il s'adresse aux cabinets de syndic et aux gestionnaires de copropriété en Côte d'Ivoire, et vos copropriétaires peuvent suivre leurs lots, rejoindre l'assemblée et payer leurs appels de charges en ligne depuis leur portail copropriétaire.",
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
          title: "Changer de copropriété depuis le bandeau",
          goal: "Passer à une autre copropriété de votre cabinet sans revenir à la liste, en restant sur le même onglet (fiche, lots, finances, assemblées…).",
          input: "Le choix de la copropriété dans le sélecteur, avec une recherche par nom.",
          prereq: "Le sélecteur s'affiche à partir de deux copropriétés.",
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
        "syndic-copropriete/identite-des-documents",
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
          goal: "Afficher tous les lots d'une copropriété avec leur type et leurs tantièmes. Une colonne « Portail » indique d'un coup d'œil si le copropriétaire a accès à son portail (voir la fonctionnalité Copropriétaires et occupants).",
          prereq: "La copropriété doit être créée.",
        },
        {
          title: "Créer un lot",
          goal: "Ajouter un lot à une copropriété, avec ses tantièmes.",
          input:
            "Le numéro du lot, son type (appartement, parking, cave, bureau, local commercial ou autre), ses tantièmes, la surface, l'étage, si un parking est inclus, et en option le bien lié et le copropriétaire.",
          output: "Le lot, prêt à être pris en compte dans le budget et les appels de charges.",
          prereq:
            "Le numéro de lot doit être unique dans la copropriété. Le bien lié ne peut pas être un immeuble entier. Le copropriétaire doit être un contact de votre CRM.",
        },
        {
          title: "Renseigner les tantièmes spéciaux et la date d'entrée d'un lot",
          goal: "Saisir, à la création ou à la modification d'un lot, ses tantièmes spéciaux (pour les répartitions de charges spéciales) et la date depuis laquelle son propriétaire le détient. Sans saisie, un lot n'a pas de tantièmes spéciaux et pèse zéro dans ces répartitions, au lieu de recopier ses tantièmes généraux.",
          input: "Les tantièmes spéciaux et la date d'entrée du propriétaire.",
          status: "developpement",
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
          goal: "Corriger le numéro, le type, les tantièmes, le bien lié ou le copropriétaire d'un lot. Un lot dont les tantièmes passent à zéro sort de la clé de répartition et des appels de charges à venir.",
        },
        {
          title: "Supprimer ou désactiver un lot",
          goal: "Supprimer un lot saisi par erreur. Dès que le lot porte un mouvement (appel de charges, paiement, quittance, écriture, vote, incident…), il ne peut plus être supprimé : le logiciel vous propose de le désactiver, ce qui l'exclut des appels futurs en conservant tout l'historique.",
          output:
            "Le lot supprimé et sa place libérée dans votre abonnement, ou le lot désactivé (tantièmes à zéro) avec son historique conservé.",
          prereq: "Le lot doit exister.",
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
          prereq:
            "Le lot doit exister et le propriétaire doit être un contact de votre agence. Le total des quotes-parts actuelles d'un lot ne peut pas dépasser 100 %.",
        },
        {
          title: "Modifier le propriétaire d'un lot",
          goal: "Mettre à jour la quote-part (toujours dans la limite de 100 % pour le lot), les dates de détention, l'accès au portail ou désactiver un propriétaire qui a vendu.",
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
          title: "Voir l'accès au portail copropriétaire de chaque lot",
          goal: "Savoir d'un coup d'œil quels copropriétaires ont accès au portail, dans la colonne « Portail » du résumé des lots de la fiche de la copropriété et dans le tableau des lots. Un indicateur compte aussi les lots dont le copropriétaire a accès au portail. Un lien « Gérer l'accès » mène à l'écran où inviter ou retirer l'accès.",
          output:
            "Pour chaque lot : « Actif » quand tous les propriétaires actuels ont accès, « Inactif » quand aucun n'a accès, « Partiel » avec le nombre d'accès (par exemple 1 sur 2) en cas d'indivision, avec le détail par nom au survol, et « Sans profil » quand le lot n'a aucun propriétaire actuel enregistré.",
          prereq: "Le propriétaire du lot doit être enregistré.",
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
          q: "Comment savoir quels copropriétaires ont accès au portail ?",
          a: "Le résumé des lots de la fiche de la copropriété et le tableau des lots affichent une colonne « Portail » : accès actif, inactif, partiel en cas d'indivision, ou lot sans propriétaire enregistré.",
        },
        {
          q: "Peut-on facturer les charges au locataire plutôt qu'au propriétaire ?",
          a: "Vous l'indiquez sur la fiche du locataire du lot : une case précise si les charges lui sont facturées.",
        },
      ],
      related: [
        "syndic-copropriete/lots-et-tantiemes",
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "portails-clients/portail-coproprietaire",
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
          goal: "Voir vos prestataires avec les contrats qui les lient à cette copropriété, ainsi que les équipements communs. Les prestataires sous contrat avec la copropriété s'affichent en premier, avec un filtre « Sous contrat / Tous ».",
        },
        {
          title: "Ajouter un prestataire",
          goal: "Enregistrer un prestataire, réutilisable dans toutes vos copropriétés.",
          input: "Le nom, la spécialité, l'e-mail et le téléphone.",
          prereq: "Le nom doit être unique dans votre agence, sans tenir compte des majuscules ni des espaces en bord de nom.",
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
      h1: "Budget prévisionnel de copropriété : préparation et répartition par lot",
      metaTitle: "Budget prévisionnel de copropriété : logiciel syndic",
      summary:
        "Préparez le budget prévisionnel de la copropriété ligne par ligne, faites-le approuver en assemblée générale et obtenez la quote-part de chaque lot selon les tantièmes.",
      intro:
        "Le budget prévisionnel de copropriété se prépare dans le logiciel, ligne par ligne, avec une clé de répartition pour chacune. Le logiciel calcule aussitôt la part de chaque lot selon ses tantièmes. Une fois le budget approuvé, et relié si vous le souhaitez à la résolution d'[assemblée générale](/wiki/syndic-copropriete/assemblees-generales) qui l'a voté, il sert de base aux [appels de charges](/wiki/syndic-copropriete/appels-de-charges).",
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
          title: "Approuver, réviser ou clôturer un budget",
          goal: "Faire évoluer le budget de brouillon à approuvé, puis à révisé ou clôturé, en le reliant si besoin à la résolution d'assemblée générale qui l'a voté. Avant la clôture, le logiciel affiche le budgété, le réalisé et l'écart. Un budget clôturé n'est plus modifiable.",
          output:
            "Le budget approuvé, daté du jour de son approbation. Réserve : le lien avec la résolution d'assemblée est facultatif et seule son existence est vérifiée ; un budget peut être approuvé sans résolution votée liée.",
          prereq:
            "Les passages autorisés sont : brouillon vers approuvé, approuvé vers révisé et inversement, approuvé ou révisé vers clôturé. Un budget encore utilisé par une programmation d'appels de charges active ne peut pas être clôturé.",
        },
        {
          title: "Affecter un poste du budget à un fonds",
          goal: "Désigner le fonds (fonds travaux, par exemple) qu'alimente un poste du budget : il reçoit sa part de chaque paiement de charges enregistré ensuite, au prorata de la répartition du lot. Vous pouvez aussi retirer l'affectation.",
          input: "Le poste du budget et le fonds.",
          prereq: "Le fonds doit appartenir à la même copropriété et avoir la même devise que le budget.",
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
          title: "Télécharger l'avis d'appel de charges en PDF",
          goal: "Récupérer l'avis d'appel d'un appel de charges (montant, avance imputée, reste à payer, échéance), le même que celui joint à l'e-mail du copropriétaire.",
          output: "Un avis d'appel en PDF.",
          prereq: "L'appel de charges doit exister.",
        },
        {
          title: "Télécharger l'avis d'appel de charges en Word",
          goal: "Récupérer l'avis d'appel dans un document Word que vous pouvez modifier avant de l'envoyer : en-tête, logos (agence mandante ou cabinet, copropriété), détail de l'appel, solde, montant en lettres et pied de page.",
          output: "Un document Word « avis d'appel » du lot et de la période.",
          prereq: "L'appel de charges doit exister. Bouton « Avis d'appel (Word) » dans la liste des appels.",
        },
        {
          title: "Affecter un appel de charges à un fonds",
          goal: "Désigner le fonds qui recevra en entier ce qui sera payé ensuite sur l'appel, par exemple pour un appel de fonds travaux. Vous pouvez aussi retirer l'affectation ; les paiements déjà reçus ne sont pas repris.",
          input: "L'appel de charges et le fonds.",
          prereq: "Le fonds doit appartenir à la même copropriété et avoir la même devise.",
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
          q: "Le copropriétaire peut-il payer son appel de charges en ligne ?",
          a: "Oui. Depuis son portail, ou grâce à un lien « Payer cet appel » que le syndic lui envoie ou que l'avis d'appel et les relances portent, il règle en mobile money. Voir la fonctionnalité Paiement en ligne des charges.",
        },
        {
          q: "Peut-on modifier l'avis d'appel avant de l'envoyer ?",
          a: "Oui. Vous le téléchargez en Word, avec l'en-tête, les logos, le détail, le solde et le montant en lettres, puis vous le retouchez.",
        },
        {
          q: "Peut-on programmer des appels de charges trimestriels ?",
          a: "Oui. Un appel peut être récurrent : vous choisissez la fréquence et le nombre d'appels à émettre.",
        },
      ],
      related: [
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/programmation-appels-de-charges",
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "syndic-copropriete/impayes-et-relances",
        "syndic-copropriete/paiement-en-ligne-des-charges",
      ],
    },
    {
      slug: "programmation-appels-de-charges",
      title: "Programmation des appels de charges",
      metaTitle: "Appels de charges programmés : mensuel, trimestriel, annuel",
      summary:
        "Programmez l'émission automatique des appels de charges de votre copropriété (mensuelle à annuelle), suivez chaque exécution et relancez les avis non envoyés.",
      intro:
        "Au lieu d'émettre vos appels de charges à la main à chaque échéance, vous programmez une fois le rythme (mensuel, trimestriel, semestriel ou annuel) et la source du montant : le budget approuvé, réparti par lot, ou un montant fixe. Le logiciel émet les appels à la date prévue, impute les avances déjà versées, délivre la quittance des appels entièrement couverts et envoie l'avis d'appel en PDF aux copropriétaires qui ont un reste à payer. Chaque exécution est historisée, avec la raison en clair des avis non partis.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter les programmations d'appels de charges",
          goal: "Voir les programmations de la copropriété, avec la prochaine période à émettre, la dernière exécution et l'état (active ou en pause).",
        },
        {
          title: "Consulter une programmation",
          goal: "Voir le détail d'une programmation : calendrier, montant, budget lié et dernière exécution.",
        },
        {
          title: "Créer une programmation d'appels de charges",
          goal: "Programmer l'émission automatique des appels de charges : mensuelle, trimestrielle, semestrielle ou annuelle, avec un montant tiré du budget ou un montant fixe.",
          input:
            "Le libellé, la fréquence, le jour d'émission (du 1 au 28), le nombre de jours avant l'échéance, la source du montant (budget ou montant fixe) et le budget ou le montant, la date de début, et en option la devise et la date de fin.",
          output:
            "La programmation, avec sa prochaine date d'émission. Aucune période passée n'est émise d'office.",
          prereq:
            "Avec un budget comme source, il doit appartenir à la copropriété, être approuvé et réparti par lot. Deux programmations actives ne peuvent pas couvrir la même période.",
        },
        {
          title: "Modifier une programmation",
          goal: "Changer le libellé, le calendrier, la source du montant ou les dates d'une programmation. La prochaine date d'émission est recalculée. Évolution en développement : l'état actif ou en pause se change uniquement par la pause et la reprise, plus par cette modification.",
          status: "developpement",
        },
        {
          title: "Mettre en pause une programmation",
          goal: "Suspendre l'émission automatique des appels d'une programmation.",
        },
        {
          title: "Reprendre une programmation",
          goal: "Réactiver une programmation en pause. Les périodes échues pendant la pause ne sont pas rattrapées.",
        },
        {
          title: "Supprimer une programmation",
          goal: "Supprimer une programmation qui n'a encore rien émis. Sinon, elle est seulement désactivée : l'historique et les appels déjà émis sont conservés.",
        },
        {
          title: "Prévisualiser les prochaines périodes",
          goal: "Afficher les trois prochaines périodes à émettre, avec leurs dates d'émission et d'échéance et leurs montants, au total et par lot, sans rien enregistrer.",
          output:
            "Un aperçu par période. Un budget non approuvé ou sans répartition est signalé comme une erreur sur la période concernée.",
        },
        {
          title: "Exécuter une programmation maintenant",
          goal: "Émettre à la demande la période due (sinon la période en cours) : un appel par lot, avec imputation des avances et quittance pour chaque appel entièrement couvert. L'avis d'appel en PDF part aux seuls copropriétaires qui ont un reste à payer.",
          output:
            "Le résultat de l'exécution : appels créés, appels couverts par une avance, avis envoyés et avis non envoyés avec leur raison en clair. Une période déjà émise n'est jamais émise deux fois.",
          prereq: "Avec un budget comme source, il doit être approuvé et réparti par lot.",
        },
        {
          title: "Renvoyer les avis non envoyés d'une exécution",
          goal: "Après avoir corrigé la cause (adresse e-mail du copropriétaire, réglage de notification…), renvoyer l'avis d'appel aux seuls appels de l'exécution dont l'avis n'est jamais parti.",
          output: "Un résumé des avis envoyés et de ceux qui restent non envoyés, avec leurs raisons.",
          prereq: "Un renvoi n'est possible qu'une fois par minute, et seulement s'il reste des avis à envoyer.",
        },
        {
          title: "Consulter l'historique d'exécution",
          goal: "Afficher les exécutions d'une programmation, automatiques ou manuelles, avec la période, le résultat, les appels créés et couverts, les avis envoyés ou non, et l'erreur éventuelle.",
        },
        {
          title: "Émettre automatiquement les appels programmés",
          goal: "Chaque jour, le logiciel émet les appels des programmations actives dont la date d'émission est arrivée, comme une exécution manuelle. Les périodes manquées sont rattrapées dans l'ordre, et l'échec d'une programmation n'arrête pas les autres.",
          output: "Les appels de charges, quittances et avis d'appel envoyés, tracés dans l'historique d'exécution.",
          prereq: "La programmation doit être active.",
        },
      ],
      faq: [
        {
          q: "Les appels de charges sont-ils émis sans intervention de ma part ?",
          a: "Oui, une fois la programmation créée et active : le logiciel émet les appels à la date prévue. Vous pouvez aussi déclencher une période à la demande, ou mettre la programmation en pause.",
        },
        {
          q: "Que se passe-t-il si un copropriétaire a déjà versé une avance ?",
          a: "L'avance du lot est imputée sur chaque nouvel appel. Si l'appel est entièrement couvert, il est soldé et la quittance est délivrée, sans avis de paiement à envoyer.",
        },
        {
          q: "Que faire si un avis d'appel n'est pas parti ?",
          a: "L'historique d'exécution indique la raison : pas d'adresse e-mail, notification désactivée, envoi d'e-mails non configuré… Une fois la cause corrigée, vous renvoyez les avis non envoyés en un clic.",
        },
      ],
      related: [
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/quittances-et-recus",
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
          goal: "Saisir un règlement reçu sur un appel de charges précis. Si le montant dépasse le reste dû, l'excédent est imputé sur les autres appels ouverts du lot, puis conservé en avance.",
          input: "Le montant, la date du paiement, et en option le moyen de paiement et la référence.",
          output:
            "L'appel passe à « partiellement payé » ou « payé », le compte du lot est crédité et le reçu, puis la quittance des appels soldés, sont émis. Les fonds de la copropriété concernés sont crédités.",
          prereq: "L'appel de charges doit exister.",
        },
        {
          title: "Enregistrer un paiement de lot avec affectation",
          goal: "Saisir un paiement reçu d'un lot et le répartir sur les appels que vous cochez, sinon du plus ancien au plus récent. L'excédent devient une avance du lot, imputée automatiquement sur les prochains appels.",
          input:
            "Le montant, la date, le moyen de paiement, en option la référence et les appels (mois) à couvrir.",
          output:
            "Le détail de l'affectation appel par appel, l'avance du lot, le reçu et la quittance de chaque appel soldé. Les fonds de la copropriété concernés sont crédités.",
          prereq: "Le lot doit exister.",
        },
        {
          title: "Prévisualiser l'affectation d'un paiement",
          goal: "Voir comment un paiement serait réparti entre les appels du lot avant de l'enregistrer. Rien n'est écrit.",
          input: "Les mêmes informations que pour l'enregistrement du paiement.",
          output: "La répartition prévue, appel par appel, et l'avance qui en résulterait.",
        },
        {
          title: "Consulter les appels ouverts d'un lot",
          goal: "Afficher les appels de charges non soldés du lot, pour cocher les mois à couvrir au moment d'un paiement.",
          output: "Pour chaque appel : période, échéance, montant, déjà payé, reste dû et statut.",
        },
        {
          title: "Consulter l'avance d'un lot",
          goal: "Voir le crédit non affecté d'un lot (excédent de paiements passés), qui s'impute automatiquement sur chaque nouvel appel.",
        },
        {
          title: "Consulter le suivi mensuel de la copropriété",
          goal: "Voir d'un coup d'œil, pour un exercice, une grille lot par mois : chaque mois est réglé, partiel, dû ou en retard, avec l'avance de chaque lot.",
          input: "L'année (l'année en cours par défaut).",
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
        "syndic-copropriete/quittances-et-recus",
      ],
    },
    {
      slug: "quittances-et-recus",
      title: "Quittances et reçus de charges",
      metaTitle: "Quittances et reçus de charges de copropriété en PDF",
      summary:
        "Retrouvez les reçus de paiement et les quittances de charges de chaque copropriété, téléchargez-les, renvoyez-les par e-mail ou imprimez-les en planche.",
      intro:
        "À chaque paiement, le logiciel émet un reçu, puis une quittance pour chaque appel de charges soldé. Vous les retrouvez par copropriété ou par lot, vous téléchargez le PDF, vous le renvoyez au copropriétaire par e-mail ou vous imprimez plusieurs quittances sur une même feuille A4. Pour les appels déjà soldés avant l'arrivée des quittances, un rattrapage les émet en une fois.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances",
      status: "disponible",
      actions: [
        {
          title: "Consulter les quittances et reçus d'une copropriété",
          goal: "Afficher l'historique des reçus de paiement et des quittances de la copropriété, avec des filtres par lot, copropriétaire, type et période.",
          output: "Pour chaque document : numéro, période, montant, dates d'émission et d'envoi, et erreur d'envoi éventuelle.",
        },
        {
          title: "Consulter les quittances et reçus d'un lot",
          goal: "Afficher l'historique des reçus et quittances d'un lot précis.",
        },
        {
          title: "Télécharger un reçu ou une quittance",
          goal: "Récupérer le PDF d'un reçu de paiement ou d'une quittance déjà émis.",
          output: "Un document PDF.",
        },
        {
          title: "Télécharger la quittance ou le reçu en Word",
          goal: "Récupérer la quittance ou le reçu dans un document Word modifiable. Il reprend fidèlement ce qui a été enregistré à l'émission, sans jamais être recalculé.",
          output: "Un document Word portant le numéro de la quittance.",
          prereq: "La quittance ou le reçu doit avoir été émis. Bouton « Télécharger (Word) » dans la liste des quittances.",
        },
        {
          title: "Renvoyer une quittance ou un reçu par e-mail",
          goal: "Renvoyer au copropriétaire le PDF d'un reçu ou d'une quittance.",
          output: "La confirmation d'envoi, ou l'erreur éventuelle consignée sur le document.",
          prereq: "Le reçu ou la quittance doit avoir été émis. Le nombre de renvois est limité pour éviter les envois répétés.",
        },
        {
          title: "Imprimer les quittances en grille",
          goal: "Composer un PDF imprimable en A4 de plusieurs quittances (ou reçus, ou les deux) d'une période, pour tous les copropriétaires ou pour un seul.",
          input:
            "Les dates de début et de fin, le type de document, en option le lot ou le copropriétaire, et le nombre de colonnes (1 à 3) et de lignes (1 à 4) par feuille.",
          output: "Un PDF avec une grille par feuille, adaptée à la découpe.",
          prereq: "Des quittances ou reçus doivent avoir été émis sur la période.",
        },
        {
          title: "Générer les quittances manquantes",
          goal: "Émettre une quittance pour chaque appel de charges déjà soldé qui n'en a pas encore, sans jamais régénérer une quittance existante.",
          output: "Le nombre de quittances créées, ignorées et restant à traiter.",
          prereq:
            "Aucune quittance n'est créée pour d'anciens paiements non rattachés à un appel. Si beaucoup d'appels restent à traiter, relancez l'action jusqu'à ce que plus rien ne reste.",
        },
      ],
      faq: [
        {
          q: "Quand une quittance est-elle émise ?",
          a: "À l'enregistrement d'un paiement qui solde un appel de charges, le logiciel émet le reçu puis la quittance de cet appel.",
        },
        {
          q: "Peut-on imprimer plusieurs quittances sur une même feuille ?",
          a: "Oui. Vous choisissez une grille de 1 à 3 colonnes et de 1 à 4 lignes par feuille A4, avec des repères de découpe.",
        },
      ],
      related: [
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "syndic-copropriete/programmation-appels-de-charges",
        "syndic-copropriete/identite-des-documents",
        "syndic-copropriete/paiement-en-ligne-des-charges",
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
          output:
            "La relance est envoyée et inscrite à l'historique. Évolution en développement : si l'envoi échoue, la relance reste enregistrée avec le statut « échec » et l'écran vous avertit.",
          status: "developpement",
          prereq: "L'appel de charges ne doit pas être soldé.",
        },
        {
          title: "Relancer tous les retardataires",
          goal: "Relancer en une fois tous les appels de charges en retard et non soldés de la copropriété. Le niveau de relance augmente à chaque campagne, jusqu'au quatrième niveau.",
          output:
            "Le nombre d'appels traités et de relances envoyées. Évolution en développement : le nombre de relances dont l'envoi a échoué est aussi indiqué.",
          status: "developpement",
        },
        {
          title: "Consulter les pénalités de retard",
          goal: "Voir les pénalités appliquées pour retard de paiement, avec l'appel et le copropriétaire concernés.",
        },
        {
          title: "Appliquer une pénalité de retard",
          goal: "Facturer une pénalité sur un appel de charges impayé. Le taux saisi est mensuel (10 % au maximum), proratisé au nombre de jours de retard, et plafonné au reste dû. Un aperçu du montant s'affiche avant validation, puis la pénalité est débitée du compte du lot.",
          input: "Le taux mensuel, le nombre de jours de retard et la date d'application.",
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
          q: "Le copropriétaire relancé peut-il payer directement depuis la relance ?",
          a: "Oui, quand le paiement en ligne est ouvert pour la copropriété : la relance par e-mail ou WhatsApp porte un lien « Payer en ligne » vers l'appel concerné. Voir la fonctionnalité Paiement en ligne des charges.",
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
        "syndic-copropriete/paiement-en-ligne-des-charges",
      ],
    },
    {
      slug: "paiement-en-ligne-des-charges",
      title: "Paiement en ligne des charges",
      h1: "Paiement en ligne des charges de copropriété par mobile money",
      metaTitle: "Payer ses charges de copropriété en ligne : mobile money",
      summary:
        "Vos copropriétaires paient leurs appels de charges en mobile money, depuis leur portail ou un lien. Suivez les paiements, tranchez les cas douteux, reversez.",
      intro:
        "Le paiement en ligne permet à chaque copropriétaire de régler ses appels de charges avec son mobile money (Wave, Orange Money, MTN Money, Moov Money), depuis son [portail copropriétaire](/wiki/portails-clients/portail-coproprietaire) ou grâce à un lien « Payer cet appel » reçu du syndic. Chaque copropriété a son propre compte de paiement : l'argent encaissé lui revient, et l'encaissement est enregistré tout seul sur les appels, avec reçus et quittances. Cette fonction est incluse dans les packs Syndic et Opérateur intégré, sans commission ImmoTopia ([Tarifs](/tarifs)). Le copropriétaire qui reçoit un lien suit le parcours décrit dans [Payer un appel de charges par lien](/wiki/portails-clients/payer-un-appel-de-charges).",
      sections: [
        {
          title: "Comment le paiement en ligne s'ouvre-t-il pour une copropriété ?",
          body: [
            "Le paiement en ligne n'est ouvert que lorsque le compte de paiement de la copropriété est renseigné, activé et utilisable. Il n'y a jamais de repli sur le compte de l'agence : tant que la configuration n'est pas utilisable, les copropriétaires ne voient ni bouton « Payer en ligne » ni lien de paiement, mais un message leur indique que le règlement en ligne n'est pas encore ouvert.",
            [
              "Le copropriétaire règle des appels entiers d'un seul lot à la fois. Le montant n'est jamais saisi : il est recalculé par ImmoTopia à partir du reste dû.",
              "Si l'appel est soldé entre-temps, l'excédent devient une avance sur le compte du lot.",
              "Le logiciel redemande régulièrement le statut des paiements en attente, enregistre ceux qui sont confirmés et fait expirer, après 48 heures, ceux qui n'ont pas abouti. Si le service de paiement est injoignable, aucun paiement n'expire.",
            ],
          ],
        },
        {
          title: "Que veut dire « paiement à trancher » ?",
          body: [
            "Certains paiements encaissés ne peuvent pas être enregistrés automatiquement, et le syndic doit décider. C'est le cas quand le montant payé diffère du montant demandé, quand l'exercice est clos à la date du paiement, quand l'appel a disparu ou n'appartient pas au lot, quand la transaction est déjà enregistrée, ou quand un état contraire est rapporté après un succès. Le paiement apparaît dans un bandeau « paiement(s) à trancher », et le copropriétaire est informé que son paiement est en cours de vérification par le syndic : inutile de payer deux fois.",
            "Accepter enregistre le montant reçu sur les appels encore ouverts (l'excédent devient une avance du lot, les reçus et quittances sont émis) ; refuser n'enregistre rien. Refuser ne rembourse pas le payeur : le remboursement se fait en dehors d'ImmoTopia.",
          ],
        },
        {
          title: "Où va l'argent encaissé ?",
          body: [
            "Les paiements en ligne alimentent un compte de collecte propre à la copropriété. Le service de paiement verse ensuite ces sommes sur le compte bancaire de la copropriété. ImmoTopia ne déclenche aucun virement : vous enregistrez le reversement une fois le virement arrivé, ce qui l'inscrit en comptabilité. Les frais éventuels retenus par le service de paiement ne sont pas comptabilisés dans ImmoTopia.",
          ],
        },
      ],
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Finances › Paiements en ligne",
      status: "disponible",
      actions: [
        {
          title: "Consulter la configuration du paiement en ligne",
          goal: "Voir l'état du compte de paiement propre à la copropriété : activation, identifiant du compte, présence de la clé (jamais réaffichée, seulement ses quatre derniers caractères), compte utilisable ou non, résultat du dernier test, adresse de notification à communiquer au service de paiement, et solde comptable du compte de collecte.",
          prereq: "La copropriété doit être créée.",
        },
        {
          title: "Configurer le compte de paiement de la copropriété",
          goal: "Renseigner le compte de paiement de la copropriété : activer le paiement en ligne, saisir l'identifiant du compte et la clé. La clé s'écrit mais ne se relit jamais ; le bouton « Remplacer la clé » permet de la changer, et un simple enregistrement ne l'efface pas.",
          input: "L'activation, l'identifiant du compte et la clé de paiement.",
          output: "La configuration enregistrée. Activer le paiement exige l'identifiant et la clé.",
          prereq:
            "Changer l'identifiant ou la clé est refusé tant qu'un paiement de la copropriété est en attente. Par défaut, cette action est réservée à l'administrateur de l'agence.",
          profiles: ["direction"],
        },
        {
          title: "Tester la connexion du compte de paiement",
          goal: "Vérifier que le compte de paiement de la copropriété répond. Le résultat est enregistré et s'affiche sur la ligne « Dernier test » ; un service injoignable donne un échec clairement indiqué, jamais une erreur.",
          output: "Un message de réussite ou d'échec et, si le service le fournit, le solde du compte.",
          prereq: "Le compte de paiement doit être renseigné.",
          profiles: ["direction"],
        },
        {
          title: "Consulter le solde chez le service de paiement",
          goal: "Afficher le solde du compte de paiement de la copropriété, à rapprocher du solde comptable du compte de collecte affiché juste au-dessus. Le bouton « Actualiser » relit le solde.",
          output: "Le montant, la devise et l'heure de lecture, ou le motif pour lequel le solde n'est pas disponible.",
          prereq: "Le compte de paiement doit être utilisable.",
        },
        {
          title: "Suivre les paiements en ligne des copropriétaires",
          goal: "Suivre toutes les tentatives de paiement de la copropriété, qu'elles viennent du portail ou d'un lien. Des pastilles filtrent par statut (en attente, payé, échoué, annulé, expiré, à trancher) et par origine, et un bandeau met en avant les paiements à trancher.",
          output:
            "Pour chaque paiement : date, code de paiement, lot, payeur, appels visés, montant demandé (et montant reçu s'il diffère), origine, moyen utilisé et statut. La liste est paginée par 20.",
        },
        {
          title: "Vérifier un paiement en ligne",
          goal: "Redemander au service de paiement le statut d'un paiement « en attente » ou « à trancher », par exemple si sa confirmation s'est perdue, et appliquer le résultat : encaissement, échec, annulation ou mise à trancher. Rejouer la vérification ne crée jamais de doublon. Sur un paiement déjà à trancher, elle met seulement le suivi à jour : seule votre décision enregistre l'encaissement.",
          output: "Le paiement mis à jour, avec l'indication que son statut a changé ou non.",
          prereq: "Le paiement doit être en attente ou à trancher.",
        },
        {
          title: "Trancher un paiement en ligne à vérifier",
          goal: "Décider du sort d'un paiement à trancher, encaissé chez le service de paiement mais non enregistré automatiquement. Accepter enregistre le montant reçu sur les appels ouverts à la date choisie (utile pour sortir d'un exercice clos) ; refuser n'enregistre rien et marque le paiement comme échoué.",
          input: "La décision (accepter ou refuser), une note de 1 à 500 caractères obligatoire, et la date d'encaissement pour une acceptation (par défaut aujourd'hui, jamais dans le futur).",
          output: "Le paiement tranché et, pour une acceptation, l'encaissement avec la part devenue avance et les reçus et quittances émis.",
          prereq:
            "Selon le motif, une option est désactivée : accepter est impossible pour une transaction déjà enregistrée, refuser pour un encaissement déjà existant. Refuser ne rembourse pas le payeur.",
        },
        {
          title: "Créer et copier le lien « Payer cet appel »",
          goal: "Générer un lien sécurisé « Payer cet appel » pour UN appel de charges, à transmettre vous-même : messagerie personnelle ou en main propre. Le lien complet n'est affiché qu'une seule fois, avec un bouton « Copier ». Il est valable de 1 à 30 jours (7 par défaut). Il ne contient aucun montant : le copropriétaire voit le reste dû recalculé à l'ouverture.",
          input: "L'appel de charges et la durée de validité du lien.",
          output: "Le lien à copier et sa date d'expiration.",
          prereq:
            "Le compte de paiement de la copropriété doit être utilisable et l'appel non soldé, en francs CFA. Le lot ne doit pas avoir changé de copropriétaire depuis l'appel. Bouton « Lien de paiement » dans la liste des appels de charges.",
        },
        {
          title: "Envoyer le lien « Payer cet appel » au copropriétaire",
          goal: "Envoyer le lien au copropriétaire actuel du lot, par son canal préféré, WhatsApp ou e-mail. Le destinataire est celui de la fiche du lot, jamais une adresse saisie à la main.",
          input: "L'appel de charges et la durée de validité du lien, de 1 à 30 jours (7 par défaut).",
          output:
            "Le lien est envoyé avec le montant dû. Si aucun canal n'est possible ou si l'envoi échoue, aucun lien n'est conservé et la raison s'affiche.",
          prereq:
            "Le copropriétaire doit avoir donné son accord pour WhatsApp ou l'e-mail, et la notification « Lien de paiement d'un appel de charges » doit être activée (elle l'est par défaut).",
        },
        {
          title: "Suivre les liens de paiement d'un appel",
          goal: "Voir les liens « Payer cet appel » émis pour un appel de charges, leur état (actif, expiré, révoqué), leurs dates, le nombre de consultations, leur origine (gestionnaire, ou joint à un avis ou une relance) et l'état du dernier paiement associé. Par défaut, seuls les liens actifs s'affichent.",
          output: "Un tableau « Liens de cet appel ». Jamais de lien complet ni de jeton. Un utilisateur en lecture seule voit la liste sans pouvoir créer ni révoquer.",
        },
        {
          title: "Révoquer un lien de paiement",
          goal: "Rendre un lien inutilisable tout de suite, s'il a été envoyé par erreur ou divulgué. Le lien affiche ensuite « Lien invalide ou expiré. ».",
          output: "Le lien révoqué. Révoquer un lien déjà révoqué est sans effet.",
          prereq: "Le lien doit être actif. Une confirmation est demandée.",
        },
        {
          title: "Joindre automatiquement le lien de paiement aux avis et aux relances",
          goal: "Quand l'avis d'appel (par e-mail et WhatsApp) ou la relance d'un appel part, le message porte un bloc « Payer en ligne » avec un lien « Payer cet appel » valable 30 jours. Le lien n'est joint que si le paiement en ligne est utilisable pour la copropriété, si l'appel a un reste dû en francs CFA et si le lot n'a pas changé de copropriétaire. Sinon le message part inchangé, et la création du lien ne fait jamais échouer l'envoi.",
          output:
            "Le message avec son bloc de paiement. Le lien apparaît ensuite dans la liste des liens de l'appel, avec l'origine « Joint à un avis ou une relance ». Chaque nouvel envoi remplace les liens automatiques encore actifs du même appel ; les liens créés par un gestionnaire sont conservés.",
          prereq:
            "Si votre agence a personnalisé ses modèles de message, elle peut y ajouter le lien de paiement pour qu'il y figure.",
        },
        {
          title: "Consulter les reversements vers la banque",
          goal: "Voir les reversements enregistrés quand le service de paiement a versé l'argent encaissé en ligne sur le compte bancaire de la copropriété. Les reversements annulés n'y figurent pas.",
          output: "Pour chaque reversement : date, référence, montant et note, du plus récent au plus ancien.",
        },
        {
          title: "Enregistrer un reversement vers la banque",
          goal: "Constater en comptabilité qu'un virement du service de paiement est arrivé sur la banque de la copropriété : le montant passe du compte de collecte au compte bancaire. L'enregistrement ne déclenche aucun virement, et le rapprochement avec le relevé du service de paiement reste manuel.",
          input: "Le montant, la date (jamais dans le futur), une référence unique pour la copropriété et une note facultative.",
          output: "Le reversement enregistré et le solde restant du compte de collecte.",
          prereq:
            "Le solde du compte de collecte doit être positif, le montant ne peut pas le dépasser et l'exercice doit être ouvert. Le bouton « Enregistrer un reversement » est inactif tant que le solde est nul.",
        },
        {
          title: "Configurer la notification du lien de paiement d'un appel",
          goal: "Activer, désactiver ou personnaliser, pour votre agence, le message qui porte le lien « Payer cet appel » quand le gestionnaire l'envoie : un modèle par e-mail et un modèle par WhatsApp, tous deux actifs par défaut. Le texte peut reprendre le nom du copropriétaire, la copropriété, le lot, la période, le montant dû, l'échéance, le lien et sa date d'expiration.",
          input: "L'activation du message et son texte pour chaque canal. Une action permet de revenir au modèle standard.",
          output: "Le message configuré, utilisé pour les envois du lien de paiement.",
          prereq: "Menu Communication › Notifications e-mail et Notifications WhatsApp.",
        },
      ],
      faq: [
        {
          q: "Le paiement en ligne des charges est-il payant ?",
          a: "Il est inclus dans les packs Syndic et Opérateur intégré, et ImmoTopia ne prélève aucune commission sur les paiements. Des frais du service de paiement peuvent s'ajouter selon le réglage de l'agence, et le copropriétaire en est informé avant de payer. Voir les tarifs.",
        },
        {
          q: "Où va l'argent payé par le copropriétaire ?",
          a: "Sur le compte de paiement propre à la copropriété, puis sur son compte bancaire par un reversement. Il n'y a jamais de mélange avec le compte de l'agence.",
        },
        {
          q: "Peut-on payer seulement une partie d'un appel de charges ?",
          a: "Non. Le paiement couvre les appels entiers d'un seul lot, pour leur reste dû. Il n'y a pas de montant libre.",
        },
        {
          q: "Que se passe-t-il si le copropriétaire paie deux fois ou une somme différente ?",
          a: "Un paiement dont le montant diffère de la demande est signalé « à trancher » : le syndic décide de l'accepter, auquel cas l'excédent devient une avance sur le compte du lot, ou de le refuser. Un refus ne rembourse pas le payeur.",
        },
        {
          q: "Le copropriétaire a-t-il besoin d'un compte pour payer ?",
          a: "Non. Avec le lien « Payer cet appel », il paie sans connexion. Avec un compte, il paie depuis son portail copropriétaire.",
        },
      ],
      related: [
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/encaissements-comptes-coproprietaires",
        "syndic-copropriete/impayes-et-relances",
        "syndic-copropriete/quittances-et-recus",
        "portails-clients/payer-un-appel-de-charges",
        "portails-clients/portail-coproprietaire",
      ],
    },
    {
      slug: "fonds-de-copropriete",
      title: "Fonds et synthèse financière",
      h1: "Fonds de roulement et fonds travaux de copropriété",
      metaTitle: "Fonds de roulement et fonds travaux de copropriété",
      summary:
        "Suivez les fonds de chaque copropriété (fonds de roulement, fonds travaux) et sa synthèse financière : total appelé, payé, restant dû et retards en un coup d'œil.",
      intro:
        "La synthèse financière vous donne l'état d'une copropriété en un écran : soldes des fonds, total appelé, total payé, restant dû et retards. Vous créez les fonds dont la copropriété a besoin, comme le fonds de roulement ou le fonds travaux, et vous ajustez leur solde avec un motif. Chaque opération sur un fonds est tracée dans le journal d'audit.",
      sections: [
        {
          title: "Fonds de roulement de copropriété : définition et suivi",
          body: [
            "Le fonds de roulement est une avance de trésorerie constituée par les copropriétaires : il permet de payer les dépenses courantes de la copropriété en attendant que les appels de charges soient encaissés. Ses conditions de constitution et d'usage dépendent du règlement de copropriété et de la réglementation applicable, à vérifier avec votre syndic ou votre conseil juridique.",
            "Dans ImmoTopia, vous ouvrez le fonds de roulement comme n'importe quel fonds de la copropriété, avec son solde de départ et sa devise (FCFA par défaut). Vous le créditez ou le débitez avec un motif obligatoire, vous saisissez les dépenses qu'il règle, et chaque opération est inscrite à son journal et tracée dans le journal d'audit. Son solde figure dans la synthèse financière, à côté du total appelé, du total payé, du restant dû et des retards. Un poste du [budget prévisionnel](/wiki/syndic-copropriete/budget-previsionnel) peut aussi alimenter un fonds, qui reçoit alors sa part de chaque paiement de charges.",
          ],
        },
      ],
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
          title: "Ajuster le solde d'un fonds ou saisir une dépense",
          goal: "Créditer ou débiter un fonds à la main, ou saisir une dépense payée par le fonds (toujours un débit), avec un motif obligatoire. Le solde peut devenir négatif : l'écran le signale.",
          input: "Le sens (crédit ou débit), le montant, le motif et le type d'opération (ajustement ou dépense).",
          output: "Le nouveau solde du fonds, avec l'opération inscrite au journal du fonds et tracée dans le journal d'audit.",
        },
      ],
      faq: [
        {
          q: "Quelle différence entre fonds de roulement et fonds de travaux ?",
          a: "Le fonds de roulement est une avance de trésorerie qui sert aux dépenses courantes en attendant l'encaissement des charges. Le fonds de travaux est une réserve mise de côté pour financer des travaux futurs. Dans ImmoTopia, chacun est un fonds distinct, avec son propre solde et son propre journal.",
        },
        {
          q: "Peut-on alimenter un fonds depuis le budget ?",
          a: "Oui. Vous affectez un poste du budget prévisionnel à un fonds : il reçoit sa part de chaque paiement de charges enregistré ensuite, au prorata de la répartition du lot.",
        },
      ],
      related: [
        "syndic-copropriete/comptabilite-copropriete",
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/budget-previsionnel",
      ],
    },
    {
      slug: "comptabilite-copropriete",
      title: "Comptabilité de copropriété",
      h1: "Comptabilité de copropriété : plan comptable, journaux et grand livre",
      metaTitle: "Plan comptable copropriété : comptabilité en partie double",
      summary:
        "Tenez la comptabilité de chaque copropriété en partie double : plan comptable, journaux, écritures équilibrées et verrouillées, balance et grand livre.",
      intro:
        "Chaque copropriété a sa propre comptabilité en partie double, avec son plan comptable de copropriété et ses journaux. Vous saisissez les écritures, toujours équilibrées, et vous les verrouillez une fois validées. La balance et le grand livre sont disponibles à tout moment, sur la période de votre choix.",
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
      h1: "Assemblée générale de copropriété : convocation, vote et procès-verbal",
      metaTitle: "Assemblée générale de copropriété : convocation, vote, PV",
      summary:
        "Convoquez l'assemblée générale de copropriété, gérez les pouvoirs, suivez la séance en direct (émargement, votes en ligne) et générez le procès-verbal en Word.",
      intro:
        "De la convocation au procès-verbal, l'assemblée générale se prépare et se tient dans le logiciel. Vous fixez l'ordre du jour et les résolutions, enregistrez les pouvoirs, puis saisissez le vote de chaque lot : le résultat en tantièmes et le quorum se recalculent aussitôt. Pendant la séance, la console en direct vous montre la présence, le quorum et les votes, et chaque copropriétaire peut émarger et voter en ligne depuis son lien personnel. À la fin, le compte rendu est généré en Word, prêt à être relu et diffusé. Une visio de l'assemblée est proposée en option : voir [Visio des assemblées](/wiki/syndic-copropriete/visio-des-assemblees).",
      sections: [
        {
          title: "Comment tenir l'assemblée en direct ?",
          body: [
            "Une fois l'assemblée ouverte, la console « En direct » de la fiche de l'assemblée se rafraîchit toute seule. Elle affiche le quorum (présents, représentés, en ligne), l'émargement de chaque lot, l'état du vote et le décompte de chaque résolution, ainsi que la liste des participants. Cette fonction est incluse dans les packs Syndic et Opérateur intégré, sans visio.",
            [
              "Vous émargez les copropriétaires qui ne se connectent pas (présent en salle ou en ligne, représenté ou absent), un lot à la fois ou plusieurs lots d'un coup ; le quorum est recalculé.",
              "Vous ouvrez le vote d'une résolution, puis vous le clôturez ; plusieurs résolutions peuvent être ouvertes en même temps. Tant que le vote est ouvert, la décision provisoire est masquée (« Vote en cours ») et les décomptes restent visibles.",
              "Chaque participant reçoit un lien personnel, sans mot de passe, que vous créez, copiez et transmettez par téléphone ou par messagerie, et que vous pouvez révoquer. Le copropriétaire connecté depuis son [portail copropriétaire](/wiki/portails-clients/portail-coproprietaire) obtient lui-même son lien.",
              "Avec son lien, le copropriétaire ou son mandataire émarge, suit le quorum et vote en ligne : voir [Assemblée générale par lien personnel](/wiki/portails-clients/assemblee-par-lien-personnel). Pendant un vote ouvert, il ne voit que le nombre de lots ayant voté ; le résultat n'apparaît qu'à la clôture du vote.",
              "Un écran de projection affiche en plein écran le quorum, la résolution en cours de vote et sa participation, puis les résultats des résolutions closes.",
            ],
          ],
        },
        {
          title: "Où retrouver le procès-verbal d'une assemblée générale ?",
          body: [
            "Une fois l'assemblée tenue, le syndic génère le procès-verbal depuis l'assemblée : le document Word reprend l'ordre du jour, les résolutions, les résultats en tantièmes et le quorum. Il se relit avant d'être diffusé.",
            "Pour le mettre à disposition, le syndic le dépose dans les [documents de la copropriété](/wiki/syndic-copropriete/documents-copropriete), avec le type « procès-verbal ». Le copropriétaire le retrouve ensuite dans son [portail copropriétaire](/wiki/portails-clients/portail-coproprietaire), à côté du règlement de copropriété, et peut le télécharger. Pour une assemblée clôturée, il y voit aussi les résolutions, les résultats et ses propres votes, jamais ceux des autres lots.",
          ],
        },
      ],
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
          output:
            "L'assemblée et ses résolutions, avec le décompte d'envoi de la convocation par e-mail aux copropriétaires (envoyés, échecs, sans adresse). Un échec d'envoi n'annule pas l'assemblée.",
          prereq: "L'heure de début doit être antérieure à l'heure de fin.",
        },
        {
          title: "Renvoyer la convocation",
          goal: "Réenvoyer par e-mail la convocation aux copropriétaires d'une assemblée encore planifiée.",
          output:
            "Le décompte des envois : copropriétaires, e-mails envoyés, échecs, et copropriétaires sans adresse comptés à part.",
          prereq: "L'assemblée doit être planifiée.",
        },
        {
          title: "Télécharger la convocation d'un lot en Word",
          goal: "Générer la convocation d'un copropriétaire dans un document Word que vous pouvez modifier : lot, tantièmes, date, heure, lieu, ordre du jour, quorum et date limite pour donner pouvoir.",
          input: "Le lot concerné et, en option, la date limite pour donner pouvoir.",
          output: "Un document Word « convocation à l'assemblée » du lot.",
          prereq: "L'assemblée doit être convoquée. Bouton « Télécharger la convocation (Word) » sur la fiche de l'assemblée.",
        },
        {
          title: "Modifier ou faire avancer une assemblée",
          goal: "Changer le lieu ou les horaires, ouvrir la séance, la clôturer ou annuler une assemblée prévue.",
          output: "L'assemblée mise à jour et horodatée. À la clôture, les résultats et le quorum sont recalculés.",
        },
        {
          title: "Consulter le détail d'une assemblée",
          goal: "Tout voir sur une assemblée : ordre du jour, résolutions avec le décompte des voix en tantièmes, pouvoirs, présence et quorum. Chaque lot affiche ses votants à la date de l'assemblée (propriétaire à cette date, indivisaires nommés).",
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
          goal: "Saisir ou corriger le vote d'un lot sur une résolution : pour, contre ou abstention. Le votant retenu est le propriétaire du lot à la date de l'assemblée, pas le propriétaire actuel.",
          output: "Le résultat de la résolution et le quorum, recalculés immédiatement.",
          prereq: "L'assemblée ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Suivre l'assemblée en direct",
          goal: "Voir en temps réel la présence et le quorum (présents, représentés, en ligne), l'émargement de chaque lot, l'état du vote et le décompte de chaque résolution, ainsi que les compteurs de participants. L'écran se rafraîchit toutes les quelques secondes pendant la séance.",
          output:
            "La console « En direct » : quorum, lots avec leurs votants, émargement et présence en ligne, résolutions avec l'état du vote, la participation, le décompte et l'origine de chaque vote. Tant qu'un vote est ouvert, la décision provisoire est masquée (« Vote en cours ») ; les décomptes restent visibles.",
          prereq: "L'assemblée doit être convoquée.",
        },
        {
          title: "Émarger un lot",
          goal: "Enregistrer la présence d'un copropriétaire qui ne se connecte pas : présent en salle ou en ligne, représenté par un mandataire, ou absent. Le quorum est recalculé aussitôt.",
          input: "Le lot, sa situation (présent, représenté, absent), le mode (en salle ou en ligne) et, si le lot est représenté, le mandataire.",
          output: "La console à jour, avec le quorum recalculé.",
          prereq: "L'assemblée doit être planifiée ou en cours.",
        },
        {
          title: "Émarger plusieurs lots en une fois",
          goal: "Marquer en masse des lots présents ou absents, par exemple à l'arrivée des copropriétaires en salle.",
          input: "Les lots (jusqu'à 500 à la fois), leur situation et le mode.",
          output: "La console à jour.",
          prereq: "L'assemblée doit être planifiée ou en cours.",
        },
        {
          title: "Ouvrir le vote d'une résolution",
          goal: "Soumettre une résolution au vote des copropriétaires connectés. Plusieurs résolutions peuvent être ouvertes en même temps, et une résolution close peut être rouverte. Pendant le vote, la décision provisoire reste masquée.",
          output: "La résolution passe en vote ouvert et la console se met à jour.",
          prereq: "La résolution doit exister et l'assemblée doit être en cours.",
        },
        {
          title: "Clore le vote d'une résolution",
          goal: "Arrêter le vote en ligne d'une résolution. Son résultat devient alors visible des copropriétaires. La clôture de l'assemblée clôt aussi les votes encore ouverts.",
          output: "La résolution passe en vote clos et la console se met à jour.",
          prereq: "Le vote de la résolution doit être ouvert.",
        },
        {
          title: "Consulter les participants",
          goal: "Voir les copropriétaires et mandataires qui peuvent voter (leurs lots et leurs pouvoirs), s'ils ont rejoint l'assemblée, s'ils sont en ligne et s'ils ont des liens personnels actifs.",
          output: "Pour chaque participant : contact, e-mail, téléphone, lots qu'il peut voter, heure d'arrivée, dernière présence et liens actifs.",
          prereq: "L'assemblée doit être convoquée.",
        },
        {
          title: "Créer et copier le lien personnel d'un participant",
          goal: "Remettre à un copropriétaire ou à un mandataire un lien sans mot de passe qui ouvre directement l'assemblée en direct. Vous le transmettez par téléphone, messagerie ou en main propre. Il reste valable jusqu'à 7 jours après l'assemblée.",
          output: "Le lien, affiché une seule fois pour être copié, et sa date d'expiration.",
          prereq: "Le participant doit voter ou représenter un lot dans cette assemblée, qui ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Révoquer les liens personnels d'un participant",
          goal: "Rendre inutilisables tous les liens déjà remis à un participant, par exemple s'ils ont été envoyés à la mauvaise personne.",
          output: "Le nombre de liens révoqués.",
          prereq: "Le participant doit avoir au moins un lien actif.",
        },
        {
          title: "Projeter l'assemblée en salle",
          goal: "Afficher en plein écran, pour la salle, le quorum, la résolution en cours de vote avec sa participation, et les résultats des résolutions closes. L'écran se rafraîchit tout seul.",
          prereq: "La console de l'assemblée en direct doit être accessible.",
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
          output:
            "Un document Word, prêt à être relu et diffusé. Réserve : le compte rendu peut être généré avant la clôture de l'assemblée ; pensez à le relire une fois la séance terminée.",
        },
      ],
      faq: [
        {
          q: "Les copropriétaires peuvent-ils voter en ligne pendant l'assemblée ?",
          a: "Oui. Le syndic remet à chaque participant un lien personnel, sans mot de passe. Le copropriétaire ou son mandataire émarge, puis vote Pour, Contre ou Abstention sur les résolutions ouvertes, pour tous ses lots ou lot par lot. Il peut revoter tant que le vote est ouvert.",
        },
        {
          q: "Voit-on le résultat d'une résolution pendant le vote ?",
          a: "Côté syndic, les décomptes restent visibles mais la décision provisoire est masquée (« Vote en cours »). Le copropriétaire voit seulement combien de lots ont voté, jamais le sens des votes des autres ; le résultat apparaît à la clôture du vote.",
        },
        {
          q: "La visio de l'assemblée est-elle comprise ?",
          a: "Non. L'assemblée en direct (console, émargement, votes en ligne, projection) est incluse dans les packs Syndic et Opérateur intégré. La visio est une extension payante, « Visio des assemblées » : voir les tarifs.",
        },
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
        {
          q: "Où le copropriétaire retrouve-t-il le procès-verbal d'une assemblée ?",
          a: "Le syndic génère le procès-verbal en Word, le relit, puis le dépose dans les documents de la copropriété. Le copropriétaire le consulte et le télécharge depuis son portail copropriétaire.",
        },
      ],
      related: [
        "syndic-copropriete/visio-des-assemblees",
        "portails-clients/assemblee-par-lien-personnel",
        "portails-clients/portail-coproprietaire",
        "syndic-copropriete/budget-previsionnel",
        "syndic-copropriete/documents-copropriete",
        "syndic-copropriete/coproprietaires-et-occupants",
      ],
    },
    {
      slug: "visio-des-assemblees",
      title: "Visio des assemblées",
      h1: "Visio des assemblées générales de copropriété",
      metaTitle: "Visio d'assemblée générale de copropriété : parole et vote",
      summary:
        "Tenez l'assemblée générale en visio : salle micro et caméra, main levée, parole donnée ou retirée, discussion écrite modérée et enregistrement de la séance.",
      intro:
        "La visio des assemblées prolonge l'[assemblée générale en direct](/wiki/syndic-copropriete/assemblees-generales) : le gestionnaire anime une salle de visio, les copropriétaires la rejoignent depuis leur [lien personnel](/wiki/portails-clients/assemblee-par-lien-personnel) et votent à côté, sur la même page. Le gestionnaire donne la parole, modère la discussion écrite et peut enregistrer la séance. C'est une extension payante, « Visio des assemblées », qui s'ajoute aux packs Syndic ou Opérateur intégré : voir les [Tarifs](/tarifs).",
      sections: [
        {
          title: "Comment se déroule une assemblée en visio ?",
          body: [
            "Le gestionnaire ouvre la salle depuis la console « En direct » de l'assemblée, avec son micro, sa caméra et le partage d'écran. Les copropriétaires entrent par leur lien personnel : ils voient et entendent le gestionnaire, sans micro ni caméra tant que la parole ne leur est pas donnée.",
            [
              "Un copropriétaire qui souhaite intervenir lève la main ; les mains levées s'affichent dans la console, les plus anciennes en tête.",
              "Le gestionnaire donne la parole (micro et caméra s'ouvrent, la main est baissée), la retire, ou exclut un participant de la salle.",
              "Le vote se fait à côté de la visio, dans les résolutions de la même page ; un message écrit dans la discussion ne vaut jamais vote.",
            ],
          ],
        },
        {
          title: "Enregistrer la séance : ce que voient les participants",
          body: [
            "Quand l'enregistrement est disponible, la convocation envoyée aux copropriétaires, par e-mail ou WhatsApp, porte un avis : la séance pourra être enregistrée (image et son), y compris la voix et l'image des participants qui activent leur micro ou leur caméra, et un avis s'affichera à l'écran pendant l'enregistrement.",
            "Pendant l'enregistrement, tous les participants voient « Cette assemblée est enregistrée », dans la salle comme sur la page de l'assemblée. L'enregistrement ne capte jamais le vote. Le fichier est conservé de façon privée jusqu'à ce que vous le supprimiez ; il se regarde ou se télécharge depuis la console, jamais en accès public.",
          ],
        },
        {
          title: "La discussion écrite modérée",
          body: [
            "La salle comprend une discussion écrite : messages courts en texte simple (500 caractères au plus), visibles de tous les participants. Le gestionnaire y écrit à tout moment, même quand elle est fermée aux copropriétaires. Il peut masquer un message sans le supprimer (les copropriétaires voient alors « Message masqué par le gestionnaire »), le rétablir, fermer ou rouvrir l'écriture à tous les copropriétaires, ou la couper pour un participant précis. Tous les messages, masqués compris, restent consultables par le syndic après la clôture de l'assemblée.",
          ],
        },
      ],
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      menu: "Syndic › Assemblées et documents › fiche de l'assemblée › En direct",
      status: "disponible",
      actions: [
        {
          title: "Suivre la visio de l'assemblée",
          goal: "Voir qui est dans la salle de visio, quelles mains sont levées (les plus anciennes en tête), qui a la parole, et si un enregistrement est en cours.",
          output:
            "Pour chaque participant en visio : copropriétaire ou gestionnaire, nom, main levée, parole accordée, écriture coupée dans la discussion et heure d'entrée.",
          prereq: "La visio doit être activée avec l'extension « Visio des assemblées ». L'assemblée en direct doit être accessible.",
        },
        {
          title: "Ouvrir la salle de visio",
          goal: "Entrer dans la salle en animateur, avec micro, caméra et partage d'écran. La salle est créée à l'ouverture si elle n'existe pas encore.",
          prereq: "L'assemblée doit être planifiée ou en cours.",
        },
        {
          title: "Donner ou retirer la parole",
          goal: "Ouvrir à un copropriétaire présent dans la salle son micro et sa caméra (sa main est alors baissée), ou les lui retirer.",
          input: "Le participant concerné.",
          prereq: "Le participant doit être présent dans la salle.",
        },
        {
          title: "Exclure un participant de la visio",
          goal: "Retirer une personne de la salle. Vous pouvez aussi révoquer ses liens personnels : elle ne peut alors ni revenir ni voter avec eux.",
          input: "Le participant et, en option, la révocation de ses liens.",
          output: "La salle à jour et le nombre de liens révoqués.",
        },
        {
          title: "Enregistrer la séance en visio",
          goal: "Démarrer l'enregistrement vidéo de la salle. Tous les participants voient « Cette assemblée est enregistrée » tant qu'il dure.",
          output: "Un enregistrement en cours, avec son heure de début.",
          prereq:
            "L'enregistrement doit être disponible dans votre abonnement et l'assemblée en cours. Un seul enregistrement peut tourner à la fois pour une assemblée.",
        },
        {
          title: "Arrêter l'enregistrement",
          goal: "Mettre fin à l'enregistrement en cours. Le fichier est ensuite traité puis rangé dans le stockage privé d'ImmoTopia.",
          output: "L'enregistrement arrêté, en attente de la fin de son traitement. La clôture de l'assemblée l'arrête aussi.",
          prereq: "Un enregistrement doit être en cours.",
        },
        {
          title: "Consulter les enregistrements de l'assemblée",
          goal: "Voir les enregistrements de la séance avec leur statut (en cours, en traitement, disponible, échec, supprimé), leur début, leur durée, leur taille et leur auteur.",
          output: "La liste des enregistrements, le plus récent en premier.",
        },
        {
          title: "Lire ou télécharger un enregistrement",
          goal: "Regarder l'enregistrement dans le lecteur de la console ou le télécharger. Il n'est jamais servi en accès public, et chaque lecture ou téléchargement est consigné au journal d'audit.",
          output: "Une vidéo MP4 à lire ou à enregistrer.",
          prereq: "L'enregistrement doit être disponible.",
        },
        {
          title: "Relancer le traitement d'un enregistrement",
          goal: "Relancer la copie du fichier d'un enregistrement dont le traitement a échoué (bouton « Réessayer »).",
          output: "L'enregistrement repasse en traitement, puis devient disponible ou signale un nouvel échec.",
          prereq: "Le traitement de l'enregistrement doit avoir échoué.",
        },
        {
          title: "Supprimer un enregistrement",
          goal: "Effacer le fichier d'un enregistrement disponible ou en échec. La ligne reste dans la liste, au statut « supprimé », pour garder la trace.",
          prereq: "L'enregistrement doit être disponible ou en échec.",
        },
        {
          title: "Lire la discussion écrite de la visio",
          goal: "Relire tous les messages de la discussion, y compris les messages masqués et après la clôture de l'assemblée. Vous voyez aussi si la discussion est ouverte aux copropriétaires et quels participants ne peuvent plus écrire.",
          output: "Les 1 000 derniers messages dans l'ordre chronologique : auteur, marque « Gestionnaire », texte, message masqué ou non, heure.",
        },
        {
          title: "Écrire dans la discussion de la visio",
          goal: "Publier un message (annonce, réponse) visible de tous les participants de la salle, même quand la discussion est fermée aux copropriétaires.",
          input: "Un texte simple de 1 à 500 caractères.",
          output: "Le message, publié sous votre nom avec la marque « Gestionnaire ».",
          prereq: "L'assemblée doit être en cours et la visio activée.",
        },
        {
          title: "Masquer ou rétablir un message de la discussion",
          goal: "Retirer un message de la vue de tous (« Message masqué par le gestionnaire ») sans le supprimer, ou le rétablir. Le texte masqué n'est plus jamais montré aux copropriétaires.",
          input: "Le message concerné.",
          output: "Le message mis à jour dans la salle.",
        },
        {
          title: "Ouvrir ou fermer la discussion aux copropriétaires",
          goal: "Suspendre ou rouvrir l'écriture de tous les copropriétaires dans la discussion. Elle est ouverte par défaut, et ils continuent de lire quand elle est fermée.",
          output: "L'état de la discussion, mis à jour pour tous les participants.",
          prereq: "L'assemblée ne doit être ni clôturée ni annulée.",
        },
        {
          title: "Couper ou rétablir l'écriture d'un participant",
          goal: "Empêcher un copropriétaire d'écrire dans la discussion pour toute l'assemblée, ou lui rendre ce droit. Il continue de lire et en est prévenu dans la salle.",
          input: "Le participant concerné.",
          output: "L'état « écriture coupée » du participant, visible dans la console.",
        },
      ],
      faq: [
        {
          q: "La visio des assemblées est-elle incluse dans le pack Syndic ?",
          a: "Non. C'est une extension payante, « Visio des assemblées », que l'on ajoute aux packs Syndic ou Opérateur intégré. L'assemblée en direct sans visio (console, émargement, votes en ligne, projection) est incluse dans ces packs.",
        },
        {
          q: "Les copropriétaires peuvent-ils parler pendant l'assemblée ?",
          a: "Oui, quand le gestionnaire leur donne la parole. Ils entrent sans micro ni caméra, lèvent la main pour demander la parole, et leur micro et leur caméra s'ouvrent quand le gestionnaire accepte.",
        },
        {
          q: "Les participants sont-ils prévenus que la séance est enregistrée ?",
          a: "Oui. La convocation le mentionne, et le bandeau « Cette assemblée est enregistrée » s'affiche à tous pendant l'enregistrement.",
        },
        {
          q: "Combien de temps l'enregistrement est-il conservé ?",
          a: "Jusqu'à ce que le gestionnaire le supprime : aucune suppression automatique. Le fichier reste privé et ne se regarde ou ne se télécharge que depuis la console.",
        },
        {
          q: "Peut-on voter depuis la salle de visio ?",
          a: "Le vote se fait à côté de la visio, dans les résolutions de la même page (en onglets sur téléphone). Un message dans la discussion ne vaut jamais vote.",
        },
      ],
      related: [
        "syndic-copropriete/assemblees-generales",
        "portails-clients/assemblee-par-lien-personnel",
        "portails-clients/portail-coproprietaire",
        "syndic-copropriete/coproprietaires-et-occupants",
      ],
    },
    {
      slug: "identite-des-documents",
      title: "Identité des documents de copropriété",
      metaTitle: "Logo, signature et cachet sur les documents de copropriété",
      summary:
        "Faites apparaître le logo, la signature et le cachet de votre cabinet, de l'agence mandante ou de la copropriété sur les relevés, procès-verbaux et quittances.",
      intro:
        "Les documents que vous éditez pour une copropriété (relevés de compte, procès-verbaux d'assemblée, reçus et quittances) portent l'identité de qui les signe. Si la copropriété dépend d'une agence mandante, ce sont le logo, la signature et le cachet du mandant qui s'affichent ; sinon, ceux de votre cabinet. La copropriété peut en plus avoir son propre logo, affiché en complément.",
      packs: ["syndic", "integre"],
      profiles: ["direction", "equipe"],
      menu: "Agence › Paramètres de l'agence",
      status: "disponible",
      actions: [
        {
          title: "Consulter la signature et le cachet de l'agence",
          goal: "Voir si votre agence a déjà une signature et un cachet pour ses documents. Ils servent quand une copropriété n'a pas d'agence mandante.",
          output: "L'état de la signature et du cachet, avec leur aperçu s'ils existent.",
        },
        {
          title: "Gérer la signature et le cachet de l'agence",
          goal: "Déposer, remplacer ou supprimer la signature et le cachet apposés sur les documents de l'agence (relevés, procès-verbaux d'assemblée, reçus et quittances) quand une copropriété n'a pas de mandant.",
          input: "Une image de la signature ou du cachet.",
          output: "La signature ou le cachet mis à jour, utilisé sur les prochains documents.",
        },
        {
          title: "Gérer le logo d'une copropriété",
          goal: "Déposer, remplacer ou supprimer le logo propre à la copropriété, affiché en complément du logo du mandant (ou de l'agence) sur ses documents.",
          input: "Une image au format PNG ou JPG.",
          prereq: "La copropriété doit être créée.",
        },
      ],
      faq: [
        {
          q: "Quelle identité apparaît sur les documents d'une copropriété ?",
          a: "Celle de l'agence mandante si la copropriété en a une, sinon celle de votre cabinet. Le logo de la copropriété, s'il existe, s'ajoute à ce logo.",
        },
      ],
      related: [
        "syndic-copropriete/agences-mandantes",
        "syndic-copropriete/quittances-et-recus",
        "syndic-copropriete/assemblees-generales",
      ],
    },
    {
      slug: "agences-mandantes",
      title: "Agences mandantes",
      metaTitle: "Agences mandantes : gérer des copropriétés pour un tiers",
      summary:
        "Enregistrez les agences mandantes pour le compte desquelles votre cabinet gère des copropriétés, avec leur logo, leur signature et leur cachet sur les documents.",
      intro:
        "Quand votre cabinet gère des copropriétés pour le compte d'une autre agence, vous enregistrez cette agence comme mandant. Ses coordonnées, son logo, sa signature et son cachet sont repris sur les documents des copropriétés qu'elle mandate : relevés, procès-verbaux, reçus et quittances.",
      packs: ["syndic", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Consulter les agences mandantes",
          goal: "Voir les agences mandantes pour le compte desquelles votre cabinet gère des copropriétés, avec la présence de leur logo, de leur signature et de leur cachet.",
        },
        {
          title: "Créer une agence mandante",
          goal: "Enregistrer un mandant dont le cabinet gère des copropriétés.",
          input: "Le nom (obligatoire), et en option la raison sociale, l'adresse, le téléphone, l'e-mail, le RCCM et l'identifiant fiscal.",
          prereq: "Le nom doit être unique dans votre agence, sans tenir compte des majuscules.",
        },
        {
          title: "Consulter une agence mandante",
          goal: "Voir la fiche complète d'un mandant.",
        },
        {
          title: "Modifier une agence mandante",
          goal: "Mettre à jour les coordonnées d'un mandant.",
          prereq: "Si vous changez le nom, il doit rester unique dans votre agence.",
        },
        {
          title: "Supprimer une agence mandante",
          goal: "Retirer un mandant qui ne rend plus service au cabinet. Son logo, sa signature et son cachet sont effacés.",
          prereq: "Aucune copropriété ne doit lui être rattachée : détachez-les d'abord.",
        },
        {
          title: "Gérer le logo d'un mandant",
          goal: "Déposer, remplacer ou supprimer le logo du mandant, apposé sur les documents des copropriétés qu'il mandate.",
          input: "Une image au format PNG ou JPG.",
          prereq: "L'agence mandante doit être créée.",
        },
        {
          title: "Gérer la signature et le cachet d'un mandant",
          goal: "Déposer, remplacer ou supprimer la signature et le cachet du mandant, apposés sur les documents des copropriétés qu'il mandate.",
          input: "Une image de la signature ou du cachet.",
          prereq: "L'agence mandante doit être créée.",
        },
      ],
      related: [
        "syndic-copropriete/identite-des-documents",
        "syndic-copropriete/coproprietes",
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
      sections: [
        {
          title: "Quels documents le copropriétaire peut-il consulter ?",
          body: [
            "Parmi les documents d'une copropriété, le règlement de copropriété et les procès-verbaux d'assemblée sont ceux que le copropriétaire consulte et télécharge lui-même, depuis son [portail copropriété](/wiki/portails-clients/portail-coproprietaire). Les autres documents du syndic (diagnostics, assurance, budget) ne lui sont pas affichés. Le procès-verbal vient de l'[assemblée générale](/wiki/syndic-copropriete/assemblees-generales) : une fois généré en Word, vous le déposez ici.",
          ],
        },
      ],
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
        "portails-clients/portail-coproprietaire",
        "syndic-copropriete/assemblees-generales",
        "syndic-copropriete/coproprietes",
      ],
    },
  ],
};
