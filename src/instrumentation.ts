export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startBusinessOutbox } = await import('@/lib/seo-business-outbox.mjs');
    const { startRegistrationOutbox } = await import('@/lib/seo-registration-outbox.mjs');
    startBusinessOutbox();
    startRegistrationOutbox();
  }
}
