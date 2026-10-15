#!/usr/bin/env node
/* ProyectosPixel — Auditoría de Lanzamiento
   Comprueba, contra un origen (por defecto producción):
     1) sitemap.xml vs. conjunto esperado (66 tools + 6 categorías + home + /herramientas/ + legales)
     2) status HTTP de cada URL del sitemap
     3) JSON-LD válido por página + tipos esperados
     4) canonical presente y coherente
     5) ausencia de robots noindex

   Uso: node tools/audit-launch.mjs [base]   (base por defecto: https://proyectospixel.com) */

import fs from 'node:fs';

const base = (process.argv[2] || 'https://proyectospixel.com').replace(/\/$/, '');

const td = fs.readFileSync('js/tools-data.js', 'utf8');
const tools = [...td.matchAll(/\{ slug: '([a-z0-9-]+)',[^}]*category: '(\w+)'/g)].map(m => ({ slug: m[1], cat: m[2] }));
const cats = [...new Set(tools.map(t => t.cat))];

const expected = [
  '/', '/herramientas/',
  ...cats.map(c => `/herramientas/${c}/`),
  ...tools.map(t => `/herramientas/${t.cat}/${t.slug}/`),
  '/privacidad.html', '/terminos.html', '/cookies.html'
];
const expectedSet = new Set(expected);

async function pool(items, size, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); }
  }));
  return out;
}

// --- 1) Sitemap ---
const smRes = await fetch(base + '/sitemap.xml');
const sm = await smRes.text();
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapPaths = locs.map(u => new URL(u).pathname);
const sitemapSet = new Set(sitemapPaths);
const faltanEnSitemap = expected.filter(p => !sitemapSet.has(p));
const sobranEnSitemap = sitemapPaths.filter(p => !expectedSet.has(p));

console.log('=== 1) SITEMAP ===');
console.log('URLs en sitemap:', sitemapPaths.length, '| esperadas:', expected.length);
console.log('Faltan en sitemap:', faltanEnSitemap.length ? faltanEnSitemap : 'ninguna');
console.log('De más en sitemap (revisar):', sobranEnSitemap.length ? sobranEnSitemap : 'ninguna');

// --- 2-5) Por página ---
const results = await pool(sitemapPaths, 8, async (p) => {
  const url = base + p;
  const r = { path: p, status: 0, canon: null, canonOk: false, noindex: false, jsonOk: true, types: [], jsonErr: '' };
  try {
    const res = await fetch(url);
    r.status = res.status;
    if (!res.ok) return r;
    const html = await res.text();
    const can = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
    r.canon = can ? can[1] : null;
    try { r.canonOk = !!can && new URL(can[1]).pathname === p; } catch (e) { r.canonOk = false; }
    r.noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
    for (const b of blocks) {
      try {
        const j = JSON.parse(b);
        const arr = j['@graph'] ? j['@graph'] : [j];
        arr.forEach(x => r.types.push(x['@type']));
      } catch (e) { r.jsonOk = false; r.jsonErr = e.message; }
    }
  } catch (e) { r.status = -1; r.jsonErr = e.message; }
  return r;
});

const bad = results.filter(r => r.status !== 200);
const noCanon = results.filter(r => r.status === 200 && !r.canonOk);
const noindexed = results.filter(r => r.noindex);
const badJson = results.filter(r => !r.jsonOk);

// Esperados de schema
function expectedTypes(p) {
  if (p === '/') return ['WebSite'];
  if (p === '/herramientas/') return ['CollectionPage'];
  if (/^\/herramientas\/[^/]+\/$/.test(p)) return ['CollectionPage', 'FAQPage'];
  if (/^\/herramientas\/[^/]+\/[^/]+\/$/.test(p)) return ['HowTo', 'FAQPage'];
  return [];
}
const schemaMissing = [];
for (const r of results) {
  const exp = expectedTypes(r.path);
  if (!exp.length) continue;
  const miss = exp.filter(t => !r.types.includes(t));
  if (miss.length) schemaMissing.push(r.path + ' → falta ' + miss.join(', ') + ' (tiene: ' + r.types.join(',') + ')');
}

console.log('\n=== 2) HTTP ===');
console.log('OK 200:', results.filter(r => r.status === 200).length, '/', results.length);
if (bad.length) bad.forEach(r => console.log('  ✗ ' + r.path + ' → ' + r.status));

console.log('\n=== 3) JSON-LD ===');
console.log('Páginas con JSON-LD inválido:', badJson.length ? badJson.map(r => r.path + ' (' + r.jsonErr + ')') : 'ninguna');
console.log('Schema esperado ausente:', schemaMissing.length ? schemaMissing : 'ninguno');

console.log('\n=== 4) CANONICAL ===');
console.log('Canonical ausente/incorrecto:', noCanon.length ? noCanon.map(r => r.path + ' → ' + r.canon) : 'ninguno');

console.log('\n=== 5) NOINDEX ===');
console.log('Páginas con noindex:', noindexed.length ? noindexed.map(r => r.path) : 'ninguna');

const globalIssues = faltanEnSitemap.length + sobranEnSitemap.length + bad.length + noCanon.length + noindexed.length + badJson.length + schemaMissing.length;
console.log('\n=== RESULTADO ===');
console.log(globalIssues === 0 ? '✅ Auditoría OK: sin incidencias.' : '⚠️ Incidencias detectadas: ' + globalIssues);
process.exit(globalIssues === 0 ? 0 : 1);
