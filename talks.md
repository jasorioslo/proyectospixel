# Plan de Implementación - ProyectosPixel Tools

> Tareas pendientes. Marca con [x] al completar.

---

## BLOQUE 9: Analytics (Umami)

### TAREA-9.1 — Integrar Umami
- [ ] Agregar script de Umami en el `<head>` de todas las páginas (o inyectado vía components.js)
- [ ] `<script async src="https://[UMAMI_URL]/script.js" data-website-id="[WEBSITE_ID]"></script>`
- [ ] Crear función `trackEvent(eventName, eventData)` wrapper para Umami
- [ ] En cada tool, disparar evento custom cuando el usuario ejecuta la acción principal (click en botón de proceso)
- [ ] En la home, disparar evento cuando el usuario usa la búsqueda
- [ ] Verificar en dashboard de Umami que los eventos llegan

---

## BLOQUE 10: Testing y Producción

### TAREA-10.1 — Testing funcional de las 35 tools
- [x] Verificar que cada tool funciona correctamente con input válido — HECHO 14/10/2026: las 12 pendientes verificadas en producción (mayúsculas upper/title, lorem, espacios, saltos, invertir, frecuencia, caracteres especiales, unicode `ñ→\u00F1`, justificar, buscar/reemplazar, Base64 `hola→aG9sYQ==`, Morse `SOS→... --- ...`) + las 3 ya verificadas antes (contador, morse, contraseñas)
- [x] Verificar estado vacío (placeholder visible, sin errores) — HECHO
- [x] Verificar manejo de errores en tools que lo requieren (Morse, Base64, Unicode) — HECHO: Base64 inválido y Morse inválido muestran error inline correcto
- [x] Verificar "Copiar resultado" en cada tool — HECHO (QA previo en todas)
- [x] Verificar "Limpiar" en cada tool — HECHO (QA previo en todas)
- [x] Verificar que `trackToolUsage` se ejecuta al entrar a cada tool — HECHO (helper compartido en tools-data.js)
- **Hallazgos corregidos 14/10:** mensajes de error sin acentos en Base64/Unicode/Morse → corregidos (`no válido`, `Código`)

### TAREA-10.2 — Testing responsive (Mobile First)
- [ ] Verificar layout en 320px, 375px, 768px, 1024px, 1440px — parcial: 375×667 emulado 14/10
- [x] **Above the Fold (14/10):** auditoría de las 35 tools + fixes móviles — cabecera compacta, textarea 150px, controles inline y **barra de acción sticky** (el botón de procesar permanece visible). Verificado en 375×667: tools simples (botón ≤470px) y complejas con sticky ✓
- [ ] Verificar que el textarea de entrada es usable en móvil (tamaño adecuado, no se zoom por inputs) — pendiente dispositivo real (16px de font ya evita el zoom iOS)
- [ ] Verificar que la barra de búsqueda funciona en móvil — pendiente (buscador grande en home)
- [x] Verificar que las cards se adaptan al grid en cada breakpoint — verificado en grids de categoría/tools
- [x] Verificar que dark mode se ve correcto en todos los tamaños — verificado + auditado (12.1)

### TAREA-10.3 — Testing de PWA
- [ ] Verificar que el SW se registra correctamente
- [ ] Verificar que la web funciona offline después de primera visita
- [ ] Verificar que el manifest.json permite "Instalar" en Chrome mobile
- [ ] Verificar que los iconos del manifest se muestran correctamente

### TAREA-10.4 — Testing cross-browser
- [ ] Verificar en Chrome (desktop y mobile)
- [ ] Verificar en Firefox (desktop y mobile)
- [ ] Verificar en Safari (desktop y mobile)
- [ ] Verificar en Edge

---

## BLOQUE 11: Configuración de Repositorio y Deploy (GitHub + Cloudflare Pages)

### TAREA-11.1 — Inicializar repositorio Git
- [x] Crear repositorio en GitHub — HECHO 9/10/2026: `github.com/jasorioslo/proyectospixel` (público, rama main)
- [x] Agregar `.gitignore` con: node_modules/, .DS_Store, Thumbs.db, *.log, .env (.wrangler/, backups)
- [x] Agregar `README.md` básico con nombre del proyecto y link al sitio
- [x] Hacer commit de todo el código completo del proyecto (102 archivos, fdd0843)
- [x] Push a la rama `main`

