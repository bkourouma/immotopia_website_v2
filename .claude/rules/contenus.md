---
paths:
  - "src/lib/content.ts"
  - "src/lib/pricing.ts"
  - "src/lib/tools.ts"
  - "src/lib/landings.ts"
  - "src/lib/comparatif*.ts"
  - "src/lib/site.ts"
  - "src/lib/assistant/knowledge.md"
  - "scripts/*.mjs"
  - "scripts/*.py"
---

# Contenus, prix et comparatif

Les textes du site vivent dans `src/lib/`, pas dans les composants.

## Règle éditoriale

Présenter ce qui est en production et ce qui est en cours de développement
ou de déploiement (en le disant), **jamais de date de livraison**, jamais une
fonction qui n'existe nulle part (en-têtes de `src/lib/content.ts` et
`src/lib/landings.ts`). La même règle s'impose à l'assistant
(`src/lib/assistant/prompt.ts`).

## Sources de vérité

- Prix : `src/lib/pricing.ts` (FCFA hors taxes). Il alimente les cartes, le
  tableau, le simulateur **et** le prompt de l'assistant : un changement ici
  change ce que dit l'assistant.
- Outils gratuits : `src/lib/tools.ts` (textes `{ fr, en }`, slugs français
  dans les deux langues) ; une page par outil dans `src/app/[lang]/outils/`.
- Pages thématiques : `src/lib/landings.ts`, en français seulement ; chaque
  slug doit figurer dans `src/lib/french-only.ts` (sinon le build échoue).
- Coordonnées et mentions légales : `src/lib/site.ts`.

## Comparatif concurrentiel

- `src/lib/comparatif-data.ts` est **généré** par
  `python scripts/comparatif-from-excel.py <fichier.xlsx>` : ne pas le
  retoucher à la main.
- `src/lib/comparatif-data.en.ts` se met à jour à la main (même ordre,
  domaines, statuts, sources, références, URL ; seuls `feature`, `note`,
  `page`, `limit` sont traduits), puis :
  `node scripts/check-comparatif-en.mjs` (105 lignes et 19 sources au
  2026-09-27). Le hook de commit le lance quand l'un des deux fichiers est
  indexé.

## Base de connaissances de l'assistant

Modifier `src/lib/assistant/knowledge.md` ; `npm run dev` ou `npm run build`
régénère `knowledge.generated.ts` (ignoré par git).
