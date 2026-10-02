---
name: run-site
description: Fait tourner le site vitrine ImmoTopia (Next.js 16, FR/EN) en local et le pilote pour constater qu'une modification fonctionne dans le vrai site. À utiliser pour démarrer ou relancer le serveur de dev, ouvrir une page en français ou sous /en, en faire une capture, sonder /api/chat ou /api/lead, ou diagnostiquer une page blanche, un 404 inattendu, un port 3000 occupé ou un assistant « pas encore configuré ». Ne sert pas à corriger des erreurs de typage ou de lint ni à déployer (seulement après accord explicite de l'utilisateur).
---

# Lancer site

Recette vérifiée le 2026-09-27 sur `chore/acc-standard-v0.1.0`, Windows 11,
Node 24.12, npm 11.6 : serveur prêt en ~1 s après `Ready`, 200 sur `/`,
`/en`, `/tarifs`, `/en/tarifs`, `/faq`, `/sitemap.xml` ; 308 de `/fr/tarifs`
vers `/tarifs` ; 404 sur `/en/faq` (page française seulement) et sur une
adresse inconnue.

## Ce qu'est le projet

| Service     | Rôle                                             | Port |
| ----------- | ------------------------------------------------ | ---- |
| `next dev`  | pages FR (racine) et EN (`/en`), routes `/api/*` | 3000 |

Un seul processus, sans base de données. `ports.web` d'`acc.config.json` :
3000. Services externes facultatifs : OpenRouter (assistant) et webhook n8n
(formulaire), configurés par l'utilisateur dans `.env.local` (les agents ne le
lisent pas).

## Séquence de lancement

```bash
npm install          # seulement si node_modules manque
npm run dev          # predev régénère src/lib/assistant/knowledge.generated.ts
```

Depuis le dossier parent `D:\APP\ImmoTopiaWebsite2Version2`, la
configuration `immotopia` de `.claude/launch.json` fait la même chose
(`npm run dev --prefix site`, port 3000) et convient à `preview_start`.

Arrêt sous Windows : le processus `node` qui écoute sur 3000
(`netstat -ano | grep ":3000 .*LISTENING"`, puis `taskkill //PID <pid> //T //F`
depuis Git Bash).

### Attendre que l'application soit prête

`/robots.txt` répond sans authentification (c'est aussi la sonde du
`healthcheck` de `docker-compose.yml`) :

```bash
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/robots.txt)
  [ "$code" = "200" ] && echo "prêt (~${i}s)" && break
  sleep 1
done
```

La première visite d'une page la compile (1 à 2 s), les suivantes sont
rapides.

## Vérifier une modification

- Toujours la page en français **et** sous `/en` (sauf page française
  seulement, qui répond 404 sous `/en`).
- Routes API, sans coût ni envoi réel :

```bash
# 503 « pas encore configuré » sans clé, 400 avec clé : aucun appel à OpenRouter
curl -s -X POST -H "Content-Type: application/json" -d '{"messages":[]}' http://localhost:3000/api/chat
# 400 « Champ manquant ou invalide » : rien n'est transmis à n8n
curl -s -X POST -H "Content-Type: application/json" -d '{"name":""}' http://localhost:3000/api/lead
```

Ne pas envoyer de demande de démonstration valide ni de vrai message à
l'assistant sans accord : selon le `.env.local` de l'utilisateur, cela crée un
prospect dans Airtable, déclenche des e-mails n8n ou consomme le budget
OpenRouter.

## Se connecter

Sans objet : le site n'a pas de compte. Le lien « Connexion » redirige vers
`https://app.immotopia.cloud/login`, une autre application.

## Pièges

- **Assistant « L'assistant n'est pas encore configuré » (503)** : pas de
  `OPENROUTER_API_KEY` dans l'environnement du serveur — constaté sur ce poste
  le 2026-09-27. C'est le comportement voulu, pas une panne ; seule
  l'utilisatrice ou l'utilisateur peut ajouter la clé.
- **404 sous `/en/<page>`** : la page est déclarée dans
  `src/lib/french-only.ts` (FAQ, pages thématiques) ; comportement voulu,
  constaté le 2026-09-27 sur `/en/faq`.
