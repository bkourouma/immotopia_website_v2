import type { SubmissionDimensions } from './seo-business-outbox.mjs';
export function recordConfirmedPublicRegistration(registration: { id: string; status: string; createdAt: string }, dimensions?: Pick<SubmissionDimensions, 'device'>): Promise<boolean>;
export function startRegistrationOutbox(): void;
export function registrationOutboxStatus(authorization: string | null): Promise<Record<string, unknown> | null>;
