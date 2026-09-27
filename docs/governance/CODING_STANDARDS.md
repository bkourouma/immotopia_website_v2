# Conventions de code — site

En cas de désaccord avec [AGENTS.md](../../AGENTS.md), AGENTS.md prime. Ce
document décrit les conventions **observées dans le code**, avec un fichier de
référence pour chacune, pas un idéal.

Avant d'utiliser une API Next.js, lire son guide dans
`node_modules/next/dist/docs/` : la version installée (16.3) diffère de ce que
les modèles connaissent (voir le bloc en tête d'AGENTS.md).

## 1. Organisation du dépôt

- `src/app/[lang]/` : pages et layout racine (il n'y a pas de
  `src/app/layout.tsx`). Toute page vit sous `[lang]`.
- `src/app/api/<nom>/route.ts` : les deux seules routes serveur (`chat`,
  `lead`), en `export async function POST(request: Request)`.
- `src/components/` : composants ; sous-dossiers par domaine (`tools/`,
  `chat/`, `comparatif/`).
- `src/lib/` : données, contenus, formatage, i18n. Un composant importe
  `src/lib`, jamais l'inverse (vérifiable :
  `grep -rn "@/components\|../components" src/lib` → 0 résultat).
- Import par l'alias `@/` (`tsconfig.json`) depuis `src/app` et la plupart
  des composants ; `src/lib` n'utilise que des imports relatifs (`./i18n`).
- Configuration : `next.config.ts` (sortie `standalone`, redirections 301 de
  l'ancien site), `eslint.config.mjs`, `src/app/[lang]/globals.css` (thème
  Tailwind 4 par `@theme`, pas de `tailwind.config`).

## 2. Nommage

- Fichiers et dossiers en kebab-case : `src/components/demo-modal.tsx`,
  `src/lib/french-only.ts`.
- Composants en PascalCase, exportés nommément (`export function DemoModal`),
  pas d'export par défaut hors fichiers de convention Next (`page.tsx`,
  `layout.tsx`, `robots.ts`, `sitemap.ts`).
- Segments d'URL en français dans les deux langues (`/outils/quittance-de-loyer`,
  `/en/tarifs`) : ils portent le référencement acquis.
- Commentaires en français, qui expliquent le pourquoi
  (`src/app/api/chat/route.ts`).

## 3. Couches et responsabilités

- **Pages** (`page.tsx`) : composants serveur ; `generateMetadata` avec
  `await params`, `hasLocale(lang)` puis `translator(lang)` et
  `alternates(lang, chemin)`. Modèle : `src/app/[lang]/tarifs/page.tsx`.
- **Composants client** : `"use client"` en tête, seulement quand il faut de
  l'état, des effets ou des animations (28 fichiers aujourd'hui, aucun dans
  `src/app`). Modèle : `src/components/smart-link.tsx`.
- **Contenus** : textes, prix, outils et pages thématiques dans `src/lib/`
  (`content.ts`, `pricing.ts`, `tools.ts`, `landings.ts`), pas en dur dans un
  composant.
- **Routes API** : valident le corps, appellent un service externe avec
  `AbortSignal.timeout`, ne renvoient jamais de détail interne. Modèle :
  `src/app/api/lead/route.ts`.
- **Outils gratuits** : calculs et PDF (jsPDF chargé à la demande,
  `src/lib/document.ts`) dans le navigateur, sans appel serveur.

## 4. Erreurs

- Routes API : réponse explicite par cas (`400` entrée invalide, `429` débit,
  `502` service externe, `503` non configuré), message traduit pour
  `/api/chat`, `console.error("[chat] …")` / `console.error("[lead] …")` côté
  serveur. Pas d'exception qui remonte au client.
- Invariants de build : `throw new Error(...)` au chargement du module
  (`src/lib/landings.ts`, `src/lib/tools.ts` pour un outil inconnu).
- Page absente : `notFound()` (`src/app/[lang]/[...rest]/page.tsx`,
  `src/lib/i18n-server.ts`), rendue par `src/app/[lang]/not-found.tsx`.
- Côté client : état `"error"` affiché à l'utilisateur
  (`LeadForm` dans `src/components/demo-modal.tsx`).

