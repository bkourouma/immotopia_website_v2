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

**État :** wiki en production ; correctifs défilement + icône commités, pas encore déployés
**Dernier commit :** `53b59d9` Assistant : le wiki, la FAQ et les pages thématiques se donnent à leur adresse française
(`e2df911` pour le wiki ; `lancement-site-v2` avancée sur `53b59d9`, elle inclut `chore/acc-standard-v0.1.0`)

Déploiement (fait par la session Pilote, à la demande de l'utilisateur) :

- `53b59d9` en production sur immotopia.cloud depuis le 2026-09-27 14:57 UTC (tarball puis
  `docker compose up -d --build`) : conteneur sain, `/wiki` et les fiches en 200, 95 URL wiki dans le sitemap.
- Retour arrière possible : image `immotopia-site:avant-wiki-20260927` et
  `~/immotopia-site-avant-wiki-20260927.tgz` sur le serveur.

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

Commités (`16a1b8d` défilement, puis le commit de l'icône), non déployés (vérifié : `tsc` et `lint` à 0 erreur, navigateur en local) :

- `data-scroll-behavior="smooth"` sur `<html>` (`src/app/[lang]/layout.tsx`) : sans lui, Next 16 ne coupe
  plus le défilement fluide de `globals.css` pendant un changement de page, et chaque page s'ouvrait à la
  position de la précédente (souvent en bas). Constaté en production sur `/wiki`, touche toutes les pages.
- Nouvelle icône (maison en cubes) : `public/images/logo/icone.png` (composant `Logo` de `ui.tsx`, image
  Open Graph), `src/app/icon.png` (remplace `icon.svg`, supprimé), `src/app/apple-icon.png` (fond blanc).
  `src/proxy.ts` : `icon.svg` → `icon.png` dans le matcher. Source : `../docs/logos/`.

Reste à faire :

- Redéployer pour mettre en ligne les correctifs ci-dessus (réservé à l'utilisateur).
- Logos texte « ImmoTopia » (couleur et blanc) : envoyés dans la conversation mais pas encore déposés
  sur le disque ; le composant `Logo` écrit toujours le nom en texte.
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
