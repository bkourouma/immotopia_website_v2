import { timingSafeEqual } from 'node:crypto';
import { createBusinessOutbox } from './seo-business-outbox.mjs';

const runtimeKey = Symbol.for('mission-control.registration-outbox');
function configuration() {
  const directory = process.env.MC_SEO_REGISTRATION_OUTBOX_DIR;
  const sourceId = process.env.MC_SEO_REGISTRATION_SOURCE_ID;
  const token = process.env.MC_SEO_REGISTRATION_TOKEN;
  return directory && sourceId && token ? { directory, sourceId, token } : null;
}
function client() {
  if (globalThis[runtimeKey]?.client) return globalThis[runtimeKey].client;
  const config = configuration(); if (!config) return null;
  try { const outbox = createBusinessOutbox(config); globalThis[runtimeKey] = { client: outbox }; return outbox; } catch { return null; }
}
/** Gross creations of public confirmed registrations, never seats, net active registrations or sales. */
export async function recordConfirmedPublicRegistration(registration, dimensions = {}) {
  const config = configuration(); if (!config || registration.status !== 'confirmed') return false;
  const at = Date.parse(registration.createdAt);
  if (!Number.isFinite(at) || Math.abs(Date.now() - at) > 60_000) return false; // No historical reconstruction.
  try {
    const outbox = createBusinessOutbox({ ...config, now: () => new Date(at) });
    const ticket = await outbox.prepare({ device: dimensions.device });
    return await outbox.confirm(ticket, registration.id);
  } catch { console.error('[seo-registration] Durable measurement unavailable; no registration was replayed.'); return false; }
}
export function startRegistrationOutbox() {
  const outbox = client(); if (!outbox || globalThis[runtimeKey].timer) return;
  globalThis[runtimeKey].timer = setInterval(() => void outbox.flush(), 60_000);
  globalThis[runtimeKey].timer.unref(); void outbox.flush();
}
export async function registrationOutboxStatus(authorization) {
  const token = process.env.MC_SEO_REGISTRATION_TOKEN;
  if (!token || typeof authorization !== 'string') return null;
  const expected = Buffer.from(`Bearer ${token}`); const actual = Buffer.from(authorization);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  return client()?.status() ?? { configured: false, state: 'NOT_CONFIGURED' };
}
