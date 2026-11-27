// Premier événement : Les Matinales de l'Immobilier Digital (10 décembre 2026, Abidjan).
// Inséré par `scripts/seed-events.ts` ou par le bouton de l'administration (idempotent, clé : slug).
// Créé en brouillon : la publication reste un acte explicite de l'administrateur.

import type { EventInput } from "./service.ts";

export const MATINALES_SLUG = "matinales-immobilier-digital-2026";

export const matinales: EventInput = {
  slug: MATINALES_SLUG,
  title: "Les Matinales de l'Immobilier Digital",
  theme: "Syndics et agences immobilières : optimisez votre gestion grâce au digital et à l'intelligence artificielle.",
  tagline: "Charges de copropriété, loyers, impayés : découvrez comment simplifier et automatiser votre gestion immobilière.",
  description: [
    "Alliance Consultants organise une matinée professionnelle consacrée à la transformation digitale des métiers de l'immobilier.",
    "Cette rencontre s'adresse principalement aux syndics de copropriété, aux gestionnaires locatifs et aux responsables d'agences immobilières.",
    "Les participants découvriront comment les outils numériques peuvent faciliter le suivi des charges, des appels de fonds, des loyers, des règlements et des impayés.",
    "Une démonstration de la plateforme ImmoTopia permettra d'illustrer les possibilités de centralisation et de pilotage des activités immobilières.",
    "Un temps d'échange avec les participants et un cocktail sont également prévus.",
  ].join("\n\n"),
  organizer: "Alliance Consultants RCI",
  solution: "ImmoTopia",
  startsAt: "2026-12-10T09:00:00.000Z", // 09h00 à Abidjan (UTC+0, sans heure d'été)
  endsAt: "2026-12-10T11:00:00.000Z",
  timezone: "Africa/Abidjan",
  venueName: "Hôtel Tiama",
  venueCity: "Abidjan",
  venueDistrict: "Plateau",
  venueStatus: "provisional", // cotation en cours : à passer en « confirmé » après validation administrative
  capacity: 30,
  directSeats: 10, // 10 inscrits directs par téléphone déduits des 30 places
  maxPerCompany: 2, // une place par inscription ; au-delà de 2 par entreprise, liste d'attente
  waitlistEnabled: true,
  showRemaining: true,
  feeLabel: "Gratuite, sur inscription",
  publicationStatus: "draft",
  registrationStatus: "open",
  cancelled: false,
  image: "/images/hero/syndic.jpg", // visuel provisoire : remplacer par le visuel officiel depuis l'administration
  audience: [
    "Syndics de copropriété",
    "Gestionnaires de résidences",
    "Administrateurs de biens",
    "Agences immobilières",
    "Responsables de gestion locative",
    "Décideurs immobiliers",
  ],
  topics: ["Suivi des charges et appels de fonds", "Loyers, règlements et impayés", "Centralisation et pilotage de l'activité", "Digital et intelligence artificielle pour l'immobilier"],
  program: [
    { time: "09h00 – 09h15", label: "Accueil et introduction" },
    { time: "09h15 – 09h35", label: "Enjeux de la digitalisation des syndics et agences" },
    { time: "09h35 – 10h15", label: "Démonstration ImmoTopia" },
    { time: "10h15 – 10h35", label: "Questions et échanges" },
    { time: "10h35 – 11h00", label: "Présentation de l'offre spéciale et cocktail" },
  ],
  practicalInfo: "Participation gratuite, sur inscription, dans la limite des places disponibles (30). Accueil dès 08h45. Le lieu est en cours de confirmation : il vous sera communiqué par e-mail.",
  promo: {
    visible: true,
    title: "Offre Privilège ImmoTopia",
    items: [
      "Premier mois d'abonnement offert.",
      "10 % de réduction sur les 12 mensualités payantes suivantes.",
      "Migration initiale standard des données offerte selon un périmètre convenu.",
    ],
    note: "Commandes signées du 10 au 17 décembre 2026 inclus.",
  },
  retentionMonths: 24,
};
