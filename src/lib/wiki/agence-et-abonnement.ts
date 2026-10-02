import type { WikiDomain } from "./types";

export const agenceEtAbonnement: WikiDomain = {
  slug: "agence-et-abonnement",
  title: "Agence, équipe et abonnement",
  metaTitle: "Administration d'agence immobilière en Côte d'Ivoire",
  summary:
    "Connexion, collaborateurs, rôles et permissions, paramètres de l'agence, abonnement par pack et factures : l'administration de votre agence dans ImmoTopia.",
  intro:
    "Ce domaine couvre l'administration de votre agence dans ImmoTopia. Vous vous connectez, invitez vos collaborateurs, leur attribuez des rôles et tenez à jour l'identité de l'agence. Vous consultez aussi votre pack, demandez une extension et retrouvez vos factures d'abonnement. Le paiement en ligne et les paramètres financiers sont en cours de déploiement.",
  features: [
    {
      slug: "connexion-et-mot-de-passe",
      title: "Connexion et mot de passe",
      metaTitle: "Connexion, compte utilisateur et mot de passe oublié",
      summary:
        "Créez votre compte, confirmez votre adresse e-mail, connectez-vous avec votre mot de passe ou votre compte Google et réinitialisez un mot de passe oublié.",
      intro:
        "Chaque utilisateur accède à ImmoTopia avec son adresse e-mail et son mot de passe. L'adresse est confirmée par un lien reçu par e-mail, et un mot de passe oublié se réinitialise depuis la page de connexion. Les e-mails de confirmation et de réinitialisation arrivent dans la langue préférée du compte, à défaut dans celle de votre navigateur, sinon en français. Chacun peut aussi consulter son profil et choisir cette langue.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["visiteur", "equipe"],
      status: "disponible",
      actions: [
        {
          title: "Créer son compte",
          goal: "Ouvrir un compte utilisateur depuis la page d'inscription.",
          input: "Votre nom complet, votre adresse e-mail et un mot de passe.",
          output: "Votre compte est créé et un e-mail de confirmation vous est envoyé, dans votre langue.",
          profiles: ["visiteur"],
        },
        {
          title: "Confirmer son adresse e-mail",
          goal: "Activer son compte en ouvrant le lien reçu par e-mail.",
          output: "Votre compte est confirmé.",
          prereq: "Avoir créé son compte.",
          profiles: ["visiteur"],
        },
        {
          title: "Recevoir à nouveau l'e-mail de confirmation",
          goal: "Redemander le lien de confirmation s'il ne vous est pas parvenu.",
          input: "Votre adresse e-mail.",
          output: "Un nouveau lien de confirmation vous est envoyé.",
          prereq: "Avoir créé son compte.",
          profiles: ["visiteur"],
        },
        {
          title: "Se connecter",
          goal: "Accéder à l'application avec son adresse e-mail et son mot de passe.",
          output: "Vous arrivez dans votre espace ; votre dernière connexion est enregistrée.",
          prereq: "Un compte existant et confirmé.",
        },
        {
          title: "Se connecter avec son compte Google",
          goal: "Accéder à l'application en passant par votre compte Google, sans saisir de mot de passe ImmoTopia.",
          output: "Vous êtes connecté et arrivez dans votre espace.",
          status: "deploiement",
        },
        {
          title: "Se déconnecter",
          goal: "Fermer sa session depuis le menu utilisateur.",
          output: "Votre session est fermée.",
          profiles: ["equipe"],
        },
        {
          title: "Demander un nouveau mot de passe",
          goal: "Recevoir un lien de réinitialisation quand vous avez oublié votre mot de passe.",
          input: "Votre adresse e-mail.",
          output: "Un lien de réinitialisation est envoyé si l'adresse correspond à un compte.",
          profiles: ["visiteur"],
        },
        {
          title: "Choisir un nouveau mot de passe",
          goal: "Définir un nouveau mot de passe à partir du lien reçu par e-mail.",
          input: "Votre nouveau mot de passe.",
          output: "Votre mot de passe est changé.",
          prereq: "Avoir demandé la réinitialisation.",
          profiles: ["visiteur"],
        },
        {
          title: "Consulter son profil",
          goal: "Voir les informations de son compte depuis le menu utilisateur.",
          profiles: ["equipe"],
        },
        {
          title: "Choisir sa langue",
          goal: "Choisir la langue des e-mails que l'application vous envoie.",
          input: "La langue souhaitée.",
          output: "Les e-mails suivants arrivent dans cette langue.",
          profiles: ["equipe"],
        },
        {
          title: "S'inscrire et se connecter avec des messages plus discrets",
          goal: "À l'inscription et à la connexion, l'application ne révèle pas si une adresse e-mail possède déjà un compte : les messages sont les mêmes dans tous les cas. Le nombre d'inscriptions par heure est aussi limité.",
          output: "Un message identique que l'adresse existe ou non, et un message d'erreur unique tant que le mot de passe n'est pas correct.",
          profiles: ["visiteur"],
          status: "developpement",
        },
      ],
      faq: [
        {
          q: "Que faire si j'ai oublié mon mot de passe ?",
          a: "Depuis la page de connexion, choisissez « Mot de passe oublié » et saisissez votre adresse e-mail. Vous recevez un lien pour définir un nouveau mot de passe.",
        },
      ],
      related: ["agence-et-abonnement/collaborateurs"],
    },
    {
      slug: "collaborateurs",
      title: "Collaborateurs de l'agence",
      metaTitle: "Gérer les collaborateurs de votre agence immobilière",
      summary:
        "Invitez vos collaborateurs par e-mail avec leurs rôles, suivez les invitations, désactivez ou réactivez un accès et coupez les sessions d'un membre en un clic.",
      intro:
        "Vous ajoutez un collaborateur en l'invitant par e-mail : il choisit son mot de passe et rejoint l'agence avec les rôles que vous avez prévus. Vous suivez les invitations en attente, gardez la liste de l'équipe à jour, avec la date de dernière connexion de chacun, et coupez un accès dès qu'un collaborateur quitte l'agence. Au besoin, vous le déconnectez de tous ses appareils.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      menu: "Agence › Collaborateurs",
      status: "disponible",
      actions: [
        {
          title: "Inviter un collaborateur",
          goal: "Envoyer une invitation par e-mail en choisissant d'avance les rôles du collaborateur.",
          input: "Son adresse e-mail et ses rôles.",
          output: "L'invitation est créée et l'e-mail est envoyé.",
        },
        {
          title: "Accepter une invitation",
          goal: "Le collaborateur invité active son compte à partir du lien reçu.",
          input: "Son mot de passe et, si besoin, son nom complet.",
          output: "Il rejoint l'agence avec les rôles prévus.",
          prereq: "Avoir reçu une invitation.",
          profiles: ["visiteur"],
        },
        {
          title: "Suivre les invitations",
          goal: "Voir les invitations de l'agence : en attente, acceptées ou révoquées.",
          output: "La liste des invitations et leur état.",
        },
        {
          title: "Renvoyer une invitation",
          goal: "Renvoyer l'e-mail d'invitation avec un nouveau lien.",
          output: "Un nouveau lien est envoyé, avec sa date d'expiration.",
        },
        {
          title: "Révoquer une invitation",
          goal: "Annuler une invitation encore en attente.",
          output: "L'invitation est annulée.",
        },
        {
          title: "Consulter la liste des collaborateurs",
          goal: "Retrouver les membres de l'agence, avec une recherche et des filtres par statut ou par rôle.",
          output: "La liste de l'équipe, avec la date de dernière connexion de chaque membre.",
        },
        {
          title: "Choisir un collaborateur dans une liste « Assigné à »",
          goal: "Attribuer un contact, un bien, une vente ou une demande de maintenance à un membre de l'équipe, sans avoir besoin d'accéder à la liste complète des collaborateurs.",
          output: "Une liste réduite des membres actifs, avec leur nom et leurs rôles.",
          profiles: ["equipe"],
        },
        {
          title: "Consulter la fiche d'un collaborateur",
          goal: "Voir le détail d'un membre de l'agence.",
        },
        {
          title: "Désactiver un collaborateur",
          goal: "Couper l'accès d'un membre à l'agence, par exemple à son départ.",
          output: "Le collaborateur n'a plus accès à l'agence.",
        },
        {
          title: "Réactiver un collaborateur",
          goal: "Rendre l'accès à un membre désactivé.",
          output: "Le collaborateur retrouve son accès.",
          prereq: "Le collaborateur doit être désactivé.",
        },
        {
          title: "Réinitialiser le mot de passe d'un collaborateur",
          goal: "Envoyer au collaborateur un lien pour choisir un nouveau mot de passe, ou lui en fixer un.",
          output: "Le mot de passe est réinitialisé et ses sessions en cours sont fermées.",
        },
        {
          title: "Déconnecter un collaborateur de tous ses appareils",
          goal: "Fermer d'un coup toutes les sessions ouvertes d'un membre.",
          output: "Le collaborateur doit se reconnecter sur chaque appareil.",
        },
        {
          title: "Activer l'invitation du premier administrateur d'une agence",
          goal: "Le premier administrateur d'une agence créée par ImmoTopia accepte son invitation avec le seul lien reçu et choisit son premier mot de passe, sans avoir à se connecter d'abord.",
          input: "Son mot de passe.",
          output: "Il rejoint l'agence avec le rôle prévu.",
          prereq: "Avoir reçu l'invitation de création de l'agence.",
          profiles: ["visiteur"],
          status: "developpement",
        },
      ],
      faq: [
        {
          q: "Comment ajouter un collaborateur ?",
          a: "Depuis « Agence › Collaborateurs », vous l'invitez par e-mail en choisissant ses rôles. Il active son compte avec le lien reçu et choisit son mot de passe.",
        },
        {
          q: "Que faire quand un collaborateur quitte l'agence ?",
          a: "Vous le désactivez : il n'a plus accès à l'agence. Vous pouvez aussi le déconnecter de tous ses appareils, et le réactiver plus tard si besoin.",
        },
      ],
      related: ["agence-et-abonnement/roles-et-permissions", "agence-et-abonnement/connexion-et-mot-de-passe"],
    },
    {
      slug: "roles-et-permissions",
      title: "Rôles et permissions",
      metaTitle: "Rôles et droits d'accès des utilisateurs de l'agence",
      summary:
        "Consultez les rôles proposés et les permissions qu'ils ouvrent, puis attribuez à chaque collaborateur les rôles qui correspondent à son poste dans l'agence.",
      intro:
        "Chaque collaborateur reçoit un ou plusieurs rôles, et chaque rôle ouvre un ensemble de permissions. Vous voyez ce que permet un rôle avant de l'attribuer, et vous ajustez les rôles d'un collaborateur quand son poste change.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      status: "disponible",
      actions: [
        {
          title: "Consulter les rôles proposés",
          goal: "Voir la liste des rôles que vous pouvez attribuer, par exemple au moment d'inviter un collaborateur.",
          output: "La liste des rôles.",
        },
        {
          title: "Voir les permissions d'un rôle",
          goal: "Savoir précisément ce qu'un rôle permet de faire.",
          output: "Le rôle et la liste de ses permissions.",
        },
        {
          title: "Consulter toutes les permissions",
          goal: "Parcourir le catalogue complet des permissions de l'application.",
          output: "La liste de toutes les permissions.",
        },
        {
          title: "Modifier les rôles d'un collaborateur",
          goal: "Changer les rôles attribués à un membre, par exemple lors d'un changement de poste.",
          input: "Les rôles à attribuer.",
          output: "Les droits du collaborateur sont mis à jour.",
          prereq: "Le collaborateur doit faire partie de l'agence.",
        },
      ],
      faq: [
        {
          q: "Peut-on changer les droits d'un collaborateur après son arrivée ?",
          a: "Oui. Depuis sa fiche, vous modifiez ses rôles à tout moment ; ses droits suivent les permissions des rôles attribués.",
        },
      ],
      related: ["agence-et-abonnement/collaborateurs"],
    },
    {
      slug: "parametres-agence",
      title: "Paramètres de l'agence",
      metaTitle: "Paramètres de l'agence : identité, logo et fiche publique",
      summary:
        "Tenez à jour le nom, la raison sociale, les coordonnées, le logo et la couleur de votre agence, repris sur la fiche publique que voient vos visiteurs.",
      intro:
        "Les paramètres de l'agence regroupent son identité : nom, raison sociale, coordonnées, adresse, site web, couleur principale et logo. Ces informations alimentent la fiche publique de l'agence, qui ne montre que ce qui est destiné au public. Chaque membre de l'équipe retrouve aussi la fiche complète de l'agence.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe", "visiteur"],
      menu: "Agence › Paramètres de l'agence",
      status: "disponible",
      actions: [
        {
          title: "Modifier l'identité de l'agence",
          goal: "Mettre à jour les informations de votre agence.",
          input:
            "Le nom, la raison sociale, l'e-mail et le téléphone de contact, le pays, la ville, l'adresse, la couleur principale et le site web.",
          output: "La fiche de l'agence est à jour.",
          profiles: ["direction", "equipe"],
        },
        {
          title: "Déposer le logo de l'agence",
          goal: "Ajouter ou remplacer le logo de l'agence.",
          input: "Une image PNG, JPEG ou WebP de 2 Mo au plus.",
          output: "Le logo est enregistré.",
          profiles: ["direction", "equipe"],
        },
        {
          title: "Consulter la fiche de l'agence",
          goal: "Voir la fiche complète de l'agence.",
          output: "L'identité de l'agence, ses membres, ses clients et son abonnement.",
          profiles: ["equipe"],
        },
        {
          title: "Figurer dans la liste publique des agences",
          goal: "Les visiteurs voient la liste des agences actives, avec leurs seules informations publiques.",
          output: "Le nom, le logo, la couleur, la ville, le pays et le site web de chaque agence.",
          profiles: ["visiteur"],
        },
        {
          title: "Consulter la fiche publique d'une agence",
          goal: "Un visiteur ouvre la fiche publique de votre agence, qui ne montre que les informations destinées au public.",
          profiles: ["visiteur"],
        },
      ],
      faq: [
        {
          q: "Les visiteurs voient-ils toutes les informations de l'agence ?",
          a: "Non. La fiche publique ne montre que le nom, le logo, la couleur, la ville, le pays et le site web de l'agence.",
        },
      ],
      related: ["agence-et-abonnement/abonnement-par-pack"],
    },
    {
      slug: "parametres-financiers",
      title: "Paramètres financiers et passerelle de paiement",
      metaTitle: "Paramètres financiers et paiement en ligne de l'agence",
      summary:
        "Réglez la fiscalité, les honoraires de gestion et les comptes de gestion locative de l'agence, et configurez sa passerelle de paiement pour encaisser en ligne.",
      intro:
        "Les paramètres financiers fixent les règles de l'agence : fiscalité, honoraires de gestion et comptes utilisés pour la gestion locative. La passerelle de paiement permet à l'agence d'encaisser en ligne : vous choisissez le mode test ou réel, le compte qui reçoit les fonds et qui supporte les frais. Ces réglages sont en cours de déploiement.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      status: "deploiement",
      actions: [
        {
          title: "Consulter les paramètres financiers",
          goal: "Voir la fiscalité, les honoraires de gestion et les comptes de gestion locative de l'agence.",
          output: "Les paramètres en vigueur, ou les valeurs par défaut si rien n'a encore été réglé.",
        },
        {
          title: "Modifier les paramètres financiers",
          goal: "Adapter la fiscalité, les honoraires de gestion et les comptes à la pratique de l'agence.",
          output: "Les paramètres sont mis à jour.",
        },
        {
          title: "Consulter les réglages de la passerelle de paiement",
          goal: "Vérifier comment l'encaissement en ligne est configuré.",
          output:
            "Le mode (test ou réel), l'activation, l'identifiant marchand, la clé d'accès masquée, le compte qui reçoit les fonds, la répartition des frais et le résultat du dernier test.",
        },
        {
          title: "Configurer la passerelle de paiement",
          goal: "Choisir le mode test ou réel, activer l'encaissement en ligne et désigner le compte qui reçoit les fonds.",
          input:
            "Le mode, l'identifiant marchand et la clé d'accès fournis par la passerelle, le compte de trésorerie qui reçoit les fonds et qui paie les frais.",
          output: "Les réglages sont enregistrés ; la clé d'accès n'est plus jamais affichée en entier.",
          prereq:
            "Le compte qui reçoit les fonds doit être un compte bancaire ou Mobile Money actif de l'agence. Le mode réel ne s'active qu'avec l'identifiant marchand et la clé d'accès.",
        },
        {
          title: "Tester la connexion à la passerelle",
          goal: "Vérifier que la passerelle répond avant d'encaisser.",
          output: "Un message de résultat et, en mode réel, le solde du compte marchand.",
          prereq: "En mode réel, l'identifiant marchand et la clé d'accès doivent être renseignés.",
        },
      ],
      faq: [
        {
          q: "Peut-on essayer la passerelle avant d'encaisser pour de vrai ?",
          a: "Oui. La passerelle a un mode test, et vous pouvez tester la connexion avant de passer en mode réel.",
        },
      ],
      related: ["finance-et-comptabilite/tresorerie"],
    },
    {
      slug: "abonnement-par-pack",
      title: "Abonnement par pack",
      metaTitle: "Abonnement par pack : modules, limites et extensions",
      summary:
        "Consultez les modules et fonctions inclus dans votre pack, vos limites et votre consommation, puis demandez une extension et suivez l'historique de vos demandes.",
      intro:
        "Votre abonnement fixe les modules et fonctions auxquels l'agence a accès, ainsi que ses limites. Vous voyez à tout moment ce qui est inclus, ce que vous avez consommé et l'état de votre abonnement. Quand l'agence grandit, vous demandez une extension directement depuis l'application ; pour le détail des packs, voir les tarifs.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      menu: "Agence › Paramètres de l'agence",
      status: "disponible",
      actions: [
        {
          title: "Consulter son pack et ses limites",
          goal: "Savoir ce que comprend l'abonnement de l'agence.",
          output:
            "Les modules et fonctions inclus, chaque limite avec votre consommation, et l'état de l'abonnement, par exemple s'il est passé en lecture seule.",
          profiles: ["equipe"],
        },
        {
          title: "Demander une extension",
          goal: "Demander plus de capacité ou un élément supplémentaire, sans quitter l'application.",
          input: "Ce que vous souhaitez ajouter, la quantité et un message.",
          output: "La demande est enregistrée et l'équipe ImmoTopia en est prévenue par e-mail. Seules les extensions vendues avec votre pack sont proposées.",
        },
        {
          title: "Suivre ses demandes d'extension",
          goal: "Retrouver l'historique des demandes d'extension de l'agence.",
          output: "La liste de vos demandes.",
          profiles: ["equipe"],
        },
        {
          title: "Voir un message clair pour une fonction hors abonnement",
          goal: "Quand vous ouvrez l'écran d'un module que votre pack ne comprend pas, un message « Fonction non comprise dans votre abonnement » remplace l'écran, avec un lien vers l'abonnement.",
          output: "Un message explicatif, au lieu d'un écran vide.",
          profiles: ["equipe"],
        },
        {
          title: "Ne voir que ce que comprend son pack",
          goal: "Le menu, le tableau de bord, les paramètres financiers, les onglets de la finance, la fiche d'un bien ou d'un contact et les modèles de documents n'affichent que les blocs des modules inclus dans votre pack.",
          output: "Des écrans qui ne montrent que les modules de votre abonnement.",
          profiles: ["equipe"],
        },
      ],
      faq: [
        {
          q: "Comment augmenter une limite de mon abonnement ?",
          a: "Depuis les paramètres de l'agence, vous envoyez une demande d'extension avec un message. L'équipe ImmoTopia est prévenue par e-mail et vous suivez vos demandes dans l'historique.",
        },
      ],
      related: ["agence-et-abonnement/factures-abonnement"],
    },
    {
      slug: "factures-abonnement",
      title: "Factures d'abonnement",
      metaTitle: "Factures d'abonnement : consultation, PDF et paiement en ligne",
      summary:
        "Retrouvez les factures d'abonnement de votre agence, consultez leur détail et téléchargez-les en PDF ; leur paiement en ligne est en cours de déploiement.",
      intro:
        "Toutes les factures émises pour votre abonnement sont réunies au même endroit, avec leur détail et leur version PDF. Le paiement en ligne d'une facture est en cours de déploiement : vous pourrez la régler depuis l'application, même si votre compte est passé en lecture seule, et suivre où en est votre paiement.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      menu: "Agence › Paramètres financiers",
      status: "disponible",
      actions: [
        {
          title: "Consulter ses factures",
          goal: "Voir la liste des factures d'abonnement émises pour l'agence, filtrée par statut si besoin.",
          output: "La liste des factures émises ; les brouillons n'y figurent jamais.",
        },
        {
          title: "Consulter le détail d'une facture",
          goal: "Voir le contenu d'une facture émise.",
        },
        {
          title: "Télécharger une facture en PDF",
          goal: "Obtenir la facture pour la classer ou la transmettre à votre comptable.",
          output: "Le fichier PDF de la facture.",
        },
        {
          title: "Consulter le règlement d'une facture",
          goal: "Voir le règlement enregistré pour une facture.",
          status: "deploiement",
        },
        {
          title: "Payer une facture en ligne",
          goal: "Régler une facture due depuis l'application, par la passerelle de paiement, même si votre compte est passé en lecture seule.",
          output:
            "Une page de paiement s'ouvre. Si un paiement est déjà en cours pour cette facture, vous le reprenez.",
          prereq:
            "La facture doit être émise et due. L'application vous indique si le paiement en ligne est disponible.",
          status: "deploiement",
        },
        {
          title: "Suivre un paiement en ligne",
          goal: "Savoir où en est un paiement commencé en ligne.",
          output: "L'état du paiement.",
          status: "deploiement",
        },
      ],
      faq: [
        {
          q: "Puis-je télécharger mes factures d'abonnement ?",
          a: "Oui. Chaque facture émise se consulte en détail et se télécharge en PDF depuis les paramètres financiers de l'agence.",
        },
      ],
      related: ["agence-et-abonnement/abonnement-par-pack"],
    },
    {
      slug: "journal-activite-agence",
      title: "Journal d'activité de l'agence",
      metaTitle: "Journal d'activité : qui a fait quoi dans votre agence",
      summary:
        "Retrouvez qui a fait quoi et quand dans votre agence : connexions, changements de droits, biens, baux, contacts et factures, avec filtres. En développement.",
      intro:
        "Le journal d'activité garde la trace des actions faites dans votre agence : connexions, changements de droits, création et modification de biens, de baux, de contacts ou de factures. Il se lit du plus récent au plus ancien, avec des filtres. Le personnel de la plateforme y apparaît sous le nom « Support ImmoTopia », sans autre détail. Cette fonction est en cours de développement.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction"],
      menu: "Agence › Journal d'activité",
      status: "developpement",
      actions: [
        {
          title: "Consulter le journal d'activité",
          goal: "Voir qui a fait quoi dans l'agence et à quel moment.",
          input: "Des filtres facultatifs : catégorie, résultat, action, auteur, élément concerné, période.",
          output:
            "Les événements, du plus récent au plus ancien, chargés page par page : date, action, résultat, auteur, élément concerné, détails et valeurs avant et après.",
          prereq: "Le droit de consulter le journal, donné par défaut à l'administrateur de l'agence et attribuable à un autre rôle.",
        },
      ],
      related: ["agence-et-abonnement/roles-et-permissions"],
    },
    {
      slug: "reglages-sms-agence",
      title: "Réglages SMS de l'agence",
      metaTitle: "Réglages SMS de l'agence : expéditeur, quota et consommation",
      summary:
        "Consultez les réglages SMS de votre agence : activation, nom d'expéditeur, quota mensuel et SMS restants, fixés par ImmoTopia. En développement.",
      intro:
        "Les SMS de l'agence passent par un compte d'envoi géré par ImmoTopia. Vous consultez simplement vos réglages : SMS activé ou non, nom d'expéditeur, quota du mois et consommation. Vous ne pouvez rien modifier vous-même, ces réglages sont fixés par l'équipe ImmoTopia. Cette fonction est en cours de développement.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["direction", "equipe"],
      status: "developpement",
      actions: [
        {
          title: "Consulter les réglages SMS de l'agence",
          goal: "Voir si le SMS est activé, le nom d'expéditeur, le quota mensuel, la consommation du mois et les SMS restants.",
          output: "Les réglages et la consommation ; si rien n'a été fixé, le SMS est désactivé avec le quota par défaut.",
        },
      ],
      related: ["administration-plateforme/sms"],
    },
    {
      slug: "espace-particulier",
      title: "Espace particulier",
      metaTitle: "Espace particulier : gérer son patrimoine, gratuit ou plus",
      summary:
        "Un particulier crée son espace de patrimoine en quelques champs, le suit avec un menu réduit et peut passer à un palier payant. En développement.",
      intro:
        "L'espace particulier permet à une personne de suivre son propre patrimoine sans passer par une agence. Elle crée son espace elle-même, avec un menu réduit à l'essentiel : patrimoine, biens, baux, paramètres et abonnement. Un palier gratuit et un palier payant sont prévus ; le palier payant relève le plafond d'actifs. Cette fonction est en cours de développement.",
      packs: ["particulier-gratuit", "particulier-plus"],
      profiles: ["visiteur", "direction"],
      status: "developpement",
      actions: [
        {
          title: "Créer son espace personnel",
          goal: "Obtenir son espace de patrimoine en quelques champs, sans l'aide d'un administrateur.",
          input: "Un nom d'affichage, le pays (Côte d'Ivoire ou autre pays de l'UEMOA) et, si vous le souhaitez, un téléphone.",
          output: "Votre espace est créé avec le palier gratuit.",
          prereq: "Être connecté avec une adresse e-mail confirmée et ne pas avoir déjà d'espace.",
          profiles: ["visiteur"],
        },
        {
          title: "Naviguer dans son espace particulier",
          goal: "Accéder à ce qui sert un particulier : patrimoine, biens, baux, paramètres et abonnement.",
          output: "Un menu réduit et un accueil centré sur la valeur nette du patrimoine.",
          profiles: ["direction"],
        },
        {
          title: "Passer au palier payant",
          goal: "Relever le plafond d'actifs en réglant le palier payant par Mobile Money ou par carte.",
          output: "Une facture et une page de paiement en ligne.",
          prereq: "Le téléphone de l'espace doit être renseigné.",
          profiles: ["direction"],
        },
      ],
      related: ["agence-et-abonnement/abonnement-par-pack"],
    },
  ],
};