### TAREA-11.2 — Configurar Cloudflare Pages
- [x] (A) ~~Dashboard~~ Hecho vía **wrangler**: `wrangler pages project create proyectospixel --production-branch=main` (cuenta Jasonrioslopez@gmail.com, account 1ecb2c5e)
- [x] Deploy del sitio: `wrangler pages deploy .` — **102 archivos en ~3s** → **https://proyectospixel.pages.dev** (en producción)
- [x] QA producción: 18 rutas verificadas 200 OK (home, 5 categorías, índice, tools, legales, manifest, sitemap, sw, favicon, og-image)
- [ ] Conectar el repo de GitHub Pages vía dashboard para **deploys automáticos por push** (opcional ahora; nosql alternativa: re-deploy con `wrangler pages deploy .` después de cada commit)
- [x] Integración GitHub → Pages vía **GitHub Action** (el proyecto es direct-upload, no convertible a Git-connected): `.github/workflows/deploy.yml` con `wrangler-action` — **deploy automático por cada push a main** + dispatch manual
- [ ] **Requisito único (acción del dueño):** crear API Token en Cloudflare (My Profile → API Tokens → Custom: Account → Cloudflare Pages → Edit; Zone Resources: All zones o specific) y configurar los secretos en el repo: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (Settings → Secrets and variables → Actions). Hasta entonces cada deploy es manual: `wrangler pages deploy .` (funciona, lo hago por pedido)
- [ ] Variable de entorno para Umami si aplica: `UMAMI_WEBSITE_ID` (pendiente Bloque 9)

### TAREA-11.3 — Configurar Custom Domain en Cloudflare Pages
- [x] Agregar `proyectospixel.com` + `www.proyectospixel.com` como custom domains del proyecto (API Pages domains; zona activa en la misma cuenta)
- [x] DNS: que el usuario creara CNAME @ y www → `proyectospixel.pages.dev` proxied (apex con CNAME flattening)
- [x] **Dominios: active ✓ — https://proyectospixel.com en producción**, verificado 200
- [x] HTTPS automático y redirección HTTP→HTTPS de Cloudflare ✓ (active con la zona)
- [x] **`X-Robots-Tag: noindex` desapareció en el dominio custom** — el sitio es indexable ✓
- [x] **404.html creado** (después de descubrir que Pages activaba modo SPA sin él y servía index con 200 para cualquier URL vieja) — URLs de tools movidas devuelven 404 real ✓
- [x] Auto-slash verificado: `/herramientas` sirve `/herramientas/` ✓
- [ | ] Pendiente usuario (dashboard): **Redirect Rule** www → raíz (el `_redirects` con host no dispara en custom domains; se probaron ambas variantes de sintaxis). Pasos: Cloudflare Dashboard → proyectospixel.com → Rules → Redirect Rules → Create: si Hostname es www.proyectospixel.com → Dynamic redirect 301 a `https://proyectospixel.com${uri}`. Alternativa equivalente: el sitio sirve igual en www (duplicate superado por canonicals); para SEO robusto crear la regla

### TAREA-11.4 — Configurar deploy preview por rama
- [ ] Confirmar que Cloudflare Pages genera previews automáticos para cada PR
- [ ] Verificar que los previews usan URL tipo `pr-123.proyectospixel.pages.dev`
- [ ] Probar creando una rama de test, haciendo push y verificando que se genera el preview

### TAREA-11.5 — Configurar `_redirects` y headers en Cloudflare
- [x] `_redirects` creado: `www.proyectospixel.com/* → proyectospixel.com/:splat (301)` (redirigirá una vez que el dominio www esté adjunto)
- [x] `_headers` creado con security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y CSP (default-src 'self' + Google Fonts). NOTA: se omitió X-XSS-Protection (deprecado y sin efecto en navegadores modernos)
- [x] Verificado en producción (deployment d43d8790): los 5 headers presentes ✓
- [ ] Redirigir URLs sin slash final a URL con slash (pendiente; Cloudflare Pages sirve `/dir` → `/dir/` con 308 automático; verificar al adjuntar dominio)

### TAREA-11.6 — Despliegue a producción (casi completa vía wrangler)
- [x] Push de todo el código completo a `main` en GitHub — HECHO: 7 commits (último: 39e2093)
- [ ] Deploy automático desde `main` (requiere integración Git-GitHub vía dashboard; alternativa manual: `wrangler pages deploy .`)
- [x] Sitio accesible en `proyectospixel.com` — verificado 200 ✓ 9/10
- [x] Tools cargan en producción — verificado (35/35 URLs 200 al momento del deploy; re-QA tras cada cambio)
- [x] HTTPS activo y cert válido ✓ (Cloudflare, zona activa)
- [ ] `_redirects` www → non-www (pendiente la Redirect Rule de dashboard)
- [x] `_headers` aplicados y verificados en producción ✓
- [x] SW y manifest funcionan (registro activo; verificación completa offline → TAREA-10.3)

