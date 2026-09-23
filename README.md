# ImmoTopia — Site vitrine

Next.js 16 (App Router) · Tailwind CSS 4 · Framer Motion · GSAP.

## Lancer le site

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # version production
```

## Modifier le contenu

Tous les textes (7 cartes du carrousel, partenaires, rôles, offres) sont dans `src/lib/content.ts`.
Pour afficher un prix, remplacez `price: null` par par exemple `price: "75 000 FCFA", period: "/ mois"`.

## Réservation de démo et pipeline n8n

Copiez `.env.example` en `.env.local` puis renseignez :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Lien public Cal.com / Calendly. S'il est rempli, la fenêtre « Demander une démonstration » affiche le calendrier. Les questions de qualification et le webhook n8n se configurent alors dans Cal.com. |
| `N8N_WEBHOOK_URL` | Utilisé par le formulaire intégré (affiché quand aucun lien de réservation n'est défini). Chaque demande est envoyée à ce webhook, qui alimente Airtable et envoie l'e-mail de préparation. |

## Structure

- `src/components/hero.tsx` : carrousel Coverflow 3D (glisser, flèches clavier, lecture auto).
- `src/components/mockups.tsx` : les 7 interfaces animées du volet droit des cartes.
- `src/components/roles.tsx` : onglets « À chaque rôle son interface ».
- `src/components/ecosystem.tsx` : bento + circuit lumineux animé avec GSAP.
- `src/components/pricing.tsx`, `demo-modal.tsx`, `final-cta.tsx`.
- `src/app/api/lead/route.ts` : réception et transmission des demandes de démo.
- `src/app/outils/` : outils gratuits (une page par outil). Le catalogue est dans `src/lib/tools.ts`,
  les calculateurs dans `src/components/tools/calculators.tsx`, les générateurs de documents dans
  `src/components/tools/documents.tsx`. Les PDF sont produits dans le navigateur (jsPDF), sans serveur.

Photos : générées pour ImmoTopia, dans `public/images/hero/` (format 3:4).

## Déploiement (serveur `alliance`, 147.93.44.169)

Le site tourne dans le conteneur Docker `immotopia-site` (port local 3023), derrière nginx.

```bash
# depuis ce dossier : envoyer le code puis reconstruire
tar --exclude=node_modules --exclude=.next --exclude=.git --exclude=.env.local -czf /tmp/site.tgz .
scp /tmp/site.tgz alliance:/var/www/immotopia-site/
ssh alliance 'cd /var/www/immotopia-site && tar -xzf site.tgz && rm site.tgz && docker compose up -d --build'
```

- Configuration nginx : `deploy/nginx-immotopia.cloud.conf` (installée dans `/etc/nginx/sites-enabled/immotopia.cloud`).
- Retour à l'ancien site (Astro) : la configuration d'origine est sauvegardée dans
  `/etc/nginx/backup/immotopia.cloud.astro.conf` et `deploy/nginx-immotopia.cloud.astro-backup.conf`.
- Redirections 301 des anciennes adresses : `next.config.ts`.
- Coordonnées, mentions légales, lien de connexion : `src/lib/site.ts`.
