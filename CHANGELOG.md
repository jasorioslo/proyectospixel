# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [No publicado]

### Fixed
- **Texto/icono de favorito casi invisible en tema claro** (15/10/2026): al marcar favorito se usaba `--secondary` (#FEF0B9, amarillo pálido) como color de texto e icono, ilegible sobre fondo blanco. Se añade la variable dedicada **`--favorite`** con buen contraste en ambos temas (`#8A5200` claro · `#FACC15` oscuro). Ratios medidos: botón 5.35:1 (claro) y 8.47:1 (oscuro); estrella 6.39:1 y 11.11:1 — todos ≥ AA. El botón de la tool se resalta además con fondo tintado y negrita al estar activo. Bump `?v=36` + SW `pp-v36`.
- **Service Worker podía servir assets antiguos tras un despliegue** (15/10/2026): con estrategia *Cache-First* para JS/CSS, si un asset quedaba cacheado durante la ventana de propagación de un deploy, permanecía viejo (detectado al activar los favoritos: el SW servía el `home.js` anterior). Ahora:
  - Assets estáticos → **Stale-While-Revalidate** (sirve de caché al instante y se auto-refresca en 2.º plano → la caché se auto-cura).
  - El precache de `ASSETS` usa `cache: 'reload'` (ignora la caché HTTP al instalar) y tolera fallos individuales.
  - Bump `?v=35` + SW `pp-v35`.
- **CSP bloqueaba servicios legítimos** (15/10/2026): la `Content-Security-Policy` no permitía el beacon de **Cloudflare Web Analytics** (`static.cloudflareinsights.com` en `script-src`, `cloudflareinsights.com` en `connect-src`), por lo que la analítica (ya activada en el panel de Cloudflare) no registraba datos. Tampoco permitía `https://*.adtrafficquality.google` (SODAR de AdSense) en `connect-src`. Corregido en `_headers`.
- **Enlaces internos rotos (6) en el contenido SEO** (15/10/2026): rutas con categoría equivocada apuntaban a 404 — `cifrado-rot13` estaba como `/texto/` (es `seguridad`), `extraer-columnas-texto` como `/matematicas/` (es `texto`) y `decodificar-jwt` como `/desarrollo/` (es `seguridad`). Corregido en las 6 páginas y en los specs de origen. Detectado con el nuevo verificador de enlaces.
- **Accesibilidad 95 → 100 en Lighthouse** (14/10/2026):
  - `.pill.disabled` ("Imagen · Próximamente") tenía contraste 3.12–3.72 (opacidad 50%) → ahora fondo neutro con `--text-secondary` (ratio >4.5:1)
  - `aria-label` del logo no coincidía con el texto visible → eliminado (el texto visible "Px ProyectosPixel" es el nombre accesible)
- **Mensajes de error con acentos**: Base64/Unicode/Morse tenían "no valido"/"Codigo" → "no válido"/"Código"
- Bump de assets a `?v=10` + SW `pp-v10`

### Changed
- **Deuda técnica (Fase 6)** (15/10/2026):
  - **6.1 MD5 deduplicado**: `generador-hashes.js` usa ahora el módulo compartido `js/tools/hash-utils.js` (`ProyectosPixel.hashers`), eliminando la copia inline del algoritmo. Mismo resultado verificado (md5/sha1/sha256).
  - **6.2 `bump-versions.js`** actualiza también el `CACHE_NAME` del service worker (`pp-vN`) → se acabó el bump manual del `sw.js`.
  - **6.3 `tools/check-links.mjs`**: verificador de enlaces internos (resuelve rutas de directorio a `index.html`, ignora externos/anclas/plantilla). Enganchado al **CI** antes del deploy.
  - **`tools/check-tools.mjs`** (QA): spot-check de las 66 tools en producción/local (200 + interfaz + JS + `.tool-content`).
  - Bump `?v=32` + SW `pp-v32`
- **Tools Relacionadas — cards compactas** (según feedback): solo **icono + título + badge**, sin descripción y con **altura uniforme** (min-height 156px, badge anclado abajo) → relación 6 cards alineadas en cualquier tool. La home conserva las descripciones en sus cards completas.
- **CI (GitHub Actions) con guarda anti-fallos**: si no existen los secretos `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`, el job se **omite limpiamente** (sin correos de "Run failed") y muestra instrucciones; en cuanto se configuren, despliega automático sin tocar nada.
- Bump de assets a `?v=17` + SW `pp-v17`

### Added
- **⭐ FASE 5.3a — Favoritos + badge "Nuevo"** (15/10/2026):
  - **Favoritos**: estrella en cada tarjeta (home y categorías) y botón «Añadir a favoritos» en la página de cada herramienta. Se guardan en `localStorage` (`pp-favorites`) y aparece una sección **«Tus favoritos»** en la home (solo si hay alguno). Accesible por teclado (Enter/Espacio) y con `aria-pressed`.
  - **Badge «Nuevo»**: en las tarjetas de herramientas recientes; **auto-caduca a los 30 días** (lista `NEW_TOOLS` editable en `js/tools-data.js`).
  - Detalle de UI: las tarjetas pasan a un contenedor `.card-cell` (la estrella es un `<button>` hermano del enlace, no anidado → HTML/a11y correctos); las tarjetas relacionadas compactas no llevan estrella.
  - Fix menor: eliminado un `</span>` suelto en las píldoras de categoría de la home.
  - Bump `?v=34` + SW `pp-v34`
- **🗂️ FASE 5.2 — Contenido SEO en las 6 páginas de categoría** (15/10/2026):
  - Generador `tools/seo/content-categories.mjs` + `tools/seo/specs-categorias.json` (mismo enfoque que las tools, idempotente)
  - Cada categoría (texto, imagen, seguridad, matemáticas, conversión, desarrollo) ahora tiene: intro («qué son»), «cómo elegir/editar paso a paso», bloque de privacidad, casos de uso, 5 preguntas frecuentes en acordeón y enlaces a las otras categorías
  - **JSON-LD `FAQPage`** añadido a cada categoría (convive con el `CollectionPage` que ya existía)
  - Bump `?v=33` + SW `pp-v33`
- **📝 FASE 2 — Contenido SEO por herramienta (23/66 publicadas)** (14/10/2026):
  - **Pipeline Tavily** (`tools/seo/research.mjs`): Search + Extract → `seo/research/<slug>.md` (gitignored; el repo es público)
  - **Generador de contenido** (`tools/seo/content.mjs` + specs JSON por lote): inserta `.tool-content` + FAQ en acordeón + **JSON-LD HowTo + FAQPage** de forma idempotente
  - CSS nuevo: `.tool-content`, `.faq-item` (acordeones) y `.step-list` (pasos numerados)
  - **23 páginas con contenido propio** (600-800 palabras, original, ángulos de privacidad/offline), verificado en producción con schema válido y FAQ funcional
  - Método replicable: specs compactas por herramienta → lote → validación automática → deploy por CI
  - Corrección funcional: el checkbox “omitir filas sin esa columna” de *Extraer columnas* ahora hace lo que dice (conserva línea vacía al desactivarlo)
  - Bump `?v=26` + SW `pp-v26`
- **✅ FASE 2 COMPLETADA — Contenido SEO en las 66/66 herramientas** (14/10/2026):
  - **Lote 3** (v27): separar-keywords-genero · limites-redes · convertir-imagen · redimensionar-imagen · marca-de-agua · limpiar-exif · recortar-imagen · codificar-url · limpiar-lista-urls · formatear-json
  - **Lote 4** (v28): minificar-codigo · regex-tester · comparar-textos · texto-a-morse · convertir-unicode-texto · base64 · texto-a-binario · json-a-csv · markdown-a-html · imagen-a-pdf
  - **Lote 5** (v29): generar-contrasenas · cifrado-rot13 · cifrador-cesar · generador-uuid · verificador-contrasenas · generador-hashes · cifrar-texto-aes · generador-hmac · decodificar-jwt · comparar-hashes
  - **Lote 6** (v30): generar-par-claves · generar-lista-numeros · generar-combinaciones · combinar-lineas-listas · generador-permutaciones · contador-clics · calculadora-porcentajes · calculadora-descuentos · estadistica-basica · convertidor-bases
  - **Lote 7** (v31): conversor-unidades · regla-de-tres · generador-tabla-multiplicar
  - Todas con **HowTo + FAQPage** válidos y contenido original (600-800 palabras, ángulos de privacidad/offline)
  - Bump `?v=31` + SW `pp-v31`
- **💰 FASE 1 — AdSense ACTIVADO** (14/10/2026):
  - Cliente `ca-pub-4553600515484019` + 3 unidades: **top** `4318614334` · **mid** `9277006553` · **bottom** `4327932200`
  - **Montaje centralizado en `components.js`** (`initAds`/`mountAd`): script de AdSense cargado **una sola vez** y **lazy** (IntersectionObserver con rootMargin 300px) → no bloquea el render ni LCP
  - **Reparto de zonas**: Home → top + mid · Tools y categorías → mid + bottom · 404 y legales → **sin anuncios** (además de la exclusión por ruta)
  - **Home SIN anuncios** (decisión del dueño, 14/10): contenedores eliminados de `index.html`; los anuncios quedan solo en tools y categorías (mid + bottom)
  - **Fix de duplicado**: condición de carrera entre el observer y el fallback podía inyectar 2 `<ins>` por zona → resuelto con cola de carga del script + guarda por contenedor (verificado: 1 por zona)
  - `.ad-container` activado (antes `display:none`) con reserva anti-CLS de 90/100px y estilos para las `<ins>`
  - **`/cookies.html`**: política de cookies completa (CMP UE, cookies de Google Ads, cómo revocar) + enlace en el footer + sección 5.bis en `privacidad.html` + sitemap (77 URLs)
  - **CSP ampliada** en `_headers` con dominios de AdSense (script/frame/img/connect)
  - Bump `?v=20` + SW `pp-v20`
  - Pendiente del dueño: **CMP de Google** (AdSense → Privacidad y mensajes) para el consentimiento UE
- **🔐 FASE 5 — Seguridad (5 herramientas nuevas)** (14/10/2026):
  - **Cifrar y Descifrar Texto (AES-256-GCM + PBKDF2)** — formato `v1:iteraciones:base64`, contraseña incorrecta detectada; QA: round-trip ✓ y error con clave mala ✓
  - **Generador de HMAC** (SHA-256/384/512) — QA con vector oficial: `f7bc83f4…3cd8` exacto ✓
  - **Decodificador de JWT** (header/payload/fechas + avisos de expirado y alg none)
  - **Comparar Hash y Texto** (detección automática de algoritmo por longitud)
  - **Generar Par de Claves** RSA-2048 (RSA-OAEP) o ECDSA P-256 en PEM, vía WebCrypto
  - Nuevo helper compartido `js/tools/hash-utils.js` (MD5 + SHA + HMAC)
- **🧮 FASE 6 — Matemáticas (7 herramientas nuevas)** (14/10/2026):
  - **Calculadora de Porcentajes** (5 operaciones: X% de Y, qué %, variación, aumento, descuento) — QA: 15% de 240 = 36 ✓
  - **Calculadora de Descuentos e IVA** — QA: 100€ -20% + 21% IVA = 96,80€ ✓
  - **Estadística Básica** (media, mediana, moda, cuartiles, varianza y desviación pobl./muestral) — QA exacto ✓
  - **Conversor de Unidades** (longitud, masa, volumen, área, velocidad, datos, tiempo y temperatura) — QA: 100°C = 212°F ✓
  - **Convertidor de Bases** (bin/oct/dec/hex con validación) — QA: 1010₂ = 10 ✓
  - **Regla de Tres** (directa e inversa) — QA: 4→10, 6→15 ✓
  - **Generador de Tablas de Multiplicar** (una o un rango, multiplicador máximo configurable)
- Total del sitio: **66 herramientas** en 6 categorías · sitemap **76 URLs** · SW `pp-v16`

### Fixed
- **Bug MD5** (afectaba a Generador de Hashes y Comparar Hashes): el bucle de conversión hex emitía solo 16 caracteres en lugar de 32 → corregido; validado con vectores oficiales (`md5("")` y `md5("abc")`)
- **🧰 LOTE TEXTO/SEGURIDAD — 6 herramientas nuevas** (14/10/2026):
  - **Generador de Slugs** (títulos → URLs limpias, quita tildes/símbolos, separador y límite configurables)
  - **Codificar y Decodificar URL** (percent-encoding, componente o URL completa, con manejo de escapes inválidos)
  - **Generador de UUID** v4 (hasta 100, mayúsculas, sin guiones — usa WebCrypto)
  - **Verificador de Contraseñas** (entropía, fortaleza 0-5 con barras, chequeos y **tiempo de descifrado estimado**)
  - **Generador de Hashes** (SHA-1/256/384/512 vía WebCrypto + **MD5 implementado a mano**; validado: SHA-256("abc") correcto)
  - **Límites de Redes Sociales** (8 plataformas con barras de progreso: X, IG, TikTok, Meta/Título SEO, SMS, WhatsApp, YouTube)
- **🔄 FASE 4 — Conversión de archivos (3 herramientas)**, todas sin dependencias externas:
  - **JSON ↔ CSV** bidireccional (CSV quoting correcto, delimitadores , ; tab, cabeceras, límite 10k filas)
  - **Markdown → HTML** con **parser propio** (títulos, negritas/cursivas, código inline/bloque, listas, citas, enlaces, imágenes, hr) + vista previa + escape seguro de HTML (verificado: 0 scripts inyectables)
  - **Imágenes → PDF** con **escritor PDF propio** (PDF 1.4, JPEG DCTDecode, páginas A4 centrada o tamaño imagen, múltiples imágenes) — cero librerías, coherente con la promesa offline
  - Estilos nuevos: `.md-preview`
- Total del sitio: **54 herramientas** · sitemap **64 URLs** · SW `pp-v15`

### Fixed
- **Parser Markdown**: el escape de HTML se aplicaba antes del parseo y rompía la sintaxis `>` (citas) — refactorizado (estructura sobre texto crudo, escape solo en el contenido)
- **Verificador de Contraseñas**: el HTML del resumen se mostraba literal (`<strong>`) → ahora usa `innerHTML` controlado
- **⚙️ FASE 3 — 4 herramientas de Desarrollo** (14/10/2026, QA verificado en navegador):
  - **Formatear y Validar JSON** (indentación 2/4/tab, ordenar claves, validación en vivo con línea y columna del error)
  - **Minificar HTML, CSS y JS** (con estimación de ahorro; JS conservador con aviso)
  - **Probador de Expresiones Regulares** (resaltado de coincidencias, flags g/i/m/s/u, tabla de grupos capturados)
  - **Comparar Dos Textos (diff)** con algoritmo LCS (líneas añadidas/eliminadas coloreadas + estadísticas)
  - Estilos nuevos: `.regex-highlight`, `.diff-view/.diff-add/.diff-del`
  - Categoría Desarrollo ahora con 5 tools; sitemap 55 URLs; SW pp-v13; **total del sitio: 45 herramientas**
- **🖼️ FASE 2 — 6 herramientas de Imagen** (14/10/2026, QA end-to-end en navegador con imágenes generadas):
  - **Comprimir Imagen** (calidad + escala + formato): probado 2.8 MB → 97 KB (**-97%**)
  - **Convertir Imagen** a WebP/PNG/JPG con detección de soporte del navegador (aviso y fallback a PNG en Safari/Firefox)
  - **Redimensionar Imagen** (px o %, proporción bloqueable): probado 1200×800 → 400×267
  - **Añadir Marca de Agua** (texto, tamaño, color, opacidad, 9 posiciones, sombra de legibilidad)
  - **Eliminar Metadatos EXIF** (re-encode + lectura informativa de metadatos antes de limpiar)
  - **Recortar Imagen** (zona en %, validación de límites)
  - Infra nueva: `js/tools/image-utils.js` (drag&drop, pegar desde portapapeles, canvas→blob, descarga, formateo de bytes) + estilos `.drop-zone/.image-preview/.image-meta`
  - Categoría `/herramientas/imagen/` activada en pills home, nav, footer, sitemap (51 URLs) y SW (pp-v11)
  - **Above-the-Fold móvil**: cabecera compacta, textarea 150px, controles inline y **barra de acción sticky** — verificado en 375×667 (botón de procesar siempre visible)
  - Total del sitio: **41 herramientas** en 6 categorías
- **🚀 PROYECTO EN LÍNEA — TAREA-11.1/11.2/11.5 completadas:**
  - 5 páginas de categoría en `/herramientas/{texto,conversion,seguridad,desarrollo,matematicas}/` con SEO propio (title/description/canonical/OG + JSON-LD `CollectionPage`), grid de cards generado desde `tools-data.js` (nuevo helper `renderCategoryGrid`)
  - Breadcrumbs de las 35 tools ahora apuntan a su página de categoría real (ej. Cifrador César → "Seguridad" → `/herramientas/seguridad/`), con mapeo automático desde `tools-data.js`
  - Footer con bloque de enlaces a las 5 categorías (`.footer-cats`, monospace uppercase)
  - Las 5 URLs en `sitemap.xml` (prioridad 0.9 texto / 0.7 resto) y en el precache del SW (`pp-v7`)
  - Interlinking resultante: home → categorías (pills + header), categorías → tools (grid), tools → categorías (breadcrumb), todas → categorías (footer) = ninguna página huérfana
- **README.md creado** (descripción, stack, estructura, checklist para añadir tools, índice de documentación)
- **Página índice `/herramientas/` creada:** "Todas las Herramientas" — grid de las 35 tools agrupadas por categoría con enlaces a las páginas de categoría, SEO propio + JSON-LD `CollectionPage`; añadida a sitemap (44 URLs) y precache SW (pp-v8); completa la cadena Home → Herramientas → Categoría → Tool
- **Recategorización de las 35 herramientas** (antes todo era "Texto"):
  - **Texto (22):** las tools de procesamiento de líneas y texto en general
  - **Conversión (4):** Texto a Morse, Base64, Unicode, Texto a Binario
  - **Seguridad (3):** Generador de contraseñas, Cifrado ROT13, Cifrador César
  - **Matemáticas (5):** Generar Lista de Números, Combinaciones, Permutaciones, Combinar Listas A×B, Contador de Clics
  - **Desarrollo (1):** Limpiar Lista de URLs
  - Los badges de las cards muestran ahora la categoría real (con color por categoría); la etiqueta unificada vive en `CATEGORY_LABELS` en `tools-data.js`
- **Filtros de categoría activados en la home:** las pills son ahora **enlaces reales `<a>`** a las páginas de categoría (antes botones de filtro client-side, invisibles para Google) — al clicar llevan a la página correspondiente con el mismo efecto de filtrado; solo Imagen queda "Próximamente" (span sin link); la búsqueda en tiempo real de la home se conserva intacta; el header nav enlaza a las categorías activas
- **Sprint 1 + Sprint 2 COMPLETOS — 20 tools nuevas** (25 → 35 herramientas totales, QA verificado en navegador):
  - Sprint 1: Añadir Prefijo y Sufijo a Líneas · Quitar Líneas Duplicadas · Eliminar Líneas Vacías · Filtrar Líneas que Contengan · Mezclar Letras de Palabras · Numerar Líneas de Texto · Generar Lista de Números · Texto a Binario (UTF-8 bidireccional) · Cifrado ROT13 · Quitar Vocales del Texto
  - Sprint 2: Añadir Saltos de Línea · Extractor de Columnas · Fusionar Dos Listas · Limpiar Lista de URLs (solo dominio) · Cifrador César · Generador de Combinaciones C(n,k) · Combinar Líneas de Dos Listas (A×B) · Generador de Permutaciones (n! ≤ 8) · Contador de Clics (interactivo con atajos de teclado) · Separar Keywords por Género
  - Todas con metas SEO en español + JSON-LD + icono en la home + tracking + relacionadas + sitemap (38 URLs) + precache SW (pp-v6)
- **Documento de control `plan-dev.md`:** sprints 0-2, checklist por tool, registro de incidencias (2 registradas y resueltas) y normas de construcción
- **Rediseño híbrido "Brutalist Soft" (basado en análisis del CSS real de mcpmarket.com):**
  - Header flotante tipo cápsula glass: sticky con márgenes, `border-radius: 24px`, fondo `linear-gradient(rgba(255,255,255,.86)...)[dark: rgba(23,23,23,.82)]`, `backdrop-filter: blur(16px) saturate(.9)`, borde semitransparente y sombra multicapa suave
  - Logo nuevo: cuadrado negro "Px" (radius 8px) + "ProyectosPixel" monospace + punto amarillo de acento (`logo-mark` / `logo-text`)
  - Fondo global `#FBFBFB` (canvas) en claro; bordes semitransparentes `rgb(10 10 10 / 0.14)` con hover `0.28` (antes sólidos `#E5E5E5`)
  - Cards, botones, inputs, textarea, result-area y contadores con `border-radius` (12px/8px) y sombras suaves (`--shadow-card`, `--shadow-field`); hover de card con elevación `translateY(-2px)`
  - Pills, badges y strength/frequency bars con `radius: 999px`; hero-badge tipo píldora rosa con neumorfismo sutil
  - Botón primario ahora negro `#0A0A0A`/texto blanco (se eliminó el verde `#c4de7c`, fuera de paleta); variante invertida en dark
  - Webfonts reales cargadas vía Google Fonts en las 19 páginas: **Inter** + **Geist Mono** (hasta ahora 'GeistPixelSquare' no existía y todo caía en fallback); `preconnect` a fonts.googleapis/gstatic
- Estructura completa del proyecto (carpetas, archivos base)
- Home page con Hero, Categorías, Tools Destacadas, Más Usadas, Todas las Tools
- 3 zonas publicitarias (top, mid, bottom) con min-height para evitar CLS
- `template.html` base para herramientas individuales
- 15 herramientas de texto (HTML + JS):
  - Contar palabras y caracteres
  - Quitar acentos
  - Convertir mayúsculas/minúsculas
  - Generador Lorem Ipsum
  - Quitar espacios duplicados
  - Quitar saltos de línea
  - Invertir texto
  - Frecuencia de palabras
  - Texto a Morse
  - Generador de contraseñas
  - Eliminar caracteres especiales
  - Convertir Unicode/Texto
  - Justificar texto
  - Buscar y reemplazar
  - Codificar/Decodificar Base64
- Iconos SVG inline para cada tool en la home
- Botón "Copiar resultado" con feedback visual en todas las tools
- Botón "Limpiar" en todas las tools
- Schema.org JSON-LD (`WebApplication`) en cada tool
- Open Graph tags y Twitter Card en cada página
- `localStorage` para tracking de uso de tools y preferencia de tema
- Tools relacionadas en cada página de herramienta
- **Assets faltantes generados:** `assets/img/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180px), `og-image.png` (1200×630), `favicon-32x32.png` y `favicon.ico` (estilo brutalista: fondo negro con acentos rosa `#E5D2D2` y amarillo `#FEF0B9`)
- **Páginas legales:** `privacidad.html` y `terminos.html` con SEO completo, breadcrumb, dark mode y cross-links
- Estilos `.legal-content` / `.legal-container` en `styles.css` para las páginas legales
- `<link rel="icon">` + `<link rel="apple-touch-icon">` en las 19 páginas
- Service Worker con precache completo (`pp-v3`): home, 15 tools (HTML+JS), legales, favicon, íconos y og-image

### Changed
- **Esquema de URLs "directory" (consistencia SEO total, alineado con dioshoy.com):**
  - **Las 35 tools migradas** de `/herramientas/{cat}/{slug}.html` a `/herramientas/{cat}/{slug}/` (carpeta con `index.html` — mismo patrón que las categorías; nunca habrá redirects slash↔html)
  - Canonicals, og:url y JSON-LD de las 35 páginas regenerados con trailing slash
  - `sitemap.xml`: las 35 URLs tools en formato directory
  - Constructor de links en `tools-data.js` actualizado (cards home + relacionadas)
  - `sw.js` precache actualizado; `plan-dev.md` con las URLs nuevas
  - Verificado en producción: `/herramientas/texto/quitar-acentos/` → 200 directo con canonical correcto; el `.html` viejo → 404 real (gracias a `404.html`); Google solo verá UNA variante por página
- **Reorganización física de URLs por categoría (TAREA-11 antes del deploy, sin necesidad de 301s):**
  - **13 herramientas movidas** de `/herramientas/texto/` a su carpeta de categoría: Morse, Base64, Unicode y Binario → `/herramientas/conversion/`; Contraseñas, ROT13 y César → `/herramientas/seguridad/`; Lista de números, Combinaciones, Permutaciones, A×B y Contador → `/herramientas/matematicas/`; URLs → `/herramientas/desarrollo/`
  - URLs internas actualizadas en todos los niveles: canonical/OG/JSON-LD de cada página movida, constructor de hrefs de `tools-data.js` (ahora por categoría), `sitemap.xml`, precache de `sw.js` (pp-v8) y `plan-dev.md`
  - Estructura final de URLs coherente con la jerarquía de navegación
- **Buscador reubicado:** quitado del header; ahora es un buscador grande (píldora con icono y sombra suave) justo encima de las píldoras de categorías en la home
- **Auditoría y corrección del modo oscuro (TAREA-12.1, mediciones reales en navegador):**
  - `--surface` dark: `#141414` → **`#1C1C1E`** — las cards/inputs quedaban invisibles sobre el fondo `#0A0A0A` (diferencia de ~2 puntos); ahora hay contraste de superficie real
  - `--border` dark: blanco al 12% → **16%** (strong 28% → 34%) — los bordes no se veían sobre superficies oscuras
  - **Bug hero-badge dark corregido:** texto blanco sobre fondo rosa → texto oscuro `#0A0A0A`
  - **Bug badge-dark dark corregido:** en dark quedaba blanco-sobre-blanco en las badges de categoría (Rot13, César, URLs) → texto oscuro
  - **Bug tooltip "¡Copiado!" dark corregido:** white-on-white → texto oscuro
  - Sombras dark intensificadas (0.4/0.6) para separar niveles
  - **Bug badge amarillo/rosa dark corregido** (el que reportaste): los badges claros ("Destacada" amarillo `#FEF0B9`, categoría rosa `#E5D2D2`) tenían `color: var(--text-primary)` = blanco en dark → ahora **texto oscuro obligatorio** para fondos claros (`.dark .badge-primary, .dark .badge-secondary { color: #0A0A0A }`)
  - **Cache-bust del CSS**: todas las páginas llaman `/css/styles.css?v=8` (query versionado) para evitar el viejo estilos cacheado en desarrollo — al cambiar el CSS, subir el número de versión
- **Header simplificado:** logo + navegación de categorías centrada monospace uppercase (Inicio, Texto + Imagen/Desarrollo/Conversión como "Próximamente" atenuados) + toggle tema. Eliminados buscador del header, botón y panel de búsqueda móvil
- **Arquitectura:** nuevo `js/tools-data.js` como fuente única de verdad (tools, iconos SVG, renderCardTool, trackToolUsage, getMostUsedTools, renderRelatedTools). `home.js` refactorizado y los 15 JS de tools migrados del `renderRelated` duplicado al helper compartido
- **Cards de "Tools Relacionadas" mejoradas:** ahora usan el mismo renderizador de la home (icono SVG + título + desc + badges correctos con acentos)
- **Eliminado el CDN de Tailwind** (`cdn.tailwindcss.com`) y su bloque `tailwind.config` de todas las páginas: los estilos reales ya viven en `css/styles.css` (que incluye su propio reset). Mejora el rendimiento y la compatibilidad con CSP futura
- Registro del Service Worker centralizado en `components.js` (función `initServiceWorker()` con check de localhost); eliminado el código duplicado inline en las páginas
- `manifest.json`: `purpose` separado en entradas `any` y `maskable`
- Footer: "Política de Privacidad" y "Términos de Uso" ahora enlazan a `/privacidad.html` y `/terminos.html` (antes eran enlaces muertos `#`)
- `sitemap.xml`: añadidas las páginas legales (prioridad 0.3, yearly)
- Reducidos espacios de banners: top/bottom de 90px a 30px, mid de 250px a 60px
- Ocultos contenedores de ads con `display: none` durante desarrollo
- Reducido H1: 32px (móvil), 48px (tablet), 56px (desktop)
- Breadcrumb con borde izquierdo acento (`var(--primary)`)
- **Corregido bug de cascada CSS:** `.container` (definido al final del archivo) pisaba `max-width` y `padding-top` de `.tool-container` → las páginas de herramienta renderizaban a 1200px y el breadcrumb quedaba pegado al header. Ahora `.container` se define antes y `.tool-container` (max-width 808px, padding propio) gana correctamente
- **`.tool-container` transparente sobre el canvas `#FBFBFB`; `.tool-workzone` blanca (`var(--surface)`) con borde y sombra** — el contraste herramienta/página ahora lo da la zona de trabajo elevada (antes era `#f4f4f4` en ambos, un gris que ya no contrastaba con el nuevo canvas y que además no se adaptaba a dark mode; con `var(--surface)` el dark usa `#141414` automáticamente)
- Breadcrumb en tool pages con margen extra bajo la cápsula del header (gap comprobado: 32px)
- Descripción de tool con separador inferior
- Textarea con fuente monospace para estilo técnico
- Labels de controles con font-weight 500 para mejor visibilidad
- **Rediseño completo del layout de las 15 herramientas de texto:**
  - Separación visual clara entre Entrada y Resultado con `.tool-section`
  - Labels visibles uppercase monospace ("TU TEXTO", "RESULTADO") con `.tool-input-label`
  - H1 reducido en páginas de tool: 24px (móvil) / 32px (desktop) con `.tool-h1`
  - `max-width` acotado a 760px en páginas de tool con `.tool-container`
  - Botones de acción principal cambiados a `.btn-primary` (verde #c4de7c con texto negro)
  - Botones secundarios (Copiar, Limpiar) con iconos SVG inline
  - Área de resultado con borde estándar + acento izquierdo negro + fuente monospace
  - Fondo gris #f4f4f4 en `.tool-container` y `.tool-workzone`
  - Barra de botones de acción como divisor entre secciones Input/Output
- **Corrección de acentos en todo el texto visible** (meta tags, H1, descripciones, botones, placeholders) en las 15 herramientas
- Breadcrumb "Texto" ahora enlaza a `/#texto` en vez de `/`
- Service Worker desactivado en `localhost` y `127.0.0.1` para facilitar desarrollo
- `sw.js` actualizado a `pp-v2` para invalidar caché vieja
- `template.html` actualizado con el nuevo layout (tool-container, tool-section, tool-input-label)

### Deprecated

### Removed
- Dependencia del CDN de Tailwind CSS en producción

### Security

---

[No publicado]: https://proyectospixel.com
