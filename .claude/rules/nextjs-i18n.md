---
paths:
  - "src/app/**/*.ts"
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
  - "src/proxy.ts"
  - "src/lib/i18n.ts"
  - "src/lib/i18n-server.ts"
  - "src/lib/french-only.ts"
  - "next.config.ts"
---

# Pages, composants et langues (Next.js 16, FR/EN)

Détail : `docs/governance/CODING_STANDARDS.md` §1, §3 et §6.

## Next.js 16.3 n'est pas celui que tu connais

Avant d'écrire du code Next, lire le guide de la version installée dans
`node_modules/next/dist/docs/` (index : `index.md`) et respecter ses avis de
dépréciation. Guides utiles ici :

- `01-app/01-getting-started/16-proxy.md` — `src/proxy.ts` (ex-middleware) ;
- `01-app/02-guides/internationalization.md` ;
- `01-app/03-api-reference/03-file-conventions/` (`page.md`, `layout.md`,
  `route.md`, `not-found.md`, `proxy.md`) ;
- `01-app/02-guides/upgrading/version-16.md`.

Constaté dans ce dépôt : `params` est une promesse (`const { lang } = await
params`), typée par les aides globales `PageProps<"/[lang]/…">` et
`LayoutProps<"/[lang]">` ; la langue d'un composant serveur vient de
`next/root-params` via `getI18n()`. Ne pas créer `middleware.ts` ni
`src/app/layout.tsx` : le layout racine est `src/app/[lang]/layout.tsx`.

## Langues

- Français sans préfixe (`/tarifs`), anglais sous `/en` (`/en/tarifs`) ; le
  proxy réécrit vers `app/[lang]` et redirige `/fr/…` (308).
- Texte visible : `t("Français", "English")` — serveur `await getI18n()`,
  client `useI18n()`. `t` accepte du JSX (voir
  `src/app/[lang]/outils/quittance-de-loyer/page.tsx`).
- Métadonnées : `hasLocale(lang)`, `translator(lang)`,
  `alternates(lang, "/chemin")` (modèle : `src/app/[lang]/tarifs/page.tsx`).
- Liens internes : `SmartLink` (`src/components/smart-link.tsx`) ou `href()`
  de `useI18n()` ; un `<Link href="/…">` brut perd `/en`.
- Page française seulement : l'ajouter à `src/lib/french-only.ts`.
- Nouvelle page : l'ajouter à `src/app/sitemap.ts`. URL supprimée :
  redirection 301 dans `next.config.ts`.

## Composants

- Fichiers kebab-case, export nommé PascalCase, pas d'export par défaut hors
  conventions Next.
- `"use client"` seulement pour l'état, les effets ou les animations
  (Framer Motion, GSAP) ; jamais dans `src/app`.
- Styles : classes Tailwind 4 et jetons de `@theme` de
  `src/app/[lang]/globals.css` (`ink-*`, `brand-*`, `sun-*`, `mint-*`).

## Vérifier

`npx tsc --noEmit`, `npm run lint`, `npm run build`, puis la page en français
et sous `/en` (compétence `run-site`).
