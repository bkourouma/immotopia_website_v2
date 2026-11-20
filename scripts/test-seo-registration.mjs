import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createBusinessOutbox } from '../src/lib/seo-business-outbox.mjs';
import { recordConfirmedPublicRegistration, registrationOutboxStatus } from '../src/lib/seo-registration-outbox.mjs';

function scenario({ registrationStatus = 'confirmed', failureCode = null } = {}) {
  const calls = [];
  const sandboxModule = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL('../src/app/api/events/register/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const require = name => {
    if (name === '@/lib/seo-registration-outbox.mjs') return { recordConfirmedPublicRegistration: async (...args) => { calls.push(args); return true; } };
    if (name === '@/lib/seo-business-outbox.mjs') return { submissionDevice: () => 'MOBILE' };
    if (name === '@/lib/events/email') return { renderEmail: () => ({}), sendEmail: async () => false };
    if (name === '@/lib/events/rate-limit') return { allow: () => true, clientIp: () => 'isolated' };
    if (name === '@/lib/events/request') return { sameOrigin: () => true, readJson: request => request.json(), jsonNoStore: (body, status = 200) => Response.json(body, { status }) };
    if (name === '@/lib/events/validation') return { validateRegistration: body => ({ ok: true, data: body }) };
    if (name === '@/lib/events/service') return { eventPhase: () => 'open', getStats: () => ({ remaining: 1 }), registerForEvent: () => failureCode ? { ok: false, code: failureCode } : { ok: true, registration: { id: 'durable-uuid', status: registrationStatus, createdAt: new Date().toISOString(), reference: 'EVT-TEST', email: 'private@example.test' }, event: { id: 'event', showRemaining: true } } };
    if (name === '@/lib/site') return { SITE_URL: 'https://isolated.example.test' };
    throw new Error(`Unexpected registration import ${name}`);
  };
  vm.runInNewContext(code, { module: sandboxModule, exports: sandboxModule.exports, require, Response, Request, console: { error() {} } });
  return { calls, post: sandboxModule.exports.POST };
}
const request = body => new Request('https://isolated.example.test/api/events/register', { method: 'POST', headers: { 'content-type': 'application/json', 'user-agent': 'isolated' }, body: JSON.stringify({ slug: 'event', email: 'test@example.test', elapsedMs: 3000, ...body }) });
test('only a new public confirmed registration produces the gross creation measurement', async () => {
  const { calls, post } = scenario(); assert.equal((await post(request({}))).status, 200); assert.equal(calls.length, 1);
  assert.deepEqual(Object.keys(calls[0][0]).sort(), ['createdAt', 'id', 'status']); assert.ok(!JSON.stringify(calls).includes('private@example.test'));
});
test('waitlist, duplicate and honeypot success never create confirmed registration measurements', async () => {
  for (const input of [{ registrationStatus: 'waitlist' }, { failureCode: 'duplicate' }]) { const { calls, post } = scenario(input); await post(request({})); assert.equal(calls.length, 0); }
  for (const body of [{ website: 'bot' }, { elapsedMs: 100 }]) { const { calls, post } = scenario(); assert.equal((await post(request(body))).status, 200); assert.equal(calls.length, 0); }
});
test('the dedicated registration outbox persists only opaque data and has an independent source and credential', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'seo-registration-'));
  const token = 'r'.repeat(43); const sourceId = 'registration-source';
  const keys = ['MC_SEO_REGISTRATION_SOURCE_ID', 'MC_SEO_REGISTRATION_TOKEN', 'MC_SEO_REGISTRATION_OUTBOX_DIR'];
  const previous = keys.map(k => process.env[k]);
  Object.assign(process.env, { MC_SEO_REGISTRATION_SOURCE_ID: sourceId, MC_SEO_REGISTRATION_TOKEN: token, MC_SEO_REGISTRATION_OUTBOX_DIR: directory });
  try {
    assert.equal(await recordConfirmedPublicRegistration({ id: 'old', status: 'confirmed', createdAt: '2020-01-01T00:00:00Z' }), false);
    assert.equal(await recordConfirmedPublicRegistration({ id: 'wait', status: 'waitlist', createdAt: new Date().toISOString() }), false);
    assert.equal(await recordConfirmedPublicRegistration({ id: 'durable-uuid', status: 'confirmed', createdAt: new Date().toISOString(), email: 'never-store@example.test' }, { device: 'MOBILE' }), true);
    assert.equal(await registrationOutboxStatus('Bearer ' + 'f'.repeat(43)), null);
    assert.equal((await registrationOutboxStatus('Bearer ' + token)).pending, 1);
    const data = await Promise.all((await readdir(directory)).filter(p => p.endsWith('.json')).map(p => readFile(join(directory, p), 'utf8')));
    assert.ok(data.every(s => !s.includes('durable-uuid') && !s.includes('never-store') && !s.includes(token)));
    const restarted = createBusinessOutbox({ directory, sourceId, token, fetch: async (url, options) => {
      assert.equal(url, 'https://dashboard.allianceconsultants.net/api/ingest/seo-business/registration-source');
      const body = JSON.parse(options.body); assert.equal(body.coverage, undefined); assert.deepEqual(Object.keys(body.events[0]).sort(), ['at', 'device', 'eventId']);
      return Response.json({ accepted: 1, duplicates: 0 });
    } });
    assert.equal((await restarted.flush()).sent, 1); assert.equal((await restarted.status()).pending, 0);
  } finally {
    keys.forEach((key, i) => previous[i] === undefined ? delete process.env[key] : process.env[key] = previous[i]);
    delete globalThis[Symbol.for('mission-control.registration-outbox')];
    await rm(directory, { recursive: true, force: true });
  }
});
