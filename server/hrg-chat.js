import { createHash } from 'node:crypto';
import { z } from 'zod';
import { sources, instructions } from './hrg-chat-knowledge.js';

const inputSchema = z.object({ messages: z.array(z.object({
  role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(1500),
}).strict()).min(1).max(9) }).strict();
const answerSchema = z.object({ answer: z.string().min(1).max(2500), sourceIds: z.array(z.enum(sources.map(s => s.id))).max(3) }).strict();
const sensitive = /\bsk-[a-zA-Z0-9_-]{16,}|\b(?:\d[ -]?){13,19}\b|(?:password|passcode|api[ _-]?key|social security)\s*(?:is|:|=)\s*\S+|\b\d{3}-\d{2}-\d{4}\b/i;
const privateHelp = /\b(?:refund|cancel my|invoice|charged|payment failed|order status|my order|my account|my project status|project update|log ?in|sign ?in|password|verification|support|human|speak to|talk to)\b/i;
const publicOrigins = new Set(['https://hrgprefab.com', 'https://www.hrgprefab.com']);
const fallback = ['faq', 'contact'];
const reply = (answer, mode, ids = fallback) => ({ answer, mode, sources: sources.filter(s => ids.includes(s.id)).map(({ title, href }) => ({ title, href })) });
const json = (body, status = 200) => Response.json(body, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex',
} });

// Per-instance abuse protection. Not a durable or account-wide spending cap.
// No raw IPs or conversation content are stored. Configure a Vercel WAF rule
// for a cross-instance limit if traffic warrants it.
export function createLimiter(now = Date.now) {
  const buckets = new Map();
  let day = -1, total = 0, concurrent = 0;
  return {
    acquire(ip) {
      const time = now(), currentDay = Math.floor(time / 86400000);
      if (day !== currentDay) { day = currentDay; total = 0; }
      for (const [key, value] of buckets) if (value.until <= time) buckets.delete(key);
      const key = createHash('sha256').update(`${currentDay}:${ip}`).digest('hex');
      const bucket = buckets.get(key) || { count: 0, until: time + 3600000 };
      if (bucket.count >= 20 || total >= 300 || concurrent >= 4 || (!buckets.has(key) && buckets.size >= 2000)) return false;
      bucket.count++; total++; concurrent++; buckets.set(key, bucket); return true;
    },
    release() { concurrent = Math.max(0, concurrent - 1); },
  };
}

async function readBody(request) {
  if (Number(request.headers.get('content-length') || 0) > 16000) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Empty');
  const chunks = []; let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 16000) { await reader.cancel(); throw new RangeError(); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createChatHandler({ env = process.env, fetcher = fetch, limiter = createLimiter() } = {}) {
  const enabled = () => env.HRG_CHAT_ENABLED === 'true' && Boolean(env.OPENAI_API_KEY);
  return async function handle(request) {
    if (request.method === 'GET') return json({ enabled: enabled() });
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    const origin = request.headers.get('origin');
    // A preview is allowed only if it is this deployment, never all vercel.app hosts.
    const ownPreview = env.VERCEL_URL && origin === `https://${env.VERCEL_URL}`;
    const local = env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || '');
    if (!publicOrigins.has(origin) && !ownPreview && !local) return json({ error: 'Open the chat on HRG Prefab.' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Send a text question.' }, 415);
    let input;
    try { input = inputSchema.safeParse(await readBody(request)); }
    catch (error) { return json({ error: error instanceof RangeError ? 'Please shorten your message.' : 'Please send your question again.' }, error instanceof RangeError ? 413 : 400); }
    if (!input.success || input.data.messages.at(-1)?.role !== 'user') return json({ error: 'Enter a question of up to 1,500 characters.' }, 400);
    const { messages } = input.data;
    const question = messages.at(-1).content;
    if (sensitive.test(question)) return json(reply('Please don’t share passwords, payment details or sensitive financial information here. Use the contact page for help with your account or project.', 'support', ['contact']));
    if (privateHelp.test(question)) return json(reply('For an existing project, account or payment, contact HRG at sales@hrgprefab.com or 909.274.0272. I can explain the process, but I can’t access private project records, check payments, make changes or send a message on your behalf.', 'support', ['contact']));
    if (!enabled()) return json(reply('The AI assistant is currently unavailable. Explore our FAQ or contact HRG for help with your project.', 'unavailable'), 503);
    const ip = (env.VERCEL ? request.headers.get('x-vercel-forwarded-for') : request.headers.get('x-forwarded-for'))?.split(',')[0]?.trim() || 'unknown';
    if (!limiter.acquire(ip)) return json(reply('Chat is busy or has reached its request limit. Please try again later, explore the FAQ or contact HRG.', 'limited'), 429);
    try {
      const upstream = await fetcher('https://api.openai.com/v1/responses', {
        method: 'POST', headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(22000),
        body: JSON.stringify({ model: 'gpt-4.1-mini', store: false, max_output_tokens: 600, instructions,
          input: messages.map(m => ({ ...m, content: sensitive.test(m.content) ? '[Sensitive details omitted. Refer account questions to HRG.]' : m.content })),
          text: { format: { type: 'json_schema', name: 'hrg_answer', strict: true, schema: {
            type: 'object', additionalProperties: false, required: ['answer', 'sourceIds'], properties: {
              answer: { type: 'string' }, sourceIds: { type: 'array', items: { type: 'string', enum: sources.map(s => s.id) } },
            },
          } } },
        }),
      });
      if (!upstream.ok) throw new Error('Unavailable');
      const result = await upstream.json();
      if (result.status !== 'completed') throw new Error('Incomplete');
      const text = result.output?.filter(o => o.type === 'message').flatMap(o => o.content || []).filter(c => c.type === 'output_text').map(c => c.text).join('');
      const answer = answerSchema.parse(JSON.parse(text || '{}'));
      return json(reply(answer.answer.replace(/\u2014/g, ', '), 'ai', answer.sourceIds));
    } catch {
      // Never log upstream bodies, prompts, API keys or visitor messages.
      return json(reply('The AI assistant is temporarily unavailable. Please try again in a moment, explore the FAQ or contact HRG for help.', 'unavailable'), 503);
    } finally { limiter.release(); }
  };
}