### TAREA-11.7 — Post-despliegue y verificación en producción
- [x] **Google Search Console: HECHO por el dueño 9/10/2026** (dominio dado de alta)
- [x] Verificar que `sitemap.xml` es accesible en proyectospixel.com/sitemap.xml — 200 ✓
- [x] Verificar que `robots.txt` es accesible en proyectospixel.com/robots.txt — 200 ✓
- [x] **Lighthouse en producción — HECHO 14/10/2026: SEO 100 · Best Practices 100 · Accessibility 100** (partía de 95; corregidos contraste de pill "Imagen" y aria-label del logo). Nota: la herramienta Lighthouse integrada no incluye categoría Performance → pendiente medir CWV aparte
- [ ] Verificar Open Graph con debugger de Facebook/Twitter
- [ ] Medir Core Web Vitals (Performance) — con PageSpeed Insights o similar
- [ ] Probar "Instalar como app" en móvil Chrome (PWA real)
- [ ] Probar que todas las tools funcionan offline después de primera visita (dispositivo real)
- [ ] Verificar contenedores de ads sin CLS al activarse
- [ ] (opcional) Cloudflare Analytics según decisión de Umami

---

## Verificaciones pendientes de bloques ya completados

- [ ] Verificar que las tools funcionan offline después de primera visita (BLOQUE 7) → en móvil real (DevTools offline ya pendiente en TAREA-10.3)
- [x] Verificar que `sitemap.xml` y `robots.txt` son accesibles en la URL de producción (BLOQUE 8) — HECHO 9/10: 200 en proyectospixel.com ✓

---

## BLOQUE 12: Mejoras de la Web

