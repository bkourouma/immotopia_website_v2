// Types et constantes partagés entre serveur et client pour le module Événements (aucun code serveur ici).

export const ACTIVITIES = [
  "Syndic de copropriété",
  "Gestion locative",
  "Agence immobilière",
  "Promoteur immobilier",
  "Gestionnaire de patrimoine",
  "Autre",
] as const;
export type Activity = (typeof ACTIVITIES)[number];

export type PublicationStatus = "draft" | "published" | "archived";
export type RegistrationOpenness = "open" | "closed";
export type VenueStatus = "provisional" | "confirmed";
export type RegistrationStatus = "confirmed" | "waitlist" | "cancelled";
export type Attendance = "unknown" | "present" | "absent";

export type ProgramItem = { time: string; label: string };
export type Promo = { visible: boolean; title: string; items: string[]; note: string };

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  theme: string;
  tagline: string;
  description: string;
  organizer: string;
  solution: string;
  startsAt: string; // ISO UTC
  endsAt: string; // ISO UTC
  timezone: string;
  venueName: string;
  venueCity: string;
  venueDistrict: string;
  venueStatus: VenueStatus;
  capacity: number;
  waitlistEnabled: boolean;
  showRemaining: boolean;
  feeLabel: string;
  publicationStatus: PublicationStatus;
  registrationStatus: RegistrationOpenness;
  cancelled: boolean;
  image: string;
  audience: string[];
  topics: string[];
  program: ProgramItem[];
  practicalInfo: string;
  promo: Promo;
  retentionMonths: number;
  createdAt: string;
  updatedAt: string;
};

export type RegistrationRecord = {
  id: string;
  reference: string;
  eventId: string;
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  activity: string;
  seats: number;
  comment: string;
  status: RegistrationStatus;
  attendance: Attendance;
  cancelToken: string;
  marketingConsentAt: string | null;
  processingConsentAt: string | null;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
};

export type EventStats = {
  confirmedSeats: number;
  waitlistSeats: number;
  remaining: number;
  registrations: number; // inscriptions actives (hors annulées)
  confirmedRegistrations: number;
  waitlistRegistrations: number;
  cancelledRegistrations: number;
  present: number; // personnes présentes (places)
  absent: number;
  byActivity: { activity: string; count: number }[];
};

/** État d'ouverture calculé pour l'affichage public. */
export type EventPhase = "open" | "full" | "waitlist" | "closed" | "past" | "cancelled";
