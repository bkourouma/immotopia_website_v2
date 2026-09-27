# Modèle de menace — site

En cas de désaccord avec [AGENTS.md](../../AGENTS.md), AGENTS.md prime. Ce
document décrit les mécanismes de sécurité **tels qu'implémentés
aujourd'hui**, avec leur fichier, pas un objectif. Il est lu par l'agent
`security-auditor` et par `/audit` : chaque contrôle listé ici doit pouvoir se
vérifier dans le code.

Le site est une vitrine publique sans compte, sans base de données et sans
téléversement. Sa surface d'attaque se résume à deux routes serveur :
`src/app/api/chat/route.ts` (assistant IA) et `src/app/api/lead/route.ts`
(formulaire de démonstration), plus le rendu des pages.

## 1. Actifs à protéger

- **Clé `OPENROUTER_API_KEY`** : donne accès au compte OpenRouter, donc au
  budget ; une fuite ou un abus se paie directement.
- **URL `N8N_WEBHOOK_URL`** : quiconque la connaît peut injecter des
  prospects dans Airtable et déclencher les e-mails du workflow n8n ; elle
  vaut secret.
- **Données de prospects** transmises par le formulaire : nom, société,
  e-mail, téléphone, rôle, structure, volume.
- **Conversations de l'assistant** : texte libre du visiteur, pouvant
  contenir des données personnelles.
- **Intégrité du discours commercial** : prix (`src/lib/pricing.ts`) et
  promesses fonctionnelles ; l'assistant ne doit pas en inventer.

## 2. Acteurs

| Acteur                   | Droits                                                            | Où c'est décidé                           |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------- |
| Visiteur anonyme         | lire toutes les pages, appeler `POST /api/chat` et `POST /api/lead` | aucune authentification ; `src/proxy.ts` exclut `/api` du routage des langues |
| Robot, script d'abus     | mêmes droits ; freiné par la limite de débit (chat) et le champ piège (lead) | `rateLimited()` de `chat/route.ts`, champ `website` de `lead/route.ts` |
| OpenRouter (tiers)       | reçoit le prompt système et la conversation                       | `chat/route.ts`                           |
| n8n (tiers)              | reçoit les demandes de démonstration                              | `lead/route.ts`                           |
| Exploitant (utilisateur) | déploie sur le serveur `alliance`, détient les `.env`             | `README.md`, `docker-compose.yml`         |

Aucun service tiers n'appelle le site (pas de webhook entrant).

## 3. Authentification

Sans objet : aucun compte ni session. Le lien « Connexion » renvoie vers
l'application `https://app.immotopia.cloud/login` (`src/lib/site.ts`,
redirections de `next.config.ts`), qui est un autre projet.

## 4. Autorisations et cloisonnement des données

Sans objet : le site ne stocke et ne relit aucune donnée par utilisateur.
L'historique de l'assistant reste dans le `sessionStorage` du navigateur
(`src/components/chat/chat-widget.tsx`, clé `immotopia-chat-v1`, 30 derniers
messages) et le serveur ne le conserve pas.

## 5. Fichiers privés

Sans objet : aucun téléversement. `public/` ne contient que des ressources
publiques. Les PDF des outils sont générés dans le navigateur (jsPDF,
`src/lib/document.ts`) et ne passent pas par le serveur.

## 6. Paiements et webhooks

Aucun paiement. Un seul webhook, **sortant** : `lead/route.ts` poste en JSON
vers `N8N_WEBHOOK_URL` (délai 8 s) les champs validés, plus `locale`,
`source: "site-vitrine"` et `receivedAt`. Pas de signature partagée : le
secret est l'URL elle-même. Sans URL, la demande est acceptée et non
transmise (`forwarded: false`, avertissement dans les journaux).

## 7. Assainissement des entrées et des sorties

**`POST /api/chat`** (`parseMessages`) :

- corps JSON avec `messages` (rôles `user` / `assistant` seulement, texte non
  vide), 20 derniers messages gardés ;
- message visiteur ≤ 1 500 caractères (400 sinon), tout message tronqué à
  6 000 ; le dernier doit venir du visiteur ;
- `locale` réduite à `"fr"` ou `"en"` ;
- réponse en flux texte brut (`text/plain`, `Cache-Control: no-store`), sans
  le raisonnement du modèle (`reasoning.exclude`), `max_tokens` 1 200 ;
- rendu côté client par `src/components/chat/rich-text.tsx` : Markdown
  minimal reconstruit en éléments React, liens limités à `http(s)://`, liens
  externes en `noopener noreferrer` ; aucun HTML injecté ;
- injection de consigne : le prompt (`src/lib/assistant/prompt.ts`) interdit
  de révéler les instructions ou de changer de rôle ; il ne contient que des
  informations publiques et le modèle n'a aucun outil ni accès aux données.

**`POST /api/lead`** :

- sept champs obligatoires (`structure`, `volume`, `role`, `name`,
  `company`, `email`, `phone`), chaînes non vides ≤ 200 caractères, e-mail
  vérifié par expression régulière ; seuls ces champs sont retransmis ;
