# Plan de Desarrollo y Control de Herramientas — ProyectosPixel

> Documento vivo para desarrollar tool por tool. Estados: ✅ completa · 🔧 en progreso · ❌ pendiente · ⚠️ problema
> Fuente única de código: `js/tools-data.js` (añadir cada tool nueva ahí: slug, title, desc, category, icono)
> Plantilla: `herramientas/texto/template.html` · CSS global: `css/styles.css`

---

## 1. SPRINT 0 — Verificación de las 15 activas (control)

| # | Tool (nombre SEO) | URL | Lógica | Vacío/error | Copiar/Limpiar | Estilo híbrido | Estado |
|---|---|-----|--------|-------------|----------------|----------------|--------|
| 1 | Contar palabras y caracteres | `/herramientas/texto/contar-palabras-caracteres/` | ✅ | ✅ | ✅ | ✅ | ✅ verificada 9/10 |
| 2 | Quitar acentos | `/herramientas/texto/quitar-acentos/` | ✅ | ✅ | ✅ | ✅ | ✅ verificada 9/10 |
| 3 | Convertir mayúsculas y minúsculas | `convertir-mayusculas-minusculas.html` | — | — | — | — | ❌ auditar |
| 4 | Generador Lorem Ipsum | `generar-lorem-ipsum.html` | — | — | — | — | ❌ auditar |
| 5 | Quitar espacios duplicados | `quitar-espacios-duplicados.html` | — | — | — | — | ❌ auditar |
| 6 | Quitar saltos de línea | `quitar-saltos-de-linea.html` | — | — | — | — | ❌ auditar |
| 7 | Invertir texto | `invertir-texto.html` | — | — | — | — | ❌ auditar |
| 8 | Frecuencia de palabras | `frecuencia-palabras.html` | — | — | — | — | ❌ auditar |
| 9 | Texto a Morse | `texto-a-morse.html` | ✅ | ✅ | ✅ | ✅ | ✅ verificada 9/10 |
| 10 | Generador de contraseñas | `generar-contrasenas.html` | ✅ | ✅ | ✅ | ✅ | ✅ verificada 9/10 |
| 11 | Eliminar caracteres especiales | `eliminar-caracteres-especiales.html` | — | — | — | — | ❌ auditar |
| 12 | Convertir Unicode/Texto | `convertir-unicode-texto.html` | — | — | — | — | ❌ auditar |
| 13 | Justificar texto | `justificar-texto.html` | — | — | — | — | ❌ auditar |
| 14 | Buscar y reemplazar | `buscar-reemplazar-texto.html` | — | — | — | — | ❌ auditar |
| 15 | Codificar/Decodificar Base64 | `codificar-decodificar-base64.html` | — | — | — | — | ❌ auditar |

---

## 2. SPRINT 1 — Las 10 triviales (nombres SEO en español)

Checklist obligatorio por cada tool:

```text
[ ] HTML: copiar template.html, renombrar, metas SEO (title con keyword, description única, canonical, JSON-LD)
[ ] Lógica: crear js/tools/<slug>.js (input → process() → result; con casos borde en comentario)
[ ] tools-data.js: añadir { slug, title, desc, category: 'texto', featured: false } + icono SVG
[ ] Related: 3 slugs coherentes vía ProyectosPixel.renderRelatedTools
[ ] Tracking: ProyectosPixel.trackToolUsage('<slug>')
[ ] QA: light + dark, móvil 375px, copiar/limpiar, consola sin errores
[ ] sitemap.xml: añadir URL con lastmod del día
[ ] Registrar ✅ aquí con fecha
```

| # | Nombre SEO (title/h1) | Slug | Keyword objetivo | Lógica núcleo | Estado |
|---|---|---|---|---|---|
| 1 | Añadir Prefijo y Sufijo a Líneas | `anadir-prefijo-sufijo-lineas` | añadir prefijo a cada línea | split → map pfx+line+sfx | ✅ completa 9/10 (QA: -palabra1, con prefijo/sufijo OK) |
| 2 | Quitar Líneas Duplicadas | `eliminar-lineas-duplicadas` | eliminar líneas duplicadas online | Set + trim opcional + case option | ✅ completa 9/10 (QA case-sensitive OK) |
| 3 | Eliminar Líneas Vacías | `eliminar-lineas-vacias` | eliminar líneas vacías de texto | filter trim | ✅ completa 9/10 (QA quita vacías y de espacios) |
| 4 | Filtrar Líneas que Contengan | `filtrar-lineas-texto` | filtrar líneas de texto | includes/exclude + sensible a mayúsculas | ✅ completa 9/10 (QA: conserva solo gmail) |
| 5 | Mezclar Letras de Palabras | `mezclar-letras-palabras` | mezclar palabras aleatorio | shuffle interior conservando 1ª/ última opcional | ✅ completa 9/10 (QA: p...s conservado) |
| 6 | Numerar Líneas de Texto | `numerar-lineas-texto` | numerar líneas de texto online | map índice + separador configurable | ✅ completa 9/10 (QA: saltó vacía sin número) |
| 7 | Generar Lista de Números | `generar-lista-numeros` | generar lista de números correlativos | desde/hasta/paso + separador | ✅ completa 9/10 (QA: 1,2,3,4,5 + límite 100k) |
| 8 | Texto a Binario | `texto-a-binario` | convertir texto a binario | UTF-8 bytes → 8 bits; y viceversa | ✅ completa 9/10 (QA: H=01001000, valida binario inválido) |
| 9 | Cifrado ROT13 | `cifrado-rot13` | cifrado rot13 online | rot13 ASCII + opción ñ | ✅ completa 9/10 (QA: Hello→Uryyb) |
| 10 | Quitar Vocales del Texto | `quitar-vocales-texto` | quitar vocales de un texto | replace [aeiouáéíóúü] + opción Y | ✅ completa 9/10 (QA: Hola mundo→Hl mnd) |

