#!/usr/bin/env node
/* ProyectosPixel - Spot-check de herramientas en producción (o local)
   Comprueba, para las 66 tools de js/tools-data.js:
     1) la página responde 200
     2) referencia un script /js/tools/*.js que también responde 200
     3) contiene el contenido SEO (.tool-content)
     4) tiene elementos interactivos (alguno de los ids estándar o un botón de acción)

   Uso:  node tools/check-tools.mjs [base]     (base por defecto: https://proyectospixel.com) */

import fs from 'node:fs';

const base = (process.argv[2] || 'https://proyectospixel.com').replace(/\/$/, '');
const td = fs.readFileSync('js/tools-data.js', 'utf8');
const tools = [...td.matchAll(/\{ slug: '([a-z0-9-]+)',[^}]*category: '(\w+)'/g)].map(m => ({ slug: m[1], cat: m[2] }));

const hasInter = (html) =>
  /id="(tool-result|tool-input|btn-process|btn-plus|btn-minus|ctl-value|count-words)"/.test(html);

let ok = 0;
const fail = [];

for (const t of tools) {
  const url = `${base}/herramientas/${t.cat}/${t.slug}/`;
  const problems = [];
  try {
    const r = await fetch(url);
    const html = r.ok ? await r.text() : '';
    if (!r.ok) problems.push('HTTP ' + r.status);
    else {
      if (!html.includes('class="tool-content"')) problems.push('sin .tool-content');
      if (!hasInter(html)) problems.push('sin elementos interactivos');
      const m = html.match(/\/js\/tools\/([a-z0-9-]+)\.js/);
      if (!m) problems.push('sin script de tool');
      else {
        const rj = await fetch(`${base}/js/tools/${m[1]}.js`);
        if (!rj.ok) problems.push('JS HTTP ' + rj.status + ' (' + m[1] + '.js)');
      }
    }
  } catch (e) {
    problems.push('ERR ' + e.message);
  }
  if (problems.length) fail.push(`${t.slug} [${t.cat}]: ${problems.join(', ')}`);
  else ok++;
}

console.log(`Base: ${base}`);
console.log(`Tools: ${tools.length} | OK: ${ok} | con problemas: ${fail.length}`);
if (fail.length) {
  console.log('\nPROBLEMAS:');
  fail.forEach(f => console.log('  ' + f));
  process.exit(1);
} else {
  console.log('\nOK: las 66 herramientas responden y montan su interfaz.');
}
