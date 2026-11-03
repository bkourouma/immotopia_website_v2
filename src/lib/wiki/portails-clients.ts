import type { WikiDomain } from "./types";

export const portailsClients: WikiDomain = {
  slug: "portails-clients",
  title: "Portails clients",
  metaTitle: "Portail locataire et propriétaire en ligne, Côte d'Ivoire",
  summary:
    "Donnez à vos propriétaires, locataires et copropriétaires un espace en ligne : loyers, échéances, documents, incidents, appels de charges et assemblées.",
  intro:
    "Les portails clients ouvrent à vos clients un accès en ligne à leurs propres informations, tenues par votre agence. Le propriétaire suit ses biens, ses revenus et ses documents ; le locataire consulte son bail, déclare ses paiements et signale ses incidents ; le copropriétaire suit ses lots, règle ses appels de charges en ligne et participe aux assemblées générales. Chacun ne voit que ce qui le concerne. Des pages publiques sans compte complètent ces portails : paiement d'un loyer ou d'un appel de charges, assemblée générale par lien personnel, rapport mensuel du propriétaire et accès en lecture seule pour un tiers de confiance. Votre équipe répond à moins d'appels pour une simple question de solde ou de document.",
  features: [
    {
      slug: "portail-proprietaire",
      title: "Portail propriétaire",
      metaTitle: "Portail propriétaire en ligne : revenus, baux et documents",
      summary:
        "Vos propriétaires suivent en ligne leurs biens, baux, loyers perçus, échéances, cautions, documents et incidents, sans appeler l'agence à chaque question.",
      intro:
        "Le portail propriétaire donne au bailleur une vue claire de son patrimoine géré par votre agence. Il y retrouve ses biens, ses baux, ses revenus, les échéances de ses locataires, les dépôts de garantie et ses documents, et il suit les incidents déclarés sur ses biens. Le propriétaire trouve seul la réponse à ses questions courantes, et votre agence gagne du temps.",
      packs: ["agence", "integre"],
      profiles: ["proprietaire"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau de bord",
          goal: "Avoir une synthèse de son patrimoine dès la connexion.",
          output:
            "Le nombre de biens loués, disponibles ou en maintenance, les revenus du mois et de l'année comparés aux précédents, le taux d'occupation, les prochains loyers attendus, les derniers paiements et les derniers incidents.",
        },
        {
          title: "Consulter mes biens",
          goal: "Voir la liste de ses biens dans l'agence, filtrée par statut, type de bien ou mode de transaction. Les biens confiés à l'agence sous mandat de gestion en cours en font partie.",
          output: "Pour chaque bien : l'adresse, le type, le statut et le bail en cours, avec un résumé du portefeuille.",
        },
        {
          title: "Consulter la fiche d'un bien",
          goal: "Ouvrir la fiche complète de l'un de ses biens.",
          output:
            "Les médias et documents du bien, le bail en cours, l'historique des baux, les revenus et l'historique des interventions de maintenance.",
        },
        {
          title: "Consulter mes baux",
          goal: "Voir les baux de ses biens, filtrés par statut ou par bien.",
          output:
            "Pour chaque bail : le bien, le locataire, les dates, le loyer et le statut, avec le nombre de baux actifs, terminés et suspendus.",
        },
        {
          title: "Consulter le détail d'un bail",
          goal: "Ouvrir un bail de l'un de ses biens.",
          output:
            "Le bien, le locataire principal et les colocataires, les échéances, l'historique des paiements, le solde (dû, payé, restant) et le dépôt de garantie avec ses mouvements.",
        },
        {
          title: "Consulter mes revenus",
          goal: "Suivre les loyers perçus, au total, par bien ou par mois.",
          input: "Une période, un bien ou une année, si besoin.",
          output:
            "La liste des revenus, un résumé (mois et année en cours et précédents, total, moyenne) et la répartition par bien et par mois.",
        },
        {
          title: "Consulter les échéances de mes locataires",
          goal: "Voir l'échéancier des loyers de ses biens, filtré par statut, par bien ou par date.",
          output:
            "Pour chaque échéance : le bien, le locataire, la période, la date, les montants dus et payés, les pénalités et le statut.",
        },
        {
          title: "Consulter les paiements reçus",
          goal: "Voir l'historique des loyers payés sur ses biens et le détail de chaque paiement.",
          output:
            "Les paiements avec un résumé (total, ce mois-ci, cette année) ; pour un paiement, le bail et les échéances couvertes.",
        },
        {
          title: "Consulter les dépôts de garantie",
          goal: "Voir les cautions de ses baux et leurs mouvements, du versement à la restitution.",
          output: "Pour chaque dépôt : le bien, le locataire, le montant déposé, le montant retenu et le statut.",
        },
        {
          title: "Consulter mon compte courant",
          goal: "Voir le solde du compte que l'agence tient pour lui : loyers encaissés, honoraires, TVA, dépenses et reversements.",
          output: "Le solde, les mouvements datés avec leur référence et le bail lié, et l'historique des reversements.",
        },
        {
          title: "Consulter et télécharger mes documents",
          goal: "Retrouver les documents liés à ses biens et à ses baux, classés par type, et les télécharger.",
        },
        {
          title: "Suivre les incidents de mes biens",
          goal: "Suivre les incidents de maintenance déclarés sur ses biens et ouvrir le détail de chacun.",
          input: "Des filtres, si besoin : statut, bien, catégorie, priorité.",
        },
        {
          title: "Ouvrir une pièce jointe d'incident",
          goal: "Télécharger un fichier joint à un incident portant sur l'un de ses biens.",
        },
        {
          title: "Générer un rapport de revenus",
          goal: "Télécharger les revenus perçus sur une période, pour tous ses biens ou pour un seul.",
          input: "La période, le bien si besoin et le format : PDF, CSV ou Excel.",
          output: "Un fichier à télécharger.",
        },
        {
          title: "Générer un rapport d'occupation",
          goal: "Télécharger le taux d'occupation de ses biens à une date donnée.",
          input: "La date et le format.",
          output: "Un fichier à télécharger.",
        },
        {
          title: "Exporter mes données",
          goal: "Exporter ses paiements, ses échéances ou ses baux, sur une période et pour un bien si besoin.",
          input: "Le type de données, la période et le format : CSV ou Excel.",
          output: "Un fichier à télécharger, limité à ses propres biens.",
        },
        {
          title: "Gérer mes préférences",
          goal: "Accepter ou refuser de recevoir la newsletter de l'agence.",
        },
      ],
      faq: [
        {
          q: "Le propriétaire voit-il les biens des autres clients ?",
          a: "Non. Il ne voit que ses propres biens, avec leurs baux, paiements, documents et incidents.",
        },
        {
          q: "Le propriétaire peut-il suivre les réparations ?",
          a: "Oui. Il consulte les incidents déclarés sur ses biens, leur détail et les pièces jointes.",
        },
      ],
      related: [
        "portails-clients/portail-locataire",
        "gestion-locative/releves-de-gerance",
        "gestion-locative/reversements-aux-proprietaires",
        "portails-clients/vue-patrimoine-proprietaire",
        "portails-clients/rapport-mensuel-proprietaire",
      ],
    },
    {
      slug: "portail-locataire",
      title: "Portail locataire",
      metaTitle: "Espace locataire en ligne : bail, échéances et paiements",
      summary:
        "Vos locataires consultent leur bail, leurs échéances, leur caution et leurs documents, et déclarent leurs paiements Mobile Money ou espèces avec une preuve.",
      intro:
        "Le portail locataire met à la disposition du preneur tout ce qui concerne son bail actif, colocataires compris. Il voit ce qu'il doit, ce qu'il a payé et le montant de sa caution. Après un paiement en espèces ou par Mobile Money, il le déclare avec une preuve : votre équipe le contrôle puis le valide. Le paiement en ligne du loyer est en cours de déploiement.",
      packs: ["agence", "integre"],
      profiles: ["locataire"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le tableau de bord",
          goal: "Avoir une synthèse de son bail dès la connexion.",
          output:
            "Un aperçu du bail, le solde actuel, le nombre d'échéances en retard, la prochaine échéance, les derniers paiements, la caution et le résumé des incidents.",
        },
        {
          title: "Consulter mon bail",
          goal: "Voir le détail de son bail actif.",
          output: "Le bien, le locataire principal et les colocataires, le propriétaire et les documents du bail.",
        },
        {
          title: "Consulter mes échéances",
          goal: "Voir l'échéancier du bail, filtré par statut ou par période, et le détail de chaque échéance.",
          output:
            "Un résumé (payé, dû, en retard, partiel) et, pour une échéance, son contenu, les pénalités et les paiements liés.",
        },
        {
          title: "Déclarer un paiement",
          goal: "Signaler un paiement déjà fait, en espèces, par Mobile Money ou autrement, pour que l'agence le contrôle et le valide.",
          input:
            "Le montant, la date, le moyen de paiement, pour Mobile Money l'opérateur et le numéro utilisés, une référence, l'échéance concernée, une note et une preuve (5 Mo au plus).",
          output: "Une déclaration en attente de validation par l'agence.",
        },
        {
          title: "Consulter mon historique de paiements",
          goal: "Retrouver tous les paiements de son bail, par période ou par moyen de paiement.",
          output: "Le montant, la date, le moyen, le statut et les échéances couvertes de chaque paiement, avec le total payé.",
        },
        {
          title: "Payer un loyer en ligne",
          goal: "Régler une ou plusieurs échéances en ligne par la passerelle de paiement de l'agence, lorsque celle-ci l'a activée.",
          input: "Les échéances à régler, jusqu'à 24 à la fois.",
          output: "Une page de paiement à suivre. Le portail indique aussi qui prend en charge les frais.",
          status: "deploiement",
        },
        {
          title: "Suivre un paiement en ligne",
          goal: "Consulter l'état d'un paiement en ligne à partir de son code de paiement.",
          status: "deploiement",
        },
        {
          title: "Consulter ma caution",
          goal: "Voir le dépôt de garantie de son bail.",
          output: "Le dépôt, ses mouvements et le montant actuellement détenu.",
        },
        {
          title: "Consulter mon compte",
          goal: "Voir, en lecture seule, le solde et le relevé des mouvements de son compte chez l'agence.",
        },
        {
          title: "Consulter et télécharger mes documents",
          goal: "Retrouver les documents de son bail, classés par type, et les télécharger.",
        },
      ],
      faq: [
        {
          q: "Le locataire peut-il payer son loyer depuis le portail ?",
          a: "Il déclare le paiement fait en espèces ou par Mobile Money, avec une preuve, et l'agence le valide. Le paiement en ligne par la passerelle de l'agence est en cours de déploiement.",
        },
        {
          q: "Les colocataires ont-ils accès au portail ?",
          a: "Oui. Le locataire principal comme les colocataires d'un bail actif y accèdent.",
        },
      ],
      related: [
        "portails-clients/signalement-incidents-locataire",
        "gestion-locative/encaissement-des-loyers",
        "gestion-locative/depot-de-garantie",
        "portails-clients/paiement-loyer-par-lien",
      ],
    },
    {
      slug: "signalement-incidents-locataire",
      title: "Incidents signalés par le locataire",
      metaTitle: "Signalement d'incidents par le locataire, en ligne",
      summary:
        "Le locataire signale lui-même une panne ou un dégât depuis son portail, avec jusqu'à 10 fichiers joints, puis suit son ticket et échange avec l'agence.",
      intro:
        "Une fuite, une panne, une porte qui ferme mal : le locataire déclare l'incident depuis son portail, sans téléphoner à l'agence. Il joint des fichiers, suit l'avancement de son ticket et échange avec votre équipe par commentaires. Vous recevez des demandes complètes, avec la catégorie, la priorité et l'emplacement.",
      packs: ["agence"],
      profiles: ["locataire"],
      menu: "Portail locataire › Incidents",
      status: "disponible",
      actions: [
        {
          title: "Déclarer un incident",
          goal: "Signaler soi-même un problème dans le logement, avec des pièces jointes.",
          input: "La catégorie, la priorité, un titre, une description, l'emplacement précis et jusqu'à 10 fichiers joints.",
          output: "Un ticket de maintenance ouvert, visible par votre équipe.",
          prereq: "Le locataire a un bail actif.",
        },
        {
          title: "Suivre mes tickets",
          goal: "Voir la liste de ses tickets, filtrée par statut, et ouvrir le détail de chacun.",
        },
        {
          title: "Commenter un ticket",
          goal: "Échanger avec l'agence sur un ticket, depuis le portail.",
          input: "Le commentaire.",
        },
        {
          title: "Ouvrir une pièce jointe",
          goal: "Télécharger un fichier joint à l'un de ses tickets.",
        },
      ],
      related: ["portails-clients/portail-locataire", "portails-clients/portail-proprietaire"],
    },
    {
      slug: "portail-coproprietaire",
      title: "Portail copropriétaire",
      h1: "Portail copropriété : l'espace en ligne de chaque copropriétaire",
      metaTitle: "Portail copropriété en ligne : charges, AG, documents",
      summary:
        "Portail copropriété : chaque copropriétaire suit ses lots et appels de charges, les paie en ligne, rejoint l'assemblée et retrouve ses PV et documents.",
      intro:
        "Le portail de la copropriété est l'espace en ligne que le syndic ouvre à chaque copropriétaire. Dans ce portail copropriétaire, chacun consulte ses propres lots, le solde de son compte et ses appels de charges, retrouve ses reçus et quittances, et télécharge le règlement de copropriété et les procès-verbaux d'assemblée. Il peut aussi payer ses appels de charges en ligne par mobile money et rejoindre l'assemblée générale en direct. Le syndic reçoit ainsi moins de demandes de relevé, de copie de PV ou de rappel de paiement.",
      sections: [
        {
          title: "À quoi sert le portail de la copropriété ?",
          body: [
            "Le portail évite au copropriétaire d'appeler le syndic pour connaître sa situation. Chaque copropriétaire invité y trouve :",
            [
              "ses lots, avec le solde de chacun, l'historique de son compte et son suivi mois par mois ;",
              "ses appels de charges (période, montant, payé, restant dû, échéance, statut y compris « en retard »), dont il télécharge l'avis en PDF, et qu'il peut payer en ligne par mobile money quand le [paiement en ligne des charges](/wiki/syndic-copropriete/paiement-en-ligne-des-charges) est ouvert pour sa copropriété ;",
              "ses paiements, ses reçus et ses quittances, et le relevé de compte d'un lot en PDF ;",
              "le règlement de copropriété et les procès-verbaux d'[assemblée générale](/wiki/syndic-copropriete/assemblees-generales) ;",
              "les assemblées de sa copropriété et leur ordre du jour ; pour une assemblée clôturée, les résolutions, les résultats et ses propres votes ; pour une assemblée en cours, un bouton pour la [rejoindre en direct](/wiki/portails-clients/assemblee-par-lien-personnel) ;",
              "la fiche de sa copropriété, avec le contact du syndic.",
            ],
            "L'accès se fait sur invitation : le syndic invite le copropriétaire depuis sa fiche ([copropriétaires et occupants](/wiki/syndic-copropriete/coproprietaires-et-occupants)) et peut le retirer, par exemple après la vente du lot. Les documents visibles sont ceux que le syndic dépose dans les [documents de copropriété](/wiki/syndic-copropriete/documents-copropriete).",
          ],
        },
      ],
      packs: ["syndic", "integre"],
      profiles: ["coproprietaire"],
      status: "disponible",
      actions: [
        {
          title: "Consulter mes lots",
          goal: "Voir la liste de ses lots ouverts au portail, avec le solde de chacun.",
          output:
            "Pour chaque lot : le numéro, le type, les tantièmes généraux et spéciaux, la quote-part, la copropriété et le solde (débiteur, créditeur ou à jour).",
          prereq: "Le syndic a invité le copropriétaire au portail.",
        },
        {
          title: "Consulter le compte d'un lot",
          goal: "Voir le solde et l'historique du compte de l'un de ses lots.",
          output:
            "Le solde, la date de dernière mise à jour et les 200 derniers mouvements (débit, crédit, solde après opération, référence, date).",
        },
        {
          title: "Consulter mes appels de charges",
          goal: "Voir les appels de charges de tous ses lots ou d'un seul, avant de les payer en ligne si le paiement est ouvert.",
          output:
            "Pour chaque appel : la période, le montant, le payé, le restant dû, l'échéance et le statut, y compris « en retard ».",
        },
        {
          title: "Consulter les documents de la copropriété",
          goal: "Voir le règlement de copropriété et les procès-verbaux d'assemblée générale. Les autres documents du syndic ne sont pas affichés.",
        },
        {
          title: "Télécharger un document",
          goal: "Télécharger le règlement de copropriété ou un procès-verbal d'assemblée.",
        },
        {
          title: "Consulter les assemblées générales",
          goal: "Voir les assemblées de sa copropriété et leur ordre du jour.",
          output:
            "Le type, la date, le lieu, le statut et l'ordre du jour ; pour une assemblée clôturée, les résolutions, les résultats et ses propres votes, jamais ceux des autres lots.",
        },
        {
          title: "Consulter mes paiements",
          goal: "Voir les paiements de charges versés sur ses lots, leur affectation aux appels et l'avance restante par lot.",
          input: "Un lot ou une année, si besoin.",
          output: "Pour chaque paiement : la date, le montant, le mode, la référence, le lot et les reçus ou quittances liés.",
        },
        {
          title: "Consulter mes reçus et quittances",
          goal: "Retrouver les reçus de paiement et les quittances d'appel émis à son nom sur ses lots.",
          input: "Un lot, un type de document ou une période, si besoin.",
          output: "La liste des documents avec leur numéro, le lot, la période, le montant et la date d'émission.",
        },
        {
          title: "Télécharger un reçu ou une quittance",
          goal: "Télécharger en PDF un reçu ou une quittance de ses lots.",
        },
        {
          title: "Télécharger le relevé de compte d'un lot",
          goal: "Obtenir en PDF le relevé du compte d'un lot sur une période, jamais avant son acquisition.",
          input: "Le lot et la période, si besoin.",
          output: "Un PDF avec le solde d'ouverture, les mouvements et le solde de clôture.",
        },
        {
          title: "Consulter le suivi mensuel d'un lot",
          goal: "Voir mois par mois ce qui est dû et payé sur un lot, avec l'avance disponible.",
          input: "L'année, par défaut l'année en cours.",
          output: "Une grille de 12 mois avec les totaux dû, payé et restant. Les mois avant l'acquisition du lot restent vides.",
        },
        {
          title: "Consulter la fiche de ma copropriété",
          goal: "Voir l'identité d'une copropriété où l'on a un lot.",
          output: "L'adresse, l'immatriculation, le nombre de lots, ses propres lots, l'émetteur des documents et le contact du syndic.",
        },
        {
          title: "Télécharger l'avis d'appel de charges",
          goal: "Récupérer en PDF l'avis d'un appel de charges de l'un de ses lots, depuis la liste de ses appels.",
          prereq: "L'appel porte sur un lot qu'il détient et date d'après l'acquisition du lot.",
        },
        {
          title: "Savoir si le paiement en ligne est ouvert",
          goal: "Voir, pour chaque copropriété où l'on a un lot, si le règlement en ligne des appels de charges est ouvert, qui paie les frais du service de paiement éventuels et quels moyens de paiement sont annoncés : Wave, Orange Money, MTN Money, Moov Money. Quand le paiement n'est pas ouvert, aucun bouton de paiement n'apparaît et un message précise que le règlement en ligne n'est pas encore ouvert pour la copropriété.",
          output: "Un état par copropriété : paiement ouvert ou non, et les moyens de paiement.",
          prereq: "Le syndic a configuré et activé le paiement en ligne de la copropriété (voir la fiche Paiement en ligne des charges).",
        },
        {
          title: "Choisir les appels à régler en ligne",
          goal: "Cocher les appels de charges à payer. Une case apparaît sur chaque appel payable (reste dû supérieur à zéro, en francs CFA, paiement ouvert pour la copropriété). Un paiement couvre des appels entiers d'un seul lot, de 1 à 24 : dès qu'un appel est coché, les appels des autres lots sont grisés. Un bandeau affiche le total, la mention des frais éventuels du service de paiement et les moyens de paiement.",
          output:
            "Le total à payer. Un appel déjà couvert par un paiement engagé est grisé, avec la mention « Paiement en cours » (et « Reprendre le paiement » si c'est lui qui l'a lancé) ou « Paiement en vérification ».",
          prereq: "Consulter ses appels de charges, avec le paiement en ligne ouvert pour la copropriété.",
        },
        {
          title: "Payer mes appels de charges en ligne",
          goal: "Régler en mobile money les appels cochés, depuis la page de paiement sécurisée de l'opérateur. Le montant n'est jamais saisi : il est recalculé par ImmoTopia à partir du reste dû de chaque appel. Si un appel est soldé entre-temps, l'excédent devient une avance sur le compte du lot. Un paiement déjà en attente sur les mêmes appels, au même montant, est repris au lieu d'en créer un second.",
          input: "Les appels à régler (d'un même lot), puis le bouton « Payer en ligne ».",
          output: "La page de paiement de l'opérateur, puis, au succès, les reçus et quittances émis.",
          prereq: "Choisir les appels à régler en ligne. Si un paiement est déjà en cours ou en vérification sur ces appels, le portail l'indique.",
        },
        {
          title: "Reprendre un paiement en cours",
          goal: "Revenir sur la page de paiement d'un paiement déjà ouvert plutôt que d'en créer un second : bouton « Reprendre le paiement » à côté de la mention « Paiement en cours », ou dans l'alerte affichée quand un paiement est déjà en cours. Le lien de la page de paiement n'est donné qu'à la personne qui a lancé le paiement.",
          prereq: "Le paiement doit avoir été lancé depuis ce compte et être encore en attente.",
        },
        {
          title: "Suivre un paiement après le retour de l'opérateur",
          goal: "Au retour de la page de paiement, un bandeau interroge le serveur toutes les quelques secondes, pendant environ deux minutes, puis affiche le résultat : paiement confirmé (appels réglés et numéros des reçus ou quittances), échoué, annulé ou expiré, « en cours de vérification par le syndic » (inutile de payer deux fois), ou délai écoulé. Seul le statut enregistré par ImmoTopia fait foi, jamais l'adresse de retour.",
          output: "Le statut du paiement et, au succès, les appels réglés avec leurs reçus ou quittances.",
          prereq: "Avoir lancé un paiement en ligne.",
        },
        {
          title: "Rejoindre l'assemblée générale en direct",
          goal: "Obtenir son lien personnel et ouvrir l'assemblée en cours pour émarger et voter, sans mot de passe, depuis le bouton « Rejoindre l'AG en direct » de la page Assemblées. Voir la fiche Assemblée générale par lien personnel.",
          output: "L'assemblée en direct, ouverte avec son lien personnel.",
          prereq:
            "Il doit voter ou représenter un lot dans l'assemblée de sa copropriété, qui ne doit être ni clôturée ni annulée.",
        },
      ],
      faq: [
        {
          q: "Comment un copropriétaire accède-t-il au portail ?",
          a: "Sur invitation du syndic. Le syndic l'invite depuis la fiche du copropriétaire ; le copropriétaire reçoit un lien d'invitation pour activer son compte ou s'y connecter. Le syndic peut retirer cet accès, par exemple après la vente de son lot.",
        },
        {
          q: "Le portail est-il sécurisé ? Que voit chaque copropriétaire ?",
          a: "L'accès est personnel et se fait sur invitation. Chaque copropriétaire ne voit que ses propres lots et uniquement ses propres votes. Parmi les documents du syndic, seuls le règlement de copropriété et les procès-verbaux d'assemblée lui sont affichés.",
        },
        {
          q: "Le copropriétaire peut-il payer ses charges en ligne ?",
          a: "Oui, quand le syndic a ouvert le paiement en ligne pour sa copropriété. Il coche les appels à régler (entiers, d'un seul lot à la fois), paie en mobile money, puis suit le résultat dans un bandeau et retrouve ses reçus et ses quittances. Sans ouverture du paiement en ligne, le portail affiche les appels de charges, le montant payé et le restant dû, sans bouton de paiement.",
        },
        {
          q: "Le copropriétaire peut-il participer à l'assemblée générale depuis son portail ?",
          a: "Oui. Pendant une assemblée en cours, il clique sur « Rejoindre l'AG en direct » : son lien personnel s'ouvre et il peut émarger, voter et, si le syndic a la visio, suivre la séance en vidéo.",
        },
        {
          q: "Peut-on retrouver le procès-verbal d'une assemblée générale dans le portail ?",
          a: "Oui. Le copropriétaire consulte et télécharge les procès-verbaux d'assemblée que le syndic a déposés dans les documents de la copropriété.",
        },
        {
          q: "Voit-il les votes des autres copropriétaires ?",
          a: "Non. Pour une assemblée clôturée, il voit les résultats de chaque résolution et uniquement ses propres votes.",
        },
        {
          q: "Le copropriétaire peut-il télécharger un relevé de compte ?",
          a: "Oui. Il obtient en PDF le relevé du compte d'un de ses lots sur une période, avec le solde d'ouverture, les mouvements et le solde de clôture.",
        },
      ],
      related: [
        "syndic-copropriete/coproprietaires-et-occupants",
        "syndic-copropriete/assemblees-generales",
        "syndic-copropriete/documents-copropriete",
        "syndic-copropriete/appels-de-charges",
        "syndic-copropriete/paiement-en-ligne-des-charges",
        "portails-clients/assemblee-par-lien-personnel",
        "portails-clients/payer-un-appel-de-charges",
        "portails-clients/portail-proprietaire",
      ],
    },
    {
      slug: "assemblee-par-lien-personnel",
      title: "Assemblée générale par lien personnel",
      h1: "Participer à l'assemblée générale par lien personnel",
      metaTitle: "Assemblée générale en ligne : émarger et voter par lien",
      summary:
        "Côté copropriétaire : ouvrez votre lien personnel, émargez, votez sur les résolutions et rejoignez la visio de l'assemblée générale, sans mot de passe.",
      intro:
        "Le copropriétaire, ou son mandataire, reçoit du syndic un lien personnel qui ouvre directement l'assemblée en direct, sans compte ni mot de passe. La page lui montre l'ordre du jour, le quorum, ses lots et ceux qu'il représente, et l'état des votes, rafraîchis automatiquement. Il émarge en ligne et vote Pour, Contre ou Abstention. Si le syndic a la visio, il rejoint la salle depuis la même page. C'est la vue du participant ; la console de l'animateur est décrite dans [Assemblées générales](/wiki/syndic-copropriete/assemblees-generales) et [Visio des assemblées](/wiki/syndic-copropriete/visio-des-assemblees). La participation en ligne est incluse dans les packs Syndic et Opérateur intégré ; la visio est une extension payante (voir les [Tarifs](/tarifs)).",
      sections: [
        {
          title: "Que voit le copropriétaire pendant un vote ?",
          body: [
            "Tant que le vote d'une résolution est ouvert, le copropriétaire voit seulement le nombre de lots qui ont déjà voté, jamais le sens des votes des autres. Le résultat de la résolution apparaît à la clôture du vote.",
            "Il peut revoter tant que le vote est ouvert. Un vote saisi par le syndic ne peut pas être remplacé en ligne, et un mandataire ne peut pas remplacer le vote du copropriétaire lui-même.",
          ],
        },
      ],
      packs: ["syndic", "integre"],
      profiles: ["coproprietaire", "visiteur"],
      status: "disponible",
      actions: [
        {
          title: "Ouvrir l'assemblée par mon lien personnel",
          goal: "Ouvrir son lien, sans mot de passe, pour voir l'assemblée en direct : l'ordre du jour, la visio si elle est activée, le quorum, ses lots et ceux qu'il représente, et l'état des votes. La page se met à jour toute seule.",
          output:
            "L'assemblée, la personne connectée, ses lots, le quorum et les résolutions avec la participation, ses propres votes et le résultat seulement après la clôture du vote. Un avis « Cette assemblée est enregistrée » s'affiche quand la séance est enregistrée.",
          prereq:
            "Le syndic a transmis le lien personnel (ou le copropriétaire l'a obtenu depuis son portail). Un lien révoqué ou expiré n'ouvre rien.",
        },
        {
          title: "Émarger en ligne",
          goal: "Signaler sa présence en cliquant sur « Rejoindre l'assemblée » : ses lots passent présents en ligne, ceux de ses mandants représentés, et le quorum se met à jour.",
          output: "La page à jour, avec ses lots présents.",
          prereq: "L'assemblée doit être planifiée ou en cours.",
        },
        {
          title: "Voter en ligne sur une résolution",
          goal: "Voter Pour, Contre ou Abstention sur une résolution ouverte, pour tous ses lots d'un coup ou lot par lot, y compris les lots qu'il représente. Le revote est possible tant que le vote est ouvert.",
          input: "Le sens du vote, pour chaque lot concerné.",
          output: "Ses votes enregistrés, visibles sur la page.",
          prereq:
            "Il doit avoir rejoint l'assemblée, qui doit être en cours, et la résolution doit être ouverte au vote.",
        },
        {
          title: "Rejoindre la visio de l'assemblée",
          goal: "Entrer dans la salle de visio depuis la page de l'assemblée : voir et entendre le gestionnaire, sans micro ni caméra tant que la parole n'est pas donnée. Le vote et les résolutions restent à côté (en onglets sur téléphone).",
          prereq: "Il doit avoir rejoint l'assemblée, en cours. La visio doit être activée par le syndic (extension « Visio des assemblées »).",
        },
        {
          title: "Lever ou baisser la main en visio",
          goal: "Demander la parole au gestionnaire pendant la visio. La main levée est visible de tous dans la salle et apparaît en tête de liste dans la console du gestionnaire.",
          prereq: "Il doit être présent dans la salle de visio.",
        },
        {
          title: "Lire la discussion de la visio",
          goal: "Voir les messages de la salle (les 200 derniers à l'entrée, puis en direct) et savoir si l'on peut écrire. Les messages masqués par le gestionnaire apparaissent comme tels.",
          output: "Les messages avec leur auteur, la marque « Gestionnaire » pour les messages du syndic, et l'heure. Aucune donnée de lot, de tantième ni de coordonnée n'est montrée.",
          prereq: "Il doit être présent dans la salle de visio.",
        },
        {
          title: "Écrire dans la discussion de la visio",
          goal: "Envoyer un court message en texte simple (500 caractères au plus), visible de tous les participants de la salle sous son nom. Un message ne vaut pas vote.",
          input: "Le texte du message.",
          output: "Le message publié dans la salle.",
          prereq:
            "Il doit être présent dans la salle, la discussion doit être ouverte et son écriture ne doit pas avoir été coupée par le gestionnaire. Le nombre de messages par minute est limité.",
        },
      ],
      faq: [
        {
          q: "Faut-il un compte pour participer à l'assemblée en ligne ?",
          a: "Non. Le lien personnel remis par le syndic suffit. Un copropriétaire qui a un compte sur son portail peut aussi obtenir son lien depuis la page Assemblées.",
        },
        {
          q: "Un mandataire peut-il voter pour le compte d'un copropriétaire ?",
          a: "Oui. Son lien lui donne accès aux lots qu'il représente, qu'il vote en ligne comme les siens. Il ne peut pas remplacer le vote que le copropriétaire a lui-même exprimé.",
        },
        {
          q: "Que se passe-t-il si le lien est révoqué ?",
          a: "Il n'ouvre plus rien. Le syndic peut en remettre un nouveau au participant.",
        },
      ],
      related: [
        "syndic-copropriete/assemblees-generales",
        "syndic-copropriete/visio-des-assemblees",
        "portails-clients/portail-coproprietaire",
      ],
    },
    {
      slug: "payer-un-appel-de-charges",
      title: "Page de paiement d'un appel de charges",
      h1: "Payer un appel de charges de copropriété par lien",
      metaTitle: "Payer un appel de charges en ligne par lien, sans compte",
      summary:
        "Côté copropriétaire : ouvrez le lien « Payer cet appel » reçu de votre syndic, vérifiez le reste dû, payez en mobile money sans compte, puis suivez le statut.",
      intro:
        "Le copropriétaire reçoit de son syndic, par WhatsApp, par e-mail ou en main propre, un lien vers un seul appel de charges. La page lui montre la copropriété, le lot, la période, l'échéance et le reste dû, puis lance le paiement en mobile money. Au retour, une page lui indique si le règlement est reçu, en cours de vérification, échoué ou annulé. C'est le parcours du copropriétaire ; la création et le suivi des liens se font côté syndic, dans [Paiement en ligne des charges](/wiki/syndic-copropriete/paiement-en-ligne-des-charges). Cette fonction est incluse dans les packs Syndic et Opérateur intégré.",
      packs: ["syndic", "integre"],
      profiles: ["coproprietaire", "visiteur"],
      status: "disponible",
      actions: [
        {
          title: "Consulter l'appel à payer depuis le lien reçu",
          goal: "Afficher, sans connexion, la copropriété, le lot, la période, l'échéance et le reste dû de l'appel, recalculé à chaque ouverture, ainsi que les moyens de paiement et la mention des frais éventuels. La page signale un paiement déjà en cours ou en vérification par le syndic.",
          output:
            "Le nom de la copropriété, le lot, la période, l'échéance, le montant dû et la date d'expiration du lien. Ni le nom du copropriétaire ni ses coordonnées ne sont affichés.",
          prereq:
            "Le lien est valide et l'appel reste à payer. Un lien inconnu, expiré, révoqué ou dont le lot a changé de copropriétaire affiche « Lien invalide ou expiré. ».",
        },
        {
          title: "Payer l'appel de charges depuis le lien",
          goal: "Lancer le paiement en mobile money (Wave, Orange Money, MTN Money, Moov Money) avec le bouton « Payer ». Le montant est celui du reste dû de l'appel, calculé par ImmoTopia : il n'est jamais saisi. Si un paiement est déjà en attente pour le même appel, il est repris.",
          output: "La page de paiement de l'opérateur choisi.",
          prereq:
            "Consulter l'appel depuis le lien. Si un paiement est déjà en cours, ou en vérification par le syndic, la page l'indique : inutile de payer deux fois.",
        },
        {
          title: "Suivre le statut du paiement",
          goal: "Savoir, au retour de la page de paiement, si le règlement est reçu, en cours de vérification, échoué ou annulé. La page se met à jour toute seule pendant environ deux minutes, et un rechargement reprend la vérification.",
          output: "Le statut, le montant, la copropriété et la période.",
          prereq: "Avoir lancé le paiement depuis le lien.",
        },
      ],
      faq: [
        {
          q: "Le copropriétaire a-t-il besoin d'un compte pour payer ?",
          a: "Non. Le lien lui ouvre directement la page de paiement de l'appel concerné.",
        },
        {
          q: "Le montant peut-il être modifié par le copropriétaire ?",
          a: "Non. Le montant est le reste dû de l'appel, calculé par ImmoTopia à l'ouverture, et non une saisie.",
        },
        {
          q: "Pendant combien de temps le lien reste-t-il valable ?",
          a: "Entre 1 et 30 jours selon le choix du syndic. Un lien joint automatiquement à un avis ou à une relance reste valable 30 jours, et le syndic peut le révoquer à tout moment.",
        },
      ],
      related: [
        "syndic-copropriete/paiement-en-ligne-des-charges",
        "portails-clients/portail-coproprietaire",
        "syndic-copropriete/appels-de-charges",
      ],
    },
    {
      slug: "vue-patrimoine-proprietaire",
      title: "Patrimoine dans le portail propriétaire",
      metaTitle: "Valeur et rendement de ses biens dans le portail propriétaire",
      summary:
        "Le propriétaire suit en ligne la valeur de ses biens, sa plus-value latente, ses rendements, ses emprunts et les documents de chaque bien, en lecture seule.",
      intro:
        "En plus des loyers, le propriétaire peut consulter la valeur et la performance de ses biens, telles que l'agence les a renseignées : dernière valorisation, plus-value latente, rendements, capital restant dû des emprunts. Seules les rubriques que l'agence ouvre sont visibles. Il retrouve aussi le dossier de chaque bien et télécharge les documents.",
      packs: ["agence", "promoteur", "integre"],
      profiles: ["proprietaire"],
      menu: "Portail propriétaire › Mon patrimoine",
      status: "disponible",
      actions: [
        {
          title: "Consulter mon patrimoine",
          goal: "Voir la valeur et la performance de l'ensemble de ses biens.",
          output:
            "Le nombre de biens, la valeur estimée, la plus-value latente et le capital restant dû, pondérés par sa quote-part. Pour chaque bien : valorisation, rendements brut, net et net après emprunt, résumé des emprunts et quote-part en indivision.",
          prereq:
            "L'agence a saisi les valorisations, emprunts et dépenses et a ouvert cette vue au propriétaire. Les biens confiés sous mandat de gestion en cours en font partie.",
        },
        {
          title: "Consulter le patrimoine d'un bien",
          goal: "Ouvrir le détail patrimonial de l'un de ses biens.",
          output:
            "L'historique des valorisations, la plus-value latente, les rendements, les emprunts, les travaux et les documents. Une rubrique que l'agence n'ouvre pas n'apparaît pas.",
        },
        {
          title: "Télécharger un document patrimonial",
          goal: "Ouvrir un document du dossier d'un de ses biens : titre, acte notarié, assurance, diagnostic.",
        },
      ],
      faq: [
        {
          q: "Le propriétaire voit-il tout le patrimoine de l'agence ?",
          a: "Non. Il ne voit que ses propres biens, et seulement les rubriques que l'agence a ouvertes.",
        },
      ],
      related: ["portails-clients/portail-proprietaire", "gestion-locative/acces-partages-tiers-de-confiance"],
    },
    {
      slug: "rapport-mensuel-proprietaire",
      title: "Rapport mensuel par lien sécurisé",
      metaTitle: "Rapport mensuel du propriétaire consultable par lien sécurisé",
      summary:
        "Le propriétaire ouvre son rapport mensuel de gérance depuis un lien reçu par WhatsApp ou e-mail, sans compte, et l'imprime ou l'enregistre en PDF.",
      intro:
        "Quand l'agence lui envoie son rapport du mois, le propriétaire clique sur le lien et le lit tout de suite, sans identifiant. Il voit les totaux du mois et le détail bien par bien, puis l'imprime ou l'enregistre en PDF depuis son navigateur. Le lien a une durée limitée et l'agence peut le retirer à tout moment.",
      packs: ["agence", "integre"],
      profiles: ["proprietaire", "visiteur"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le rapport du mois par lien",
          goal: "Afficher en lecture seule le relevé du mois d'un seul propriétaire, sans connexion.",
          output:
            "Les totaux du mois, dont la retenue à la source et le dépôt de garantie conservé, et le détail par bien. Le rapport s'imprime ou s'enregistre en PDF.",
          prereq:
            "L'agence a envoyé le rapport du mois ou créé un lien. Un lien inconnu, expiré ou retiré n'affiche rien.",
        },
      ],
      faq: [
        {
          q: "Que se passe-t-il quand le lien expire ?",
          a: "Il n'affiche plus rien. L'agence peut en envoyer un nouveau, et retirer à tout moment un lien encore valide.",
        },
      ],
      related: ["gestion-locative/releves-de-gerance", "gestion-locative/notifications-proprietaire"],
    },
    {
      slug: "paiement-loyer-par-lien",
      title: "Page de paiement d'un loyer",
      h1: "Payer son loyer en ligne par lien",
      metaTitle: "Payer son loyer en ligne par lien, sans compte",
      summary:
        "Côté locataire : ouvrez le lien de paiement reçu de votre agence, voyez le reste dû de votre loyer et payez en Mobile Money, sans compte, puis suivez le statut.",
      intro:
        "Le locataire reçoit de son agence un lien vers une seule échéance de loyer. La page lui montre l'agence, la période, la date d'échéance et le reste dû, puis lance le paiement Mobile Money. Au retour, une page lui indique si le règlement est confirmé, en cours, échoué ou annulé. C'est le parcours du locataire ; la création et le suivi des liens se font côté agence, dans [Générer des liens de paiement de loyer](/wiki/gestion-locative/liens-de-paiement-loyer). Cette fonction est en cours de déploiement : elle est éprouvée en mode simulation, et le paiement réel n'est pas encore validé.",
      packs: ["agence", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["locataire", "visiteur"],
      status: "deploiement",
      actions: [
        {
          title: "Payer mon loyer depuis le lien reçu",
          goal: "Afficher l'échéance concernée et son reste dû, puis lancer le paiement Mobile Money.",
          output:
            "Le nom de l'agence, la période, la date d'échéance et le montant dû, pénalités comprises, puis la page de paiement de l'opérateur choisi : Wave, Orange Money, MTN ou Moov.",
          prereq:
            "Le lien est valide et l'échéance n'est ni soldée ni annulée. Si un paiement est déjà en cours, la page l'indique.",
        },
        {
          title: "Suivre le statut du paiement",
          goal: "Savoir si le règlement est confirmé, en cours, échoué ou annulé, au retour de la page de paiement.",
          output: "Le statut, le montant, l'agence et la période, mis à jour automatiquement pendant quelques minutes.",
        },
      ],
      faq: [
        {
          q: "Le montant peut-il être modifié par le locataire ?",
          a: "Non. Le montant est celui du reste dû de l'échéance, calculé par ImmoTopia, et non celui d'une saisie.",
        },
      ],
      related: ["gestion-locative/liens-de-paiement-loyer", "portails-clients/portail-locataire"],
    },
    {
      slug: "acces-partage-tiers-de-confiance",
      title: "Accès partagé en lecture seule",
      h1: "Accès partagé en lecture seule : l'espace du notaire ou du banquier",
      metaTitle: "Consulter un dossier partagé par une agence, sans compte",
      summary:
        "Côté destinataire : notaire, expert-comptable ou banquier ouvre le lien reçu, consulte en lecture seule les biens accordés et télécharge les documents partagés.",
      intro:
        "Le destinataire d'un accès partagé n'a ni compte ni mot de passe à créer. Le lien qu'il reçoit ouvre une page en lecture seule, avec la mention de l'agence qui lui accorde l'accès. Il ne voit que les biens et les rubriques accordés, et ne télécharge que les documents explicitement partagés. Chaque consultation est enregistrée. C'est la vue du destinataire ; l'agence crée et gère l'accès dans [Partager un dossier avec un notaire, un banquier ou un expert-comptable](/wiki/gestion-locative/acces-partages-tiers-de-confiance).",
      packs: ["agence", "integre"],
      profiles: ["visiteur"],
      status: "disponible",
      actions: [
        {
          title: "Consulter le patrimoine en lecture seule",
          goal: "Voir les biens du périmètre et les seules rubriques accordées : valorisations, rendement et ratios, emprunts, dépenses, baux et loyers, titres et propriété, documents partageables.",
          output:
            "Une page en lecture seule avec l'agence, le bénéficiaire, l'échéance de l'accès, les rubriques et les biens. Aucune coordonnée ni identité de locataire n'est affichée.",
          prereq: "L'agence a créé l'accès et envoyé le lien. Un lien inconnu, expiré ou retiré n'affiche rien.",
        },
        {
          title: "Télécharger un document partagé",
          goal: "Télécharger un document que l'agence a explicitement partagé : titre de propriété, acte, diagnostic.",
          prereq: "La rubrique documents est accordée et le document appartient à l'accès.",
        },
      ],
      related: ["gestion-locative/acces-partages-tiers-de-confiance"],
    },
  ],
};
