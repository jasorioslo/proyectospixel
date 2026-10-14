#!/usr/bin/env node
/**
 * ProyectosPixel — Research SEO por herramienta con Tavily
 *
 * Uso:   node tools/seo/research.mjs <slug> [<slug> ...]
 * Env:   TAVILY_API_KEY
 * Salida: seo/research/<slug>.md   (NO se commitea: .gitignore)
 *
 * Qué hace por cada slug:
 *   1) Tavily Search  → top 5 competidores para "<keyword> cómo usar"
 *   2) Tavily Extract → contenido limpio de los top N (por defecto 4)
 *   3) Escribe un .md con SERP + extractos + plantilla de análisis
 */

import fs from 'node:fs';
import path from 'node:path';

const API_KEY = process.env.TAVILY_API_KEY;
if (!API_KEY) {
  console.error('Falta TAVILY_API_KEY en el entorno.');
  process.exit(1);
}

const MAX_RESULTS = 5;
const MAX_EXTRACTS = 4;
const MAX_CHARS_PER_SOURCE = 6000;

const TOOLS = {
  'quitar-acentos': {
    keyword: 'quitar acentos online',
    url: 'https://proyectospixel.com/herramientas/texto/quitar-acentos/',
  },
  'contar-palabras-caracteres': {
    keyword: 'contador de palabras y caracteres online',
    url: 'https://proyectospixel.com/herramientas/texto/contar-palabras-caracteres/',
  },
  'comprimir-imagen': {
    keyword: 'comprimir imagen online',
    url: 'https://proyectospixel.com/herramientas/imagen/comprimir-imagen/',
  },
};

async function tavily(endpoint, payload) {
  const res = await fetch('https://api.tavily.com/' + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + API_KEY,
    },
    body: JSON.stringify({ api_key: API_KEY, ...payload }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(endpoint + ' → ' + res.status + ' ' + txt.slice(0, 300));
  }
  return res.json();
}

function slugifyFilename(slug) {
  return slug.replace(/[^a-z0-9-]/g, '');
}

async function research(slug) {
  const cfg = TOOLS[slug];
  if (!cfg) { console.warn('Sin configuración para slug:', slug); return; }
  console.log('🔎 Research:', slug, '→', cfg.keyword);

  // 1) SERP
  const search = await tavily('search', {
    query: cfg.keyword + ' cómo usar',
    search_depth: 'basic',
    max_results: MAX_RESULTS,
  });
  const results = (search.results || []).slice(0, MAX_RESULTS);
  console.log('   · SERP:', results.length, 'resultados');

  // 2) Extract de los mejores
  const urls = results.map(r => r.url).slice(0, MAX_EXTRACTS);
  let extracts = [];
  try {
    const ext = await tavily('extract', { urls });
    extracts = ext.results || [];
    console.log('   · Extract:', extracts.length, 'ok /', (ext.failed_results || []).length, 'fallidos');
  } catch (e) {
    console.warn('   · Extract falló:', e.message);
  }

  // 3) Markdown
  const out = [];
  out.push('# Research SEO — ' + slug);
  out.push('');
  out.push('- **Keyword principal:** ' + cfg.keyword);
  out.push('- **URL propia:** ' + cfg.url);
  out.push('- **Generado:** ' + new Date().toISOString());
  out.push('');
  out.push('## SERP (top ' + results.length + ')');
  out.push('');
  results.forEach((r, i) => {
    out.push('### ' + (i + 1) + '. ' + r.title);
    out.push('- URL: ' + r.url);
    out.push('- Score: ' + (r.score !== undefined ? r.score : '—'));
    out.push('- Snippet: ' + (r.content || '').replace(/\s+/g, ' ').slice(0, 350));
    out.push('');
  });

  out.push('## Contenido extraído');
  out.push('');
  extracts.forEach((e, i) => {
    out.push('### Fuente ' + (i + 1) + ': ' + e.url);
    out.push('```text');
    out.push((e.raw_content || '').replace(/```/g, "'''").slice(0, MAX_CHARS_PER_SOURCE));
    out.push('```');
    out.push('');
  });
  if (extracts.length === 0) {
    out.push('_(sin extractos — revisar fallos de extract)_');
    out.push('');
  }

  out.push('## Plantilla de análisis (rellenar)');
  out.push('');
  out.push('- **Secciones comunes en competidores:**');
  out.push('- **Preguntas (FAQ) que responden:**');
  out.push('- **Entidades/términos que co-ocurren:**');
  out.push('- **Longitud media (palabras):**');
  out.push('- **Huecos que NO cubren (nuestra oportunidad):**');
  out.push('- **Ángulo ProyectosPixel (privado/offline/sin registro):**');

  const dir = path.join('seo', 'research');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, slugifyFilename(slug) + '.md');
  fs.writeFileSync(file, out.join('\n'), 'utf8');
  console.log('   ✅ Guardado:', file);
}

const slugs = process.argv.slice(2);
if (slugs.length === 0) {
  console.error('Uso: node tools/seo/research.mjs <slug> [slug2 ...]');
  process.exit(1);
}
for (const s of slugs) {
  try { await research(s); } catch (e) { console.error('❌', s, e.message); }
}
