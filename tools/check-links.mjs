#!/usr/bin/env node
/* ProyectosPixel - Verificador de enlaces internos
   Recorre los .html del repo (ignora .git, node_modules, assets) y comprueba que
   cada href/src interno apunte a un archivo existente en disco.

   Uso:  node tools/check-links.mjs
   Salida: lista de enlaces rotos + resumen. Exit code 1 si hay rotos.

   Reglas: se ignoran externos (http/https//), mailto:, tel:, #, javascript:, data:
   y los enlaces con solo ancla. Las rutas de directorio resuelven a index.html. */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', 'assets']);
const SKIP_FILES = new Set(['template.html']);
const IGNORE_PROTO = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(p, out);
    } else if (name.endsWith('.html')) {
      out.push(p);
    }
  }
}

// Devuelve true si la ruta destino existe (archivo o carpeta con index.html)
function targetExists(absPath) {
  if (fs.existsSync(absPath)) {
    try { if (fs.statSync(absPath).isDirectory()) return fs.existsSync(path.join(absPath, 'index.html')); }
    catch { /* noop */ }
    return true;
  }
  // Sin extensión: probar como carpeta con index.html
  if (!path.extname(absPath)) {
    return fs.existsSync(path.join(absPath, 'index.html'));
  }
  return false;
}

function resolveTarget(href, fromFile) {
  let ref = href.split('#')[0].split('?')[0];
  if (ref === '') return null; // solo ancla
  let abs;
  if (ref.startsWith('/')) {
    abs = path.join(ROOT, ref);
  } else {
    abs = path.resolve(path.dirname(fromFile), ref);
  }
  return abs;
}

const ATTR_RE = /(?:href|src)\s*=\s*"([^"]+)"/gi;

const files = [];
walk(ROOT, files);

const broken = [];
let checked = 0;

for (const file of files) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let m;
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(html)) !== null) {
    const raw = m[1].trim();
    if (!raw || IGNORE_PROTO.test(raw)) continue;
    if (/[[\]{}]/.test(raw)) continue; // placeholders tipo [SLUG] o {x}
    const abs = resolveTarget(raw, file);
    if (abs === null) continue;
    checked++;
    if (!targetExists(abs)) {
      broken.push({ page: rel, link: raw });
    }
  }
}

console.log('Paginas analizadas: ' + files.length);
console.log('Enlaces internos comprobados: ' + checked);

if (broken.length) {
  console.log('\nEnlaces ROTOS (' + broken.length + '):');
  for (const b of broken) console.log('  ' + b.page + '  ->  ' + b.link);
  process.exit(1);
} else {
  console.log('\nOK: no hay enlaces internos rotos.');
}