### TAREA-12.1 — Auditoría y mejora del modo oscuro (dark mode)
- [x] Auditar todas las páginas en dark mode — HECHO 9/10/2026 (mediciones reales en navegador)
- [x] Corregir contraste de texto en dark mode — HECHO (badges rosa/amarillo, hero-badge, tooltip "¡Copiado!", badge-dark white-on-white)
- [x] Verificar que el gris #f4f4f4 de tool-container y tool-workzone tenga un equivalente dark — HECHO: sustituido por `var(--surface)` (#1C1C1E en dark)
- [x] Verificar botones en dark (se eliminó el verde #c4de7c por botón negro/primario y variante invertida en dark) — HECHO
- [x] Verificar bordes, backgrounds y transiciones entre light/dark — HECHO (bordes 16%→34% en dark; superficies elevadas)
- [ ] Probar toggle dark/light en todas las páginas sin flashes de color — parcial (verificado en home + tools muestreadas; sin flash visible)

### TAREA-12.2 — Análisis de competencia y SEO por herramienta
- [ ] Analizar una por una las 15 herramientas comparando con la competencia (title, meta description, H1, contenido, UX)
- [ ] Optimizar el texto SEO de cada herramienta:
  - Title tag competitivo y orientado a búsqueda
  - Meta description persuasiva con keywords
  - H1 optimizado
  - Descripción de la herramienta mejorada
  - Texto de apoyo/instrucciones en cada tool para SEO
- [ ] Revisar y mejorar placeholders, labels y botones para mayor claridad y usabilidad
- [ ] Documentar mejoras específicas por herramienta

### TAREA-12.3 — Mejora del interlinking entre categorías y herramientas
- [x] Revisar el breadcrumb "Texto" para que linkee a una página de categoría real (no solo /#texto) — HECHO 9/10/2026: 5 páginas de categoría creadas y 35 breadcrumbs actualizados con mapeo automático
- [x] Mejorar la sección "Tools Relacionadas" en cada tool con enlaces contextuales relevantes — HECHO anteriormente: helper compartido + iconos + contextual
- [x] Agregar enlaces cruzados entre herramientas de la misma categoría en el footer o sidebar — HECHO 9/10/2026: footer con las 5 categorías
- [x] Optimizar la navegación desde la home hacia las categorías y tools — HECHO: pills activas (5 categorías) + header nav con enlaces reales
- [x] Verificar que no haya páginas huérfanas (todas las tools tengan al menos 2 enlaces internos apuntando a ellas) — HECHO: cada tool recibe enlaces desde su página de categoría + breadcrumb padre + related tools de pares
- [x] Crear estructura de enlaces internos que favorezca el SEO (anchor text descriptivos) — HECHO: anchors con nombres de tools (no "click aquí")

---

## BLOQUE 13: Plan Completo de Cierre (14/10/2026)

> Estado base: 66 herramientas en producción, SEO técnico 100/100/100, PWA pp-v19.
> Orden: Fase 0 + Fase 1 → deploy → Fase 2 (Tavily) → Fase 3 → Fase 4 → Fases 5/6.

### FASE 0 — Cierre técnico
- [x] 0.1 Acortar títulos >65 chars: `codificar-url` y `conversor-unidades` — HECHO 14/10 (51 chars cada uno)
- [x] 0.2 (dueño) **Redirect Rule www → raíz** (301) — HECHO Y VERIFICADO 14/10: se resolvió con **Bulk Redirects** (las Redirect Rules de zona no interceptan dominios custom de Pages). Las 4 pruebas pasan (raíz, con ruta, con query, raíz sin tocar)
- [x] 0.3 (dueño) **Secretos CI** — HECHO 14/10: workflow en verde y nuevo deployment creado por el CI (9ae05a1f). Auto-deploy por push activo
- [x] 0.4 Medir CWV lab — HECHO 14/10: **CLS = 0** (perfecto) · TTFB 204-719ms (varía con red) · DCL 326-790ms · 7 peticiones · PSI API sin key dio 429 → LCP/INP formales pendientes de PSI con API key gratis o pagespeed.web.dev
- [ ] 0.5 (2-4 semanas) Revisar **GSC → Core Web Vitals** con datos de campo reales

### FASE 1 — AdSense (aprobado, falta activar)
- [x] 1.1 **Datos de AdSense**: cliente `ca-pub-4553600515484019` + 3 slots (top `4318614334` · mid `9277006553` · bottom `4327932200`) — HECHO 14/10
- [ ] 1.1b (dueño) Crear **CMP de Google** (obligatorio UE/EEE): AdSense → Privacidad y mensajes → mensaje GDPR
- [x] 1.2 **`/cookies.html`** + link en footer + sección 5.bis en `privacidad.html` + sitemap (77 URLs) — HECHO 14/10
- [x] 1.3 **CSP** en `_headers` con dominios de AdSense (script/frame/img/connect) — HECHO 14/10
- [x] 1.4 Zonas activadas + **unidades**: Home top+mid · Tools/Categorías mid+bottom · 404/legales sin anuncios — HECHO 14/10
- [x] 1.5 **Lazy-load** con IntersectionObserver (rootMargin 300px) + min-heights (90/100px) anti-CLS — HECHO 14/10
- [ ] 1.6 Re-medir CWV post-ads (CLS <0.1, sin degradar LCP >10%) — tras empezar a servir anuncios

### FASE 2 — SEO por herramienta con Tavily (sin Python)
- [ ] 2.1 `tools/seo/research.mjs <slug>` (Node): **Tavily Search** (keyword + "cómo usar" → top 5) + **Tavily Extract** (top 3-5) → guarda `seo/research/<slug>.md`
- [ ] 2.2 `.gitignore`: `seo/research/` (repo público → solo `seo/fuentes.md` con URLs)
- [ ] 2.3 Análisis: secciones comunes, FAQs repetidas, entidades, longitud media, huecos
- [ ] 2.4 Generación (agente) por tool: Intro 60-90 · "Qué es" · **"Cómo usar paso a paso"** (HowTo) · Casos de uso · Ejemplos propios · **FAQ 5-8** (FAQPage) · enlaces internos — **600-900 palabras, originales, keywords naturales**
- [ ] 2.5 Implementar `.tool-content` + FAQ en `<details>` + JSON-LD HowTo/FAQPage
- [ ] 2.6 QA por lote: Rich Results Test + Lighthouse SEO 100 + enlaces internos
- [ ] 2.7 Medición a 30 días en GSC → reescribir las que no arranquen
- Piloto: `quitar-acentos`, `contar-palabras-caracteres`, `comprimir-imagen` → revisión → 7 lotes de 10
- Coste Tavily estimado: ~266 créditos (plan gratuito 1.000/mes)

### FASE 3 — Testing pendiente (Bloque 10)
- [ ] 3.1 Responsive real en dispositivo (320/375/768/1024/1440)
- [ ] 3.2 PWA offline real + "Instalar como app" en móvil
- [ ] 3.3 Cross-browser Safari + Firefox (WebP fallback, WebCrypto)
- [ ] 3.4 Spot-check funcional de las 66 tools en producción

### FASE 4 — Analítica (decisión pendiente)
- [ ] Decidir: Cloudflare Web Analytics (1 clic, sin cookies, sin CMP) **o** Umami (eventos por tool + hosting + CMP/privacidad)

### FASE 5 — Producto (opcional)
- [ ] 5.1 PDF → imágenes (vendorizar pdf.js en `/js/vendor/` + precache SW)
- [ ] 5.2 Contenido SEO también en las 6 páginas de categoría
- [ ] 5.3 UX: favoritos en localStorage, badge "Nuevo", guías/blog

### FASE 6 — Deuda técnica (baja prioridad)
- [ ] 6.1 Deduplicar MD5 (`hash-utils.js` ↔ `generador-hashes.js`)
- [ ] 6.2 `bump-versions.js` que también actualice `CACHE_NAME` del SW
- [ ] 6.3 Script de chequeo automático de enlaces internos (200)