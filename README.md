# ProyectosPixel

Marketplace de herramientas online **gratuitas, rápidas y 100% privadas**: todo se procesa en el navegador del usuario. Ningún dato sale del dispositivo. Sitio estático multipágina optimizado para SEO.

🌐 **LIVE:** https://proyectospixel.pages.dev · Repo: https://github.com/jasorioslo/proyectospixel · Custom domain `proyectospixel.com` pendiente de adjuntar (TAREA-11.3)

---

## Qué incluye hoy

| Categoría | Tools | Ejemplos |
|-----------|-------|----------|
| Texto | 24 | Contar palabras y caracteres, Quitar acentos, Buscar y reemplazar, Filtrar líneas, Fusionar listas |
| Conversión | 7 | Morse, Base64, Unicode, Binario, JSON↔CSV, Markdown→HTML, Imágenes→PDF |
| Matemáticas | 12 | Generar lista de números, Combinaciones, Permutaciones, Combinar listas (A×B), Contador de clics |
| Seguridad | 11 | Contraseñas, ROT13, César, UUID, Verificador, Hashes, AES, HMAC, JWT, Comparar hash, Claves |
| Desarrollo | 6 | Formatear JSON, Minificar, Regex tester, Diff, Limpiar URLs, Codificar URL |
| Imagen | 6 | Comprimir, Convertir, Redimensionar, Marca de agua, Limpiar EXIF, Recortar |

**Full list:** `js/tools-data.js` (fuente única de verdad — añadir ahí cada tool nueva).

---

## Stack

- **HTML5 + CSS propio** (`css/styles.css`, sin Tailwind) + **JavaScript vanilla** — cero frameworks, cero build step.
- **100% client-side**: `localStorage` para tema y ranking de uso; WebCrypto para azar de calidad.
- **PWA**: service worker (`sw.js`) con precache completo → funciona offline tras la primera visita. Al cambiar assets, subir `CACHE_NAME`.
- **Webfonts**: Inter + Geist Mono (Google Fonts).
- **SEO**: title/description/canonical por página, Open Graph, Twitter Card, JSON-LD `WebApplication`/`WebSite`, `sitemap.xml`, `robots.txt`.
- **Diseño**: híbrido propio "Brutalist Soft" (base brutalista + glass/sombras suaves inspiradas en mcpmarket). Dark mode completo.

---

## Estructura

```text
/
├── index.html                      Home (hero, buscador, categorías, grids de cards)
├── privacidad.html / terminos.html Páginas legales
├── manifest.json / sw.js           PWA
├── robots.txt / sitemap.xml        SEO
├── branding.json                   Identidad visual (referencia)
├── css/styles.css                  Estilos globales (light/dark)
├── js/
│   ├── components.js               Header (cápsula glass) + Footer + tema + registro SW
│   ├── tools-data.js               ⭐ FUENTE ÚNICA: tools, iconos, renderers, helpers
│   ├── home.js                     Búsqueda en tiempo real + filtros de categoría
│   └── tools/                      Un JS por herramienta
├── herramientas/
│   ├── texto/                      Un HTML por herramienta de texto (+ template.html + index.html categoría)
│   ├── conversion/                 4 tools (Morse, Base64, Unicode, Binario)
│   ├── seguridad/                  3 tools (Contraseñas, ROT13, César)
│   ├── matematicas/                5 tools (Números, Combinaciones, Permutaciones, A×B, Contador)
│   ├── desarrollo/                 1 tool (Limpiar URLs)
├── assets/img/                     Íconos PWA, og-image, apple-touch
└── favicon.ico / favicon-32x32.png
```

---

## Cómo correr en local

Las rutas absolutas (`/css/...`) requieren un servidor HTTP (no abrir por `file://`):

```bash
cd proyectospixel
python -m http.server 8642
# abrir http://localhost:8642
```

El service worker se desactiva solo en `localhost`/`127.0.0.1`.

## Cómo añadir una herramienta nueva

1. Copiar `herramientas/texto/template.html` → `<slug>.html` (metas SEO + canonical + JSON-LD).
2. Crear `js/tools/<slug>.js` (patrón: input → `process()` → `result-area`; Copiar/Limpiar/tracking incluidos).
3. Registrar en `js/tools-data.js`: `{ slug, title (SEO ES), desc, category, featured }` + icono SVG.
4. Añadir URL a `sitemap.xml` y al precache de `sw.js` (+ subir `CACHE_NAME`).
5. Pasar el QA y marcar en `plan-dev.md` (checklist completo en ese documento).

---

## Documentación del proyecto

| Archivo | Contenido |
|---------|-----------|
| `Change: CHANGELOG.md` | Historial de cambios (formato Keep a Changelog) |
| `plan-dev.md` | Plan y control por herramienta (sprints, QA, incidencias) |
| `investigacion.md` | Competidores (SERPs), oportunidades y cola de construcción |
| `Planeacion.md` | Plan maestro del proyecto (identidad, arquitectura, fases) |
| `talks.md` | Checklist de despliegue y tareas reconocidas (analíticas, testing, deploy) |

## Deploy (pendente — Bloque 11)

Repositorio Git + Cloudflare Pages (build: none, output: `/`). El sitio se publicará en `proyectospixel.com` con `_redirects` (www → raíz) y `_headers` (CSP, nosniff, etc.).
