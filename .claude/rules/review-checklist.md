---
# Cette règle se charge quand un fichier couvert est lu ou modifié ;
# code-reviewer et security-auditor la lisent toujours.
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "src/**/*.css"
  - "scripts/*.mjs"
  - "next.config.ts"
  - "eslint.config.mjs"
  - "Dockerfile"
  - "docker-compose.yml"
  - "deploy/**"
---

# Contrôles de relecture propres à site

Complète le tronc commun de `.claude/agents/code-reviewer.md` et
`.claude/agents/security-auditor.md`. AGENTS.md prime en cas de désaccord.
Chaque contrôle cite le fichier de référence qui montre la bonne pratique et,
si possible, une recherche mécanique (`grep`) qui repère l'écart.

## Next.js 16

- Toute API Next utilisée est conforme au guide de
  `node_modules/next/dist/docs/` (Next 16.3, pas celui des données
  d'entraînement) : `src/proxy.ts` et non `middleware.ts`, `await params`,
  `PageProps<"/[lang]/…">`. Référence : `src/app/[lang]/tarifs/page.tsx`.

## Sécurité et cloisonnement des données

- Pas de compte ni de donnée par utilisateur : le contrôle porte sur les deux
  routes `src/app/api/chat` et `src/app/api/lead` (validation du corps,
  longueurs bornées, `AbortSignal.timeout` sur l'appel sortant, aucun détail
  interne renvoyé). Détail : `docs/governance/SECURITY.md` §7.
- Une nouvelle route API publique a une protection contre l'abus (limite de
  débit comme `rateLimited()` de `chat/route.ts`, ou champ piège comme
  `lead/route.ts`) et reste exclue du routage des langues (`src/proxy.ts`).
- Liens `target="_blank"` toujours avec `rel="noopener noreferrer"`
  (`src/components/whatsapp-button.tsx`).

## Erreurs

- Route API : un statut explicite par cas (400, 429, 502, 503), message
  traduit si la route a une `locale`, `console.error("[route] …")` sans
  donnée du visiteur. Modèle : `src/app/api/chat/route.ts`.
- Page absente : `notFound()`, jamais une exception.

## Configuration

- Secrets (`OPENROUTER_*`, `N8N_*`) lus uniquement dans `src/app/api/**` ;
  jamais sous `NEXT_PUBLIC_*`. Toute nouvelle variable figure dans
  `.env.example` et, si elle sert en production, dans `docker-compose.yml`.

## Interface et textes affichés

- Tout texte visible est bilingue : `t("…", "…")` via `getI18n()`
  (`src/lib/i18n-server.ts`) ou `useI18n()`
  (`src/components/locale-provider.tsx`). Une chaîne française seule dans du
  JSX est un écart, sauf page française seulement.
- Lien interne par `SmartLink` ou `href()` (garde `/en`) ; nouvelle page
  française seulement ajoutée à `src/lib/french-only.ts` ; nouvelle page ajoutée
  à `src/app/sitemap.ts` ; URL publiée supprimée → redirection 301 dans
  `next.config.ts`.
- Textes, prix et outils dans `src/lib/`, pas en dur dans un composant ; pas
  de date de livraison annoncée (règle éditoriale de `src/lib/content.ts`).
- `"use client"` seulement si nécessaire, jamais dans `src/app`.
- `dangerouslySetInnerHTML` réservé au JSON-LD, avec `<` échappé
  (`src/components/json-ld.tsx`).

## Tests obligatoires

- Pas de framework de test. Exiger à la place : `npx tsc --noEmit` et
  `npm run lint` à 0 erreur, `npm run build` réussi, et une vérification en
  navigateur en français **et** sous `/en` décrite dans la PR.
- Comparatif modifié (`src/lib/comparatif-data*.ts`) :
  `node scripts/check-comparatif-en.mjs` passe.
- Assistant : une modification de `pricing.ts`, `tools.ts` ou `site.ts` change
  aussi le prompt (`src/lib/assistant/prompt.ts`) ; le vérifier.

## Recherches mécaniques

Comptes relevés le 2026-09-27 ; un écart à la hausse se justifie.

```bash
# dangerouslySetInnerHTML : 3 (JSON-LD ; 2 sans échappement, dette connue)
grep -rn "dangerouslySetInnerHTML" src
# secrets hors des routes API : 0
grep -rnE "OPENROUTER_|N8N_" src --include=*.ts --include=*.tsx | grep -v "^src/app/api/"
# variables publiques : 2 (NEXT_PUBLIC_BOOKING_URL)
grep -rn "NEXT_PUBLIC_" src
# composants client dans src/app : 0
grep -rln '"use client"' src/app
# src/lib qui importe des composants : 0
grep -rn "@/components\|\.\./components" src/lib
# liens _blank : 4, et 4 avec noopener dans les 2 lignes suivantes
grep -rn 'target="_blank"' src | wc -l
grep -rn 'target="_blank"' src -A2 | grep -c noopener
# appels réseau : 4 (2 routes API vers l'extérieur, 2 composants vers /api)
grep -rn "fetch(" src
# journaux : 6, tous préfixés [chat] ou [lead]
grep -rnE "console\.(log|error|warn)" src
# ancien routeur ou middleware : 0
grep -rn 'from "next/router"' src; ls src/middleware.ts 2>/dev/null
```
