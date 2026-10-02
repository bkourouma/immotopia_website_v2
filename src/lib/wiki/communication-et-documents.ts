import type { WikiDomain } from "./types";

export const communicationEtDocuments: WikiDomain = {
  slug: "communication-et-documents",
  title: "Communication et documents",
  metaTitle: "Logiciel e-mail, WhatsApp et newsletter immobilier en CI",
  summary:
    "Notifications e-mail et WhatsApp, newsletters, campagnes et modèles Word de l'agence : communiquez avec vos clients et générez baux et quittances en un clic.",
  intro:
    "Ce domaine réunit tout ce que l'agence envoie à ses clients et tout ce qu'elle produit comme documents. Côté communication : notifications automatiques par e-mail et WhatsApp, diffusion dans votre groupe WhatsApp, listes de diffusion et campagnes de newsletter. Côté documents : vos propres modèles Word pour les baux, quittances et relevés, remplis automatiquement. Un assistant IA, ImmoCopilot, est présent dans l'application mais désactivé par défaut. Il s'adresse à la direction et à tous les collaborateurs qui échangent avec les propriétaires, locataires et prospects.",
  features: [
    {
      slug: "notifications-email-whatsapp",
      title: "E-mail et WhatsApp",
      metaTitle: "Notifications e-mail et WhatsApp pour agence immobilière",
      summary:
        "Choisissez les notifications e-mail et WhatsApp envoyées à vos clients, personnalisez leurs textes et diffusez vos messages dans votre groupe WhatsApp.",
      intro:
        "ImmoTopia prévient automatiquement vos clients par e-mail et par WhatsApp : maintenance, paiements, baux, syndic, invitations. Vous décidez quelles notifications partent et avec quel texte. Vous pouvez aussi inviter vos contacts dans votre groupe WhatsApp et y diffuser une annonce avec une photo. Vos clients reçoivent l'information là où ils la lisent vraiment.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Paramétrer les notifications e-mail",
          goal: "Choisir, parmi près de quarante notifications automatiques (maintenance, paiements, baux, CRM, syndic, patrimoine, invitations, mot de passe oublié…), celles que l'agence envoie.",
          input: "Pour chaque notification : activée ou non, et si vous le souhaitez un objet et un texte personnalisés.",
          output:
            "Des e-mails à l'image de l'agence. Un bouton rétablit le texte d'origine. Seules les notifications des modules de votre abonnement s'affichent et se modifient.",
        },
        {
          title: "Paramétrer les notifications WhatsApp",
          goal: "Choisir, parmi une vingtaine de notifications (maintenance, paiements, baux, CRM, compte du portail, syndic…), celles qui partent par WhatsApp.",
          input:
            "Pour chaque notification : activée ou non, un texte personnalisé ou un modèle de message WhatsApp Business.",
          output:
            "Des messages WhatsApp adaptés à l'agence. Un bouton rétablit le texte d'origine. Seules les notifications des modules de votre abonnement s'affichent et se modifient.",
        },
        {
          title: "Recevoir les messages WhatsApp entrants",
          goal: "L'application reçoit les messages que vos contacts envoient à votre numéro WhatsApp. Pour l'instant, la réception est minimale : elle est enregistrée et un accusé générique est renvoyé, sans conversation ni ticket créé.",
          output: "Un accusé de réception générique.",
          status: "deploiement",
        },
        {
          title: "Personnaliser le message du lien de paiement d'un loyer",
          goal: "Activer, désactiver ou adapter le message qui porte le lien de paiement envoyé au locataire. L'e-mail est actif d'office ; le message WhatsApp reste à activer par l'agence.",
          input:
            "Pour l'e-mail, un objet et un texte ; pour WhatsApp, un texte ou un modèle de message. Le texte peut reprendre le nom du locataire, de l'agence, la période, le montant dû, le lien de paiement et sa date d'expiration.",
          output: "Un message de lien de paiement à l'image de l'agence. Un bouton rétablit le texte d'origine.",
          prereq:
            "Réservé aux abonnements qui comprennent la gestion locative. L'envoi réel de ce lien par WhatsApp ou par e-mail est encore en cours de validation.",
          status: "deploiement",
        },
        {
          title: "Envoyer un message WhatsApp de test",
          goal: "Vérifier que l'envoi WhatsApp fonctionne avant de l'utiliser avec vos clients.",
          input: "Un numéro et un court message.",
          output: "Le message est envoyé et l'envoi est confirmé.",
          prereq: "Le service d'envoi WhatsApp est configuré.",
        },
        {
          title: "Inviter vos contacts dans votre groupe WhatsApp",
          goal: "Envoyer en une fois une invitation à rejoindre le groupe WhatsApp de l'agence à tous les contacts qui l'ont accepté.",
          input: "Le nombre maximum de contacts à inviter (jusqu'à 2 000 par envoi) et, si besoin, le renvoi à ceux déjà invités.",
          output: "Le nombre d'invitations envoyées et de contacts écartés. Un contact n'est invité qu'une fois, sauf renvoi volontaire.",
          prereq: "Des contacts ayant donné leur accord pour WhatsApp, avec un numéro renseigné.",
        },
        {
          title: "Diffuser un message dans le groupe WhatsApp",
          goal: "Publier une annonce ponctuelle dans le groupe WhatsApp de l'agence.",
          input: "Un texte et, si vous le souhaitez, une image JPEG ou PNG de 5 Mo au plus.",
          output: "Le message est diffusé. Si l'image ne passe pas, le texte part seul.",
          prereq: "Le groupe WhatsApp de diffusion est configuré.",
        },
      ],
      faq: [
        {
          q: "Peut-on modifier le texte des messages automatiques ?",
          a: "Oui. Pour chaque notification e-mail, vous personnalisez l'objet et le texte ; pour WhatsApp, le texte ou le modèle de message. Vous pouvez à tout moment revenir au texte d'origine.",
        },
        {
          q: "Nos contacts reçoivent-ils des messages WhatsApp sans leur accord ?",
          a: "Non. L'invitation au groupe WhatsApp ne part qu'aux contacts qui ont accepté WhatsApp et dont le numéro est renseigné.",
        },
      ],
      related: [
        "communication-et-documents/campagnes-newsletter",
        "communication-et-documents/listes-de-diffusion-newsletter",
      ],
    },
    {
      slug: "listes-de-diffusion-newsletter",
      title: "Listes de diffusion",
      metaTitle: "Listes de diffusion newsletter pour agence immobilière",
      summary:
        "Constituez vos listes de diffusion à partir des propriétaires, locataires ou contacts, importez des abonnés par CSV et laissez chacun se désinscrire en un clic.",
      intro:
        "Une liste de diffusion regroupe les destinataires d'une newsletter. Elle peut se remplir à la main, par import, ou se construire toute seule à partir de vos propriétaires, locataires ou contacts qui ont donné leur accord. Les visiteurs peuvent aussi s'inscrire eux-mêmes, avec confirmation par e-mail si vous le souhaitez. Chaque destinataire peut se désinscrire à tout moment.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Communication › Newsletter — Listes",
      status: "disponible",
      actions: [
        {
          title: "Créer et gérer une liste de diffusion",
          goal: "Constituer une liste manuelle, ou une liste construite automatiquement à partir des propriétaires, des locataires ou des contacts qui ont accepté de recevoir vos envois.",
          input: "Un nom, le type de liste et, si vous le souhaitez, la confirmation d'inscription par e-mail.",
          output: "La liste, avec le nombre total d'abonnés, d'abonnés actifs et de désinscrits.",
        },
        {
          title: "Ajouter des abonnés à une liste",
          goal: "Remplir une liste manuelle.",
          input: "Un abonné à la fois (e-mail et nom), une sélection de contacts, ou un fichier CSV de 2 Mo au plus.",
          output: "Pour un import : le nombre de lignes acceptées, rejetées et en double, avec les erreurs.",
          prereq: "Une liste manuelle. Les listes construites automatiquement se remplissent seules.",
        },
        {
          title: "Exporter ou retirer des abonnés",
          goal: "Récupérer les abonnés d'une liste en fichier CSV, ou retirer un abonné.",
        },
        {
          title: "S'inscrire à une newsletter",
          goal: "Permettre à un visiteur de s'abonner lui-même à une liste de l'agence, depuis un formulaire public.",
          input: "Son e-mail et, s'il le souhaite, son nom.",
          output: "L'inscription est enregistrée, ou un e-mail de confirmation lui est envoyé si la liste l'exige.",
          profiles: ["visiteur"],
          prereq: "Une liste manuelle ouverte aux inscriptions publiques.",
        },
        {
          title: "Confirmer son inscription",
          goal: "Valider l'inscription en cliquant sur le lien reçu par e-mail.",
          output: "L'abonné devient actif. Le lien reste valable 7 jours.",
          profiles: ["visiteur"],
        },
        {
          title: "Se désinscrire",
          goal: "Permettre à chaque destinataire de ne plus recevoir vos newsletters, grâce au lien présent dans chaque campagne.",
          output: "Le destinataire est désinscrit de la liste, ou de toutes les listes de l'agence s'il le choisit.",
          profiles: ["visiteur"],
          prereq: "Le destinataire a reçu au moins une campagne.",
        },
      ],
      faq: [
        {
          q: "Faut-il saisir les propriétaires et locataires un par un ?",
          a: "Non. Une liste peut être construite automatiquement à partir de vos propriétaires, de vos locataires ou de vos contacts qui ont donné leur accord.",
        },
        {
          q: "Peut-on importer un fichier d'abonnés existant ?",
          a: "Oui, dans une liste manuelle, par un fichier CSV de 2 Mo au plus. Un rapport indique les lignes acceptées, rejetées et en double.",
        },
      ],
      related: [
        "communication-et-documents/campagnes-newsletter",
        "crm-et-ventes/recherche-avancee-contacts",
        "crm-et-ventes/contacts-prospects",
      ],
    },
    {
      slug: "campagnes-newsletter",
      title: "Campagnes et newsletters",
      metaTitle: "Newsletter et campagnes e-mail pour agence immobilière",
      summary:
        "Rédigez vos newsletters à partir de modèles, prévisualisez-les, envoyez-les tout de suite ou à la date choisie, puis suivez envois et ouvertures par destinataire.",
      intro:
        "Les campagnes vous permettent de tenir vos clients informés : nouveaux biens, rappels, actualités de l'agence. Vous partez d'un modèle à vos couleurs, rédigez le message, le prévisualisez, puis l'envoyez tout de suite ou à la date choisie. Vous voyez ensuite qui l'a reçu et qui l'a ouvert.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Communication › Newsletter — Campagnes",
      status: "disponible",
      actions: [
        {
          title: "Gérer les modèles de newsletter",
          goal: "Créer des gabarits réutilisables, à l'image de l'agence, dans lesquels s'insère le texte de chaque campagne.",
          input: "Un nom et la mise en page du modèle.",
          output: "Un modèle prêt à servir. Un modèle utilisé par une campagne programmée ne peut pas être supprimé.",
        },
        {
          title: "Rédiger une campagne",
          goal: "Préparer une newsletter en brouillon.",
          input: "La liste de diffusion, le modèle si vous en utilisez un, l'objet et le contenu.",
          output: "Une campagne en brouillon, modifiable tant qu'elle n'est pas partie.",
          prereq: "Une liste de diffusion.",
        },
        {
          title: "Prévisualiser une campagne",
          goal: "Voir l'objet et le message tels que les recevront les destinataires, avec des valeurs d'exemple (prénom, lien de désinscription…), sans rien envoyer.",
        },
        {
          title: "Envoyer une campagne",
          goal: "Envoyer immédiatement la campagne à toute la liste.",
          output:
            "Chaque destinataire la reçoit par e-mail, et par WhatsApp s'il a un numéro et a donné son accord. Vous obtenez le nombre d'envois, d'échecs et d'ouvertures.",
          prereq: "Une campagne en brouillon ou programmée, une liste non vide et un lien de désinscription dans le message.",
        },
        {
          title: "Programmer l'envoi d'une campagne",
          goal: "Choisir la date et l'heure d'envoi à l'avance.",
          input: "Une date future.",
          output: "La campagne part automatiquement à l'heure prévue, sans action de votre part.",
          prereq: "Une campagne en brouillon.",
        },
        {
          title: "Annuler un envoi programmé",
          goal: "Arrêter une campagne programmée avant son départ.",
        },
        {
          title: "Consulter les destinataires d'une campagne",
          goal: "Voir, pour chaque destinataire, si l'envoi a réussi, à quelle date et s'il a ouvert le message.",
          prereq: "La campagne a été envoyée.",
        },
        {
          title: "Suivre les ouvertures",
          goal: "Savoir qui a lu votre newsletter.",
          output: "La première ouverture de chaque destinataire est enregistrée automatiquement.",
        },
      ],
      faq: [
        {
          q: "Peut-on programmer une newsletter à l'avance ?",
          a: "Oui. Vous choisissez une date future et la campagne part automatiquement à l'heure prévue. Vous pouvez l'annuler tant qu'elle n'est pas partie.",
        },
        {
          q: "Sait-on qui a ouvert la newsletter ?",
          a: "Oui. Pour chaque destinataire, vous voyez si l'envoi a réussi et s'il a ouvert le message.",
        },
      ],
      related: [
        "communication-et-documents/listes-de-diffusion-newsletter",
        "communication-et-documents/notifications-email-whatsapp",
      ],
    },
    {
      slug: "modeles-de-documents-word",
      title: "Modèles de documents Word",
      metaTitle: "Modèles Word de bail et quittance pour agence immobilière",
      summary:
        "Déposez vos propres modèles Word de bail, quittance et relevé de loyer : ImmoTopia repère les zones à remplir et utilise le modèle par défaut de votre choix.",
      intro:
        "Chaque agence a ses contrats et ses quittances. Vous déposez vos modèles Word tels que vous les utilisez déjà, et ImmoTopia repère les zones à remplir. Vous choisissez le modèle par défaut pour chaque type de document. Vos baux et quittances gardent votre présentation, sans ressaisie.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Documents › Modèles de documents",
      status: "disponible",
      actions: [
        {
          title: "Déposer un modèle Word",
          goal: "Ajouter un modèle de bail d'habitation, de bail commercial, de quittance ou de relevé de loyer.",
          input: "Le fichier Word (.docx, 10 Mo au plus), le type de document et un nom.",
          output:
            "Le modèle, avec la liste des zones à remplir repérées automatiquement. Un fichier identique à un modèle déjà déposé est refusé.",
        },
        {
          title: "Lister les modèles de documents",
          goal: "Retrouver les modèles de l'agence. Les modèles de bail d'habitation et de bail commercial livrés avec l'application sont tenus à jour tant que vous ne les avez pas personnalisés ; vos propres modèles ne sont jamais remplacés.",
          input: "Des filtres : type de document, actif ou inactif.",
        },
        {
          title: "Activer ou désactiver un modèle",
          goal: "Mettre un modèle de côté sans le supprimer, ou le remettre en service.",
          output: "Un modèle désactivé perd son rôle de modèle par défaut.",
          prereq: "Le modèle a été déposé.",
        },
        {
          title: "Choisir le modèle par défaut",
          goal: "Désigner le modèle utilisé d'office pour un type de document.",
          output: "Le modèle devient celui par défaut ; les autres modèles du même type ne le sont plus.",
          prereq: "Le modèle est actif.",
        },
        {
          title: "Supprimer un modèle",
          goal: "Retirer un modèle dont vous ne voulez plus.",
          output: "Le modèle disparaît de la liste. S'il était le modèle par défaut, un autre modèle actif du même type prend le relais.",
        },
      ],
      faq: [
        {
          q: "Peut-on garder nos propres contrats de bail ?",
          a: "Oui. Vous déposez vos modèles Word de bail d'habitation, de bail commercial, de quittance et de relevé de loyer ; ImmoTopia repère les zones à remplir.",
        },
      ],
      related: ["communication-et-documents/generation-baux-quittances"],
    },
    {
      slug: "generation-baux-quittances",
      title: "Génération de baux et quittances",
      metaTitle: "Générer baux et quittances Word en Côte d'Ivoire",
      summary:
        "Produisez baux, quittances et relevés de loyer au format Word à partir de vos modèles, remplis avec les données du bail ou du paiement et numérotés d'office.",
      intro:
        "Depuis un bail ou un paiement, ImmoTopia produit le document Word à partir de votre modèle, rempli avec les bonnes informations. Chaque document reçoit un numéro, par exemple BAIL-2026-0001. Plus besoin de recopier noms, montants et dates à la main : le document est prêt à imprimer ou à envoyer.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Générer un bail, une quittance ou un relevé",
          goal: "Produire le document à partir du bail ou du paiement concerné. Le contrat de bail suit le type du bien : bail commercial pour un bureau, une boutique ou un entrepôt, bail d'habitation sinon.",
          input:
            "Le type de document, le bail ou le paiement, et si besoin le modèle à utiliser, l'échéance ou la période du relevé.",
          output:
            "Un document Word numéroté. ImmoTopia prend le modèle choisi, sinon le modèle par défaut, sinon le dernier modèle actif, et vérifie que les informations essentielles sont remplies.",
          prereq:
            "Un modèle actif pour ce type de document et le bail ou le paiement concerné. Sans modèle, un message vous invite à en déposer un. Une quittance demandée depuis un bail reprend le dernier paiement encaissé, ou celui de l'échéance choisie ; sans paiement encaissé, elle n'est pas produite. Un bail n'a qu'un seul contrat : pour le refaire, utilisez « Régénérer ».",
        },
        {
          title: "Produire un second contrat pour un même bail",
          goal: "Un bail peut porter plusieurs contrats : le premier garde le numéro du bail, les suivants prennent -A2, -A3… Le numéro d'une quittance est attribué avant la production du document.",
          status: "developpement",
        },
        {
          title: "Afficher la devise du bail dans les modèles",
          goal: "Un nouveau champ de fusion reprend la devise du bail (FCFA par défaut) dans les quatre modèles Word. Les modèles déjà installés gardent leur ancien texte tant qu'ils ne sont pas remplacés.",
          status: "developpement",
        },
        {
          title: "Régénérer un document",
          goal: "Refaire un document déjà produit, par exemple après une correction ou un changement de modèle.",
          input: "Si besoin, un autre modèle.",
          output: "Une nouvelle version du document, avec un numéro de révision.",
          prereq: "Le document a déjà été généré une première fois.",
        },
        {
          title: "Télécharger un document généré",
          goal: "Récupérer le fichier Word pour l'imprimer, le signer ou l'envoyer.",
          prereq: "Le document a été généré.",
        },
      ],
      faq: [
        {
          q: "Peut-on produire plusieurs contrats pour un même bail ?",
          a: "C'est en cours de développement : le premier contrat garde le numéro du bail, les suivants prennent un suffixe (-A2, -A3…).",
        },
        {
          q: "Qui figure comme bailleur dans le document ?",
          a: "L'entité qui détient le bien (SCI, holding, société) si elle existe, sinon le propriétaire client, l'agence étant alors son mandataire, sinon l'agence elle-même. Une coordonnée absente est remplacée par un tiret.",
        },
        {
          q: "Comment la clause de pénalité du contrat est-elle rédigée ?",
          a: "Elle reprend le mode de pénalité du bail : forfait, pourcentage du loyer ou du solde, avec son plafond. Le relevé de loyer ne compte une échéance qu'à sa date d'exigibilité, comme le compte du locataire.",
        },
        {
          q: "Quel modèle est utilisé si je n'en choisis pas ?",
          a: "Le modèle par défaut de l'agence pour ce type de document, ou à défaut le dernier modèle actif.",
        },
      ],
      related: ["communication-et-documents/modeles-de-documents-word"],
    },
    {
      slug: "assistant-ia-immocopilot",
      title: "Assistant IA ImmoCopilot",
      metaTitle: "Assistant IA ImmoCopilot pour agence immobilière",
      summary:
        "Posez vos questions en français à l'assistant : il retrouve biens et baux, liste leurs documents et prépare quittances et relevés que vous confirmez vous-même.",
      intro:
        "ImmoCopilot est un assistant de conversation accessible depuis toutes les pages de l'agence, par un bouton flottant ou le raccourci Ctrl/Cmd+J. Il répond par écrit en direct, présente les biens, baux et documents trouvés sous forme de cartes et s'adapte à l'écran que vous consultez. Il ne modifie rien de lui-même : un document n'est produit qu'après votre confirmation. Il est désactivé par défaut et ne propose que les outils permis par vos droits et par votre abonnement.",
      packs: ["agence", "syndic", "promoteur", "integre", "patrimoine-essentiel", "patrimoine-pro"],
      profiles: ["equipe"],
      menu: "Bouton flottant « Assistant » (Ctrl/Cmd+J), sur toutes les pages de l'agence",
      status: "deploiement",
      actions: [
        {
          title: "Savoir si l'assistant est disponible",
          goal: "À l'ouverture de l'application, l'assistant indique s'il est activé et quels outils vous pouvez employer. Le bouton flottant n'apparaît que si l'assistant est activé.",
          output:
            "Le bouton « Assistant », et un message d'accueil qui ne cite que ce que vous avez le droit de faire : sans gestion locative, ni baux ni quittances ne sont annoncés.",
        },
        {
          title: "Discuter avec l'assistant",
          goal: "Poser une question en langage courant et suivre la réponse qui s'écrit en direct, avec des suggestions selon l'écran où vous êtes.",
          input: "Votre message ; vous pouvez arrêter la réponse ou ouvrir une nouvelle conversation.",
          output:
            "Un texte et, selon la demande, des cartes de résultats. La conversation n'est pas conservée dans le navigateur, et le nombre de messages par minute et par jour est limité.",
          prereq: "L'assistant doit être activé pour votre agence.",
        },
        {
          title: "Rechercher des biens en langage naturel",
          goal: "Retrouver des biens de l'agence en les décrivant, par exemple « appartements disponibles à Cocody ».",
          input: "Une description : texte, commune ou zone, type, statut, mode de transaction, prix, nombre de chambres.",
          output:
            "Jusqu'à 10 biens, sous forme de cartes cliquables vers la fiche du bien (référence, type, statut, zone, prix, chambres, surface).",
        },
        {
          title: "Lister les documents d'un bien",
          goal: "Voir les pièces du dossier d'un bien : titre foncier, mandat, plans, y compris celles qui sont expirées.",
          output: "Jusqu'à 10 documents, avec le nom du fichier, le type, le statut valide ou expiré et la date.",
          prereq: "Le bien a été trouvé par l'assistant ou correspond à l'écran en cours.",
        },
        {
          title: "Retrouver un bail",
          goal: "Chercher un bail par son numéro, le nom du locataire, le bien ou le statut.",
          output: "Jusqu'à 10 baux, avec le numéro, le statut, le bien, le locataire, le loyer et la date de début.",
          prereq:
            "La gestion locative est comprise dans votre abonnement. Pour les packs Patrimoine, cela concerne la gestion locative directe.",
        },
        {
          title: "Lister les documents d'un bail",
          goal: "Voir les quittances, le contrat, les relevés et autres documents d'un bail, au besoin filtrés par type.",
          output: "Jusqu'à 10 documents, avec le libellé, le type, le statut, la date et la possibilité de les télécharger.",
          prereq: "Le bail a été retrouvé par l'assistant ou correspond à l'écran en cours.",
        },
        {
          title: "Préparer une quittance ou un relevé de compte",
          goal: "L'assistant prépare une proposition de quittance de loyer pour un mois, ou de relevé de compte sur 12 mois au plus, sans rien produire encore.",
          input: "Le bail et, pour une quittance, le mois ; pour un relevé, les dates de début et de fin.",
          output:
            "Une carte récapitulative (bail, bien, locataire, période, montant), valable quelques minutes. Si la quittance existe déjà, elle est affichée au lieu d'être reproposée.",
          prereq:
            "Un paiement encaissé pour l'échéance du mois, et un modèle de document actif. À défaut, l'assistant explique pourquoi il ne peut pas proposer.",
        },
        {
          title: "Confirmer et générer le document proposé",
          goal: "Valider vous-même la carte de proposition pour que le document Word soit produit. C'est la seule façon dont l'assistant génère un document.",
          output: "Le document Word numéroté. Confirmer deux fois ne crée pas de doublon : le document existant est renvoyé.",
          prereq: "Vous avez le droit de générer et de consulter les documents locatifs, et la proposition n'a pas expiré.",
        },
        {
          title: "Télécharger le document généré",
          goal: "Récupérer en un clic le fichier Word produit, depuis la carte affichée après la confirmation.",
          output: "Le fichier Word (.docx).",
          prereq: "Le document a été généré.",
        },
      ],
      faq: [
        {
          q: "L'assistant peut-il modifier mes données ?",
          a: "Non. Il cherche, présente et prépare des propositions. Un document n'est produit qu'après votre confirmation sur la carte.",
        },
        {
          q: "Pourquoi ne vois-je pas le bouton « Assistant » ?",
          a: "L'assistant est désactivé par défaut. Le bouton n'apparaît que s'il est activé pour la plateforme et si au moins un de ses outils vous est permis.",
        },
        {
          q: "Que voit l'assistant de mes données ?",
          a: "Seulement ce que vos droits et votre abonnement permettent. Il ne cherche que dans les données de votre agence, et un outil d'un module que vous n'avez pas souscrit lui est refusé.",
        },
      ],
      related: [
        "communication-et-documents/generation-baux-quittances",
        "communication-et-documents/modeles-de-documents-word",
      ],
    },
  ],
};
