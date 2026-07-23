import { pdf } from 'pdf-to-img';
import { writeFile } from 'node:fs/promises';

const jobs = [
  ['public/projects/kaist-cert-automation-flow.pdf', 'public/projects/kaist-cert-automation-flow.png'],
  ['public/projects/kaist-cert-flow-sequence.pdf', 'public/projects/kaist-cert-flow-sequence.png'],
];

for (const [src, out] of jobs) {
  const doc = await pdf(src, { scale: 2.5 });
  let n = 0;
  for await (const page of doc) {
    if (n === 0) { await writeFile(out, page); console.log('wrote', out, page.length, 'bytes'); }
    n++;
  }
}
