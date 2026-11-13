import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Preserve the original brand artwork. Keep every corner inside a circular
// search-result mask, with extra breathing room for the PREFAB baseline.
const logo = await readFile(new URL('../public/assets/logo-01-sm.png', import.meta.url));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"><rect width="280" height="280" fill="#fff"/><image x="53.3125" y="45" width="173.375" height="190" href="data:image/png;base64,${logo.toString('base64')}"/></svg>`;
const output = new URL('../public/', import.meta.url);
await writeFile(new URL('favicon.svg', output), svg);
for (const [name, size] of [['favicon-96.png', 96], ['favicon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(new URL(name, output).pathname);
}
console.log('Built circle-safe HRG icons from the original logo.');
