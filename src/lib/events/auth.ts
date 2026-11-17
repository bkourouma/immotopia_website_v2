// Authentification de l'administration des événements : un mot de passe (EVENTS_ADMIN_PASSWORD) échangé contre un cookie
// signé (HMAC-SHA256 avec EVENTS_ADMIN_SECRET), HttpOnly, SameSite=Strict, valable 8 h. Sans ces variables, l'administration est fermée.

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "immotopia_admin";
export const SESSION_MS = 8 * 60 * 60 * 1000;

export function adminConfigured(): boolean {
  return (process.env.EVENTS_ADMIN_PASSWORD?.length ?? 0) >= 12 && (process.env.EVENTS_ADMIN_SECRET?.length ?? 0) >= 24;
}

const sign = (payload: string) => createHmac("sha256", process.env.EVENTS_ADMIN_SECRET ?? "").update(payload).digest("base64url");

function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string): boolean {
  if (!adminConfigured()) return false;
  return safeEqual(candidate, process.env.EVENTS_ADMIN_PASSWORD!);
}

export function createSessionToken(now = Date.now()): string {
  const payload = String(now + SESSION_MS);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !adminConfigured()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d+$/.test(payload)) return false;
  if (!safeEqual(sig, sign(payload))) return false;
  return Number(payload) > now;
}
