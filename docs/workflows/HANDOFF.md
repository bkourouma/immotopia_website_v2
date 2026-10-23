# Passation de session — site

Carnet de reprise entre sessions d'agents. **Lire en premier** en début de
session ; **mettre à jour sans l'annoncer** avant de conclure tout tour en
plusieurs étapes (règle posée dans AGENTS.md et CLAUDE.md).

## Mode d'emploi

- Une section par branche, la plus récente en haut. Réécrire la section de sa
  branche au lieu d'empiler des entrées : ce fichier décrit l'état présent, pas
  l'historique (l'historique, c'est `git log`).
- Supprimer la section d'une branche une fois fusionnée dans
  `main`.
- Dates absolues (`AAAA-MM-JJ`), jamais « hier ».
- Chaque worktree a sa copie : en cas de conflit à la fusion, garder les deux
  sections de branche, elles sont indépendantes.
- Le suivi anomalie par anomalie vit dans le bus d'agents (`.agent-bus/`), pas
  ici.
- Pas de secret, pas de donnée personnelle, pas de contenu de `.env`.

Modèle de section :

```markdown
## Branche `type/sujet` — AAAA-MM-JJ

**État :** en cours | prêt à relire | bloqué
**Dernier commit :** `abc1234` résumé

Fait :

- …

Reste à faire :

- …

Pièges et décisions :

- …
```

---

## Branche `seo/ga4-consentement` — 2026-10-23

**État :** prêt à relire (non commité)

Fait :