---

## 3. SPRINT 2 — Resto de tools de cerveza.gratis (tras Sprint 1)

| # | Nombre SEO | Slug | Keyword | Complejidad | Estado |
|---|---|---|---|---|---|
| 11 | Añadir Saltos de Línea al Texto | `anadir-saltos-de-linea` | añadir salto de línea online | cada N chars/palabras, sin cortar palabras | ✅ completa 9/10 (QA: 3 palabras/línea) |
| 12 | Extractor de Columnas de Texto | `extraer-columnas-texto` | extraer columna de texto delimitado | 5 delimitadores | ✅ completa 9/10 (QA: columna 3 = madrid) |
| 13 | Fusionar Dos Listas de Texto | `fusionar-texto-lineas` | fusionar dos listas de texto | zip 2 textareas + separador | ✅ completa 9/10 (QA: a1-b1) |
| 14 | Limpiar Lista de URLs (Solo Dominio) | `limpiar-lista-urls` | limpiar lista de urls | URL parse + dedup + 3 modos | ✅ completa 9/10 (QA: ejemplo.com) |
| 15 | Cifrador César de Texto | `cifrador-cesar` | cifrar texto césar online | shift ±1-25 | ✅ completa 9/10 (QA: abc→def) |
| 16 | Generador de Combinaciones | `generar-combinaciones` | generar combinaciones online | C(n,k) con límite 10k | ✅ completa 9/10 (QA: C(3,2)=3) |
| 17 | Combinar Líneas de Dos Listas | `combinar-lineas-listas` | combinar listas de texto | producto cruzado + límite 10k | ✅ completa 9/10 (QA: a x/a y/b x/b y) |
| 18 | Generador de Permutaciones | `generador-permutaciones` | generador de permutaciones | heap n! límite 8 | ✅ completa 9/10 (QA: 2!) |
| 19 | Contador de Clics | `contador-clics` | contador de clics online | tally interactiva + teclado | ✅ completa 9/10 (QA: 2+2-1=1) |
| 20 | Separar Keywords por Género | `separar-keywords-genero` | separar keywords masculino femenino | heurística -a/-o/-as/-os/-es | ✅ completa 9/10 (corregida: plurales por género) |

---

## 4. Registro de incidencias (control de fallos)

Cada fallo de QA se registra con: tool, síntoma, causa, fix y fecha. Regla: NO marcar ✅ sin pasar el checklist completo.

| Fecha | Tool | Síntoma | Causa | Fix | ¿Bloquea sprint? |
|---|---|---|---|---|---|
| 9/10 | Separar Keywords por Género | Plurales ("zapatos") caían en "Sin determinar" | Detectaba plural pero pedía género por la forma plural | Nueva heurística: -as→F plural, -os→M plural, -es→plural ambiguo | No — resuelto antes del cierre |
| 9/10 | Contador de Clics | Doble registro de clics en QA automation | Doceolucion del test (2 clicks en secuencia eval + retry) | Re-verificado en página limpia: matemática exacta 2+2-1=1 | No |
| — | — | — | — | — | — |

---

## 5. Normas de construcción (todas las tools)

1. **Nombre SEO en español** para title/h1/card; slug en minúsculas con guiones.
2. `process()` pura y testeable, con casos borde comentados en el código.
3. Botón principal = `btn-process` + `.btn-primary`; Copiar/Limpiar = `.btn-secondary` (Copiar con `.copy-feedback`).
4. Resultado SIEMPRE en `.result-area` (placeholder "El resultado aparecerá aquí...").
5. Errores inline con `.error-msg.visible`.
6. Related tools con el helper compartido de `tools-data.js`.
7. Permutaciones/combinaciones: límite de ~10.000 líneas de salida con aviso antes de ejecutar.
8. JSON-LD `WebApplication` único por página; title/description/canonical correctos.
9. Al terminar cada tool: actualizar `tools-data.js` + `sitemap.xml` + registro aquí con fecha.
