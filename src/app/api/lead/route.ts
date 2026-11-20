import { prepareBusinessSubmission, confirmBusinessSubmission, submissionDevice } from '@/lib/seo-business-outbox.mjs';
import { createLeadHandler } from '@/lib/lead-reception-server.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const environment = () => ({
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_WEBHOOK_SECRET: process.env.N8N_WEBHOOK_SECRET,
  N8N_WEBHOOK_TEST_URL: process.env.N8N_WEBHOOK_TEST_URL,
  N8N_WEBHOOK_TEST_SECRET: process.env.N8N_WEBHOOK_TEST_SECRET,
  FORM_RECIPE_AUTH_TOKEN: process.env.FORM_RECIPE_AUTH_TOKEN,
  MC_FORM_SOURCE_ID: process.env.MC_FORM_SOURCE_ID,
});
const receive = createLeadHandler({
  source: 'site-vitrine',
  sourceId: 'site-form-immotopia-v1',
  siteOrigin: 'https://immotopia.cloud',
  fields: ['structure', 'volume', 'role', 'name', 'company', 'email', 'phone'],
}, {
  env: environment,
  measure: async (receipt, { request, locale }) => {
    const ticket = await prepareBusinessSubmission({ language: locale, device: submissionDevice(request.headers.get('user-agent')) });
    await confirmBusinessSubmission(ticket, receipt.receiptId);
  },
});

export async function POST(request: Request) { return receive(request); }
