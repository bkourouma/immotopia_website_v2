# Base de connaissances immotopIA

Ce document est la base de connaissances de l'assistant immotopIA, qui répond aux visiteurs du site https://immotopia.cloud. Il décrit ce que fait l'application ImmoTopia, la façon dont elle est vendue, la mise en route, les outils gratuits du site et l'éditeur Alliance Consultants.

Règles de lecture pour l'assistant :

- Tout ce qui figure ici est tiré de la documentation fonctionnelle de l'application (septembre 2026), de la proposition de modèle économique du 23 septembre 2026, des fichiers du site immotopia.cloud et du site allianceconsultants.net.
- Ce qui n'est pas écrit ici n'est pas établi. Dans ce cas, il faut le dire et proposer une démonstration ou un échange avec l'équipe. Ne jamais compléter par une supposition.
- La section « Limites connues et points à ne pas promettre » prime sur toute autre formulation, y compris sur les accroches commerciales du site.
- Les prix officiels sont fournis séparément (grille tarifaire). Ce document n'en donne que les règles.

## Disponibilité (vérifiée le 18 octobre 2026 — prime sur tout le reste)

- Disponible et commercialisé : module Agence (biens, annonces, CRM, baux, échéances, paiements, pénalités, dépôts, documents, relevés de gérance, portails propriétaire et locataire), module Syndic, module Promoteur (chantiers, lots et coût de revient, budget et avenants, avancement, dépenses, stock de matériaux, personnel, tâcherons, retenues de garantie, foncier), états des lieux (signature électronique en option payante, export et impression PDF, utilisation sur téléphone et tablette, photos par pièce), maintenance, communication e-mail / WhatsApp / newsletter, patrimoine, tableaux de bord, rôles et audit. Packs vendus : **Agence**, **Syndic**, **Promoteur**, **Opérateur intégré**, **Patrimoine Essentiel** et **Patrimoine Pro** (combinables avec 10 % de remise sur le prix de base du moins cher).
- États des lieux d'entrée et de sortie, disponibles en production (confirmé par l'équipe le 13 octobre 2026) : pièces, compteurs, clés, signataires, retenues sur le dépôt, comparaison entrée / sortie, photos par pièce, signature électronique (option payante « Signatures électroniques »), export et impression en PDF, utilisation sur téléphone et tablette dans le navigateur (sans application native, connexion Internet nécessaire). L'agence transmet elle-même le PDF exporté au locataire (pas d'envoi automatique documenté). Détail : https://immotopia.cloud/wiki/gestion-locative/etats-des-lieux
- Disponibles en production (confirmé par l'équipe le 13 octobre 2026) : renouvellement, avenant et résiliation du bail ; honoraires de gestion à trois niveaux (bail, propriétaire, agence), compte courant du propriétaire et reversements aux propriétaires ; finance opérationnelle (fournisseurs, pièces de caisse, dépenses y compris de chantier, file de validation, balances clients et fournisseurs, import Excel).
- Disponibles en production (confirmé par l'équipe le 16 octobre 2026) : révision / indexation du loyer ; solde de tout compte et historique du bail ; comptabilité de l'agence (écritures de la gestion locative, journal, grand livre, balance) et export comptable (CSV, Excel) ; paramètres financiers de l'agence (assujettissement et taux de TVA, comptes comptables de la gestion locative). La comptabilité automatique de la gestion locative couvre les biens gérés sous mandat (loyers, honoraires, dépenses, reversements) comme les biens détenus en propre (packs Patrimoine).
- Disponibles en production (versions 1.12.0 à 2.0.0, octobre 2026) :
  - **Signature électronique** des baux, des états des lieux et des mandats : envoi à signer à distance, écran « Signatures » de suivi (filtres, relance, annulation, PDF), rappels automatiques avant l'expiration. **Option payante** « Signatures électroniques » (blocs de 50 signatures par mois, cumulables), achetable avec tous les packs ; aucune signature n'est incluse dans un pack.
  - **Prélèvement bancaire des loyers** : créanciers, mandats de prélèvement par bail, remises, prénotification. Inclus dans la gestion locative (packs Agence, Opérateur intégré, Patrimoine Essentiel et Patrimoine Pro), sans commission ImmoTopia ; remise préparée dans l'application et déposée à la banque de l'agence.
  - **Paiement en ligne des charges de copropriété par Mobile Money** : lien « Payer cet appel » et portail copropriétaire, avec reversements vers la banque de la copropriété. Inclus dans les packs Syndic et Opérateur intégré, sans commission ImmoTopia.
  - **Assemblée générale en direct** : console du gestionnaire, émargement en ligne, vote en ligne par lien personnel (sans compte), écran de projection, export Word. Incluse dans les packs Syndic et Opérateur intégré. La **visio des assemblées** (salle de visio, main levée, parole, discussion écrite modérée, enregistrement de la séance) est une **option payante** « Visio des assemblées », avec Syndic ou Opérateur intégré.
  - **Inventaire de chantier par WhatsApp** : le chef de chantier envoie la photo d'un article, l'IA propose l'article et le total. **Option payante** « Inventaire WhatsApp » (blocs de 500 photos analysées par mois, cumulables), avec Promoteur ou Opérateur intégré.
  - **Export des tableaux** en Excel, CSV et PDF (bouton « Exporter »), et **application installable** sur l'écran d'accueil du téléphone ou de l'ordinateur : tous les packs.
  - Dans les packs Promoteur et Opérateur intégré : contrôle du stock (alertes, indicateurs, réglages) et écran Magasin pour le magasinier. Dans les packs de gestion locative : retenues sur le dépôt proposées depuis l'état des lieux de sortie.
- En cours de développement, et présentables comme tels : les fonctions listées dans « Fonctions en cours de développement ». Toujours préciser qu'elles sont en cours de développement ou de déploiement, ne jamais donner de date, et proposer de vérifier leur disponibilité avec l'équipe.
- Les packs **Promoteur** et **Opérateur intégré** sont affichés avec leur prix. Le module Promoteur (chantiers, BTP) et la finance opérationnelle sont disponibles en production (confirmé par l'équipe le 13 octobre 2026).
- Les points de la section « Limites » (fonctions non établies) ne sont pas annoncés.

---

## ImmoTopia en bref

### Ce que c'est

ImmoTopia (souvent écrit ImmoTopia.cloud) est un logiciel de gestion immobilière en ligne, de type ERP et vendu en abonnement (SaaS). Il réunit dans une même application les métiers de l'immobilier professionnel : transaction et gestion locative, syndic de copropriété, promotion immobilière et construction, avec des fonctions communes à tous ces métiers (CRM, finance opérationnelle, patrimoine, documents, portails propriétaire et locataire, maintenance, communication par e-mail et WhatsApp, tableaux de bord).

Le principe est de travailler sur un seul fichier de clients et un seul parc de biens. Un propriétaire saisi une fois dans le CRM peut devenir le bailleur d'un bail, le destinataire d'un relevé de gérance et le copropriétaire d'un lot, sans double saisie.

### Pour qui

ImmoTopia s'adresse aux professionnels, pas aux particuliers qui cherchent un logement :

- Agences immobilières de transaction et de gestion locative.
- Gestionnaires locatifs (administrateurs de biens).
- Cabinets de syndic de copropriété.
- Promoteurs et entreprises immobilières qui construisent et commercialisent.
- Groupes « opérateurs intégrés » qui construisent, vendent, louent et gèrent des copropriétés.
- Propriétaires bailleurs et investisseurs, pour la vue patrimoine (valeur, rendement, emprunts, travaux).

Les propriétaires et les locataires gérés par un client ImmoTopia disposent de portails en libre-service ; ils n'ont pas d'abonnement à souscrire.

### Marché et positionnement

- Marché initial : Abidjan et la Côte d'Ivoire. Le site d'Alliance Consultants présente la solution comme pensée pour les professionnels de l'immobilier en Afrique de l'Ouest.
- Devise : franc CFA (FCFA). Les prix sont exprimés en FCFA, hors taxes.
- Adaptation locale documentée : suivi du Mobile Money comme moyen de paiement (Orange Money, MTN Mobile Money, Moov Money, Wave), référentiel géographique pays / régions / communes, documents locatifs francophones, modèles de bail inspirés du droit ivoirien et OHADA parmi les outils gratuits du site.
- Positionnement : un outil unique qui suit le processus complet du métier, plutôt qu'une collection de menus. Le client n'achète pas des options une à une ; il choisit le pack de son métier.
- Pas de commission ImmoTopia sur les loyers encaissés, ni de prélèvement d'un pourcentage sur le prix de vente.

### Éditeur

ImmoTopia est édité par Alliance Consultants, société basée à Abidjan (Côte d'Ivoire), fondée en 2003 (voir la section Alliance Consultants).

---

## Organisation de l'application : organisations, modules et packs

### Un espace par organisation

ImmoTopia est une plateforme multi-organisations : chaque client (agence, cabinet, promoteur, groupe) dispose de son propre espace, avec ses collaborateurs, ses données, ses documents et ses paramètres. Les données sont cloisonnées entre organisations : rien ne circule d'un espace à l'autre.

La documentation technique mentionne la possibilité d'un sous-domaine propre et d'une identité visuelle (logo, couleurs) par organisation. Les modalités concrètes pour un client (nom de domaine, personnalisation) ne sont pas détaillées : à confirmer avec l'équipe.

### Trois modules métier activables

L'application possède trois modules métier, activés ou désactivés organisation par organisation par l'administration de la plateforme :

- Module Agence : transaction et gestion locative.
- Module Syndic : copropriété.
- Module Promoteur : chantiers, construction et commercialisation de programmes.

Une même organisation peut avoir plusieurs modules activés en même temps (par exemple un cabinet qui fait à la fois de la gestion locative et du syndic).

### Six packs commerciaux

L'offre commerciale est organisée en six packs, qui correspondent aux métiers et aux profils :

- Agence : agences de transaction et de gestion locative.
- Syndic : cabinets de copropriété.
- Promoteur : promoteurs ou entreprises immobilières qui construisent et commercialisent.
- Opérateur intégré : groupes qui construisent, commercialisent, louent et gèrent des copropriétés. Il inclut tous les modules métier et toutes les fonctions transversales, sans supplément finance, CRM ou patrimoine.
- Patrimoine Essentiel : particuliers et diaspora, 10 biens détenus en propre, loués ou non.
- Patrimoine Pro : entreprises et institutionnels, 100 biens détenus en propre, loués ou non. Mêmes fonctionnalités que l'Essentiel ; les deux ne se cumulent pas, on passe de l'un à l'autre par changement de pack.
- Les packs Patrimoine comprennent la vue patrimoniale (valeur des biens, emprunts, ratios bancaires, hypothèses de projection par bien), la gestion locative directe de leurs propres biens (baux, loyers, quittances), les documents, la finance, la maintenance, la communication, les rôles et l'audit. Pas de mandat de gestion ni de propriétaire tiers. La valeur nette consolidée et les projections consolidées sont en développement (à dire sans date). Pas de mandat de gestion pour un tiers ni de propriétaire tiers. Une fonction « Patrimoine particulier gratuit » ou « plus » est encore en développement : ne pas l'annoncer.

Couverture fonctionnelle par pack (d'après la proposition de modèle économique) :

- Biens, documents, contacts, rôles, audit, tableaux de bord : tous les packs.
- CRM, mandats, annonces, visites et suivi commercial : Agence, Promoteur, Opérateur intégré.
- Baux, loyers, échéances, paiements, quittances : Agence, Opérateur intégré, Patrimoine Essentiel et Pro (gestion locative directe de leurs propres biens). Pénalités de retard et dépôts de garantie : Agence, Opérateur intégré.
- Portails propriétaire et locataire : Agence, Opérateur intégré.
- Prélèvement bancaire des loyers (sans commission ImmoTopia) : Agence, Opérateur intégré, Patrimoine Essentiel et Pro.
- Assemblée générale en direct et vote en ligne ; paiement en ligne des charges par Mobile Money (sans commission ImmoTopia) : Syndic, Opérateur intégré.
- Export des tableaux (Excel, CSV, PDF) et application installable sur téléphone : tous les packs.
- Options payantes à la carte (prix dans la grille officielle) : Signatures électroniques (tous les packs), Visio des assemblées (Syndic ou Opérateur intégré), Inventaire WhatsApp (Promoteur ou Opérateur intégré).
- Maintenance et interventions : tous les packs.
- Syndic (copropriétés, tantièmes, charges, impayés, assemblées générales) : Syndic, Opérateur intégré.
- Comptabilité de copropriété et budgets : Syndic, Opérateur intégré.
- Chantiers (budgets, coûts, achats, avancement, lots, clôture) : Promoteur, Opérateur intégré.
- BTP (matériaux et stock, personnel, tâcherons, terrain, associations) : Promoteur, Opérateur intégré.
- Finance : tous les packs.
- Patrimoine (valeur des biens, emprunts, ratios bancaires, projections par bien) : Agence, Promoteur, Opérateur intégré, Patrimoine Essentiel et Pro. Valeur nette et projections consolidées : en développement.
- Communication (e-mail, modèles, relances, WhatsApp, newsletter) : tous les packs.
- Vente des lots d'un promoteur : le suivi commercial (prospects, contacts, pipeline, visites, relances, rapprochement) se fait dans le CRM ; il n'y a ni offre, ni compromis, ni échéancier de l'acquéreur pour la vente des lots d'un promoteur (voir Limites).

---

## Module Agence : transaction et gestion locative

### Biens immobiliers et annonces

- Fiche bien complète : création, modification, archivage.
- Modèles par type de bien : les champs et caractéristiques s'adaptent à la nature du bien. La présentation commerciale de l'application cite 12 types de biens (appartement, maison, villa, studio, terrain, etc.).
- Modes de commercialisation : vente, location ou courte durée ; un même bien peut cumuler plusieurs modes (d'après la présentation commerciale).
- Médias : photos (avec photo principale et ordre d'affichage) et pièces jointes. La présentation commerciale mentionne aussi vidéos et visites 360°.
- Documents du bien (titre foncier, mandat, plan, pièces fiscales…), avec date d'expiration et alerte selon la présentation commerciale.
- Cycle de vie suivi avec historique daté des changements de statut (brouillon, en validation, disponible, réservé, sous offre, loué ou vendu, archivé).
- Mandats de gestion et mandats de vente rattachés au bien.
- Score de qualité de l'annonce, qui mesure la complétude de la fiche et propose des améliorations.
- Recherche multicritère des biens.
- Visites : planification, collaborateurs affectés, calendrier des visites.
- Référentiel géographique intégré (pays, régions, communes) pour localiser proprement les biens et définir des zones cibles.
- Publication et retrait d'annonces, avec une interface publique (API) qui permet d'alimenter le site vitrine de l'agence. ImmoTopia ne fournit pas, d'après la documentation, de site vitrine clé en main ni de diffusion automatique vers des portails d'annonces tiers.

### Baux

- Création et modification des baux, avec colocataires.
- Périodicité mensuelle, trimestrielle, semestrielle ou annuelle, et suivi du statut du bail.
- Fiche détaillée du bail.
- Signature électronique du bail, de l'état des lieux et du mandat de gestion : option payante « Signatures électroniques » (voir la section « Signature électronique »).
- Prélèvement bancaire du loyer (voir la section « Prélèvement bancaire des loyers »).
- Vie du bail : révision / indexation du loyer (les échéances non réglées à partir du mois d'effet sont recalculées, une révision à date future est planifiée), renouvellement, avenant, résiliation, historique chronologique du bail et solde de tout compte (estimation de la somme à rendre au locataire en fin de bail). Disponibles en production (confirmé par l'équipe le 16 octobre 2026).

### Échéances (appels de loyer)

- Échéancier généré automatiquement à partir du bail, avec lignes de détail (loyer, charges…).
- Fiche par échéance, suivi du statut (en retard, partiel, à échoir, payé) et du reste à encaisser.

### Paiements et encaissements

- Saisie des paiements par moyen de règlement : espèces, virement, chèque, Mobile Money (avec l'opérateur : Orange Money, MTN Mobile Money, Moov Money, Wave ou autre) ou carte bancaire.
- Affectation d'un paiement sur une ou plusieurs échéances ; la présentation commerciale indique une affectation automatique aux échéances les plus anciennes et une protection contre les doubles saisies.
- Déclarations de paiement : le locataire déclare depuis son portail un règlement qu'il a effectué, et l'agence le valide.
- Remboursements.

### Pénalités de retard

- Règles paramétrables : montant fixe, pourcentage du loyer ou du solde, avec période de grâce.
- Calcul automatique par une tâche planifiée, consultation et ajustement manuel possibles.

### Dépôts de garantie (cautions)

- Constitution, conservation, mouvements (retenues, restitutions, ajustements), chaque mouvement étant tracé.

### Documents locatifs

- Génération de documents depuis les modèles de l'agence : contrat, avenant, reçu, quittance, relevé.
- Numérotation automatique en série (par exemple 2026-001) et export au format Word (DOCX).

### Relevés de gérance (propriétaires)

- Constitution des relevés par propriétaire et par période, consultation, envoi au propriétaire et suivi du statut.
- Des évolutions du calcul du relevé (appelé, encaissé, impayé, honoraires, TVA, dépenses, net à reverser) sont en cours de développement : voir « Fonctions en cours de développement ».

---

## Module Syndic : copropriété

- Copropriétés : fiche (adresse, statut, nombre de lots, nombre de bâtiments, référence cadastrale), création, modification, liste.
- Lots : tantièmes, profils propriétaire et locataire, affectations ; les copropriétaires sont rattachés au CRM. Import des lots à partir des biens déjà saisis.
- Budgets d'exercice : lignes budgétaires, ventilations et clé de répartition ; génération des appels de charges par lot à partir du budget.
- Appels de charges : appels individuels et appels en masse (lots d'appels), encaissements des charges, suivi du taux de recouvrement.
- Recouvrement : vue des retards, relances individuelles ou groupées, pénalités de retard, échéanciers de paiement, moyens de paiement.
- Assemblées générales : ordre du jour, résolutions, votes et pouvoirs par lot, calcul du quorum, compte rendu archivé.
- Assemblée générale en direct (incluse dans Syndic et Opérateur intégré) : le gestionnaire pilote la séance depuis une console ; émargement en ligne des copropriétaires et mandataires, quorum recalculé en temps réel, vote en ligne par lien personnel (Pour, Contre ou Abstention, pour tous les lots ou lot par lot, revote possible tant que le vote est ouvert), écran de projection pour la salle, export Word. Le copropriétaire n'a pas besoin de compte. Détail : https://immotopia.cloud/wiki/portails-clients/assemblee-par-lien-personnel
- Visio des assemblées (option payante « Visio des assemblées », avec Syndic ou Opérateur intégré, par cabinet et toutes copropriétés confondues) : salle de visio dans la page de l'assemblée, main levée, parole donnée ou retirée et exclusion par le gestionnaire, discussion écrite modérée, enregistrement de la séance. Détail : https://immotopia.cloud/wiki/syndic-copropriete/visio-des-assemblees
- Paiement en ligne des charges par Mobile Money (inclus dans Syndic et Opérateur intégré, sans commission ImmoTopia) : le gestionnaire crée ou envoie au copropriétaire (WhatsApp ou e-mail, avec son consentement) un lien « Payer cet appel » ; le copropriétaire peut aussi payer depuis son portail. Le paiement est rattaché au bon lot, suivi dans l'écran Finances (statuts, vérification, paiements à trancher) et reversé vers le compte bancaire de la copropriété. Détail : https://immotopia.cloud/wiki/portails-clients/payer-un-appel-de-charges
- Comptabilité de copropriété : plan de comptes, journaux, écritures en partie double verrouillables, grand livre et balance. Les spécifications du module la décrivent comme une comptabilité syndic conforme OHADA.
- Comptes propriétaires (compte par lot) avec relevé, transactions et ajustements, et écran « Finances ».
- Prestataires et contrats de maintenance, équipements des parties communes.
- Incidents de copropriété avec imputation des coûts, et lien vers la maintenance.
- Documents de copropriété (coffre documentaire) et fonds de la copropriété.
- Procès-verbal d'assemblée générale : le syndic le génère en Word, le relit, puis le dépose dans les documents de la copropriété (type « procès-verbal »).
- Portail copropriétaire : sur invitation du syndic, chaque copropriétaire consulte en lecture seule ses lots, le solde et l'historique de son compte, ses appels de charges, ses paiements, reçus et quittances, le relevé de compte en PDF, les assemblées (ses propres votes uniquement), le règlement de copropriété et les procès-verbaux. Il peut régler un appel de charges par Mobile Money (portail ou lien « Payer cet appel »). Détail : https://immotopia.cloud/wiki/portails-clients/portail-coproprietaire
- Fonds de la copropriété : fonds de roulement (avance de trésorerie pour les dépenses courantes) et fonds de travaux (réserve pour travaux futurs) sont des fonds distincts, avec leur solde et leur journal ; un poste du budget peut alimenter un fonds.

---

## Module Promoteur : chantiers, construction et BTP

Le module Promoteur est disponible en production (confirmé par l'équipe le 13 octobre 2026) : chantiers, lots, budget, avancement, dépenses, stock, personnel, tâcherons, retenues de garantie, foncier. Le détail de chaque fonction est dans le wiki (domaine « Promotion et chantiers »).

### Chantiers

- Le chantier est un objet financier à part entière ; il peut exister sans bien rattaché (par exemple sur un terrain loué).
- Le coût réel du chantier est entièrement calculé à partir des imputations (salaires, factures fournisseurs, pièces de caisse, sorties de stock), jamais saisi à la main. Chaque imputation est tracée jusqu'à la pièce d'origine.
- Sous-totaux par poste : gros œuvre, toiture, plomberie, électricité, main-d'œuvre, matériaux, divers. Catégories de coûts paramétrables.
- Budgets de chantier et avenants : budget initial, budget révisé, réalisé, écart, signalement des dépassements.
- Bons de commande et suivi de l'engagé (statuts brouillon, émis, annulé ; état de facturation ; reste à facturer).
- Avancement du chantier et alertes de dépassement.
- Tableau de bord des chantiers : vue consolidée budget / réalisé / écart.
- Lots de chantier : répartition par surface ou par quote-part manuelle (somme contrôlée à 100 %), coût de revient par lot.
- Clôture du chantier avec blocages explicites, et réouverture possible d'un chantier clôturé.
- Bascule au patrimoine : un lot de chantier achevé devient un bien du parc (une seule fois), qui peut ensuite être loué ou géré.

### Stock de matériaux

- État du stock et journal des mouvements ; réceptions et sorties.
- Règle : c'est la sortie de stock qui impute le chantier (au coût moyen pondéré du moment), pas la livraison.
- Coût moyen pondéré par article et par lieu de stockage ; transferts entre lieux (qui ne sont pas des dépenses).
- Inventaire physique et rapprochement ; procès-verbal d'inventaire en PDF, justification ou écart des lignes, abandon d'un inventaire.
- Contrôle du stock (packs Promoteur et Opérateur intégré) : alertes (écart, sortie ou rebut important, achat en espèces…), indicateurs par lieu et par mois, seuils réglables, rebuts et retours au fournisseur, photos et bons de stock en PDF. Écran Magasin pour le magasinier, utilisable au téléphone, sans voir les valeurs ni la comptabilité.
- Inventaire de chantier par WhatsApp (option payante « Inventaire WhatsApp », avec Promoteur ou Opérateur intégré) : l'administrateur inscrit un chef de chantier (numéro WhatsApp et chantiers, code d'activation) ; le chef envoie la photo d'un article, l'IA propose l'article et le total, et le comptage arrive dans l'écran « Comptages terrain » avec sa photo comme preuve. Option vendue par blocs de 500 photos analysées par mois, cumulables. Détail : https://immotopia.cloud/wiki/promotion-et-chantiers/inventaire-par-whatsapp
- Paramétrage : articles (code, unité, famille, poste proposé), lieux de stockage, méthode de valorisation.

### Personnel et sous-traitance

- Salariés et notes de salaire, avec solde dû et gestion des avances à retenir. Il ne s'agit pas d'un logiciel de paie (pas de bulletins, cotisations ni déclarations sociales).
- Tâcherons : contrats, situations de travaux, paiements, solde dû par tâcheron.
- Retenues de garantie : taux, montant détenu, déjà libéré, en retard, rattachées à la pièce et au chantier.

### Foncier et partenariats

- Baux de terrain : bailleur, loyer annuel, mensualité, poste d'imputation, chantiers rattachés, paiements et charges à payer.
- Associations : parts des associés et distributions.

### Commercialisation des programmes

- Le CRM (contacts, affaires de type vente, pipeline, visites) sert au suivi commercial des lots.
- Vente des lots d'un promoteur : le CRM (contacts, affaires de type vente, pipeline, visites, relances, rapprochement) sert au suivi commercial. Le parcours offre, compromis, conditions suspensives et échéancier de l'acquéreur existe uniquement pour une vente sous mandat d'agence (vente pour le compte d'un propriétaire), pas pour la vente des lots d'un promoteur. Il n'y a ni réservation de lots ni portail acquéreur.

---

## Fonctions transversales

### CRM et suivi commercial

- Contacts : prospects, clients, propriétaires, locataires, acquéreurs ; statut (prospect, client actif, archivé), rôles multiples par contact, étiquettes de couleur, zones cibles, notes, archivage.
- Affaires (opportunités) : pipeline par étapes (nouveau, qualifié, visite, négociation, gagné, perdu ; la présentation commerciale ajoute une étape rendez-vous), pour l'achat comme pour la location, avec biens rattachés et entonnoir valorisé par étape.
- Activités : appels, tâches, notes (la présentation commerciale cite aussi e-mails, SMS, WhatsApp, visites et réunions comme types d'activités à consigner).
- Agenda des rendez-vous et visites, avec collaborateurs associés et vue calendrier.
- Rapprochement (matching) entre le besoin d'un client et les biens disponibles.
- Tableau de bord commercial, recherches de contacts enregistrées, export des contacts (CSV ou Excel).

### Finance opérationnelle

Doctrine affichée dans l'interface : l'utilisateur « facture » et « règle » ; aucun écran n'expose les notions de débit et de crédit. Ces écrans ont été ajoutés en septembre 2026 et leur présence dans la version déployée est à confirmer.

Volet clients :

- Balance clients : par tiers, total facturé, total réglé, solde, produite sans saisie à partir des échéances et paiements ; filtre et export.
- Balance âgée : antériorité des créances ; filtre et export.
- Relevé de compte chronologique avec solde après chaque mouvement, imprimable.
- Facturation du mois (campagne de facturation mensuelle) et avances.

Volet fournisseurs :

- Annuaire des fournisseurs (matériaux, prestation, ou les deux ; actif / inactif).
- Factures fournisseurs (lignes avec quantité et prix unitaire), règlements fournisseurs et affectation sur factures.
- Balance fournisseurs avec total de contrôle, soldes négatifs (avances) gérés.

Caisse et contrôle :

- Pièces de caisse (bons de caisse) numérotées, imprimables, annulables, duplicables.
- File de validation : pièces en attente classées par type (facture fournisseur, règlement, pièce de caisse), avec le nom de la personne qui a saisi et la date.
- Une pièce validée est définitive : pour la corriger, on l'annule par une pièce liée, on ne la modifie pas.
- Importation : assistant en cinq étapes (document, fichier, colonnes, aperçu, import) pour reprendre un suivi Excel existant (fichier .xlsx), avec correspondance des colonnes. Les pièces importées arrivent en brouillon, jamais validées d'office.

La clôture physique de caisse par caissier (montant attendu, compté, écart) n'est pas décrite dans la documentation : voir Limites.

### Patrimoine (vue propriétaire et investisseur)

- Vue consolidée du portefeuille : nombre de biens, biens occupés, taux d'occupation, valeur estimée totale, encours de crédits, charges de l'année, loyers annuels.
- Valorisations datées par bien, avec historique (seule la plus récente entre dans le total).
- Emprunts rattachés aux biens, dépenses par catégorie.
- Programmes de travaux par bien, avec statut (planifié, en cours, terminé, annulé), date et montant.
- Rendements brut, net et net-net, et projections pluriannuelles (d'après la présentation commerciale).
- Relevés propriétaire et documents patrimoniaux.

### Signature électronique

- Documents concernés : bail, état des lieux, mandat de gestion, mandat de vente et compromis de vente. Envoi à signer à distance aux signataires ou signature sur place, côte à côte, sur l'appareil de l'agent.
- Écran « Signatures » (menu Paramétrage) : toutes les demandes de l'agence avec leur statut (en cours, partiellement signée, terminée, refusée, expirée, annulée), relance, annulation, téléchargement du PDF (scellé quand la demande est terminée) et historique avec contrôle d'intégrité. Rappels automatiques aux signataires avant l'expiration.
- Facturation : option payante « Signatures électroniques », par blocs de 50 signatures par mois, cumulables, avec tous les packs. Aucune signature n'est incluse dans un pack. Le prix figure dans la grille officielle.
- Le lien et le code de signature peuvent aussi être envoyés par SMS (disponible). La signature électronique du compromis de vente est disponible : elle demande qu'un prestataire de signature qualifié soit en service pour l'agence ; ne nommer aucun fournisseur.
- Détail : https://immotopia.cloud/wiki/gestion-locative/signature-electronique

### Prélèvement bancaire des loyers

- Inclus dans la gestion locative : packs Agence, Opérateur intégré, Patrimoine Essentiel et Patrimoine Pro. Sans commission ImmoTopia.
- Créanciers (comptes bancaires de l'agence qui reçoivent les prélèvements), mandats de prélèvement par bail (contrôle de l'IBAN ou du RIB, autorisation en PDF à faire signer, dépôt du scan signé, activation, suspension, révocation), remises de prélèvements et prénotification. ImmoTopia prépare la remise, prévient les locataires et produit le fichier à déposer à la banque de l'agence, qui la marque ensuite comme déposée ; il ne débite pas lui-même les comptes. Le retour de la banque (règlements, rejets) n'est pas livré : ne pas le promettre.
- Détail : https://immotopia.cloud/wiki/gestion-locative/prelevement-bancaire

### Export des tableaux et application installable

- Export des tableaux : un bouton « Exporter » au-dessus de chaque tableau ou liste propose Excel, CSV et PDF, avec les filtres en cours. Disponible pour tous les packs et tous les profils qui voient le tableau (agence, propriétaire, locataire, copropriétaire). Détail : https://immotopia.cloud/wiki/communication-et-documents/export-des-tableaux
- Application installable : ImmoTopia s'installe sur l'écran d'accueil du téléphone ou de l'ordinateur depuis le navigateur (bouton « Installer l'application »), avec icône et plein écran, sans magasin d'applications. Ce n'est pas une application native des magasins, et une connexion Internet reste nécessaire. Détail : https://immotopia.cloud/wiki/administration-plateforme/application-installable

### ImmoCopilot, l'assistant IA de l'application

- ImmoCopilot est un assistant de conversation intégré à l'application, accessible depuis toutes les pages de l'agence (bouton flottant « Assistant » ou Ctrl/Cmd+J) et en pleine page. Il est disponible dans les six packs.
- Il lit les données de l'agence dans la limite des droits de l'utilisateur et de son abonnement, répond en direct et produit des tableaux, des textes ou des graphiques affichés dans un panneau de résultats, téléchargeables (CSV, Excel, image).
- Il peut proposer des écritures (modifier des données), mais rien n'est modifié sans l'accord explicite de l'utilisateur : une carte d'accord montre ce qui va changer, et les actions sensibles demandent de taper « CONFIRMER ». Il ne supprime rien.
- Ne pas confondre avec l'assistant immotopIA du site vitrine. Détail : https://immotopia.cloud/wiki/communication-et-documents/assistant-ia-immocopilot

### Documents et modèles

- Chaque agence téléverse ses propres modèles au format Word (DOCX), avec sa mise en page.
- Variables métier (par exemple nom de l'agence, loyer mensuel du bail) remplacées automatiquement à la génération ; un guide intégré liste les variables disponibles.
- Modèles typés par nature (bail commercial, etc.), modèle par défaut, actif / inactif.
- Numérotation automatique et continue des documents.
- Documents concernés : contrats, avenants, reçus, quittances, relevés.

### Portails propriétaire et locataire

Chaque propriétaire et chaque locataire peut recevoir un accès à son propre espace et ne voit que son périmètre.

Portail locataire :

- Tableau de bord, son bail et ses conditions.
- Échéances à venir, solde et historique des paiements.
- Déclaration d'un paiement effectué, à valider par l'agence.
- Dépôt de garantie et ses mouvements.
- Documents (contrat, quittances, reçus).
- Ouverture d'un ticket de maintenance avec photos, et suivi de ses demandes.

Portail propriétaire :

- Tableau de bord, ses biens et leur situation locative.
- Baux, échéances et paiements encaissés ; revenus avec graphiques d'évolution.
- Dépôts de garantie détenus.
- Tickets de maintenance en cours sur ses biens.
- Documents et rapports.
- Préférences de communication (canaux et consentement).

Les comptes propriétaires et locataires ne sont pas facturés au client ImmoTopia.

### Maintenance et interventions

- Tickets créés par le locataire (depuis son portail) ou par l'agence, avec catégorie (plomberie, électricité…), priorité (urgente, haute, moyenne, basse) et statut ; cycle de vie complet et historique des statuts.
- Photos et pièces jointes ; fil de discussion entre l'agence, le locataire et le propriétaire.
- Annuaire des prestataires et affectation des interventions.
- Notifications automatiques aux parties prenantes à chaque étape.
- Deux vues : « Tickets de l'agence » pour le gestionnaire et « Mes demandes » pour le demandeur.

### Communication : e-mail, WhatsApp, newsletter

- Notifications déclenchées par des événements métier : rappel d'échéance de loyer, confirmation de paiement reçu, ouverture d'un ticket, rappel de rendez-vous, bail arrivant à échéance, etc. Chaque événement peut déclencher un e-mail, un message WhatsApp ou les deux, avec copie possible à l'agence.
- Modèles de messages propres à l'agence (texte, variables, ton), modèles par défaut fournis.
- Relances planifiées : par exemple rappel des échéances quelques jours avant la date et alerte des baux qui se terminent dans les 30 jours.
- Préférences et consentement des destinataires : canaux acceptés, types de messages, plages horaires de silence ; un destinataire qui n'a pas consenti n'est pas contacté.
- WhatsApp : envoi via un fournisseur de messagerie (la documentation cite Twilio), messages groupés, invitation automatique d'un nouveau contact au groupe WhatsApp de l'agence, diffusion automatique d'une annonce au groupe lorsqu'un bien est publié.
- Newsletter : listes de diffusion, import de contacts par fichier CSV, modèles HTML avec variables, campagnes immédiates ou programmées, statistiques d'envoi, formulaire d'inscription public, double confirmation par e-mail et lien de désinscription dans chaque message.
- Historique de toutes les communications, filtrable par type, canal, statut, période et destinataire ; un message en échec affiche sa raison, un message planifié peut être annulé.
- Les SMS ne sont pas documentés comme canal de notification ; seul l'envoi du lien et du code de signature électronique par SMS est disponible.
- Facturation : les notifications e-mail ordinaires sont incluses ; l'usage de WhatsApp est facturé à la consommation (voir Tarification).

### Paiements Mobile Money : ce qui est établi

- Le Mobile Money est un moyen de paiement reconnu partout dans l'application : saisie d'un paiement avec l'opérateur (Orange Money, MTN Mobile Money, Moov Money, Wave), déclaration de paiement par le locataire sur son portail, validation par l'agence, suivi dans le tableau de bord (répartition par moyen de paiement).
- Charges de copropriété : le paiement en ligne par Mobile Money est disponible (packs Syndic et Opérateur intégré, sans commission ImmoTopia) : lien « Payer cet appel » envoyé par le gestionnaire ou accessible depuis le portail copropriétaire, rattachement automatique au bon lot, suivi des paiements et reversements vers la banque de la copropriété. Les opérateurs précis acceptés par ce parcours et les frais éventuels de l'opérateur de paiement ne sont pas documentés : ne pas les chiffrer.
- Loyers : l'enregistrement du paiement Mobile Money, la déclaration par le locataire et la validation par l'agence sont établis. Un paiement en ligne des loyers avec rapprochement automatique n'est pas décrit dans cette base : à confirmer avec l'équipe.
- Réponse recommandée à « Comment fonctionnent les paiements Mobile Money ? » : décrire l'enregistrement et la déclaration/validation pour les loyers, le paiement en ligne pour les charges de copropriété, et proposer une démonstration pour le reste.

### Comptabilité

- Copropriété : comptabilité complète en partie double (plan de comptes, journaux, écritures verrouillables, grand livre, balance), décrite dans les spécifications comme conforme OHADA.
- Gestion locative et comptabilité de l'agence : disponibles en production (confirmé par l'équipe le 16 octobre 2026). Écritures comptables de la gestion locative (loyers, honoraires, dépenses, reversements), passées automatiquement pour les biens gérés sous mandat (Agence, Opérateur intégré) comme pour les biens détenus en propre (packs Patrimoine), sur des comptes du plan SYSCOHADA paramétrables. Les paramètres financiers de l'agence (assujettissement et taux de TVA, comptes comptables de la gestion locative) sont disponibles en production. Consultation du journal, du grand livre et de la balance par période, avec export en CSV ou Excel pour le cabinet comptable (CSV au format Excel français : point-virgule, virgule décimale).
- ImmoTopia n'est pas documenté comme logiciel de comptabilité générale : bilan, compte de résultat, liasse fiscale, déclarations sociales et paie sont hors périmètre de la gestion financière décrite. Aucune certification « conforme SYSCOHADA » n'est documentée.

### Rôles, permissions, sécurité et audit

- Rôles au niveau de l'organisation : administrateur (tout, y compris la facturation), manager (gestion sauf facturation), agent (biens, visites, CRM), comptable (facturation et comptabilité). Les mêmes rôles sont disponibles pour toutes les organisations.
- Permissions fines par domaine, et réglage des menus visibles pour chaque rôle.
- Invitation des collaborateurs par e-mail, attribution d'un rôle, désactivation de l'accès lorsqu'une personne part.
- Connexion par e-mail et mot de passe ou via un compte Google ; vérification de l'adresse e-mail ; mot de passe oublié en autonomie.
- Sécurité décrite : mots de passe chiffrés, sessions à durée limitée et renouvelables, limitation des tentatives de connexion, contrôle d'accès par rôle, cloisonnement strict des données entre organisations.
- Journal d'audit : les actions sensibles sont enregistrées (qui, quoi, quand, sur quelle donnée), consultable en administration.

### Tableaux de bord et pilotage

Le tableau de bord d'accueil est conçu comme un poste de travail selon le rôle :

- Indicateurs de tête : impayés (montant et nombre d'échéances en retard), à encaisser sous 7 jours, encaissé du mois comparé à un objectif mensuel, biens (nombre, taux d'occupation, biens publiés), contacts et transactions suivies, tickets ouverts et déclarations à valider.
- « À traiter aujourd'hui » : une file de travail unique mêlant échéances en retard, tickets de maintenance et déclarations de paiement à valider.
- Analyses : trésorerie sur 12 mois (encaissé face à attendu), échéances par statut, moyens de paiement, parc par statut, types de biens, entonnoir commercial, contacts par catégorie, tickets par priorité, taux de recouvrement des appels de charges, programmes de travaux, activité récente.
- Tableaux de bord dédiés : CRM, patrimoine, chantiers, portails propriétaire et locataire.

Dans les écrans financiers, des encadrés expliquent pourquoi une règle existe (par exemple pourquoi une validation est définitive, ou pourquoi c'est la sortie de stock qui impute le chantier).

---

## Accès et utilisation

- ImmoTopia est une application web : on l'utilise depuis un navigateur, sans rien à installer, et elle est installable sur l'écran d'accueil du téléphone ou de l'ordinateur si on le souhaite.
- Connexion des clients existants : https://app.immotopia.cloud/login
- Utilisable sur ordinateur, tablette et téléphone mobile via le navigateur. L'interface mobile propose une barre d'onglets (Accueil, Biens, Baux, Encaisser, Plus). Il n'existe pas d'application mobile native documentée (ni sur l'App Store ni sur Google Play), mais ImmoTopia est installable sur l'écran d'accueil du téléphone comme une application (bouton « Installer l'application », sans magasin d'applications).
- Langues : interface en français, avec un sélecteur de langue permettant aussi l'anglais et l'arabe (l'arabe s'affiche de droite à gauche). Cet ajout date de septembre 2026 ; toute chaîne non traduite s'affiche en français.
- Une connexion Internet est nécessaire : le fonctionnement hors ligne n'est pas documenté.

---

## Tarification et règles de facturation

Les montants exacts des packs, capacités incluses, extensions et frais de mise en route figurent dans la grille tarifaire officielle fournie à l'assistant et sur https://immotopia.cloud/tarifs (avec un simulateur). Les règles ci-dessous viennent de la proposition de modèle économique du 23 septembre 2026.

### Principes

- Prix mensuels en FCFA, hors taxes applicables.
- Six packs : Agence, Syndic, Promoteur, Opérateur intégré, Patrimoine Essentiel et Patrimoine Pro (plus trois options payantes à la carte), chacun avec une capacité incluse (lots sous mandat ; copropriétés et lots ; chantiers et lots de programme ; biens détenus en propre) et une extension au-delà. Le dépassement est facturé, pas bloqué.
- Factures émises par Alliance Consultants, TVA de 18 % ajoutée aux prix hors taxes.
- Le mensuel est payé d'avance.
- Offre de lancement : le premier mois d'abonnement est offert sur tous les packs, sans engagement (résiliable à tout moment). La mise en route accompagnée, si elle est choisie, reste facturée.
- L'annuel payé d'avance coûte 11 mensualités, soit 12 mois pour le prix de 11 (environ 8,3 % de remise). Exemple : Agence à 29 900 FCFA par mois, soit 328 900 FCFA par an, hors mise en route et consommation.
- Packs combinables : un client qui fait à la fois de la gestion locative et du syndic achète les deux packs, avec 10 % de remise sur le prix de base du moins cher des deux packs, et conserve les capacités incluses de chaque pack.
- Au-delà des capacités (grand réseau), devis sur mesure avec périmètre, accompagnement et niveau de service écrits.

### Ce qui n'est pas facturé ou est facturé à part

- Les comptes des collaborateurs, des propriétaires et des locataires ne sont pas facturés.
- Aucune commission ImmoTopia sur les loyers, aucun prélèvement d'un pourcentage du prix de vente.
- Le socle et les notifications e-mail ordinaires sont inclus.
- WhatsApp est facturé à la consommation, quel que soit le pack (crédits prépayés ou consommation refacturée selon une grille en FCFA). Aucun « WhatsApp illimité » n'est inclus. La grille de consommation WhatsApp n'est pas encore publiée.
- Options payantes à la carte (montants dans la grille officielle) : Signatures électroniques (blocs de 50 signatures par mois, cumulables, avec tous les packs), Visio des assemblées (par cabinet, avec Syndic ou Opérateur intégré), Inventaire WhatsApp (blocs de 500 photos par mois, cumulables, avec Promoteur ou Opérateur intégré). Une option se souscrit en plus d'un pack et ne s'inclut dans aucun pack.
- Le paiement en ligne des charges et le prélèvement bancaire des loyers ne donnent lieu à aucune commission d'ImmoTopia.
- La mise en route accompagnée est facultative et facturée une fois (voir ci-dessous).

### Exemples de calcul (avant taxes et messages consommés, d'après la proposition commerciale)

- Agence avec 180 logements gérés : 29 900 + 80 × 150 = 41 900 FCFA par mois.
- Syndic avec 2 copropriétés et 140 lots : 49 900 + 40 × 150 = 55 900 FCFA par mois.
- Cabinet réunissant ces deux activités : 41 900 + 55 900 − 10 % × 29 900 (prix de base du pack le moins cher) = 94 810 FCFA par mois.

### Statut des prix

La proposition commerciale précise que ces prix sont des hypothèses en cours de validation auprès de clients à Abidjan, et non des tarifs définitifs. Toute estimation donnée par l'assistant est indicative ; le devis fait foi.

---

## Démarrage, mise en route et reprise de données

### Deux façons de démarrer

- Démarrage autonome : un client qui prépare et saisit lui-même ses données peut démarrer sans frais de prestation.
- Mise en route accompagnée (facultative, facturée une fois), avec un périmètre de référence par pack :
  - Agence : paramétrage, reprise préparée de 100 logements maximum, deux séances de formation ; 8 heures de prestation maximum.
  - Syndic : deux copropriétés, tantièmes et soldes d'ouverture fournis par le client, formation ; 12 heures maximum.
  - Promoteur : deux chantiers, nomenclature des coûts et des stocks, formation des équipes ; 20 heures maximum.
  - Opérateur intégré : trois métiers, plan de reprise et formations par rôle ; 30 heures maximum.
  - Patrimoine Essentiel (30 000 FCFA HT) et Patrimoine Pro (90 000 FCFA HT) : mise en route facultative ; le périmètre est précisé en démonstration.
- Les historiques complexes, les données à nettoyer et les intégrations spécifiques font l'objet d'un devis distinct.

### Reprise de données : ce qui est documenté

- Finance : assistant d'importation d'un fichier Excel (.xlsx) pour reprendre des pièces (factures fournisseurs, règlements, pièces de caisse), avec correspondance des colonnes et aperçu ; les pièces arrivent en brouillon.
- Newsletter : import de contacts par fichier CSV.
- Syndic : création des lots à partir des biens déjà saisis dans l'application.
- La reprise automatique d'un portefeuille complet (biens, baux, locataires, soldes) ou de comptes antérieurs depuis un autre logiciel n'est pas documentée : selon la proposition commerciale, elle ne doit être annoncée que pour les formats effectivement pris en charge. Il faut renvoyer vers l'équipe pour évaluer le cas du prospect.

### Étapes pratiques côté client (d'après le fonctionnement de l'application)

- Création de l'espace de l'organisation et activation des modules correspondant au pack.
- Paramétrage de l'agence (identité, coordonnées), invitation des collaborateurs et attribution des rôles.
- Téléversement des modèles de documents (bail, quittance, reçu…) et configuration des notifications.
- Saisie ou reprise des biens, contacts, baux ou copropriétés, puis ouverture des portails aux propriétaires et locataires si souhaité.

---

## Outils gratuits du site

Le site propose huit outils gratuits, utilisables sans inscription. Ils sont indicatifs et ne remplacent pas un conseil juridique ou fiscal.

- Générateur de quittance de loyer : https://immotopia.cloud/outils/quittance-de-loyer — une quittance en PDF, montant en lettres inclus ; rien n'est enregistré.
- Modèle de bail d'habitation (Côte d'Ivoire) : https://immotopia.cloud/outils/bail-habitation — contrat de bail à usage d'habitation inspiré du Code de la construction et de l'habitat ivoirien, téléchargeable en PDF.
- Modèle de bail commercial (OHADA) : https://immotopia.cloud/outils/bail-commercial — bail à usage professionnel fondé sur l'Acte uniforme OHADA relatif au droit commercial général, en PDF.
- Modèle d'état des lieux (entrée et sortie) : https://immotopia.cloud/outils/etat-des-lieux — un modèle PDF à imprimer et à remplir sur place (pièces, éléments et état, compteurs, clés, observations, signatures). L'application ImmoTopia, elle, permet de faire l'état des lieux sur téléphone avec photos par pièce, signature électronique et PDF.
- Calculateur de caution et d'avance : https://immotopia.cloud/outils/caution-et-avance — dépôt de garantie, avance sur loyer et frais d'agence à l'entrée dans un logement, avec les plafonds légaux ivoiriens.
- Calculateur de rendement locatif : https://immotopia.cloud/outils/rendement-locatif — rendement brut, rendement net et cash-flow mensuel à partir du prix, des frais, travaux, loyer, charges, impôt foncier et vacance locative.
- Calculateur de commission d'agence : https://immotopia.cloud/outils/commission-agence — commission de gestion HT, TVA et net reversé au propriétaire.
- Répartition des charges de copropriété : https://immotopia.cloud/outils/repartition-charges-copropriete — quote-part annuelle, trimestrielle et mensuelle de chaque lot selon ses tantièmes.

La liste de tous les outils est sur https://immotopia.cloud/outils. Ces outils sont des aides en ligne du site ; ils ne sont pas l'application ImmoTopia elle-même.

---

## Alliance Consultants

### Qui ils sont

- Alliance Consultants est l'éditeur d'ImmoTopia. Elle se présente comme un éditeur et intégrateur africain de solutions SaaS, d'intelligence artificielle et de logiciels métiers pour les organisations d'Afrique francophone.
- Fondée en 2003 à Abidjan, Côte d'Ivoire. Interventions déclarées dans toute l'Afrique francophone.
- Site : https://allianceconsultants.net

### Historique indiqué sur son site

- 2003 : création à Abidjan.
- 2008 : premier produit SaaS, DocuPro (gestion électronique de documents), devenu DocuPro Suite.
- 2015 : pôle dématérialisation et scanners.
- 2020 : extension à la santé (MedicPro, CliniquePro) et à l'immobilier (ImmoTopia.cloud).
- 2024 : practice dédiée à l'IA générative et à l'automatisation.
- 2026 : École Digitale et ouverture régionale.

### Solutions éditées

- DocuPro Suite : gestion électronique des documents (GED) pour organiser, indexer et retrouver les archives.
- MedicPro : gestion réglementaire pharmaceutique (autorisations de mise sur le marché, visas, produits, grossistes, stocks, ventes).
- CliniquePro : gestion de clinique ophtalmologique (patients, rendez-vous, consultations, examens, assurances, facturation).
- ImmoTopia : gestion immobilière.
- Immo-Annonces.fr (aussi appelé Annonces Web) : portail d'annonces immobilières pour la Côte d'Ivoire, conçu d'abord pour le mobile (publication, recherche géolocalisée, mise en relation). Son site le présente comme plus adapté qu'ImmoTopia si le besoin principal est la diffusion grand public d'annonces.
- École Digitale : plateforme de gestion scolaire (administration académique, enseignants, étudiants, parents, emplois du temps, paiements de scolarité).

Le site d'Alliance Consultants indique aussi que DocuPro Suite peut compléter ImmoTopia pour structurer les archives et dossiers documentaires d'une agence.

### Services

- Développement spécifique et SaaS métier (web, mobile, API, SaaS multi-organisations).
- Automatisation des processus métiers par l'IA (n8n, API, modèles de langage, chatbots métiers).
- Assistance à maîtrise d'ouvrage (cahiers des charges, pilotage des prestataires, recette, conduite du changement).
- Dématérialisation des archives (numérisation, indexation, archivage).
- Vente et intégration de scanners professionnels.

### Formations

Formations en présentiel, à distance ou en intra-entreprise : IA pour les entreprises, développement web et IA (.NET / React), automatisation des processus avec n8n et IA, SQL Server, GED et archivage numérique, gestion de projet digital et agile. Catalogue : https://allianceconsultants.net/formations

### Références

Le site d'Alliance Consultants publie des références de projets (GED, archivage, AMOA, audits, CRM…) sur https://allianceconsultants.net/references. Ce sont des références de la société sur d'autres projets, pas des clients d'ImmoTopia. Aucune référence client d'ImmoTopia n'est publiée dans les sources.

### Contact Alliance Consultants

- Page contact et démo : https://allianceconsultants.net/contact-demo (réponse annoncée sous 24 à 48 heures ouvrées).
- Téléphones indiqués sur le site d'Alliance Consultants : +225 01 01 51 01 36 et +225 07 07 66 41 05 (WhatsApp : +225 07 07 66 41 05).
- Horaires indiqués : du lundi au vendredi, de 8 h à 18 h (GMT).
- Adresse : Abidjan, Côte d'Ivoire (aucune adresse postale détaillée n'est publiée dans les sources).

---

## Contact et démonstration ImmoTopia

- Réserver une démonstration : https://immotopia.cloud/contact (calendrier en ligne) ou directement https://calendly.com/immotopia. La démonstration dure environ 30 minutes, montre ImmoTopia appliqué au portefeuille du prospect, et se fait sans engagement.
- Téléphone : +225 01 01 51 01 36
- WhatsApp : https://wa.me/2250101510136
- E-mail : support@immotopia.cloud
- Localisation de l'équipe : Abidjan, Côte d'Ivoire.
- Clients existants : connexion sur https://app.immotopia.cloud/login
- Tarifs et simulateur : https://immotopia.cloud/tarifs

Pour un devis précis (volumes, combinaison de packs, reprise de données), orienter vers la démonstration ou l'équipe : la proposition commerciale prévoit un devis avec volumes et frais de mise en route.

---

## Fonctions en cours de développement

Les éléments suivants sont en cours de développement ou d'intégration. Les fonctions de gestion locative confirmées disponibles le 13 octobre 2026 (renouvellement, avenant et résiliation du bail, honoraires à trois niveaux, compte courant du propriétaire, reversements) et le 16 octobre 2026 (révision du loyer, solde de tout compte et historique du bail, comptabilité de l'agence et export comptable, paramètres financiers de l'agence) n'y figurent plus. On peut présenter ces éléments, en disant qu'ils sont en cours de développement ou de déploiement, sans date, et que l'équipe confirmera leur disponibilité en démonstration.

- Gestion locative approfondie :
  - Commissions des agents par mois.
  - Relevé de gérance distinguant l'appelé, l'encaissé, l'impayé, les honoraires, la TVA et les dépenses, avec le net à reverser.
- Notifications internes à l'application (avec compteur de non-lus) et messagerie directe entre l'agence, les propriétaires, les locataires et les contacts : spécifiées, pas encore disponibles en production.

---

## Guides pratiques

Le site publie des guides pratiques en français sur https://immotopia.cloud/guides, à proposer au visiteur qui compare ou qui hésite :

- Comment choisir son CRM immobilier (dix critères, agence ou promoteur, tableau de critères) : https://immotopia.cloud/guides/crm-immobilier-bonnes-pratiques
- Relances en CRM immobilier (fréquence, messages, WhatsApp) : https://immotopia.cloud/guides/crm-immobilier-relances
- Logiciel d'état des lieux, critères de choix (mobile, photos, signature électronique, PDF, comparaison entrée / sortie) : https://immotopia.cloud/guides/logiciel-etat-des-lieux-comparatif
- Bail commercial OHADA en Côte d'Ivoire (clauses, délais, étapes, modèle PDF) : https://immotopia.cloud/guides/bail-commercial-ohada-cote-divoire. Ce guide est informatif : toujours rappeler qu'un contrat se fait valider par un avocat ou un notaire.

---

## Wiki des fonctionnalités

Le site publie un wiki des fonctionnalités sur https://immotopia.cloud/wiki (en français) : une page par domaine (gestion locative, biens et patrimoine, CRM et ventes, syndic, portails clients, maintenance, communication et documents, finance et comptabilité, promotion et chantiers, agence et abonnement) et une page par fonctionnalité, qui détaille chaque action, les packs qui y donnent accès, les profils concernés et le statut (disponible ou en cours de déploiement).

- Quand un visiteur demande le détail d'une fonction (« comment se fait un appel de charges ? », « que voit le locataire ? »), répondre à partir de cette base, puis renvoyer vers https://immotopia.cloud/wiki pour le détail action par action.
- Le statut affiché par le wiki suit la section « Disponibilité » ci-dessus.

---

## Pages CRM du site

- https://immotopia.cloud/crm-immobilier-cote-divoire : le logiciel CRM immobilier pour agences et promoteurs (contacts, pipeline, rapprochement, mandats, offres et compromis de vente sous mandat, relances et notifications e-mail / WhatsApp, tableau comparatif avec Excel et un CRM généraliste, FAQ).
- https://immotopia.cloud/crm-promoteur-immobilier-cote-divoire : le CRM pour promoteur immobilier (prospects, contacts, pipeline, visites, relances, puis lots, coût de revient, budget, avancement, tableau de bord de chantier). Renvoyer vers ces pages quand un visiteur demande un CRM, en rappelant les limites de la section « Limites » (pas d'offre ni de compromis pour la vente des lots d'un promoteur).
- L'ancienne adresse /fonctionnalites/crm-immobilier redirige vers la page du CRM pour promoteur.

---

## Comparatif avec d'autres logiciels

Le site publie un comparatif sur https://immotopia.cloud/comparatif : ImmoTopia face à ChezvousBO, Logestimmo et WIMMO, sur une centaine de fonctionnalités réparties en domaines (socle, pilotage, biens et commercial, gestion locative, portails, finance et documents, syndic, chantiers et BTP, patrimoine, communication, intégrations). Pour les concurrents, il ne reprend que ce qu'ils annoncent sur leurs pages publiques, consultées le 23 septembre 2026, avec les sources.

- Quand un visiteur demande une comparaison, renvoyer vers cette page, au besoin vers la section du domaine concerné (par exemple https://immotopia.cloud/comparatif#syndic).
- « Non documenté » signifie que rien n'a été trouvé dans les pages publiques de l'éditeur, pas que la fonction est absente. Ne jamais dénigrer un concurrent ni affirmer qu'il ne sait pas faire quelque chose.
- Certaines fonctions d'ImmoTopia du comparatif sont en cours de développement : le préciser si le visiteur demande leur disponibilité immédiate.

---

## Limites connues et points à ne pas promettre

### Signalés explicitement par la documentation

- Vente des lots d'un promoteur (pack Promoteur et Opérateur intégré) : pas d'offre, de compromis, de condition suspensive ni d'échéancier de l'acquéreur pour ces ventes ; pas de réservation de lots ni de portail acquéreur. Ce parcours (offre, compromis, échéancier de l'acquéreur) existe seulement pour une vente sous mandat d'agence, pour le compte d'un propriétaire. Le CRM d'un promoteur couvre prospects, contacts, pipeline, visites, relances, rapprochement et tableaux de bord. Ne pas promettre le reste.
- Finance opérationnelle (fournisseurs, pièces de caisse, dépenses, file de validation, balances) et module Promoteur (chantiers, stock, personnel, tâcherons, baux de terrain) : disponibles en production (confirmé par l'équipe le 13 octobre 2026). Ne rien promettre au-delà de ce qui est décrit : pas de clôture physique de caisse par caissier.
- Prix : hypothèses en cours de validation auprès de clients, pas des tarifs définitifs. Le montant d'environ 400 000 FCFA par mois évoqué pour un grand opérateur est un ordre de grandeur interne, pas un prix à annoncer.
- Grille de consommation WhatsApp : non publiée ; aucun WhatsApp illimité.
- Reprise automatique de données depuis un autre logiciel : à annoncer uniquement pour les formats effectivement pris en charge (non listés dans les sources).

### Fonctions non établies (ne pas affirmer)

Le site immotopia.cloud contient des accroches commerciales qui vont plus loin que la documentation de l'application. Tant que l'équipe ne l'a pas confirmé, l'assistant ne doit pas affirmer :

- Pour les loyers, un paiement en ligne Mobile Money (Wave, CinetPay, Orange Money, MTN MoMo) avec confirmation par l'opérateur et rapprochement automatique « en temps réel » : seuls l'enregistrement des paiements et la déclaration / validation par le locataire sont établis. Pour les charges de copropriété, le paiement en ligne existe (lien « Payer cet appel », portail).
- La génération et l'envoi automatiques d'une quittance à chaque paiement Mobile Money.
- La conformité ou la certification SYSCOHADA des exports, ou des « comptes certifiés ». La comptabilité de copropriété en partie double et la comptabilité de l'agence avec ses exports (CSV, Excel) sont disponibles, mais aucune certification n'est documentée.
- La séparation comptable des fonds de tiers (fonds des propriétaires) et de la trésorerie de l'agence : en cours de développement, non confirmée en production.
- La clôture physique de caisse par caissier (montant attendu, compté, écart) : non décrite. Les pièces de caisse et la file de validation existent.
- Le calcul automatique des commissions et du partage agence / agents / apporteurs d'affaires, et le net à reverser calculé dans le relevé de gérance : en cours de développement. Le compte courant du propriétaire et les reversements, eux, sont disponibles.
- La signature électronique est une option payante (« Signatures électroniques », blocs de 50 signatures par mois) : ne jamais dire qu'elle est incluse dans un pack. Elle couvre le bail, l'état des lieux, les mandats et le compromis de vente (ce dernier exige un prestataire de signature qualifié en service pour l'agence ; ne nommer aucun fournisseur).
- Une API ouverte et des webhooks à disposition des clients : seule une interface publique de publication des annonces (pour un site vitrine) et la réception des messages WhatsApp entrants sont documentées.
- Des SMS automatiques de relance ou de notification : non documentés (e-mail et WhatsApp le sont). Seul l'envoi du lien et du code de signature par SMS est disponible.
- Un site vitrine fourni à l'agence ou la diffusion automatique vers des portails d'annonces : non documentés.
- Un fonctionnement hors ligne ou une installation locale : non documentés.
- Une application mobile native des magasins d'applications : non documentée (application web installable sur l'écran d'accueil du téléphone).
- Une « automatisation par IA » au-delà d'ImmoCopilot (tri des e-mails, suggestions automatiques) : non documentée. L'assistant immotopIA du site n'est pas une fonction de l'application : l'assistant de l'application s'appelle ImmoCopilot (voir « ImmoCopilot, l'assistant IA de l'application »).
- Un portail de réservation ou de commercialisation pour les acquéreurs d'un programme : non documenté.

### Informations absentes des sources (répondre qu'elles ne sont pas disponibles et orienter vers l'équipe)

- Hébergement de l'application : pays et centre de données, fournisseur, sauvegardes, plan de reprise. Le site d'Alliance Consultants parle d'« hébergement souverain » sans détail ; ne pas préciser davantage. L'hébergeur cité dans les mentions légales du site immotopia.cloud concerne le site vitrine, pas nécessairement l'application.
- Engagements de service (SLA), taux de disponibilité, délais de support, canaux et horaires du support ImmoTopia. Seuls les horaires affichés par Alliance Consultants (lundi à vendredi, 8 h - 18 h GMT) et un délai de réponse de 24 à 48 heures ouvrées pour les demandes de démonstration sont publiés.
- Certifications (ISO, sécurité, conformité SYSCOHADA), agréments, conformité légale détaillée (protection des données personnelles en Côte d'Ivoire).
- Références clients, nombre d'utilisateurs, témoignages, statistiques de résultats (par exemple « +40 % de productivité ») : aucune donnée vérifiée ; ne rien citer.
- Au-delà du premier mois offert et de l'absence d'engagement : préavis exact de résiliation et modalités de remboursement ne sont pas détaillés ; renvoyer vers l'équipe pour ces points. Ne pas mentionner les anciennes formules Basic, Pro et Elite.
- Montant ou taux des taxes applicables (TVA) sur l'abonnement : les prix sont hors taxes, le taux n'est pas précisé.
- Moyens de paiement de l'abonnement ImmoTopia lui-même (virement, Mobile Money…) : non précisés.
- Intégrations avec des logiciels comptables, bancaires ou autres logiciels immobiliers : non documentées.
- Export complet des données ou réversibilité en fin de contrat : non documentés.
- Nombre maximal d'utilisateurs : les comptes collaborateurs ne sont pas facturés ; aucune limite n'est documentée.

---

## Questions fréquentes

**Qu'est-ce qu'ImmoTopia ?**
Un logiciel de gestion immobilière en ligne (ERP en abonnement) pour les professionnels en Côte d'Ivoire : gestion locative et transaction, syndic de copropriété, promotion immobilière et chantiers, avec CRM, finance opérationnelle, patrimoine, documents, portails propriétaire et locataire, maintenance et communication e-mail / WhatsApp.

**À qui s'adresse ImmoTopia ?**
Aux agences immobilières, gestionnaires locatifs, cabinets de syndic, promoteurs et groupes qui cumulent ces métiers. Les propriétaires et locataires de ces clients accèdent gratuitement à leurs portails.

**Qui édite ImmoTopia ?**
Alliance Consultants, éditeur de logiciels basé à Abidjan depuis 2003 (https://allianceconsultants.net).

**Faut-il installer quelque chose ?**
Non. C'est une application web accessible depuis un navigateur, sur ordinateur, tablette ou mobile. Les clients se connectent sur https://app.immotopia.cloud/login.

**Existe-t-il une application mobile ?**
Il n'existe pas d'application native documentée dans les magasins d'applications. L'application web s'utilise sur téléphone, avec une barre d'onglets mobile (Accueil, Biens, Baux, Encaisser, Plus), et s'installe sur l'écran d'accueil comme une application (bouton « Installer l'application »). Une connexion Internet est nécessaire.

**Combien coûte ImmoTopia ?**
Six packs mensuels en FCFA hors taxes (Agence, Syndic, Promoteur, Opérateur intégré, Patrimoine Essentiel, Patrimoine Pro), avec capacité incluse et extensions. Voir la grille officielle et le simulateur sur https://immotopia.cloud/tarifs. Les prix sont en cours de validation ; le devis fait foi.

**Y a-t-il une réduction en paiement annuel ?**
Oui : l'annuel payé d'avance coûte 11 mensualités, soit 12 mois pour le prix de 11.

**Je fais de la gestion locative et du syndic : dois-je payer deux fois plein tarif ?**
Non. Les packs se combinent avec 10 % de remise sur le prix de base du moins cher des deux. Avec les trois métiers, on compare au pack Opérateur intégré et on retient le moins cher.

**ImmoTopia prend-il une commission sur les loyers ?**
Non. Aucune commission sur les loyers ni pourcentage sur les ventes.

**Les comptes de mes collaborateurs, propriétaires et locataires sont-ils payants ?**
Non, ils ne sont pas facturés.

**WhatsApp est-il inclus ?**
Les notifications e-mail ordinaires sont incluses. WhatsApp est facturé à la consommation (crédits prépayés ou refacturation selon une grille en FCFA), quel que soit le pack ; il n'y a pas de WhatsApp illimité.

**La mise en route est-elle obligatoire ?**
Non. Un client qui prépare et saisit lui-même ses données démarre sans frais de prestation. Une mise en route accompagnée (paramétrage, reprise préparée, formation) est proposée en option, avec un forfait par pack.

**Pouvez-vous reprendre mes données Excel ou de mon ancien logiciel ?**
La mise en route accompagnée inclut une reprise préparée dans un périmètre défini (par exemple 100 logements pour le pack Agence). L'application sait importer des pièces financières depuis un fichier Excel et des contacts de newsletter en CSV. Pour un historique complexe ou un autre logiciel, l'équipe étudie le cas et établit un devis.

**Comment fonctionnent les paiements Mobile Money ?**
Chaque paiement peut être enregistré avec le moyen « Mobile Money » et l'opérateur (Orange Money, MTN Mobile Money, Moov Money, Wave). Le locataire peut aussi déclarer son paiement depuis son portail, et l'agence le valide ; le tableau de bord suit les encaissements par moyen de paiement. Pour les charges de copropriété, le copropriétaire peut payer en ligne par Mobile Money (lien « Payer cet appel » ou portail), sans commission ImmoTopia ; pour les loyers, le paiement en ligne avec rapprochement automatique est à confirmer avec l'équipe lors d'une démonstration.

**Mes locataires peuvent-ils voir leurs paiements et documents ?**
Oui. Le portail locataire affiche le bail, les échéances, le solde, l'historique des paiements, le dépôt de garantie et les documents (contrat, quittances, reçus). Le locataire peut aussi déclarer un paiement et ouvrir un ticket de maintenance avec photos.

**Et mes propriétaires ?**
Le portail propriétaire montre leurs biens, baux, échéances, paiements encaissés, revenus avec graphiques, dépôts détenus, tickets en cours, documents et rapports. L'agence peut aussi leur envoyer des relevés de gérance.

**Puis-je utiliser mes propres modèles de bail et de quittance ?**
Oui. L'agence téléverse ses modèles Word avec ses variables (nom de l'agence, loyer, locataire…) ; les documents sont générés automatiquement et numérotés en continu.

**Le module syndic gère-t-il les assemblées générales ?**
Oui : ordre du jour, résolutions, votes et pouvoirs par lot, calcul du quorum et compte rendu archivé, avec une assemblée en direct (émargement et vote en ligne par lien personnel, incluse dans le pack Syndic) ; la visio est une option payante. S'ajoutent des tantièmes, budgets, appels de charges, relances et de la comptabilité de copropriété.

**Peut-on signer les baux et les mandats électroniquement ?**
Oui : bail, état des lieux et mandats s'envoient à signer à distance, avec un écran de suivi et des rappels. C'est une option payante (« Signatures électroniques », blocs de 50 signatures par mois, avec tous les packs) ; aucune signature n'est incluse dans un pack. Voir la grille tarifaire pour le prix.

**Peut-on prélever les loyers sur le compte bancaire du locataire ?**
Oui : le prélèvement bancaire des loyers est inclus dans la gestion locative (Agence, Opérateur intégré, Patrimoine Essentiel et Pro), sans commission ImmoTopia. ImmoTopia gère les mandats, prépare la remise, prévient les locataires (prénotification) et produit le fichier à déposer à la banque de l'agence ; il ne débite pas lui-même les comptes, et le retour de la banque n'est pas livré.

**Peut-on tenir l'assemblée générale en visioconférence ?**
Oui, avec l'option payante « Visio des assemblées » (salle de visio, discussion modérée, enregistrement), pour Syndic ou Opérateur intégré. L'assemblée en direct avec vote en ligne est, elle, incluse dans ces packs.

**Les copropriétaires peuvent-ils payer leurs charges en ligne ?**
Oui, par Mobile Money, via le lien « Payer cet appel » ou le portail copropriétaire, sans commission ImmoTopia (packs Syndic et Opérateur intégré).

**Peut-on faire l'inventaire d'un chantier par WhatsApp ?**
Oui, avec l'option payante « Inventaire WhatsApp » (blocs de 500 photos par mois, avec Promoteur ou Opérateur intégré) : le chef de chantier envoie la photo d'un article et l'IA propose l'article et le total.

**Peut-on exporter les tableaux ?**
Oui : tous les tableaux s'exportent en Excel, CSV ou PDF, pour tous les packs.

**ImmoTopia fait-il la comptabilité ?**
La comptabilité de copropriété (partie double, journaux, grand livre, balance) est intégrée au module Syndic. Pour la gestion locative, la comptabilité de l'agence (écritures, journal, grand livre, balance) et son export en CSV ou Excel pour le cabinet comptable sont disponibles ; elle couvre les biens gérés sous mandat (loyers, honoraires, dépenses, reversements) comme les biens détenus en propre, avec des paramètres financiers de l'agence (assujettissement et taux de TVA, comptes comptables). ImmoTopia n'est pas présenté comme un logiciel de comptabilité générale (bilan, liasse fiscale, paie).

**Est-ce conforme SYSCOHADA ?**
Aucune certification n'est documentée. La comptabilité de copropriété est décrite comme conforme OHADA dans les spécifications, et la comptabilité de l'agence utilise des comptes du plan SYSCOHADA paramétrables. Pour un besoin de conformité précis, voir avec l'équipe.

**Peut-on suivre un chantier de construction ?**
Oui, avec le pack Promoteur ou Opérateur intégré : budgets et avenants, coûts réels calculés à partir des factures, salaires, caisse et sorties de stock, bons de commande, avancement, alertes de dépassement, lots et coût de revient, clôture et bascule des lots au patrimoine.

**Peut-on gérer la vente des appartements d'un programme jusqu'à l'acte ?**
Le suivi commercial des acquéreurs (prospects, contacts, pipeline, visites, relances, rapprochement) se fait dans le CRM. En revanche, il n'y a ni offre, ni compromis, ni échéancier de l'acquéreur pour la vente des lots d'un promoteur : ce parcours existe pour une vente sous mandat d'agence, pour le compte d'un propriétaire. Il n'y a pas non plus de réservation de lots ni de portail acquéreur.

**Peut-on gérer les calculs de commission et les reversements aux propriétaires ?**
Des relevés de gérance existent. Les honoraires de gestion à trois niveaux (le bail l'emporte sur le propriétaire, qui l'emporte sur l'agence ; pourcentage ou forfait), le compte courant du propriétaire et les reversements aux propriétaires sont disponibles. Les commissions des agents et l'évolution du relevé de gérance (net à reverser) sont en cours de développement : l'équipe confirmera leur disponibilité.

**Peut-on publier nos biens sur notre site internet ?**
Les annonces peuvent être publiées ou retirées depuis ImmoTopia, et une interface publique permet d'alimenter le site vitrine de l'agence. ImmoTopia ne fournit pas de site vitrine clé en main d'après la documentation. Pour une diffusion grand public, Alliance Consultants édite aussi le portail Immo-Annonces.fr.

**Qui peut accéder à quoi dans mon équipe ?**
Des rôles (administrateur, manager, agent, comptable) avec des permissions fines et des menus visibles réglables par rôle. On invite un collaborateur par e-mail et on désactive son accès quand il part. Les actions sensibles sont inscrites dans un journal d'audit.

**Mes données sont-elles séparées de celles des autres agences ?**
Oui : chaque organisation a son propre espace et les données sont strictement cloisonnées. Pour les détails d'hébergement et de sauvegarde, il faut interroger l'équipe : ils ne sont pas publiés.

**L'application est-elle en français ?**
Oui, le français est la langue de référence. Un sélecteur permet aussi l'anglais et l'arabe.

**Y a-t-il une période d'essai gratuite ?**
Oui : le premier mois d'abonnement est offert sur tous les packs, sans engagement. La démonstration de 30 minutes est également gratuite. La mise en route accompagnée, si elle est choisie, reste facturée.

**Avez-vous des clients ou des références ?**
Aucune référence client d'ImmoTopia n'est publiée. Le mieux est de demander une démonstration sur un dossier réel.

**Les outils gratuits du site sont-ils vraiment gratuits ?**
Oui : quittance de loyer, modèles de bail d'habitation, de bail commercial et d'état des lieux, calculateurs de caution, de rendement, de commission d'agence et de répartition des charges de copropriété, sans inscription, sur https://immotopia.cloud/outils. Ils sont indicatifs et ne constituent pas un conseil juridique.

**Comment réserver une démonstration ?**
Sur https://immotopia.cloud/contact ou https://calendly.com/immotopia (30 minutes, sans engagement), par téléphone au +225 01 01 51 01 36, par WhatsApp (https://wa.me/2250101510136) ou par e-mail à support@immotopia.cloud.

**Je suis déjà client et j'ai un problème de connexion.**
La connexion se fait sur https://app.immotopia.cloud/login, avec la fonction « mot de passe oublié » si besoin. Pour tout autre problème de compte, contacter l'équipe par WhatsApp ou par e-mail.
