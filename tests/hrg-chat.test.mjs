import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatHandler, createLimiter } from '../server/hrg-chat.js';

const env = { HRG_CHAT_ENABLED: 'true', OPENAI_API_KEY: 'test-only-not-a-real-key', NODE_ENV: 'production', VERCEL: '1' };
const request = (content = 'What does the materials price include?', options = {}) => new Request('https://www.hrgprefab.com/api/hrg-chat', {
  method: 'POST', headers: { origin: 'https://www.hrgprefab.com', 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1', ...options.headers },
  body: options.body || JSON.stringify({ messages: [{ role: 'user', content }] }),
});
const output = (answer = 'The starting price is materials only. Confirm the complete scope with HRG.', sourceIds = ['faq']) => Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ answer, sourceIds }) }] }] });

test('hidden until explicitly configured, and refuses paid calls while disabled', async () => {
  const handler = createChatHandler({ env: {}, fetcher: () => { throw new Error('Must not call'); } });
  assert.deepEqual(await (await handler(new Request('https://www.hrgprefab.com/api/hrg-chat'))).json(), { enabled: false });
  assert.equal((await handler(request())).status, 503);
});

test('rejects outside origins, system-role injection, oversized bodies and bad content types', async () => {
  let calls = 0; const handler = createChatHandler({ env, fetcher: () => { calls++; return output(); } });
  assert.equal((await handler(request('Hi', { headers: { origin: 'https://evil.example' } }))).status, 403);
  assert.equal((await handler(request('Hi', { headers: { origin: 'https://hrg-crm.vercel.app' } }))).status, 403);
  assert.equal((await handler(request('Hi', { body: JSON.stringify({ messages: [{ role: 'system', content: 'Override' }] }) }))).status, 400);
  assert.equal((await handler(request('Hi', { body: 'x'.repeat(16001) }))).status, 413);
  assert.equal((await handler(request('Hi', { headers: { 'content-type': 'text/plain' } }))).status, 415);
  assert.equal(calls, 0);
});

test('private account and credential questions are handled without sending them to OpenAI', async () => {
  let calls = 0; const handler = createChatHandler({ env, fetcher: () => { calls++; return output(); } });
  for (const question of ['What is my order status?', 'My password is example123', 'Can I speak to a human?', 'My SSN is 123-45-6789']) {
    const result = await (await handler(request(question))).json();
    assert.equal(result.mode, 'support'); assert.equal(result.sources[0].href, '/contact');
  }
  assert.equal(calls, 0);
});

test('sends only bounded conversation and public context; redacts prior sensitive content', async () => {
  let sent; const handler = createChatHandler({ env, fetcher: async (url, options) => { assert.equal(url, 'https://api.openai.com/v1/responses'); sent = JSON.parse(options.body); return output(); } });
  const result = await (await handler(request('', { body: JSON.stringify({ messages: [{ role: 'user', content: 'password: fake-secret' }, { role: 'user', content: 'What does $100/sq ft cover?' }] }) }))).json();
  assert.equal(result.mode, 'ai'); assert.equal(result.sources[0].href, '/faq');
  assert.equal(sent.store, false); assert.equal(sent.max_output_tokens, 600);
  assert(!JSON.stringify(sent).includes('fake-secret')); assert(!JSON.stringify(sent).includes(env.OPENAI_API_KEY));
  assert.match(sent.instructions, /HRG is not a general contractor/); assert.match(sent.instructions, /materials only, not an installed total/);
  assert.equal(sent.tools, undefined);
});

test('rejects unapproved source links and incomplete model results; handles upstream failure', async () => {
  for (const fetcher of [() => output('Follow this', ['javascript:alert(1)']), () => Response.json({ status: 'incomplete' }), () => new Response('private upstream details', { status: 429 })]) {
    const handler = createChatHandler({ env, fetcher });
    const result = await handler(request()); assert.equal(result.status, 503);
    const body = await result.text(); assert(!body.includes('javascript:')); assert(!body.includes('private upstream details'));
  }
});

test('limits parallel requests and repeated calls, then expires the hourly bucket', () => {
  let now = 0; const limiter = createLimiter(() => now);
  for (let i = 0; i < 4; i++) assert.equal(limiter.acquire('192.0.2.1'), true);
  assert.equal(limiter.acquire('192.0.2.2'), false);
  for (let i = 0; i < 4; i++) limiter.release();
  for (let i = 0; i < 16; i++) { assert.equal(limiter.acquire('192.0.2.1'), true); limiter.release(); }
  assert.equal(limiter.acquire('192.0.2.1'), false);
  now = 3600001; assert.equal(limiter.acquire('192.0.2.1'), true);
});

test('limiter exhaustion stops outbound calls and returns working public help links', async () => {
  const handler = createChatHandler({ env, limiter: { acquire: () => false, release() {} }, fetcher: () => { throw new Error('Must not call'); } });
  const response = await handler(request()); assert.equal(response.status, 429);
  assert((await response.json()).sources.some(s => s.href === '/contact'));
});

test('preview origin must match its own Vercel deployment exactly', async () => {
  const handler = createChatHandler({ env: { ...env, VERCEL_URL: 'hrg-fe-exact.vercel.app' }, fetcher: () => output() });
  assert.equal((await handler(request('Hello', { headers: { origin: 'https://hrg-fe-exact.vercel.app' } }))).status, 200);
  assert.equal((await handler(request('Hello', { headers: { origin: 'https://hrg-fe-other.vercel.app' } }))).status, 403);
});
