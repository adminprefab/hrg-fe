# HRG public website assistant

The public HRG layout contains an optional assistant that explains the published FAQ, 500/800 sq ft prototypes and project next steps. It matches the existing HRG theme and sits above the mobile action bar. It does not appear until its backend reports enabled. The remodel static site, Base44 authentication, portal, CRM, forms, estimator and checkout are unchanged.

## Activation

On Vercel project `hrg-fe` only, set server-side `OPENAI_API_KEY` (Secret) and `HRG_CHAT_ENABLED=true`, then deploy the tested commit. The owner approved reuse of the existing 4E OpenAI connection and credits. Do not use a `VITE_` variable for the API key. No key is committed or bundled. Preview activation must use a reviewed branch. Set `HRG_CHAT_ENABLED=false` and redeploy to hide the launcher and stop AI requests.

## Boundaries

- Public sources live in `server/hrg-chat-knowledge.js`, importing the same FAQ and prototype data as the website.
- No CRM/Base44 queries, portal credentials, customer records, attachments, tools or write actions.
- Only the most recent nine short messages are sent to OpenAI Responses with `store:false`; no chat transcript is written to HRG storage. Provider retention policies still apply.
- Structured replies contain allowlisted source IDs. Links are assembled by the server and checked by the client. Model text is rendered as text, never HTML.
- Account/payment requests and recognizable credentials receive fixed contact guidance without an OpenAI request. This is not a universal sensitive-data detector; the widget tells visitors not to include private information.
- Messages are kept only in page memory. Clear chat aborts any pending request and removes the conversation. Navigating to a linked page or refreshing clears it.
- The answer is general guidance, not a quote, financing offer, permit decision or engineering opinion. The assistant has no means to book, submit or modify a project.

## Abuse controls

16 KB body cap, nine messages of at most 1,500 characters, 600-token output cap, 22-second upstream timeout, exact-origin checks, and per-instance limits of 20 requests per IP/hour, 300 requests/day and four concurrent calls. IP buckets store a daily hash rather than raw IPs. These in-memory limits reset with server instances and are **not** a global spending cap. Configure a cross-instance Vercel WAF limit if traffic warrants it and monitor the shared OpenAI project's budget. No visitor content or upstream error bodies are logged by the handler.

## Verification

Run `node --test tests/hrg-chat.test.mjs`, `npm run build`, `node scripts/check-seo.mjs`, `npm run lint` and `npm run typecheck`. Record unrelated existing failures instead of expanding scope. After enabling production, test a general question and a private-project question on the real domain, check the mobile action bar, and confirm ordinary navigation/forms remain accessible. Do not submit a real lead or payment as a test.
