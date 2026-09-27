# Passation de session — site

Carnet de reprise entre sessions d'agents. **Lire en premier** en début de
session ; **mettre à jour sans l'annoncer** avant de conclure tout tour en
plusieurs étapes (règle posée dans AGENTS.md et CLAUDE.md).

## Mode d'emploi

- Une section par branche, la plus récente en haut. Réécrire la section de sa
  branche au lieu d'empiler des entrées : ce fichier décrit l'état présent, pas
  l'historique (l'historique, c'est `git log`).
- Supprimer la section d'une branche une fois fusionnée dans
  `master`.
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
