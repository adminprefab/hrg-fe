import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
for (const [base, origin] of [['dist', 'https://www.hrgprefab.com'], ['sites/remodel', 'https://thehomeremodelgroup.com']]) {
  const xml = readFileSync(join(base, 'sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
  assert(urls.length > 10, `${base}: sitemap unexpectedly small`);
  assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
  const titles = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, origin);
    const path = new URL(url).pathname;
    let file = join(base, path, 'index.html');
    if (!existsSync(file)) file = join(base, `${path}.html`);
    const html = readFileSync(file, 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${url}: must have one main heading`);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${url}: canonical count`);
    assert(html.includes(`rel="canonical" href="${url}"`), `${url}: wrong canonical`);
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${url}: noindex in sitemap`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert(title && !titles.has(title), `${url}: missing or duplicate title`); titles.add(title);
    assert(/<meta\s+name="description"\s+content="[^"]+"/.test(html), `${url}: missing description`);
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
    assert(schemas.length > 0, `${url}: missing structured data`);
    for (const schema of schemas) JSON.parse(schema[1]);
    for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      const href = decode(match[1]);
      const target = new URL(href, url);
      if (target.origin !== origin || !href.startsWith('/')) continue;
      if (['/estimate', '/planner', '/get-a-quote', '/collection/pool'].includes(target.pathname)) continue;
      const local = join(base, target.pathname);
      assert(existsSync(local) || existsSync(`${local}.html`), `${url}: broken link ${href}`);
    }
  }
  const robots = readFileSync(join(base, 'robots.txt'), 'utf8');
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
  assert(readFileSync(join(base, '404.html'), 'utf8').includes('noindex'));
  console.log(`${base}: ${urls.length} canonical pages, headings, metadata, structured data, internal links, robots and 404 checks passed.`);
}
const home = readFileSync('dist/index.html', 'utf8');
assert(home.includes('What does the $100 per square foot price include?'));
assert(home.includes('It is not the total installed project price.'));
assert(home.includes('HRG is not the general contractor.'));
assert(home.includes('<div id="root"><'), 'Homepage has no prerendered content');
assert(!readFileSync('vercel.json', 'utf8').includes('"destination": "/index.html"'), 'Catch-all would mask missing URLs');
console.log('Homepage FAQ content and missing-page routing checks passed.');
