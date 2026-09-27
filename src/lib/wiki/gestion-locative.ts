import type { WikiDomain } from "./types";

export const gestionLocative: WikiDomain = {
  slug: "gestion-locative",
  title: "Gestion locative",
  metaTitle: "Logiciel de gestion locative en Côte d'Ivoire : baux, loyers",
  summary:
    "Baux, échéances, encaissement des loyers en espèces ou Mobile Money, pénalités, caution et quittances : la gestion locative d'ImmoTopia expliquée en détail.",
  intro:
    "Le domaine gestion locative couvre tout le cycle d'un bail : sa création, l'échéancier des loyers, l'encaissement, les pénalités de retard, le dépôt de garantie et les documents remis au locataire. Il s'adresse aux agences et aux administrateurs de biens qui gèrent des logements pour le compte de propriétaires. Les relevés de gérance permettent de rendre compte à chaque bailleur. La vie du bail, les états des lieux, les reversements et les honoraires paramétrables sont en cours de déploiement.",
  features: [
    {
      slug: "gestion-des-baux",
      title: "Gestion des baux",
      metaTitle: "Gestion des baux de location : logiciel en Côte d'Ivoire",
      summary:
        "Créez vos baux en quelques minutes : bien, locataire, loyer, jour d'échéance, caution et règles de pénalité. Colocataires, statuts et fiche bail complète.",
      intro:
        "Le bail est le point de départ de toute la gestion locative : échéances, paiements, pénalités et dépôt de garantie s'y rattachent. Vos collaborateurs créent un bail sur un bien de l'agence, y ajoutent les colocataires et suivent son statut. Toute l'information du contrat tient sur une seule fiche : plus besoin de chercher dans les classeurs.",
      packs: ["agence", "integre"],
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
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › Vie du bail",
      status: "deploiement",
      actions: [
        {
          title: "Consulter l'historique du bail",
          goal: "Voir la chronologie des révisions, renouvellements, avenants et de la résiliation, avec l'état actuel du bail.",
        },
        {
          title: "Réviser le loyer",
          goal: "Appliquer un nouveau loyer, et si besoin de nouvelles charges, à partir d'un mois donné.",
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
      metaTitle: "État des lieux d'entrée et de sortie : logiciel en ligne",
      summary:
        "Réalisez vos états des lieux d'entrée et de sortie pièce par pièce, avec photos, compteurs et clés, puis comparez-les pour repérer les dégradations.",
      intro:
        "L'état des lieux protège le bailleur comme le locataire. Votre agent le remplit pièce par pièce, élément par élément, ajoute des photos, relève les compteurs et note les retenues. À la sortie, la comparaison avec l'entrée montre tout de suite ce qui s'est dégradé.",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Baux › Détail du bail › États des lieux",
      status: "deploiement",
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
          title: "Finaliser un état des lieux",
          goal: "Verrouiller l'état des lieux une fois signé : il ne peut plus être modifié.",
          output: "Un état des lieux finalisé et daté.",
          prereq:
            "Le nom du signataire de l'agence est saisi, celui du locataire aussi s'il était présent, et au moins un élément a un état renseigné.",
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
          goal: "Illustrer une pièce ou un élément par une photo, la consulter ou la supprimer.",
          input: "Une photo (JPEG, PNG ou WebP, 10 Mo au plus), la pièce ou l'élément concerné et une légende.",
          prereq: "Une fois l'état des lieux finalisé, on ne peut plus ajouter ni supprimer de photo.",
        },
      ],
      faq: [
        {
          q: "Peut-on joindre des photos à l'état des lieux ?",
          a: "Oui, jusqu'à 10 Mo par photo, rattachées à une pièce ou à un élément, avec une légende.",
        },
        {
          q: "L'état des lieux de sortie reprend-il celui d'entrée ?",
          a: "Oui. À sa création, les pièces et éléments de l'entrée sont repris, prêts à être remplis. Un tableau compare ensuite les deux, élément par élément.",
        },
      ],
      related: [
        "gestion-locative/vie-du-bail",
        "gestion-locative/depot-de-garantie",
        "gestion-locative/gestion-des-baux",
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
      packs: ["agence", "integre"],
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
          goal: "Bloquer une somme sur le dépôt, conserver tout ou partie de la caution, ou corriger un montant.",
          input: "Le type de mouvement, le montant et une note.",
          prereq: "Le montant conservé ne dépasse pas le solde détenu.",
          status: "deploiement",
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
      packs: ["agence", "integre"],
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
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Encaisser › Échéances",
      status: "disponible",
      actions: [
        {
          title: "Générer les échéances d'un bail",
          goal: "Créer toutes les échéances du bail, loyer et charges, selon sa fréquence de facturation.",
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
        "Chaque règlement reçu d'un locataire est saisi avec son moyen de paiement, y compris Mobile Money avec l'opérateur et le numéro utilisés. Vous l'affectez ensuite à une ou plusieurs échéances ; le surplus reste en avance au compte du locataire. Les paiements déclarés par les locataires depuis leur portail arrivent dans une liste où votre équipe les approuve ou les rejette.",
      packs: ["agence", "integre"],
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
          goal: "Redemander à la passerelle de paiement le statut d'un règlement fait en ligne.",
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
        "portails-clients/portail-locataire",
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
      packs: ["agence", "integre"],
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
          status: "deploiement",
        },
        {
          title: "Envoyer le relevé au propriétaire",
          goal: "Transmettre le relevé au propriétaire ; il passe au statut « envoyé ».",
          prereq: "Un relevé calculé avec une ancienne méthode doit d'abord être recalculé.",
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
      ],
    },
    {
      slug: "reversements-aux-proprietaires",
      title: "Reversements aux propriétaires",
      metaTitle: "Reversement des loyers aux propriétaires : compte courant",
      summary:
        "Suivez le compte courant de chaque propriétaire (loyers encaissés, honoraires, TVA, dépenses) et enregistrez le reversement du solde qui lui est dû.",
      intro:
        "Pour chaque propriétaire, ImmoTopia tient un compte courant : loyers encaissés, moins honoraires, TVA, dépenses et reversements déjà faits. Vous savez à tout moment combien vous lui devez. Le reversement s'enregistre en quelques clics, et une erreur se corrige par une annulation motivée.",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      menu: "Finance › Clients et propriétaires › Reversements et commissions › Comptes propriétaires",
      status: "deploiement",
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
        "Les honoraires de gestion se règlent à trois niveaux : les réglages de l'agence, puis une dérogation par propriétaire, puis une dérogation par bail, qui l'emporte. Chaque bail peut avoir son gestionnaire attitré, et chaque collaborateur sa part de commission. Chaque mois, l'état des commissions montre ce que rapportent les honoraires, et à qui.",
      packs: ["agence", "integre"],
      profiles: ["equipe"],
      status: "deploiement",
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
      status: "deploiement",
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
  ],
};
