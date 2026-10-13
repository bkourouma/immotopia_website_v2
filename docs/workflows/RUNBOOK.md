# Runbook — site

Lancer, configurer et dépanner le projet. En cas de désaccord avec
[AGENTS.md](../../AGENTS.md), AGENTS.md prime.

## Prérequis

| Outil   | Version vérifiée (2026-09-27, Windows 11) | Vérifier     |
| ------- | ----------------------------------------- | ------------ |
| Node.js | 24.12 (image Docker : `node:24-alpine`)   | `node -v`    |
| npm     | 11.6                                      | `npm -v`     |
| Next.js | 16.3.6 (Turbopack)                        | `package.json` |

Aucune base de données. Services externes facultatifs en développement :
OpenRouter (assistant) et un webhook n8n (demandes de démonstration). Sans
eux, le site tourne ; l'assistant répond « pas encore configuré » (503) et le
formulaire accepte la demande sans la transmettre (`forwarded: false`).

## Installation

```bash
npm install
node scripts/install-git-hooks.cjs    # hooks git Lefthook (aussi lancé par prepare)
```

### Fichiers d'environnement

Copier `.env.example` en `.env.local` (fait par l'utilisateur : les agents ne
lisent ni n'écrivent les `.env`). Toutes les variables sont facultatives en
développement :

| Variable                  | Lue par                                         | Rôle                                                                      |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BOOKING_URL` | `demo-modal.tsx`, `booking-embed.tsx` (client)  | Lien Calendly/Cal.com ; vide = formulaire intégré. **Figée au build.**    |
| `N8N_WEBHOOK_URL`         | `src/app/api/lead/route.ts` (serveur)           | Webhook qui reçoit les demandes de démonstration (secret de fait).        |
| `OPENROUTER_API_KEY`      | `src/app/api/chat/route.ts` (serveur)           | Clé de l'assistant immotopIA (secret).                                    |
| `OPENROUTER_MODEL`        | `src/app/api/chat/route.ts` (serveur)           | Modèle ; défaut `deepseek/deepseek-v4.1-flash`.                           |

En production, ces valeurs viennent de `/var/www/immotopia-site/.env` sur le
serveur, lu par `docker-compose.yml`.

## Lancer

```bash
npm run dev      # predev (base de connaissances) puis next dev → http://localhost:3000
```

Depuis le dossier parent `D:\APP\ImmoTopiaWebsite2Version2`, la
configuration `immotopia` de `.claude/launch.json` lance
`npm run dev --prefix site` sur le port 3000.

Version de production locale : `npm run build && npm start` (port 3000).

## Ports

| Service                     | Port | Où c'est décidé                                         |
| --------------------------- | ---- | ------------------------------------------------------- |
| `next dev` / `next start`   | 3000 | défaut Next ; `ports.web` d'`acc.config.json`           |
| Conteneur de production     | 3000 | `Dockerfile` (`PORT=3000`)                              |
| Hôte de production (nginx)  | 3023 | `docker-compose.yml` (`127.0.0.1:3023:3000`), `deploy/` |

Pas de CORS ni d'origine à aligner : le navigateur appelle `/api/chat` et
`/api/lead` sur la même origine.

## Commandes quotidiennes

```bash
npx tsc --noEmit                      # ~5 s, 0 erreur au 2026-09-27
npm run lint                          # ~15 s, 0 erreur au 2026-09-27
npm run build                         # ~20 s, 50 pages générées
node scripts/check-comparatif-en.mjs  # après toute retouche du comparatif
```

Pas de tests automatisés.

## Bus d'agents

`.agent-bus/` (racine du checkout principal, commun à tous les worktrees,
ignoré par git, surchargeable par `AGENT_BUS_DIR`) porte les anomalies et le
journal des révisions échangés entre développement et recette :

```bash
node scripts/agent-bus.cjs help
node scripts/agent-bus.cjs list --state "prêt au retest"
```

## Worktrees git (`.claude/worktrees/*`)

Un `git worktree` n'a pas ses propres dépendances installées : les hooks git
(Lefthook, lint-staged) et les commandes du projet y échouent tant qu'elles ne
sont pas résolvables. Avant tout `git commit` dans un worktree, soit installer
les dépendances dans le worktree, soit poser un lien vers celles du checkout
principal (sous Windows, une jonction :
`mklink /J "<worktree>\node_modules" "<checkout principal>\node_modules"`).

**Limite constatée le 2026-09-27** : avec un `node_modules` en jonction,
`npx tsc --noEmit`, `npm run lint` et `next typegen` fonctionnent, mais
`npm run build` échoue (Turbopack : `Symlink [project]/node_modules is
invalid, it points out of the filesystem root`). Pour construire ou lancer le
site depuis un worktree, y faire un vrai `npm install`.

Sur un checkout ou un worktree neuf, `npx tsc --noEmit` échoue tant que deux
fichiers générés manquent (19 erreurs `Cannot find name 'PageProps'`, et
`Cannot find module './knowledge.generated'`) : lancer d'abord
`node scripts/build-knowledge.mjs && npx next typegen` (ou une fois
`npm run dev` / `npm run build`). C'est ce que fait la CI.

Seul `node_modules/` est à partager. Chaque worktree garde ses propres
artefacts générés : `.next/`, `tsconfig.tsbuildinfo`,
`src/lib/assistant/knowledge.generated.ts` (régénéré par `npm run dev` ou
`npm run build`) ; un `.env.local` n'existe pas dans un nouveau worktree et
c'est à l'utilisateur de le créer.

## Déploiement

Depuis le 2026-10-13, **fusionner une PR dans `main` déploie le site** (workflow
`.github/workflows/deploy.yml`, détail dans [README.md](../../README.md), section « Déploiement »).
Un agent ne fusionne dans `main` qu'avec l'accord explicite de l'utilisateur, puisque la fusion met le
site en production (voir AGENTS.md). Rien ne se pousse directement sur `main` : tout passe par une PR
dont la CI (`ci.yml`) est verte.

Suivre un déploiement : `gh run list --repo bkourouma/immotopia_website_v2 --workflow Déploiement`
puis `gh run watch <id>`. Vérifier le runner :
`gh api repos/bkourouma/immotopia_website_v2/actions/runners` (statut `online`, label `immotopia-site`).

### Retour arrière

Avant chaque déploiement, le job garde l'image en service sous `immotopia-site:avant-ci-<date>-<commit>`
(les 5 dernières sont conservées ; `docker image ls immotopia-site` sur le serveur). Si le contrôle de
santé échoue, le job rétablit seul l'image précédente. Pour revenir en arrière après coup, deux voies :

- **Par git (conseillé, garde `main` fidèle à la production)** : `git revert -m 1 <fusion>` sur une
  branche, PR, fusion ; le déploiement automatique republie l'ancienne version.
- **Immédiat, sur le serveur** (`ssh alliance`, une seule connexion) :

  ```bash
  cd /var/www/immotopia-site
  docker tag immotopia-site:avant-ci-<date>-<commit> immotopia-site:latest
  docker compose up -d --no-build
  curl -fsS http://127.0.0.1:3023/robots.txt
  ```

  Le prochain déploiement automatique repart du code de `main` : revenir aussi sur `main` (revert) si
  l'ancienne version doit rester.

### Déploiement manuel de secours

À n'utiliser que si le runner ou GitHub Actions est indisponible, avec l'accord explicite de l'utilisateur.
Depuis un clone à jour de `main` (même chose que le job, sans toucher au `.env` du serveur) :

```bash
tar --exclude=node_modules --exclude=.next --exclude=.git --exclude='.env*' -czf /tmp/site.tgz .
scp /tmp/site.tgz alliance:/var/www/immotopia-site/
ssh alliance 'cd /var/www/immotopia-site && docker tag immotopia-site:latest immotopia-site:avant-manuel-$(date +%Y%m%d-%H%M) && tar -xzf site.tgz && rm site.tgz && docker compose up -d --build && curl -fsS http://127.0.0.1:3023/robots.txt'
```

(`tar` ajoute et écrase mais ne supprime pas les fichiers retirés du dépôt ; sans conséquence pour un
secours.) Le `.env` de production n'est jamais envoyé ni modifié. Regrouper les commandes en une seule
connexion SSH : sshd coupe les reconnexions répétées.

### Runner auto-hébergé

Service `actions.runner.bkourouma-immotopia_website_v2.immotopia-site-runner`, dossier
`~/actions-runner-immotopia-site`, utilisateur `deployer` (propriétaire de `/var/www/immotopia-site`,
membre du groupe `docker`), label `immotopia-site`. Hors ligne : `sudo systemctl status` puis
`sudo systemctl restart` sur ce service. Réinstallation : `deploy/install-runner.sh` (la commande avec un
jeton frais est en tête de fichier). Les workflows de pull request tournent sur les machines GitHub
(`ubuntu-latest`), jamais sur ce runner.

## Dépannage

### Hooks Lefthook

`.lefthook.yml` déclare un hook `pre-push` (`scripts/pre-push-guard.cjs`) qui
refuse une poussée vers une branche protégée (`git.protectedBranches`
d'`acc.config.json`). Un refus se corrige (passer par une branche puis une
PR), il ne se contourne pas. `npx github:bkourouma/ACC-STANDARD-ARCHITECTURE doctor` vérifie que les hooks
sont installés.

### `lint-staged` bloqué sous Windows

Les commandes de `lint-staged` appellent les points d'entrée JS des outils
(`node node_modules/eslint/bin/eslint.js`) plutôt que les raccourcis
`node_modules/.bin/*.cmd` : sous Windows, `lint-staged` peut se bloquer sans
erreur quand un raccourci `.cmd` reçoit de nombreux fichiers en arguments. Ne
pas revenir à ces raccourcis.

### Autres pannes connues

- **`npm run lint` en erreur sur `scripts/*.cjs`** (`A require() style import
  is forbidden`) : les scripts CommonJS d'acc-standard ; l'exception est
  déclarée dans `eslint.config.mjs`. Constaté et corrigé le 2026-09-27.
- **Assistant : « L'assistant n'est pas encore configuré »** : pas de
  `OPENROUTER_API_KEY` dans l'environnement du serveur (comportement voulu,
  réponse 503). Constaté en local le 2026-09-27.
- **404 sous `/en/faq` ou `/en/<page thématique>`** : page déclarée française
  seulement (`src/lib/french-only.ts`). Constaté le 2026-09-27.

Comportements prévus par le code (lus, pas encore rencontrés) :

- **Assistant : « Vous avez envoyé beaucoup de messages »** : plus de 25
  requêtes en 10 min depuis la même IP (limite en mémoire du processus,
  remise à zéro au redémarrage).
- **Build : `Ajouter /<slug> dans src/lib/french-only.ts`** : une page
  thématique ajoutée à `landings.ts` sans être déclarée française seulement.
- **Lien Calendly inchangé après modification** : `NEXT_PUBLIC_BOOKING_URL`
  est figée au build ; relancer `npm run dev` ou reconstruire l'image.