- Google Analytics 4 avec bandeau de consentement FR/EN (`src/components/consent/`, `src/lib/consent.ts`, `src/lib/ga.ts`). Identifiant de mesure `G-W0VCK0DK70`. Aucun appel à Google ni cookie `_ga` avant « Accepter » ; chargé seulement en production, sur `immotopia.cloud` et `www.immotopia.cloud` (jamais sur l'application ni un autre sous-domaine). Umami inchangé.
- Choix mémorisé 182 jours (clé `im_consent`), bouton « Gérer mes cookies » / « Manage cookies » dans le pied de page, retrait = drapeau `ga-disable-<ID>` + effacement des cookies `_ga*`, `_gid`, `_gat*`.
- Politique de confidentialité FR et EN mise à jour (Google Ireland Limited, cookies de 13 mois, destinataires), date 23 octobre 2026.
- `npm test` ajouté (`node --test`, 29 tests) et étape CI correspondante.

Reste à faire :

- Après déploiement : ouvrir le site en navigation privée, vérifier dans l'onglet Réseau qu'aucune requête vers googletagmanager.com ni cookie `_ga` n'existe avant « Accepter », puis qu'ils apparaissent après, et disparaissent après retrait via « Gérer mes cookies » ; contrôler le temps réel dans GA4. Vérifier l'affichage à 375 px.
- Faire valider le rôle de Google (sous-traitant ou non) dans la politique.

Pièges et décisions :

- Libellé EN du refus : « Decline » (choix prudent).

---

## Branche `claude/beautiful-volta-r4u2ul` — 2026-10-18

**État :** prêt à relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- Nouveautés de l'application `bkourouma/immotopia` du 2026-10-02 au 2026-10-17 reportées dans le wiki. Source : classeur `docs/fonctionnalites/ImmoTopia_Wiki_Fonctionnalites.xlsx` (849 → 1046 lignes). Wiki daté du 2026-10-18.
- 10 nouvelles fiches : signature électronique, prélèvement bancaire, visio des assemblées, paiement en ligne des charges, AG par lien personnel, paiement d'un appel de charges, inventaire par WhatsApp, export des tableaux, documents à en-tête, application installable.
- Actions ajoutées aux fiches existantes : AG en direct, stock de chantier, ImmoCopilot, mandats, compromis, états des lieux, portail copropriétaire.
- Facturation décidée par l'utilisateur le 2026-10-18 :
  - Signatures électroniques : extension par bloc de 50 par mois, 5 000 FCFA HT, tous les packs. Aucune signature incluse.
  - Visio des assemblées : 10 000 FCFA HT par mois et par cabinet, Syndic ou Intégré.
  - Inventaire WhatsApp : bloc de 500 photos, 25 000 FCFA HT par mois, Promoteur ou Intégré.
  - Inclus sans commission : paiement en ligne des charges et prélèvement bancaire.
  - Inclus : export, application installable, documents à en-tête, AG en direct, contrôle du stock.
- Toutes les nouveautés affichées « disponible », ImmoCopilot compris (décision de l'utilisateur).
- Tarifs, accueil, écosystème, pages thématiques, FAQ et assistant immotopIA (`knowledge.md`, `prompt.ts`) alignés.
- Page `/versions` : version 2.0.0 datée du 2026-10-17.
- Vérifications : `tsc`, `lint`, `check-comparatif-en` et `npm run build` OK. Pas de tests automatisés.

Reste à faire :

- Aligner le catalogue de l'application (`packages/api/src/lib/subscription/catalog.ts`, dépôt `bkourouma/immotopia`). Il porte encore des quotas de signatures inclus provisoires (Agence 20, Syndic 50, Promoteur 20, Intégré 100), un bloc de 50 sans prix et non vendable, et pas d'extension Visio des assemblées. Ce dépôt n'est pas modifiable depuis cette session.
- Créer le tag `v2.0.0` côté application, comme pour les versions précédentes.
- Paiement de loyer par lien (`portails-clients/paiement-loyer-par-lien`, `portail-locataire`) : encore en « déploiement », non traité.
- Points non bloquants relevés en relecture :
  - 14 résumés (summary) hors de la plage 140-160 caractères, dans des fiches non touchées.
  - Packs d'ImmoCopilot : 6 dans le wiki, 4 dans le classeur, à confirmer.
  - « courriers » dans la fiche documents-a-en-tete : la source cite avis, convocations, quittances et comptes rendus.

Pièges et décisions :

- Chantier orchestré (skill chef-orchestre) : lots dans des copies de travail locales, fusionnés dans la branche avec `--no-ff`.
- `package.json` et `package-lock.json` modifiés par l'installation de l'environnement cloud. Marqués `assume-unchanged` en local. Jamais commités.
- Le wiki ne cite aucun prix : il renvoie vers /tarifs. `pricing.ts` reste la source.

---

## Branche `claude/stoic-goldberg-jrcsmh` — 2026-10-18

**État :** prêt à relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- Skill `chef-orchestre` installé au niveau projet (`.claude/skills/chef-orchestre/`) avec ses cinq agents (`.claude/agents/` : `chef-de-lot`, `executant`, `executant-rapide`, `expert`, `verificateur`), copiés tels quels depuis l'archive fournie par l'utilisateur.

Pièges et décisions :

- Installé dans le dépôt plutôt que dans `~/.claude` (prévu par `installer.ps1`) : les sessions cloud sont éphémères.
- Écarts du skill avec AGENTS.md, qui prime : il copie les fichiers `.env` dans les worktrees (interdit sans « oui » explicite), suppose `gh` (absent en session cloud : passer par les outils GitHub MCP) et nomme ses branches `orch/…`.

---

## Branche `claude/admiring-fermat-b2y2rr` — 2026-10-15

**État :** prêt à relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- Page bilingue `/versions` (historique des versions de l'application), données dans `src/lib/releases.ts`, ajoutée au sitemap.
- Pied de page : colonne « Produit » scindée en « Produit » et « Ressources » (`footerColumns` de `content.ts`, champ `footerColumn` de `NavLink`) ; « Historique des versions » ajouté au menu Ressources (FR et EN).
- Versions validées par l'utilisateur : v1.0.0 datée du 2025-04-15, v1.1.0 du 2026-04-15, v1.2.0 et v1.3.0 placées entre les deux, dates réelles à partir de v1.4.0.

Reste à faire :

- Tags et releases de `bkourouma/immotopia` : la poussée de tags est refusée (403) par le proxy de la session cloud ; l'utilisateur lance le script `creer-releases-immotopia.sh` fourni dans la conversation.
- Nouvelle version de l'application : ajouter une entrée en tête de `src/lib/releases.ts` et le tag correspondant.

Pièges et décisions :

- `package.json` / `package-lock.json` modifiés par l'installation de l'environnement cloud : non commités.

---

## Branche `ci/deploiement-auto` — 2026-10-13

**État :** prêt à relire (PR vers `main`) ; la fusion déclenche le premier déploiement automatique
**Dernier commit :** voir `git log`

Fait :

- Branche `main` créée à partir de `feat/accueil-audit-marketing` (qui contient toutes les autres branches), devenue la branche par défaut.
- `ci.yml` : sur pull request, et appelé par `deploy.yml` ; `deploy.yml` : vérifications puis déploiement sur le runner `immotopia-site` du serveur alliance (rsync hors `.env`, `docker compose up -d --build`, contrôle de santé, retour arrière automatique). `deploy/install-runner.sh` installe le runner.
- README, RUNBOOK et AGENTS.md à jour (retour arrière, secours manuel).

Pièges et décisions :

- La production tournait sur le code de la PR n°2 ; la PR n°3 (7 rôles sur l'accueil) n'était pas déployée : elle part au premier déploiement automatique.
- Protection de branche : exiger une PR pour `main` est un réglage GitHub à faire par l'utilisateur.

---

## Branche `claude/lucid-turing-ug7vub` — 2026-10-02

**État :** prêt à relire
**Dernier commit :** voir `git log`

Fait :

- Section « À chaque rôle » de l'accueil : 7 onglets au lieu de 3 (ajout Gestionnaire, Propriétaire, Locataire, Copropriétaire) dans `content.ts` (`roles`, FR/EN), `roles.tsx` (aperçu `ListVisual`, lien de comparatif) et `nav.ts` (ancres `#roles-…`). Contenus tirés du wiki (portails « disponible »).
- `tsc`, `lint` et `build` OK ; 7 onglets cliqués en FR et EN, bureau et mobile (Playwright), sans débordement.

Reste à faire :

- Relire les textes.

---

## Branche `feat/packs-patrimoine-wiki` — 2026-10-02

**État :** fusionnée (PR n°1) dans `feat/accueil-audit-marketing`, déployée en production le 2026-10-02
**Dernier commit :** `f038dff` (après `2d452fe`)

Fait :

- `pricing.ts` : 6 packs (ajout de Patrimoine Essentiel, 9 900, et Patrimoine Pro, 29 900 FCFA HT/mois), extensions à la carte, règles commerciales (TVA 18 % Alliance Consultants, dépassement facturé et non bloqué), remise de combinaison calculée sur le prix de base du pack le moins cher. Comparatif à 6 colonnes, grille sur 3 colonnes, bloc « Extensions à la carte » (`pricing.tsx`), page Tarifs, FAQ (`landings.ts`), assistant (`prompt.ts`, `knowledge.md`) alignés.
- « Valeur nette et projections consolidées » annoncées « bientôt (en développement) » : non livrées (développements non fusionnés côté application). Les paliers Particulier gratuit/plus ne sont pas sur Tarifs.
- Wiki resynchronisé sur l'inventaire `Immobillier/docs/ImmoTopia_Wiki_Fonctionnalites.xlsx` (846 lignes) : 130 fonctionnalités, 835 actions, statut « En développement » (`types.ts`, `index.ts`, `wiki-ui.tsx`), nouveaux domaines `patrimoine-multi-actifs` et `administration-plateforme`. Reversements, honoraires, comptes propriétaires et mandats limités à Agence et Intégré ; packs Patrimoine ajoutés aux fonctions CORE.
- Mesure d'audience Umami (`analytics.tsx`) et page confidentialité embarquées dans la même PR.
- Garde de déploiement levée : `acc.config.json` ne bloque plus `ssh`/`scp` vers `alliance` ; `AGENTS.md`, `RUNBOOK.md` et `run-site` disent qu'un agent ne déploie qu'avec un « oui » explicite de l'utilisateur, demandé avant chaque déploiement.
- Déploiement selon le README : image de retour arrière `immotopia-site:avant-packs-20261002`, archive `~/immotopia-site-avant-packs-20261002.tgz` sur le serveur. Contrôle en 200 de `/tarifs`, `/en/tarifs`, `/wiki`, `/faq`, `/wiki/patrimoine-multi-actifs`, `/wiki/administration-plateforme` ; wiki en ligne à 130 fonctionnalités.
- Vérifications : `tsc --noEmit`, `npm run lint` et `npm run build` OK. Le site n'a aucun test automatisé ; le wiki n'a pas été relu texte par texte.

Reste à faire :

- Recouper les prix avec `packages/api/src/lib/subscription/catalog.ts` (non accessible depuis ce dépôt : valeurs reprises de la demande).
- Le simulateur ne couvre pas les packs Patrimoine.
- Deux choix de packs à confirmer dans le wiki : maintenance (Agence, Syndic, Promoteur, Intégré seulement, comme dans l'inventaire) et les 9 fonctionnalités « Agence et abonnement » (packs Patrimoine ajoutés par cohérence).
- Deux résumés du wiki hors de la plage de 140 à 160 caractères (162 et 139).
- `/en/wiki` répond 404 : le wiki est en français seulement.
- `.claude/settings.json` porte encore, en local, des règles `Edit(...)` temporaires (non commitées) à retirer.
- La branche distante `feat/packs-patrimoine-wiki` peut être supprimée (sur demande de l'utilisateur).

Pièges et décisions :

- `lefthook.exe` est bloqué par Smart App Control sur cette machine ; l'utilisateur l'a désactivé pour que les hooks pre-commit et pre-push s'exécutent.
- `gh pr merge` est refusé aux agents par le contrôle d'autorisation de la session : la fusion se fait depuis GitHub ou avec une règle de permission explicite.
- La branche par défaut du dépôt GitHub est `feat/accueil-audit-marketing` (pas de `master`).

---

## Branche `feat/accueil-audit-marketing` — 2026-09-28

**État :** déployé en production le 2026-09-28
**Dernier commit :** `fd61d19`

Fait :

- Audit marketing de l'accueil (10 fichiers), y compris la suppression de la formule « le plus complet ».
- Premier écran : titre, accroche et deux CTA (« Réserver une démo de 30 min », « Voir les tarifs ») au-dessus du
  carrousel ; sections réordonnées (tarifs avant comparatif et outils) ; reformulations FR/EN dans `content.ts`,
  `final-cta.tsx`, `marquee.tsx`.
- `AGENTS.md` et `CLAUDE.md` (ici et dans le dossier parent) disent que le projet et le dépôt git sont dans `site/`.
- Vérifications : `npm run build` OK, `npm run lint` sans erreur, `tsc --noEmit --incremental false` sans erreur,
  alignement des traductions anglaises, `check-comparatif-en.mjs`. Le site n'a aucun test automatisé.
- Déploiement selon la procédure du README : image de retour arrière `immotopia-site:avant-accueil-20260928` ;
  archive de l'ancien dossier `~/immotopia-site-avant-accueil-20260928.tgz` sur le serveur ; tarball transféré
  vers `/var/www/immotopia-site/`, puis `docker compose up -d --build`.
- Pages contrôlées en 200 : `/`, `/en`, `/tarifs`, `/contact`, `/wiki`, `/robots.txt`, `/sitemap.xml` ;
  aucune erreur dans les journaux.
- Images de retour plus anciennes encore présentes : `avant-email`, `avant-menu`, `avant-icone`, `avant-wiki`.

Reste à faire :

- Non traité de l'audit : calendrier de réservation en anglais (iframe Calendly, à régler côté Calendly), carte
  tarifaire Promoteur à aligner sur la FAQ (`pricing.ts`), nuance « fonctions annoncées publiquement » à côté
  des scores du comparatif, parcours par métier, bouton de la carte « loyers » qui mène encore à la section rôles.
- Aucune copie distante du code (pas de remote git) : décision de l'utilisateur sur l'hébergement du dépôt.
- La branche n'est pas fusionnée dans une branche principale.

Pièges et décisions :

- `npx tsc --noEmit` peut passer grâce au cache incrémental alors que `next build` échoue : vérifier avec
  `--incremental false` ou `npm run build`.

---

## Branche `feat/wiki-fonctionnalites` — 2026-09-27

**État :** tout est en production (wiki, défilement, icône, logos texte, menu à sous-menus, formulations, e-mail support@immotopia.cloud)
**Dernier commit :** `d2a4818` Contact : adresse e-mail support@immotopia.cloud
(`lancement-site-v2` = `d2a4818` ; `55dc15e` logos, `c050786` menu, `eb963a9` formulations)

Déploiement (fait par la session Pilote, à la demande de l'utilisateur) :

- `53b59d9` en production sur immotopia.cloud depuis le 2026-09-27 14:57 UTC (tarball puis
  `docker compose up -d --build`) : conteneur sain, `/wiki` et les fiches en 200, 95 URL wiki dans le sitemap.
- Retour arrière possible : image `immotopia-site:avant-wiki-20260927` et
  `~/immotopia-site-avant-wiki-20260927.tgz` sur le serveur.
- `3582c86` (défilement + icône) en production le 2026-09-27 vers 15:50 UTC : conteneur sain,
  `/icon.png` 200, `/icon.svg` 404, `/apple-icon.png`, `/images/logo/icone.png`, `/opengraph-image` 200,
  `<html data-scroll-behavior="smooth">`, navigation depuis le bas de `/wiki` → nouvelle page à `scrollY` 0.
  Retour arrière : image `immotopia-site:avant-icone-20260927`.
- `9b30cbd` (logos texte, menu Produit / Comparatif / Ressources / Tarifs, « le plus complet utilisé en
  Côte d'Ivoire », « trois logiciels similaires ») en production le 2026-09-27 vers 17:12 UTC : conteneur
  sain ; menu complet sans débordement à 1024 et 1280 px ; Produit et Ressources ouvrent 4 liens chacun ;
  `/images/logo/logo-immotopia-nom-inverse.png` 200 ; titre de l'accueil avec « utilisé en Côte d'Ivoire ».
  Retour arrière : image `immotopia-site:avant-menu-20260927`.
- `d2a4818` (e-mail de contact `support@immotopia.cloud` au lieu de `immotopia@allianceconsultants.net`,
  via `contact.email` de `src/lib/site.ts` et `knowledge.md`) en production le 2026-09-27 vers 18:50 UTC :
  `/contact` affiche la nouvelle adresse, conteneur sain. Retour arrière : image `immotopia-site:avant-email-20260927`.
- Piège : `c050786` ne passait pas `next build` (tsc : `footerProductLinks` typé `NavChild[] | NavLink[]`)
  alors que `npx tsc --noEmit` local passait grâce au cache incrémental (`tsconfig.tsbuildinfo`). Avant un
  déploiement, vérifier avec `npx tsc --noEmit --incremental false` ou `npm run build`.

Fait (dans `e2df911` / `53b59d9`) :

- `/wiki` (accueil + recherche), `/wiki/<domaine>` (10), `/wiki/<domaine>/<fonctionnalite>` (84) :
  539 actions, français seulement, pages statiques (`dynamicParams = false`), 404 sous `/en`.
- Données : `src/lib/wiki/<domaine>.ts` (un fichier par domaine), types dans `types.ts`, assemblage,
  libellés et contrôles au build dans `index.ts`. Composants : `src/components/wiki/`.
- Source : `docs/ImmoTopia_Wiki_Fonctionnalites.xlsx` (dossier parent), réécrit pour le public :
  super-admin, routes, permissions, lignes « À vérifier » et notes de sécurité écartées.
- `french-only.ts` : `frenchOnlyPrefixes` (`/wiki`) + `isFrenchOnly()`, utilisé par `switchLocalePath`.
- Sitemap, lien « Wiki » dans le menu FR, lien depuis la FAQ, section « Wiki » dans `knowledge.md`,
  consigne `/wiki` en français dans `LOCALE_PROMPT.en` (`prompt.ts`), composant `JsonLd` exporté de `json-ld.tsx`.

En production depuis ~15:50 UTC (`16a1b8d` défilement, `3582c86` icône) :

- `data-scroll-behavior="smooth"` sur `<html>` (`src/app/[lang]/layout.tsx`) : sans lui, Next 16 ne coupe
  plus le défilement fluide de `globals.css` pendant un changement de page, et chaque page s'ouvrait à la
  position de la précédente (souvent en bas). Constaté en production sur `/wiki`, touche toutes les pages.
- Nouvelle icône (maison en cubes) : `public/images/logo/icone.png` (composant `Logo` de `ui.tsx`, image
  Open Graph), `src/app/icon.png` (remplace `icon.svg`, supprimé), `src/app/apple-icon.png` (fond blanc).
  `src/proxy.ts` : `icon.svg` → `icon.png` dans le matcher. Source : `../docs/logos/`.

Reste à faire :

- Logos texte (non commités, non déployés, vérifiés en local : `tsc`, `lint`, navigateur de 375 à 1536 px) :
  `public/images/logo/logo-immotopia(-inverse).png` (fournis, avec slogan) et `logo-immotopia-nom(-inverse).png`
  (découpés sans slogan, 953 × 189). `Logo` (`ui.tsx`) : icône + nom en image, `onLight` (bleu marine) ou
  inverse (blanc) ; `full` = logo avec slogan (pied de page). Image Open Graph : nom en image.
  Commité en `55dc15e`, pas encore déployé.
- Menu réorganisé (non commité, vérifié en local de 375 à 1280 px, FR et EN) : « Produit ▾ · Comparatif ▾ ·
  Ressources ▾ · Tarifs » (choix de l'utilisateur). `navLinks` (`content.ts`) : `children`, `footer` (lien mis
  en avant), `wide` (deux colonnes) ; Produit = Fonctionnalités, Rôles, Écosystème, Wiki ; Ressources = Wiki,
  Outils gratuits, FAQ, Contact (EN : Free tools, Contact). Rangée complète dès `lg` (1024 px), menu compact
  en dessous. Pied de page : `footerProductLinks()` (menu à plat, sans doublon ni Contact).
- Relecture humaine des textes du wiki, surtout les statuts (voir ci-dessous).

Pièges et décisions :

- Statuts alignés sur `knowledge.md` (« Disponibilité », 23/09), pas sur l'Excel qui dit « Disponible »
  dès que le code existe : Promoteur/chantiers, finance opérationnelle, offres/compromis/commissions de vente,
  vie du bail, états des lieux, honoraires/reversements/compte courant, paiement en ligne = « en cours de
  déploiement ». Changer un statut : champ `status` de la fonctionnalité ou de l'action.
- Pas de générateur (contrairement au comparatif) : les textes sont rédigés, l'Excel est une matière première.

---

## Branche `chore/acc-standard-v0.1.0` — 2026-09-27

**État :** prêt à relire (rien n'est commité depuis `421bbd4`)
**Dernier commit :** `421bbd4` Architecture agentique : configuration acc-standard

Fait :

- Standard `acc-standard` 0.1.0 posé (profils base, node), puis adapté par
  `/acc-adapt` : `AGENTS.md` (hors blocs gérés), `CLAUDE.md` (table de
  chargement), `RUNBOOK.md`, `CODING_STANDARDS.md`, `SECURITY.md`,
  `ADR-000-template.md`, `.claude/rules/review-checklist.md`,
  `.claude/skills/run-site/SKILL.md`, `.github/workflows/ci.yml`.
- Règles par chemin créées : `.claude/rules/nextjs-i18n.md`,
  `api-routes.md`, `contenus.md`.
- `acc.config.json` : `ports.web` 3000, description, `guard.protectedPaths`
  étendu (scripts, deploy, docs, .claude, .acc), refus de `ssh alliance` et
  `scp|rsync … alliance:`, contrôle de commit `check-comparatif-en`.
- `eslint.config.mjs` : `no-require-imports` désactivée pour
  `scripts/**/*.cjs` (les 9 erreurs de lint venaient des scripts du standard).
- `Dockerfile` : copie `scripts/install-git-hooks.cjs` avant `npm install`
  (le `prepare` ajouté par le standard cassait l'étape `deps`).
- Dette mesurée : `tsc` 0 erreur, `lint` 0 erreur, `build` OK (50 pages),
  comparatif aligné (105 lignes, 19 sources). Pas de tests automatisés.
- `doctor` : sain.

Reste à faire :

- Relire puis commiter l'installation et l'adaptation (utilisateur ou Pilote).
- Vérifier l'image Docker (`docker build`) : Docker Desktop était arrêté,
  seule l'étape `prepare` a été simulée hors dépôt git.
- Points ouverts de sécurité : `docs/governance/SECURITY.md` §12 (pas de
  limite de débit sur `/api/lead`, messages `assistant` forgés acceptés par
  `/api/chat`, JSON-LD non échappé dans deux composants).
- La CI ne tournera qu'une fois un remote GitHub configuré.

Pièges et décisions :

- Les fichiers gérés (voir `.acc/manifest.json`) ne se modifient pas
  localement : `npx github:bkourouma/ACC-STANDARD-ARCHITECTURE update` les
  remplacerait ou signalerait un conflit.
- `npx tsc --noEmit` sur un checkout neuf exige
  `node scripts/build-knowledge.mjs && npx next typegen` d'abord.
- Worktree avec `node_modules` en jonction : Turbopack refuse de construire.
- Le bloc `BEGIN:nextjs-agent-rules` d'`AGENTS.md` est réécrit par
  `next dev` : ne pas y toucher.
