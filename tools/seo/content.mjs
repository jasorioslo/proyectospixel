#!/usr/bin/env node
/**
 * ProyectosPixel — Generador de contenido SEO por herramienta
 *
 * Uso: node tools/seo/content.mjs tools/seo/specs-batch1.json
 *
 * Por cada spec inserta en herramientas/<cat>/<slug>/index.html:
 *   - <section class="tool-content"> (contenido + FAQ acordeón + enlaces internos)
 *   - JSON-LD HowTo + FAQPage antes de </head>
 * Idempotente: si ya tiene class="tool-content", se salta.
 */

import fs from 'node:fs';
import path from 'node:path';

const specsFile = process.argv[2];
if (!specsFile) { console.error('Uso: node tools/seo/content.mjs <specs.json>'); process.exit(1); }

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
  out.push('          <h2>Casos de uso</h2>');
  out.push('          <ul>');
  s.usos.forEach(u => out.push('            <li>' + u + '</li>'));
  out.push('          </ul>');
  if (s.ejemplos && s.ejemplos.length) {
    out.push('          <h2>Ejemplos</h2>');
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
    out.push('          <h2>Herramientas relacionadas</h2>');
    const links = s.relacionadas.map(r => '<a href="' + r.url + '">' + esc(r.label) + '</a>');
    out.push('          <p>Complétala con ' + links.join(', ').replace(/, ([^,]*)$/, ' o $1') + '.</p>');
  }
  out.push('        </section>');
  return out.join('\n');
}

function buildJsonLd(s) {
  const howto = {
    '@type': 'HowTo',
    name: s.howtoName,
    description: s.howtoDesc || s.h2_que,
    totalTime: 'PT2M',
    step: s.pasos.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.howtoSteps ? s.howtoSteps[i] : ('Paso ' + (i + 1)),
      text: String(p).replace(/<[^>]+>/g, '')
    }))
  };
  const faq = {
    '@type': 'FAQPage',
    mainEntity: s.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]+>/g, '') }
    }))
  };
  return '  <script type="application/ld+json">\n  ' + JSON.stringify({ '@context': 'https://schema.org', '@graph': [howto, faq] }) + '\n  </script>\n';
}

let done = 0, skipped = 0, errors = [];
for (const s of specs) {
  const file = path.join('herramientas', s.cat, s.slug, 'index.html');
  if (!fs.existsSync(file)) { errors.push('NO EXISTE: ' + file); continue; }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('class="tool-content"')) { skipped++; continue; }

  // 1) JSON-LD antes de </head>
  html = html.replace('</head>', buildJsonLd(s) + '</head>');

  // 2) Contenido antes del banner inferior (o de related-tools)
  const anchorA = /\n(\s*)<div id="ad-banner-bottom"/;
  const anchorB = /\n(\s*)<section class="related-tools">/;
  if (anchorA.test(html)) {
    html = html.replace(anchorA, '\n' + buildContent(s) + '\n$1<div id="ad-banner-bottom"');
  } else if (anchorB.test(html)) {
    html = html.replace(anchorB, '\n' + buildContent(s) + '\n$1<section class="related-tools">');
  } else {
    errors.push('SIN ANCLA: ' + file);
    continue;
  }

  fs.writeFileSync(file, html, 'utf8');
  done++;
  console.log('✅', s.slug);
}
console.log('\nGenerados:', done, '| omitidos (ya tenían):', skipped, '| errores:', errors.length ? errors : 'ninguno');
