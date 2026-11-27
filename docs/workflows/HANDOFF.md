# Passation de session â€” site

Carnet de reprise entre sessions d'agents. **Lire en premier** en dÃ©but de
session ; **mettre Ã  jour sans l'annoncer** avant de conclure tout tour en
plusieurs Ã©tapes (rÃ¨gle posÃ©e dans AGENTS.md et CLAUDE.md).

## Mode d'emploi

- Une section par branche, la plus rÃ©cente en haut. RÃ©Ã©crire la section de sa
  branche au lieu d'empiler des entrÃ©es : ce fichier dÃ©crit l'Ã©tat prÃ©sent, pas
  l'historique (l'historique, c'est `git log`).
- Supprimer la section d'une branche une fois fusionnÃ©e dans
  `main`.
- Dates absolues (`AAAA-MM-JJ`), jamais Â« hier Â».
- Chaque worktree a sa copie : en cas de conflit Ã  la fusion, garder les deux
  sections de branche, elles sont indÃ©pendantes.
- Le suivi anomalie par anomalie vit dans le bus d'agents (`.agent-bus/`), pas
  ici.
- Pas de secret, pas de donnÃ©e personnelle, pas de contenu de `.env`.

ModÃ¨le de section :

```markdown
## Branche `type/sujet` â€” AAAA-MM-JJ

**Ã‰tat :** en cours | prÃªt Ã  relire | bloquÃ©
**Dernier commit :** `abc1234` rÃ©sumÃ©

Fait :

- â€¦

Reste Ã  faire :

- â€¦

PiÃ¨ges et dÃ©cisions :

- â€¦
```

---

## Branche `codex/reception-formulaires-n8n` â€” 2026-11-20

**Ã‰tat :** prÃªt Ã  livrer aprÃ¨s revue indÃ©pendante ; configuration et recette E2E production restent au coordinateur.
**Base auditÃ©e :** `bc14f1fb12834914be6113dc09cf09d299b237b4` ; commit final et SHA dÃ©ployÃ© Ã  renseigner aprÃ¨s CI/fusion.

- UI conserve le calendrier et rend le formulaire accessible ; succÃ¨s uniquement sur reÃ§u corrÃ©lÃ©, rÃ©fÃ©rence affichÃ©e et rÃ©essai sans perdre les champs.
- Route authentifie les workflows production/recette, refuse l'ancien faux succÃ¨s sans N8N, borne les essais et rÃ©utilise un UUID canonique.
- Recette serveur distincte, aucun Ã©vÃ©nement SEO ou contact qualifiÃ© ; sessions navigateur ne gardent que UUID/date/empreinte24h.
- Variables compose et exemple, confidentialitÃ© FR/EN et modÃ¨le de menace mis Ã  jour ; aucune clÃ©, payload prospect ou modification du volume Ã©vÃ©nements.
- ContrÃ´les locaux : gÃ©nÃ©ration des types Next, TypeScript et lint rÃ©ussis ; npm test 93/93 ; routes/outboxes/inscriptions 15/15 ; revue indÃ©pendante des 23 rÃ©gressions de contrat rÃ©ussie.
- Restent : CI sur SHA final, configuration privÃ©e des workflows/MC par le coordinateur, E2E UIâ†’N8Nâ†’rÃ©ception retrouvable et contrÃ´le SHA.

## Branche `codex/public-build-sha` â€” 2026-11-20

**Ã‰tat :** prÃªt Ã  relire ; aucune fusion ni intervention serveur.
**Base :** `afab1e1` ; dernier commit de la branche : voir `git log -1`.

- `x-commit-sha` contient uniquement un SHA complet de 40 caractÃ¨res hexadÃ©cimaux minuscules, capturÃ© pendant le build Next ; aucune valeur inconnue ou invalide n'est publiÃ©e.
- Le workflow passe explicitement `GITHUB_SHA` Ã  Docker avant le build et contrÃ´le le label OCI de l'image, puis le header exact sur `/` en local et sur `https://immotopia.cloud/`. Le retour arriÃ¨re existant reste actif si ces contrÃ´les Ã©chouent.
- La CI dÃ©marre le serveur standalone construit avec une autre valeur de SHA Ã  l'exÃ©cution : le header doit conserver le SHA du build. Tests supplÃ©mentaires : SHA absent/invalide, valeur runtime ignorÃ©e, rÃ©ponse HTTP rÃ©elle absente/diffÃ©rente/doublÃ©e et erreur HTTP.
- ContrÃ´les locaux : `npm test` (70 tests), lint, typecheck, build (230 pages) et contrÃ´le HTTP du standalone sur `/` et `/en` rÃ©ussis avec un SHA runtime diffÃ©rent. La CI Linux rejoue le build et le contrÃ´le standalone.
- `/robots.txt` public est servi directement par nginx et n'atteste pas la version Next. Aucun header ajoutÃ© Ã  nginx, aucun secret ni contenu mÃ©tier modifiÃ©. Une construction manuelle sans argument SHA reste possible et n'expose aucune attestation.

## Branche `feat/module-evenements` â€” 2026-11-17

**Ã‰tat :** prÃªt Ã  relire (tsc, lint, 54 tests, build, parcours API et export CSV vÃ©rifiÃ©s en local) ; PR ouverte, rien de dÃ©ployÃ©.
**Dernier commit :** `4919de4` module d'inscription aux Ã©vÃ©nements

Fait : module Ã‰vÃ©nements complet (`src/lib/events/`, `/evenements`, `/admin/evenements`, `/api/events/*`, scripts `events:seed` / `events:purge`),
politique de confidentialitÃ© FR/EN mise Ã  jour, volume Docker et variables dans `docker-compose.yml` / `.env.example`.
Mode d'emploi : `docs/workflows/EVENEMENTS.md`.

Reste Ã  faire : choisir la branche et dÃ©finir les secrets sur le serveur ; dÃ©ployer
sur Â« oui Â» explicite ; exÃ©cuter l'initialisation puis publier l'Ã©vÃ©nement ; visuel officiel ; confirmer l'HÃ´tel Tiama ; vÃ©rifier l'envoi rÃ©el
d'e-mails (clÃ© Resend non testÃ©e) ; passage manuel de l'administration en navigateur (seulement testÃ©e par requÃªtes).

