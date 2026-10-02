import type { WikiDomain } from "./types";

// Console de l'éditeur ImmoTopia : réservée au super-administrateur, donc aucun pack n'y donne accès.
// Les écrans que voit une agence (collaborateurs, rôles, paramètres, abonnement, factures) sont dans agence-et-abonnement.ts.

export const administrationPlateforme: WikiDomain = {
  slug: "administration-plateforme",
  title: "Administration de la plateforme",
  metaTitle: "Administration de la plateforme ImmoTopia (éditeur)",
  summary:
    "La console de l'éditeur ImmoTopia : agences, catalogue des packs, abonnements, facturation, rôles, statistiques, journal d'audit, Assistant IA et SMS.",
  intro:
    "Ce domaine décrit la console d'administration de la plateforme. C'est l'outil de l'éditeur ImmoTopia, réservé au super-administrateur : aucune agence n'y a accès et aucun pack ne l'ouvre. Il sert à créer et suivre les agences, gérer le catalogue des packs et les abonnements, émettre les factures, régler les droits et les menus, suivre l'activité et configurer l'Assistant IA. Ce que voit une agence dans son propre espace est décrit dans « Agence, équipe et abonnement ».",
  features: [
    {
      slug: "catalogue-et-devis",
      title: "Catalogue des packs et devis",
      metaTitle: "Catalogue des packs et estimation de prix (console éditeur)",
      summary:
        "Consultez le catalogue des packs, extensions et mises en route, modifiez une offre et estimez le coût d'une composition de packs avant de la proposer à une agence.",
      intro:
        "Le catalogue réunit les packs, les extensions et les mises en route proposés aux agences. Le super-administrateur le consulte, ajuste une offre et simule le coût d'une combinaison avant de la souscrire pour une agence. Modifier une offre n'affecte pas les abonnements en cours : les conditions sont figées à la souscription.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Agences › composition de pack",
      status: "disponible",
      actions: [
        {
          title: "Consulter le catalogue",
          goal: "Voir les packs, extensions et mises en route disponibles, y compris ceux qui ne sont pas encore commercialisés.",
          output: "La liste des offres avec leurs capacités et leurs règles.",
        },
        {
          title: "Modifier une offre du catalogue",
          goal: "Changer le nom, la description, la règle de vente ou l'ordre d'affichage d'une offre.",
          input: "Les champs à modifier.",
          output: "L'offre est mise à jour ; les abonnements en cours ne changent pas.",
        },
        {
          title: "Estimer une composition",
          goal: "Calculer le coût mensuel et annuel d'une combinaison de packs et de quantités.",
          input: "Les packs et les quantités souhaitées (lots, copropriétés, chantiers).",
          output: "Le détail de l'estimation. Les combinaisons incompatibles sont refusées : un pack ne se prend qu'une fois, le pack Intégré est exclusif, et Patrimoine Essentiel et Pro ne se cumulent pas.",
        },
      ],
      related: ["administration-plateforme/abonnements-des-agences", "agence-et-abonnement/abonnement-par-pack"],
    },
    {
      slug: "gestion-des-agences",
      title: "Gestion des agences",
      metaTitle: "Créer, suspendre et suivre les agences (console éditeur)",
      summary:
        "Créez une agence en un clic, modifiez son identité, suspendez-la ou réactivez-la, consultez ses statistiques et ses modules, et forcez un module au besoin.",
      intro:
        "Le super-administrateur voit la liste de toutes les agences et ouvre la fiche de chacune. La création d'une agence se fait en une seule opération : l'agence, ses modules, un abonnement d'essai de 30 jours, ses paramètres financiers par défaut, ses comptes de base et l'invitation de son premier administrateur.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Agences",
      status: "disponible",
      actions: [
        {
          title: "Créer une agence en un clic",
          goal: "Mettre en place une agence complète et inviter son administrateur.",
          input: "Le nom de l'agence, le nom et l'e-mail de l'administrateur, et les packs choisis.",
          output:
            "L'agence est active avec ses modules, un abonnement d'essai et les réglages de départ. Rejouer la même création n'en crée pas une seconde : l'écran indique « Agence déjà créée » et l'invitation précédente reste valable.",
        },
        {
          title: "Lister les agences",
          goal: "Retrouver toutes les agences de la plateforme.",
          output: "La liste, avec un résumé de pack, de consommation, d'échéance et de demandes ouvertes.",
        },
        {
          title: "Consulter la fiche d'une agence",
          goal: "Voir le détail d'une agence.",
        },
        {
          title: "Modifier une agence",
          goal: "Mettre à jour l'identité, les coordonnées, l'image de marque et le statut d'une agence.",
          output: "La fiche est à jour. Passer l'agence en suspension ferme ses sessions.",
        },
        {
          title: "Consulter les statistiques d'une agence",
          goal: "Voir l'effectif, les modules actifs, l'abonnement et la dernière connexion.",
        },
        {
          title: "Suspendre une agence",
          goal: "Couper l'accès d'une agence, par exemple en cas d'impayé prolongé.",
          output: "L'agence est suspendue et toutes ses sessions en cours sont fermées.",
        },
        {
          title: "Réactiver une agence",
          goal: "Rendre l'accès à une agence suspendue.",
          output: "L'agence redevient active.",
          prereq: "L'agence doit être suspendue.",
        },
        {
          title: "Consulter les modules d'une agence",
          goal: "Voir quels modules sont activés et s'ils viennent du pack ou d'une dérogation manuelle.",
        },
        {
          title: "Forcer un module",
          goal: "Activer ou désactiver un module en dehors des packs souscrits.",
          output: "Le module est ouvert ou fermé pour cette agence.",
        },
        {
          title: "Lever une dérogation de module",
          goal: "Revenir à ce que prévoient les packs souscrits.",
          output: "Les modules de l'agence suivent à nouveau son abonnement.",
        },
      ],
      related: ["administration-plateforme/abonnements-des-agences", "agence-et-abonnement/parametres-agence"],
    },
    {
      slug: "abonnements-des-agences",
      title: "Abonnements des agences",
      metaTitle: "Gérer les abonnements des agences (console éditeur)",
      summary:
        "Ajoutez, modifiez ou retirez un pack ou une extension, changez de pack, accordez une dérogation de capacité et traitez les demandes d'extension des agences.",
      intro:
        "Depuis la fiche d'une agence, le super-administrateur gère son abonnement : packs, extensions, mises en route, remises et réglages de quota. Il peut passer l'agence en lecture seule, accorder une dérogation de capacité, prévisualiser la prochaine facture et traiter les demandes d'extension que l'agence lui adresse.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Agences › fiche agence › Abonnement",
      status: "disponible",
      actions: [
        {
          title: "Consulter la vue d'ensemble de l'abonnement",
          goal: "Voir l'abonnement d'une agence : éléments actifs et terminés, dérogations, lignes en attente et droits.",
        },
        {
          title: "Consulter les droits d'une agence",
          goal: "Voir les modules, fonctions et capacités (limite et consommation) de l'agence, la politique de quota et la lecture seule. Ces droits pilotent le menu et les écrans de l'agence.",
          output: "Un module retiré sans aucune donnée dans l'agence n'ouvre plus aucun accès. Un refus de quota ne conseille une extension que si le pack en vend une pour cette capacité.",
        },
        {
          title: "Ajouter un pack, une extension ou une mise en route",
          goal: "Souscrire un élément pour l'agence, avec calcul au prorata au jour près (sauf pendant l'essai).",
          input: "L'élément, la quantité, une remise éventuelle et une note.",
          output:
            "L'élément est souscrit immédiatement. Un pack incompatible est refusé ; une extension n'est vendue qu'avec les packs prévus par le catalogue, et le refus les nomme.",
        },
        {
          title: "Modifier un élément souscrit",
          goal: "Changer la remise ou le prix mensuel convenu d'un élément, sans le retirer puis le rajouter.",
          output: "Le changement joue sur la prochaine facture.",
        },
        {
          title: "Retirer un élément souscrit",
          goal: "Retirer un pack ou une extension, à l'échéance par défaut ou immédiatement avec un motif.",
          output:
            "Un pack retiré entraîne ses extensions. Son module passe en lecture seule seulement s'il contient des données de l'agence ; sinon l'accès est supprimé.",
        },
        {
          title: "Changer de pack",
          goal: "Monter ou descendre de gamme.",
          output:
            "La montée de gamme est immédiate, avec un avoir au prorata ; la descente est programmée à l'échéance. Les extensions suivent le nouveau pack ou prennent fin.",
        },
        {
          title: "Modifier les réglages d'abonnement",
          goal: "Régler la politique de quota, les jours de grâce, la remise de combinaison et la fin de l'essai.",
        },
        {
          title: "Passer une agence en lecture seule",
          goal: "Mettre l'agence en lecture seule, indépendamment d'un impayé, avec un motif obligatoire.",
          output: "L'agence consulte ses données mais ne peut plus les modifier.",
        },
        {
          title: "Lever la lecture seule manuelle",
          goal: "Rendre à l'agence ses droits de modification.",
          output: "Seul le super-administrateur peut la lever.",
        },
        {
          title: "Consulter les dérogations de capacité",
          goal: "Voir l'historique des dérogations accordées ou révoquées.",
        },
        {
          title: "Accorder une dérogation de capacité",
          goal: "Ajuster une limite (lots, copropriétés, chantiers) sans changer de pack, par exemple lors d'une reprise.",
          input: "La capacité, l'écart accordé, le motif et, si besoin, les dates de début et de fin.",
        },
        {
          title: "Révoquer une dérogation de capacité",
          goal: "Annuler une dérogation en cours.",
        },
        {
          title: "Prévisualiser la prochaine facture",
          goal: "Voir les lignes de la prochaine facture (abonnement, mises en route, dépassements) sans rien émettre.",
        },
        {
          title: "Réconcilier les activations de lots",
          goal: "Recalculer les lots activés par rapport à la consommation réelle de l'agence. Un mandat de gestion actif compte tout de suite.",
          output: "Le registre des lots est corrigé ; un essai à blanc est possible avant de l'appliquer.",
        },
        {
          title: "Réconcilier chaque nuit le registre des lots",
          goal: "Une tâche automatique de nuit retire les mandats échus ou résiliés du décompte et corrige les écarts, agence par agence.",
          output: "Une agence en échec est signalée sans arrêter les suivantes.",
        },
        {
          title: "Consulter le résumé de plusieurs agences",
          goal: "Obtenir en une fois le pack, la consommation, l'échéance et les demandes ouvertes de plusieurs agences.",
        },
        {
          title: "Consulter les demandes d'extension d'une agence",
          goal: "Voir les demandes d'extension reçues d'une agence.",
        },
        {
          title: "Traiter une demande d'extension",
          goal: "Clore une demande ouverte, comme traitée ou refusée.",
          output: "La demande change d'état dans l'historique de l'agence.",
        },
      ],
      related: ["administration-plateforme/catalogue-et-devis", "agence-et-abonnement/abonnement-par-pack"],
    },
    {
      slug: "factures-plateforme",
      title: "Factures d'abonnement émises par la plateforme",
      metaTitle: "Facturation des abonnements : émission, avoirs et règlements",
      summary:
        "Générez, émettez et suivez les factures d'abonnement des agences : avoirs, paiements manuels, justificatifs, PDF et paiement en ligne.",
      intro:
        "Le super-administrateur génère les factures d'abonnement d'une agence, les émet, enregistre leur règlement et émet des avoirs si besoin. Chaque facture et chaque justificatif se télécharge en PDF. L'agence retrouve ses factures de son côté et peut les régler en ligne.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Agences › fiche agence › Factures",
      status: "disponible",
      actions: [
        {
          title: "Consulter les factures d'une agence",
          goal: "Voir la liste des factures de l'agence.",
        },
        {
          title: "Générer une facture",
          goal: "Préparer la facture de l'abonnement d'une agence.",
          output: "Une facture en brouillon.",
        },
        {
          title: "Consulter le détail d'une facture",
          goal: "Voir le contenu d'une facture.",
        },
        {
          title: "Émettre une facture brouillon",
          goal: "Rendre la facture officielle et visible de l'agence.",
          prereq: "La facture doit être en brouillon.",
        },
        {
          title: "Marquer une facture payée",
          goal: "Enregistrer le règlement d'une facture.",
        },
        {
          title: "Constater un paiement manuel",
          goal: "Enregistrer un paiement reçu hors de l'application, par exemple un virement.",
        },
        {
          title: "Émettre un avoir",
          goal: "Annuler ou corriger tout ou partie d'une facture émise.",
        },
        {
          title: "Télécharger la facture en PDF",
          goal: "Obtenir le document de la facture.",
        },
        {
          title: "Consulter le règlement d'une facture",
          goal: "Voir le paiement enregistré pour une facture.",
        },
        {
          title: "Télécharger le justificatif de paiement",
          goal: "Obtenir la preuve du paiement.",
        },
        {
          title: "Recevoir la confirmation d'un paiement en ligne",
          goal: "Quand une agence règle une facture en ligne, la plateforme est avertie par le service de paiement et met le règlement à jour.",
          output: "La facture est rapprochée du paiement.",
          status: "deploiement",
        },
        {
          title: "Essayer le parcours de paiement avec le simulateur",
          goal: "Tester le paiement en ligne sans service de paiement réel : succès, échec ou annulation.",
          prereq: "Disponible hors production par défaut.",
          status: "deploiement",
        },
      ],
      related: ["agence-et-abonnement/factures-abonnement", "administration-plateforme/abonnements-des-agences"],
    },
    {
      slug: "roles-et-menus",
      title: "Droits et menus des rôles",
      metaTitle: "Régler les permissions et les menus des rôles (éditeur)",
      summary:
        "Définissez les permissions de chaque rôle et choisissez les entrées de menu visibles par rôle, y compris pour les portails propriétaire et locataire.",
      intro:
        "Le super-administrateur règle ce que chaque rôle permet de faire et ce qu'il voit dans le menu. Il dispose d'une vue d'ensemble des menus coupés par rôle. Les changements s'appliquent aux utilisateurs concernés dès leur prochaine action.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Rôles et permissions",
      status: "disponible",
      actions: [
        {
          title: "Modifier les permissions d'un rôle",
          goal: "Remplacer l'ensemble des permissions d'un rôle.",
          output: "Les droits des utilisateurs concernés sont mis à jour.",
        },
        {
          title: "Consulter la carte des menus par rôle",
          goal: "Voir quels menus sont coupés pour quel rôle.",
        },
        {
          title: "Remplacer les menus d'un rôle",
          goal: "Choisir les entrées de menu visibles pour un rôle, ou pour les portails propriétaire et locataire.",
          output: "Le menu des utilisateurs concernés est mis à jour.",
        },
        {
          title: "Consulter ses menus coupés",
          goal: "L'application lit les menus masqués pour adapter l'écran de chaque utilisateur.",
          profiles: ["equipe"],
        },
      ],
      related: ["agence-et-abonnement/roles-et-permissions"],
    },
    {
      slug: "statistiques-et-audit",
      title: "Statistiques et journal d'audit",
      metaTitle: "Statistiques de la plateforme et journal d'audit (éditeur)",
      summary:
        "Suivez les chiffres de la plateforme et l'activité de chaque agence, consultez le journal d'audit, exportez-le et vérifiez qu'il n'a pas été modifié.",
      intro:
        "Le super-administrateur dispose d'une vue d'ensemble de la plateforme et du détail de l'activité de chaque agence. Le journal d'audit garde l'historique des actions. Une évolution en cours de développement l'étend à toutes les agences et ajoute un export, un contrôle d'intégrité et un scellement automatique.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Statistiques",
      status: "disponible",
      actions: [
        {
          title: "Consulter les statistiques globales",
          goal: "Voir une vue d'ensemble de la plateforme : agences, abonnements et activité.",
        },
        {
          title: "Consulter l'activité d'une agence",
          goal: "Voir les statistiques d'activité détaillées d'une agence.",
        },
        {
          title: "Consulter les journaux d'audit",
          goal: "Retrouver l'historique des actions, filtrable par agence, action, élément concerné, auteur et dates.",
          output:
            "Les événements, du plus récent au plus ancien. L'évolution en développement couvre toutes les agences et la plateforme elle-même, avec chargement page par page.",
        },
        {
          title: "Exporter le journal d'audit en CSV",
          goal: "Obtenir un fichier du journal pour une enquête ou une preuve, au plus 50 000 lignes, les plus récentes d'abord ; au-delà, l'export est tronqué et il faut affiner les filtres.",
          output: "Un fichier CSV. Le nombre d'exports est limité sur une courte période.",
          status: "developpement",
        },
        {
          title: "Vérifier l'intégrité du journal d'audit",
          goal: "Contrôler que le journal n'a été ni modifié ni amputé, sur une période choisie ou sur les scellés les plus récents.",
          output: "Le résultat du contrôle, à la demande et jamais automatique.",
          status: "developpement",
        },
        {
          title: "Sceller, purger et surveiller le journal chaque jour",
          goal: "Une tâche automatique scelle les journées révolues, vérifie la chaîne des scellés et peut purger les lignes plus anciennes que la durée de conservation. La purge est désactivée par défaut.",
          status: "developpement",
        },
      ],
      related: ["agence-et-abonnement/journal-activite-agence"],
    },
    {
      slug: "assistant-ia",
      title: "Réglages de l'Assistant IA",
      metaTitle: "Réglages de l'Assistant IA de la plateforme (éditeur)",
      summary:
        "Choisissez le fournisseur et le modèle de l'Assistant IA, un réglage unique pour toutes les agences, et recherchez un modèle dans le catalogue OpenRouter.",
      intro:
        "L'Assistant IA se règle une seule fois pour toute la plateforme. Le super-administrateur choisit le fournisseur et le modèle, ou désactive l'assistant. Le changement s'applique en une trentaine de secondes. Aucune clé n'est jamais affichée.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Assistant IA",
      status: "disponible",
      actions: [
        {
          title: "Consulter le réglage de l'Assistant IA",
          goal: "Voir le fournisseur, le modèle, l'effort et le modèle de repli, d'où vient le réglage, qui l'a modifié en dernier et quels fournisseurs sont utilisables.",
        },
        {
          title: "Choisir le fournisseur et le modèle",
          goal: "Enregistrer le réglage de la plateforme, ou désactiver l'assistant.",
          input: "Le fournisseur, le modèle et, selon le fournisseur, l'effort et le repli.",
          output: "Le réglage s'applique à toutes les agences ; la modification est tracée au journal d'audit.",
          prereq: "La clé du fournisseur doit être configurée côté serveur.",
        },
        {
          title: "Rechercher un modèle dans le catalogue OpenRouter",
          goal: "Trouver l'identifiant d'un modèle depuis la liste publique d'OpenRouter.",
          output: "La liste des modèles ; si le catalogue ne répond pas, vous saisissez l'identifiant à la main.",
        },
      ],
    },
    {
      slug: "sms",
      title: "Fournisseur SMS",
      metaTitle: "Fournisseur SMS Orange CI : réglages par agence et test",
      summary:
        "Surveillez le compte SMS de la plateforme, réglez l'activation, le nom d'expéditeur et le quota mensuel de chaque agence et envoyez un SMS de test. En développement.",
      intro:
        "Les SMS passent par un compte d'envoi unique au nom d'ImmoTopia chez Orange Côte d'Ivoire. Chaque agence a ses réglages : activation, nom d'expéditeur et quota mensuel, que seul le super-administrateur modifie. Cette fonction est en cours de développement : aucun SMS métier n'est encore envoyé par les notifications.",
      packs: [],
      profiles: ["equipe"],
      menu: "Administration › Agences › fiche agence › SMS",
      status: "developpement",
      actions: [
        {
          title: "Consulter l'état du compte SMS de la plateforme",
          goal: "Voir le fournisseur actif, si les identifiants sont configurés, le nom d'expéditeur de la plateforme et le solde des contrats SMS.",
        },
        {
          title: "Tester la connexion au fournisseur SMS",
          goal: "Vérifier que le compte répond, sans envoyer de SMS.",
        },
        {
          title: "Consulter les réglages SMS d'une agence",
          goal: "Voir si le SMS est activé, le nom d'expéditeur, le quota du mois et la consommation.",
        },
        {
          title: "Modifier les réglages SMS d'une agence",
          goal: "Activer ou désactiver le SMS, fixer le nom d'expéditeur (11 caractères au plus) et le quota mensuel.",
          input: "L'activation, le nom d'expéditeur et le quota.",
          output: "Sans valeur, l'agence utilise le nom de la plateforme et le quota par défaut.",
        },
        {
          title: "Envoyer un SMS de test",
          goal: "Vérifier l'envoi de bout en bout pour une agence, vers un numéro ivoirien à 10 chiffres.",
          output: "Le SMS de test compte dans le quota mensuel de l'agence.",
        },
      ],
      related: ["agence-et-abonnement/reglages-sms-agence"],
    },
    {
      slug: "sessions-et-erreurs",
      title: "Sessions, connexion Google et messages d'erreur",
      metaTitle: "Sessions, connexion Google et erreurs lisibles",
      summary:
        "Renouvellement automatique de la session, bouton de connexion Google affiché selon la configuration et messages d'erreur clairs, traduits et sans détail technique.",
      intro:
        "Quelques mécanismes de fond servent toute la plateforme : la session se renouvelle toute seule, la connexion Google n'apparaît que si elle est configurée, et les erreurs sont présentées dans la langue de l'utilisateur, sans détail technique.",
      packs: [],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Renouveler automatiquement la session",
          goal: "L'application prolonge la session d'un utilisateur connecté sans qu'il ait à se reconnecter. Cela ne change pas la date de sa dernière connexion.",
        },
        {
          title: "Afficher la connexion Google quand elle est configurée",
          goal: "Le bouton Google de la page de connexion n'apparaît que si le service est configuré ; sinon, la page l'indique proprement.",
          profiles: ["visiteur"],
          status: "deploiement",
        },
        {
          title: "Recevoir une erreur lisible et traduite",
          goal: "Les erreurs s'affichent dans la langue de l'utilisateur. Une erreur inattendue donne un message général, sans détail technique.",
        },
      ],
      related: ["agence-et-abonnement/connexion-et-mot-de-passe"],
    },
    {
      slug: "ancien-systeme-abonnement",
      title: "Ancien système d'abonnement et de facturation",
      metaTitle: "Ancien système d'abonnement : état actuel",
      summary:
        "Un ancien système d'abonnement à plan unique et de facturation existe encore dans l'application, sans écran : il est remplacé par les abonnements par packs.",
      intro:
        "Avant les abonnements par packs, l'application gérait un abonnement à plan unique et ses factures. Ce système n'a plus d'écran dans l'application et n'est pas utilisé au quotidien ; il est remplacé par les abonnements par packs. Il reste décrit ici par exhaustivité.",
      packs: [],
      profiles: ["equipe"],
      status: "deploiement",
      actions: [
        {
          title: "Créer, consulter, modifier ou annuler un ancien abonnement",
          goal: "Gérer l'abonnement à plan unique, y compris son cycle de facturation.",
          output: "Sans écran dans l'application actuelle.",
        },
        {
          title: "Gérer les anciennes factures",
          goal: "Lister, créer, consulter, modifier et marquer payées les anciennes factures.",
          output: "Sans écran dans l'application actuelle.",
        },
      ],
      related: ["administration-plateforme/abonnements-des-agences"],
    },
  ],
};
