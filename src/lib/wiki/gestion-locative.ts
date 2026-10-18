import type { WikiDomain } from "./types";

export const gestionLocative: WikiDomain = {
  slug: "gestion-locative",
  title: "Gestion locative",
  metaTitle: "Logiciel de gestion locative en Côte d'Ivoire : baux, loyers",
  summary:
    "Baux, échéances, encaissement des loyers en espèces ou Mobile Money, pénalités, caution et quittances : la gestion locative d'ImmoTopia expliquée en détail.",
  intro:
    "Le domaine gestion locative couvre tout le cycle d'un bail : sa création, la vie du bail, les états des lieux, l'échéancier des loyers, l'encaissement, les pénalités de retard, le dépôt de garantie et les documents remis au locataire. Il s'adresse aux agences et aux administrateurs de biens, Les packs Patrimoine ouvrent la gestion locative directe de vos propres biens, sans mandat ni propriétaire tiers. Les relevés de gérance, les reversements, les honoraires et les accès en lecture seule pour les tiers de confiance concernent la gestion pour le compte de propriétaires. Les liens de paiement d'un loyer et les envois automatiques au propriétaire sont en cours de déploiement. La signature électronique des baux, des états des lieux et des mandats, et le prélèvement bancaire des loyers complètent le domaine.",
  features: [
    {
      slug: "gestion-des-baux",
      title: "Gestion des baux",
      metaTitle: "Gestion des baux de location : logiciel en Côte d'Ivoire",
      summary:
        "Créez vos baux en quelques minutes : bien, locataire, loyer, jour d'échéance, caution et règles de pénalité. Colocataires, statuts et fiche bail complète.",
      intro:
        "Le bail est le point de départ de toute la gestion locative : échéances, paiements, pénalités et dépôt de garantie s'y rattachent. Vos collaborateurs créent un bail sur un bien de l'agence, y ajoutent les colocataires et suivent son statut. Toute l'information du contrat tient sur une seule fiche : plus besoin de chercher dans les classeurs. Le contrat peut être envoyé aux locataires pour [signature électronique](/wiki/gestion-locative/signature-electronique).",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux",
      status: "disponible",
      actions: [
        {
          title: "Créer un bail",
          goal: "Ouvrir un nouveau contrat de location sur un bien de votre agence.",
          input:
            "Le bien, le locataire principal, les dates de début et de fin, le loyer, le jour d'échéance dans le mois, la fréquence de facturation, le montant de la caution, les règles de pénalité de retard (taux ou montant fixe, plafond, jours de grâce), la devise et vos notes.",
          output: "Un bail enregistré, numéroté automatiquement si vous ne saisissez pas de numéro.",
          prereq: "Le bien existe dans votre agence. Le loyer et le jour d'échéance sont obligatoires.",
        },
        {
          title: "Consulter les baux",
          goal: "Retrouver un bail par statut, par bien ou par locataire, puis ouvrir sa fiche complète.",
          output:
            "La liste de vos baux et, pour chacun, une fiche avec les colocataires, le dépôt de garantie et les documents.",
        },
        {
          title: "Modifier un bail",
          goal: "Corriger les termes d'un bail en cours.",
          input:
            "La date de fin, les dates d'entrée et de sortie du locataire, le loyer, les charges, la caution, la fréquence de facturation et vos notes.",
        },
        {
          title: "Changer le statut d'un bail",
          goal: "Faire passer le bail de brouillon à actif, puis à suspendu, terminé ou annulé. Un bail terminé ou annulé ne change plus de statut.",
          output:
            "Le bail change de statut. Quand plus aucun bail actif ne porte sur le bien, celui-ci redevient disponible.",
        },
        {
          title: "Supprimer un bail",
          goal: "Effacer un bail créé par erreur. Le bien redevient disponible s'il n'a plus de bail actif.",
          prereq: "Aucun paiement n'est déjà affecté aux échéances du bail.",
        },
        {
          title: "Ajouter un colocataire",
          goal: "Associer au bail un autre locataire, solidaire du locataire principal.",
          input: "Le client colocataire.",
        },
        {
          title: "Retirer un colocataire",
          goal: "Consulter la liste des colocataires d'un bail et en détacher un si besoin.",
        },
      ],
      faq: [
        {
          q: "Peut-on gérer une colocation ?",
          a: "Oui. Vous ajoutez au bail un ou plusieurs colocataires solidaires, et vous pouvez consulter leur liste ou en retirer un à tout moment.",
        },
        {
          q: "Peut-on supprimer un bail saisi par erreur ?",
          a: "Oui, tant qu'aucun paiement n'a été affecté à ses échéances. Le bien redevient alors disponible s'il n'a plus d'autre bail actif.",
        },
      ],
      related: [
        "gestion-locative/echeancier-des-loyers",
        "gestion-locative/depot-de-garantie",
        "gestion-locative/vie-du-bail",
        "gestion-locative/signature-electronique",
      ],
    },
    {
      slug: "vie-du-bail",
      title: "Vie du bail",
      metaTitle: "Révision de loyer, renouvellement et résiliation de bail",
      summary:
        "Révisez le loyer, renouvelez ou résiliez un bail, enregistrez un avenant et estimez le solde de tout compte, avec l'historique complet de chaque contrat.",
      intro:
        "Un bail évolue : hausse de loyer, prolongation, avenant, départ du locataire. Cette fonctionnalité trace chaque événement sur le bail et met à jour les échéances non réglées en conséquence. En fin de bail, vous voyez d'un coup d'œil ce qui reste à rendre au locataire.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › Vie du bail",
      status: "disponible",
      actions: [
        {
          title: "Consulter l'historique du bail",
          goal: "Voir la chronologie des révisions, renouvellements, avenants et de la résiliation, avec l'état actuel du bail.",
        },
        {
          title: "Réviser le loyer",
          goal: "Appliquer un nouveau loyer, et si besoin de nouvelles charges, à partir d'un mois donné. Une révision à date future est planifiée : le bail garde l'ancien loyer jusqu'à cette date.",
          input: "Le mois d'effet, le nouveau loyer, les nouvelles charges, le taux de révision et un commentaire.",
          output:
            "Les échéances non réglées à partir de ce mois sont recalculées et l'écart est reporté au compte du locataire.",
          prereq:
            "Le bail n'est ni résilié ni annulé, et aucune échéance du mois choisi n'est déjà réglée, même en partie. Sinon, choisissez un mois plus tardif.",
        },
        {
          title: "Renouveler le bail",
          goal: "Repousser la date de fin du bail et créer les échéances de la nouvelle période.",
          input: "La nouvelle date de fin et, si besoin, le nouveau loyer, les nouvelles charges et un commentaire.",
          output:
            "Les nouvelles échéances sont créées et un bail terminé redevient actif. Un changement de loyer est tracé comme une révision.",
          prereq:
            "Le bail est à durée déterminée, ni résilié ni annulé, et la nouvelle date de fin tombe après l'actuelle.",
        },
        {
          title: "Enregistrer un avenant",
          goal: "Tracer un changement du contrat sans effet sur le loyer : nouvelle clause, annexe…",
          input: "La date d'effet et un résumé du changement.",
        },
        {
          title: "Résilier le bail",
          goal: "Mettre fin au bail à une date donnée.",
          input:
            "La date du préavis, la date d'effet, qui est à l'origine de la résiliation (locataire, bailleur ou accord commun), la date de sortie et un commentaire.",
          output:
            "Les échéances non réglées après la fin sont annulées et retirées du compte du locataire. Le bail passe à « terminé » si la date est passée. Les échéances déjà payées après la fin sont signalées à part, pour un avoir.",
          prereq: "Le bail n'est pas déjà résilié ni annulé.",
        },
        {
          title: "Consulter le solde de tout compte",
          goal: "Estimer, en fin de bail, la somme à rendre au locataire.",
          output:
            "Le dépôt détenu, les arriérés, les retenues de l'état des lieux de sortie et le solde à rembourser.",
        },
      ],
      faq: [
        {
          q: "Que deviennent les échéances quand le loyer est révisé ?",
          a: "Les échéances non réglées à partir du mois d'effet sont recalculées et l'écart est reporté au compte du locataire. Un mois déjà réglé, même en partie, ne peut pas être révisé.",
        },
        {
          q: "Que se passe-t-il pour les loyers après une résiliation ?",
          a: "Les échéances non réglées après la date de fin sont annulées. Celles qui ont déjà été payées sont signalées à part, pour que vous établissiez un avoir.",
        },
      ],
      related: [
        "gestion-locative/gestion-des-baux",
        "gestion-locative/etats-des-lieux",
        "gestion-locative/depot-de-garantie",
      ],
    },
    {
      slug: "etats-des-lieux",
      title: "États des lieux",
      h1: "Logiciel d'état des lieux d'entrée et de sortie",
      metaTitle: "Logiciel état des lieux en ligne : entrée, sortie, photos",
      summary:
        "Logiciel d'état des lieux d'entrée et de sortie : pièces, photos, compteurs, signature électronique et PDF, sur téléphone ou tablette, avec comparaison.",
      intro:
        "Ce logiciel d'état des lieux permet à votre agence de réaliser l'état des lieux d'entrée et l'état des lieux de sortie de chaque bail, pièce par pièce, depuis un ordinateur, une tablette ou un téléphone. Votre agent décrit chaque élément, ajoute des photos par pièce, relève les compteurs et les clés, puis fait signer l'état des lieux par voie électronique. Les états des lieux se rangent avec le bail, s'exportent ou s'impriment en PDF, et celui de sortie se compare à celui d'entrée pour repérer les dégradations. Tant qu'il est en brouillon, la signature se saisit dans l'état des lieux lui-même (action « Faire signer l'état des lieux ») ; une fois finalisé, il peut en plus être envoyé aux signataires pour [signature électronique](/wiki/gestion-locative/signature-electronique), ou signé sur place.",
      sections: [
        {
          title: "Pourquoi utiliser un logiciel pour vos états des lieux ?",
          body: [
            "Un état des lieux sur papier se perd, se froisse et se discute. Dans un logiciel, chaque pièce est décrite élément par élément, avec ses photos, et l'état des lieux reste attaché au bail. L'agence peut s'y référer à tout moment en cas de désaccord. Pour comparer les outils, voir le guide [Logiciel d'état des lieux : critères de choix](/guides/logiciel-etat-des-lieux-comparatif).",
            [
              "La preuve par la photo : les photos sont rattachées à la pièce ou à l'élément concerné, avec une légende, et ne peuvent plus être ajoutées ni supprimées une fois l'état des lieux finalisé.",
              "Moins de litiges sur le dépôt de garantie : à la sortie, l'écart avec l'entrée se lit élément par élément, et les retenues se justifient avec le même document que celui signé à l'entrée.",
              "Un vrai gain de temps : l'état des lieux de sortie reprend les pièces et les éléments de l'entrée, prêts à être remplis, et le PDF s'exporte au lieu d'être recopié.",
            ],
          ],
        },
        {
          title: "État des lieux d'entrée et de sortie : la comparaison",
          body: [
            "Chaque bail a un état des lieux d'entrée et un état des lieux de sortie. Quand vous ouvrez celui de sortie, les pièces et les éléments de l'entrée sont repris à vide : il ne reste qu'à constater l'état du logement au moment de la restitution des clés.",
            "Un tableau compare ensuite, élément par élément, l'état à l'entrée, l'état à la sortie et ce qui s'est dégradé. Il s'affiche même si un seul des deux états des lieux existe.",
          ],
        },
        {
          title: "Que doit contenir un état des lieux ?",
          body: [
            "Un état des lieux complet décrit le logement tel qu'il est remis, puis tel qu'il est rendu. Dans ImmoTopia, vous renseignez :",
            [
              "les pièces et, pour chacune, les éléments contrôlés avec leur état ;",
              "les relevés de compteurs ;",
              "le nombre de clés remises ;",
              "les photos par pièce ou par élément, avec une légende ;",
              "un commentaire général, la présence du locataire et le nom des signataires (locataire et agence), puis la signature électronique ;",
              "les retenues éventuelles sur le dépôt de garantie.",
            ],
            "Les retenues notées à la sortie se règlent ensuite sur la fiche du [dépôt de garantie](/wiki/gestion-locative/depot-de-garantie), où chaque retenue et chaque restitution est tracée. Une fois l'état des lieux finalisé, il ne peut plus être modifié.",
          ],
        },
      ],
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › États des lieux",
      status: "disponible",
      actions: [
        {
          title: "Ouvrir un état des lieux",
          goal: "Démarrer un état des lieux d'entrée ou de sortie sur un bail, à partir d'une liste de pièces et d'éléments.",
          input: "Le type (entrée ou sortie) et la date.",
          output:
            "Un état des lieux prêt à remplir. Pour une sortie, les pièces et éléments de l'entrée sont repris, à vide.",
          prereq: "Un bail existe. Chaque bail a un seul état des lieux d'entrée et un seul de sortie.",
        },
        {
          title: "Consulter les états des lieux",
          goal: "Voir les états des lieux d'un bail, entrée puis sortie, et le détail de chacun.",
          output: "Les pièces, les éléments et leur état, les compteurs, les retenues et les photos.",
        },
        {
          title: "Remplir un état des lieux",
          goal: "Noter l'état de chaque pièce et de chaque élément tant que l'état des lieux est en brouillon.",
          input:
            "La date, l'état de chaque élément, les relevés de compteurs, le nombre de clés, un commentaire général, la présence du locataire, le nom des signataires (locataire et agence) et les retenues.",
          prereq: "L'état des lieux n'est pas encore finalisé.",
        },
        {
          title: "Proposer les retenues depuis les dégradations et manquants",
          goal: "Préremplir les retenues sur le dépôt de garantie à partir de ce qui est dégradé ou manquant, au lieu de les saisir une à une.",
          input: "Un clic sur l'état des lieux de sortie, tant qu'il est en brouillon.",
          output:
            "Des lignes de retenue proposées, que vous pouvez toutes modifier. Un élément dégradé reçoit un montant à compléter, un élément manquant est valorisé à sa valeur de remplacement multipliée par la quantité, et une clé manquante reçoit un montant à compléter.",
          prereq: "L'état des lieux est en brouillon, donc encore modifiable.",
        },
        {
          title: "Faire signer l'état des lieux",
          goal: "Recueillir la signature électronique de l'agence et du locataire sur l'état des lieux, sans exemplaire papier à faire circuler.",
          input: "Le nom du signataire de l'agence et celui du locataire s'il est présent.",
          prereq: "L'état des lieux est rempli et n'est pas encore finalisé.",
        },
        {
          title: "Finaliser un état des lieux",
          goal: "Verrouiller l'état des lieux une fois signé : il ne peut plus être modifié.",
          output: "Un état des lieux finalisé et daté.",
          prereq:
            "Le nom du signataire de l'agence est saisi, celui du locataire aussi s'il était présent, et au moins un élément a un état renseigné.",
        },
        {
          title: "Exporter ou imprimer en PDF",
          goal: "Obtenir l'état des lieux en PDF, pour l'imprimer ou le transmettre vous-même au locataire et au propriétaire.",
          output: "Un fichier PDF de l'état des lieux.",
        },
        {
          title: "Remplir sur téléphone ou tablette",
          goal: "Faire l'état des lieux sur place, dans le logement, depuis le navigateur d'un téléphone ou d'une tablette, avec les photos pièce par pièce.",
          prereq: "Une connexion Internet : ImmoTopia s'utilise dans le navigateur, sans application mobile native.",
        },
        {
          title: "Supprimer un état des lieux",
          goal: "Effacer un état des lieux qui n'est pas finalisé, avec ses photos.",
        },
        {
          title: "Comparer l'entrée et la sortie",
          goal: "Voir, élément par élément, l'état à l'entrée, l'état à la sortie et ce qui s'est dégradé.",
          output: "Un tableau comparatif, affiché même si un seul des deux états des lieux existe.",
        },
        {
          title: "Ajouter et gérer les photos",
          goal: "Illustrer chaque pièce, et si besoin chaque élément, par des photos, puis les consulter ou les supprimer.",
          input: "Une photo (JPEG, PNG ou WebP, 10 Mo au plus), la pièce ou l'élément concerné et une légende.",
          prereq: "Une fois l'état des lieux finalisé, on ne peut plus ajouter ni supprimer de photo.",
        },
      ],
      faq: [
        {
          q: "Peut-on joindre des photos à l'état des lieux ?",
          a: "Oui, pièce par pièce. Chaque photo (JPEG, PNG ou WebP, 10 Mo au plus) se rattache à une pièce ou à un élément, avec une légende.",
        },
        {
          q: "L'état des lieux de sortie reprend-il celui d'entrée ?",
          a: "Oui. À sa création, les pièces et éléments de l'entrée sont repris, prêts à être remplis. Un tableau compare ensuite les deux, élément par élément.",
        },
        {
          q: "Peut-on le signer et l'envoyer au locataire ?",
          a: "Oui pour la signature : elle se fait par voie électronique, avec le nom des signataires de l'agence et du locataire. Une fois finalisé, l'état des lieux peut aussi être envoyé aux signataires pour signature électronique, ou signé sur place : cet envoi demande l'extension payante « Signatures électroniques », décrite dans la page Tarifs. Vous pouvez aussi l'exporter en PDF (ou l'imprimer) pour le transmettre vous-même au locataire.",
        },
        {
          q: "Peut-on le faire depuis un téléphone ?",
          a: "Oui. ImmoTopia est une application web : vous remplissez l'état des lieux depuis le navigateur d'un téléphone ou d'une tablette, sur place, avec les photos pièce par pièce. Il n'existe pas d'application mobile native, et une connexion Internet est nécessaire.",
        },
        {
          q: "Peut-on corriger un état des lieux une fois finalisé ?",
          a: "Non. Tant qu'il est en brouillon, vous le modifiez librement ; une fois finalisé, il est verrouillé et les photos ne peuvent plus être ajoutées ni supprimées.",
        },
      ],
      related: [
        "gestion-locative/vie-du-bail",
        "gestion-locative/depot-de-garantie",
        "gestion-locative/gestion-des-baux",
        "gestion-locative/signature-electronique",
      ],
    },
    {
      slug: "depot-de-garantie",
      title: "Dépôt de garantie",
      metaTitle: "Dépôt de garantie (caution) : encaissement et restitution",
      summary:
        "Suivez la caution de chaque bail : montant attendu, encaissé, retenu et restitué. Chaque mouvement du dépôt de garantie est tracé et reste consultable.",
      intro:
        "La caution est souvent source de litiges en fin de bail. ImmoTopia tient pour chaque bail le montant attendu, encaissé, retenu, restitué ou conservé, et garde l'historique de chaque mouvement. Vous répondez au bailleur comme au locataire, chiffres à l'appui.",
      sections: [
        {
          title: "Encaisser, suivre et restituer le dépôt de garantie",
          body: [
            "À l'entrée dans les lieux, vous enregistrez le dépôt de garantie encaissé : il se constate en une seule fois, pour le montant prévu au bail, rattaché au paiement du locataire. Vous suivez ensuite à tout moment le montant attendu, encaissé, retenu, restitué et le solde détenu, sans refaire de calcul.",
            "À la fin du bail, la restitution s'appuie sur l'[état des lieux de sortie](/wiki/gestion-locative/etats-des-lieux), qui compare l'état du logement à celui de l'entrée. Vous retenez ce que justifient les dégradations constatées, puis vous restituez le solde au locataire, en une ou plusieurs fois, dans la limite du solde détenu. Chaque mouvement reste dans l'historique du dépôt.",
          ],
        },
      ],
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › Dépôt de garantie",
      status: "disponible",
      actions: [
        {
          title: "Consulter le dépôt de garantie",
          goal: "Voir où en est la caution d'un bail.",
          output:
            "Le montant attendu, encaissé, retenu, restitué, conservé et le solde détenu. Le dépôt se crée de lui-même à la première consultation si le bail prévoit une caution.",
        },
        {
          title: "Enregistrer l'encaissement de la caution",
          goal: "Constater que le locataire a versé sa caution.",
          input: "Le montant, le paiement correspondant, le moyen de paiement et une note.",
          prereq: "La caution s'encaisse en une seule fois, pour le montant prévu au bail, rattachée à un paiement.",
        },
        {
          title: "Restituer la caution",
          goal: "Débloquer puis rembourser au locataire tout ou partie de sa caution.",
          input: "Le montant, le moyen de paiement et une note.",
          prereq: "Le montant remboursé ne dépasse pas le solde détenu.",
        },
        {
          title: "Retenir ou conserver une partie de la caution",
          goal: "Bloquer une somme sur le dépôt, la libérer, conserver tout ou partie de la caution, ou corriger un montant. Le solde détenu tient compte de chaque mouvement, une seule fois.",
          input: "Le type de mouvement, le montant et une note.",
          prereq: "Le montant conservé ou remboursé ne dépasse pas le solde détenu.",
        },
        {
          title: "Consulter l'historique des mouvements",
          goal: "Voir tous les mouvements d'un dépôt, avec le paiement ou l'échéance liés.",
        },
      ],
      faq: [
        {
          q: "Peut-on rendre seulement une partie de la caution ?",
          a: "Oui. Vous enregistrez le remboursement du montant voulu, dans la limite du solde détenu, et le mouvement s'ajoute à l'historique du dépôt.",
        },
      ],
      related: [
        "gestion-locative/etats-des-lieux",
        "gestion-locative/gestion-des-baux",
        "gestion-locative/vie-du-bail",
        "gestion-locative/encaissement-des-loyers",
      ],
    },
    {
      slug: "quittances-et-documents-locatifs",
      title: "Contrats et quittances",
      metaTitle: "Quittance de loyer et contrat de bail : génération en ligne",
      summary:
        "Générez contrats de bail, avenants, quittances, reçus de loyer, reçus de caution et relevés, numérotés à la suite et classés avec chaque bail.",
      intro:
        "Les documents remis au locataire et au bailleur se créent depuis la fiche du bail, sans ressaisie. Chaque document reçoit un numéro d'ordre et reste rattaché au bail, à l'échéance ou au paiement concerné. Vous retrouvez en quelques secondes la quittance d'un mois donné.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › Documents",
      status: "disponible",
      actions: [
        {
          title: "Générer un document locatif",
          goal: "Émettre un contrat de bail, un avenant, une quittance, un reçu de loyer, un reçu de caution, un relevé ou un autre document.",
          input: "Le type de document, le bail, l'échéance ou le paiement concerné, un titre et une description.",
          output: "Un document en brouillon, numéroté à la suite (année et numéro d'ordre).",
        },
        {
          title: "Retrouver un document",
          goal: "Consulter les documents émis, filtrés par type, statut, bail, échéance ou paiement.",
        },
        {
          title: "Valider ou annuler un document",
          goal: "Passer un document de brouillon à définitif, ou l'annuler s'il est erroné.",
        },
      ],
      faq: [
        {
          q: "Quels documents peut-on générer ?",
          a: "Le contrat de bail, l'avenant, la quittance de loyer, le reçu de loyer, le reçu de dépôt de garantie, le relevé, et tout autre document rattaché au bail.",
        },
      ],
      related: ["gestion-locative/gestion-des-baux", "gestion-locative/encaissement-des-loyers"],
    },
    {
      slug: "echeancier-des-loyers",
      title: "Échéancier des loyers",
      metaTitle: "Échéancier des loyers : suivi des échéances et impayés",
      summary:
        "Générez en un clic toutes les échéances d'un bail, loyer et charges compris, puis suivez celles qui sont dues, en retard, partiellement payées ou soldées.",
      intro:
        "L'échéancier transforme le bail en appels de loyer, période par période, selon la fréquence choisie. Vous voyez d'un coup d'œil qui doit quoi, et depuis quand. Les échéances devenues exigibles sont reportées au compte du locataire, ce qui prépare l'encaissement et le calcul des pénalités.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Encaisser › Échéances",
      status: "disponible",
      actions: [
        {
          title: "Générer les échéances d'un bail",
          goal: "Créer toutes les échéances du bail, loyer et charges, selon sa fréquence de facturation. Elles démarrent en brouillon et sont émises par la facturation du mois.",
          output: "Une échéance par période jusqu'à la fin du bail, ou sur 12 mois pour un bail sans date de fin.",
          prereq: "Le bail n'est ni annulé ni terminé et n'a pas encore d'échéances.",
        },
        {
          title: "Suivre les échéances",
          goal: "Filtrer les échéances par bail, locataire, statut, année ou mois, ou n'afficher que celles en retard.",
          output: "La liste des échéances et, pour chacune, les paiements affectés et les pénalités.",
        },
        {
          title: "Mettre à jour les statuts",
          goal: "Recalculer le statut des échéances d'un bail : brouillon, due, en retard, partiellement payée ou payée.",
          output: "Les échéances devenues exigibles sont inscrites au compte du locataire.",
        },
        {
          title: "Passer automatiquement les échéances échues en retard",
          goal: "Chaque nuit, appliquer les révisions de loyer arrivées à date, puis faire passer « en retard » les échéances échues et non soldées, avant le calcul des pénalités. Les listes reclassent aussi le statut à l'affichage.",
          output: "Les échéances en retard et les pénalités sont à jour chaque matin, sans action de votre part.",
        },
        {
          title: "Supprimer les échéances d'un bail",
          goal: "Effacer toutes les échéances d'un bail pour les régénérer sur de bonnes bases.",
          output: "Les échéances sont supprimées et le compte du locataire est remis à jour.",
          prereq: "Aucun paiement n'est affecté à ces échéances, et le bail n'est pas terminé depuis moins de 30 jours.",
        },
      ],
      faq: [
        {
          q: "Et pour un bail sans date de fin ?",
          a: "Les échéances sont générées sur 12 mois. Pour un bail à durée déterminée, elles vont jusqu'à la date de fin.",
        },
      ],
      related: [
        "gestion-locative/encaissement-des-loyers",
        "gestion-locative/penalites-de-retard",
        "gestion-locative/gestion-des-baux",
      ],
    },
    {
      slug: "encaissement-des-loyers",
      title: "Encaissement des loyers",
      metaTitle: "Encaissement des loyers : espèces, virement, Mobile Money",
      summary:
        "Enregistrez les loyers reçus en espèces, virement, chèque ou Mobile Money, affectez-les aux échéances et validez les paiements déclarés par vos locataires.",
      intro:
        "Chaque règlement reçu d'un locataire est saisi avec son moyen de paiement, y compris Mobile Money avec l'opérateur et le numéro utilisés. Vous l'affectez ensuite à une ou plusieurs échéances ; le surplus reste en avance au compte du locataire. Les paiements déclarés par les locataires depuis leur portail arrivent dans une liste où votre équipe les approuve ou les rejette. Les loyers peuvent aussi être prélevés sur le compte bancaire du locataire : voir [Prélèvement bancaire des loyers](/wiki/gestion-locative/prelevement-bancaire).",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Encaisser › Paiements",
      status: "disponible",
      actions: [
        {
          title: "Enregistrer un paiement",
          goal: "Saisir un règlement reçu d'un locataire.",
          input:
            "Le moyen de paiement (espèces, virement, chèque, Mobile Money, carte ou autre), le montant, le bail ou le locataire, la date et, pour Mobile Money, l'opérateur et le numéro de téléphone.",
          output: "Un paiement enregistré. La part non affectée est inscrite en avance au compte du locataire.",
        },
        {
          title: "Consulter les paiements",
          goal: "Retrouver un règlement par bail, locataire, statut, moyen de paiement ou période, et voir son détail.",
          output: "Les échéances couvertes par le paiement et son lien éventuel avec le dépôt de garantie.",
        },
        {
          title: "Affecter un paiement aux échéances",
          goal: "Répartir tout ou partie d'un règlement sur une ou plusieurs échéances.",
          input: "Les échéances à couvrir et, si vous le souhaitez, le montant pour chacune. Sinon, la répartition se fait d'elle-même.",
          output: "Le statut des échéances est mis à jour.",
          prereq: "Le paiement n'est pas déjà entièrement affecté.",
        },
        {
          title: "Changer le statut d'un paiement",
          goal: "Confirmer un paiement, l'annuler, ou le marquer en échec ou remboursé.",
          output: "Un paiement annulé ou en échec libère les échéances qu'il couvrait, et leur statut est recalculé.",
        },
        {
          title: "Vérifier un paiement en ligne",
          goal: "Redemander à la passerelle de paiement le statut d'un règlement fait en ligne. Le paiement réel en ligne n'est pas encore validé.",
          output: "Le statut et le montant du paiement en ligne, mis à jour.",
          status: "deploiement",
        },
        {
          title: "Consulter les déclarations de paiement",
          goal: "Voir les règlements que les locataires ont déclarés depuis leur portail et qui attendent votre contrôle.",
          output: "Chaque déclaration, avec la preuve jointe par le locataire.",
        },
        {
          title: "Approuver une déclaration de paiement",
          goal: "Valider un règlement déclaré par un locataire : le paiement correspondant est créé.",
          input: "Une note de contrôle, si besoin.",
          output: "La déclaration est approuvée et le paiement est enregistré, puis affecté le cas échéant.",
          prereq: "La déclaration n'a pas encore été traitée.",
        },
        {
          title: "Rejeter une déclaration de paiement",
          goal: "Refuser un règlement déclaré, par exemple pour une preuve non valable ou un doublon.",
          input: "Le motif du refus, obligatoire.",
          prereq: "La déclaration n'a pas encore été traitée.",
        },
      ],
      faq: [
        {
          q: "Les paiements Mobile Money sont-ils pris en charge ?",
          a: "Oui. Vous enregistrez le paiement avec l'opérateur et le numéro utilisés. Le locataire peut aussi déclarer son paiement depuis son portail, avec une preuve, et votre équipe le valide.",
        },
        {
          q: "Que devient un trop-perçu ?",
          a: "La part d'un paiement qui n'est affectée à aucune échéance est inscrite comme avance au compte du locataire.",
        },
      ],
      related: [
        "gestion-locative/echeancier-des-loyers",
        "gestion-locative/penalites-de-retard",
        "gestion-locative/liens-de-paiement-loyer",
        "gestion-locative/prelevement-bancaire",
        "portails-clients/portail-locataire",
      ],
    },
    {
      slug: "prelevement-bancaire",
      title: "Prélèvement bancaire des loyers",
      h1: "Prélever les loyers par prélèvement bancaire",
      metaTitle: "Prélèvement bancaire des loyers : mandats et remises",
      summary:
        "Prélevez les loyers par la banque : créanciers, mandats signés, remises mensuelles, prénotification des locataires et fichier à charger, sans commission.",
      intro:
        "Le prélèvement bancaire est inclus dans la gestion locative, sans commission d'ImmoTopia. Votre agence déclare un compte bancaire comme créancier, enregistre l'autorisation de prélèvement signée de chaque locataire, prépare chaque mois une remise des loyers à prélever, prévient les locataires avant la date, puis produit le fichier qu'elle charge sur sa banque en ligne. Pour les autres moyens de paiement, voir [Encaissement des loyers](/wiki/gestion-locative/encaissement-des-loyers).",
      sections: [
        {
          title: "Les étapes d'un prélèvement",
          body: [
            [
              "Le créancier : vous déclarez le compte bancaire de l'agence qui reçoit les prélèvements, avec son numéro d'émetteur et son jour de collecte.",
              "Le mandat : vous enregistrez l'IBAN du locataire sur son bail, imprimez l'autorisation, la faites signer et déposez le scan, puis vous activez le mandat.",
              "La remise : chaque mois, vous préparez la liste des loyers à prélever à une date donnée et vous la vérifiez ligne par ligne.",
              "La validation : vous arrêtez la remise, et chaque locataire est prévenu par e-mail avant le prélèvement.",
              "Le fichier : vous produisez le fichier de remise, vous le chargez sur la banque en ligne de l'agence, puis vous marquez la remise comme déposée.",
            ],
          ],
        },
        {
          title: "Où trouver chaque écran",
          body: [
            [
              "Les créanciers : Paramètres › Paramètres financiers › Prélèvement bancaire.",
              "Les mandats : Baux › Détail du bail › Prélèvements, et la liste de tous les mandats dans Encaisser › Prélèvements.",
              "Les remises : Encaisser › Prélèvements › Remises.",
              "La notification envoyée aux locataires : Communication › Notifications e-mail.",
            ],
          ],
        },
        {
          title: "La prénotification du locataire",
          body: [
            "Avant tout prélèvement, chaque locataire reçoit un e-mail qui indique le montant, la date, la référence du mandat, le numéro d'émetteur et son IBAN masqué. Le délai de prénotification se règle sur le créancier, en jours ouvrés, et une remise ne peut plus être validée une fois sa date limite de prénotification passée.",
            "Chaque ligne de la remise indique si la prénotification est envoyée, impossible faute d'adresse e-mail, désactivée ou en échec. Vous pouvez renvoyer celles qui n'ont pas pu partir.",
          ],
        },
        {
          title: "Confidentialité de l'IBAN",
          body: [
            "L'IBAN d'un locataire n'est jamais affiché en entier dans les listes ni dans les e-mails. Il n'apparaît complet que sur l'autorisation de prélèvement à faire signer et dans le fichier de remise destiné à votre banque.",
          ],
        },
      ],
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Encaisser › Prélèvements",
      status: "disponible",
      actions: [
        {
          title: "Lister les créanciers de prélèvement",
          goal: "Voir les comptes bancaires de l'agence qui reçoivent les prélèvements.",
          output:
            "Pour chaque créancier : le compte bancaire, le numéro d'émetteur, le jour de collecte, le délai de prénotification, les frais de rejet, le seuil de suspension, son état actif ou non et le nombre de mandats ouverts.",
        },
        {
          title: "Créer un créancier",
          goal: "Déclarer un compte bancaire de l'agence comme créancier de prélèvement.",
          input:
            "Le compte bancaire de l'agence, un libellé, le numéro d'émetteur, le jour de collecte dans le mois (de 1 à 28, le 5 par défaut), le délai de prénotification en jours ouvrés (5 par défaut), les frais de rejet et le seuil de suspension, en nombre de rejets consécutifs (2 par défaut).",
          output: "Un créancier prêt à recevoir des mandats. Un compte bancaire n'a qu'un seul créancier.",
          prereq: "Un compte bancaire actif de l'agence est enregistré en trésorerie.",
        },
        {
          title: "Modifier ou désactiver un créancier",
          goal: "Changer les réglages d'un créancier ou le désactiver.",
          input: "Les mêmes informations que pour la création, sauf le compte bancaire, et l'état actif ou non.",
          output: "Le créancier mis à jour.",
        },
        {
          title: "Contrôler un IBAN ou un RIB",
          goal: "Vérifier la saisie d'un compte bancaire avant de créer le mandat.",
          input: "Un IBAN ivoirien (28 caractères) ou un RIB (24 caractères).",
          output: "La validité, l'IBAN masqué, le code de la banque et, le cas échéant, l'erreur ou les avertissements, par exemple sur la clé du RIB.",
        },
        {
          title: "Lister les mandats de prélèvement",
          goal: "Retrouver les mandats de l'agence, ou ceux d'un bail seulement.",
          input: "Des filtres par bail, locataire, créancier ou statut, et une recherche.",
          output:
            "Les mandats avec leur référence (de la forme MDT-année-numéro), leur statut, le locataire, le bail, l'IBAN masqué, le plafond et le jour de collecte.",
        },
        {
          title: "Créer un mandat de prélèvement",
          goal: "Enregistrer l'autorisation de prélèvement d'un locataire sur un bail.",
          input:
            "Le créancier, le bail, le locataire concerné (principal ou colocataire), l'IBAN, le nom du titulaire du compte, un plafond, un jour de collecte et des notes.",
          output: "Un mandat en brouillon, avec les avertissements éventuels. Un bail n'a qu'un seul mandat ouvert par créancier.",
          prereq: "Un créancier existe et le bail n'est pas terminé.",
        },
        {
          title: "Modifier un mandat",
          goal: "Changer le plafond, le jour de collecte ou les notes d'un mandat.",
          input: "Le plafond, le jour de collecte, les notes. L'IBAN ne se modifie pas : il faut révoquer le mandat puis en créer un nouveau.",
          output: "Le mandat mis à jour.",
          prereq: "Le mandat n'est pas révoqué.",
        },
        {
          title: "Télécharger l'autorisation de prélèvement en PDF",
          goal: "Imprimer l'autorisation préremplie, à faire signer par le locataire puis à déposer à sa banque.",
          output: "Un PDF avec le créancier, le locataire, l'IBAN complet, la référence et le plafond. Il est produit à la demande et n'est pas conservé.",
          prereq: "Le mandat est créé.",
        },
        {
          title: "Déposer ou consulter le scan signé",
          goal: "Archiver l'autorisation signée avec le mandat, et la retrouver au besoin.",
          input: "Le scan de l'autorisation signée (PDF, JPEG ou PNG, 10 Mo au plus).",
          output: "Un scan privé, consultable seulement par les collaborateurs connectés.",
          prereq: "Le mandat est créé et n'est pas révoqué.",
        },
        {
          title: "Activer un mandat",
          goal: "Rendre le mandat utilisable une fois l'autorisation signée.",
          input: "La date de signature, qui ne peut pas être dans le futur.",
          output: "Un mandat actif, dont les loyers peuvent entrer dans une remise.",
          prereq: "Le scan signé est déposé.",
        },
        {
          title: "Suspendre ou réactiver un mandat",
          goal: "Interrompre les prélèvements d'un locataire, puis les reprendre.",
          input: "Le motif de la suspension.",
          output: "Le mandat suspendu, ou de nouveau actif.",
          prereq: "Le mandat est actif pour le suspendre, suspendu pour le réactiver.",
        },
        {
          title: "Révoquer un mandat",
          goal: "Mettre fin définitivement à l'autorisation de prélèvement.",
          input: "Le motif et, si besoin, la date de révocation.",
          output: "Le mandat révoqué, définitivement. Un nouveau mandat peut ensuite être créé sur le bail.",
          prereq: "Le mandat n'est pas déjà révoqué.",
        },
        {
          title: "Lister et consulter les remises",
          goal: "Suivre les remises de loyers prélevés d'un créancier et leur avancement.",
          input: "Des filtres par créancier et par statut.",
          output:
            "Les remises avec leur référence (de la forme PRL-année-numéro), leur statut, la date de prélèvement, la période, le total et la date limite de prénotification. Le détail donne, ligne par ligne, le locataire, le bail, le mandat avec l'IBAN masqué, le reste dû, le montant prélevé, le plafond et l'état de la prénotification.",
          prereq: "Un créancier existe et au moins un mandat est actif.",
        },
        {
          title: "Préparer une remise de prélèvement",
          goal: "Créer le brouillon des loyers à prélever pour un créancier à une date donnée.",
          input: "Le créancier, la date de prélèvement (assez éloignée pour laisser le temps de prénotifier) et des notes.",
          output:
            "Un brouillon avec une ligne par mandat actif dont le jour de collecte est atteint. Le montant est le reste dû de l'échéance du mois, hors pénalités, plafonné par le mandat. Les mandats non retenus sont listés avec la raison.",
          prereq: "Un mandat est actif et l'échéance du mois est générée.",
        },
        {
          title: "Actualiser une remise en brouillon",
          goal: "Recalculer les montants et ajouter les mandats devenus éligibles, avant de valider.",
          output: "Le brouillon recalculé : les lignes devenues sans objet sont retirées et les montants mis à jour.",
          prereq: "La remise est en brouillon.",
        },
        {
          title: "Retirer une ligne d'une remise",
          goal: "Exclure une échéance de la remise avant la production du fichier.",
          input: "Un motif, facultatif.",
          output: "La ligne est annulée et les totaux recalculés. L'échéance pourra entrer dans une autre remise.",
          prereq: "La remise est en brouillon ou validée.",
        },
        {
          title: "Valider une remise et prénotifier les locataires",
          goal: "Arrêter la remise, après votre vérification, et prévenir chaque locataire avant le prélèvement.",
          output:
            "Une remise validée, avec le créancier et son numéro d'émetteur figés. Chaque locataire reçoit un e-mail de prénotification, et chaque ligne indique si l'envoi est fait, impossible faute d'e-mail, désactivé ou en échec.",
          prereq: "Le numéro d'émetteur du créancier est renseigné et la date limite de prénotification n'est pas passée.",
        },
        {
          title: "Renvoyer les prénotifications d'une remise",
          goal: "Relancer les prénotifications qui n'ont pas pu partir.",
          output: "Les prénotifications renvoyées aux lignes pas encore prévenues, avec un résumé par état.",
          prereq: "La remise est validée.",
        },
        {
          title: "Produire le fichier de remise",
          goal: "Obtenir le fichier à charger sur la banque en ligne de l'agence.",
          output:
            "Un fichier CSV à séparateur point-virgule, avec une ligne par prélèvement : référence d'opération, mandat, titulaire, IBAN, montant, date d'échéance et libellé. Le fichier n'est pas conservé, et la remise passe à « fichier produit ».",
          prereq: "La remise est validée.",
        },
        {
          title: "Marquer une remise comme déposée à la banque",
          goal: "Garder la trace du chargement du fichier sur la banque en ligne.",
          output: "La remise est marquée « déposée à la banque », avec sa date.",
          prereq: "Le fichier de remise est produit.",
        },
        {
          title: "Annuler une remise",
          goal: "Abandonner une remise qui n'a pas encore été déposée à la banque.",
          input: "Le motif, obligatoire.",
          output: "La remise est annulée et toutes ses lignes sont libérées.",
          prereq: "La remise n'est pas déposée à la banque.",
        },
        {
          title: "Configurer la notification « Prénotification de prélèvement »",
          goal: "Activer, désactiver ou personnaliser l'e-mail qui prévient le locataire d'un prochain prélèvement. Cette notification part par e-mail seulement, pas par WhatsApp.",
          input: "L'activation, l'objet et le texte de l'e-mail, qu'un retour au texte d'origine permet d'annuler.",
          output: "La notification réglée pour votre agence. Elle reprend le montant, la date, le mandat, le numéro d'émetteur et l'IBAN masqué.",
        },
      ],
      faq: [
        {
          q: "ImmoTopia prend-il une commission sur les prélèvements ?",
          a: "Non. Le prélèvement bancaire est inclus dans la gestion locative, sans commission d'ImmoTopia.",
        },
        {
          q: "ImmoTopia débite-t-il lui-même le compte du locataire ?",
          a: "Non. ImmoTopia prépare la remise et produit le fichier ; c'est votre agence qui le charge sur sa banque en ligne, puis marque la remise comme déposée.",
        },
        {
          q: "Le locataire est-il prévenu avant le prélèvement ?",
          a: "Oui. Quand la remise est validée, chaque locataire reçoit un e-mail de prénotification avec le montant, la date et son IBAN masqué. Vous pouvez renvoyer ceux qui n'ont pas pu partir.",
        },
        {
          q: "Peut-on corriger l'IBAN d'un mandat ?",
          a: "Non. L'IBAN ne se modifie pas : vous révoquez le mandat, puis vous en créez un nouveau avec la bonne coordonnée bancaire.",
        },
      ],
      related: [
        "gestion-locative/encaissement-des-loyers",
        "gestion-locative/echeancier-des-loyers",
        "gestion-locative/gestion-des-baux",
        "communication-et-documents/notifications-email-whatsapp",
      ],
    },
    {
      slug: "penalites-de-retard",
      title: "Pénalités de retard",
      metaTitle: "Pénalités de retard de loyer : calcul et remise en ligne",
      summary:
        "Calculez les pénalités de retard selon les règles du bail, une échéance à la fois ou en masse, accordez des remises motivées et joignez les justificatifs.",
      intro:
        "Les règles de pénalité se fixent dans chaque bail : taux ou montant fixe, plafond et jours de grâce. ImmoTopia calcule la pénalité due sur chaque échéance en retard et l'inscrit au compte du locataire. Vous gardez la main : une remise se fait avec un motif, et un justificatif peut être joint.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › Pénalités",
      status: "disponible",
      actions: [
        {
          title: "Calculer les pénalités de retard",
          goal: "Chiffrer la pénalité d'une échéance en retard, ou lancer le calcul pour toutes les échéances en retard de l'agence.",
          output:
            "Les pénalités sont créées ou mises à jour, inscrites au compte du locataire, et le statut des échéances est recalculé.",
          prereq:
            "L'échéance est en retard au-delà des jours de grâce. Une pénalité déjà ajustée à la main n'est pas recalculée.",
        },
        {
          title: "Consulter les pénalités",
          goal: "Voir les pénalités d'un bail ou d'une échéance, et le détail de chacune.",
        },
        {
          title: "Accorder une remise",
          goal: "Réduire ou annuler tout ou partie d'une pénalité calculée.",
          input: "Le nouveau montant et le motif, obligatoire.",
          output: "La pénalité est ajustée, le compte du locataire est corrigé et elle ne sera plus recalculée.",
        },
        {
          title: "Supprimer une pénalité",
          goal: "Retirer une pénalité : l'échéance et le compte du locataire sont remis à jour.",
        },
        {
          title: "Joindre un justificatif",
          goal: "Attacher un justificatif à une pénalité, ou le télécharger.",
          input: "Un fichier PDF, Word, JPEG ou PNG.",
        },
      ],
      faq: [
        {
          q: "Comment les pénalités sont-elles calculées ?",
          a: "Selon les règles saisies dans le bail : taux ou montant fixe, plafond et jours de grâce. Le calcul se lance pour une échéance ou pour toutes les échéances en retard.",
        },
        {
          q: "Peut-on faire un geste pour un locataire ?",
          a: "Oui. Vous ajustez ou supprimez la pénalité en indiquant un motif ; le compte du locataire est corrigé.",
        },
      ],
      related: ["gestion-locative/echeancier-des-loyers", "gestion-locative/gestion-des-baux"],
    },
    {
      slug: "releves-de-gerance",
      title: "Relevés de gérance",
      metaTitle: "Relevé de gérance propriétaire : logiciel en Côte d'Ivoire",
      summary:
        "Produisez chaque mois le relevé de gérance de vos propriétaires : loyers encaissés, honoraires, dépenses et retenues par bien, puis transmettez-le au bailleur.",
      intro:
        "Le relevé de gérance rend compte au propriétaire de ce que l'agence a fait pour lui pendant le mois. ImmoTopia le calcule à partir des biens choisis : loyers encaissés, honoraires, dépenses, retenues et solde. Plus besoin de le monter à la main dans un tableur.",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Patrimoine › Relevés",
      status: "disponible",
      actions: [
        {
          title: "Générer un relevé",
          goal: "Calculer le relevé mensuel d'un propriétaire pour les biens choisis.",
          input: "Le propriétaire, le mois et les biens concernés.",
          output:
            "Un relevé avec les loyers encaissés, les honoraires, les dépenses, les retenues et le solde. Relancer la génération recalcule le relevé.",
          prereq: "Le relevé du même mois n'est pas déjà réglé.",
        },
        {
          title: "Consulter les relevés",
          goal: "Retrouver les relevés d'un propriétaire ou d'un mois.",
          output: "Le détail de chaque relevé, bien par bien : honoraires, dépenses et retenues.",
        },
        {
          title: "Ajuster un relevé",
          goal: "Corriger à la main un relevé encore modifiable.",
        },
        {
          title: "Recalculer un relevé",
          goal: "Refaire le calcul d'un relevé ancien avec la méthode de calcul actuelle, sur ses biens et son mois d'origine.",
        },
        {
          title: "Envoyer le relevé au propriétaire",
          goal: "Transmettre le relevé au propriétaire ; il passe au statut « envoyé ».",
          prereq:
            "Un relevé calculé avec une ancienne méthode doit d'abord être recalculé. Le propriétaire doit avoir accepté de recevoir des messages par e-mail.",
        },
        {
          title: "Envoyer le rapport du mois au propriétaire",
          goal: "Envoyer au propriétaire un lien vers le rapport mensuel de son relevé, par son canal préféré (WhatsApp ou e-mail), un seul canal par message.",
          output:
            "Le propriétaire reçoit le lien. Si aucun envoi n'aboutit, le lien est retiré automatiquement et vous voyez la raison.",
          prereq:
            "Le relevé n'est plus un brouillon et n'est pas calculé avec une ancienne méthode. Le propriétaire a donné son accord pour WhatsApp ou l'e-mail. L'envoi par WhatsApp se règle dans la configuration de l'agence.",
        },
        {
          title: "Créer et copier un lien de rapport mensuel",
          goal: "Obtenir un lien en lecture seule vers le rapport mensuel d'un relevé, pour le transmettre vous-même au propriétaire.",
          input: "La durée de validité, de 1 à 30 jours (7 par défaut).",
          output: "Un lien et sa date d'expiration. Le lien complet n'est affiché qu'à la création.",
          prereq: "Le relevé n'est plus un brouillon et n'est pas calculé avec une ancienne méthode.",
        },
        {
          title: "Voir les liens actifs d'un relevé",
          goal: "Contrôler les liens encore valides d'un relevé.",
          output: "Pour chaque lien : sa création, son expiration, le nombre de consultations et la dernière consultation.",
        },
        {
          title: "Révoquer un lien de rapport",
          goal: "Rendre un lien inutilisable immédiatement, par exemple s'il a été envoyé à la mauvaise personne.",
        },
      ],
      faq: [
        {
          q: "Que contient un relevé de gérance ?",
          a: "Pour chaque bien : les loyers encaissés, les honoraires, les dépenses et les retenues, puis le solde du mois.",
        },
      ],
      related: [
        "gestion-locative/reversements-aux-proprietaires",
        "gestion-locative/honoraires-de-gestion",
        "portails-clients/portail-proprietaire",
        "portails-clients/rapport-mensuel-proprietaire",
      ],
    },
    {
      slug: "reversements-aux-proprietaires",
      title: "Reversements aux propriétaires",
      metaTitle: "Reversement des loyers aux propriétaires : compte courant",
      summary:
        "Suivez le compte courant de chaque propriétaire (loyers encaissés, honoraires, TVA, dépenses) et enregistrez le reversement du solde qui lui est dû.",
      intro:
        "Pour chaque propriétaire, ImmoTopia tient un compte courant : loyers encaissés, moins honoraires, TVA, dépenses et reversements déjà faits. Vous savez à tout moment combien vous lui devez. Le reversement s'enregistre en quelques clics, et une erreur se corrige par une annulation motivée. Les packs Patrimoine ne comprennent pas cette fonction (pas de propriétaire tiers).",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Finance › Clients et propriétaires › Reversements et commissions › Comptes propriétaires",
      status: "disponible",
      actions: [
        {
          title: "Consulter les comptes propriétaires",
          goal: "Voir, pour chaque propriétaire, le solde dû : loyers encaissés moins honoraires, TVA, dépenses et reversements.",
          output:
            "Le solde dû, les totaux par nature, le détail des mouvements et l'historique des reversements. Le compte se met à jour à chaque consultation.",
        },
        {
          title: "Reverser un propriétaire",
          goal: "Enregistrer le paiement au propriétaire de tout ou partie de son solde.",
          input:
            "Le montant, la date (jamais dans le futur), le moyen de paiement, une référence, une note et, si besoin, le relevé concerné.",
          output:
            "Un reversement numéroté, l'écriture comptable correspondante et, le cas échéant, le relevé lié marqué comme réglé.",
          prereq: "Le montant ne dépasse pas le solde dû au propriétaire.",
        },
        {
          title: "Annuler un reversement",
          goal: "Défaire un reversement enregistré par erreur.",
          input: "Le motif de l'annulation.",
          output: "Le reversement est annulé, son écriture comptable est contre-passée et le relevé lié redevient dû.",
        },
      ],
      faq: [
        {
          q: "Peut-on reverser plus que le solde dû ?",
          a: "Non. Le montant d'un reversement ne peut pas dépasser le solde dû au propriétaire.",
        },
      ],
      related: [
        "gestion-locative/releves-de-gerance",
        "gestion-locative/honoraires-de-gestion",
        "portails-clients/portail-proprietaire",
      ],
    },
    {
      slug: "honoraires-de-gestion",
      title: "Honoraires et commissions",
      metaTitle: "Honoraires de gestion locative et commissions des agents",
      summary:
        "Paramétrez les honoraires de gestion par agence, propriétaire ou bail, désignez le gestionnaire de chaque bail et suivez chaque mois les commissions des agents.",
      intro:
        "Les honoraires de gestion se règlent à trois niveaux : les réglages de l'agence, puis une dérogation par propriétaire, puis une dérogation par bail, qui l'emporte. Chaque bail peut avoir son gestionnaire attitré, et chaque collaborateur sa part de commission. Chaque mois, l'état des commissions montre ce que rapportent les honoraires, et à qui. Les honoraires par propriétaire et la commission des collaborateurs se règlent dans les paramètres financiers de l'agence. Les packs Patrimoine ne comprennent pas cette fonction (pas de propriétaire tiers).",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Paramétrage › Agence › Paramètres financiers",
      status: "disponible",
      actions: [
        {
          title: "Configurer les honoraires d'un propriétaire",
          goal: "Fixer, pour un propriétaire, le mode d'honoraires, la base de calcul et son statut fiscal pour la retenue à la source.",
          input: "Un taux ou un montant fixe, la base de calcul, et le statut du propriétaire : particulier, société ou exonéré.",
          output: "Les conditions d'honoraires du propriétaire, qui priment sur celles de l'agence.",
        },
        {
          title: "Revenir aux honoraires de l'agence",
          goal: "Supprimer les conditions propres à un propriétaire : les réglages de l'agence s'appliquent de nouveau.",
        },
        {
          title: "Configurer les honoraires d'un bail",
          goal: "Fixer pour un bail précis un mode d'honoraires particulier et désigner le collaborateur qui le gère.",
          input: "Le mode, le taux ou le montant fixe, la base de calcul et le gestionnaire. Chaque réglage peut être retiré.",
          output:
            "Les conditions qui s'appliquent réellement au bail : celles du bail, sinon celles du propriétaire, sinon celles de l'agence.",
          prereq: "Le gestionnaire choisi est un collaborateur actif de l'agence.",
        },
        {
          title: "Fixer la commission des collaborateurs",
          goal: "Définir la part des honoraires, en pourcentage, qui revient à chaque collaborateur actif.",
          input: "Un pourcentage de 0 à 100, ou rien pour retirer la commission.",
        },
        {
          title: "Consulter l'état des commissions",
          goal: "Voir, pour un mois donné, les honoraires générés par bail et la part de chaque gestionnaire.",
          output:
            "Les totaux (honoraires hors taxes, TVA, part des collaborateurs, part non attribuée) et le détail par collaborateur et par bail.",
          prereq: "La commission des collaborateurs est paramétrée.",
        },
      ],
      faq: [
        {
          q: "Peut-on appliquer des honoraires différents à un propriétaire ?",
          a: "Oui. Les conditions d'un propriétaire priment sur celles de l'agence, et celles d'un bail priment sur celles du propriétaire.",
        },
      ],
      related: [
        "gestion-locative/reversements-aux-proprietaires",
        "gestion-locative/releves-de-gerance",
        "gestion-locative/gestion-des-baux",
      ],
    },
    {
      slug: "associations-et-quotes-parts",
      title: "Associations de propriétaires",
      metaTitle: "Partage des loyers entre associés, par quote-part",
      summary:
        "Regroupez plusieurs associés autour d'un ou plusieurs biens, fixez la quote-part de chacun et suivez les sommes dues et versées à chaque associé.",
      intro:
        "Quand un bien appartient à plusieurs personnes qui en partagent les revenus, l'association fixe la part de chacun. Vous rattachez le bien à l'association pour répartir ses loyers encaissés entre les associés. L'état de quote-part montre ensuite, pour chaque associé, ce qui lui est dû et ce qui lui a été versé.",
      packs: ["agence", "integre"],
      profiles: ["direction", "gestionnaire", "comptable"],
      menu: "Finance › Clients et propriétaires › Reversements et commissions › Associations",
      status: "disponible",
      actions: [
        {
          title: "Consulter les associations",
          goal: "Voir la liste des associations, toutes ou seulement les actives.",
        },
        {
          title: "Créer une association",
          goal: "Ouvrir une association ; les associés s'ajoutent ensuite.",
          input: "Le nom de l'association.",
          profiles: ["direction"],
        },
        {
          title: "Consulter le détail d'une association",
          goal: "Voir les associés et la quote-part de chacun.",
        },
        {
          title: "Ajouter un associé",
          goal: "Ajouter un associé et sa part des revenus.",
          input: "Le nom de l'associé et son pourcentage.",
          prereq: "Le total des quotes-parts ne dépasse pas 100 %.",
          profiles: ["direction"],
        },
        {
          title: "Retirer un associé",
          goal: "Supprimer la quote-part d'un associé.",
          profiles: ["direction"],
        },
        {
          title: "Rattacher un bien à une association",
          goal: "Lier un bien à une association, ou l'en détacher, pour répartir ses loyers encaissés entre les associés.",
          profiles: ["direction"],
        },
        {
          title: "Consulter l'état de quote-part",
          goal: "Voir les sommes dues et versées à un associé sur une période.",
          input: "La période, si besoin.",
        },
      ],
      related: ["gestion-locative/reversements-aux-proprietaires", "gestion-locative/releves-de-gerance"],
    },
    {
      slug: "liens-de-paiement-loyer",
      title: "Liens de paiement d'un loyer",
      h1: "Générer des liens de paiement de loyer",
      metaTitle: "Générer un lien de paiement de loyer pour vos locataires",
      summary:
        "Côté agence : générez un lien de paiement de loyer par échéance, envoyez-le par WhatsApp ou e-mail, suivez son état et révoquez-le au besoin.",
      intro:
        "Depuis une échéance, vous générez un lien de paiement de loyer qui mène à une page de paiement du reste dû. Vous choisissez de l'envoyer au locataire par WhatsApp ou par e-mail, ou de le copier pour le transmettre vous-même, puis vous suivez son état et le révoquez au besoin. C'est la vue de l'agence : le parcours du locataire, qui paie en Mobile Money sans créer de compte, est décrit dans [Payer son loyer en ligne par lien](/wiki/portails-clients/paiement-loyer-par-lien). Cette fonction est en cours de déploiement : elle est éprouvée en mode simulation, et le paiement réel ainsi que l'envoi réel des messages ne sont pas encore validés.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Encaisser › Échéances",
      status: "deploiement",
      actions: [
        {
          title: "Envoyer le lien de paiement au locataire",
          goal: "Envoyer au locataire, par son canal préféré (WhatsApp ou e-mail), un lien vers une seule échéance de loyer.",
          input: "La durée de validité du lien, de 1 à 30 jours (7 par défaut). Le destinataire est celui de la fiche du locataire.",
          output:
            "Le lien est envoyé avec le montant dû. Si aucun canal n'est possible ou si l'envoi échoue, aucun lien n'est conservé et la raison s'affiche.",
          prereq:
            "Le bail est actif, l'échéance n'est ni soldée ni annulée, le paiement en ligne est utilisable pour l'agence et le locataire a donné son accord pour WhatsApp ou l'e-mail.",
        },
        {
          title: "Copier le lien de paiement",
          goal: "Créer un lien sans l'envoyer, pour le transmettre vous-même : messagerie, SMS personnel ou en main propre.",
          output: "Un lien et sa date d'expiration. Le lien complet n'est affiché qu'une seule fois, à la création.",
          prereq: "L'échéance peut encore être payée.",
        },
        {
          title: "Suivre les liens d'une échéance",
          goal: "Voir les liens émis pour une échéance et l'état du paiement associé.",
          output:
            "Pour chaque lien : actif, expiré ou révoqué, ses dates, le nombre de consultations et l'état du paiement (aucun, en cours, payé, échoué, annulé, expiré ou à vérifier).",
          profiles: ["equipe"],
        },
        {
          title: "Révoquer un lien de paiement",
          goal: "Rendre un lien inutilisable tout de suite, s'il a été envoyé par erreur ou divulgué.",
          output: "Le lien affiche ensuite « Lien invalide ou expiré. ». Révoquer un lien déjà révoqué est sans effet.",
        },
      ],
      faq: [
        {
          q: "Le locataire a-t-il besoin d'un compte pour payer ?",
          a: "Non. Le lien lui ouvre directement une page de paiement Mobile Money pour l'échéance concernée.",
        },
        {
          q: "Peut-on payer une partie du loyer avec le lien ?",
          a: "Non. Le lien propose de régler le reste dû de l'échéance, pénalités comprises.",
        },
      ],
      related: [
        "gestion-locative/echeancier-des-loyers",
        "gestion-locative/encaissement-des-loyers",
        "portails-clients/paiement-loyer-par-lien",
      ],
    },
    {
      slug: "acces-partages-tiers-de-confiance",
      title: "Accès partagés pour tiers de confiance",
      h1: "Partager un dossier avec un notaire, un banquier ou un expert-comptable",
      metaTitle: "Partager un dossier avec un notaire ou un banquier",
      summary:
        "Côté agence : créez, modifiez et révoquez l'accès en lecture seule d'un notaire, banquier ou expert-comptable, avec échéance et journal des consultations.",
      intro:
        "Pour un dossier de prêt, une succession ou une clôture comptable, vous évitez d'envoyer des pièces par e-mail. Vous créez un accès en lecture seule, sans compte pour le destinataire, limité aux biens, aux rubriques et aux documents que vous choisissez. Il dure le temps voulu ou reste permanent, se modifie ou se retire à tout moment, et chaque consultation est enregistrée. Ce que le destinataire voit de son côté est décrit dans [Accès partagé en lecture seule](/wiki/portails-clients/acces-partage-tiers-de-confiance).",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Patrimoine › Accès partagés",
      status: "disponible",
      actions: [
        {
          title: "Consulter les accès partagés",
          goal: "Voir les accès donnés aux notaires, experts-comptables et banquiers.",
          output:
            "Pour chaque accès : le bénéficiaire, les rubriques, le périmètre, le statut (actif, expire bientôt, expiré ou révoqué), le nombre de consultations et la dernière consultation.",
        },
        {
          title: "Préparer un accès partagé",
          goal: "Choisir le propriétaire, les biens et les entités concernés, avec des rubriques proposées selon le type de bénéficiaire.",
          output:
            "Banquier : valorisations, rendement et ratios, emprunts. Expert-comptable : dépenses, loyers, emprunts. Notaire : titres et propriété, documents, valorisations.",
        },
        {
          title: "Choisir les documents à partager",
          goal: "Sélectionner, parmi les documents d'un bien de l'agence, ceux que le bénéficiaire pourra consulter.",
        },
        {
          title: "Créer un accès partagé",
          goal: "Ouvrir un accès en lecture seule à des biens ou des entités choisis, avec des rubriques précises et une échéance, ou sans limite de durée.",
          input:
            "Le type et le nom du bénéficiaire, son e-mail, les biens et entités, le propriétaire si besoin, les rubriques, les documents partagés, l'échéance et la durée de validité du lien.",
          output:
            "Un accès créé et un lien envoyé par e-mail au bénéficiaire. Le lien complet n'est affiché qu'une seule fois.",
          prereq: "Au moins un bien ou une entité de l'agence, une rubrique et une échéance qui n'est pas passée.",
        },
        {
          title: "Consulter le détail d'un accès",
          goal: "Voir le périmètre exact : biens, entités, documents et rubriques.",
        },
        {
          title: "Modifier un accès",
          goal: "Réduire ou élargir les rubriques, le périmètre et les documents, changer l'échéance (y compris rouvrir un accès expiré) ou le rendre permanent.",
          output: "Le changement s'applique tout de suite. Changer l'e-mail du bénéficiaire retire ses liens actifs.",
          prereq: "L'accès n'est pas révoqué.",
        },
        {
          title: "Révoquer un accès",
          goal: "Retirer immédiatement l'accès d'un tiers : l'accès et tous ses liens deviennent inutilisables.",
        },
        {
          title: "Renvoyer un lien d'accès",
          goal: "Envoyer un nouveau lien au bénéficiaire pour un accès actif, par exemple pour un accès permanent dont les liens ont une durée limitée.",
          input: "La durée de validité du lien et, si besoin, la révocation des liens précédents.",
          output: "Un nouveau lien envoyé par e-mail. Le lien complet n'est affiché qu'une seule fois.",
          prereq: "L'accès est actif, ni révoqué ni expiré.",
        },
        {
          title: "Consulter le journal des consultations",
          goal: "Voir qui a consulté ou téléchargé quoi, et quand : date, action, rubriques consultées, document téléchargé, envois de lien, modifications et révocation.",
        },
        {
          title: "Prévenir le bénéficiaire par e-mail",
          goal: "Envoyer au tiers de confiance le lien d'accès dans le corps d'un e-mail. Le message peut être désactivé et personnalisé par agence.",
        },
      ],
      faq: [
        {
          q: "Le tiers peut-il modifier quelque chose ?",
          a: "Non. L'accès est en lecture seule et limité aux biens, rubriques et documents que vous avez choisis. Aucune coordonnée de locataire n'est affichée.",
        },
        {
          q: "Peut-on retirer l'accès avant l'échéance ?",
          a: "Oui. La révocation est immédiate et rend tous les liens de l'accès inutilisables.",
        },
      ],
      related: [
        "portails-clients/acces-partage-tiers-de-confiance",
        "gestion-locative/releves-de-gerance",
      ],
    },
    {
      slug: "notifications-proprietaire",
      title: "Envois automatiques au propriétaire",
      metaTitle: "Rapport mensuel et alertes d'échéance envoyés au propriétaire",
      summary:
        "Envoyez automatiquement chaque mois le rapport au propriétaire et prévenez-le des fins de bail et des documents à renouveler, par WhatsApp ou e-mail.",
      intro:
        "Une fois par mois, le rapport du mois précédent peut partir tout seul vers les propriétaires qui ont donné leur accord, avec un lien de consultation. Le propriétaire est aussi prévenu quand un bail arrive à échéance ou qu'un document doit être renouvelé. L'envoi automatique du rapport est désactivé par défaut et en cours de déploiement ; l'envoi par WhatsApp s'active agence par agence.",
      packs: ["agence", "integre"],
      profiles: ["direction"],
      menu: "Communication › Notifications e-mail",
      status: "deploiement",
      actions: [
        {
          title: "Envoyer automatiquement le rapport du mois",
          goal: "Envoyer chaque mois, sans action manuelle, le rapport du mois précédent aux propriétaires consentants, une seule fois par relevé.",
          output: "Un message WhatsApp ou e-mail avec un lien sécurisé vers le rapport.",
          prereq:
            "L'envoi automatique est activé pour votre agence, le relevé n'est plus un brouillon et le propriétaire a donné son accord. L'envoi a lieu pendant les dix premiers jours du mois.",
        },
        {
          title: "Alerter d'une fin de bail ou d'un document à renouveler",
          goal: "Prévenir le propriétaire d'une fin de bail ou d'un document qui arrive à échéance, par son canal préféré, sans doublon.",
          output:
            "Un message par e-mail ou, si l'agence l'a activé et que le propriétaire est d'accord, par WhatsApp.",
          prereq: "Le propriétaire a donné son accord et l'événement est activé dans la configuration de l'agence.",
          status: "disponible",
        },
      ],
      faq: [
        {
          q: "Le propriétaire reçoit-il des messages sans son accord ?",
          a: "Non. Les envois se font seulement s'il a donné son accord pour le canal concerné, WhatsApp ou e-mail.",
        },
      ],
      related: ["gestion-locative/releves-de-gerance", "portails-clients/rapport-mensuel-proprietaire"],
    },
    {
      slug: "signature-electronique",
      title: "Signature électronique",
      h1: "Signature électronique des baux, mandats et états des lieux",
      metaTitle: "Signature électronique de bail, mandat et état des lieux",
      summary:
        "Faites signer baux, états des lieux, mandats et compromis en ligne, suivez chaque signataire depuis un écran unique et téléchargez le PDF signé.",
      intro:
        "La signature électronique évite les allers-retours de papier : l'agence envoie un document, chaque signataire reçoit un lien personnel, signe depuis son téléphone ou en face à face avec un collaborateur, et l'agence récupère le PDF signé. Elle s'applique au bail, à l'état des lieux, au [mandat de gestion](/wiki/biens-et-patrimoine/mandats-de-gestion), au [mandat de vente](/wiki/crm-et-ventes/mandats-de-vente) et au [compromis de vente](/wiki/crm-et-ventes/offres-et-compromis-de-vente). Un écran « Signatures » réunit les demandes de tous ces documents. L'envoi pour signature demande l'extension payante « Signatures électroniques » : voir les [Tarifs](/tarifs).",
      sections: [
        {
          title: "Quels documents peuvent être signés ?",
          body: [
            [
              "Le bail, depuis l'onglet « Signatures » de sa fiche ([Gestion des baux](/wiki/gestion-locative/gestion-des-baux)).",
              "L'état des lieux finalisé, depuis le bouton « Signatures » de l'état affiché ([États des lieux](/wiki/gestion-locative/etats-des-lieux)).",
              "Le mandat de gestion d'un bien, depuis l'onglet du mandat sur la fiche du bien.",
              "Le mandat de vente, depuis l'onglet « Signatures » de sa fiche.",
              "Le compromis de vente, depuis la carte « Signatures » de sa fiche, avec un prestataire de signature qualifié.",
            ],
          ],
        },
        {
          title: "Comment se déroule une signature ?",
          body: [
            "Vous choisissez de 1 à 10 signataires et le canal de chacun : e-mail, WhatsApp, SMS ou en face à face avec un collaborateur. Vous pouvez imposer un ordre de signature, et vous fixez une échéance de 1 à 30 jours.",
            "Le signataire ouvre son lien personnel, sans compte ni connexion, lit le document, reçoit un code de confirmation, puis signe en cochant son consentement et en tapant son nom ou en dessinant sa signature. Il peut aussi refuser de signer, avec un motif. En face à face, aucun code n'est demandé et la signature dessinée est obligatoire.",
            "Quand tout le monde a signé, le document est scellé : l'agence télécharge le PDF signé, et l'historique de la demande garde la trace de chaque étape. Une demande dont l'échéance est passée devient « Expirée » et l'émetteur en est prévenu.",
          ],
        },
        {
          title: "Une extension payante, par blocs de 50 signatures",
          body: [
            "L'envoi pour signature demande l'extension « Signatures électroniques », vendue par blocs de 50 signatures par mois, cumulables. Elle s'ajoute à chacun des six packs : aucune signature n'est incluse dans un pack. Une demande compte pour une signature, quel que soit le nombre de signataires, et annuler une demande ne rend pas sa place. Sans l'extension, ou une fois le quota du mois atteint, l'envoi est refusé et le message propose d'ajouter l'extension. Les conditions figurent sur la page [Tarifs](/tarifs).",
          ],
        },
        {
          title: "Prestataire de signature externe et SMS",
          body: [
            "Certains documents, comme le compromis de vente, exigent un prestataire de signature qualifié. Le prestataire invite alors lui-même les signataires par e-mail seulement, gère ses propres relances et est prévenu de toute annulation. Sans prestataire qualifié, l'envoi d'un compromis est refusé et l'écran d'envoi l'indique.",
            "Le canal SMS invite le signataire et lui envoie son code par SMS. Il demande que le signataire soit lié à un contact du CRM de l'agence, avec un numéro au format international, et le nombre de SMS de signature par jour et par agence est plafonné.",
          ],
        },
      ],
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Paramétrage › Signatures",
      status: "disponible",
      actions: [
        {
          title: "Suivre toutes les demandes de signature",
          goal: "Suivre sur un seul écran les demandes de signature de tous les documents de l'agence : baux, états des lieux, mandats et compromis.",
          input:
            "Au choix : un statut, un type de document, une recherche sur le titre du document ou le nom d'un signataire, une période, et le tri.",
          output:
            "Une liste de 25 demandes par page avec le document, son statut, les dates de création et d'échéance et le nombre de signataires qui ont signé sur le total. Vous ne voyez que les types de document que vous avez le droit de consulter.",
          prereq: "Au moins une demande de signature a été envoyée.",
        },
        {
          title: "Voir les compteurs par statut",
          goal: "Voir d'un coup d'œil combien de demandes sont en brouillon, envoyées, partiellement signées, terminées, refusées, expirées ou annulées.",
          output: "Un compteur par statut. Un clic sur un compteur filtre la liste sur ce statut.",
        },
        {
          title: "Relancer les signataires en attente depuis la liste",
          goal: "Relancer sans ouvrir le document, avec le bouton « Relancer » d'une demande en cours.",
          output:
            "Un nouveau lien est envoyé aux signataires qui n'ont encore rien ouvert, sauf en face à face. Un message dit combien ont été relancés, ou qu'aucun signataire n'était à relancer.",
          prereq:
            "La demande est en cours et aucune relance, manuelle ou automatique, n'est partie depuis moins de 10 minutes. Avec un prestataire de signature externe, c'est lui qui relance.",
        },
        {
          title: "Annuler une demande depuis la liste",
          goal: "Interrompre une demande en cours, après confirmation, sans ouvrir le document.",
          output: "La demande passe à « Annulée » et ses liens cessent d'agir. Le prestataire externe, s'il y en a un, est prévenu. La place consommée n'est pas rendue.",
          prereq: "La demande est encore en cours.",
        },
        {
          title: "Télécharger le PDF d'une demande",
          goal: "Récupérer le document depuis la liste.",
          output: "Le PDF signé si la demande est terminée, sinon le PDF tel qu'il a été envoyé.",
        },
        {
          title: "Consulter le détail d'une demande",
          goal: "Ouvrir une demande depuis la liste pour voir où elle en est et ce qui s'est passé.",
          output:
            "Le type de document, le statut, les dates, chaque signataire avec son rôle, son canal, son contact masqué et son statut, l'historique chronologique, la pastille « Piste de preuve intacte » (ou « altérée ») et le lien « Ouvrir le document ».",
        },
        {
          title: "Envoyer un bail pour signature",
          goal: "Lancer la signature du contrat de bail auprès du locataire, des colocataires, du bailleur ou de l'agent, depuis l'onglet « Signatures » de la fiche du bail.",
          input:
            "Les signataires (de 1 à 10) avec leur rôle, leur nom, leur canal (e-mail, WhatsApp, SMS ou en face à face) et leur contact, l'ordre de signature si vous le souhaitez et l'échéance, de 1 à 30 jours (14 par défaut).",
          output:
            "Une demande de signature envoyée, avec le contrat figé tel qu'il est envoyé. Chaque signataire reçoit son lien personnel. Si aucun lien ne peut partir et qu'aucun signataire n'est en face à face, la demande est annulée.",
          prereq:
            "Le bail existe, il n'a pas déjà une demande en cours, et l'agence a l'extension payante « Signatures électroniques » avec des signatures disponibles ce mois-ci. Pour WhatsApp, le signataire doit être un contact du CRM qui a donné son accord.",
        },
        {
          title: "Consulter les signatures d'un bail",
          goal: "Voir, sur la fiche du bail, les demandes envoyées, leur statut et celui de chaque signataire.",
          output: "Pour chaque signataire : en attente, lien ouvert, signé ou refusé, avec son contact masqué et la date de signature. Le détail donne l'historique de la demande.",
          prereq: "Un bail a été envoyé pour signature.",
        },
        {
          title: "Relancer les signataires d'un bail",
          goal: "Renvoyer le lien aux signataires qui n'ont encore rien ouvert.",
          output:
            "Un nouveau lien envoyé à chacun d'eux. En mode ordonné, seul le signataire dont c'est le tour est relancé. Les signataires en face à face ne sont pas relancés.",
          prereq: "La demande est en cours, sans relance depuis moins de 10 minutes.",
        },
        {
          title: "Annuler la signature d'un bail",
          goal: "Interrompre la demande de signature d'un bail encore en cours.",
          output: "La demande est annulée et les liens déjà envoyés cessent d'agir.",
          prereq: "La demande est en cours.",
        },
        {
          title: "Télécharger le PDF source ou signé du bail",
          goal: "Récupérer le contrat tel qu'il a été envoyé, ou, une fois toutes les signatures réunies, le contrat signé.",
          output: "Un PDF, avec les boutons « PDF source » et « PDF signé ». Le PDF signé n'apparaît que lorsque la demande est terminée.",
          prereq: "Un bail a été envoyé pour signature.",
        },
        {
          title: "Signer le bail sur place",
          goal: "Faire signer un signataire présent à côté d'un collaborateur, avec le bouton « Signer sur place » de la fiche du bail.",
          input: "Le consentement du signataire et sa signature dessinée.",
          output:
            "La signature est enregistrée avec la mention qu'elle a eu lieu en face à face, et le nom du collaborateur qui assistait. Si c'était la dernière, le document est scellé. Chaque ouverture génère un nouveau lien : l'ancien cesse d'agir.",
          prereq: "Un signataire est prévu en face à face et n'a pas encore signé ni refusé.",
        },
        {
          title: "Lire le document à signer",
          goal: "Ouvrir le lien reçu pour voir le titre du document, l'échéance et son rôle de signataire, puis lire ou télécharger le document.",
          output:
            "La fiche de la demande et le PDF à lire. Un message explique les cas particuliers : déjà signé, refusé, expiré, annulé, entièrement signé, ou pas encore votre tour quand l'ordre est imposé. Un lien inconnu ou expiré n'affiche rien.",
          prereq: "Vous avez reçu un lien de signature valide.",
          profiles: ["visiteur"],
        },
        {
          title: "Recevoir un code de confirmation",
          goal: "Confirmer son identité avant de signer, avec un code à 6 chiffres envoyé sur son e-mail ou son WhatsApp.",
          output:
            "Un code valable quelques minutes, envoyé au contact masqué affiché. Le nombre d'essais et de renvois est limité, avec un délai entre deux envois. Aucun code n'est demandé en face à face.",
          prereq: "Le lien de signature est ouvert.",
          profiles: ["visiteur"],
        },
        {
          title: "Signer le document",
          goal: "Signer le document depuis son téléphone ou son ordinateur.",
          input:
            "Le consentement, le code de confirmation reçu (sauf en face à face) et la signature : son nom tapé (de 2 à 120 caractères) ou une signature dessinée.",
          output:
            "La signature est enregistrée et la demande passe à « Partiellement signée », puis à « Terminée » à la dernière signature, qui scelle le document. La signature est refusée si le document a changé depuis l'envoi.",
          prereq: "Le code de confirmation a été reçu, et c'est votre tour quand l'ordre est imposé.",
          profiles: ["visiteur"],
        },
        {
          title: "Refuser de signer",
          goal: "Décliner la signature d'un document.",
          input: "Un motif, facultatif.",
          output: "Le signataire passe à « Refusé », aucune signature n'est enregistrée et un message le confirme.",
          prereq: "Le lien de signature est ouvert.",
          profiles: ["visiteur"],
        },
        {
          title: "Envoyer un état des lieux finalisé pour signature",
          goal: "Faire signer l'état des lieux par voie électronique, avec le bouton « Signatures » de l'état affiché.",
          input:
            "Les signataires proposés (locataire principal, colocataires, bailleur et agent), leur canal et l'échéance, de 1 à 30 jours. L'agent est préréglé en face à face, et le locataire aussi s'il est présent.",
          output: "Une demande de signature envoyée avec l'état des lieux en PDF, photos comprises.",
          prereq:
            "L'état des lieux est finalisé : un brouillon est refusé. Il n'a pas déjà une signature aboutie ni une demande en cours, et l'agence a l'extension payante « Signatures électroniques ».",
        },
        {
          title: "Signer un état des lieux sur place",
          goal: "Faire signer l'agent et le locataire présent côte à côte, sur le même appareil.",
          input: "Le consentement et la signature dessinée de chacun.",
          output: "Les signatures sont enregistrées en face à face et, à la dernière, l'état des lieux signé est scellé.",
          prereq: "Une demande est envoyée avec des signataires en face à face.",
        },
        {
          title: "Consulter les signatures d'un état des lieux et télécharger les PDF",
          goal: "Suivre la signature de l'état des lieux depuis la fenêtre « Signatures » de l'état, et récupérer les documents.",
          output: "Le statut de chaque signataire, l'historique, le PDF envoyé et, quand tout le monde a signé, le PDF signé.",
          prereq: "Un état des lieux a été envoyé pour signature.",
        },
        {
          title: "Rappeler automatiquement les signataires avant l'expiration",
          goal: "Relancer sans y penser les signataires qui n'ont pas signé quand l'échéance approche.",
          output:
            "Par défaut, un rappel part trois jours puis un jour avant l'échéance, par le canal de chaque signataire, avec un nouveau lien. Le rappel apparaît dans l'historique de la demande. Les signataires en face à face ne sont pas rappelés, et en mode ordonné seul le premier signataire qui n'a pas signé l'est.",
          prereq: "Une demande est en cours et son échéance approche.",
        },
        {
          title: "Faire signer avec un prestataire de signature externe",
          goal: "Faire signer un document qui exige un prestataire qualifié, comme le compromis de vente.",
          input: "Les signataires, joignables par e-mail seulement, comme pour un envoi ordinaire.",
          output:
            "Le prestataire invite lui-même les signataires et gère ses relances. La signature est suivie, annulée et téléchargée depuis ImmoTopia comme les autres. WhatsApp, SMS et face à face ne sont pas proposés.",
          prereq: "Un prestataire de signature qualifié est en service pour l'agence et l'extension « Signatures électroniques » est active.",
        },
        {
          title: "Envoyer le lien de signature par SMS",
          goal: "Inviter un signataire par un SMS court qui contient le lien de signature.",
          input: "Le canal « SMS » pour le signataire, son numéro de téléphone et le contact du CRM auquel il correspond.",
          output:
            "Un SMS envoyé. Les relances, manuelles ou automatiques, repassent par le même canal. Un SMS ne consomme pas de signature supplémentaire : le quota compte les demandes.",
          prereq:
            "Le signataire est un contact du CRM de l'agence, son numéro est celui de la fiche et il est d'un pays pris en charge. Le plafond quotidien de SMS de signature de l'agence n'est pas atteint. Avec un prestataire externe, le SMS n'est pas proposé.",
        },
        {
          title: "Recevoir le code de confirmation par SMS",
          goal: "Recevoir son code à usage unique par SMS quand son canal est le SMS.",
          output:
            "Un SMS court avec l'agence, le code, sa durée de validité et la consigne de ne le communiquer à personne. Les limites d'essais, de renvois et de délai sont celles des autres canaux.",
          prereq: "Le lien de signature a été envoyé par SMS et la page de signature est ouverte.",
          profiles: ["visiteur"],
        },
      ],
      faq: [
        {
          q: "Le signataire a-t-il besoin d'un compte ImmoTopia ?",
          a: "Non. Il reçoit un lien personnel, l'ouvre sans se connecter, lit le document, saisit son code de confirmation puis signe.",
        },
        {
          q: "Combien de signatures peut-on envoyer ?",
          a: "Autant que l'extension « Signatures électroniques » le permet : elle se vend par blocs de 50 signatures par mois, cumulables, avec chacun des six packs. Aucune signature n'est incluse dans un pack. Voir la page Tarifs.",
        },
        {
          q: "Que se passe-t-il si un signataire ne signe pas à temps ?",
          a: "Par défaut, il est rappelé automatiquement trois jours puis un jour avant l'échéance. Passé ce délai, la demande devient « Expirée » et l'émetteur en est prévenu. Vous pouvez aussi relancer vous-même, au plus une fois toutes les 10 minutes.",
        },
        {
          q: "Peut-on annuler une demande de signature ?",
          a: "Oui, tant qu'elle est en cours, depuis l'écran « Signatures » ou depuis le document. Les liens déjà envoyés cessent d'agir. La demande est aussi annulée automatiquement si le document change après l'envoi.",
        },
        {
          q: "Peut-on faire signer un compromis de vente en ligne ?",
          a: "Oui, avec un prestataire de signature qualifié, qui invite les signataires par e-mail. Sans prestataire qualifié, l'envoi d'un compromis est refusé.",
        },
      ],
      related: [
        "gestion-locative/gestion-des-baux",
        "gestion-locative/etats-des-lieux",
        "biens-et-patrimoine/mandats-de-gestion",
        "crm-et-ventes/mandats-de-vente",
        "crm-et-ventes/offres-et-compromis-de-vente",
      ],
    },
  ],
};
