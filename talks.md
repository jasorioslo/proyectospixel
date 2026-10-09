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

### TAREA-10.1 — Testing funcional de las 15 tools
- [ ] Verificar que cada tool funciona correctamente con input válido
- [ ] Verificar estado vacío (placeholder visible, sin errores)
- [ ] Verificar manejo de errores en tools que lo requieren (Morse, Base64, Unicode)
- [ ] Verificar "Copiar resultado" en cada tool
- [ ] Verificar "Limpiar" en cada tool
- [ ] Verificar que `trackToolUsage` se ejecuta al entrar a cada tool

### TAREA-10.2 — Testing responsive (Mobile First)
- [ ] Verificar layout en 320px, 375px, 768px, 1024px, 1440px
- [ ] Verificar que el textarea de entrada es usable en móvil (tamaño adecuado, no se zoom por inputs)
- [ ] Verificar que la barra de búsqueda funciona en móvil
- [ ] Verificar que las cards se adaptan al grid en cada breakpoint
- [ ] Verificar que dark mode se ve correcto en todos los tamaños

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

### TAREA-11.6 — Despliegue a producción
- [ ] Hacer push de todo el código completo a `main` en GitHub (si no se hizo en TAREA-11.1)
- [ ] Verificar que Cloudflare Pages hace deploy automático desde `main`
- [ ] Confirmar que el sitio está accesible en `proyectospixel.com`
- [ ] Confirmar que todas las tools cargan correctamente en la URL de producción
- [ ] Confirmar que HTTPS está activo y el certificado es válido
- [ ] Confirmar que `_redirects` funciona (www → non-www)
- [ ] Confirmar que `_headers` se aplican (verificar con `curl -I`)
- [ ] Confirmar que el service worker y manifest.json funcionan en producción

### TAREA-11.7 — Post-despliegue y verificación en producción
- [ ] Verificar con Google Search Console que el sitio está indexable
- [ ] Verificar que `sitemap.xml` es accesible en `/sitemap.xml`
- [ ] Verificar que `robots.txt` es accesible en `/robots.txt`
- [ ] Verificar que los Open Graph tags se ven correctamente con el debugger de Facebook/Twitter
- [ ] Correr Lighthouse en producción y verificar score > 90 en Performance y Accessibility
- [ ] Verificar que Cloudflare Analytics (si se usa) está capturando datos
- [ ] Probar "Instalar como app" en móvil Chrome (PWA)
- [ ] Probar que todas las tools funcionan offline después de primera visita
- [ ] Verificar que los contenedores de ads no causan CLS (Core Web Vitals)

---

## Verificaciones pendientes de bloques ya completados

- [ ] Verificar que las tools funcionan offline después de primera visita (BLOQUE 7)
- [ ] Verificar que `sitemap.xml` y `robots.txt` son accesibles en la URL de producción (BLOQUE 8)

---

## BLOQUE 12: Mejoras de la Web

### TAREA-12.1 — Auditoría y mejora del modo oscuro (dark mode)
- [ ] Auditar todas las páginas en dark mode (home, tools, header, footer, cards, botones, inputs, result-area, tool-workzone, tool-section, tool-controls, counters, freq-table, strength-meter)
- [ ] Corregir contraste de texto en dark mode (text-primary, text-secondary sobre fondos oscuros)
- [ ] Verificar que el gris #f4f4f4 de tool-container y tool-workzone tenga un equivalente correcto en dark mode
- [ ] Verificar que los botones verdes #c4de7c se vean bien en dark mode
- [ ] Verificar bordes, backgrounds y transiciones entre light/dark en todos los componentes
- [ ] Probar toggle dark/light en todas las páginas sin flashes de color

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