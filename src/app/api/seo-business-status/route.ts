import { businessOutboxStatus } from '@/lib/seo-business-outbox.mjs';
import { registrationOutboxStatus } from '@/lib/seo-registration-outbox.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const authorization = request.headers.get('authorization');
  const status = await businessOutboxStatus(authorization) ?? await registrationOutboxStatus(authorization);
  if (!status) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  return Response.json(status, { headers: { 'Cache-Control': 'no-store' } });
}
