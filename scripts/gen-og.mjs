// One-off generator for the Open Graph social-share image (public/og.png).
// Run with: node scripts/gen-og.mjs
// Uses sharp (already a transitive dependency) to rasterize an inline SVG.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/og.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#09090b"/>
  <rect x="0" y="0" width="12" height="630" fill="#6366f1"/>
  <g font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <text x="80" y="250" fill="#f4f4f5" font-size="88" font-weight="700" letter-spacing="-2">Hyunjae Lee</text>
    <text x="82" y="320" fill="#a1a1aa" font-size="40" font-weight="400">이현재 · 정보보안 엔지니어</text>
    <text x="80" y="410" fill="#818cf8" font-size="34" font-weight="600">Information Security Engineer</text>
    <text x="80" y="560" fill="#52525b" font-size="28" font-weight="500">hyunjae-lee.github.io</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
