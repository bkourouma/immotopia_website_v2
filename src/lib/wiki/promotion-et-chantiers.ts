import type { WikiDomain } from "./types";

export const promotionEtChantiers: WikiDomain = {
  slug: "promotion-et-chantiers",
  title: "Promotion et chantiers",
  metaTitle: "Logiciel promoteur et suivi de chantier en Côte d'Ivoire",
  summary:
    "Chantiers, lots, budget, avancement, stock de matériaux, salaires, tâcherons et retenues de garantie : le module Promoteur d'ImmoTopia pour la Côte d'Ivoire.",
  intro:
    "Ce domaine regroupe le module Promoteur d'ImmoTopia. Il s'adresse aux promoteurs et aux groupes immobiliers ivoiriens qui construisent : suivi des chantiers et de leurs lots, budget et avenants, avancement, dépenses et pièces de caisse, baux de terrain. Il couvre aussi le stock de matériaux, la main-d'œuvre salariée, les tâcherons et leurs situations de travaux, ainsi que les retenues de garantie. En fin de chantier, chaque lot rejoint le patrimoine avec son coût de revient définitif.",
  features: [
    {
      slug: "suivi-des-chantiers",
      title: "Chantiers",
      metaTitle: "Logiciel de suivi de chantier immobilier en Côte d'Ivoire",
      summary:
        "Ouvrez vos chantiers, suivez leur statut, leur coût réel et leur avancement, puis clôturez-les proprement en figeant le coût final. Module Promoteur.",
      intro:
        "Le registre des chantiers est le point de départ du module Promoteur. Vous y ouvrez chaque chantier, vous suivez son statut, son coût réel et son avancement, et vous le clôturez une fois les travaux terminés. Avant la clôture, le logiciel vous montre ce qui reste à régler, pour éviter les mauvaises surprises.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Chantiers",
      status: "disponible",
      actions: [
        {
          title: "Consulter la liste des chantiers",
          goal: "Voir tous vos chantiers en un coup d'œil, et les filtrer par statut.",
          output: "Pour chaque chantier : sa zone, son statut, son coût réel et son avancement.",
        },
        {
          title: "Créer un chantier",
          goal: "Ouvrir un nouveau chantier dans le logiciel.",
          input:
            "Le nom du chantier, sa zone et sa date de démarrage ; au besoin le bien concerné, le responsable et la date de fin prévue.",
          output: "Le chantier est créé au statut « planifié ».",
          profiles: ["direction"],
        },
        {
          title: "Consulter la fiche d'un chantier",
          goal: "Retrouver l'essentiel d'un chantier sur une seule page.",
          output: "Le nom, la zone, le statut, le coût réel, et si le chantier est géré par le stock.",
        },
        {
          title: "Vérifier ce qui bloque la clôture",
          goal: "Voir, avant de tenter la clôture, ce qui empêche encore de clôturer le chantier.",
          output: "La liste des points bloquants, vide si le chantier peut être clôturé.",
        },
        {
          title: "Clôturer un chantier",
          goal: "Figer le coût final du chantier : plus aucune dépense ne peut lui être imputée.",
          output: "Le chantier passe au statut « clôturé » avec son coût final.",
          prereq: "Aucun point bloquant ne doit rester ouvert.",
          profiles: ["direction"],
        },
        {
          title: "Rouvrir un chantier clôturé",
          goal: "Annuler une clôture pour apporter une correction.",
          prereq: "Aucun lot du chantier ne doit déjà avoir été transféré au patrimoine.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Peut-on encore imputer une dépense à un chantier clôturé ?",
          a: "Non. La clôture fige le coût final. Pour corriger, vous rouvrez le chantier, tant qu'aucun de ses lots n'a été transféré au patrimoine.",
        },
      ],
      related: [
        "promotion-et-chantiers/lots-et-cout-de-revient",
        "promotion-et-chantiers/budget-de-chantier",
        "promotion-et-chantiers/avancement-et-tableau-de-bord",
      ],
    },
    {
      slug: "lots-et-cout-de-revient",
      title: "Lots et coût de revient",
      metaTitle: "Coût de revient par lot d'un programme immobilier",
      summary:
        "Découpez chaque chantier en lots, répartissez le coût réel à la surface ou par quote-part, puis transférez chaque lot au patrimoine à son coût de revient.",
      intro:
        "Un programme se vend ou se loue lot par lot : villa, appartement, local. Cette page vous permet de découper un chantier en lots et de choisir comment son coût réel se répartit entre eux. Vous connaissez ainsi le coût de revient de chaque lot, puis vous le faites entrer dans votre patrimoine une fois le chantier clôturé, sans rien ressaisir.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Chantiers",
      status: "disponible",
      actions: [
        {
          title: "Ajouter un lot à un chantier",
          goal: "Découper le chantier en lots, pour calculer le coût de revient de chacun et le transférer ensuite au patrimoine.",
          input: "Le nom du lot et, au besoin, sa surface ou sa quote-part.",
          prereq: "Le chantier ne doit pas être clôturé. Deux lots d'un même chantier ne peuvent pas porter le même nom.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les lots d'un chantier",
          goal: "Voir comment le chantier est découpé en lots.",
        },
        {
          title: "Corriger un lot",
          goal: "Modifier le nom, la surface ou la quote-part d'un lot.",
          prereq: "Le lot ne doit pas encore avoir été transféré au patrimoine.",
          profiles: ["direction"],
        },
        {
          title: "Supprimer un lot",
          goal: "Retirer un lot du chantier.",
          prereq: "Le lot ne doit pas encore avoir été transféré au patrimoine.",
          profiles: ["direction"],
        },
        {
          title: "Choisir la clé de répartition du coût",
          goal: "Décider comment le coût du chantier se répartit entre les lots, par exemple à la surface ou selon une quote-part saisie.",
          output: "Les montants de chaque lot sont recalculés selon la nouvelle clé.",
          profiles: ["direction"],
        },
        {
          title: "Consulter le coût de revient par lot",
          goal: "Voir la part du coût réel du chantier qui revient à chaque lot.",
        },
        {
          title: "Transférer un lot au patrimoine",
          goal: "Faire d'un lot terminé un bien de votre patrimoine, avec son coût de revient définitif.",
          input:
            "La référence interne du bien, son type, son mode de détention, un titre, une description, l'adresse et la date d'acquisition.",
          output: "Le bien est créé dans le patrimoine et le lot est marqué comme transféré.",
          prereq: "Le chantier doit être clôturé. La référence interne ne doit pas déjà être utilisée.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Comment un lot construit devient-il un bien à gérer ?",
          a: "Une fois le chantier clôturé, vous transférez le lot au patrimoine : le bien est créé avec son coût de revient définitif, sans ressaisie.",
        },
      ],
      related: [
        "promotion-et-chantiers/suivi-des-chantiers",
        "promotion-et-chantiers/depenses-de-chantier",
      ],
    },
    {
      slug: "budget-de-chantier",
      title: "Budget de chantier",
      metaTitle: "Budget prévisionnel de chantier et suivi des avenants",
      summary:
        "Établissez le budget prévisionnel de chaque chantier par poste de dépense, validez-le comme référence, puis révisez-le par avenants tracés et validés.",
      intro:
        "Le budget de chantier fixe ce que vous prévoyez de dépenser, poste par poste. Une fois validé, il devient la référence de pilotage : c'est lui que le tableau de bord compare aux dépenses engagées. Quand le projet évolue, vous le révisez par avenant, et l'historique des révisions reste consultable.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Chantiers",
      status: "disponible",
      actions: [
        {
          title: "Créer un budget de chantier",
          goal: "Saisir le budget prévisionnel du chantier, en brouillon, poste de dépense par poste de dépense.",
          input:
            "Un libellé et une ligne par poste : le montant prévu et, au besoin, la quantité et le prix unitaire. Chaque poste n'apparaît qu'une fois.",
          output: "Le budget est enregistré en brouillon.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les budgets d'un chantier",
          goal: "Voir tous les budgets du chantier, brouillons compris.",
        },
        {
          title: "Consulter le budget validé",
          goal: "Afficher le budget qui sert de référence pour le pilotage du chantier.",
          output: "Le budget validé ; un chantier n'en a qu'un à la fois.",
        },
        {
          title: "Valider un budget de chantier",
          goal: "Figer le budget prévisionnel comme référence de pilotage.",
          prereq: "Le chantier ne doit pas déjà avoir un budget validé : un budget validé se révise par avenant, il ne se remplace pas.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les avenants d'un budget",
          goal: "Retrouver l'historique des révisions du budget.",
        },
        {
          title: "Créer un avenant de budget",
          goal: "Réviser un budget déjà validé.",
          input: "La date, le motif et, pour chaque poste concerné, l'écart en plus ou en moins.",
          output: "L'avenant est enregistré en brouillon.",
          prereq: "Le budget doit être validé.",
          profiles: ["direction"],
        },
        {
          title: "Valider un avenant de budget",
          goal: "Acter la révision du budget.",
          output: "Le budget révisé est recalculé.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Peut-on modifier un budget de chantier déjà validé ?",
          a: "Oui, par un avenant : vous indiquez la date, le motif et l'écart par poste. Une fois l'avenant validé, le budget révisé est recalculé.",
        },
      ],
      related: [
        "promotion-et-chantiers/avancement-et-tableau-de-bord",
        "promotion-et-chantiers/depenses-de-chantier",
      ],
    },
    {
      slug: "avancement-et-tableau-de-bord",
      title: "Avancement et tableau de bord",
      metaTitle: "Avancement de chantier et alertes de dépassement",
      summary:
        "Saisissez l'avancement physique de vos chantiers, comparez budget, engagé et coût réel, et recevez des alertes quand un chantier dépasse son budget.",
      intro:
        "Le tableau de bord des chantiers vous montre, chantier par chantier, le budget, les montants engagés, le coût réel, l'avancement et l'écart. Vous y déclarez l'avancement physique des travaux et vous retrouvez sa courbe dans le temps. Les alertes de dépassement signalent les chantiers qui consomment leur budget plus vite que prévu.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Tableau de bord",
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau de bord des chantiers",
          goal: "Voir en un coup d'œil où en est chaque chantier, financièrement et physiquement.",
          input: "Au besoin, un statut, ou seulement les chantiers en dépassement.",
          output: "Par chantier : budget, engagé, coût réel, avancement et écart.",
        },
        {
          title: "Saisir un point d'avancement",
          goal: "Déclarer le pourcentage d'avancement physique du chantier à une date donnée.",
          input: "La date, le pourcentage et, au besoin, une note.",
          profiles: ["direction"],
        },
        {
          title: "Consulter l'historique d'avancement",
          goal: "Suivre la courbe d'avancement physique du chantier.",
          output: "Tous les points d'avancement saisis, dans l'ordre.",
        },
        {
          title: "Consulter les alertes de dépassement",
          goal: "Repérer les chantiers dont les dépenses engagées dépassent un seuil du budget.",
          output: "Pour chaque alerte ouverte : le seuil, le montant engagé, le budget et le pourcentage consommé.",
          prereq: "Le chantier doit avoir un budget validé.",
        },
        {
          title: "Marquer une alerte comme prise en compte",
          goal: "Indiquer qu'une alerte de dépassement a été vue et traitée.",
          output: "L'alerte est marquée comme prise en compte, avec la date et l'heure.",
          profiles: ["direction"],
        },
      ],
      related: [
        "promotion-et-chantiers/budget-de-chantier",
        "promotion-et-chantiers/suivi-des-chantiers",
      ],
    },
    {
      slug: "depenses-de-chantier",
      title: "Dépenses et pièces de caisse de chantier",
      metaTitle: "Dépenses de chantier et pièces de caisse en Côte d'Ivoire",
      summary:
        "Suivez les dépenses de chaque chantier par poste, émettez et imprimez des pièces de caisse, et reliez chaque poste de dépense à son compte comptable.",
      intro:
        "Sur un chantier, beaucoup de dépenses se règlent en espèces. Cette page vous permet d'émettre des pièces de caisse imputées au bon chantier et au bon poste de dépense, de les valider, de les imprimer, et de les annuler proprement en cas d'erreur. Vous voyez à tout moment le détail des coûts du chantier, poste par poste.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Chantiers",
      status: "disponible",
      actions: [
        {
          title: "Consulter le détail des coûts d'un chantier",
          goal: "Voir toutes les dépenses imputées au chantier.",
          output: "Le détail des dépenses, avec un sous-total par poste de dépense.",
        },
        {
          title: "Consulter les postes de dépense",
          goal: "Voir la liste des postes de dépense utilisés sur vos chantiers.",
          output: "Chaque poste avec son libellé, son ordre d'affichage et s'il est actif.",
        },
        {
          title: "Créer un poste de dépense",
          goal: "Ajouter un poste de dépense à la liste, par exemple pour un nouveau type de travaux.",
          input: "Le libellé du poste.",
          profiles: ["direction"],
        },
        {
          title: "Relier un poste de dépense à un compte comptable",
          goal: "Choisir le compte de charge sur lequel les dépenses de ce poste sont comptabilisées, ou retirer ce lien.",
          profiles: ["direction"],
        },
        {
          title: "Émettre une pièce de caisse de chantier",
          goal: "Enregistrer une sortie d'argent liquide pour une dépense de chantier.",
          input: "Le poste de dépense, le bénéficiaire, le montant, la date et le motif.",
          output: "La pièce est créée en brouillon ; son numéro lui est attribué à la validation.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider une pièce de caisse",
          goal: "Acter la sortie de caisse et l'imputer au chantier.",
          output: "La pièce est numérotée, l'écriture comptable est passée et le coût du chantier est mis à jour.",
          profiles: ["direction"],
        },
        {
          title: "Supprimer une pièce de caisse en brouillon",
          goal: "Effacer une pièce saisie par erreur, qui n'a jamais été comptabilisée.",
          prereq: "La pièce doit être en brouillon.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Imprimer une pièce de caisse",
          goal: "Obtenir le bon de caisse au format PDF, à faire signer ou à classer.",
        },
        {
          title: "Annuler une pièce de caisse validée",
          goal: "Corriger une pièce validée par erreur, par contre-passation.",
          input: "Le motif de l'annulation.",
          output: "Une pièce d'annulation est créée et le coût du chantier est recalculé.",
          prereq: "La pièce doit être validée.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Que faire si une pièce de caisse validée contient une erreur ?",
          a: "Vous l'annulez en indiquant un motif : une pièce d'annulation est créée et le coût du chantier est recalculé. Une pièce encore en brouillon peut simplement être supprimée.",
        },
      ],
      related: [
        "promotion-et-chantiers/budget-de-chantier",
        "promotion-et-chantiers/lots-et-cout-de-revient",
      ],
    },
    {
      slug: "baux-de-terrain",
      title: "Baux de terrain",
      metaTitle: "Suivi des baux de terrain d'un promoteur immobilier",
      summary:
        "Enregistrez les terrains loués qui portent vos chantiers, saisissez et validez les loyers fonciers, et suivez la charge constatée mois par mois.",
      intro:
        "Quand un programme est construit sur un terrain loué, le loyer foncier pèse sur le coût de l'opération. Cette page vous permet d'enregistrer chaque bail de terrain, d'y rattacher les chantiers qu'il porte et de suivre les loyers réglés. La charge est constatée mois par mois, et vous pouvez rattraper à la main un mois manquant.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Suivi des chantiers › Baux de terrain",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer un bail de terrain",
          goal: "Créer le bail foncier sur lequel reposent un ou plusieurs chantiers.",
          input:
            "Le nom du bailleur, la désignation du terrain, le loyer annuel, le poste de dépense concerné, la date de début et, si elle est connue, la date de fin.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la liste des baux de terrain",
          goal: "Voir tous vos baux fonciers, ou seulement ceux en cours.",
        },
        {
          title: "Consulter le détail d'un bail de terrain",
          goal: "Retrouver un bail avec ses paiements et ses charges mensuelles constatées.",
        },
        {
          title: "Rattacher un chantier à un bail de terrain",
          goal: "Lier un chantier au terrain qui le porte, ou retirer ce lien.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les paiements d'un bail",
          goal: "Voir l'historique des loyers fonciers réglés.",
        },
        {
          title: "Saisir un paiement de loyer foncier",
          goal: "Enregistrer un règlement de loyer du terrain.",
          input: "La date, le montant et la période couverte par le paiement.",
          output: "Le paiement est enregistré en brouillon.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider un paiement de loyer foncier",
          goal: "Acter le règlement du loyer du terrain.",
          output: "Le paiement est validé et l'écriture comptable est passée.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les charges mensuelles d'un bail",
          goal: "Voir la charge de loyer constatée pour chaque mois.",
        },
        {
          title: "Constater un mois à la main",
          goal: "Rattraper un mois dont la charge n'a pas été constatée automatiquement.",
          input: "Le mois et l'année.",
          output: "La charge du mois est constatée et déjà validée. Refaire l'opération sur le même mois ne crée pas de doublon.",
          prereq: "Le mois ne peut pas précéder la date de début du bail.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Un même terrain peut-il porter plusieurs chantiers ?",
          a: "Oui. Un bail de terrain peut être rattaché à un ou plusieurs chantiers.",
        },
      ],
      related: ["promotion-et-chantiers/suivi-des-chantiers"],
    },
    {
      slug: "stock-de-materiaux",
      title: "Stock de matériaux",
      metaTitle: "Logiciel de gestion de stock de matériaux de chantier",
      summary:
        "Tenez la liste de vos matériaux, de vos magasins et des lieux de stockage de chantier, et voyez à tout moment les quantités restantes et leur valeur.",
      intro:
        "Ciment, fer, agglos, carreaux : les matériaux représentent une part importante du coût d'un chantier. Cette page vous permet de tenir la liste de vos articles et de vos lieux de stockage, magasin central ou dépôt de chantier. Vous voyez ce qu'il reste en stock, lieu par lieu, avec sa valeur au coût moyen pondéré, et l'historique de tous les mouvements.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Gestion du stock › Articles et lieux",
      status: "disponible",
      actions: [
        {
          title: "Consulter les articles de stock",
          goal: "Voir la liste de vos matériaux, avec une recherche et un filtre sur les articles actifs.",
        },
        {
          title: "Créer un article de stock",
          goal: "Ajouter un matériau à la liste des articles.",
          input: "Une référence unique, un libellé, l'unité et, au besoin, une famille et un poste de dépense par défaut.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la fiche d'un article",
          goal: "Retrouver toutes les informations d'un article.",
        },
        {
          title: "Corriger un article",
          goal: "Modifier le libellé, l'unité ou la famille d'un article, ou le désactiver.",
          output: "L'article est mis à jour. Un article ne se supprime pas et sa référence ne change pas.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les lieux de stockage",
          goal: "Voir vos magasins et les lieux de stockage de vos chantiers.",
        },
        {
          title: "Créer un lieu de stockage",
          goal: "Ouvrir un magasin, ou le lieu de stockage propre à un chantier.",
          input: "La nature du lieu (magasin ou chantier), son libellé et, pour un chantier, le chantier concerné.",
          prereq: "Un chantier n'a qu'un seul lieu de stockage. Deux lieux ne peuvent pas porter le même libellé.",
          profiles: ["direction"],
        },
        {
          title: "Corriger un lieu de stockage",
          goal: "Modifier le libellé d'un lieu ou le désactiver. Sa nature et le chantier rattaché ne changent pas.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la méthode de valorisation du stock",
          goal: "Voir la méthode retenue pour valoriser le stock, le coût moyen pondéré, et le motif de ce choix.",
        },
        {
          title: "Décider de la méthode de valorisation",
          goal: "Enregistrer la méthode de valorisation retenue, toujours accompagnée du motif de la décision.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les soldes de stock",
          goal: "Voir ce qu'il reste, par article et par lieu.",
          output: "La quantité, la valeur et le coût moyen de chaque article.",
        },
        {
          title: "Consulter le journal des mouvements",
          goal: "Retrouver l'historique des réceptions, sorties, transferts et ajustements.",
          input: "Au besoin, un article, un lieu, un chantier, un type de mouvement ou une période.",
        },
      ],
      related: [
        "promotion-et-chantiers/entrees-et-sorties-de-stock",
        "promotion-et-chantiers/inventaire-de-stock",
      ],
    },
    {
      slug: "entrees-et-sorties-de-stock",
      title: "Réceptions, sorties et transferts de stock",
      metaTitle: "Réceptions et sorties de matériaux vers les chantiers",
      summary:
        "Réceptionnez les matériaux achetés, sortez-les vers vos chantiers au coût moyen, transférez-les entre dépôts et rapprochez acheté, consommé et restant.",
      intro:
        "Cette page suit le trajet des matériaux : de la facture du fournisseur au magasin, puis du magasin au chantier. Chaque sortie impute le chantier au coût moyen de l'article, sans que vous ayez à saisir de prix. Pour chaque chantier, vous confrontez ce qui a été acheté, ce qui a été consommé et ce qui reste.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Gestion du stock",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer une réception de matériaux",
          goal: "Faire entrer en stock des matériaux achetés, à partir de la facture du fournisseur.",
          input: "Le lieu de réception, la facture, la date et, pour chaque article, la quantité et le coût unitaire.",
          output: "Chaque ligne entre en stock et le coût moyen de l'article est recalculé.",
          prereq: "La facture fournisseur doit être validée ; le lieu et les articles doivent être actifs.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Sortir des matériaux vers un chantier",
          goal: "Consommer un article depuis un lieu de stockage et en imputer le coût au chantier.",
          input: "Le lieu, l'article, la quantité, le chantier, le poste de dépense, le demandeur et la date.",
          output: "Le chantier est imputé au coût moyen de l'article. Vous ne saisissez jamais de prix.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Transférer du stock entre deux lieux",
          goal: "Déplacer une quantité d'un magasin ou d'un chantier vers un autre, sans écriture comptable ni imputation.",
          input: "Le lieu de départ, le lieu d'arrivée, l'article, la quantité et la date.",
          output: "Une sortie et une entrée, valorisées au coût moyen du lieu de départ.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Faire passer un chantier en gestion par stock",
          goal: "Arrêter d'imputer directement les factures au chantier : les matériaux sont réceptionnés en stock, puis c'est leur sortie qui impute le chantier.",
          output: "Le chantier est marqué comme géré par le stock, avec la date. Ce choix est définitif.",
          profiles: ["direction"],
        },
        {
          title: "Consulter le mode de gestion d'un chantier",
          goal: "Savoir si un chantier est géré par le stock et dans quel lieu arrivent ses réceptions.",
        },
        {
          title: "Rapprocher acheté, consommé et restant",
          goal: "Confronter, pour un chantier, ce qui a été facturé à ce qui est entré et sorti du stock.",
          output: "Les montants achetés, consommés et restants, et le montant non rapproché.",
        },
      ],
      related: [
        "promotion-et-chantiers/stock-de-materiaux",
        "promotion-et-chantiers/depenses-de-chantier",
      ],
    },
    {
      slug: "inventaire-de-stock",
      title: "Inventaire de stock",
      metaTitle: "Inventaire physique du stock de matériaux de chantier",
      summary:
        "Comptez physiquement vos matériaux par magasin ou par chantier, justifiez chaque écart, puis validez l'inventaire pour ajuster le stock et la comptabilité.",
      intro:
        "Entre le stock théorique et ce qui se trouve réellement sur le chantier, il y a souvent des écarts : casse, pertes, erreurs de saisie. L'inventaire physique vous permet de compter chaque article, lieu par lieu, et de justifier chaque écart. À la validation, les pertes et les surplus sont ajustés dans le stock et en comptabilité.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Chantiers et stock › Gestion du stock › Inventaire",
      status: "disponible",
      actions: [
        {
          title: "Ouvrir un inventaire",
          goal: "Démarrer un comptage physique sur un lieu de stockage.",
          input: "Le lieu et la date du comptage.",
          output: "L'inventaire est créé en brouillon, sans ligne.",
          prereq: "Un seul inventaire en cours à la fois par lieu.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Saisir un comptage",
          goal: "Enregistrer la quantité comptée pour un article. Un nouveau comptage du même article remplace le précédent.",
          input: "L'article, la quantité comptée et, en cas d'écart, le motif.",
          output: "La quantité attendue est fixée par le logiciel en regard de la quantité comptée.",
          prereq: "L'inventaire ne doit pas être déjà validé.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Retirer un article du comptage",
          goal: "Enlever un article du comptage en cours.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider un inventaire",
          goal: "Transformer les écarts constatés en ajustements de stock, pertes ou surplus.",
          output: "Les ajustements de stock et les écritures comptables sont passés.",
          prereq: "L'inventaire doit compter au moins une ligne, et chaque écart doit avoir un motif.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la liste des inventaires",
          goal: "Retrouver l'historique des comptages, par lieu ou par statut.",
        },
        {
          title: "Consulter le détail d'un inventaire",
          goal: "Voir les lignes d'un comptage et les écarts constatés.",
        },
      ],
      faq: [
        {
          q: "Peut-on valider un inventaire avec un écart non expliqué ?",
          a: "Non. Chaque écart doit être accompagné d'un motif avant la validation.",
        },
      ],
      related: [
        "promotion-et-chantiers/stock-de-materiaux",
        "promotion-et-chantiers/entrees-et-sorties-de-stock",
      ],
    },
    {
      slug: "salaires-main-d-oeuvre",
      title: "Personnel et salaires",
      metaTitle: "Salaires de la main-d'œuvre de chantier en Côte d'Ivoire",
      summary:
        "Tenez le registre de votre main-d'œuvre, saisissez le salaire dû chaque mois, imputez-le au bon chantier et suivez les règlements versés à chaque employé.",
      intro:
        "Maçons, ferrailleurs, manœuvres, gardiens : la main-d'œuvre salariée fait partie du coût de vos chantiers. Cette page vous permet d'enregistrer vos employés, de déclarer le salaire dû chaque mois et de l'imputer, si besoin, au chantier concerné. Vous suivez aussi les règlements versés à chacun.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Main-d'œuvre › Salaires",
      status: "disponible",
      actions: [
        {
          title: "Consulter la liste des employés",
          goal: "Voir votre main-d'œuvre, ou seulement les employés actifs.",
        },
        {
          title: "Enregistrer un employé",
          goal: "Créer la fiche d'un employé et son compte individuel.",
          input: "Son nom complet et, au besoin, sa fonction.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la fiche d'un employé",
          goal: "Retrouver les informations d'un employé.",
        },
        {
          title: "Consulter les notes de salaire",
          goal: "Voir les salaires déclarés, filtrés par employé, par chantier ou par mois.",
        },
        {
          title: "Saisir une note de salaire",
          goal: "Déclarer le salaire dû à un employé pour un mois, en l'imputant si besoin à un chantier.",
          input: "Le mois, le montant et, pour un salaire lié à un chantier, ce chantier et le poste de dépense.",
          output: "La note est enregistrée en brouillon.",
          prereq: "Une seule note par employé et par mois.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider une note de salaire",
          goal: "Acter la charge salariale.",
          output: "L'écriture comptable est passée et, le cas échéant, le chantier est imputé.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les règlements d'un employé",
          goal: "Voir l'historique des salaires versés à un employé.",
        },
        {
          title: "Saisir un règlement de salaire",
          goal: "Enregistrer un paiement fait à un employé.",
          input: "La date et le montant.",
          output: "Le règlement est enregistré en brouillon.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider un règlement de salaire",
          goal: "Acter le paiement de l'employé.",
          output: "Le règlement est validé et l'écriture comptable est passée.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Le salaire d'un ouvrier peut-il être imputé à un chantier ?",
          a: "Oui. En saisissant la note de salaire, vous indiquez le chantier et le poste de dépense : à la validation, le coût du chantier en tient compte.",
        },
      ],
      related: [
        "promotion-et-chantiers/tacherons",
        "promotion-et-chantiers/depenses-de-chantier",
      ],
    },
    {
      slug: "tacherons",
      title: "Tâcherons et situations de travaux",
      metaTitle: "Gestion des tâcherons et situations de travaux",
      summary:
        "Enregistrez vos tâcherons, signez des marchés par chantier, saisissez et validez leurs situations de travaux, puis suivez chaque règlement versé.",
      intro:
        "Une grande partie des travaux est confiée à des tâcherons : maçonnerie, plomberie, électricité, peinture. Cette page vous permet d'enregistrer chaque tâcheron, de formaliser un marché par chantier et de suivre ses situations de travaux jusqu'au règlement. Vous savez à tout moment ce qui a été convenu, ce qui a été facturé et ce qui a été payé.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Main-d'œuvre › Tâcherons",
      status: "disponible",
      actions: [
        {
          title: "Consulter la liste des tâcherons",
          goal: "Voir vos sous-traitants, ou seulement ceux qui sont actifs.",
        },
        {
          title: "Enregistrer un tâcheron",
          goal: "Créer la fiche d'un tâcheron et son compte individuel.",
          input: "Son nom complet et, au besoin, son corps de métier.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les marchés de tâcherons",
          goal: "Voir tous les marchés signés, filtrés par tâcheron ou par chantier.",
        },
        {
          title: "Créer un marché avec un tâcheron",
          goal: "Formaliser un lot de travaux confié à un tâcheron sur un chantier.",
          input: "Le chantier, le poste de dépense, une référence de marché unique, le montant convenu et la date de signature.",
          profiles: ["direction"],
        },
        {
          title: "Consulter le détail d'un marché",
          goal: "Retrouver toutes les informations d'un marché de tâcheron.",
        },
        {
          title: "Consulter les situations d'un marché",
          goal: "Voir l'historique des situations de travaux présentées sur ce marché.",
        },
        {
          title: "Saisir une situation de travaux",
          goal: "Déclarer une situation de travaux à payer au tâcheron.",
          input: "La date, le montant et une description des travaux réalisés.",
          output: "La situation est enregistrée en brouillon.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider une situation de travaux",
          goal: "Acter la situation : la somme due au tâcheron est enregistrée en comptabilité.",
          output: "La situation est validée et l'écriture comptable est passée.",
          profiles: ["direction"],
        },
        {
          title: "Consulter les règlements d'un tâcheron",
          goal: "Voir l'historique des paiements versés à un tâcheron.",
        },
        {
          title: "Saisir un règlement de tâcheron",
          goal: "Enregistrer un paiement fait à un tâcheron.",
          input: "La date et le montant.",
          output: "Le règlement est enregistré en brouillon.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider un règlement de tâcheron",
          goal: "Acter le paiement du tâcheron.",
          output: "Le règlement est validé et l'écriture comptable est passée.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Peut-on appliquer une retenue de garantie sur une situation de tâcheron ?",
          a: "Oui. Une fois la situation validée, vous pouvez y poser une retenue de garantie en pourcentage.",
        },
      ],
      related: [
        "promotion-et-chantiers/retenues-de-garantie",
        "promotion-et-chantiers/salaires-main-d-oeuvre",
      ],
    },
    {
      slug: "retenues-de-garantie",
      title: "Retenues de garantie",
      metaTitle: "Retenues de garantie sur chantier en Côte d'Ivoire",
      summary:
        "Retenez un pourcentage sur les factures fournisseurs et les situations de tâcherons, suivez les sommes retenues par chantier et libérez-les à l'échéance.",
      intro:
        "La retenue de garantie protège le maître d'ouvrage jusqu'à la bonne fin des travaux. Cette page vous permet de retenir un pourcentage sur une facture fournisseur ou une situation de tâcheron, puis de suivre les sommes retenues, chantier par chantier. À l'échéance, vous libérez la retenue et la somme devient due.",
      packs: ["promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Achats et fournisseurs › Retenues de garantie",
      status: "disponible",
      actions: [
        {
          title: "Poser une retenue de garantie",
          goal: "Retenir un pourcentage sur une facture fournisseur ou une situation de tâcheron.",
          input: "La pièce concernée, le taux de retenue et la date de libération prévue.",
          output: "Le montant retenu est calculé à partir du taux et du montant de la pièce.",
          prereq: "La pièce doit être validée. Une seule retenue par pièce.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Libérer une retenue de garantie",
          goal: "Rendre due une somme jusque-là retenue en garantie.",
          output: "La retenue est marquée comme libérée. Le paiement lui-même se fait ensuite, à part.",
          prereq: "La retenue ne doit pas être déjà libérée.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la liste des retenues",
          goal: "Voir vos retenues de garantie, filtrées par statut, par chantier, par fournisseur ou tâcheron, ou par échéance dépassée.",
        },
        {
          title: "Consulter le résumé des retenues par chantier",
          goal: "Voir en un coup d'œil les sommes retenues sur chaque chantier.",
        },
        {
          title: "Consulter le détail d'une retenue",
          goal: "Retrouver toutes les informations d'une retenue précise.",
        },
      ],
      faq: [
        {
          q: "Libérer une retenue de garantie déclenche-t-il le paiement ?",
          a: "Non. La libération rend la somme due ; le règlement se fait ensuite, séparément.",
        },
      ],
      related: [
        "promotion-et-chantiers/tacherons",
        "promotion-et-chantiers/suivi-des-chantiers",
      ],
    },
  ],
};
