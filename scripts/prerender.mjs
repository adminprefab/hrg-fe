import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = process.cwd();
const temporary = resolve(root, 'node_modules/.hrg-prerender');
await build({ configFile: false, logLevel: 'error', plugins: [react()], resolve: { alias: { '@': resolve(root, 'src') } }, build: { ssr: 'src/prerender.jsx', outDir: temporary, emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'render.mjs' } } } });
try {
  const { render, seoPages, pageSeo, structuredData, robotsFor, SITE_URL } = await import(pathToFileURL(resolve(temporary, 'render.mjs')));
  const template = (await readFile('dist/index.html', 'utf8')).replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta\s+name="description"[\s\S]*?\/>/, '');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  for (const path of [...Object.keys(seoPages), '/404']) {
    const page = pageSeo(path);
    const head = `<title>${escape(page.title)}</title>\n<meta name="description" content="${escape(page.description)}">\n<link rel="canonical" href="${escape(page.url)}">\n<meta name="robots" content="${robotsFor(page)}">\n` +
      Object.entries({ title: page.title, description: page.description, url: page.url, image: page.image, type: 'website', site_name: 'HRG Prefab' }).map(([key, value]) => `<meta property="og:${key}" content="${escape(value)}">`).join('\n') +
      `\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escape(page.title)}">\n<meta name="twitter:description" content="${escape(page.description)}">\n<meta name="twitter:image" content="${escape(page.image)}">\n<script id="page-schema" type="application/ld+json">${JSON.stringify(structuredData(page)).replace(/</g, '\\u003c')}</script>`;
    // Render the same public components visitors see. Reveal motion elements in the
    // initial HTML, so content stays visible even before JavaScript initializes.
    const body = render(path).replace(/opacity:0(?=;|"|$)/g, 'opacity:1').replace(/transform:translateY\([^)]+\)/g, 'transform:none');
    const html = template.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const file = path === '/' ? 'dist/index.html' : path === '/404' ? 'dist/404.html' : `dist${path}/index.html`;
    await mkdir(dirname(file), { recursive: true }); await writeFile(file, html);
  }
  const paths = Object.keys(seoPages).filter(path => !seoPages[path].noindex);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${escape(SITE_URL + path)}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Prerendered ${Object.keys(seoPages).length} public routes and a 404 page; sitemap includes ${paths.length} canonical URLs.`);
} finally { await rm(temporary, { recursive: true, force: true }); }
