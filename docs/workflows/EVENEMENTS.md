# Module Événements — exploitation

Rubrique publique `/evenements` (français seulement), inscriptions sans compte, administration
`/admin/evenements`, export CSV. Premier événement : *Les Matinales de l'Immobilier Digital* (10 décembre 2026).

## Architecture (décidée faute d'existant)

Le site n'avait ni base de données, ni administration, ni service e-mail. Choix minimaux, sans nouvelle dépendance :

| Besoin          | Solution                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Stockage        | SQLite (`node:sqlite`, intégré à Node 24), fichier `EVENTS_DB_PATH`, migrations par `PRAGMA user_version` (`src/lib/events/db.ts`) |
| Capacité        | transaction `BEGIN IMMEDIATE` : les inscriptions sont sérialisées, jamais plus de places confirmées que la capacité |
| Administration  | mot de passe `EVENTS_ADMIN_PASSWORD` → cookie signé HMAC (`EVENTS_ADMIN_SECRET`), HttpOnly, SameSite=Strict, 8 h |
| E-mails         | API HTTP Resend (`RESEND_API_KEY`, `EVENTS_EMAIL_FROM`) ; sans clé, aucun e-mail, l'inscription reste valide |

Limite connue : SQLite sur un volume convient à **un seul conteneur** (c'est le cas de la production). Le limiteur de débit est
en mémoire. Passer à plusieurs instances demanderait une base partagée et un magasin de débit partagé.

## Variables d'environnement

Voir `.env.example`. `EVENTS_DB_PATH`, `EVENTS_ADMIN_PASSWORD` (≥ 12 car.), `EVENTS_ADMIN_SECRET` (≥ 24 car., aléatoire),
`RESEND_API_KEY`, `EVENTS_EMAIL_FROM` (adresse d'un domaine vérifié chez Resend), `EVENTS_EMAIL_REPLY_TO` (facultative).
Secrets lus côté serveur seulement. Sans les deux variables d'administration, `/admin/evenements` reste fermé.

## Premier événement

Idempotent (clé : slug `matinales-immobilier-digital-2026`), créé en **brouillon**, lieu **provisoire**, 30 places.

```bash
npm run events:seed                     # insère s'il manque, ne modifie rien sinon
node scripts/seed-events.ts --publish   # insère puis publie
node scripts/seed-events.ts --force     # remet le contenu aux valeurs d'origine (écrase les modifications)
```

En production (image sans `scripts/`) : se connecter à `/admin/evenements` ; si la base est vide, le bouton
« Initialiser l'événement des Matinales » crée l'événement. Puis **Publier** depuis la page de l'événement.
Le visuel est provisoire (`/images/hero/syndic.jpg`) : le remplacer par le visuel officiel (champ « Image »).

## Utiliser l'administration

1. Se connecter sur `/admin/evenements`.
2. Fiche d'un événement : boutons Publier / Dépublier / Archiver, Ouvrir ou fermer les inscriptions, Confirmer le lieu,
   Annuler l'événement, modification de la capacité, aperçu d'un brouillon (visible seulement connecté, jamais indexé).
3. Tableau de bord : inscrits, places confirmées / disponibles, liste d'attente, annulations, présents / absents,
   répartition par activité.
4. Inscriptions : recherche (nom, entreprise, e-mail), filtres activité et statut, Confirmer (refusé si la capacité est
   atteinte, sauf case « Forcer »), Annuler (libère les places), Présent / Absent, suppression définitive (effacement).
   La liste d'attente se traite à la main : après une annulation ou une hausse de capacité, cliquer **Confirmer** sur la
   personne concernée (un e-mail de confirmation part).
5. « Exporter en CSV » (séparateur `;`, UTF-8 avec BOM, ouvert directement par Excel ; respecte les filtres).
6. Programme et offre commerciale se modifient dans le formulaire (offre affichable ou masquable). L'offre est un contenu de
   communication : elle ne touche jamais à la facturation.

## Données personnelles

Consentements enregistrés à part (`event_consents`, datés, version de politique) : traitement (obligatoire) et
communications commerciales (facultatif, jamais précoché). Aucune donnée personnelle dans le journal d'administration
(`event_audit_log` : références seulement) ni dans les journaux applicatifs. Conservation : `retention_months` par événement
(24 par défaut). Purge : `npm run events:purge` (à planifier, ex. cron mensuel). Accès / export d'une personne :
`exportPersonalData(email)` dans `src/lib/events/service.ts` ; effacement : bouton de suppression en administration.

## Tester

```bash
npm test                    # dont tests/unit/events.test.ts (capacité, doublons, liste d'attente, CSV, e-mails, auth…)
npx tsc --noEmit && npm run lint && npm run build
```

Contrôle manuel : `EVENTS_DB_PATH=./data/test.db EVENTS_ADMIN_PASSWORD=… EVENTS_ADMIN_SECRET=… npm run dev`, puis
`npm run events:seed`, `/admin/evenements`, publication, inscription depuis `/evenements/<slug>`.

## Déploiement (jamais sans « oui » explicite de l'utilisateur)

`docker-compose.yml` monte le volume `immotopia-events` sur `/app/data` et transmet les variables ; ajouter les secrets au
`.env` du serveur, reconstruire l'image, relancer. Sauvegarder le volume (fichier `events.db` + `-wal`) comme toute donnée.
Configuration externe : domaine d'envoi vérifié chez Resend (SPF/DKIM), validation administrative de l'Hôtel Tiama (puis
« Confirmer le lieu »), visuel officiel de l'événement.

## À ne pas oublier

- Rappels avant l'événement : le modèle `reminder` existe (`src/lib/events/email.ts`), aucun envoi planifié n'est branché.
- Aucune campagne commerciale n'est envoyée par ce module ; le consentement commercial est seulement enregistré et exporté.