## 5. Configuration

- Pas de module central : chaque variable est lue là où elle sert
  (`src/app/api/chat/route.ts`, `src/app/api/lead/route.ts`,
  `src/components/demo-modal.tsx`). Toute nouvelle variable est ajoutée à
  `.env.example` avec un commentaire, et au `docker-compose.yml` si elle sert en
  production.
- Valeur par défaut autorisée pour un réglage non secret
  (`OPENROUTER_MODEL`) ; jamais pour un secret : l'absence de clé désactive la
  fonction proprement (503 de l'assistant, `forwarded: false` du formulaire).
- `NEXT_PUBLIC_*` est public et figé au build : jamais de secret sous ce
  préfixe.
- Constantes publiques du site (URL, coordonnées, mentions légales) :
  `src/lib/site.ts`.

## 6. Textes affichés et internationalisation

- Deux langues : français (racine, langue par défaut) et anglais (`/en`).
  Routage : `src/proxy.ts` ; utilitaires : `src/lib/i18n.ts`.
- Tout texte visible s'écrit `t("Français", "English")` — `getI18n()` côté
  serveur (`src/lib/i18n-server.ts`), `useI18n()` côté client
  (`src/components/locale-provider.tsx`). `t` accepte aussi du JSX
  (`src/app/[lang]/outils/quittance-de-loyer/page.tsx`).
- Données bilingues structurées : `{ fr, en }` résolues par une fonction de
  langue (`src/lib/tools.ts`, `getTool(slug, locale)`).
- Liens internes : `SmartLink` ou `href()` de `useI18n()` pour conserver
  `/en`. Pages françaises seulement : `src/lib/french-only.ts`.
- Documents générés (quittance, bail) : en français, langue juridique en Côte
  d'Ivoire, même depuis la version anglaise.
- Pas d'arabe ni de sens de lecture droite-gauche : les marges physiques
  (`ml-`, `pl-`) sont acceptées.

## 7. Tests

Aucun test automatisé : ni script `test`, ni Vitest/Jest/Playwright installés.
Un changement se vérifie par :

1. `npx tsc --noEmit` et `npm run lint` (0 erreur attendue) ;
2. `npm run build` (vérifie aussi les invariants de `src/lib/landings.ts`) ;
3. `node scripts/check-comparatif-en.mjs` si le comparatif change ;
4. une vérification dans le navigateur, en français **et** sous `/en`
   (compétence `run-site`).

Ajouter un framework de test est une décision d'architecture (ADR).

## 8. Taille et forme du code

- Une fonction nouvellement écrite vise moins de 50 lignes ; au-delà, se
  demander si un découpage est possible. Ce n'est pas une réécriture
  rétroactive du code existant.
- Un changement de comportement est accompagné d'au moins un test qui
  l'exerce — ici, faute de framework, d'une vérification reproductible décrite
  dans la PR (section 7).
- Pas de nouvelle erreur de typage ou de lint dans un fichier qui en était
  exempt.

## 9. Branches et commits

- Une branche `type/sujet` par changement, partant de `master`.
- Commits conventionnels (`feat(module): …`, `fix(module): …`,
  `docs: …`, `chore: …`), dans la langue du projet.
- Jamais de poussée directe ni forcée sur une branche protégée
  (main, master), jamais `--no-verify`.

## 10. Dette connue

Mesurée le 2026-09-27 sur `chore/acc-standard-v0.1.0` :

- `npx tsc --noEmit` : 0 erreur. `npm run lint` : 0 erreur, 0 avertissement
  (après l'exception `scripts/**/*.cjs` de `eslint.config.mjs`).
- Aucun test automatisé (section 7).
- Gros fichiers : `src/components/mockups.tsx` (~680 lignes),
  `src/lib/landings.ts` (~600), `src/components/tools/calculators.tsx` (~470),
  `src/components/tools/documents.tsx` (~450), `src/components/pricing.tsx`
  (~430). Ne pas les faire grossir sans raison.
- JSON-LD sans échappement de `<` dans `src/components/faq-page.tsx` et
  `src/components/landing-page.tsx` (voir `SECURITY.md`, points ouverts).
