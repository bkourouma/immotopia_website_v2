// Validation des inscriptions (appelée côté serveur ; le formulaire client reprend les mêmes règles pour l'aide à la saisie).

import { ACTIVITIES } from "./types.ts";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Chiffres, +, espaces, points, tirets, parenthèses ; 8 à 15 chiffres (E.164)
const PHONE_CHARS = /^[+\d\s().-]+$/;

export type RegistrationInput = {
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  activity: string;
  seats: number;
  comment: string;
  consentProcessing: boolean;
  consentMarketing: boolean;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

/** Retire les caractères de contrôle et normalise les espaces ; ne neutralise pas le HTML (l'échappement se fait à l'affichage). */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/[ \t]+/g, " ").trim().slice(0, max);
}

export function validateRegistration(body: unknown): { ok: true; data: RegistrationInput } | { ok: false; errors: FieldErrors } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const fullName = clean(b.fullName, 120);
  const company = clean(b.company, 120);
  const jobTitle = clean(b.jobTitle, 120);
  const email = clean(b.email, 160).toLowerCase();
  const phone = clean(b.phone, 30);
  const activity = clean(b.activity, 60);
  const comment = clean(b.comment, 1000);

  if (fullName.length < 3 || !fullName.includes(" ")) errors.fullName = "Indiquez votre nom et votre prénom.";
  if (company.length < 2) errors.company = "Indiquez le nom de votre entreprise.";
  if (jobTitle.length < 2) errors.jobTitle = "Indiquez votre fonction.";
  if (!EMAIL_RE.test(email)) errors.email = "Indiquez une adresse e-mail valide.";
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_CHARS.test(phone) || digits.length < 8 || digits.length > 15) errors.phone = "Indiquez un numéro valide (ex. +225 01 02 03 04 05).";
  if (!(ACTIVITIES as readonly string[]).includes(activity)) errors.activity = "Choisissez votre activité principale.";

  if (b.consentProcessing !== true) errors.consentProcessing = "Ce consentement est nécessaire pour gérer votre inscription.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { fullName, company, jobTitle, email, phone, activity, seats: 1, comment, consentProcessing: true, consentMarketing: b.consentMarketing === true } };
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Adresse d'image acceptée : chemin du site ou URL https (pas de javascript:, data:, etc.). */
export function safeImage(value: string): string {
  const v = value.trim();
  if (v === "") return "";
  if (/^\/(?!\/)[\w\-./]+$/.test(v) || /^https:\/\/[^\s"'<>]+$/.test(v)) return v;
  return "";
}

/** Clé de comparaison d'un nom d'entreprise : sans accents, casse, ponctuation ni espaces (« Siga Immo. » = « SIGA immo »). */
export function companyKey(name: string): string {
  return name.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
