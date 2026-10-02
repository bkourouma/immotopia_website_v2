import type { WikiDomain } from "./types";

export const portailsClients: WikiDomain = {
  slug: "portails-clients",
  title: "Portails clients",
  metaTitle: "Portail locataire et propriétaire en ligne, Côte d'Ivoire",
  summary:
    "Donnez à vos propriétaires, locataires et copropriétaires un espace en ligne : loyers, échéances, documents, incidents, appels de charges et assemblées.",
  intro:
    "Les portails clients ouvrent à vos clients un accès en ligne à leurs propres informations, tenues par votre agence. Le propriétaire suit ses biens, ses revenus et ses documents ; le locataire consulte son bail, déclare ses paiements et signale ses incidents ; le copropriétaire suit ses lots, ses appels de charges et les assemblées générales. Chacun ne voit que ce qui le concerne. Des pages publiques sans compte complètent ces portails : paiement d'un loyer, rapport mensuel du propriétaire et accès en lecture seule pour un tiers de confiance. Votre équipe répond à moins d'appels pour une simple question de solde ou de document.",
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
      metaTitle: "Portail copropriétaire en ligne : charges, AG et documents",
      summary:
        "Vos copropriétaires suivent en ligne leurs lots, le solde de leur compte, leurs appels de charges, le règlement de copropriété, les PV et les assemblées.",
      intro:
        "Le portail copropriétaire donne à chaque copropriétaire invité par le syndic un accès à ses propres lots. Il consulte le solde de chaque lot et ses appels de charges, et télécharge le règlement de copropriété et les procès-verbaux d'assemblée. Pour une assemblée clôturée, il voit les résolutions, les résultats et ses propres votes. Le syndic reçoit moins de demandes de relevé ou de copie de PV.",
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
          goal: "Voir, en lecture seule, les appels de charges de tous ses lots ou d'un seul.",
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
          goal: "Voir les assemblées de sa copropriété et leur ordre du jour, en lecture seule.",
          output:
            "Le type, la date, le lieu, le statut et l'ordre du jour ; pour une assemblée clôturée, les résolutions, les résultats et ses propres votes, jamais ceux des autres lots.",
        },
        {
          title: "Consulter mes paiements",
          goal: "Voir, en lecture seule, les paiements de charges versés sur ses lots, leur affectation aux appels et l'avance restante par lot.",
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
      ],
      faq: [
        {
          q: "Le copropriétaire peut-il payer ses charges en ligne ?",
          a: "Non. Le portail affiche les appels de charges, le montant payé et le restant dû, en lecture seule.",
        },
        {
          q: "Voit-il les votes des autres copropriétaires ?",
          a: "Non. Pour une assemblée clôturée, il voit les résultats de chaque résolution et uniquement ses propres votes.",
        },
      ],
      related: ["portails-clients/portail-proprietaire"],
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
      metaTitle: "Payer son loyer par Mobile Money depuis un lien reçu",
      summary:
        "Le locataire ouvre le lien reçu de son agence, voit le reste dû de son échéance et paie en Mobile Money, sans compte, puis suit le statut de son paiement.",
      intro:
        "Le locataire reçoit de son agence un lien vers une seule échéance de loyer. La page lui montre l'agence, la période, la date d'échéance et le reste dû, puis lance le paiement Mobile Money. Au retour, une page lui indique si le règlement est confirmé, en cours, échoué ou annulé. Cette fonction est en cours de déploiement : elle est éprouvée en mode simulation, et le paiement réel n'est pas encore validé.",
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
      metaTitle: "Consulter un patrimoine par accès partagé, sans compte",
      summary:
        "Le notaire, l'expert-comptable ou le banquier ouvre le lien reçu, consulte en lecture seule les biens accordés et télécharge les documents partagés.",
      intro:
        "Le destinataire d'un accès partagé n'a ni compte ni mot de passe à créer. Le lien qu'il reçoit ouvre une page en lecture seule, avec la mention de l'agence qui lui accorde l'accès. Il ne voit que les biens et les rubriques accordés, et ne télécharge que les documents explicitement partagés. Chaque consultation est enregistrée.",
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
