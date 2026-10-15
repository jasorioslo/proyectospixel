#!/usr/bin/env node
/**
 * ProyectosPixel — Generador de contenido SEO por CATEGORÍA
 *
 * Uso: node tools/seo/content-categories.mjs tools/seo/specs-categorias.json
 *
 * Por cada spec inserta en herramientas/<cat>/index.html:
 *   - <section class="tool-content"> (intro + cómo elegir + casos de uso + FAQ + enlaces)
 *   - JSON-LD FAQPage antes de </head>  (la página ya trae CollectionPage)
 * Idempotente: si ya tiene class="tool-content", se salta.
 */

import fs from 'node:fs';
import path from 'node:path';

const specsFile = process.argv[2];
if (!specsFile) { console.error('Uso: node tools/seo/content-categories.mjs <specs.json>'); process.exit(1); }

const specs = JSON.parse(fs.readFileSync(specsFile, 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildContent(s) {
  const out = [];
  out.push('        <section class="tool-content">');
  out.push('          <h2>' + esc(s.h2_que) + '</h2>');
  s.que.forEach(p => out.push('          <p>' + p + '</p>'));
  out.push('          <h2>' + esc(s.h2_pasos) + '</h2>');
  out.push('          <ol class="step-list">');
  s.pasos.forEach(p => out.push('            <li>' + p + '</li>'));
  out.push('          </ol>');
  if (s.h2_extra) {
    out.push('          <h2>' + esc(s.h2_extra) + '</h2>');
    s.extra.forEach(p => out.push('          <p>' + p + '</p>'));
  }
  out.push('          <h2>Casos de uso</h2>');
  out.push('          <ul>');
  s.usos.forEach(u => out.push('            <li>' + u + '</li>'));
  out.push('          </ul>');
  if (s.ejemplos && s.ejemplos.length) {
    out.push('          <h2>Ejemplos rápidos</h2>');
    out.push('          <ul>');
    s.ejemplos.forEach(e => out.push('            <li><code>' + esc(e) + '</code></li>'));
    out.push('          </ul>');
  }
  out.push('          <h2>Preguntas frecuentes</h2>');
  out.push('          <div class="faq-list">');
  s.faqs.forEach(f => {
    out.push('            <details class="faq-item"><summary>' + esc(f.q) + '</summary><p>' + f.a + '</p></details>');
  });
  out.push('          </div>');
  if (s.relacionadas && s.relacionadas.length) {
    out.push('          <h2>Explora otras categorías</h2>');
    const links = s.relacionadas.map(r => '<a href="' + r.url + '">' + esc(r.label) + '</a>');
    out.push('          <p>Sigue con ' + links.join(', ').replace(/, ([^,]*)$/, ' o $1') + '.</p>');
  }
  out.push('        </section>');
  return out.join('\n');
}

function buildJsonLd(s) {
  const faq = {
    '@type': 'FAQPage',
    mainEntity: s.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]+>/g, '') }
    }))
  };
  return '  <script type="application/ld+json">\n  ' + JSON.stringify({ '@context': 'https://schema.org', '@graph': [faq] }) + '\n  </script>\n';
}

let done = 0, skipped = 0;
const errors = [];
for (const s of specs) {
  const file = path.join('herramientas', s.cat, 'index.html');
  if (!fs.existsSync(file)) { errors.push('NO EXISTE: ' + file); continue; }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('class="tool-content"')) { skipped++; continue; }

  html = html.replace('</head>', buildJsonLd(s) + '</head>');

  const anchor = /\n(\s*)<div id="ad-banner-bottom"/;
  if (anchor.test(html)) {
    html = html.replace(anchor, '\n' + buildContent(s) + '\n$1<div id="ad-banner-bottom"');
  } else {
    errors.push('SIN ANCLA: ' + file);
    continue;
  }

  fs.writeFileSync(file, html, 'utf8');
  done++;
  console.log('✅', s.cat);
}
console.log('\nGenerados:', done, '| omitidos (ya tenían):', skipped, '| errores:', errors.length ? errors : 'ninguno');