PiÃ¨ges : `@types/node` relevÃ© en ^24 (types de `node:sqlite`) ; `allowImportingTsExtensions` activÃ© car `src/lib/events/*` s'importe en `.ts`
(exÃ©cutÃ© aussi par Node pour les tests et scripts) ; SQLite = un seul conteneur ; `/admin` est exclu du proxy des langues.

## Branche `codex/immotopia-robots-et-maillage` â€” 2026-11-12

**Ã‰tat :** configuration nginx appliquÃ©e en production, modifications du site en validation.

- Le journal nginx du 12 novembre Ã  18:43 UTC confirme un 504 pour Googlebot sur `/robots.txt` : attente de l'en-tÃªte de Next.js sur le port 3023. Les deux tests en direct de Search Console signalaient un fichier robots inaccessible alors que les deux URL figuraient dÃ©jÃ  dans l'index.
- Nginx sert dÃ©sormais `/robots.txt` directement sur le domaine canonique. La configuration de rÃ©fÃ©rence contient la mÃªme rÃ¨gle. En cas de changement des directives, synchroniser avec `src/app/robots.ts`.
- Le site redirige l'ancien guide de choix vers son Ã©quivalent actuel et relie la page de gestion locative Ã  la page ERP.
- Reste Ã  confirmer sur la version dÃ©ployÃ©e : redirection 301, lien HTML et inspections en direct des deux URL.


## Branche `claude/issue-92` (PR #93) â€” 2026-11-04

**Ã‰tat :** fusion explicitement autorisÃ©e le 2026-11-04 ; nouvelle CI Ã  vÃ©rifier avant fusion.
**Dernier commit :** voir git log ; resynchronisation avec main d231662 pour la rÃ©solution consolidÃ©e.

- IntÃ¨gre #91, #83, #79 et main, avec conservation des ajouts des quatre PR. Introduction main prÃ©servÃ©e, une seule section par sujet et aucune question FAQ en double.
- check-landings (15 pages), npm test (30 tests), tsc, lint, check-comparatif-en (105 lignes/19 sources), npm run build (217 pages) rÃ©ussis.
- Navigateur sur build local, port 3293 : titre/H1 corrects, tableau 7 lignes, 9 FAQ uniques ; Ã  375 px, aucun dÃ©bordement global, tableau Ã  dÃ©filement horizontal (640 px dans 320 px).
- /en fonctionne en anglais ; /en/meilleur-logiciel-immobilier-cote-divoire renvoie 404, conforme Ã  cette page franÃ§aise uniquement. Aucun ajout de traduction non prÃ©vue.
- Relecture indÃ©pendante : aucun blocage. Prix, consentement WhatsApp et distinction loyers/charges restent sourcÃ©s et prÃ©cis.
- #79 dÃ©jÃ  fusionnÃ©e en squash (22988ee). #93 inclut les tÃªtes de #83 et #91 ; fusionner #93 avec un commit de fusion permet de conserver ces historiques sans trois dÃ©ploiements successifs.
- Autorisation explicite Â« fusionne Â» reÃ§ue dans ce chat. Fusion de #93 et suivi du dÃ©ploiement Ã  effectuer aprÃ¨s nouvelle CI verte.


## Branche `claude/issue-90` (PR #91) â€” 2026-11-04

**Ã‰tat :** conflits rÃ©solus, prÃªt pour la CI.
**Dernier commit :** rÃ©solution dans le commit courant (voir git log).

- IntÃ¨gre #83, #79 et main ; conserve le tableau Ã  sept critÃ¨res et le title de 63 caractÃ¨res. Une seule FAQ Mobile Money, distinguant enregistrement/dÃ©claration des loyers et paiement en ligne des charges.
- Aucun prix concurrent ni classement inventÃ© ; prix Agence issu de pricing.ts. Validation finale prÃ©vue sur #93 et CI de chaque PR.
- Fusion recommandÃ©e #79 â†’ #83 â†’ #91 â†’ #93 ; aucun dÃ©ploiement ni fusion main effectuÃ©.


## Branche `claude/issue-82` (PR #83) â€” 2026-11-04

**Ã‰tat :** conflits rÃ©solus, prÃªt pour la CI.
**Dernier commit :** rÃ©solution dans le commit courant (voir git log).

- IntÃ¨gre la rÃ©solution #79 et main ; conserve leurs liens et prÃ©cisions, ajoute la FAQ de choix sans supprimer les FAQ Mobile Money.
- check-landings et npm test passent sur #79 ; validation complÃ¨te prÃ©vue sur la chaÃ®ne consolidÃ©e #93 et CI de chaque PR.
- Fusion recommandÃ©e #79 â†’ #83 â†’ #91 â†’ #93 ; aucun dÃ©ploiement ni fusion main effectuÃ©.


## Branche `claude/issue-78` (PR #79) â€” 2026-11-04

**Ã‰tat :** conflits rÃ©solus, prÃªt pour la CI.
**Dernier commit :** rÃ©solution dans le commit courant (voir git log).

- Main intÃ©grÃ© ; section existante conservÃ©e avec les prÃ©cisions Mobile Money et consentement, ajout des portails, usage navigateur/PWA et prix publics, deux FAQ ajoutÃ©es sans doublon.
- ContrÃ´les : check-landings et npm test (30 tests) passent ; build, types, lint et navigateur restent Ã  vÃ©rifier sur la chaÃ®ne consolidÃ©e #79 â†’ #83 â†’ #91 â†’ #93.
- Aucun dÃ©ploiement ni fusion dans main. Conserver les changements main et fusionner les PR dans cet ordre, ou utiliser une fusion conservant l'historique de #93 qui inclut les branches prÃ©cÃ©dentes.


## Branche `docs/handoff-packs-patrimoine` â€” 2026-10-23

- Fait : lien Calendly corrigÃ© (`consultation-alliance-computer-consultants`, l'ancien `30min` Ã©tait
  dÃ©sactivÃ© : plan gratuit = un seul type d'Ã©vÃ©nement) dans `.env.example`, `docker-compose.yml`,
  `knowledge.md` ; repli avec les contacts (WhatsApp, tÃ©lÃ©phone, e-mail) quand le lien est invalide,
  via `src/app/api/booking/route.ts` (vÃ©rification serveur, cache 5 min).
- Reste : reconstruire l'image et redÃ©ployer (variable figÃ©e au build, dÃ©ploiement seulement sur Â« oui Â»
  explicite) ; `npm run build` et le repli en anglais non vÃ©rifiÃ©s ; cÃ´tÃ© Calendly, fuseau Abidjan et
  renommage de l'Ã©vÃ©nement.