- champ piège `website` rempli → réponse `ok` sans transmission.

**Pages** : `dangerouslySetInnerHTML` réservé au JSON-LD
(`src/components/json-ld.tsx` échappe `<` en `<`). Tout le contenu vient
de `src/lib/`, jamais d'une saisie visiteur.

## 8. Secrets et configuration

- Les secrets vivent dans des fichiers `.env` non commités ou dans le
  gestionnaire de secrets de l'hébergeur ; seul un `.env.example` sans valeur
  réelle est versionné.
- Les agents ne lisent ni n'écrivent les `.env` (règle d'`AGENTS.md`, refus
  dans `.claude/settings.json`).

Pas de point d'entrée central : `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` et
`N8N_WEBHOOK_URL` sont lus via `process.env` uniquement dans
`src/app/api/**/route.ts` (code serveur). Pas de validation au démarrage :
l'absence d'une variable désactive la fonction concernée. Seule
`NEXT_PUBLIC_BOOKING_URL` est exposée au navigateur, et elle est publique par
nature. En production, les valeurs viennent de
`/var/www/immotopia-site/.env` via `docker-compose.yml`.

Contrôle : `grep -rn "process\.env" src` ne doit montrer
`OPENROUTER_*` et `N8N_*` que dans `src/app/api/`.

## 9. Réseau

- Même origine pour les pages et l'API : pas de CORS.
- En-têtes de sécurité posés par nginx (`deploy/nginx-immotopia.cloud.conf`) :
  HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`. Pas de Content-Security-Policy.
  `next.config.ts` retire `X-Powered-By` et ne pose aucun autre en-tête.
- Limite de débit : `/api/chat` seulement, 25 requêtes par IP sur 10 minutes,
  en mémoire du processus (IP lue dans `x-real-ip` posé par nginx, puis
  `x-forwarded-for`). Le conteneur n'écoute que sur `127.0.0.1:3023`.
- `robots.ts` interdit `/api/` aux robots d'indexation.
- Corps de requête limités à 2 Mo par nginx.

## 10. Données personnelles

- Collectées : champs du formulaire de démonstration (transmis à n8n puis
  Airtable) et contenu des conversations (transmis à OpenRouter / DeepSeek).
- Journalisation : les routes ne journalisent que des erreurs techniques
  (`[chat]`, `[lead]`), jamais le contenu d'un message ni les champs d'un
  prospect. Exception à surveiller : `chat/route.ts` journalise le corps de la
  réponse d'erreur d'OpenRouter.
- Conservation et information : page `src/app/[lang]/confidentialite/page.tsx`
  (prospects 3 ans après le dernier contact, conversations non conservées
  côté serveur, sous-traitants cités). Toute nouvelle collecte ou tout nouveau
  sous-traitant se reporte dans cette page, en français et en anglais.

## 11. Conduite à tenir en cas de faille

1. Ne pas publier le détail de la faille dans un canal public (ticket, PR
   ouverte, message).
2. Prévenir le responsable du projet, Baba Kourouma (directeur de la
   publication, `src/lib/site.ts`), directement et hors canal public. Si la
   clé OpenRouter ou l'URL du webhook a fuité, c'est lui qui la révoque et la
   remplace dans le `.env` du serveur (jamais un agent).
3. Corriger sur une branche dédiée, avec une vérification reproductible de la
   faille (pas de framework de test : décrire la requête `curl` qui la montre).
4. Évaluer l'exposition (journaux, données touchées) et la documenter.

## 12. Points ouverts

Relevés le 2026-09-27, non corrigés :

| Priorité | Point | Fichier |
| -------- | ----- | ------- |
| Moyenne  | `/api/lead` n'a aucune limite de débit (seulement le champ piège) : un script peut remplir Airtable et, si le workflow n8n écrit à l'adresse saisie, faire envoyer des e-mails à des tiers. | `src/app/api/lead/route.ts` |
| Moyenne  | `/api/chat` accepte des messages `assistant` fournis par le client, jusqu'à 6 000 caractères chacun et 20 messages : une requête peut coûter bien plus que le plafond de 1 500 caractères du visiteur ne le laisse penser, et l'historique forgé facilite l'injection de consigne. | `src/app/api/chat/route.ts` |
| Basse    | La limite de débit du chat vit en mémoire (remise à zéro au redémarrage, vidée entièrement au-delà de 5 000 IP) et n'est pas partagée entre instances. | `src/app/api/chat/route.ts` |
| Basse    | JSON-LD sérialisé sans échapper `<` (contenu statique aujourd'hui, mais incohérent avec `json-ld.tsx`). | `src/components/faq-page.tsx`, `src/components/landing-page.tsx` |
| Basse    | Pas de Content-Security-Policy (ni nginx ni `next.config.ts`). | `deploy/nginx-immotopia.cloud.conf` |
| Basse    | Journalisation du corps d'erreur d'OpenRouter (peut contenir un extrait de la requête). | `src/app/api/chat/route.ts` |
