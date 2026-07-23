import sharp from 'sharp';
const files = [
  'public/projects/kaist-cert-automation-flow.png',
  'public/projects/kaist-cert-flow-sequence.png',
];
for (const f of files) {
  const tmp = f.replace('.png', '.opt.png');
  await sharp(f).resize({ width: 1800 }).png({ compressionLevel: 9, palette: true }).toFile(tmp);
  const { size } = await import('node:fs').then(m => m.promises.stat(tmp));
  console.log(f, '->', Math.round(size/1024) + 'KB');
}
