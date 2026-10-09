# Plan de Proyecto: ProyectosPixel Tools

## 1. Resumen del Proyecto
**Dominio:** proyectospixel.com
**Concepto:** Un marketplace/directorio de herramientas online gratuitas, rápidas y 100% privadas (offline en el navegador). Diseñado para escalar a infinitas categorías (texto, imagen, desarrollo, conversión, etc.).
**Fase Inicial:** Lanzamiento con 15 herramientas de la categoría "Texto".
**Monetización:** Espacios reservados para publicidad (AdSense/afiliados) integrados en el diseño desde el día uno sin afectar la experiencia de usuario.
**Diferenciador:** 100% client-side. Ningún dato sale del navegador del usuario. Privacidad real como propuesta de valor.

---

## 2. Identidad Visual y Diseño
**Referencias:** mcpmarket.com + identidad propia "Brutalist Soft" (híbrido adoptado 2026-10).

**Estilo híbrido "Brutalist Soft":** base brutalista (negro fuerte, monospace) + suavidad de mcpmarket (bordes semitransparentes, radios, sombras suaves, header glass flotante).

### Paleta de Colores
| Token | Valor | Uso |
|-------|-------|-----|
| `bg` (canvas) | `#FBFBFB` | Fondo general de la página (antes blanco puro) |
| `surface` | `#FFFFFF` | Cards y superficies elevadas |
| `textPrimary` | `#0A0A0A` | Texto principal, botón primario |
| `textSecondary` | `#737373` | Texto secundario, descripciones |
| `primary` | `#E5D2D2` | Highlights de marca: hero badge, badges, freq bars (rosa pálido) |
| `secondary` | `#FEF0B9` | Acento de marca: badge del logo, highlights (amarillo crema) |
| `border` | `rgb(10 10 10 / 0.14)` | Bordes semitransparentes (antes sólido #E5E5E5) |
| `border-strong` | `rgb(10 10 10 / 0.28)` | Bordes al hover |

### Paleta Dark Mode
| Token | Valor | Uso |
|-------|-------|-----|
| `background` | `#0A0A0A` | Fondo general oscuro |
| `surface` | `#141414` | Cards y superficies elevadas |
| `textPrimary` | `#FFFFFF` | Texto principal |
| `textSecondary` | `#A1A1AA` | Texto secundario |
| `border` | `rgb(255 255 255 / 0.12)` | Bordes sutiles |
| `header glass` | `rgba(23,23,23,0.82)` | Cápsula del header en dark |

### Tipografía (webfonts reales vía Google Fonts)
- **Headings/UI monospace:** Geist Mono (cargada) → fallback ui-monospace → SFMono-Regular → monospace. `'GeistPixelSquare'` queda primera en la pila para si se añade la fuente custom.
- **Body:** Inter (cargada) → system-ui → sans-serif. Tamaño body: `18px`.

### Componentes clave
- **Header:** Cápsula flotante sticky con márgenes, `border-radius: 24px`, fondo glass `rgba(255,255,255,0.86)`, `backdrop-filter: blur(16px)`, borde semitransparente, sombra multicapa suave. Logo: cuadrado negro "Px" (radius 8px) + "ProyectosPixel" monospace + punto amarillo.
- **Botón primario:** fondo `#0A0A0A`, texto blanco, radius `12px`, sombra de campo suave (el verde #c4de7c fue eliminado).
- **Botón secundario:** fondo surface, texto secundario, radius `12px`, borde semitransparente.
- **Cards:** radius `12px`, borde semitransparente, sombra `0 12px 34px rgb(10 10 10/0.04)`; hover: borde fuerte + sombra elevada + `translateY(-2px)`.
- **Inputs:** radius `8px`, sombra de campo suave.
- **Pills/badges:** radius `999px` (píldora).
- **Hero badge:** píldora rosa con neumorfismo sutil de mcpmarket.

### Espaciado
- Unidad base de 4px, generoso, minimalista.
- Mobile first.

---

## 3. Arquitectura y Tecnología
- **Stack:** HTML5, Tailwind CSS, JavaScript Vanilla.
- **Procesamiento:** 100% Client-side. Cero dependencias de servidor o APIs externas para las herramientas.
- **Estructura:** Sitio estático multipágina (cada tool tiene su propio `.html`). Optimizado para SEO.
- **Componentes:** Uso de JavaScript (`components.js`) para inyectar el Header y Footer compartidos dinámicamente, evitando repetir código al actualizar la web.
- **Datos locales:** Uso de `localStorage` para rastrear las "Tools más usadas" por cada usuario y guardar preferencias (tema claro/oscuro).
- **PWA (Progressive Web App):** Se implementará un service worker para que la web funcione completamente offline, reforzando la propuesta de valor "100% privado, 100% offline". Incluye `manifest.json` con iconos, nombre y tema.
- **Analytics:** Se integrará Umami (self-hosted, privacy-first) desde el inicio para tener métricas reales de uso por herramienta, sin cookies ni tracking invasivo. Complementa el `localStorage` que solo ve un usuario.
- **Mobile First:** El diseño y maquetación se piensan primero para móvil (donde la mayoría de usuarios usarán las tools), luego se escala a desktop.

---

## 4. Estructura de URLs y Carpetas
Estructura preparada para escalar a múltiples categorías.

```text
/
├── index.html                              (Home principal)
├── manifest.json                           (PWA manifest)
├── sw.js                                   (Service Worker)
├── css/
│   └── styles.css                          (Estilos globales)
├── js/
│   ├── components.js                       (Inyector de Header/Footer, tema)
│   ├── home.js                             (Lógica de búsqueda y filtros home)
│   └── tools/
│       ├── contar-palabras.js
│       ├── quitar-acentos.js
│       └── [...]                            (Un JS por cada tool)
├── assets/
│   ├── icons/                               (SVGs para cada herramienta)
│   └── img/                                (Imágenes generales, OG images)
└── herramientas/
    ├── texto/
    │   ├── contar-palabras-caracteres.html
    │   ├── quitar-acentos.html
    │   ├── convertir-mayusculas-minusculas.html
    │   ├── generar-lorem-ipsum.html
    │   ├── quitar-espacios-duplicados.html
    │   ├── quitar-saltos-de-linea.html
    │   ├── invertir-texto.html
    │   ├── frecuencia-palabras.html
    │   ├── texto-a-morse.html
    │   ├── generar-contrasenas.html
    │   ├── eliminar-caracteres-especiales.html
    │   ├── convertir-unicode-texto.html
    │   ├── justificar-texto.html
    │   ├── buscar-reemplazar-texto.html
    │   └── codificar-decodificar-base64.html
    ├── imagen/                              (Futura Fase 2)
    │   └── ...
    ├── desarrollo/                          (Futura Fase 3)
    │   └── ...
    └── conversion/                          (Futura Fase 4)
        └── ...
```

---

## 5. Inventario de Herramientas

### Fase 1: Texto (15 herramientas)
Cada herramienta tendrá su tarjeta en la home con título + mini descripción.

| # | Nombre Tool | URL Slug | Mini Descripción (Para la Home) |
|---|-------------|----------|--------------------------------|
| 1 | Contar palabras y caracteres | `contar-palabras-caracteres` | Cuenta palabras, caracteres, oraciones y párrafos al instante. |
| 2 | Quitar acentos | `quitar-acentos` | Elimina tilde de cualquier texto rápido y fácil. |
| 3 | Convertir mayúsculas/minúsculas | `convertir-mayusculas-minusculas` | Transforma tu texto a MAYÚSCULAS, minúsculas, Tipo Título o tipo oración. |
| 4 | Generador Lorem Ipsum | `generar-lorem-ipsum` | Genera párrafos de texto de relleno para tus diseños o maquetas. |
| 5 | Quitar espacios duplicados | `quitar-espacios-duplicados` | Limpia tu texto eliminando los espacios en blanco sobrantes. |
| 6 | Quitar saltos de línea | `quitar-saltos-de-linea` | Convierte texto multilínea en un solo párrafo continuo. |
| 7 | Invertir texto | `invertir-texto` | Pon tu texto al revés letra por letra o palabra por palabra. |
| 8 | Frecuencia de palabras | `frecuencia-palabras` | Analiza tu texto y muestra cuántas veces se repite cada palabra. |
| 9 | Texto a Morse | `texto-a-morse` | Traduce texto a código Morse y de Morse a texto. |
| 10 | Generador de contraseñas | `generar-contrasenas` | Crea contraseñas seguras y aleatorias personalizando longitud y símbolos. |
| 11 | Eliminar caracteres especiales | `eliminar-caracteres-especiales` | Limpia tu texto dejando solo letras y números, ideal para URLs. |
| 12 | Convertir Unicode/Texto | `convertir-unicode-texto` | Codifica texto a formato Unicode o decodifica Unicode a texto legible. |
| 13 | Justificar texto | `justificar-texto` | Alinea tu texto perfectamente a ambos lados como en un periódico. |
| 14 | Buscar y reemplazar | `buscar-reemplazar-texto` | Encuentra palabras específicas y reemplázalas masivamente. |
| 15 | Codificar/Decodificar Base64 | `codificar-decodificar-base64` | Convierte cualquier texto a Base64 o descifra Base64 a texto plano. |

### Fases Futuras (Expansiones planificadas)
| Fase | Categoría | Ejemplos de herramientas |
|------|-----------|------------------------|
| 2 | Imagen | Compresor de imágenes, conversor de formatos, redimensionador, watermark, recortar imagen, convertir a WebP |
| 3 | Desarrollo | Formateador de JSON, minificador CSS/JS, regex tester, generador de meta tags, validador de HTML, color picker |
| 4 | Conversión | PDF a imagen, imagen a PDF, CSV a JSON, JSON a CSV, Markdown a HTML, HTML a Markdown |
| 5 | Seguridad | Generador de hashes, verificador de contraseñas, generador de UUID, encoder/decoder de URL |
| 6 | Matemáticas | Calculadora de porcentajes, conversor de unidades, calculadora de descuentos, generador de tablas |

---

## 6. Layout y Diseño de Páginas (Mobile First)

### Principios de UX para todas las páginas
- **Mobile First:** Se diseña y maqueta primero para móvil, luego se escala a tablet y desktop.
- **Texto vacío:** Toda herramienta debe manejar el estado inicial vacío con un placeholder descriptivo en el textarea (ej: "Pega tu texto aquí...").
- **Entrada inválida:** Mostrar mensaje de error inline claro y amigable cuando el input no sea válido para la tool (ej: "Pega código Morse válido" en texto-a-morse).
- **Botón "Copiar resultado":** Presente en TODAS las herramientas sin excepción. Es la acción #1 del usuario después de procesar. Incluye feedback visual (cambio a "¡Copiado!" por 2 segundos).
- **Botón "Limpiar":** Presente en toda herramienta para resetear input y output rápidamente.
- **Persistencia del input:** Opcionalmente, guardar el último input en `localStorage` para que el usuario no pierda su texto al recargar.

### 6.1. Home (`index.html`)
Diseño vertical scrolleable. Mobile first.
1. **Header:** Logo "ProyectosPixel" a la izquierda. Toggle dark mode a la derecha. En desktop: barra de búsqueda central. En móvil: barra de búsqueda desplegable debajo del header.
2. **Hero:** Título llamativo + subtítulo breve + badge "100% Privado · Sin servidor · Gratis".
3. **[Espacio Publicitario 1]:** Banner horizontal debajo del Hero.
4. **Sección 1 - Categorías:** Barra horizontal scrolleable (móvil) o pills (desktop) para filtrar por categoría: Texto, Imagen, Desarrollo, etc.
5. **Sección 2 - Tools Destacadas:** Grid de 3 a 4 cards más grandes. (Selección manual).
6. **Sección 3 - Tools Más Usadas:** Grid de 6 a 8 cards medianas. (Ordenadas por `localStorage`). Si no hay datos aún, se muestran las mismas que Destacadas.
7. **Sección 4 - Todas las Tools:** Grid completo con las 15 tools de texto. Filtrable por búsqueda en tiempo real.
8. **Footer:** Copyright, enlaces a políticas (privacidad importante por ser 100% offline).

**Nota sobre las Cards:** Cada card muestra un icono SVG, el título de la tool, la mini descripción y un badge de categoría ("Texto", "Nueva"). Estilo brutalista: `border-radius: 0px`, borde `#E5E5E5`, sin sombras, fondo blanco con acentos en `#E5D2D2` (rosa) y `#FEF0B9` (amarillo). Hover: borde cambia a `#0A0A0A` (negro).

### 6.2. Página de Herramienta Individual (`herramientas/texto/*.html`)
Diseño enfocado 100% en la acción. El usuario entra, actúa y sale. Mobile first.
1. **Header:** Igual que en la home (con buscadora).
2. **Breadcrumb:** Home > Texto > [Nombre Tool] (mejora SEO y navegación).
3. **Título H1:** Nombre de la herramienta.
4. **Descripción:** Un breve texto de 1 línea debajo del H1.
5. **[Espacio Publicitario 2]:** Banner opcional o enlazado contextualmente.
6. **Zona de Trabajo:**
   - **Textarea de entrada:** Grande, con placeholder descriptivo. En móvil ocupa todo el ancho.
   - **Botones de acción:** Específicos de la tool + botón "Copiar resultado" (siempre presente) + botón "Limpiar".
   - **Textarea/Div de resultado:** Solo lectura, con botón "Copiar resultado" repetido al lado.
   - **Estado vacío:** Placeholder visible cuando no hay input.
   - **Estado de error:** Mensaje inline si el input no es válido.
7. **[Espacio Publicitario 3]:** Banner debajo del output.
8. **Tools relacionadas:** 3 a 4 cards de tools de la misma categoría.
9. **Footer:** Mismo footer global.

---

## 7. Estrategia de Espacios Publicitarios (Ads)
Se dejarán contenedores HTML vacíos con IDs específicos (ej. `<div id="ad-banner-top"></div>`). El diseño CSS tendrá en cuenta estos espacios para que no haya saltos de layout (CLS) cuando se active el JavaScript de AdSense en el futuro.
- **Zona A:** Debajo del menú de navegación (Top Banner).
- **Zona B:** Debajo del Hero en la Home / Debajo del H1 en páginas de tools (Mid-Content).
- **Zona C:** Justo encima del Footer en todas las páginas (Bottom Banner).

**Regla:** Los contenedores de ads tienen `min-height` predefinido para reservar espacio y evitar CLS. Se muestran vacíos (sin contenido) hasta que se active el script de ads.

---

## 8. Estrategia SEO On-Page
Al ser multipágina estática, el SEO se maximiza a nivel de código:
- **Title Tag dinámico:** Ej. `Contar Palabras y Caracteres Online | ProyectosPixel`
- **Meta Description dinámica:** Ej. `Cuenta palabras, caracteres y oraciones de forma gratuita y 100% privada directamente en tu navegador.`
- **H1:** Único por herramienta.
- **URLs Limpias:** Ya definidas en la tabla de herramientas.
- **Microdatos (Schema.org):** Implementar `WebApplication` en cada tool para rich snippets en Google.
- **Open Graph:** Tags OG para compartir en redes sociales (título, descripción, imagen).
- **Sitemap.xml:** Generar automáticamente listando todas las tools.
- **Robots.txt:** Permitir indexación completa.
- **Canonical URLs:** Evitar contenido duplicado.

---

## 9. PWA y Offline
- **Service Worker (`sw.js`):** Cachea todos los assets estáticos (HTML, CSS, JS, fuentes) en la primera visita. Las tools funcionan completamente offline después.
- **`manifest.json`:** Nombre corto "ProyectosPixel", tema claro/oscuro, iconos en múltiples tamaños, `display: standalone`.
- **Propuesta de valor reforzada:** "Funciona sin internet" como badge visible en la home y en cada tool.
- **Actualización:** El SW se actualizará con versionado, invalidando caché vieja cuando haya cambios.

---

## 10. Analytics (Umami)
- **Herramienta:** Umami self-hosted (privacy-first, sin cookies, cumple GDPR).
- **Métricas clave:**
  -Visitas por herramienta (qué tools se usan más para priorizar nuevas).
  - Tiempo en página por tool.
  - Dispositivo (móvil vs desktop).
  - Fuente de tráfico (orgánico, directo, referral).
- **Evento custom:** Registrar cuándo un usuario usa una tool (click en botón de acción) para medir uso real, no solo vistas de página.
- **Dashboard:** Accesible solo internamente. No se muestra al público.

---

## 11. Roadmap de Desarrollo

### Fase 1: Fundación y 15 Tools de Texto
- [ ] **1.1:** Crear estructura de carpetas y archivos base (`index.html`, `styles.css`, `components.js`, `manifest.json`).
- [ ] **1.2:** Diseñar y programar el Header (con toggle dark mode y buscadora), Footer y sistema de inyección de componentes.
- [ ] **1.3:** Maquetar la Home completa mobile first (Hero, breadcrumbs de categoría, grids de cards, contenedores de ads).
- [ ] **1.4:** Maquetar la plantilla base de una Tool individual (breadcrumb, input, botones, output, estados vacío/error, botón copiar, tools relacionadas).
- [ ] **1.5:** Desarrollar la lógica JavaScript de las 15 herramientas de texto.
- [ ] **1.6:** Implementar el sistema de `localStorage` para "Tools más usadas" y preferencia de tema.
- [ ] **1.7:** Implementar la barra buscadora de la home con filtrado en tiempo real por categoría.
- [ ] **1.8:** Implementar dark mode completo (toggle, persistencia en localStorage, CSS variables).
- [ ] **1.9:** Configurar PWA (service worker, manifest.json, cacheo offline).
- [ ] **1.10:** Integrar Umami analytics (script + eventos custom por tool).
- [ ] **1.11:** SEO (Meta tags, H1s, Schema.org, sitemap.xml, robots.txt, Open Graph).
- [ ] **1.12:** Testing cross-browser, responsive (móvil/tablet/desktop), y subida a producción.

### Fase 2+: Expansiones
- [ ] **Fase 2:** Categoría "Imagen" (compresor, redimensionador, conversor, etc.).
- [ ] **Fase 3:** Categoría "Desarrollo" (JSON formatter, regex tester, etc.).
- [ ] **Fase 4:** Categoría "Conversión" (PDF, CSV, Markdown, etc.).
- [ ] **Fase 5:** Categoría "Seguridad" (hashes, UUID, URL encoder).
- [ ] **Fase 6:** Categoría "Matemáticas" (porcentajes, unidades, tablas).