/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// Simple script to generate NDJSON datasets under public/datasets
const fs = require('fs');
const path = require('path');

function write(name, rows) {
  const out = rows.map((r) => JSON.stringify(r)).join('\n');
  const p = path.join(__dirname, '..', 'public', 'datasets', `${name}.ndjson`);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, out);
  console.log('wrote', p);
}

function genVolatile() {
  const start = Date.now();
  const rows = Array.from({ length: 300 }, (_, i) => {
    const base = 150 + Math.sin(i / 8) * 2 + (Math.random() - 0.5) * 2;
    return { t: start + i * 60000, o: base, h: base + 0.8, l: base - 0.8, c: base + 0.3 };
  });
  write('volatile', rows);
}

function genGap() {
  const start = Date.now();
  const rows = [];
  for (let i = 0; i < 300; i++) {
    let base = 150 + (Math.random() - 0.5) * 0.6;
    if (i === 120) base += 6;
    rows.push({ t: start + i * 60000, o: base, h: base + 0.6, l: base - 0.6, c: base + 0.2 });
  }
  write('gap', rows);
}

function genRange() {
  const start = Date.now();
  const rows = Array.from({ length: 300 }, (_, i) => {
    const base = 150 + Math.sin(i / 12) * 0.5;
    return { t: start + i * 60000, o: base, h: base + 0.2, l: base - 0.2, c: base };
  });
  write('range', rows);
}

genVolatile();
genGap();
genRange();
