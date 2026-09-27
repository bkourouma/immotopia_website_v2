import type { WikiDomain } from "./types";

export const biensEtPatrimoine: WikiDomain = {
  slug: "biens-et-patrimoine",
  title: "Biens et patrimoine",
  metaTitle: "Logiciel de gestion de biens immobiliers en Côte d'Ivoire",
  summary:
    "Fiches biens, photos, documents, visites, mandats de gestion, annonces en ligne et suivi du patrimoine : tout votre parc immobilier au même endroit.",
  intro:
    "Ce domaine couvre tout ce qui touche au bien lui-même : sa fiche détaillée, ses photos et ses documents, ses visites et sa mise en ligne. Il réunit aussi le suivi patrimonial : valeur estimée, rendement, charges, emprunts et travaux. Il s'adresse aux agences, gestionnaires locatifs, syndics et promoteurs qui veulent un parc à jour, partagé par toute l'équipe. Chaque bien reçoit une référence interne unique, que tout le monde utilise.",
  features: [
    {
      slug: "fiche-bien",
      title: "Fiche bien",
      metaTitle: "Fiche bien immobilier et gestion de parc en Côte d'Ivoire",
      summary:
        "Créez la fiche de chaque bien : type, adresse, prix, surfaces, statut, appartements d'un immeuble. Recherche multicritère et score de qualité inclus.",
      intro:
        "La fiche bien est le point de départ de tout votre travail : chaque bien, de l'appartement à l'immeuble entier, y est décrit une fois pour toutes. Les champs s'adaptent au type de bien, et un immeuble regroupe ses appartements sous forme de lots. Vos agents retrouvent un bien en quelques secondes grâce aux filtres et à la recherche avancée. Un score de qualité vous signale ce qui manque pour avoir une fiche complète.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › Toutes les propriétés",
      status: "disponible",
      actions: [
        {
          title: "Créer un bien",
          goal: "Ajouter un bien au portefeuille, qu'il appartienne à l'agence ou à un propriétaire privé.",
          input:
            "Le type de bien, un titre, l'adresse, le prix, les surfaces, le nombre de pièces, le ou les modes de transaction, les caractéristiques propres au type et, si besoin, le propriétaire.",
          output: "Une fiche créée, avec une référence interne attribuée automatiquement.",
          profiles: ["direction", "gestionnaire", "agent"],
        },
        {
          title: "Adapter la fiche au type de bien",
          goal: "Le formulaire affiche les champs requis et facultatifs propres à chaque type de bien : vous ne remplissez que ce qui compte.",
          output: "La liste des champs attendus pour le type choisi.",
        },
        {
          title: "Localiser le bien",
          goal: "Trouver la commune en tapant quelques lettres, ou la choisir en parcourant pays, régions et communes.",
          output: "Une adresse rattachée à sa commune, sa région et son pays.",
        },
        {
          title: "Consulter la liste des biens",
          goal: "Parcourir tout le portefeuille et le filtrer par recherche libre, ville, prix, surface, pièces, chambres, statut, type ou transaction.",
          output:
            "Une liste par pages, avec la vignette photo de chaque bien et, pour un immeuble, le nombre d'appartements loués et disponibles.",
        },
        {
          title: "Faire une recherche avancée",
          goal: "Combiner plusieurs critères : type, prix, surface, pièces, zone, ou une position sur la carte avec un rayon autour.",
          output: "Les biens qui répondent à tous vos critères.",
        },
        {
          title: "Consulter la fiche complète d'un bien",
          goal: "Voir tout le bien sur un seul écran : photos et vidéos, documents, historique des statuts, immeuble de rattachement ou appartements rattachés.",
        },
        {
          title: "Modifier un bien",
          goal: "Mettre à jour les informations de la fiche.",
          output:
            "Une fiche à jour. Si deux personnes modifient la même fiche en même temps, la seconde modification est refusée au lieu d'écraser la première.",
        },
        {
          title: "Changer le statut d'un bien",
          goal: "Faire passer un bien d'un statut à un autre, par exemple de disponible à réservé. Seuls les passages prévus sont autorisés.",
          input: "Le nouveau statut et, si besoin, une note.",
          output: "Le statut mis à jour et le changement inscrit dans l'historique.",
        },
        {
          title: "Consulter l'historique des statuts",
          goal: "Voir tous les changements de statut du bien, avec leur date et leur auteur.",
        },
        {
          title: "Mesurer la qualité de la fiche",
          goal: "Obtenir une note sur 100 qui mesure la complétude de la fiche : champs requis, photos, localisation, description.",
          output: "Le score, le détail par critère et des suggestions pour l'améliorer.",
        },
        {
          title: "Ajouter un appartement à un immeuble",
          goal: "Créer un lot rattaché à un immeuble. Il reprend automatiquement la localisation et l'adresse de l'immeuble.",
          input: "Les mêmes informations que pour un bien ; le type appartement est proposé par défaut.",
          prereq: "L'immeuble doit exister dans vos biens, avec le type immeuble.",
        },
        {
          title: "Consulter les appartements d'un immeuble",
          goal: "Lister tous les lots d'un immeuble, avec leur vignette, depuis l'onglet Lots de sa fiche.",
        },
        {
          title: "Supprimer un bien",
          goal: "Supprimer définitivement un bien, avec ses photos, ses documents et ses lots.",
          prereq: "Aucune affaire en cours dans le CRM ne doit être liée au bien.",
        },
      ],
      faq: [
        {
          q: "Peut-on gérer un immeuble et ses appartements ?",
          a: "Oui. Vous créez l'immeuble, puis ses appartements comme lots rattachés. Ils reprennent l'adresse de l'immeuble, et la liste des biens affiche pour l'immeuble le nombre d'appartements loués et disponibles.",
        },
        {
          q: "Comment savoir si une fiche est complète ?",
          a: "Le score de qualité note la fiche sur 100 selon les champs requis, les photos, la localisation et la description, et vous suggère quoi compléter.",
        },
      ],
      related: [
        "biens-et-patrimoine/photos-et-documents-du-bien",
        "biens-et-patrimoine/annonces-immobilieres",
        "biens-et-patrimoine/visites-immobilieres",
      ],
    },
    {
      slug: "photos-et-documents-du-bien",
      title: "Photos, vidéos et documents du bien",
      metaTitle: "Photos, vidéos et documents d'un bien immobilier",
      summary:
        "Ajoutez photos, vidéos et documents à chaque bien : photo principale, ordre d'affichage, dates d'expiration et pièces obligatoires, tout est sur la fiche.",
      intro:
        "Chaque bien a sa galerie et son classeur. Vous y déposez les photos et vidéos qui mettront le bien en valeur, et les pièces du dossier, plans compris. Un document peut porter une date d'expiration et être marqué obligatoire : vous voyez tout de suite ce qui n'est plus valable. Plus besoin de chercher un fichier dans un téléphone ou une boîte e-mail.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › Toutes les propriétés › fiche bien",
      status: "disponible",
      actions: [
        {
          title: "Ajouter une photo ou une vidéo",
          goal: "Enrichir la galerie du bien.",
          input:
            "Le fichier : photo JPEG, PNG ou WebP, ou vidéo MP4, WebM ou QuickTime. Si besoin, sa position dans la galerie et s'il s'agit de la photo principale.",
          output: "Le média ajouté à la galerie du bien.",
        },
        {
          title: "Consulter la galerie",
          goal: "Voir les photos et vidéos du bien dans leur ordre d'affichage.",
        },
        {
          title: "Réordonner les photos et vidéos",
          goal: "Changer l'ordre d'affichage de la galerie par glisser-déposer.",
        },
        {
          title: "Choisir la photo principale",
          goal: "Désigner la photo qui sert de vignette au bien. L'ancienne photo principale perd ce rôle automatiquement.",
        },
        {
          title: "Supprimer une photo ou une vidéo",
          goal: "Retirer un média de la galerie, fichier compris.",
        },
        {
          title: "Ajouter un document",
          goal: "Classer une pièce du dossier dans la fiche du bien.",
          input:
            "Le fichier (PDF, Word, image, ou TIFF et DWG pour les plans), son type, sa date d'expiration et s'il est obligatoire.",
          output: "Le document enregistré, marqué valide ou non d'après sa date d'expiration.",
        },
        {
          title: "Consulter les documents",
          goal: "Lister les documents du bien, en affichant ou en masquant ceux qui ont expiré.",
        },
        {
          title: "Télécharger un document",
          goal: "Récupérer le fichier d'un document depuis la fiche du bien.",
        },
        {
          title: "Supprimer un document",
          goal: "Retirer un document de la fiche, fichier compris.",
        },
      ],
      faq: [
        {
          q: "Quels formats de fichiers sont acceptés ?",
          a: "Pour la galerie : photos JPEG, PNG ou WebP et vidéos MP4, WebM ou QuickTime. Pour les documents : PDF, Word, images, ainsi que TIFF et DWG pour les plans.",
        },
        {
          q: "Comment repérer un document périmé ?",
          a: "Chaque document peut porter une date d'expiration. Sa validité est calculée d'après cette date, et vous pouvez masquer les documents expirés dans la liste.",
        },
      ],
      related: ["biens-et-patrimoine/fiche-bien", "biens-et-patrimoine/annonces-immobilieres"],
    },
    {
      slug: "mandats-de-gestion",
      title: "Mandats de gestion et indivision",
      metaTitle: "Mandat de gestion et indivision d'un bien, en ligne",
      summary:
        "Prenez en gestion les biens de propriétaires privés : mandats datés, révocation avec historique, et quotes-parts de chaque propriétaire en indivision.",
      intro:
        "Quand un propriétaire vous confie son bien, le mandat de gestion formalise cette prise en charge dans ImmoTopia. Vous suivez ses dates, son périmètre et l'ensemble des mandats en cours de l'agence. Pour un bien détenu à plusieurs, vous indiquez la quote-part de chaque propriétaire. Un mandat révoqué reste dans l'historique.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › Toutes les propriétés › fiche bien",
      status: "disponible",
      actions: [
        {
          title: "Créer un mandat de gestion",
          goal: "Enregistrer la prise en gestion, par l'agence, d'un bien appartenant à un propriétaire privé.",
          input: "Le bien, la date de début, la date de fin si elle est connue, le périmètre du mandat et des notes.",
          output: "Un mandat actif sur le bien.",
          prereq:
            "Le bien doit être enregistré comme bien d'un propriétaire client, sans mandat déjà actif de votre agence.",
        },
        {
          title: "Consulter les mandats d'un bien",
          goal: "Voir les mandats en cours de votre agence sur ce bien. Les mandats d'une autre agence ne sont jamais visibles.",
        },
        {
          title: "Consulter tous les mandats de l'agence",
          goal: "Avoir la liste des mandats actifs, tous biens confondus.",
          output: "Chaque mandat avec son bien et son propriétaire.",
        },
        {
          title: "Révoquer un mandat",
          goal: "Mettre fin à un mandat de gestion.",
          output: "Le mandat devient inactif et reste dans l'historique, avec la date et l'auteur de la révocation.",
        },
        {
          title: "Consulter la répartition des quotes-parts",
          goal: "Voir les propriétaires d'un bien en indivision et la part de chacun.",
          output:
            "La répartition, le propriétaire indiqué dans les baux du bien et la liste de vos propriétaires pour faciliter la saisie.",
        },
        {
          title: "Définir les quotes-parts",
          goal: "Indiquer qui possède quelle part du bien.",
          input:
            "Chaque propriétaire et son pourcentage, jusqu'à quatre décimales. Le total doit faire 100 %, avec au plus 50 propriétaires, chacun une seule fois.",
          output: "La nouvelle répartition, qui remplace entièrement l'ancienne.",
          prereq: "Les propriétaires doivent déjà être enregistrés comme clients de l'agence.",
        },
      ],
      faq: [
        {
          q: "Un bien peut-il avoir plusieurs propriétaires ?",
          a: "Oui. Vous saisissez chaque propriétaire et son pourcentage ; le total doit faire 100 %, avec jusqu'à 50 propriétaires par bien.",
        },
        {
          q: "Que devient un mandat révoqué ?",
          a: "Il n'est plus actif, mais il reste dans l'historique avec la date et l'auteur de la révocation.",
        },
      ],
      related: ["biens-et-patrimoine/fiche-bien"],
    },
    {
      slug: "visites-immobilieres",
      title: "Visites",
      metaTitle: "Planning des visites immobilières pour agences",
      summary:
        "Planifiez les visites de biens, désignez l'agent, liez le contact et l'affaire du CRM, puis rédigez le compte rendu. Calendrier partagé de toute l'agence.",
      intro:
        "Organisez les visites sans cahier ni messages éparpillés. Chaque visite est rattachée à un bien, à un agent responsable et, si besoin, au contact et à l'affaire suivis dans le CRM. Le calendrier de l'agence montre qui fait visiter quoi, et quand. Après la visite, le compte rendu est enregistré et retrouvé sur la fiche du contact.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › Calendrier des visites",
      status: "disponible",
      actions: [
        {
          title: "Planifier une visite",
          goal: "Programmer une visite sur un bien.",
          input:
            "Le type de visite, son objectif, la date et l'heure à venir, la durée, le lieu, l'agent responsable, les collègues présents, le contact et l'affaire concernés, des notes.",
          output: "La visite programmée. Si un contact est lié, une activité s'ajoute à sa fiche CRM.",
        },
        {
          title: "Consulter les visites d'un bien",
          goal: "Voir, depuis la fiche du bien, les visites passées et à venir avec le contact, l'affaire, l'agent et les collègues.",
        },
        {
          title: "Mettre à jour le statut d'une visite",
          goal: "Indiquer qu'une visite est confirmée ou annulée, par exemple.",
          input: "Le nouveau statut et, si besoin, une note.",
        },
        {
          title: "Clôturer une visite avec un compte rendu",
          goal: "Marquer la visite comme effectuée et noter ce qui s'est dit.",
          output: "La visite terminée. Si un contact est lié, une activité s'ajoute à sa fiche CRM.",
        },
        {
          title: "Consulter le calendrier des visites",
          goal: "Voir toutes les visites de l'agence sur une période, regroupées par jour.",
          input: "La période (par défaut, les 30 prochains jours) et, si besoin, l'agent concerné.",
        },
      ],
      faq: [
        {
          q: "Les visites apparaissent-elles dans le CRM ?",
          a: "Oui. Quand un contact est lié à la visite, une activité est ajoutée à sa fiche CRM à la planification et à la clôture.",
        },
      ],
      related: ["biens-et-patrimoine/fiche-bien"],
    },
    {
      slug: "annonces-immobilieres",
      title: "Annonces en ligne",
      metaTitle: "Publier des annonces immobilières en ligne en Côte d'Ivoire",
      summary:
        "Publiez vos biens sur le portail d'annonces public, après un contrôle de la fiche : photo principale, prix, localisation, documents obligatoires valides.",
      intro:
        "Un bien prêt à louer ou à vendre se met en ligne depuis sa fiche. Avant publication, ImmoTopia vérifie que l'annonce est complète, pour ne jamais montrer une annonce sans photo ni prix. Les visiteurs consultent ensuite les biens publiés sans créer de compte, avec des filtres simples. Vous retirez l'annonce dès que le bien n'est plus disponible.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "visiteur"],
      menu: "Biens › Toutes les propriétés › fiche bien",
      status: "disponible",
      actions: [
        {
          title: "Publier un bien",
          goal: "Rendre le bien visible sur le portail public des annonces, après vérification de la fiche.",
          prereq:
            "La fiche doit avoir un titre, une description, une adresse, une photo principale, une position sur la carte, un prix, un statut commercialisable et des documents obligatoires valides.",
          output:
            "Le bien en ligne, avec sa date de publication. La publication déclenche aussi une diffusion WhatsApp de groupe.",
          profiles: ["direction"],
        },
        {
          title: "Retirer une annonce",
          goal: "Retirer le bien du portail public.",
          profiles: ["direction"],
        },
        {
          title: "Parcourir les annonces",
          goal: "Les visiteurs consultent, sans compte, les biens publiés et commercialisables.",
          input: "Des filtres : type, zone, prix, surface, pièces, transaction.",
          output: "La liste des annonces correspondantes, par pages.",
          profiles: ["visiteur"],
        },
        {
          title: "Consulter une annonce",
          goal: "Afficher la fiche publique d'un bien publié : photos et vidéos, informations et documents valides.",
          profiles: ["visiteur"],
        },
      ],
      faq: [
        {
          q: "Que vérifie ImmoTopia avant la mise en ligne ?",
          a: "Le titre, la description, l'adresse, la photo principale, la position sur la carte, le prix, un statut commercialisable et la validité des documents obligatoires.",
        },
        {
          q: "Qui peut publier un bien ?",
          a: "Dans la configuration de départ, la direction de l'agence. Les visiteurs, eux, consultent les annonces sans compte.",
        },
      ],
      related: ["biens-et-patrimoine/fiche-bien", "biens-et-patrimoine/photos-et-documents-du-bien"],
    },
    {
      slug: "vue-consolidee-du-patrimoine",
      title: "Vue consolidée et performance",
      metaTitle: "Suivi de patrimoine immobilier : rendement et plus-value",
      summary:
        "Mesurez la valeur totale de votre patrimoine, le rendement brut, net et net-net de chaque bien, la plus-value latente et une projection sur plusieurs années.",
      intro:
        "Pour un propriétaire institutionnel, un promoteur ou une agence qui détient des biens, la question est simple : combien vaut le patrimoine, et combien rapporte-t-il ? La vue consolidée répond d'un coup d'œil. L'écran de performance calcule les rendements et la plus-value latente, puis projette l'évolution selon vos propres hypothèses.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Patrimoine › Vue consolidée",
      status: "disponible",
      actions: [
        {
          title: "Consulter la vue consolidée",
          goal: "Voir d'un coup d'œil la valeur totale du patrimoine, les indicateurs clés et les travaux en cours.",
        },
        {
          title: "Analyser la performance du portefeuille",
          goal: "Calculer le rendement brut, net et net-net, la plus-value latente et une projection, pour tout le portefeuille ou pour un bien choisi.",
          input:
            "Vos hypothèses : nombre d'années, hausse de la valeur, des loyers et des charges, taux de vacance.",
          output: "Un aperçu du portefeuille, ou le détail des rendements et de la projection pour le bien choisi.",
        },
        {
          title: "Calculer le rendement d'un bien",
          goal: "Depuis l'onglet Patrimoine de la fiche, obtenir les rendements du bien et leur projection dans le temps.",
          input: "Les mêmes hypothèses de projection.",
        },
      ],
      faq: [
        {
          q: "Peut-on simuler l'évolution d'un bien sur plusieurs années ?",
          a: "Oui. Vous indiquez le nombre d'années, la hausse attendue de la valeur, des loyers et des charges, et le taux de vacance ; ImmoTopia calcule la projection.",
        },
      ],
      related: [
        "biens-et-patrimoine/valorisation-des-biens",
        "biens-et-patrimoine/charges-et-depenses",
        "biens-et-patrimoine/emprunts-immobiliers",
      ],
    },
    {
      slug: "valorisation-des-biens",
      title: "Valorisations",
      metaTitle: "Estimation et valorisation d'un bien immobilier",
      summary:
        "Gardez l'historique des estimations de chaque bien : valeur manuelle, de marché ou d'expertise, coût et date d'acquisition, pour suivre sa valeur dans le temps.",
      intro:
        "La valeur d'un bien change avec le marché, les travaux et le quartier. Ici, vous enregistrez chaque estimation avec sa date et sa méthode. Vous gardez ainsi un historique fiable, prêt à présenter à un propriétaire ou à une banque.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › fiche bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Consulter l'historique des valorisations",
          goal: "Voir toutes les estimations de valeur du bien et ouvrir le détail de chacune.",
        },
        {
          title: "Ajouter une valorisation",
          goal: "Enregistrer une nouvelle estimation de la valeur du bien.",
          input:
            "La date, la valeur estimée, la devise, la méthode (manuelle, marché ou expertise), des notes et, si besoin, le coût et la date d'acquisition.",
        },
        {
          title: "Modifier une valorisation",
          goal: "Corriger une estimation déjà enregistrée.",
        },
        {
          title: "Supprimer une valorisation",
          goal: "Retirer une estimation de l'historique.",
        },
      ],
      related: ["biens-et-patrimoine/vue-consolidee-du-patrimoine"],
    },
    {
      slug: "charges-et-depenses",
      title: "Dépenses et charges",
      metaTitle: "Suivi des charges et dépenses d'un bien immobilier",
      summary:
        "Enregistrez les dépenses de chaque bien : catégorie, montant en FCFA, date, moyen de paiement, fournisseur, justificatif. Vous savez ce que chaque bien coûte.",
      intro:
        "Réparations, taxes, assurances : les dépenses d'un bien finissent souvent dans des carnets séparés. Ici, chaque charge est saisie sur la fiche du bien, avec son fournisseur et son justificatif. Vous distinguez aussi les dépenses qui s'ajoutent à la valeur du bien. Vous savez enfin ce que coûte réellement chaque bien.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › fiche bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Consulter les dépenses d'un bien",
          goal: "Lister les charges enregistrées sur le bien et ouvrir le détail de chacune.",
        },
        {
          title: "Ajouter une dépense",
          goal: "Saisir une charge payée pour le bien.",
          input:
            "La catégorie, un libellé, le montant, la devise, la date de paiement, le moyen de paiement, le fournisseur, le justificatif et si la dépense s'ajoute à la valeur du bien.",
        },
        {
          title: "Modifier une dépense",
          goal: "Corriger une charge déjà enregistrée.",
        },
        {
          title: "Supprimer une dépense",
          goal: "Retirer une charge du bien.",
        },
      ],
      related: ["biens-et-patrimoine/vue-consolidee-du-patrimoine", "biens-et-patrimoine/programmes-de-travaux"],
    },
    {
      slug: "emprunts-immobiliers",
      title: "Emprunts",
      metaTitle: "Suivi des emprunts immobiliers par bien",
      summary:
        "Rattachez à chaque bien les prêts qui le financent : banque, capital emprunté et restant dû, taux, mensualité, dates et statut, en cours ou soldé.",
      intro:
        "Un bien financé à crédit se suit avec son prêt. Vous enregistrez chaque emprunt sur la fiche du bien, avec sa mensualité et le capital restant dû. Vous voyez ce qui reste à rembourser, bien par bien, sans rouvrir les tableaux de la banque.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › fiche bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Consulter les emprunts d'un bien",
          goal: "Lister les prêts qui financent le bien et ouvrir le détail de chacun.",
        },
        {
          title: "Ajouter un emprunt",
          goal: "Enregistrer un prêt lié au bien.",
          input:
            "Le prêteur, le capital emprunté, le capital restant dû, le taux, la mensualité, la devise, les dates de début et de fin.",
        },
        {
          title: "Modifier un emprunt",
          goal: "Mettre à jour un prêt, par exemple le capital restant dû ou son statut : en cours, soldé ou en défaut.",
        },
        {
          title: "Supprimer un emprunt",
          goal: "Retirer un prêt de la fiche du bien.",
        },
      ],
      related: ["biens-et-patrimoine/vue-consolidee-du-patrimoine"],
    },
    {
      slug: "programmes-de-travaux",
      title: "Travaux",
      metaTitle: "Planification et suivi des travaux sur vos biens",
      summary:
        "Planifiez les travaux de chaque bien : coût estimé puis réel, date prévue et date de fin, statut. Une vue de l'agence liste tous les travaux en cours.",
      intro:
        "Réfection, extension, remise en état : chaque programme de travaux est rattaché à son bien. Vous comparez le coût estimé au coût réel et suivez l'avancement par statut. La vue de l'agence montre d'un coup d'œil tout ce qui est planifié, en cours ou terminé.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Patrimoine › Travaux",
      status: "disponible",
      actions: [
        {
          title: "Consulter les travaux d'un bien",
          goal: "Depuis l'onglet Patrimoine de la fiche, lister les programmes de travaux du bien et ouvrir le détail de chacun.",
        },
        {
          title: "Consulter tous les travaux de l'agence",
          goal: "Voir tous les programmes de travaux, tous biens confondus.",
          input: "Si besoin, un statut : planifié, en cours, terminé ou annulé.",
          output: "La liste par pages, avec le bien concerné.",
        },
        {
          title: "Ajouter un programme de travaux",
          goal: "Planifier des travaux sur un bien.",
          input:
            "Un titre, une description, le coût estimé, la devise, la date prévue et si les travaux s'ajoutent à la valeur du bien.",
          output: "Un programme au statut planifié.",
        },
        {
          title: "Modifier un programme de travaux",
          goal: "Mettre à jour le programme : coût réel, date de fin, statut.",
        },
        {
          title: "Supprimer un programme de travaux",
          goal: "Retirer un programme de travaux.",
        },
        {
          title: "Rattacher des travaux à un chantier",
          goal: "Lier un programme de travaux à un chantier suivi financièrement, ou l'en détacher.",
          output: "Tant que le lien existe, le coût réel des travaux est repris du chantier.",
          status: "deploiement",
        },
      ],
      related: ["biens-et-patrimoine/vue-consolidee-du-patrimoine", "biens-et-patrimoine/charges-et-depenses"],
    },
    {
      slug: "documents-patrimoniaux",
      title: "Documents patrimoniaux",
      metaTitle: "Titres de propriété et documents patrimoniaux d'un bien",
      summary:
        "Rangez les pièces patrimoniales de chaque bien : titre de propriété, acte notarié, assurance, diagnostic, plan, permis, avec leur date d'expiration.",
      intro:
        "Les papiers qui prouvent la propriété et la valeur d'un bien méritent un classement à part. Titre de propriété, acte notarié, documents fiscaux, assurance, diagnostic, plan ou permis : tout se retrouve sur l'onglet Patrimoine de la fiche. Vous pouvez relier chaque pièce au propriétaire concerné.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["equipe"],
      menu: "Biens › fiche bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Consulter les documents patrimoniaux",
          goal: "Lister les pièces patrimoniales du bien et ouvrir le détail de chacune.",
        },
        {
          title: "Ajouter un document patrimonial",
          goal: "Enregistrer une pièce patrimoniale sur le bien.",
          input:
            "Un titre, le type de document, le lien vers le fichier, la date d'expiration si besoin et, si vous le souhaitez, le propriétaire concerné.",
          prereq: "Le propriétaire, s'il est indiqué, doit déjà figurer dans les contacts du CRM.",
        },
        {
          title: "Supprimer un document patrimonial",
          goal: "Retirer une pièce patrimoniale du bien.",
        },
      ],
      related: ["biens-et-patrimoine/photos-et-documents-du-bien"],
    },
  ],
};
