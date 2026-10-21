/**
 * POST /api/estimate-lead — the remodel cost planner (/estimate) sends its
 * "Send my estimate to HRG" form here, and this forwards it to the CRM.
 *
 * Why a server route: the CRM's POST /api/intake needs a shared secret in the
 * `x-intake-secret` header. Anything in the page ships to every visitor, so
 * the secret lives only in this function's environment:
 *
 *   INTAKE_SECRET      required. The same value as INTAKE_SECRET on the CRM's
 *                      Vercel project. Set it in Vercel → hrg-fe → Settings →
 *                      Environment Variables; never commit it.
 *   CRM_INTAKE_URL     optional. Defaults to https://hrg-crm-omega.vercel.app/api/intake (the CRM's Vercel address; crm.hrgprefab.com has no DNS record).
 *                      Point a preview deployment at a test CRM with this.
 *
 * Any failure (bad config, CRM down, non-2xx from intake) returns a non-2xx
 * with { ok: false }, and the page shows the copy-and-email fallback. A lead
 * the visitor thinks was sent but wasn't is the one outcome to avoid.
 *
 * Privacy: never log the visitor's details. Logs carry status codes only.
 */

const DEFAULT_INTAKE_URL = "https://hrg-crm-omega.vercel.app/api/intake";
const MAX_BODY_BYTES = 32 * 1024;
const UPSTREAM_TIMEOUT_MS = 15_000;

// Per-instance guard against a script hammering the form. Not a global limit:
// Vercel runs several instances. Real people send one or two requests.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 6;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

// thehomeremodelgroup.com's lead form posts here from another origin. The planner itself is same-origin.
const CORS_ORIGIN =
  /^https:\/\/((www|estimate)\.)?thehomeremodelgroup\.com$|^https:\/\/thehomeremodelgroup(-[a-z0-9-]+)?\.vercel\.app$/;

function cors(req, res) {
  const origin = String(req.headers.origin || "");
  if (CORS_ORIGIN.test(origin)) {
    res.setHeader("access-control-allow-origin", origin);
    res.setHeader("vary", "origin");
    res.setHeader("access-control-allow-methods", "POST, OPTIONS");
    res.setHeader("access-control-allow-headers", "content-type");
    res.setHeader("access-control-max-age", "86400");
  }
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  // Vercel parses JSON bodies already; a plain Node server (local testing) doesn't.
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("too large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const money = (n) =>
  Number.isFinite(n) && n > 0 ? "$" + Math.round(n).toLocaleString("en-US") : null;

/** Jobs whose size is the size of the project itself, not of a surface. */
const SPACE_JOBS = new Set(["adu", "addition", "garage"]);

/** Map the planner's form onto the structured keys /api/intake understands. */
export function toIntake(b) {
  const jobs = Array.isArray(b.jobs) ? b.jobs.slice(0, 20) : [];
  const jobNames = jobs.map((j) => text(j && j.job, 60)).filter(Boolean);
  const low = Number(b.low);
  const high = Number(b.high);
  const total = Number(b.total);

  const spaceSf = jobs
    .filter((j) => j && SPACE_JOBS.has(j.id) && j.unit === "sq ft")
    .reduce((s, j) => s + (Number(j.size) || 0), 0);

  const details = [
    `Source: ${text(b.form, 80) || "hrgprefab.com remodel cost planner (/estimate)"}`,
    jobNames.length ? `Jobs: ${jobNames.join(", ")}` : null,
    money(low) && money(high)
      ? `Estimate: ${money(low)} – ${money(high)} (most likely ${money(total) || "n/a"})`
      : null,
    text(b.region, 80) || b.yearBuilt
      ? `Property: ${text(b.region, 80) || "area not given"}${
          Number(b.yearBuilt) ? `, built ${Math.round(Number(b.yearBuilt))}` : ""
        }`
      : null,
    text(b.bestTime, 20) ? `Best time to reach: ${text(b.bestTime, 20)}` : null,
    text(b.language, 20) ? `Language: ${text(b.language, 20)}` : null,
    text(b.startWhen, 40) ? `Wants to start: ${text(b.startWhen, 40)}` : null,
    text(b.source, 40) ? `Heard about HRG: ${text(b.source, 40)}` : null,
    text(b.notes, 1500) ? `Client notes: ${text(b.notes, 1500)}` : null,
    // The planner's own breakdown (per job, soft costs, timeline). Its first
    // line repeats the area and year above, so it is skipped.
    text(b.summary, 2200)
      ? `Breakdown: ${text(b.summary, 2200)
          .split("\n")
          .slice(1)
          .map((l) => l.trim())
          .filter(Boolean)
          .join(" | ")}`
      : null,
  ]
    .filter(Boolean)
    // Intake collapses newlines in project_details, so sections are separated
    // in a way that survives being put on one line.
    .join(" | ");

  const lead = {
    full_name: text(b.name, 120),
    email: text(b.email, 200),
    phone: text(b.phone, 40),
    project_details: details,
    // The visitor's own answer ("Google", "Referral from a friend") maps onto
    // the CRM's sources; anything else lands as "other".
    lead_source: text(b.source, 40) || "Website",
  };
  const address = text(b.address, 250);
  if (address) lead.address = address;
  // Intake keeps only the low end of a range to pick its budget band.
  if (money(low) && money(high)) lead.budget = `${money(low)} - ${money(high)}`;
  if (spaceSf > 0) lead.square_footage = String(Math.round(spaceSf));
  if (jobs.some((j) => j && j.id === "adu")) lead.interested_in = "ADU";
  return lead;
}

function validate(b) {
  if (!text(b.name, 120)) return "Add your name.";
  if ((text(b.phone, 40).match(/\d/g) || []).length < 10)
    return "Add a 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(b.email, 200)))
    return "Add a valid email.";
  if (b.consent !== true) return "Consent is required.";
  return null;
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return send(res, 405, { ok: false, error: "Use POST." });
  }

  const ip =
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return send(res, 429, { ok: false, error: "Too many requests." });
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { ok: false, error: "Bad request." });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return send(res, 400, { ok: false, error: "Bad request." });
  }

  // Honeypot: a hidden field people never see. Pretend success, forward nothing.
  if (text(body.website, 200)) {
    return send(res, 200, { ok: true });
  }

  const invalid = validate(body);
  if (invalid) return send(res, 400, { ok: false, error: invalid });

  const secret = process.env.INTAKE_SECRET;
  if (!secret || !secret.trim()) {
    console.error(
      "[estimate-lead] INTAKE_SECRET is not set on this deployment; leads " +
        "cannot reach the CRM. Set it in Vercel → Settings → Environment Variables.",
    );
    return send(res, 503, { ok: false, error: "Not configured." });
  }
  const url = process.env.CRM_INTAKE_URL || DEFAULT_INTAKE_URL;

  let upstream;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-intake-secret": secret.trim(),
      },
      body: JSON.stringify(toIntake(body)),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    console.error(`[estimate-lead] CRM unreachable: ${err?.name || "error"}`);
    return send(res, 502, { ok: false, error: "Could not reach HRG." });
  }

  if (!upstream.ok) {
    console.error(`[estimate-lead] CRM intake answered ${upstream.status}`);
    return send(res, 502, { ok: false, error: "HRG did not accept the request." });
  }

  console.info(`[estimate-lead] forwarded, CRM answered ${upstream.status}`);
  return send(res, 200, { ok: true });
}
