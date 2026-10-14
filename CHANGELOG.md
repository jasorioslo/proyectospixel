# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [No publicado]

### Fixed
- **Accesibilidad 95 → 100 en Lighthouse** (14/10/2026):
  - `.pill.disabled` ("Imagen · Próximamente") tenía contraste 3.12–3.72 (opacidad 50%) → ahora fondo neutro con `--text-secondary` (ratio >4.5:1)
  - `aria-label` del logo no coincidía con el texto visible → eliminado (el texto visible "Px ProyectosPixel" es el nombre accesible)
- **Mensajes de error con acentos**: Base64/Unicode/Morse tenían "no valido"/"Codigo" → "no válido"/"Código"
- Bump de assets a `?v=10` + SW `pp-v10`

### Added
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
