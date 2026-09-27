import type { WikiDomain } from "./types";

export const communicationEtDocuments: WikiDomain = {
  slug: "communication-et-documents",
  title: "Communication et documents",
  metaTitle: "Logiciel e-mail, WhatsApp et newsletter immobilier en CI",
  summary:
    "Notifications e-mail et WhatsApp, newsletters, campagnes et modèles Word de l'agence : communiquez avec vos clients et générez baux et quittances en un clic.",
  intro:
    "Ce domaine réunit tout ce que l'agence envoie à ses clients et tout ce qu'elle produit comme documents. Côté communication : notifications automatiques par e-mail et WhatsApp, diffusion dans votre groupe WhatsApp, listes de diffusion et campagnes de newsletter. Côté documents : vos propres modèles Word pour les baux, quittances et relevés, remplis automatiquement. Il s'adresse à la direction et à tous les collaborateurs qui échangent avec les propriétaires, locataires et prospects.",
  features: [
    {
      slug: "notifications-email-whatsapp",
      title: "E-mail et WhatsApp",
      metaTitle: "Notifications e-mail et WhatsApp pour agence immobilière",
      summary:
        "Choisissez les notifications e-mail et WhatsApp envoyées à vos clients, personnalisez leurs textes et diffusez vos messages dans votre groupe WhatsApp.",
      intro:
        "ImmoTopia prévient automatiquement vos clients par e-mail et par WhatsApp : maintenance, paiements, baux, syndic, invitations. Vous décidez quelles notifications partent et avec quel texte. Vous pouvez aussi inviter vos contacts dans votre groupe WhatsApp et y diffuser une annonce avec une photo. Vos clients reçoivent l'information là où ils la lisent vraiment.",
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Paramétrer les notifications e-mail",
          goal: "Choisir, parmi près de quarante notifications automatiques (maintenance, paiements, baux, CRM, syndic, patrimoine, invitations, mot de passe oublié…), celles que l'agence envoie.",
          input: "Pour chaque notification : activée ou non, et si vous le souhaitez un objet et un texte personnalisés.",
          output: "Des e-mails à l'image de l'agence. Un bouton rétablit le texte d'origine.",
        },
        {
          title: "Paramétrer les notifications WhatsApp",
          goal: "Choisir, parmi une vingtaine de notifications (maintenance, paiements, baux, CRM, compte du portail, syndic…), celles qui partent par WhatsApp.",
          input:
            "Pour chaque notification : activée ou non, un texte personnalisé ou un modèle de message WhatsApp Business.",
          output: "Des messages WhatsApp adaptés à l'agence. Un bouton rétablit le texte d'origine.",
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
      packs: ["agence", "syndic", "promoteur", "integre"],
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
      packs: ["agence", "syndic", "promoteur", "integre"],
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
      packs: ["agence", "syndic", "promoteur", "integre"],
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
          goal: "Retrouver les modèles de l'agence.",
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
      packs: ["agence", "syndic", "promoteur", "integre"],
      profiles: ["equipe"],
      status: "disponible",
      actions: [
        {
          title: "Générer un bail, une quittance ou un relevé",
          goal: "Produire le document à partir du bail ou du paiement concerné.",
          input:
            "Le type de document, le bail ou le paiement, et si besoin le modèle à utiliser, l'échéance ou la période du relevé.",
          output:
            "Un document Word numéroté. ImmoTopia prend le modèle choisi, sinon le modèle par défaut, sinon le dernier modèle actif, et vérifie que les informations essentielles sont remplies.",
          prereq:
            "Un modèle actif pour ce type de document et le bail ou le paiement concerné. Sans modèle, un message vous invite à en déposer un.",
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
          q: "Quel modèle est utilisé si je n'en choisis pas ?",
          a: "Le modèle par défaut de l'agence pour ce type de document, ou à défaut le dernier modèle actif.",
        },
      ],
      related: ["communication-et-documents/modeles-de-documents-word"],
    },
  ],
};
