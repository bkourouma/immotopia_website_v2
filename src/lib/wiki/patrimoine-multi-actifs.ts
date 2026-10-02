import type { WikiDomain } from "./types";

export const patrimoineMultiActifs: WikiDomain = {
  slug: "patrimoine-multi-actifs",
  title: "Patrimoine multi-actifs",
  metaTitle: "Patrimoine multi-actifs : suivi, valeur nette, SCI, fiscalité",
  summary:
    "Suivez vos biens et actifs détenus en propre : SCI, fiscalité, trésorerie, entretien, assurances. Valeur nette et projections en développement.",
  intro:
    "Ce domaine s'adresse aux particuliers, à la diaspora, aux entreprises, aux institutionnels et aux agences qui suivent leurs biens détenus en propre. Disponibles aujourd'hui : les entités détentrices (SCI, holdings) et la consolidation par entité, la fiscalité Côte d'Ivoire et Mali (estimations indicatives), le plan de trésorerie prévisionnel, l'import en masse et l'export, la régularisation foncière, le carnet d'entretien, les assurances et les sinistres, ainsi que les alertes d'échéance. En développement : le suivi de tous les actifs (parts de sociétés, épargne, véhicules, créances), les dettes, les parts détenues, la valeur nette consolidée et son évolution, les projections sur 1 à 30 ans, les simulations et l'espace particulier. Les packs Patrimoine offrent la gestion locative directe de vos propres biens, sans mandat ni propriétaire tiers.",
  features: [
    {
      slug: "actifs-du-patrimoine",
      title: "Actifs du patrimoine",
      metaTitle: "Suivre tous ses actifs : immobilier, parts, épargne, véhicules",
      summary:
        "Recensez tout ce que vous possédez dans dix classes d'actifs : immobilier, parts de sociétés, stocks, véhicules, comptes, épargne, créances. En développement.",
      intro:
        "Au-delà de l'immobilier, vous pouvez suivre dans un même endroit l'ensemble de votre patrimoine : immobilier, entreprises et parts de sociétés, stocks et marchandises, véhicules et équipements, comptes et mobile money, épargne et placements, créances, agriculture et élevage, biens meubles de valeur, et autres. Chaque actif a sa fiche avec sa valeur courante, ses dettes et, hors immobilier, ses détenteurs. Quand un bien immobilier reçoit sa première donnée patrimoniale, son actif apparaît tout seul. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Mes actifs",
      status: "developpement",
      actions: [
        {
          title: "Lister les actifs",
          goal: "Parcourir tous les actifs du patrimoine, toutes classes confondues.",
          input: "Si besoin, un filtre par classe ou par statut (actif, cédé, archivé) et une recherche par nom.",
          output: "La liste des actifs, du plus récent au plus ancien, avec leur valeur courante et le capital restant dû qui leur est adossé.",
        },
        {
          title: "Créer un actif",
          goal: "Enregistrer un actif de l'une des dix classes, avec si vous le souhaitez une première valeur.",
          input:
            "Le nom, la classe, la devise et son taux de change vers le franc CFA, le coût et la date d'acquisition, les caractéristiques propres à la classe, et une première valorisation facultative.",
          output: "Un actif créé, visible dans la liste et dans la valeur nette.",
        },
        {
          title: "Consulter la fiche d'un actif",
          goal: "Voir un actif avec sa valeur courante, ses informations, ses valeurs, ses dettes et, hors immobilier, ses détenteurs.",
        },
        {
          title: "Modifier un actif",
          goal: "Corriger les informations d'un actif.",
          input: "Le nom, la devise, le taux de change, l'acquisition, l'entité détentrice ou les caractéristiques de sa classe.",
          prereq: "La classe et le bien lié ne changent pas. Un actif archivé ne se modifie plus.",
        },
        {
          title: "Marquer un actif comme cédé",
          goal: "Enregistrer la vente ou la sortie d'un actif : il sort de la valeur nette à la date de cession et son historique est conservé.",
          input: "La date de cession.",
        },
        {
          title: "Archiver un actif",
          goal: "Retirer un actif de la liste par défaut sans le supprimer.",
        },
        {
          title: "Voir apparaître automatiquement l'actif d'un bien immobilier",
          goal: "Faire figurer un bien dans le patrimoine sans geste supplémentaire.",
          output:
            "Dès qu'un bien reçoit sa première valorisation, son premier emprunt ou sa première part détenue, un actif immobilier est créé et lié au bien.",
        },
        {
          title: "Supprimer un bien avec son actif immobilier",
          goal: "Ne laisser aucun actif orphelin ni valeur fantôme quand un bien est supprimé.",
          output: "L'actif lié disparaît avec le bien, ainsi que ses valorisations, ses prêts et ses parts.",
        },
        {
          title: "Être protégé contre la suppression d'une entité qui détient encore des biens ou des actifs",
          goal: "Éviter qu'une entité supprimée détache silencieusement les actifs qu'elle possède.",
          output: "Un refus clair tant que des rattachements existent : détachez-les d'abord.",
        },
      ],
      faq: [
        {
          q: "Cette fonction est-elle disponible ?",
          a: "Elle est en cours de développement. Les fonctions de suivi des biens immobiliers décrites dans les autres pages de ce domaine sont, elles, déjà disponibles.",
        },
      ],
      related: ["patrimoine-multi-actifs/valeur-nette", "patrimoine-multi-actifs/valorisations-d-un-actif"],
    },
    {
      slug: "dettes-du-patrimoine",
      title: "Dettes du patrimoine",
      metaTitle: "Suivre ses dettes adossées aux actifs ou personnelles",
      summary:
        "Enregistrez vos prêts, adossés à un actif ou personnels : capital restant dû, taux, mensualité. Ils se déduisent de la valeur nette. En développement.",
      intro:
        "Un patrimoine se lit net de ses dettes. Vous saisissez ici les prêts qui financent un actif, ou une dette personnelle qui n'est liée à aucun actif. Le capital restant dû est déduit de votre valeur nette. Pour l'actif d'un bien immobilier, la dette est rattachée au bien. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Valeur nette (panneau Dettes) ; Patrimoine › Mes actifs › fiche d'un actif › onglet Dettes",
      status: "developpement",
      actions: [
        {
          title: "Lister les dettes",
          goal: "Consulter les dettes adossées à un actif ou personnelles.",
          input: "Si besoin, un actif précis, ou seulement les dettes personnelles.",
          output: "Pour chaque dette : prêteur, capital emprunté, capital restant dû, taux, mensualité, devise et dates.",
        },
        {
          title: "Enregistrer une dette",
          goal: "Saisir un prêt adossé à un actif ou une dette personnelle.",
          input: "Le prêteur, le capital emprunté, le capital restant dû, le taux (un taux nul est admis), la mensualité, la devise, les dates et le statut.",
          prereq: "L'actif éventuel doit exister. Une dette personnelle est en francs CFA.",
        },
        {
          title: "Modifier une dette",
          goal: "Mettre à jour un prêt : capital restant dû, mensualité, statut.",
        },
        {
          title: "Supprimer une dette",
          goal: "Retirer une dette.",
        },
      ],
      related: ["patrimoine-multi-actifs/valeur-nette", "biens-et-patrimoine/emprunts-immobiliers"],
    },
    {
      slug: "parts-detenues-d-un-actif",
      title: "Parts détenues d'un actif",
      metaTitle: "Répartir la détention d'un actif entre entités détentrices",
      summary:
        "Indiquez quelles entités détiennent un actif non immobilier et pour quelle part : parts de société, épargne, véhicule. En cours de développement.",
      intro:
        "Pour un actif qui n'est pas un bien immobilier, vous pouvez indiquer quelles entités détentrices le possèdent et pour quel pourcentage. C'est le même principe que les quotes-parts d'un bien, appliqué aux autres classes d'actifs. Le total ne peut pas dépasser 100 %. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Mes actifs › fiche d'un actif non immobilier › onglet Détenteurs",
      status: "developpement",
      actions: [
        {
          title: "Lister les parts détenues d'un actif",
          goal: "Voir quelles entités détentrices possèdent l'actif, et pour quelle part.",
          output: "Pour chaque entité : sa part en pourcentage, sa date d'effet et des notes.",
          prereq: "L'actif ne doit pas être immobilier : ses parts se gèrent depuis le bien.",
        },
        {
          title: "Poser ou modifier la part d'une entité",
          goal: "Attribuer, ou ajuster, la part d'une entité sur un actif.",
          input: "L'entité, la part (supérieure à 0 et jusqu'à 100 %), et si besoin une date d'effet.",
          prereq: "Le total des parts de l'actif ne doit pas dépasser 100 %.",
        },
        {
          title: "Retirer la part d'une entité",
          goal: "Supprimer la part d'une entité sur un actif.",
        },
      ],
      related: ["patrimoine-multi-actifs/entites-detentrices", "patrimoine-multi-actifs/actifs-du-patrimoine"],
    },
    {
      slug: "valorisations-d-un-actif",
      title: "Valorisations d'un actif",
      metaTitle: "Historique des valeurs d'un actif et valeur courante",
      summary:
        "Gardez l'historique des valeurs de chaque actif : valeur estimée, méthode, source. La dernière valeur datée devient la valeur courante. En développement.",
      intro:
        "Chaque actif a un historique de valeurs. Vous ajoutez une valorisation avec sa date, son montant, sa méthode (saisie manuelle, estimation de marché, expertise) et sa source. La dernière valeur datée au plus tard à la date choisie devient la valeur courante de l'actif. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Mes actifs › fiche d'un actif › onglet Valeurs",
      status: "developpement",
      actions: [
        {
          title: "Lister les valorisations d'un actif",
          goal: "Consulter l'historique des valeurs d'un actif.",
          output: "La liste, la plus récente d'abord : date, valeur estimée, devise, méthode, source et notes.",
        },
        {
          title: "Ajouter une valorisation",
          goal: "Enregistrer une nouvelle valeur pour un actif.",
          input: "La date, la valeur estimée, la devise (celle de l'actif par défaut), la méthode, la source et des notes.",
          prereq: "La devise de la valeur doit être celle de l'actif.",
        },
        {
          title: "Modifier une valorisation",
          goal: "Corriger une valeur enregistrée.",
        },
        {
          title: "Supprimer une valorisation",
          goal: "Retirer une valeur enregistrée par erreur.",
        },
      ],
      related: ["patrimoine-multi-actifs/fiabilite-des-valeurs", "biens-et-patrimoine/valorisation-des-biens"],
    },
    {
      slug: "fiabilite-des-valeurs",
      title: "Valorisation et fiabilité",
      metaTitle: "Fiabilité d'une valeur : suggestion, ancienneté, statut juridique",
      summary:
        "Faites calculer une valeur selon la classe d'actif et sachez dans quelle mesure elle est fiable : méthode, source, ancienneté, statut juridique. En développement.",
      intro:
        "Une valeur n'a pas le même poids selon qu'elle vient d'une expertise ou d'une simple saisie ancienne. Chaque valorisation reçoit un niveau de fiabilité (élevée, moyenne ou faible) avec ses raisons. Vous pouvez aussi demander une valeur calculée à partir des caractéristiques de l'actif, sans rien enregistrer tant que vous ne confirmez pas. Les valeurs trop anciennes pour leur classe sont signalées. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Mes actifs › fiche d'un actif › onglet Valeurs ; Patrimoine › Valeur nette",
      status: "developpement",
      actions: [
        {
          title: "Suggérer la valeur d'un actif",
          goal: "Obtenir une valeur calculée à partir des caractéristiques de la classe : amortissement d'un véhicule, quote-part d'une entreprise, quantité par coût unitaire d'un stock, épargne capitalisée, créance décotée.",
          output: "Un montant et sa méthode, sans rien enregistrer. S'il manque des informations, la liste des champs à compléter.",
          prereq: "Les caractéristiques de valorisation de la classe doivent être renseignées sur l'actif.",
        },
        {
          title: "Enregistrer la valeur suggérée après confirmation",
          goal: "Transformer la valeur calculée en valorisation de l'historique.",
          output: "Une valeur datée du jour ajoutée à l'historique, après votre confirmation.",
        },
        {
          title: "Consulter la fiabilité d'une valorisation",
          goal: "Savoir si une valeur est de fiabilité élevée, moyenne ou faible, et pourquoi.",
          output: "Un badge de fiabilité sur la liste des actifs, la fiche et l'historique, avec les raisons : méthode, présence d'une source, ancienneté, statut juridique.",
        },
        {
          title: "Repérer une valeur périmée",
          goal: "Voir d'un coup d'œil les actifs dont la dernière valeur est trop ancienne pour leur classe.",
          output: "Une pastille « Valeur périmée », selon un délai propre à chaque classe. Un actif sans valorisation est aussi signalé.",
        },
        {
          title: "Renseigner le statut juridique d'un bien immobilier",
          goal: "Qualifier le titre du bien : titre foncier, ACD, certificat de propriété, lettre d'attribution, attestation villageoise ou coutumière.",
          output: "Un statut qui plafonne la fiabilité de la valeur. Un statut fragile est signalé à l'écran.",
        },
        {
          title: "Renseigner les caractéristiques de valorisation d'une classe",
          goal: "Saisir les paramètres qui permettent de calculer la valeur : durée d'utilité d'un véhicule, résultat et multiple d'une entreprise, décote d'un stock, taux d'une épargne, etc.",
        },
        {
          title: "Consulter la part de la valeur nette peu fiable",
          goal: "Mesurer le risque d'imprécision de votre valeur nette.",
          output: "Le pourcentage des actifs retenus dont la valeur est de fiabilité faible ou inconnue, affiché sous les indicateurs.",
        },
      ],
      faq: [
        {
          q: "La valeur suggérée est-elle enregistrée automatiquement ?",
          a: "Non. Vous la voyez d'abord, puis vous confirmez pour l'ajouter à l'historique.",
        },
      ],
      related: ["patrimoine-multi-actifs/valorisations-d-un-actif", "patrimoine-multi-actifs/valeur-nette"],
    },
    {
      slug: "valeur-nette",
      title: "Valeur nette",
      metaTitle: "Valeur nette de son patrimoine : actifs moins dettes",
      summary:
        "Voyez la valeur nette de votre patrimoine à une date, sa répartition par classe d'actif, son évolution mois par mois, et exportez-la. En développement.",
      intro:
        "La valeur nette, c'est ce que vous possédez moins ce que vous devez, en francs CFA. Vous la consultez à la date de votre choix, avec la répartition par classe d'actif, les éléments écartés du calcul et la raison. Une courbe montre son évolution mois par mois, et vous pouvez exporter la situation patrimoniale en PDF ou en Excel. Cette fonction est en cours de développement. Pour les mois passés, les dettes sont approchées à partir du capital restant dû d'aujourd'hui.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Valeur nette",
      status: "developpement",
      actions: [
        {
          title: "Consulter la valeur nette à une date",
          goal: "Voir le total des actifs, le total des dettes et la valeur nette.",
          input: "Une date (aujourd'hui par défaut).",
          output: "La valeur nette, la répartition par classe d'actif, les actifs retenus et les actifs exclus avec la raison.",
          prereq: "Chaque actif retenu doit avoir au moins une valorisation datée au plus tard à la date demandée.",
        },
        {
          title: "Consulter l'évolution mensuelle de la valeur nette",
          goal: "Suivre la valeur nette mois par mois.",
          input: "Une période (par défaut les 12 derniers mois, 60 points au plus).",
          output: "Une courbe de la valeur nette, avec les actifs et les dettes de chaque mois.",
        },
        {
          title: "Exporter la situation patrimoniale",
          goal: "Télécharger la synthèse de votre patrimoine en PDF ou en Excel.",
          input: "Le format et, si besoin, une date.",
          output: "Un fichier avec la synthèse, les actifs, les dettes, les actifs non comptés et l'historique mensuel.",
        },
      ],
      related: [
        "patrimoine-multi-actifs/dettes-du-patrimoine",
        "patrimoine-multi-actifs/projections-et-simulations",
        "patrimoine-multi-actifs/export-du-patrimoine",
      ],
    },
    {
      slug: "projections-et-simulations",
      title: "Projections et simulations",
      metaTitle: "Projeter son patrimoine sur 30 ans et simuler des opérations",
      summary:
        "Projetez votre valeur nette sur 1 à 30 ans selon trois scénarios, simulez une vente, un achat ou un emprunt sans toucher à vos données. En développement.",
      intro:
        "Cette fonction montre comment votre valeur nette pourrait évoluer année par année, selon un scénario prudent, central ou optimiste, avec des hypothèses de croissance que vous pouvez modifier. Vous pouvez aussi tester l'effet d'une vente, d'un achat, d'un emprunt, d'un remboursement anticipé ou d'une épargne mensuelle, sur une copie : vos données réelles ne sont jamais modifiées. Les résultats reposent sur des hypothèses indicatives et ne sont pas une prévision. Cette fonction est en cours de développement.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Projections",
      status: "developpement",
      actions: [
        {
          title: "Projeter la valeur nette sur 1 à 30 ans",
          goal: "Voir l'évolution de la valeur nette année par année selon un scénario.",
          input: "L'horizon (1 à 30 ans, 10 par défaut), le scénario de base et, si besoin, vos propres hypothèses de croissance par classe d'actif et d'inflation.",
          output: "Une courbe et un tableau annuels, avec les hypothèses retenues. Rien n'est enregistré.",
        },
        {
          title: "Comparer les trois scénarios",
          goal: "Afficher sur une même courbe les trajectoires prudente, centrale et optimiste.",
        },
        {
          title: "Simuler des opérations sur une copie du patrimoine",
          goal: "Tester l'effet d'une vente, d'un achat, d'un emprunt, d'un remboursement anticipé ou d'une épargne mensuelle.",
          input: "Jusqu'à 50 opérations, chacune avec son année.",
          output: "La trajectoire simulée, sans modifier aucune donnée réelle.",
        },
        {
          title: "Consulter l'écart avec la projection de base",
          goal: "Mesurer année par année ce que les opérations simulées changent.",
          output: "Une carte « Écart avec la base ».",
        },
        {
          title: "Consulter les avertissements d'une projection",
          goal: "Savoir quand un résultat repose sur des données fragiles ou incohérentes.",
          output: "Un bandeau « À savoir sur ces résultats » et un rappel permanent que les projections sont indicatives.",
        },
        {
          title: "Enregistrer un scénario",
          goal: "Conserver les hypothèses, les opérations et l'horizon d'une simulation pour la rejouer plus tard.",
          input: "Un nom, l'horizon, le scénario de base, les hypothèses et les opérations.",
          output: "Un scénario enregistré. Seuls les réglages sont conservés, pas les résultats.",
        },
        {
          title: "Lister les scénarios enregistrés",
          goal: "Retrouver les scénarios de l'agence.",
        },
        {
          title: "Consulter un scénario enregistré",
          goal: "Relire les réglages d'un scénario précis.",
        },
        {
          title: "Renommer ou mettre à jour un scénario",
          goal: "Changer le nom d'un scénario ou remplacer ses réglages par les réglages actuels.",
          prereq: "Le nom doit rester unique. Cette action est encore en cours de vérification.",
        },
        {
          title: "Supprimer un scénario",
          goal: "Retirer un scénario devenu inutile.",
        },
        {
          title: "Rejouer un scénario sur le patrimoine actuel",
          goal: "Relancer un scénario avec les actifs, dettes et valeurs d'aujourd'hui.",
          output: "Un résultat à jour.",
        },
      ],
      faq: [
        {
          q: "Une projection est-elle une prévision ?",
          a: "Non. Elle repose sur des hypothèses indicatives que vous pouvez modifier. Elle sert à comparer des options, pas à prédire.",
        },
      ],
      related: ["patrimoine-multi-actifs/valeur-nette", "patrimoine-multi-actifs/tresorerie-previsionnelle"],
    },
    {
      slug: "espace-particulier",
      title: "Espace particulier",
      metaTitle: "Espace particulier : suivre son patrimoine, palier gratuit et plus",
      summary:
        "Créez votre espace personnel pour suivre votre patrimoine : valeur nette, biens, baux. Un palier gratuit limité et un palier plus. En développement.",
      intro:
        "L'espace particulier est pensé pour une personne qui suit son propre patrimoine, sans agence. Vous le créez vous-même en quelques champs. Le menu est réduit à l'essentiel : accueil sur la valeur nette, biens, baux, paramètres et abonnement. Le palier gratuit limite le nombre d'actifs suivis à dix, le palier plus relève ce plafond. Cette fonction est en cours de développement. Un espace particulier suit ses propres biens, jamais ceux d'un tiers.",
      packs: ["particulier-gratuit", "particulier-plus"],
      profiles: ["visiteur", "direction"],
      menu: "Créer mon espace ; Paramètres › Abonnement",
      status: "developpement",
      actions: [
        {
          title: "Créer son espace personnel",
          goal: "Obtenir son espace de patrimoine en quelques champs, sans intervention d'un administrateur.",
          input: "Un nom affiché, le pays (Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Togo, Bénin ou Guinée-Bissau) et un téléphone facultatif.",
          output: "Un espace avec l'abonnement gratuit actif, dont vous êtes l'administrateur.",
          prereq: "Une connexion avec une adresse e-mail vérifiée et aucun espace déjà rattaché.",
        },
        {
          title: "Naviguer dans un espace particulier",
          goal: "Ne voir que ce qui sert un particulier.",
          output: "Un menu réduit (Accueil, Biens, Baux, Plus), avec l'accueil sur la valeur nette.",
        },
        {
          title: "Consulter l'usage de son palier",
          goal: "Savoir combien d'actifs vous suivez sur la limite de votre palier.",
          output: "Un bandeau « X actifs sur N », avec un lien vers l'abonnement sur le palier gratuit.",
        },
        {
          title: "Être limité à dix actifs sur le palier gratuit",
          goal: "Comprendre ce qui se passe au-delà de la limite du palier gratuit.",
          output:
            "L'ajout d'un nouvel actif ou bien est refusé avec un message clair et un lien vers l'abonnement, votre saisie est conservée. Vous pouvez toujours lire, modifier, archiver et projeter. Les actifs archivés ne comptent pas.",
        },
        {
          title: "Passer au palier payant",
          goal: "Relever le plafond d'actifs en payant le palier plus par mobile money ou carte.",
          input: "Le téléphone de l'espace.",
          output: "Un lien de paiement. Le palier ne change qu'une fois le paiement confirmé. Le tarif affiché est provisoire.",
        },
      ],
      related: ["patrimoine-multi-actifs/valeur-nette", "patrimoine-multi-actifs/actifs-du-patrimoine"],
    },
    {
      slug: "entites-detentrices",
      title: "Entités détentrices",
      metaTitle: "Entités détentrices : SCI, holding et personnes physiques",
      summary:
        "Enregistrez les SCI, holdings, sociétés et personnes physiques qui détiennent vos biens, avec leur organigramme, leur pays et leurs identifiants fiscaux.",
      intro:
        "Une entité détentrice est la personne ou la société qui possède un bien : une SCI familiale, une holding, une société ou vous-même. Vous la décrivez une seule fois, avec sa forme juridique, son pays (Côte d'Ivoire ou Mali), son numéro RCCM et son identifiant fiscal. Vous pouvez la rattacher à une entité mère pour reproduire un organigramme. C'est le point de départ pour répartir vos biens, consolider votre patrimoine et estimer l'impôt par détenteur.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Entités détentrices",
      status: "disponible",
      actions: [
        {
          title: "Lister les entités détentrices",
          goal: "Retrouver vos SCI, holdings, sociétés et personnes physiques détentrices.",
          input: "Si besoin, une recherche par nom, un filtre par forme juridique ou par pays, et l'affichage des entités inactives.",
          output:
            "La liste des entités avec leur forme juridique, leur pays, leurs identifiants, leur contact, leur entité mère et le nombre de biens rattachés.",
        },
        {
          title: "Créer une entité détentrice",
          goal: "Enregistrer une nouvelle SCI, holding, société ou personne physique qui détient des biens.",
          input:
            "Le nom, la forme juridique, le pays (Côte d'Ivoire ou Mali), et si vous les avez le numéro RCCM, l'identifiant fiscal (NCC ou NIF), un contact, une entité mère, le statut fiscal du propriétaire et des notes.",
          output: "Une entité créée, prête à recevoir des biens.",
          prereq:
            "Le contact et l'entité mère, s'ils sont indiqués, doivent déjà exister dans votre agence. Deux entités ne peuvent pas porter le même nom.",
        },
        {
          title: "Consulter le détail d'une entité",
          goal: "Voir l'organigramme, le contact et les biens rattachés avec leur quote-part.",
          output: "La fiche de l'entité, avec le statut de propriétaire déduit de sa forme juridique.",
        },
        {
          title: "Modifier une entité détentrice",
          goal: "Mettre à jour l'identité, l'organigramme ou le statut fiscal d'une entité, ou la désactiver.",
          input: "Les mêmes informations qu'à la création, plus l'état actif ou inactif.",
          prereq: "Une entité ne peut pas devenir sa propre entité mère, ni appartenir à l'une de ses filiales.",
        },
        {
          title: "Supprimer une entité détentrice",
          goal: "Retirer une entité qui ne détient plus aucun bien.",
          prereq: "Aucun bien ne doit rester rattaché à l'entité : détachez-les d'abord.",
        },
      ],
      faq: [
        {
          q: "Quels pays sont pris en charge ?",
          a: "La Côte d'Ivoire et le Mali, pour l'enregistrement des entités comme pour l'estimation fiscale.",
        },
        {
          q: "Puis-je supprimer une entité qui détient encore des biens ?",
          a: "Non. Il faut d'abord détacher ses biens, pour ne pas perdre la trace de qui les détient.",
        },
      ],
      related: ["patrimoine-multi-actifs/rattachement-bien-entite", "patrimoine-multi-actifs/consolidation-par-entite"],
    },
    {
      slug: "rattachement-bien-entite",
      title: "Rattachement d'un bien à une entité",
      metaTitle: "Répartir les parts d'un bien entre SCI, holdings et associés",
      summary:
        "Indiquez qui détient chaque bien et pour quelle quote-part : SCI, holding ou personne physique, depuis la fiche de l'entité ou depuis celle du bien.",
      intro:
        "Un bien peut être détenu par une ou plusieurs entités, chacune pour une quote-part. Vous renseignez ces parts soit depuis la fiche de l'entité, soit depuis l'onglet Patrimoine de la fiche du bien. Le total ne peut pas dépasser 100 %, et la part non affectée reste visible. Ces quotes-parts servent ensuite à la consolidation patrimoniale et à l'estimation fiscale par détenteur.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Entités détentrices › fiche de l'entité ; Biens › fiche du bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Rattacher un bien à une entité",
          goal: "Ajouter un bien au portefeuille d'une entité avec sa quote-part.",
          input: "Le bien, la quote-part en pourcentage (jusqu'à quatre décimales), et si besoin une date d'effet et des notes.",
          output: "Le bien apparaît dans le portefeuille de l'entité.",
          prereq: "Le total des quotes-parts du bien ne doit pas dépasser 100 %.",
        },
        {
          title: "Modifier un rattachement",
          goal: "Ajuster la quote-part ou la date d'effet d'un rattachement existant.",
          input: "La nouvelle quote-part, la date d'effet ou les notes.",
          prereq: "Le total des quotes-parts du bien, ce rattachement compris, ne doit pas dépasser 100 %.",
        },
        {
          title: "Détacher un bien d'une entité",
          goal: "Retirer le rattachement d'un bien à une entité.",
        },
        {
          title: "Consulter les détenteurs d'un bien",
          goal: "Voir, depuis la fiche du bien, les entités détentrices et leurs quotes-parts.",
          output: "La liste des rattachements du bien et la part non affectée (100 % moins la somme des parts).",
        },
        {
          title: "Définir les détenteurs d'un bien",
          goal: "Remplacer d'un seul geste toute la répartition d'un bien entre ses entités détentrices.",
          input: "La liste des entités avec leur quote-part (20 au plus), et si besoin une date d'effet et des notes.",
          output: "Une répartition mise à jour d'un bloc.",
          prereq: "Une même entité ne peut figurer qu'une fois dans la liste.",
        },
      ],
      faq: [
        {
          q: "Que se passe-t-il si les parts font moins de 100 % ?",
          a: "La différence est affichée comme part non affectée. Elle reste visible sur la fiche du bien.",
        },
      ],
      related: ["patrimoine-multi-actifs/entites-detentrices", "patrimoine-multi-actifs/consolidation-par-entite"],
    },
    {
      slug: "consolidation-par-entite",
      title: "Consolidation par entité",
      metaTitle: "Consolidation du patrimoine par SCI ou holding",
      summary:
        "Additionnez valeur estimée, dette restante, loyers, charges et rendements de tous les biens d'une SCI ou holding, pondérés par ses quotes-parts, bien par bien.",
      intro:
        "La consolidation répond à une question simple : que vaut et que rapporte tout ce que détient cette SCI ou cette holding ? Pour chaque entité, vous obtenez les totaux de valeur, de dette, de flux de trésorerie et de rendement, pondérés par ses parts dans chaque bien. Le détail bien par bien reste accessible. Un rattachement dont la date d'effet est future n'entre pas encore dans les totaux.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Entités détentrices › fiche de l'entité",
      status: "disponible",
      actions: [
        {
          title: "Consulter la consolidation d'une entité",
          goal: "Voir les chiffres agrégés des biens d'une entité, selon ses quotes-parts.",
          output:
            "La valeur estimée, la dette restante, les loyers, les charges, le flux de trésorerie et les rendements, avec le détail par bien. Les rattachements à venir sont signalés à part.",
          prereq: "Des biens doivent être rattachés à l'entité, avec leurs valorisations, emprunts et baux renseignés pour des totaux complets.",
        },
      ],
      related: [
        "patrimoine-multi-actifs/entites-detentrices",
        "biens-et-patrimoine/vue-consolidee-du-patrimoine",
      ],
    },
    {
      slug: "fiscalite-cote-d-ivoire-mali",
      title: "Fiscalité Côte d'Ivoire et Mali",
      metaTitle: "Estimation de l'impôt foncier en Côte d'Ivoire et au Mali",
      summary:
        "Estimez l'impôt foncier et l'impôt sur les revenus fonciers de vos biens et de vos entités, avec des barèmes par pays et par année. Estimation indicative.",
      intro:
        "Cette fonction estime l'impôt foncier et l'impôt sur les revenus fonciers de chaque bien, réparti entre ses détenteurs selon leur quote-part et leur statut de propriétaire. Les barèmes sont propres à chaque pays et à chaque année, avec leur source et leur état de validation. Les montants sont des estimations indicatives, à valider par un conseil fiscal avant toute déclaration. Vous pouvez aussi fixer le profil fiscal d'un bien : pays, bâti ou non, occupation, valeur locative déclarée, exonération temporaire.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable", "equipe"],
      menu: "Biens › fiche du bien › onglet Patrimoine ; Patrimoine › Entités détentrices › fiche de l'entité ; Patrimoine › Paramètres fiscaux",
      status: "disponible",
      actions: [
        {
          title: "Consulter l'estimation fiscale d'un bien",
          goal: "Estimer l'impôt foncier et l'impôt sur les revenus fonciers d'un bien, détenteur par détenteur.",
          input: "Si besoin, l'année et le pays.",
          output:
            "Une ligne de calcul par détenteur, plus la part non rattachée le cas échéant, avec la base, l'abattement, le taux, les tranches et les exonérations. Estimation indicative, à valider par un conseil fiscal.",
          prereq: "Les barèmes du pays et de l'année doivent être publiés ; sinon l'année la plus proche est utilisée et signalée.",
        },
        {
          title: "Consulter l'estimation fiscale d'une entité",
          goal: "Estimer l'impôt de tous les biens d'une entité, année par année.",
          input: "Si besoin, l'année (par défaut l'année en cours).",
          output:
            "Les totaux par type d'impôt et par bien, avec l'année de barème retenue. Estimation indicative, à valider par un conseil fiscal.",
        },
        {
          title: "Consulter le profil fiscal d'un bien",
          goal: "Voir le pays, l'état bâti ou non, l'occupation et la valeur locative déclarée retenus pour le calcul.",
          output: "Le profil que vous avez saisi, et les valeurs déduites par défaut quand rien n'est renseigné.",
        },
        {
          title: "Définir le profil fiscal d'un bien",
          goal: "Saisir ou corriger les données fiscales d'un bien.",
          input:
            "Le pays (Côte d'Ivoire ou Mali), le statut bâti et l'occupation, la valeur locative déclarée, une éventuelle exonération temporaire avec son motif, des notes. Chaque champ peut être effacé.",
        },
        {
          title: "Consulter les paramètres fiscaux",
          goal: "Afficher les taux, abattements et seuils utilisés par pays et par année, avec leur source et leur état de validation.",
          input: "Le pays et, si besoin, l'année.",
          output: "Les années disponibles et les paramètres de l'année retenue. Cette référence est en lecture seule.",
        },
      ],
      faq: [
        {
          q: "Le montant affiché est-il l'impôt réellement dû ?",
          a: "Non. C'est une estimation indicative, à valider par un conseil fiscal. Elle ne remplace pas une déclaration.",
        },
        {
          q: "Que se passe-t-il si l'année demandée n'a pas de barème ?",
          a: "Le calcul reprend l'année antérieure la plus proche et vous l'indique clairement.",
        },
      ],
      related: ["patrimoine-multi-actifs/entites-detentrices", "patrimoine-multi-actifs/tresorerie-previsionnelle"],
    },
    {
      slug: "importer-mon-patrimoine",
      title: "Importer mon patrimoine",
      metaTitle: "Importer son patrimoine immobilier depuis Excel ou CSV",
      summary:
        "Importez vos biens et leurs valorisations depuis un fichier Excel ou CSV : gabarit fourni, aperçu ligne par ligne, détection des doublons et rapport final.",
      intro:
        "Plutôt que de saisir vos biens un par un, déposez un fichier Excel ou CSV. Un gabarit avec exemple et feuille d'aide vous guide. Le fichier est lu dans votre navigateur, rien n'est enregistré avant que vous ayez contrôlé l'aperçu, ligne par ligne, avec les erreurs en clair. À la fin, un rapport téléchargeable indique ce qui a été importé et ce qui a été refusé. Les baux et les locataires ne s'importent pas ici, et les biens importés sont des biens détenus en propre.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Importer mon patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Choisir ce que l'on importe",
          goal: "Indiquer si le fichier contient des biens détenus en propre ou des valorisations de biens existants.",
          input: "La nature de l'import : biens ou valorisations.",
        },
        {
          title: "Télécharger le gabarit Excel",
          goal: "Obtenir un classeur avec les bons en-têtes en français, une ligne d'exemple et une feuille d'aide.",
          output: "Un fichier .xlsx prêt à remplir. La ligne d'exemple est ignorée à l'import.",
        },
        {
          title: "Déposer un fichier Excel ou CSV",
          goal: "Charger vos données depuis votre ordinateur.",
          input: "Un fichier .xlsx ou .csv de 5 Mo au plus, jusqu'à 1 000 lignes et 60 colonnes.",
          output: "Les lignes lues avec leur numéro dans le fichier, ou la raison du refus du fichier.",
        },
        {
          title: "Faire correspondre les colonnes",
          goal: "Associer chaque colonne du fichier à un champ attendu.",
          output: "Un rapprochement proposé automatiquement et corrigeable. Les champs obligatoires manquants sont signalés.",
          prereq: "Cette étape est sautée quand le rapprochement est parfait.",
        },
        {
          title: "Contrôler l'aperçu avant import",
          goal: "Vérifier chaque ligne, corriger les cellules et décocher les lignes à ne pas importer.",
          output:
            "Pour chaque ligne, les valeurs reconnues (nombres, dates JJ/MM/AAAA, type de bien, commune) et les erreurs en clair avec le numéro de ligne. Rien n'est enregistré avant votre validation.",
        },
        {
          title: "Choisir la règle pour les doublons",
          goal: "Décider quoi faire des lignes qui ressemblent à un bien déjà enregistré ou à une autre ligne du fichier.",
          input: "Ignorer (par défaut) ou refuser les doublons.",
          output: "Les lignes ignorées ou refusées, avec le motif.",
        },
        {
          title: "Voir l'effet de votre abonnement avant d'importer des biens",
          goal: "Savoir combien de lignes passent la limite de votre abonnement avant de valider.",
          output: "Le nombre de lignes qui passent, celles hors limite et l'éventuel dépassement facturé. C'est une estimation indicative.",
        },
        {
          title: "Importer des biens détenus en propre",
          goal: "Créer un bien par ligne validée.",
          input: "Les lignes validées de l'aperçu : type, titre, adresse, commune, surface, pièces, mode de transaction, référence du fichier.",
          output: "Un bien créé par ligne, avec sa référence ImmoTopia. Une ligne refusée ne bloque pas les suivantes.",
          prereq: "Ces biens sont détenus en propre : aucun propriétaire tiers ni mandat n'est créé.",
        },
        {
          title: "Importer la valeur d'acquisition d'un bien",
          goal: "Créer en même temps une première valorisation à partir du prix d'acquisition du fichier.",
          input: "Le prix d'acquisition et la date d'acquisition, facultatifs.",
          output: "Une valorisation d'acquisition rattachée au bien. Si elle échoue après la création du bien, la ligne est signalée comme partielle.",
          prereq: "La ligne du bien doit avoir été importée.",
        },
        {
          title: "Importer des valorisations de biens existants",
          goal: "Ajouter une estimation de valeur à des biens déjà enregistrés.",
          input:
            "La référence ou le titre exact du bien, la date, la valeur estimée, le coût et la date d'acquisition, la méthode (manuelle, estimation de marché, expertise) et la source.",
          output: "Une valorisation par ligne. Les biens introuvables ou ambigus, les dates futures et les valeurs nulles ou négatives sont refusés.",
        },
        {
          title: "Suivre l'import, l'arrêter et relancer les refus",
          goal: "Voir l'avancement ligne par ligne, interrompre l'import, puis relancer seulement ce qui peut l'être.",
          output:
            "Une progression en direct. Une ligne déjà créée n'est jamais rejouée ; une ligne à moitié traitée est signalée comme partielle avec la référence du bien.",
        },
        {
          title: "Télécharger le rapport d'import",
          goal: "Garder la trace de ce qui s'est passé pour chaque ligne.",
          output:
            "Un fichier CSV avec, pour chaque ligne, son résultat (importée, partielle, ignorée, en erreur, refusée, hors limite ou non traitée), le motif et la référence attribuée.",
        },
      ],
      faq: [
        {
          q: "Mon fichier est-il envoyé à ImmoTopia avant que je valide ?",
          a: "Non. Il est lu dans votre navigateur. Seules les lignes que vous validez sont enregistrées.",
        },
        {
          q: "Puis-je importer mes baux et mes locataires ?",
          a: "Non, cet import concerne les biens détenus en propre et leurs valorisations.",
        },
      ],
      related: ["biens-et-patrimoine/valorisation-des-biens", "biens-et-patrimoine/fiche-bien"],
    },
    {
      slug: "regularisation-fonciere",
      title: "Régularisation foncière",
      metaTitle: "Suivi de la régularisation foncière d'un terrain",
      summary:
        "Suivez la régularisation foncière d'un bien étape par étape : échéances, frais engagés, pièces justificatives et relance par e-mail des étapes en retard.",
      intro:
        "Régulariser un terrain demande de nombreuses étapes : attestation, bornage, demande d'ACD, titre foncier. Vous ouvrez un dossier par bien, selon une filière type ou une filière personnalisée, et vous suivez chaque étape avec son échéance, son coût et sa pièce justificative. Un tableau de bord indique l'avancement et le total des frais. La filière ACD proposée est une trame de travail dont l'ordre et le caractère obligatoire des étapes restent à faire valider par un juriste local avant d'y voir une référence.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine et entretien › Régularisation foncière ; Biens › fiche d'un terrain",
      status: "disponible",
      actions: [
        {
          title: "Consulter les filières de régularisation",
          goal: "Voir les filières proposées avec leurs étapes et leur état de validation juridique.",
          output: "Le catalogue des filières. Celle de l'ACD est affichée comme « à valider ».",
        },
        {
          title: "Lister les dossiers de régularisation",
          goal: "Suivre tous les dossiers de l'agence avec leur avancement, leurs frais et leurs échéances.",
          input: "Si besoin, un filtre par bien ou par statut (en cours, terminée, abandonnée).",
          output: "Pour chaque dossier : le bien, la filière, le statut, la progression, les frais engagés et la prochaine échéance.",
        },
        {
          title: "Ouvrir un dossier de régularisation",
          goal: "Démarrer le suivi de la régularisation d'un bien.",
          input:
            "Le bien, la filière (ACD, en six étapes, ou personnalisée avec vos propres étapes, de 1 à 30), la date de début et des notes.",
          output: "Un dossier avec sa frise d'étapes.",
          prereq: "Un bien ne peut avoir qu'un seul dossier en cours à la fois.",
        },
        {
          title: "Consulter le détail d'un dossier",
          goal: "Voir la frise des étapes avec leurs statuts, dates, échéances, coûts et pièces.",
          output: "La frise, le bandeau de validation juridique, les retards éventuels et le total des frais.",
        },
        {
          title: "Modifier les notes ou la date de début",
          goal: "Corriger les informations générales d'un dossier en cours.",
          prereq: "Le dossier doit être en cours.",
        },
        {
          title: "Terminer, abandonner ou rouvrir un dossier",
          goal: "Clore le dossier, l'abandonner, ou le rouvrir en gardant la trace du motif.",
          input: "Le nouveau statut, et un motif pour une réouverture.",
          prereq: "Pour terminer, toutes les étapes obligatoires doivent être terminées.",
        },
        {
          title: "Ajouter une étape personnalisée",
          goal: "Compléter une filière personnalisée par une étape de votre choix.",
          input: "Le libellé, le caractère obligatoire et l'échéance.",
          prereq: "Filière personnalisée, dossier en cours, 30 étapes au plus.",
        },
        {
          title: "Modifier une étape",
          goal: "Renseigner l'échéance, les frais engagés en FCFA, les notes et la pièce justificative d'une étape.",
          output: "L'étape mise à jour et le nouveau total des frais.",
          prereq: "La pièce doit déjà figurer dans les documents du même bien.",
        },
        {
          title: "Changer le statut d'une étape",
          goal: "Faire avancer une étape : à faire, en cours, bloquée ou terminée, ou la rouvrir avec un motif.",
          prereq: "Les étapes obligatoires qui précèdent doivent être terminées.",
        },
        {
          title: "Supprimer une étape personnalisée",
          goal: "Retirer une étape encore à faire, sans coût ni pièce.",
          prereq: "Ce ne peut pas être la dernière étape du dossier.",
        },
        {
          title: "Joindre ou téléverser la pièce d'une étape",
          goal: "Archiver l'attestation, le plan de bornage, l'ACD ou le titre foncier de l'étape.",
          input: "Un document déjà enregistré pour le bien, ou un nouveau fichier avec le type de pièce proposé.",
          output: "Une pièce rattachée à l'étape et téléchargeable depuis le dossier.",
        },
        {
          title: "Être relancé par e-mail des étapes en retard",
          goal: "Prévenir les administrateurs de l'agence quand une étape à faire ou en cours a dépassé son échéance.",
          output: "Un e-mail quotidien, envoyé une seule fois par étape et par échéance.",
          prereq: "Le dossier doit être en cours et l'étape porter une échéance dépassée.",
        },
        {
          title: "Ouvrir la régularisation depuis la fiche d'un terrain",
          goal: "Accéder directement aux dossiers de régularisation du bien.",
          prereq: "Le bien doit être de type terrain.",
        },
      ],
      faq: [
        {
          q: "La filière ACD est-elle une référence juridique ?",
          a: "Non, c'est une trame de travail. L'ordre des étapes, leur caractère obligatoire, les pièces et les délais sont à faire valider par un professionnel local.",
        },
      ],
      related: ["biens-et-patrimoine/documents-patrimoniaux", "biens-et-patrimoine/fiche-bien"],
    },
    {
      slug: "tresorerie-previsionnelle",
      title: "Trésorerie prévisionnelle",
      metaTitle: "Plan de trésorerie prévisionnel sur 12 ou 24 mois",
      summary:
        "Anticipez mois par mois les entrées et sorties d'argent de vos biens : loyers, mensualités d'emprunt, travaux, charges et taxe foncière estimée.",
      intro:
        "Le plan de trésorerie additionne, sur 12 ou 24 mois, ce que vos biens doivent rapporter et coûter : loyers attendus, mensualités d'emprunt, programmes de travaux, dépenses périodiques et taxe foncière estimée. Vous voyez le solde cumulé mois par mois et une alerte indique le premier mois où il passerait sous zéro. Chaque ligne indique sa provenance, et les sources absentes sont expliquées. La taxe foncière n'entre dans le plan qu'une fois sa date d'exigibilité renseignée, et reste une estimation indicative.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "comptable", "equipe"],
      menu: "Patrimoine › Trésorerie prévisionnelle",
      status: "disponible",
      actions: [
        {
          title: "Consulter le plan de trésorerie sur 12 ou 24 mois",
          goal: "Voir mois par mois les entrées, les sorties, le net et le cumul prévisionnels de vos biens.",
          input: "L'horizon (12 ou 24 mois), et si besoin un solde de départ et un bien précis.",
          output:
            "Un tableau mensuel détaillé par catégorie, des totaux, l'alerte de creux éventuelle et l'état de chaque source. Les biens en vente, vendus, archivés ou en brouillon sont exclus.",
          prereq: "Des baux actifs, emprunts, travaux ou dépenses périodiques doivent exister pour alimenter le plan.",
        },
        {
          title: "Saisir le solde de départ",
          goal: "Partir de votre trésorerie réelle d'aujourd'hui.",
          input: "Le solde du jour.",
          output: "Un cumul qui part de ce solde. Sans solde saisi, le plan part de zéro et l'écran le précise.",
        },
        {
          title: "Filtrer le plan par bien",
          goal: "Restreindre le plan à un seul bien.",
          input: "Le bien, retrouvé par son titre, son adresse ou sa référence.",
          output: "Le plan du bien choisi. Si le bien est exclu (en vente, vendu…), un plan vide explique pourquoi.",
        },
        {
          title: "Être alerté d'un creux de trésorerie",
          goal: "Repérer le premier mois où le cumul devient négatif et la profondeur du creux.",
          output: "Un bandeau en tête de page, ou la mention qu'aucun creux n'est prévu.",
        },
        {
          title: "Retrouver la source de chaque ligne",
          goal: "Savoir d'où vient chaque montant et pourquoi une source n'est pas incluse.",
          output:
            "Chaque ligne indique sa provenance : échéance de loyer, planning de bail, emprunt, travaux, dépense périodique ou taxe estimée. Une taxe estimée porte la mention « estimation indicative ».",
        },
        {
          title: "Renseigner la date d'exigibilité de la taxe foncière",
          goal: "Faire entrer la taxe foncière estimée dans le plan.",
          input: "Le mois et le jour d'exigibilité, ou rien pour l'effacer.",
          output: "Le plan suivant intègre une estimation de la taxe, indicative et à valider par un conseil fiscal.",
          prereq: "Tant que cette date n'est pas renseignée, la taxe n'apparaît pas et l'écran l'indique.",
        },
      ],
      faq: [
        {
          q: "D'où viennent les chiffres du plan ?",
          a: "De vos baux, échéanciers de loyers, emprunts, programmes de travaux et dépenses périodiques déjà saisis. Rien n'est inventé : une source absente est signalée.",
        },
      ],
      related: [
        "biens-et-patrimoine/emprunts-immobiliers",
        "biens-et-patrimoine/charges-et-depenses",
        "biens-et-patrimoine/programmes-de-travaux",
      ],
    },
    {
      slug: "export-du-patrimoine",
      title: "Export du patrimoine",
      metaTitle: "Exporter son patrimoine immobilier en PDF ou Excel",
      summary:
        "Téléchargez une synthèse PDF ou un classeur Excel détaillé de tout votre patrimoine immobilier, ou d'un seul bien : valeurs, emprunts, travaux, rendement.",
      intro:
        "L'export vous remet en un fichier l'état de votre patrimoine immobilier, prêt à partager avec un banquier, un notaire ou un associé. Choisissez une synthèse PDF ou un classeur Excel détaillé, pour l'ensemble du patrimoine ou pour un bien seul. Le fichier est produit à la demande et ne reste pas stocké sur nos serveurs.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Vue consolidée ; Biens › fiche du bien › onglet Patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Exporter tout le patrimoine",
          goal: "Obtenir en un fichier la synthèse du patrimoine de l'agence.",
          input: "Le format : PDF ou Excel.",
          output:
            "Un fichier couvrant les biens (hors brouillons, vendus et archivés) avec valorisations, emprunts, dépenses, travaux, documents et rendement par bien.",
          prereq: "Au-delà de 500 biens, exportez bien par bien.",
        },
        {
          title: "Exporter un bien",
          goal: "Obtenir la synthèse ou le classeur détaillé d'un seul bien.",
          input: "Le format : PDF ou Excel.",
          output: "Un fichier nommé d'après la référence du bien.",
        },
      ],
      related: ["biens-et-patrimoine/vue-consolidee-du-patrimoine"],
    },
    {
      slug: "alertes-assurance-et-entretien",
      title: "Alertes d'assurance et d'entretien",
      metaTitle: "Alertes d'échéance d'assurance, d'entretien et de garantie",
      summary:
        "Recevez par e-mail un rappel 30 jours avant la fin d'une police d'assurance, une échéance d'entretien ou la fin d'une garantie de travaux sur vos biens.",
      intro:
        "Une assurance qui expire sans qu'on s'en aperçoive, un entretien oublié, une garantie qui se termine : ces alertes préviennent les administrateurs de l'agence 30 jours avant. Elles se déclenchent d'elles-mêmes à partir des polices et du carnet d'entretien que vous avez saisis, sans rien configurer. L'agence peut désactiver ce type de message.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction"],
      status: "disponible",
      actions: [
        {
          title: "Être alerté de la fin d'une police d'assurance",
          goal: "Être prévenu par e-mail 30 jours avant l'échéance d'une police.",
          output: "Un e-mail aux administrateurs, une seule fois par police et par échéance.",
          prereq: "Une police d'assurance avec sa date de fin doit être enregistrée.",
        },
        {
          title: "Être alerté d'une échéance d'entretien ou d'une fin de garantie",
          goal: "Être prévenu 30 jours avant la prochaine échéance ou la fin de garantie d'une intervention du carnet.",
          output: "Un e-mail aux administrateurs, une seule fois par entrée, par nature d'échéance et par date.",
          prereq: "Une intervention avec une prochaine échéance ou une fin de garantie doit figurer au carnet d'entretien.",
        },
      ],
      related: ["patrimoine-multi-actifs/polices-d-assurance", "patrimoine-multi-actifs/carnet-d-entretien"],
    },
    {
      slug: "alertes-d-echeance-patrimoine",
      title: "Alertes d'échéance du patrimoine",
      metaTitle: "Alertes de fin de bail, de prêt et de travaux planifiés",
      summary:
        "Recevez par e-mail un rappel 30 jours avant la fin d'un bail, l'échéance d'un emprunt ou la date prévue d'un programme de travaux planifié.",
      intro:
        "Ces alertes automatiques vous laissent le temps d'agir : renouveler un bail ou chercher un locataire, préparer le dernier remboursement d'un prêt, lancer des travaux. Elles partent 30 jours avant l'échéance, à partir des baux, emprunts et programmes de travaux déjà saisis. Les messages peuvent être personnalisés par l'agence.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["direction"],
      status: "disponible",
      actions: [
        {
          title: "Alerter les propriétaires de la fin d'un bail",
          goal: "Prévenir par e-mail le propriétaire du bien qu'un bail actif se termine dans les 30 jours.",
          output: "Un e-mail « Fin de bail prochaine », envoyé une seule fois.",
          prereq: "Un bail actif avec une date de fin, et un propriétaire relié à un contact.",
        },
        {
          title: "Alerter l'agence de l'échéance d'un emprunt",
          goal: "Prévenir les administrateurs qu'un emprunt actif arrive à échéance dans les 30 jours.",
          output: "Un e-mail « Alerte fin de prêt », envoyé une seule fois.",
          prereq: "Un emprunt actif avec une date de fin, et la notification activée.",
        },
        {
          title: "Alerter l'agence d'un programme de travaux qui approche",
          goal: "Prévenir les administrateurs qu'un programme de travaux planifié a une date prévue dans les 30 jours.",
          output: "Un e-mail « Rappel programme de travaux », envoyé une seule fois.",
          prereq: "Un programme de travaux planifié avec une date prévue, et la notification activée.",
        },
      ],
      related: ["biens-et-patrimoine/emprunts-immobiliers", "biens-et-patrimoine/programmes-de-travaux"],
    },
    {
      slug: "carnet-d-entretien",
      title: "Carnet d'entretien d'un bien",
      metaTitle: "Carnet d'entretien d'un bien immobilier : suivi et export",
      summary:
        "Tenez l'historique des interventions de chaque bien : plomberie, électricité, toiture, climatisation, coûts, prestataires, garanties et prochaines échéances.",
      intro:
        "Le carnet d'entretien garde la mémoire d'un bien : qui est intervenu, quand, pour quel coût, et ce qu'il reste à prévoir. Chaque intervention porte une catégorie, un prestataire, un montant, une prochaine échéance et une éventuelle fin de garantie. Le carnet s'exporte en CSV, utile à la revente ou pour informer un acheteur. Les échéances alimentent les alertes par e-mail.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Biens › fiche du bien › onglet Carnet d'entretien",
      status: "disponible",
      actions: [
        {
          title: "Consulter le carnet d'entretien",
          goal: "Voir la chronologie des interventions d'un bien, la plus récente en premier.",
          input: "Le bien et, si besoin, une catégorie.",
          output: "Pour chaque entrée : catégorie, date, prestataire, coût, description, prochaine échéance, fin de garantie et pièce.",
        },
        {
          title: "Ajouter une intervention au carnet",
          goal: "Enregistrer un entretien ou une réparation.",
          input:
            "La catégorie (plomberie, électricité, climatisation, groupe électrogène, étanchéité de toiture, peinture ou autre), la date, la description, le prestataire, le coût et sa devise, la prochaine échéance.",
          prereq: "Le prestataire, s'il est indiqué, doit être enregistré dans votre agence.",
        },
        {
          title: "Modifier une intervention",
          goal: "Corriger une entrée du carnet.",
        },
        {
          title: "Supprimer une intervention",
          goal: "Retirer une entrée du carnet.",
        },
        {
          title: "Exporter le carnet en CSV",
          goal: "Télécharger le carnet d'un bien, par exemple pour une revente.",
          output: "Un fichier CSV lisible dans Excel.",
        },
      ],
      related: ["patrimoine-multi-actifs/alertes-assurance-et-entretien", "biens-et-patrimoine/fiche-bien"],
    },
    {
      slug: "polices-d-assurance",
      title: "Polices d'assurance d'un bien",
      metaTitle: "Suivi des polices d'assurance d'un bien immobilier",
      summary:
        "Enregistrez les assurances de chaque bien : assureur, couverture, dates, prime annuelle. Le statut se met à jour et vous êtes alerté avant l'échéance.",
      intro:
        "Pour chaque bien, vous enregistrez ses polices : multirisque habitation, multirisque immeuble, responsabilité du propriétaire ou autre. Le statut de chaque police est calculé automatiquement (à venir, active, expire bientôt, expirée), avec le nombre de jours avant l'échéance et le nombre de sinistres rattachés. Vous pouvez y associer le contrat scanné. Un rappel par e-mail part 30 jours avant la fin.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Biens › fiche du bien › onglet Assurances et sinistres",
      status: "disponible",
      actions: [
        {
          title: "Consulter les polices d'assurance",
          goal: "Lister les polices d'un bien ou de toute l'agence.",
          input: "Si besoin, un bien ou un statut.",
          output: "Pour chaque police : assureur, numéro, couverture, dates, prime annuelle, statut, jours avant échéance et nombre de sinistres.",
        },
        {
          title: "Ajouter une police d'assurance",
          goal: "Enregistrer une assurance sur un bien.",
          input:
            "Le bien, l'assureur, le numéro de police, le type de couverture, les dates de début et de fin, la prime annuelle et sa devise, des notes et le contrat joint.",
          prereq: "La date de fin ne peut pas précéder la date de début.",
        },
        {
          title: "Consulter le détail d'une police",
          goal: "Voir une police et le nombre de sinistres qui lui sont rattachés.",
        },
        {
          title: "Modifier une police d'assurance",
          goal: "Corriger les dates, la prime, les notes ou le contrat joint.",
          prereq: "La devise ne peut pas changer si des sinistres sont rattachés à la police.",
        },
        {
          title: "Supprimer une police d'assurance",
          goal: "Retirer une police.",
          prereq: "Aucun sinistre ne doit lui être rattaché.",
        },
      ],
      related: ["patrimoine-multi-actifs/sinistres-d-un-bien", "patrimoine-multi-actifs/alertes-assurance-et-entretien"],
    },
    {
      slug: "sinistres-d-un-bien",
      title: "Sinistres d'un bien",
      metaTitle: "Suivi des sinistres d'un bien immobilier et indemnisation",
      summary:
        "Déclarez et suivez les sinistres : dégât des eaux, incendie, vol. Statuts, montants réclamés et indemnisés, reste à charge et pièces justificatives.",
      intro:
        "Quand un sinistre survient, vous le déclarez au titre d'une police du bien, puis vous suivez son avancement jusqu'à la clôture : assureur prévenu, expertise, indemnisation ou rejet. Le montant réclamé, la franchise, le montant indemnisé et le reste à charge sont calculés au même endroit. Photos, devis, rapport d'expertise et courriers de l'assureur se joignent au dossier, et l'historique horodaté des statuts est conservé.",
      packs: ["agence", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "gestionnaire", "equipe"],
      menu: "Patrimoine › Sinistres ; Biens › fiche du bien › onglet Assurances et sinistres",
      status: "disponible",
      actions: [
        {
          title: "Consulter la liste des sinistres",
          goal: "Suivre les sinistres d'un bien ou de toute l'agence.",
          input: "Si besoin, un filtre par bien, par police ou par statut.",
          output: "Pour chaque sinistre : bien, police, cause, dates, statut, montants réclamé et indemnisé, reste à charge et nombre de pièces.",
        },
        {
          title: "Déclarer un sinistre",
          goal: "Ouvrir un dossier de sinistre au titre d'une police.",
          input:
            "Le bien, la police, la date du sinistre, la cause (dégât des eaux, incendie, vol, structure, tempête ou autre), la description, le montant réclamé, la franchise, et si besoin le ticket de maintenance ou la dépense liés.",
          output: "Un sinistre au statut « déclaré », avec la première ligne de son historique.",
          prereq: "La police doit être celle du même bien. La date ne peut pas être dans le futur.",
        },
        {
          title: "Consulter le détail d'un sinistre",
          goal: "Voir le sinistre avec ses pièces et l'historique horodaté de ses statuts.",
        },
        {
          title: "Modifier un sinistre",
          goal: "Corriger la description, la cause, la date, le montant réclamé, la franchise ou les liens.",
          prereq: "Le sinistre ne doit pas être clos. Le montant réclamé ne peut pas descendre sous le montant déjà indemnisé.",
        },
        {
          title: "Changer le statut d'un sinistre",
          goal: "Faire avancer le dossier : assureur prévenu, expertise, indemnisé ou rejeté, puis clos.",
          input: "Le nouveau statut, une note, le montant indemnisé pour une indemnisation, le motif pour un rejet.",
          output: "Un sinistre à jour, un historique complété et le reste à charge recalculé.",
          prereq: "Le montant indemnisé ne peut pas dépasser le montant réclamé.",
        },
        {
          title: "Rattacher une pièce à un sinistre",
          goal: "Joindre une photo avant ou après, un devis, un rapport d'expertise, un courrier de l'assureur ou une facture.",
          input: "Un document déjà enregistré pour le même bien, et sa nature.",
          prereq: "Le sinistre ne doit pas être clos.",
        },
        {
          title: "Retirer une pièce d'un sinistre",
          goal: "Détacher une pièce du dossier sans supprimer le document du bien.",
          prereq: "Le sinistre ne doit pas être clos.",
        },
        {
          title: "Supprimer un sinistre",
          goal: "Supprimer un sinistre déclaré par erreur.",
          prereq: "Le sinistre doit encore être au statut « déclaré ».",
        },
      ],
      faq: [
        {
          q: "Comment est calculé le reste à charge ?",
          a: "Par la différence entre le montant réclamé et le montant indemnisé, sans jamais descendre sous zéro.",
        },
      ],
      related: ["patrimoine-multi-actifs/polices-d-assurance", "biens-et-patrimoine/documents-patrimoniaux"],
    },
  ],
};
