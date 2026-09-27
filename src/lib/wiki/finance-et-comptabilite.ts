import type { WikiDomain } from "./types";

export const financeEtComptabilite: WikiDomain = {
  slug: "finance-et-comptabilite",
  title: "Finance et comptabilité",
  metaTitle: "Logiciel de comptabilité immobilière en Côte d'Ivoire",
  summary:
    "Caisse, trésorerie, facturation des loyers, impayés, fournisseurs, bons de commande et comptabilité : toute la finance de votre agence immobilière.",
  intro:
    "Ce domaine réunit la finance opérationnelle de l'agence : la caisse et la trésorerie, la facturation des loyers, le suivi des impayés, les fournisseurs, les bons de commande et les états comptables. Les factures et les règlements fournisseurs sont saisis en brouillon, puis validés par la direction avant d'être comptabilisés. Une erreur se corrige par une annulation, jamais en effaçant. Il s'adresse à la direction, aux comptables et aux gestionnaires. Ces fonctions sont présentes dans l'application et en cours de déploiement.",
  features: [
    {
      slug: "caisse",
      title: "Caisse de l'agence",
      metaTitle: "Logiciel de gestion de caisse pour agence immobilière",
      summary:
        "Ouvrez votre caisse avec un fond de départ, clôturez-la par comptage ou billetage et faites valider l'écart par un tiers : la caisse de l'agence sous contrôle.",
      intro:
        "La caisse suit les espèces que vos caissiers encaissent et décaissent chaque jour. Chaque caissier ouvre sa session avec un fond de caisse, la clôture par un comptage, puis une autre personne valide la clôture. Vous voyez en un coup d'œil le montant attendu, le montant compté et l'écart de chaque caisse.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Caisse et comptabilité › Caisse et trésorerie › Caisse",
      status: "deploiement",
      actions: [
        {
          title: "Consulter sa caisse du jour",
          goal: "Le caissier retrouve la session de caisse qu'il a ouverte.",
          output:
            "Le numéro de la session, le fond de caisse et le solde attendu, calculé à partir des encaissements et des décaissements.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Ouvrir une session de caisse",
          goal: "Démarrer sa journée de caisse avec un fond de départ.",
          input:
            "Le fond de caisse, une note d'ouverture si besoin et, au choix, le compte de caisse concerné.",
          output: "Une session numérotée, ouverte à votre nom.",
          prereq:
            "Vous n'avez pas déjà une caisse ouverte. Le compte choisi doit être un compte de caisse actif.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Clôturer sa caisse par un comptage",
          goal: "Arrêter sa session en comptant les espèces : un montant global ou le détail des billets et des pièces.",
          input: "Le montant compté ou le billetage, et le motif en cas d'écart.",
          output: "La caisse est clôturée et l'écart entre le compté et l'attendu est calculé.",
          prereq: "Seul le caissier peut clôturer sa propre caisse. Un écart doit être justifié par un motif.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider une clôture de caisse",
          goal: "Une autre personne que le caissier contrôle le comptage et l'accepte.",
          input: "Un commentaire, si besoin.",
          output:
            "La session est validée. En cas de manquant ou d'excédent, l'écriture comptable correspondante est passée.",
          prereq: "La caisse doit être clôturée. Le caissier ne peut pas valider sa propre clôture.",
          profiles: ["direction"],
        },
        {
          title: "Suivre toutes les caisses de l'agence",
          goal: "Avoir une vue d'ensemble des sessions de caisse, filtrée par statut ou par caissier.",
          output:
            "La liste des sessions avec, pour chacune, le montant attendu, le montant compté et l'écart.",
        },
        {
          title: "Consulter le détail d'une session",
          goal: "Revoir une session de caisse précise, de l'ouverture à la validation.",
          output: "Toutes les informations de la session.",
        },
      ],
      faq: [
        {
          q: "Un caissier peut-il valider sa propre caisse ?",
          a: "Non. Le caissier clôture sa caisse par un comptage, puis une autre personne valide la clôture. Un écart doit être justifié par un motif.",
        },
        {
          q: "Peut-on compter la caisse billet par billet ?",
          a: "Oui. À la clôture, vous saisissez soit un montant global, soit le détail des billets et des pièces.",
        },
      ],
      related: ["finance-et-comptabilite/tresorerie", "finance-et-comptabilite/saisie-et-validation"],
    },
    {
      slug: "tresorerie",
      title: "Trésorerie et retenue à la source",
      metaTitle: "Gestion de trésorerie : banque, caisse et Mobile Money",
      summary:
        "Suivez les soldes de vos caisses, comptes bancaires et comptes Mobile Money, passez des virements internes et déclarez vos versements de retenue à la source.",
      intro:
        "La trésorerie regroupe tous les comptes où circule l'argent de l'agence : caisses, banques et Mobile Money. Vous voyez le solde de chaque compte, vous déplacez des fonds d'un compte à l'autre et chaque mouvement est comptabilisé. Vous suivez aussi la retenue à la source collectée et ses versements à la DGI.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Caisse et comptabilité › Caisse et trésorerie › Trésorerie",
      status: "deploiement",
      actions: [
        {
          title: "Consulter les comptes de trésorerie",
          goal: "Voir tous vos comptes, caisses, banques et Mobile Money, avec leur solde.",
          output: "La liste des comptes et le solde de chacun.",
        },
        {
          title: "Créer un compte de trésorerie",
          goal: "Ouvrir une caisse, un compte bancaire ou un compte Mobile Money dans l'application.",
          input:
            "La nature du compte, son libellé, son numéro et, selon le cas, la banque ou l'opérateur Mobile Money.",
          output: "Le compte est créé et prêt à recevoir des mouvements.",
          prereq: "Le numéro de compte ne doit pas déjà exister.",
          profiles: ["direction"],
        },
        {
          title: "Modifier ou désactiver un compte",
          goal: "Corriger le libellé d'un compte ou le désactiver quand il ne sert plus.",
          output: "Le compte est mis à jour.",
          prereq: "Vous ne pouvez pas désactiver le dernier compte actif d'une même nature.",
          profiles: ["direction"],
        },
        {
          title: "Effectuer un virement interne",
          goal: "Déplacer des fonds d'un compte de trésorerie à un autre, par exemple de la caisse vers la banque.",
          input: "Le compte de départ, le compte d'arrivée, le montant, la date et un libellé si besoin.",
          output: "Le virement est enregistré et son écriture comptable est passée.",
          prereq: "Les deux comptes doivent être actifs et différents.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter l'historique des virements",
          goal: "Retrouver tous les mouvements entre vos comptes de trésorerie.",
          output: "La liste des virements, chacun avec son numéro.",
        },
        {
          title: "Annuler un virement",
          goal: "Défaire un virement saisi par erreur.",
          input: "Le motif de l'annulation.",
          output: "Le virement est annulé par une écriture inverse.",
          prereq: "Le virement ne doit pas déjà être annulé.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la retenue à la source à reverser",
          goal: "Savoir combien de retenue à la source a été collectée et reste à verser à la DGI.",
          output: "Le montant cumulé à reverser.",
        },
        {
          title: "Déclarer un versement à la DGI",
          goal: "Enregistrer le versement de la retenue à la source collectée.",
          input: "Le compte de trésorerie utilisé, le montant et la date.",
          output: "Le versement est enregistré et son écriture comptable est passée.",
          prereq: "Le compte de trésorerie doit être actif.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter l'historique des versements à la DGI",
          goal: "Retrouver tous les versements de retenue à la source déjà effectués.",
          output: "La liste des versements, chacun avec son numéro.",
        },
        {
          title: "Annuler un versement à la DGI",
          goal: "Défaire un versement enregistré par erreur.",
          input: "Le motif de l'annulation.",
          output: "Le versement est annulé.",
          prereq: "Le versement ne doit pas déjà être annulé.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Peut-on suivre un compte Mobile Money ?",
          a: "Oui. Un compte de trésorerie peut être une caisse, un compte bancaire ou un compte Mobile Money, avec son opérateur. Son solde apparaît avec celui des autres comptes.",
        },
        {
          q: "Comment corriger un virement saisi par erreur ?",
          a: "Vous l'annulez en indiquant un motif : une écriture inverse est passée et le virement est marqué comme annulé.",
        },
      ],
      related: [
        "finance-et-comptabilite/caisse",
        "finance-et-comptabilite/comptabilite",
        "agence-et-abonnement/parametres-financiers",
      ],
    },
    {
      slug: "saisie-et-validation",
      title: "Import Excel et validation des pièces",
      metaTitle: "Import Excel et validation des pièces comptables",
      summary:
        "Importez vos opérations depuis un classeur Excel et faites valider factures fournisseurs, règlements et pièces de caisse dans une file unique par la direction.",
      intro:
        "Plus besoin de ressaisir ligne par ligne : vous chargez un classeur Excel, l'application reconnaît la nature de chaque ligne et l'enregistre. Les pièces saisies en brouillon arrivent ensuite dans une file de validation unique. La direction voit en un coup d'œil ce qui attend son accord, qui l'a saisi et pour quel montant.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "comptable"],
      menu: "Finance › Caisse et comptabilité › Saisie et validation",
      status: "deploiement",
      actions: [
        {
          title: "Importer un classeur Excel",
          goal: "Enregistrer en une fois de nombreuses opérations à partir d'un fichier Excel. L'application reconnaît la nature de chaque ligne et la rattache à vos données existantes.",
          input: "Votre classeur Excel.",
          output: "Un compte rendu d'import : les lignes enregistrées et celles en erreur.",
        },
        {
          title: "Consulter la file de validation",
          goal: "Voir toutes les pièces en attente de validation : factures fournisseurs, règlements et pièces de caisse. Vous pouvez filtrer par nature ou par auteur.",
          output: "La liste des pièces en attente, avec leur libellé, leur montant et leur auteur.",
          profiles: ["direction"],
        },
      ],
      faq: [
        {
          q: "Quelles pièces passent par la validation ?",
          a: "Les factures fournisseurs, les règlements fournisseurs et les pièces de caisse saisis en brouillon. Ils attendent dans une file unique jusqu'à leur validation.",
        },
      ],
      related: ["finance-et-comptabilite/fournisseurs-et-factures", "finance-et-comptabilite/comptabilite"],
    },
    {
      slug: "comptabilite",
      title: "Journal, grand livre et balance",
      metaTitle: "Journal, grand livre et balance pour agence immobilière",
      summary:
        "Consultez le journal, le grand livre, la balance générale et les états auxiliaires des mandants sur la période voulue, puis exportez-les en CSV ou en Excel.",
      intro:
        "Les écritures passées par la caisse, la trésorerie et les fournisseurs se retrouvent dans les états comptables. Vous choisissez une période et consultez le journal, le grand livre ou la balance, à l'écran ou en fichier. Le grand livre et la balance des mandants détaillent les mouvements par propriétaire ou par copropriété.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Caisse et comptabilité › Comptabilité",
      status: "deploiement",
      actions: [
        {
          title: "Consulter le journal comptable",
          goal: "Lister les écritures d'une période, journal par journal.",
          input: "La période et, si besoin, le journal voulu.",
          output: "Les lignes au débit et au crédit, à l'écran ou en fichier CSV ou Excel.",
        },
        {
          title: "Consulter le grand livre",
          goal: "Voir les mouvements de chaque compte sur une période.",
          input: "La période et, si besoin, un compte précis.",
          output: "Le grand livre, à l'écran ou en fichier CSV ou Excel.",
        },
        {
          title: "Consulter la balance générale",
          goal: "Obtenir la balance de tous les comptes sur une période.",
          input: "La période.",
          output: "La balance, à l'écran ou en fichier CSV ou Excel.",
        },
        {
          title: "Consulter le grand livre des mandants",
          goal: "Détailler les mouvements mandant par mandant : propriétaire ou copropriété.",
          input: "La période.",
          output: "Le grand livre auxiliaire des mandants, à l'écran ou en fichier CSV ou Excel.",
        },
        {
          title: "Consulter la balance des mandants",
          goal: "Voir le solde de chaque mandant à une date donnée.",
          input: "La date d'arrêté.",
          output: "La balance auxiliaire des mandants, à l'écran ou en fichier CSV ou Excel.",
        },
      ],
      faq: [
        {
          q: "Peut-on exporter les états comptables vers Excel ?",
          a: "Oui. Le journal, le grand livre, la balance générale et les états des mandants se téléchargent en CSV ou en Excel.",
        },
      ],
      related: ["finance-et-comptabilite/tresorerie", "finance-et-comptabilite/balance-clients"],
    },
    {
      slug: "facturation-des-loyers",
      title: "Facturation mensuelle des loyers",
      metaTitle: "Facturation mensuelle des loyers en Côte d'Ivoire",
      summary:
        "Générez en une fois les factures de loyer du mois pour tous vos baux actifs, puis retrouvez l'historique et le résumé de chaque campagne de facturation.",
      intro:
        "Chaque mois, vous lancez une campagne qui génère les factures de loyer de tous les baux actifs. Relancer la même période ne crée pas de doublon : l'application vous renvoie la campagne déjà faite. Vous gardez l'historique de toutes les campagnes et leur résumé.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Clients et propriétaires › Facturation et balances › Facturation du mois",
      status: "deploiement",
      actions: [
        {
          title: "Lancer la facturation du mois",
          goal: "Générer les factures de loyer du mois pour tous les baux actifs.",
          input: "Le mois et l'année.",
          output: "Une campagne de facturation avec son résumé.",
          prereq: "Vos baux doivent être créés et actifs.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter l'historique des campagnes",
          goal: "Retrouver toutes les campagnes de facturation, filtrées par statut si besoin.",
          output: "La liste des campagnes avec leur période, leur statut et leur résumé.",
        },
        {
          title: "Consulter le détail d'une campagne",
          goal: "Revoir le résumé d'une campagne de facturation précise.",
          output: "Le résumé de la facturation de la période.",
        },
      ],
      faq: [
        {
          q: "Que se passe-t-il si je relance la facturation d'un mois déjà facturé ?",
          a: "Aucune facture en double n'est créée : l'application vous renvoie la campagne déjà existante pour cette période.",
        },
      ],
      related: ["finance-et-comptabilite/balance-clients"],
    },
    {
      slug: "balance-clients",
      title: "Balance clients et impayés",
      metaTitle: "Balance clients et balance âgée des impayés de loyer",
      summary:
        "Suivez le facturé, le réglé et le solde de chaque locataire, repérez l'ancienneté des impayés avec la balance âgée et imprimez le relevé de compte en PDF.",
      intro:
        "La balance clients montre, locataire par locataire, ce qui a été facturé, ce qui a été réglé et ce qui reste dû. La balance âgée classe les impayés par ancienneté pour mieux prioriser vos relances. Depuis la fiche d'un compte, vous consultez le relevé détaillé et l'imprimez en PDF.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Clients et propriétaires › Facturation et balances",
      status: "deploiement",
      actions: [
        {
          title: "Consulter la balance clients",
          goal: "Voir le facturé, le réglé et le solde de chaque locataire sur une période.",
          input: "La période et, si besoin, un bien précis.",
          output:
            "Une ligne par locataire avec ses biens, le facturé, le réglé et le solde, exportable en CSV.",
        },
        {
          title: "Consulter la balance âgée",
          goal: "Mesurer l'ancienneté des impayés à une date donnée.",
          input: "La période, la date d'arrêté et, si besoin, un bien précis.",
          output: "Les impayés répartis par tranches d'ancienneté.",
        },
        {
          title: "Consulter le relevé d'un compte",
          goal: "Détailler les mouvements du compte d'un locataire ou d'un mandant sur une période.",
          input: "La période.",
          output: "Le relevé, avec le solde d'ouverture, le solde de clôture et chaque mouvement.",
        },
        {
          title: "Imprimer le relevé de compte en PDF",
          goal: "Obtenir une version imprimable du relevé, à remettre ou à archiver.",
          input: "La période.",
          output: "Un fichier PDF.",
        },
      ],
      faq: [
        {
          q: "Peut-on voir depuis combien de temps un loyer est impayé ?",
          a: "Oui. La balance âgée répartit les impayés par tranches d'ancienneté, à la date que vous choisissez.",
        },
      ],
      related: ["finance-et-comptabilite/facturation-des-loyers", "finance-et-comptabilite/comptabilite"],
    },
    {
      slug: "fournisseurs-et-factures",
      title: "Fournisseurs et factures fournisseurs",
      metaTitle: "Gestion des fournisseurs et des factures fournisseurs",
      summary:
        "Tenez le registre de vos fournisseurs, saisissez leurs factures et vos règlements, faites-les valider et suivez la balance fournisseurs, chantier par chantier.",
      intro:
        "Chaque fournisseur a sa fiche et son compte, avec le solde que vous lui devez. Les factures et les règlements sont saisis en brouillon, puis validés par la direction avant d'être comptabilisés. Une erreur se corrige par une annulation, jamais par une modification : vous gardez une trace de tout.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Achats et fournisseurs › Fournisseurs et commandes › Fournisseurs",
      status: "deploiement",
      actions: [
        {
          title: "Consulter la liste des fournisseurs",
          goal: "Retrouver tous vos fournisseurs, actifs ou non, avec leur solde.",
          output: "La liste des fournisseurs et le solde de chacun.",
        },
        {
          title: "Créer un fournisseur",
          goal: "Ouvrir la fiche d'un fournisseur de matériaux, de services ou mixte.",
          input:
            "Le nom, la nature du fournisseur, les coordonnées d'un contact et, si besoin, le prestataire de maintenance auquel il correspond.",
          output: "La fiche du fournisseur et son compte, prêts à recevoir des factures.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter la fiche d'un fournisseur",
          goal: "Voir les informations d'un fournisseur et son solde.",
        },
        {
          title: "Consulter les factures d'un fournisseur",
          goal: "Retrouver l'historique de facturation d'un fournisseur.",
          output: "Chaque facture avec son montant, son statut, le reste dû et le chantier concerné.",
        },
        {
          title: "Saisir une facture fournisseur",
          goal: "Enregistrer une facture reçue, avec ses lignes et leur répartition par chantier et par poste de dépense.",
          input: "La date, la référence, les lignes de la facture et leur répartition.",
          output: "Une facture en brouillon, dont le montant est calculé à partir des lignes.",
          prereq: "La facture compte au moins une ligne. Une facture de matériaux doit être rattachée à un chantier.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter le détail d'une facture",
          goal: "Voir l'en-tête, les lignes et la répartition d'une facture fournisseur.",
          output: "Le détail complet, y compris les répartitions annulées.",
        },
        {
          title: "Valider une facture fournisseur",
          goal: "Accepter la facture et enregistrer la dette envers le fournisseur.",
          output: "La facture est validée et son écriture comptable est passée.",
          prereq: "La facture ne doit être ni déjà validée ni annulée.",
          profiles: ["direction"],
        },
        {
          title: "Annuler une facture validée",
          goal: "Corriger une facture fournisseur validée par erreur.",
          input: "Le motif de l'annulation.",
          output: "Une pièce d'annulation qui passe l'écriture inverse.",
          prereq: "La facture doit être validée et pas déjà annulée.",
          profiles: ["direction"],
        },
        {
          title: "Saisir un règlement fournisseur",
          goal: "Payer une ou plusieurs factures d'un même fournisseur.",
          input: "La date, le montant, le moyen de paiement et la répartition entre les factures réglées.",
          output: "Un règlement en brouillon.",
          prereq:
            "Les factures réglées doivent être validées, et le total réparti ne peut pas dépasser le montant du règlement.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Valider un règlement fournisseur",
          goal: "Accepter le règlement saisi.",
          output: "Le règlement est validé et son écriture comptable est passée.",
          prereq:
            "Le règlement ne doit être ni déjà validé ni annulé, et les factures réglées doivent toujours être validées.",
          profiles: ["direction"],
        },
        {
          title: "Annuler un règlement fournisseur",
          goal: "Corriger un règlement validé par erreur.",
          input: "Le motif de l'annulation.",
          output: "Une pièce d'annulation qui passe l'écriture inverse.",
          prereq: "Le règlement doit être validé.",
          profiles: ["direction"],
        },
        {
          title: "Consulter la balance fournisseurs",
          goal: "Voir ce que vous devez à chaque fournisseur sur une période, au besoin pour un seul chantier.",
          input: "La période et, si besoin, le chantier.",
          output: "La balance fournisseurs.",
        },
      ],
      faq: [
        {
          q: "Peut-on modifier une facture fournisseur déjà validée ?",
          a: "Non. Une facture validée se corrige par une annulation, avec un motif : une pièce d'annulation passe l'écriture inverse.",
        },
        {
          q: "Un règlement peut-il couvrir plusieurs factures ?",
          a: "Oui. Un règlement se répartit entre plusieurs factures validées d'un même fournisseur, dans la limite de son montant.",
        },
      ],
      related: [
        "finance-et-comptabilite/bons-de-commande",
        "finance-et-comptabilite/saisie-et-validation",
        "finance-et-comptabilite/comptabilite",
      ],
    },
    {
      slug: "bons-de-commande",
      title: "Bons de commande et engagé chantier",
      metaTitle: "Bons de commande fournisseurs et suivi de l'engagé chantier",
      summary:
        "Passez vos commandes aux fournisseurs par chantier, émettez-les, rapprochez-les des factures reçues et suivez l'engagé : coût réel et commandes en cours.",
      intro:
        "Le bon de commande fixe ce que vous commandez à un fournisseur pour un chantier, poste par poste. Une fois émis, il entre dans l'engagé du chantier ; quand la facture arrive, vous la rattachez au bon pour suivre le facturé et le reste à facturer. Vous connaissez ainsi le coût réel d'un chantier et ce qui est déjà engagé.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Achats et fournisseurs › Fournisseurs et commandes › Bons de commande",
      status: "deploiement",
      actions: [
        {
          title: "Consulter les bons de commande",
          goal: "Suivre les commandes passées, filtrées par chantier, par fournisseur ou par statut.",
          output: "Chaque bon avec son montant, le facturé, le restant et l'état de facturation.",
        },
        {
          title: "Créer un bon de commande",
          goal: "Préparer une commande à un fournisseur pour un chantier.",
          input: "Le chantier, le fournisseur, une référence, la date et les lignes par poste de dépense.",
          output: "Un bon de commande en brouillon.",
          prereq:
            "Le chantier et le fournisseur doivent exister. La référence doit être unique dans l'agence, et le bon compte au moins une ligne.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter le détail d'un bon de commande",
          goal: "Voir un bon et où en est sa facturation.",
          output: "Les lignes, le montant facturé et le restant.",
        },
        {
          title: "Émettre un bon de commande",
          goal: "Confirmer la commande pour qu'elle compte dans l'engagé du chantier.",
          output: "Le bon est émis et entre dans l'engagé.",
          prereq: "Le bon doit être en brouillon.",
          profiles: ["direction"],
        },
        {
          title: "Annuler un bon de commande",
          goal: "Retirer une commande de l'engagé du chantier.",
          input: "Le motif, obligatoire.",
          output: "Le bon est annulé.",
          prereq: "Le bon ne doit pas déjà être annulé.",
          profiles: ["direction"],
        },
        {
          title: "Rattacher une facture à un bon de commande",
          goal: "Lier une facture fournisseur au bon qui l'a engagée, ou retirer ce lien.",
          input: "Le bon de commande concerné.",
          output: "Le facturé et le restant du bon sont recalculés.",
          prereq:
            "La facture ne doit pas être validée, le bon doit être émis, et les deux doivent concerner le même fournisseur et le même chantier.",
          profiles: ["direction", "comptable"],
        },
        {
          title: "Consulter l'engagé d'un chantier",
          goal: "Connaître le coût réel d'un chantier et les commandes émises pas encore facturées.",
          output: "Le coût réel, les engagements ouverts et l'engagé total.",
        },
      ],
      faq: [
        {
          q: "Qu'est-ce que l'engagé d'un chantier ?",
          a: "C'est le coût réel du chantier, plus les bons de commande émis qui ne sont pas encore facturés.",
        },
      ],
      related: ["finance-et-comptabilite/fournisseurs-et-factures"],
    },
  ],
};
