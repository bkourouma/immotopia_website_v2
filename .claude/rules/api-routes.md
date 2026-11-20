---
paths:
  - "src/app/api/**/*.ts"
  - "src/lib/assistant/**"
  - "src/components/chat/**"
  - "src/components/demo-modal.tsx"
---

# Routes API, assistant et formulaire de démonstration

Surfaces sensibles du site. Détail et points ouverts :
`docs/governance/SECURITY.md` (§6 à §10 et §12). Convention Next des routes :
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`.

## Forme d'une route

- `export async function POST(request: Request)` dans
  `src/app/api/<nom>/route.ts` ; `/api` reste exclu du matcher de
  `src/proxy.ts`.
- Corps lu dans un `try/catch` → 400 si JSON invalide ; chaque champ vérifié
  (type, non vide, longueur bornée) ; seuls les champs attendus sont
  retransmis (`FIELDS` de `lead/route.ts`).
- Appel sortant avec `AbortSignal.timeout` (16 s par essai, trois essais maximum pour N8N ; 60 s pour
  OpenRouter) ; échec → 502 et `console.error("[nom] …")`, sans renvoyer le
  détail au client.
- Route publique = protection contre l'abus (limite de débit de
  `chat/route.ts`, champ piège `website` de `lead/route.ts`).

## Secrets

- `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `N8N_WEBHOOK_URL` : lus par
  `process.env` dans la route seulement. Variable absente → fonction
  désactivée proprement (503 pour l'assistant et pour le
  formulaire), jamais de valeur par défaut pour un secret.
- Rien de secret dans `src/components/**` ni sous `NEXT_PUBLIC_*`.
- Nouvelle variable → `.env.example` et `docker-compose.yml`.

## Assistant immotopIA

- Prompt système déterministe (`src/lib/assistant/prompt.ts`) : pas de date
  ni de valeur variable, pour le cache du fournisseur. La consigne de langue
  passe par `LOCALE_PROMPT`, pas dans le grand prompt.
- Connaissances : modifier `src/lib/assistant/knowledge.md` ; jamais
  `knowledge.generated.ts` (généré par `scripts/build-knowledge.mjs`, ignoré
  par git).
- Marqueurs d'action `[[DEMO]]` / `[[WHATSAPP]]` : dernière ligne seulement,
  interprétés par `src/components/chat/chat-widget.tsx`.
- Rendu : `src/components/chat/rich-text.tsx` uniquement (pas de HTML brut,
  liens `http(s)` seulement).

## Données personnelles

- Ne journaliser ni le contenu d'un message ni un champ de prospect.
- Nouvelle donnée collectée ou nouveau sous-traitant → mettre à jour
  `src/app/[lang]/confidentialite/page.tsx` en français et en anglais.

## Vérifier

`npm test` et `node --test scripts/test-seo-business-hooks.mjs` vérifient le contrat de réception et les exclusions statistiques. Puis `npm run build` et, en environnement isolé, `curl -X POST` sur
`http://localhost:3000/api/<nom>` avec un corps valide et un corps invalide
(compétence `run-site`), sans secret de production.


Réception durable (20 novembre 2026) : seules une authentification serveur et une réponse ACK corrélée autorisent le succès. La recette utilise des URL et credentials distincts, sans mesure SEO ni notification. Voir docs/FORM-RECEPTION.md.

