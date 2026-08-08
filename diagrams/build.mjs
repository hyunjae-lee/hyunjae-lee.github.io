/**
 * Regenerate the project diagrams.
 *
 *   node diagrams/build.mjs
 *
 * Renders four fixed-size HTML canvases (KO/EN × architecture/sequence) with
 * headless Chrome, then writes an optimized PNG and a vector PDF for each into
 * `public/projects/`. The PNGs are what the project pages embed; the PDFs are
 * the print-quality companions.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, statSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

import { strings } from './strings.mjs';
import { archHtml, seqHtml } from './templates.mjs';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => {
  try { statSync(p); return true; } catch { return false; }
});

if (!CHROME) {
  console.error('Chrome not found — install Chrome or edit the CHROME list in diagrams/build.mjs.');
  process.exit(1);
}

const OUT = resolve('public/projects');
const work = mkdtempSync(join(tmpdir(), 'diagrams-'));

const targets = [
  ['kaist-cert-automation-flow-ko', archHtml(strings.ko)],
  ['kaist-cert-flow-sequence-ko', seqHtml(strings.ko)],
  ['kaist-cert-automation-flow-en', archHtml(strings.en)],
  ['kaist-cert-flow-sequence-en', seqHtml(strings.en)],
];

const chrome = (args) =>
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', ...args], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

for (const [name, { w, h, html }] of targets) {
  const src = join(work, `${name}.html`);
  writeFileSync(src, html, 'utf8');
  const url = pathToFileURL(src).href;

  // PNG — rendered at 2× for a crisp embed, then downscaled to 1800px wide.
  const rawPng = join(work, `${name}.raw.png`);
  chrome([
    `--screenshot=${rawPng}`,
    `--window-size=${w},${h}`,
    '--force-device-scale-factor=2',
    '--default-background-color=ffffff',
    url,
  ]);

  const png = join(OUT, `${name}.png`);
  await sharp(rawPng)
    .resize({ width: 1800 })
    .png({ compressionLevel: 9, palette: true })
    .toFile(png + '.tmp');
  renameSync(png + '.tmp', png);

  // PDF — vector, same canvas size.
  const pdf = join(OUT, `${name}.pdf`);
  chrome([`--print-to-pdf=${pdf}`, '--no-pdf-header-footer', url]);

  const kb = (p) => Math.round(statSync(p).size / 1024) + 'KB';
  console.log(`${name}  ${w}×${h}   png ${kb(png)}   pdf ${kb(pdf)}`);
}

rmSync(work, { recursive: true, force: true });
console.log('\nDone —', OUT);