## Branche `codex/correction-debordement-mobile` â€” 2026-11-04

**Ã‰tat :** correctif validÃ© ; fusion et dÃ©ploiement explicitement autorisÃ©s dans la conversation. RÃ©sultat opÃ©rationnel courant : [PR #98](https://github.com/bkourouma/immotopia_website_v2/pull/98).
**Dernier commit fonctionnel :** `9c24803` correction des grilles et maquettes de rÃ´les, basÃ© sur `82a1e89` (PR des polices locales #57 dÃ©jÃ  fusionnÃ©e et dÃ©ployÃ©e). Le prÃ©sent lot ne modifie que cette passation.

Fait :

- Cause reproduite sur l'accueil FR : maquette du directeur de 430 px dans un espace de 335 px ; document 450 px pour un viewport de 390 px, zone cliente 375 px. Une colonne bornÃ©e ramÃ¨ne le document Ã  375 px, sans masquer le dÃ©bordement global.
- Grille mobile explicite, pistes desktop Ã  minimum nul ; indicateurs empilÃ©s lorsque l'espace est Ã©troit. TÃ©lÃ©phone rÃ©ductible et colonne de visites qui revient Ã  la ligne : cela corrige aussi le dÃ©bordement transitoire du rÃ´le Sales agent en anglais Ã  768 px.
- **84 contrÃ´les navigateur rÃ©ussis** sur le vrai build prÃ©construit : FR/EN Ã  320, 360, 390, 430, 768, 1024, 1440 px ; les sept onglets de rÃ´les sont rÃ©ellement activÃ©s Ã  320, 390, 768, 1024, 1440 px. Largeur du document Ã©gale Ã  la largeur cliente dans chaque cas. Les tableaux larges restent dÃ©filables dans leur conteneur.
- 30 tests unitaires, lint, build de production et TypeScript rÃ©ussis. [CI fonctionnelle 41857711896](https://github.com/bkourouma/immotopia_website_v2/actions/runs/41857711896) rÃ©ussie sur `9c24803`.

Suite de reprise :

- Consulter le statut de fusion, le dÃ©ploiement et les mesures HTTPS finales dans la PR #98 ; ne pas relancer une PR dÃ©jÃ  fusionnÃ©e.
- Pour une nouvelle recette : comparer `document.documentElement.scrollWidth` et `clientWidth`, puis changer les rÃ´les. VÃ©rifier aussi le dÃ©filement interne du tableau du comptable, et le tÃ©lÃ©phone/les visites en anglais Ã  768 px.

PiÃ¨ges :

- Next 16.3.6 sous Windows prÃ©sente toujours une boucle du proxy FR, non reproduite dans les serveurs Linux. La recette locale utilise le HTML et les assets du vrai build prÃ©construit, avec hydratation et activation des onglets vÃ©rifiÃ©es. Le routage complet est vÃ©rifiÃ© par la CI Linux et en production aprÃ¨s dÃ©ploiement.
- Un clone placÃ© sous un rÃ©pertoire `node_modules` empÃªche Node de retirer les types TypeScript des tests ; la copie de travail de cette intervention a Ã©tÃ© dÃ©placÃ©e hors de ce rÃ©pertoire.
- Ne pas utiliser `overflow-x:hidden` sur toute la page comme substitut au dimensionnement des grilles : les donnÃ©es des tableaux doivent rester accessibles.


## Branche `seo/pages-patrimoine-promoteur` â€” 2026-10-23

**Ã‰tat :** prÃªt Ã  relire
**Dernier commit :** aucun (rien commitÃ©)

Fait :

- Deux landings SEO dans `src/lib/landings.ts` : `/logiciel-gestion-patrimoine-immobilier-cote-divoire` (mot-clÃ© Â« logiciel gestion de patrimoine immobilier Â») et `/logiciel-promoteur-immobilier-cote-divoire` (Â« logiciel promoteur immobilier Â»). DÃ©clarÃ©es dans `french-only.ts`, sitemap automatique, liens depuis les wiki correspondants, la landing CRM promoteur et la landing Â« logiciel immobilier Â» ; ajout dans `knowledge.md`.
- `scripts/check-landings.mjs` : contrÃ´le des landings (Ã©tape Â« Pages thÃ©matiques Â» de la CI ; pas de script dans `package.json`).

Volontairement omis :

- Patrimoine : pÃ©nalitÃ©s de retard, cautions et dÃ©pÃ´t de garantie, rÃ©partition des fonctions SCI par pack, espace particulier et ses paliers (pas de prix publiÃ©). Promoteur : rien sur la rÃ©servation de lots, l'Ã©chÃ©ancier ou le portail acquÃ©reur, hors une rÃ©ponse de FAQ qui le dit.

Ã€ arbitrer par le propriÃ©taire :

- Contradiction entre `pricing.ts` (pÃ©nalitÃ©s et dÃ©pÃ´ts de garantie rÃ©servÃ©s Ã  Agence et IntÃ©grÃ©) et le wiki / `knowledge.md` (qui les attribuent aussi aux packs Patrimoine).
- Les packs qui incluent entitÃ©s dÃ©tentrices, consolidation, fiscalitÃ© et export (wiki : Agence, Promoteur, IntÃ©grÃ©) face Ã  la cible SCI et diaspora.
- Le tableau de prix de la page patrimoine (3 colonnes) n'a pas Ã©tÃ© vÃ©rifiÃ© sur mobile ; gabarit commun non modifiÃ©.

---

## Branche `seo/ga4-consentement` â€” 2026-10-23

**Ã‰tat :** prÃªt Ã  relire (non commitÃ©)

Fait :

- Google Analytics 4 avec bandeau de consentement FR/EN (`src/components/consent/`, `src/lib/consent.ts`, `src/lib/ga.ts`). Identifiant de mesure `G-W0VCK0DK70`. Aucun appel Ã  Google ni cookie `_ga` avant Â« Accepter Â» ; chargÃ© seulement en production, sur `immotopia.cloud` et `www.immotopia.cloud` (jamais sur l'application ni un autre sous-domaine). Umami inchangÃ©.
- Choix mÃ©morisÃ© 182 jours (clÃ© `im_consent`), bouton Â« GÃ©rer mes cookies Â» / Â« Manage cookies Â» dans le pied de page, retrait = drapeau `ga-disable-<ID>` + effacement des cookies `_ga*`, `_gid`, `_gat*`.
- Politique de confidentialitÃ© FR et EN mise Ã  jour (Google Ireland Limited, cookies de 13 mois, destinataires), date 23 octobre 2026.
- `npm test` ajoutÃ© (`node --test`, 29 tests) et Ã©tape CI correspondante.

Reste Ã  faire :

- AprÃ¨s dÃ©ploiement : ouvrir le site en navigation privÃ©e, vÃ©rifier dans l'onglet RÃ©seau qu'aucune requÃªte vers googletagmanager.com ni cookie `_ga` n'existe avant Â« Accepter Â», puis qu'ils apparaissent aprÃ¨s, et disparaissent aprÃ¨s retrait via Â« GÃ©rer mes cookies Â» ; contrÃ´ler le temps rÃ©el dans GA4. VÃ©rifier l'affichage Ã  375 px.
- Faire valider le rÃ´le de Google (sous-traitant ou non) dans la politique.

PiÃ¨ges et dÃ©cisions :

- LibellÃ© EN du refus : Â« Decline Â» (choix prudent).

---

## Branche `claude/beautiful-volta-r4u2ul` â€” 2026-10-18

**Ã‰tat :** prÃªt Ã  relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- NouveautÃ©s de l'application `bkourouma/immotopia` du 2026-10-02 au 2026-10-17 reportÃ©es dans le wiki. Source : classeur `docs/fonctionnalites/ImmoTopia_Wiki_Fonctionnalites.xlsx` (849 â†’ 1046 lignes). Wiki datÃ© du 2026-10-18.
- 10 nouvelles fiches : signature Ã©lectronique, prÃ©lÃ¨vement bancaire, visio des assemblÃ©es, paiement en ligne des charges, AG par lien personnel, paiement d'un appel de charges, inventaire par WhatsApp, export des tableaux, documents Ã  en-tÃªte, application installable.
- Actions ajoutÃ©es aux fiches existantes : AG en direct, stock de chantier, ImmoCopilot, mandats, compromis, Ã©tats des lieux, portail copropriÃ©taire.
- Facturation dÃ©cidÃ©e par l'utilisateur le 2026-10-18 :
  - Signatures Ã©lectroniques : extension par bloc de 50 par mois, 5 000 FCFA HT, tous les packs. Aucune signature incluse.
  - Visio des assemblÃ©es : 10 000 FCFA HT par mois et par cabinet, Syndic ou IntÃ©grÃ©.
  - Inventaire WhatsApp : bloc de 500 photos, 25 000 FCFA HT par mois, Promoteur ou IntÃ©grÃ©.
  - Inclus sans commission : paiement en ligne des charges et prÃ©lÃ¨vement bancaire.
  - Inclus : export, application installable, documents Ã  en-tÃªte, AG en direct, contrÃ´le du stock.
- Toutes les nouveautÃ©s affichÃ©es Â« disponible Â», ImmoCopilot compris (dÃ©cision de l'utilisateur).
- Tarifs, accueil, Ã©cosystÃ¨me, pages thÃ©matiques, FAQ et assistant immotopIA (`knowledge.md`, `prompt.ts`) alignÃ©s.
- Page `/versions` : version 2.0.0 datÃ©e du 2026-10-17.
- VÃ©rifications : `tsc`, `lint`, `check-comparatif-en` et `npm run build` OK. Pas de tests automatisÃ©s.

Reste Ã  faire :

- Aligner le catalogue de l'application (`packages/api/src/lib/subscription/catalog.ts`, dÃ©pÃ´t `bkourouma/immotopia`). Il porte encore des quotas de signatures inclus provisoires (Agence 20, Syndic 50, Promoteur 20, IntÃ©grÃ© 100), un bloc de 50 sans prix et non vendable, et pas d'extension Visio des assemblÃ©es. Ce dÃ©pÃ´t n'est pas modifiable depuis cette session.
- CrÃ©er le tag `v2.0.0` cÃ´tÃ© application, comme pour les versions prÃ©cÃ©dentes.
- Paiement de loyer par lien (`portails-clients/paiement-loyer-par-lien`, `portail-locataire`) : encore en Â« dÃ©ploiement Â», non traitÃ©.
- Points non bloquants relevÃ©s en relecture :
  - 14 rÃ©sumÃ©s (summary) hors de la plage 140-160 caractÃ¨res, dans des fiches non touchÃ©es.
  - Packs d'ImmoCopilot : 6 dans le wiki, 4 dans le classeur, Ã  confirmer.
  - Â« courriers Â» dans la fiche documents-a-en-tete : la source cite avis, convocations, quittances et comptes rendus.

PiÃ¨ges et dÃ©cisions :

- Chantier orchestrÃ© (skill chef-orchestre) : lots dans des copies de travail locales, fusionnÃ©s dans la branche avec `--no-ff`.
- `package.json` et `package-lock.json` modifiÃ©s par l'installation de l'environnement cloud. MarquÃ©s `assume-unchanged` en local. Jamais commitÃ©s.
- Le wiki ne cite aucun prix : il renvoie vers /tarifs. `pricing.ts` reste la source.

---

## Branche `claude/stoic-goldberg-jrcsmh` â€” 2026-10-18

**Ã‰tat :** prÃªt Ã  relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- Skill `chef-orchestre` installÃ© au niveau projet (`.claude/skills/chef-orchestre/`) avec ses cinq agents (`.claude/agents/` : `chef-de-lot`, `executant`, `executant-rapide`, `expert`, `verificateur`), copiÃ©s tels quels depuis l'archive fournie par l'utilisateur.

PiÃ¨ges et dÃ©cisions :

- InstallÃ© dans le dÃ©pÃ´t plutÃ´t que dans `~/.claude` (prÃ©vu par `installer.ps1`) : les sessions cloud sont Ã©phÃ©mÃ¨res.
- Ã‰carts du skill avec AGENTS.md, qui prime : il copie les fichiers `.env` dans les worktrees (interdit sans Â« oui Â» explicite), suppose `gh` (absent en session cloud : passer par les outils GitHub MCP) et nomme ses branches `orch/â€¦`.

---

## Branche `claude/admiring-fermat-b2y2rr` â€” 2026-10-15

**Ã‰tat :** prÃªt Ã  relire (PR brouillon vers `main`)
**Dernier commit :** voir `git log`

Fait :

- Page bilingue `/versions` (historique des versions de l'application), donnÃ©es dans `src/lib/releases.ts`, ajoutÃ©e au sitemap.
- Pied de page : colonne Â« Produit Â» scindÃ©e en Â« Produit Â» et Â« Ressources Â» (`footerColumns` de `content.ts`, champ `footerColumn` de `NavLink`) ; Â« Historique des versions Â» ajoutÃ© au menu Ressources (FR et EN).
- Versions validÃ©es par l'utilisateur : v1.0.0 datÃ©e du 2025-04-15, v1.1.0 du 2026-04-15, v1.2.0 et v1.3.0 placÃ©es entre les deux, dates rÃ©elles Ã  partir de v1.4.0.

Reste Ã  faire :

- Tags et releases de `bkourouma/immotopia` : la poussÃ©e de tags est refusÃ©e (403) par le proxy de la session cloud ; l'utilisateur lance le script `creer-releases-immotopia.sh` fourni dans la conversation.
- Nouvelle version de l'application : ajouter une entrÃ©e en tÃªte de `src/lib/releases.ts` et le tag correspondant.

PiÃ¨ges et dÃ©cisions :

- `package.json` / `package-lock.json` modifiÃ©s par l'installation de l'environnement cloud : non commitÃ©s.

---

## Branche `ci/deploiement-auto` â€” 2026-10-13

**Ã‰tat :** prÃªt Ã  relire (PR vers `main`) ; la fusion dÃ©clenche le premier dÃ©ploiement automatique
**Dernier commit :** voir `git log`

Fait :

- Branche `main` crÃ©Ã©e Ã  partir de `feat/accueil-audit-marketing` (qui contient toutes les autres branches), devenue la branche par dÃ©faut.
- `ci.yml` : sur pull request, et appelÃ© par `deploy.yml` ; `deploy.yml` : vÃ©rifications puis dÃ©ploiement sur le runner `immotopia-site` du serveur alliance (rsync hors `.env`, `docker compose up -d --build`, contrÃ´le de santÃ©, retour arriÃ¨re automatique). `deploy/install-runner.sh` installe le runner.
- README, RUNBOOK et AGENTS.md Ã  jour (retour arriÃ¨re, secours manuel).

PiÃ¨ges et dÃ©cisions :

- La production tournait sur le code de la PR nÂ°2 ; la PR nÂ°3 (7 rÃ´les sur l'accueil) n'Ã©tait pas dÃ©ployÃ©e : elle part au premier dÃ©ploiement automatique.
- Protection de branche : exiger une PR pour `main` est un rÃ©glage GitHub Ã  faire par l'utilisateur.

---

## Branche `claude/lucid-turing-ug7vub` â€” 2026-10-02

**Ã‰tat :** prÃªt Ã  relire
**Dernier commit :** voir `git log`

Fait :

- Section Â« Ã€ chaque rÃ´le Â» de l'accueil : 7 onglets au lieu de 3 (ajout Gestionnaire, PropriÃ©taire, Locataire, CopropriÃ©taire) dans `content.ts` (`roles`, FR/EN), `roles.tsx` (aperÃ§u `ListVisual`, lien de comparatif) et `nav.ts` (ancres `#roles-â€¦`). Contenus tirÃ©s du wiki (portails Â« disponible Â»).
- `tsc`, `lint` et `build` OK ; 7 onglets cliquÃ©s en FR et EN, bureau et mobile (Playwright), sans dÃ©bordement.

Reste Ã  faire :

- Relire les textes.

---

## Branche `feat/packs-patrimoine-wiki` â€” 2026-10-02

**Ã‰tat :** fusionnÃ©e (PR nÂ°1) dans `feat/accueil-audit-marketing`, dÃ©ployÃ©e en production le 2026-10-02
**Dernier commit :** `f038dff` (aprÃ¨s `2d452fe`)

Fait :

- `pricing.ts` : 6 packs (ajout de Patrimoine Essentiel, 9 900, et Patrimoine Pro, 29 900 FCFA HT/mois), extensions Ã  la carte, rÃ¨gles commerciales (TVA 18 % Alliance Consultants, dÃ©passement facturÃ© et non bloquÃ©), remise de combinaison calculÃ©e sur le prix de base du pack le moins cher. Comparatif Ã  6 colonnes, grille sur 3 colonnes, bloc Â« Extensions Ã  la carte Â» (`pricing.tsx`), page Tarifs, FAQ (`landings.ts`), assistant (`prompt.ts`, `knowledge.md`) alignÃ©s.
- Â« Valeur nette et projections consolidÃ©es Â» annoncÃ©es Â« bientÃ´t (en dÃ©veloppement) Â» : non livrÃ©es (dÃ©veloppements non fusionnÃ©s cÃ´tÃ© application). Les paliers Particulier gratuit/plus ne sont pas sur Tarifs.
- Wiki resynchronisÃ© sur l'inventaire `Immobillier/docs/ImmoTopia_Wiki_Fonctionnalites.xlsx` (846 lignes) : 130 fonctionnalitÃ©s, 835 actions, statut Â« En dÃ©veloppement Â» (`types.ts`, `index.ts`, `wiki-ui.tsx`), nouveaux domaines `patrimoine-multi-actifs` et `administration-plateforme`. Reversements, honoraires, comptes propriÃ©taires et mandats limitÃ©s Ã  Agence et IntÃ©grÃ© ; packs Patrimoine ajoutÃ©s aux fonctions CORE.
- Mesure d'audience Umami (`analytics.tsx`) et page confidentialitÃ© embarquÃ©es dans la mÃªme PR.
- Garde de dÃ©ploiement levÃ©e : `acc.config.json` ne bloque plus `ssh`/`scp` vers `alliance` ; `AGENTS.md`, `RUNBOOK.md` et `run-site` disent qu'un agent ne dÃ©ploie qu'avec un Â« oui Â» explicite de l'utilisateur, demandÃ© avant chaque dÃ©ploiement.
- DÃ©ploiement selon le README : image de retour arriÃ¨re `immotopia-site:avant-packs-20261002`, archive `~/immotopia-site-avant-packs-20261002.tgz` sur le serveur. ContrÃ´le en 200 de `/tarifs`, `/en/tarifs`, `/wiki`, `/faq`, `/wiki/patrimoine-multi-actifs`, `/wiki/administration-plateforme` ; wiki en ligne Ã  130 fonctionnalitÃ©s.
- VÃ©rifications : `tsc --noEmit`, `npm run lint` et `npm run build` OK. Le site n'a aucun test automatisÃ© ; le wiki n'a pas Ã©tÃ© relu texte par texte.

Reste Ã  faire :

- Recouper les prix avec `packages/api/src/lib/subscription/catalog.ts` (non accessible depuis ce dÃ©pÃ´t : valeurs reprises de la demande).
- Le simulateur ne couvre pas les packs Patrimoine.
- Deux choix de packs Ã  confirmer dans le wiki : maintenance (Agence, Syndic, Promoteur, IntÃ©grÃ© seulement, comme dans l'inventaire) et les 9 fonctionnalitÃ©s Â« Agence et abonnement Â» (packs Patrimoine ajoutÃ©s par cohÃ©rence).
- Deux rÃ©sumÃ©s du wiki hors de la plage de 140 Ã  160 caractÃ¨res (162 et 139).
- `/en/wiki` rÃ©pond 404 : le wiki est en franÃ§ais seulement.
- `.claude/settings.json` porte encore, en local, des rÃ¨gles `Edit(...)` temporaires (non commitÃ©es) Ã  retirer.
- La branche distante `feat/packs-patrimoine-wiki` peut Ãªtre supprimÃ©e (sur demande de l'utilisateur).

PiÃ¨ges et dÃ©cisions :

- `lefthook.exe` est bloquÃ© par Smart App Control sur cette machine ; l'utilisateur l'a dÃ©sactivÃ© pour que les hooks pre-commit et pre-push s'exÃ©cutent.
- `gh pr merge` est refusÃ© aux agents par le contrÃ´le d'autorisation de la session : la fusion se fait depuis GitHub ou avec une rÃ¨gle de permission explicite.
- La branche par dÃ©faut du dÃ©pÃ´t GitHub est `feat/accueil-audit-marketing` (pas de `master`).

---

## Branche `feat/accueil-audit-marketing` â€” 2026-09-28

**Ã‰tat :** dÃ©ployÃ© en production le 2026-09-28
**Dernier commit :** `fd61d19`

Fait :

- Audit marketing de l'accueil (10 fichiers), y compris la suppression de la formule Â« le plus complet Â».
- Premier Ã©cran : titre, accroche et deux CTA (Â« RÃ©server une dÃ©mo de 30 min Â», Â« Voir les tarifs Â») au-dessus du
  carrousel ; sections rÃ©ordonnÃ©es (tarifs avant comparatif et outils) ; reformulations FR/EN dans `content.ts`,
  `final-cta.tsx`, `marquee.tsx`.
- `AGENTS.md` et `CLAUDE.md` (ici et dans le dossier parent) disent que le projet et le dÃ©pÃ´t git sont dans `site/`.
- VÃ©rifications : `npm run build` OK, `npm run lint` sans erreur, `tsc --noEmit --incremental false` sans erreur,
  alignement des traductions anglaises, `check-comparatif-en.mjs`. Le site n'a aucun test automatisÃ©.
- DÃ©ploiement selon la procÃ©dure du README : image de retour arriÃ¨re `immotopia-site:avant-accueil-20260928` ;
  archive de l'ancien dossier `~/immotopia-site-avant-accueil-20260928.tgz` sur le serveur ; tarball transfÃ©rÃ©
  vers `/var/www/immotopia-site/`, puis `docker compose up -d --build`.
- Pages contrÃ´lÃ©es en 200 : `/`, `/en`, `/tarifs`, `/contact`, `/wiki`, `/robots.txt`, `/sitemap.xml` ;
  aucune erreur dans les journaux.
- Images de retour plus anciennes encore prÃ©sentes : `avant-email`, `avant-menu`, `avant-icone`, `avant-wiki`.

Reste Ã  faire :

- Non traitÃ© de l'audit : calendrier de rÃ©servation en anglais (iframe Calendly, Ã  rÃ©gler cÃ´tÃ© Calendly), carte
  tarifaire Promoteur Ã  aligner sur la FAQ (`pricing.ts`), nuance Â« fonctions annoncÃ©es publiquement Â» Ã  cÃ´tÃ©
  des scores du comparatif, parcours par mÃ©tier, bouton de la carte Â« loyers Â» qui mÃ¨ne encore Ã  la section rÃ´les.
- Aucune copie distante du code (pas de remote git) : dÃ©cision de l'utilisateur sur l'hÃ©bergement du dÃ©pÃ´t.
- La branche n'est pas fusionnÃ©e dans une branche principale.

PiÃ¨ges et dÃ©cisions :

- `npx tsc --noEmit` peut passer grÃ¢ce au cache incrÃ©mental alors que `next build` Ã©choue : vÃ©rifier avec
  `--incremental false` ou `npm run build`.

---

## Branche `feat/wiki-fonctionnalites` â€” 2026-09-27

**Ã‰tat :** tout est en production (wiki, dÃ©filement, icÃ´ne, logos texte, menu Ã  sous-menus, formulations, e-mail support@immotopia.cloud)
**Dernier commit :** `d2a4818` Contact : adresse e-mail support@immotopia.cloud
(`lancement-site-v2` = `d2a4818` ; `55dc15e` logos, `c050786` menu, `eb963a9` formulations)

DÃ©ploiement (fait par la session Pilote, Ã  la demande de l'utilisateur) :

- `53b59d9` en production sur immotopia.cloud depuis le 2026-09-27 14:57 UTC (tarball puis
  `docker compose up -d --build`) : conteneur sain, `/wiki` et les fiches en 200, 95 URL wiki dans le sitemap.
- Retour arriÃ¨re possible : image `immotopia-site:avant-wiki-20260927` et
  `~/immotopia-site-avant-wiki-20260927.tgz` sur le serveur.
- `3582c86` (dÃ©filement + icÃ´ne) en production le 2026-09-27 vers 15:50 UTC : conteneur sain,
  `/icon.png` 200, `/icon.svg` 404, `/apple-icon.png`, `/images/logo/icone.png`, `/opengraph-image` 200,
  `<html data-scroll-behavior="smooth">`, navigation depuis le bas de `/wiki` â†’ nouvelle page Ã  `scrollY` 0.
  Retour arriÃ¨re : image `immotopia-site:avant-icone-20260927`.
- `9b30cbd` (logos texte, menu Produit / Comparatif / Ressources / Tarifs, Â« le plus complet utilisÃ© en
  CÃ´te d'Ivoire Â», Â« trois logiciels similaires Â») en production le 2026-09-27 vers 17:12 UTC : conteneur
  sain ; menu complet sans dÃ©bordement Ã  1024 et 1280 px ; Produit et Ressources ouvrent 4 liens chacun ;
  `/images/logo/logo-immotopia-nom-inverse.png` 200 ; titre de l'accueil avec Â« utilisÃ© en CÃ´te d'Ivoire Â».
  Retour arriÃ¨re : image `immotopia-site:avant-menu-20260927`.
- `d2a4818` (e-mail de contact `support@immotopia.cloud` au lieu de `immotopia@allianceconsultants.net`,
  via `contact.email` de `src/lib/site.ts` et `knowledge.md`) en production le 2026-09-27 vers 18:50 UTC :
  `/contact` affiche la nouvelle adresse, conteneur sain. Retour arriÃ¨re : image `immotopia-site:avant-email-20260927`.
- PiÃ¨ge : `c050786` ne passait pas `next build` (tsc : `footerProductLinks` typÃ© `NavChild[] | NavLink[]`)
  alors que `npx tsc --noEmit` local passait grÃ¢ce au cache incrÃ©mental (`tsconfig.tsbuildinfo`). Avant un
  dÃ©ploiement, vÃ©rifier avec `npx tsc --noEmit --incremental false` ou `npm run build`.

Fait (dans `e2df911` / `53b59d9`) :

- `/wiki` (accueil + recherche), `/wiki/<domaine>` (10), `/wiki/<domaine>/<fonctionnalite>` (84) :
  539 actions, franÃ§ais seulement, pages statiques (`dynamicParams = false`), 404 sous `/en`.
- DonnÃ©es : `src/lib/wiki/<domaine>.ts` (un fichier par domaine), types dans `types.ts`, assemblage,
  libellÃ©s et contrÃ´les au build dans `index.ts`. Composants : `src/components/wiki/`.
- Source : `docs/ImmoTopia_Wiki_Fonctionnalites.xlsx` (dossier parent), rÃ©Ã©crit pour le public :
  super-admin, routes, permissions, lignes Â« Ã€ vÃ©rifier Â» et notes de sÃ©curitÃ© Ã©cartÃ©es.
- `french-only.ts` : `frenchOnlyPrefixes` (`/wiki`) + `isFrenchOnly()`, utilisÃ© par `switchLocalePath`.
- Sitemap, lien Â« Wiki Â» dans le menu FR, lien depuis la FAQ, section Â« Wiki Â» dans `knowledge.md`,
  consigne `/wiki` en franÃ§ais dans `LOCALE_PROMPT.en` (`prompt.ts`), composant `JsonLd` exportÃ© de `json-ld.tsx`.

En production depuis ~15:50 UTC (`16a1b8d` dÃ©filement, `3582c86` icÃ´ne) :

- `data-scroll-behavior="smooth"` sur `<html>` (`src/app/[lang]/layout.tsx`) : sans lui, Next 16 ne coupe
  plus le dÃ©filement fluide de `globals.css` pendant un changement de page, et chaque page s'ouvrait Ã  la
  position de la prÃ©cÃ©dente (souvent en bas). ConstatÃ© en production sur `/wiki`, touche toutes les pages.
- Nouvelle icÃ´ne (maison en cubes) : `public/images/logo/icone.png` (composant `Logo` de `ui.tsx`, image
  Open Graph), `src/app/icon.png` (remplace `icon.svg`, supprimÃ©), `src/app/apple-icon.png` (fond blanc).
  `src/proxy.ts` : `icon.svg` â†’ `icon.png` dans le matcher. Source : `../docs/logos/`.

Reste Ã  faire :

- Logos texte (non commitÃ©s, non dÃ©ployÃ©s, vÃ©rifiÃ©s en local : `tsc`, `lint`, navigateur de 375 Ã  1536 px) :
  `public/images/logo/logo-immotopia(-inverse).png` (fournis, avec slogan) et `logo-immotopia-nom(-inverse).png`
  (dÃ©coupÃ©s sans slogan, 953 Ã— 189). `Logo` (`ui.tsx`) : icÃ´ne + nom en image, `onLight` (bleu marine) ou
  inverse (blanc) ; `full` = logo avec slogan (pied de page). Image Open Graph : nom en image.
  CommitÃ© en `55dc15e`, pas encore dÃ©ployÃ©.
- Menu rÃ©organisÃ© (non commitÃ©, vÃ©rifiÃ© en local de 375 Ã  1280 px, FR et EN) : Â« Produit â–¾ Â· Comparatif â–¾ Â·
  Ressources â–¾ Â· Tarifs Â» (choix de l'utilisateur). `navLinks` (`content.ts`) : `children`, `footer` (lien mis
  en avant), `wide` (deux colonnes) ; Produit = FonctionnalitÃ©s, RÃ´les, Ã‰cosystÃ¨me, Wiki ; Ressources = Wiki,
  Outils gratuits, FAQ, Contact (EN : Free tools, Contact). RangÃ©e complÃ¨te dÃ¨s `lg` (1024 px), menu compact
  en dessous. Pied de page : `footerProductLinks()` (menu Ã  plat, sans doublon ni Contact).
- Relecture humaine des textes du wiki, surtout les statuts (voir ci-dessous).

PiÃ¨ges et dÃ©cisions :

- Statuts alignÃ©s sur `knowledge.md` (Â« DisponibilitÃ© Â», 23/09), pas sur l'Excel qui dit Â« Disponible Â»
  dÃ¨s que le code existe : Promoteur/chantiers, finance opÃ©rationnelle, offres/compromis/commissions de vente,
  vie du bail, Ã©tats des lieux, honoraires/reversements/compte courant, paiement en ligne = Â« en cours de
  dÃ©ploiement Â». Changer un statut : champ `status` de la fonctionnalitÃ© ou de l'action.
- Pas de gÃ©nÃ©rateur (contrairement au comparatif) : les textes sont rÃ©digÃ©s, l'Excel est une matiÃ¨re premiÃ¨re.

---

## Branche `chore/acc-standard-v0.1.0` â€” 2026-09-27

**Ã‰tat :** prÃªt Ã  relire (rien n'est commitÃ© depuis `421bbd4`)
**Dernier commit :** `421bbd4` Architecture agentique : configuration acc-standard

Fait :

- Standard `acc-standard` 0.1.0 posÃ© (profils base, node), puis adaptÃ© par
  `/acc-adapt` : `AGENTS.md` (hors blocs gÃ©rÃ©s), `CLAUDE.md` (table de
  chargement), `RUNBOOK.md`, `CODING_STANDARDS.md`, `SECURITY.md`,
  `ADR-000-template.md`, `.claude/rules/review-checklist.md`,
  `.claude/skills/run-site/SKILL.md`, `.github/workflows/ci.yml`.
- RÃ¨gles par chemin crÃ©Ã©es : `.claude/rules/nextjs-i18n.md`,
  `api-routes.md`, `contenus.md`.
- `acc.config.json` : `ports.web` 3000, description, `guard.protectedPaths`
  Ã©tendu (scripts, deploy, docs, .claude, .acc), refus de `ssh alliance` et
  `scp|rsync â€¦ alliance:`, contrÃ´le de commit `check-comparatif-en`.
- `eslint.config.mjs` : `no-require-imports` dÃ©sactivÃ©e pour
  `scripts/**/*.cjs` (les 9 erreurs de lint venaient des scripts du standard).
- `Dockerfile` : copie `scripts/install-git-hooks.cjs` avant `npm install`
  (le `prepare` ajoutÃ© par le standard cassait l'Ã©tape `deps`).
- Dette mesurÃ©e : `tsc` 0 erreur, `lint` 0 erreur, `build` OK (50 pages),
  comparatif alignÃ© (105 lignes, 19 sources). Pas de tests automatisÃ©s.
- `doctor` : sain.

Reste Ã  faire :

- Relire puis commiter l'installation et l'adaptation (utilisateur ou Pilote).
- VÃ©rifier l'image Docker (`docker build`) : Docker Desktop Ã©tait arrÃªtÃ©,
  seule l'Ã©tape `prepare` a Ã©tÃ© simulÃ©e hors dÃ©pÃ´t git.
- Points ouverts de sÃ©curitÃ© : `docs/governance/SECURITY.md` Â§12 (pas de
  limite de dÃ©bit sur `/api/lead`, messages `assistant` forgÃ©s acceptÃ©s par
  `/api/chat`, JSON-LD non Ã©chappÃ© dans deux composants).
- La CI ne tournera qu'une fois un remote GitHub configurÃ©.

PiÃ¨ges et dÃ©cisions :

- Les fichiers gÃ©rÃ©s (voir `.acc/manifest.json`) ne se modifient pas
  localement : `npx github:bkourouma/ACC-STANDARD-ARCHITECTURE update` les
  remplacerait ou signalerait un conflit.
- `npx tsc --noEmit` sur un checkout neuf exige
  `node scripts/build-knowledge.mjs && npx next typegen` d'abord.
- Worktree avec `node_modules` en jonction : Turbopack refuse de construire.
- Le bloc `BEGIN:nextjs-agent-rules` d'`AGENTS.md` est rÃ©Ã©crit par
  `next dev` : ne pas y toucher.

## 2026-11-02 â€” Refonte mobile-first (branche `orch/2026-11-02-mobile-first`)

- Fait : socle (navbar/menu, modales, chat, flottants, globals.css), accueil (hero, maquettes, tarifs, rÃ´les, Ã©cosystÃ¨me), outils/comparatif/wiki/FAQ/lÃ©gal. Principe : mobile d'abord, desktop (â‰¥ md) inchangÃ© (prÃ©fixes `max-md:`, `md:min-h-0`â€¦).
- VÃ©rifiÃ© : `tsc`, `lint`, `build`, `check-comparatif-en` OK. **Non vÃ©rifiÃ©** : aucun rendu navigateur (360/390 px, 768 px, desktop) â€” recette visuelle Ã  faire.
- Ã€ surveiller : rÃ¨gle `font-size:16px !important` des champs sous 640 px ; maquettes du hero en mode compact (hauteur < 300) ; carte tarifaire recommandÃ©e non remontÃ©e en premier sur mobile (dÃ©cision Ã©ditoriale).



## 2026-11-26 â€” UI/UX de l'administration des Ã©vÃ©nements

- Fait : refonte visuelle de `/admin/evenements` (liste, dÃ©tail, nouveau, connexion) : barre d'administration, KPI, badges de statut, jauge de remplissage, navigation par ancres, aides sous les champs, barre d'enregistrement collante. Fichiers : `src/components/events/admin-ui.tsx`, `src/app/admin/evenements/**`.
- VÃ©rifiÃ© : `tsc` et `eslint` Ã  0 erreur. Non vÃ©rifiÃ© : rendu navigateur (accÃ¨s protÃ©gÃ© par mot de passe), `npm run build`.
- Branche `fix/accueil-lieu`, rien de commitÃ©.

- 2026-11-26 (suite) : 2e passe visuelle admin événements : barre sombre, bandeau Hero en dégradé, indicateurs chevauchant le bandeau, sections de formulaire numérotées. Vérifié en local (port 3111, mot de passe de test, base temporaire) ; tsc et eslint à 0 erreur. Non déployé.

- 2026-11-26 (accueil) : bandeau événement : compte à rebours (jours/heures/min/s) + places restantes réelles (`capacity - confirmedSeats - directSeats`). Colonne `direct_seats` ajoutée sur `events` (initialisée à 10 pour `matinales-immobilier-digital-2026` en migration SQLite et `seed-data.ts`, modifiable dans `/admin/evenements`), soit `30 - x - 10` (`16/30` pour `x = 4`). Fichiers : `src/lib/events/{db,types,seed-data,service,event-form}.ts`, `src/components/events/admin-ui.tsx`, `src/app/admin/evenements/**`, `tests/unit/events.test.ts`.
