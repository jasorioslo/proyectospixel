/* =========================================================
   ProyectosPixel - Datos compartidos (tools, iconos, helpers)
   Usado por: home.js y los renderRelatedTools de cada tool
   ========================================================= */

(function () {
  'use strict';

  /* --- Tool Data (fuente unica de verdad) --- */
  var tools = [
    { slug: 'contar-palabras-caracteres', title: 'Contar palabras y caracteres', desc: 'Cuenta palabras, caracteres, oraciones y párrafos al instante.', category: 'texto', featured: true },
    { slug: 'quitar-acentos', title: 'Quitar acentos', desc: 'Elimina tilde de cualquier texto rápido y fácil.', category: 'texto', featured: false },
    { slug: 'convertir-mayusculas-minusculas', title: 'Convertir mayúsculas/minúsculas', desc: 'Transforma tu texto a MAYÚSCULAS, minúsculas, Tipo Título o tipo oración.', category: 'texto', featured: true },
    { slug: 'generar-lorem-ipsum', title: 'Generador Lorem Ipsum', desc: 'Genera párrafos de texto de relleno para tus diseños o maquetas.', category: 'texto', featured: false },
    { slug: 'quitar-espacios-duplicados', title: 'Quitar espacios duplicados', desc: 'Limpia tu texto eliminando los espacios en blanco sobrantes.', category: 'texto', featured: false },
    { slug: 'quitar-saltos-de-linea', title: 'Quitar saltos de línea', desc: 'Convierte texto multilínea en un solo párrafo continuo.', category: 'texto', featured: false },
    { slug: 'invertir-texto', title: 'Invertir texto', desc: 'Pon tu texto al revés letra por letra o palabra por palabra.', category: 'texto', featured: false },
    { slug: 'frecuencia-palabras', title: 'Frecuencia de palabras', desc: 'Analiza tu texto y muestra cuántas veces se repite cada palabra.', category: 'texto', featured: false },
    { slug: 'texto-a-morse', title: 'Texto a Morse', desc: 'Traduce texto a código Morse y de Morse a texto.', category: 'conversion', featured: false },
    { slug: 'generar-contrasenas', title: 'Generador de contraseñas', desc: 'Crea contraseñas seguras y aleatorias personalizando longitud y símbolos.', category: 'seguridad', featured: true },
    { slug: 'eliminar-caracteres-especiales', title: 'Eliminar caracteres especiales', desc: 'Limpia tu texto dejando solo letras y números, ideal para URLs.', category: 'texto', featured: false },
    { slug: 'convertir-unicode-texto', title: 'Convertir Unicode/Texto', desc: 'Codifica texto a formato Unicode o decodifica Unicode a texto legible.', category: 'conversion', featured: false },
    { slug: 'justificar-texto', title: 'Justificar texto', desc: 'Alinea tu texto perfectamente a ambos lados como en un periódico.', category: 'texto', featured: false },
    { slug: 'buscar-reemplazar-texto', title: 'Buscar y reemplazar', desc: 'Encuentra palabras específicas y reemplázalas masivamente.', category: 'texto', featured: false },
    { slug: 'codificar-decodificar-base64', title: 'Codificar/Decodificar Base64', desc: 'Convierte cualquier texto a Base64 o descifra Base64 a texto plano.', category: 'conversion', featured: true },
    { slug: 'anadir-prefijo-sufijo-lineas', title: 'Añadir Prefijo y Sufijo a Líneas', desc: 'Inserta un prefijo y/o sufijo al inicio y final de cada línea de tu texto.', category: 'texto', featured: false },
    { slug: 'eliminar-lineas-duplicadas', title: 'Quitar Líneas Duplicadas', desc: 'Elimina las líneas repetidas de tu lista o texto, conservando la primera aparición.', category: 'texto', featured: false },
    { slug: 'eliminar-lineas-vacias', title: 'Eliminar Líneas Vacías', desc: 'Quita las líneas en blanco o vacías de cualquier texto o lista al instante.', category: 'texto', featured: false },
    { slug: 'filtrar-lineas-texto', title: 'Filtrar Líneas de Texto', desc: 'Conserva o elimina las líneas que contengan una palabra o frase específica.', category: 'texto', featured: false },
    { slug: 'numerar-lineas-texto', title: 'Numerar Líneas de Texto', desc: 'Añade un número delante de cada línea con el separador que elijas.', category: 'texto', featured: false },
    { slug: 'generar-lista-numeros', title: 'Generar Lista de Números', desc: 'Crea listas de números correlativos con inicio, fin y paso configurables.', category: 'matematicas', featured: false },
    { slug: 'texto-a-binario', title: 'Texto a Binario', desc: 'Convierte texto a código binario UTF-8 y de binario a texto.', category: 'conversion', featured: false },
    { slug: 'cifrado-rot13', title: 'Cifrado ROT13', desc: 'Codifica y decodifica texto con el cifrado ROT13 al instante.', category: 'seguridad', featured: false },
    { slug: 'quitar-vocales-texto', title: 'Quitar Vocales de un Texto', desc: 'Elimina todas las vocales (incluidas las acentuadas) de tu texto.', category: 'texto', featured: false },
    { slug: 'mezclar-letras-palabras', title: 'Mezclar Letras de Palabras', desc: 'Desordena las letras de cada palabra de tu texto al azar.', category: 'texto', featured: false },
    { slug: 'anadir-saltos-de-linea', title: 'Añadir Saltos de Línea', desc: 'Divide tu texto insertando saltos de línea cada N caracteres o palabras.', category: 'texto', featured: false },
    { slug: 'extraer-columnas-texto', title: 'Extraer Columna de Texto Delimitado', desc: 'Extrae la columna N de tu texto separado por comas, tabs u otro delimitador.', category: 'texto', featured: false },
    { slug: 'fusionar-texto-lineas', title: 'Fusionar Dos Listas de Texto', desc: 'Une dos listas línea por línea con el separador que elijas.', category: 'texto', featured: false },
    { slug: 'limpiar-lista-urls', title: 'Limpiar Lista de URLs', desc: 'Deja solo el dominio raíz de cada URL: quita http, rutas y parámetros.', category: 'desarrollo', featured: false },
    { slug: 'cifrador-cesar', title: 'Cifrador César de Texto', desc: 'Cifra o descifra texto con el cifrado César con desplazamiento configurable.', category: 'seguridad', featured: false },
    { slug: 'generar-combinaciones', title: 'Generador de Combinaciones', desc: 'Genera todas las combinaciones de tu lista tomadas de K en K elementos.', category: 'matematicas', featured: false },
    { slug: 'combinar-lineas-listas', title: 'Combinar Líneas de Dos Listas', desc: 'Crea todas las cruces posibles de dos listas (producto cruzado).', category: 'matematicas', featured: false },
    { slug: 'generador-permutaciones', title: 'Generador de Permutaciones', desc: 'Todas las permutaciones posibles de tu lista, hasta 8 elementos.', category: 'matematicas', featured: false },
    { slug: 'contador-clics', title: 'Contador de Clics', desc: 'Contador interactivo con atajos de teclado y ajuste libre.', category: 'matematicas', featured: false },
    { slug: 'separar-keywords-genero', title: 'Separar Keywords por Género', desc: 'Clasifica tus keywords en masculino/femenino y singular/plural.', category: 'texto', featured: false },
    { slug: 'comprimir-imagen', title: 'Comprimir Imagen', desc: 'Reduce el peso de tus imágenes sin subirlas a ningún servidor.', category: 'imagen', featured: true },
    { slug: 'convertir-imagen', title: 'Convertir Imagen a WebP, PNG o JPG', desc: 'Cambia el formato de tu imagen a WebP, PNG o JPG al instante.', category: 'imagen', featured: true },
    { slug: 'redimensionar-imagen', title: 'Redimensionar Imagen', desc: 'Cambia el tamaño en píxeles o porcentaje manteniendo la proporción.', category: 'imagen', featured: false },
    { slug: 'marca-de-agua', title: 'Añadir Marca de Agua', desc: 'Estampa tu texto o copyright sobre la imagen con control total.', category: 'imagen', featured: false },
    { slug: 'limpiar-exif', title: 'Eliminar Metadatos EXIF', desc: 'Borra GPS, cámara y fecha de tus fotos antes de compartirlas.', category: 'imagen', featured: false },
    { slug: 'recortar-imagen', title: 'Recortar Imagen', desc: 'Recorta la zona que quieras conservar sin subir tu imagen.', category: 'imagen', featured: false },
    { slug: 'formatear-json', title: 'Formatear y Validar JSON', desc: 'Embellece, valida y ordena tu JSON con detección de errores.', category: 'desarrollo', featured: false },
    { slug: 'minificar-codigo', title: 'Minificar HTML, CSS y JS', desc: 'Reduce el tamaño de tu código quitando comentarios y espacios.', category: 'desarrollo', featured: false },
    { slug: 'regex-tester', title: 'Probador de Expresiones Regulares', desc: 'Prueba tus regex con coincidencias resaltadas y grupos capturados.', category: 'desarrollo', featured: false },
    { slug: 'comparar-textos', title: 'Comparar Dos Textos (Diff)', desc: 'Ve las diferencias línea por línea entre dos textos o versiones.', category: 'desarrollo', featured: false },
    { slug: 'generador-slugs', title: 'Generador de Slugs', desc: 'Convierte un título en un slug de URL limpio y amigable para SEO.', category: 'texto', featured: false },
    { slug: 'codificar-url', title: 'Codificar y Decodificar URL', desc: 'Convierte texto a percent-encoding o revierte los escapes a texto legible.', category: 'desarrollo', featured: false },
    { slug: 'generador-uuid', title: 'Generador de UUID', desc: 'Crea identificadores únicos UUID v4 con el generador seguro del navegador.', category: 'seguridad', featured: false },
    { slug: 'verificador-contrasenas', title: 'Verificador de Contraseñas', desc: 'Analiza la fortaleza y el tiempo de descifrado sin enviarla a ningún sitio.', category: 'seguridad', featured: false },
    { slug: 'generador-hashes', title: 'Generador de Hashes', desc: 'Calcula hash SHA-1, SHA-256, SHA-384, SHA-512 y MD5 en tu navegador.', category: 'seguridad', featured: false },
    { slug: 'limites-redes', title: 'Límites de Redes Sociales', desc: 'Comprueba si tu texto cabe en X, Instagram, TikTok, WhatsApp, SMS y SEO.', category: 'texto', featured: false },
    { slug: 'json-a-csv', title: 'Convertir JSON a CSV', desc: 'Pasa de JSON a CSV o de CSV a JSON con delimitador y cabeceras configurables.', category: 'conversion', featured: false },
    { slug: 'markdown-a-html', title: 'Convertir Markdown a HTML', desc: 'Transforma Markdown en HTML limpio con vista previa renderizada.', category: 'conversion', featured: false },
    { slug: 'imagen-a-pdf', title: 'Convertir Imágenes a PDF', desc: 'Une varias imágenes en un único PDF sin subirlas a ningún servidor.', category: 'conversion', featured: false },
    { slug: 'cifrar-texto-aes', title: 'Cifrar y Descifrar Texto (AES-256)', desc: 'Protege un texto con contraseña usando AES-256-GCM. Todo en tu navegador.', category: 'seguridad', featured: true },
    { slug: 'generador-hmac', title: 'Generador de HMAC', desc: 'Calcula el HMAC de un mensaje con tu clave secreta (SHA-256/384/512).', category: 'seguridad', featured: false },
    { slug: 'decodificar-jwt', title: 'Decodificador de JWT', desc: 'Inspecciona header, payload y expiración de un token JWT sin enviarlo.', category: 'seguridad', featured: false },
    { slug: 'comparar-hashes', title: 'Comparar Hash y Texto', desc: 'Comprueba si un hash corresponde al texto indicado (MD5, SHA-1/256/384/512).', category: 'seguridad', featured: false },
    { slug: 'generar-par-claves', title: 'Generar Par de Claves (RSA/ECDSA)', desc: 'Crea claves pública y privada en formato PEM sin salir del navegador.', category: 'seguridad', featured: false },
    { slug: 'calculadora-porcentajes', title: 'Calculadora de Porcentajes', desc: 'Resuelve porcentajes, aumentos, descuentos y variaciones al instante.', category: 'matematicas', featured: true },
    { slug: 'calculadora-descuentos', title: 'Calculadora de Descuentos e IVA', desc: 'Calcula el precio final con descuento e IVA, y cuánto ahorras.', category: 'matematicas', featured: false },
    { slug: 'estadistica-basica', title: 'Estadística Básica', desc: 'Media, mediana, moda, cuartiles, varianza y desviación de una lista.', category: 'matematicas', featured: false },
    { slug: 'conversor-unidades', title: 'Conversor de Unidades', desc: 'Convierte longitud, masa, volumen, área, velocidad, datos y temperatura.', category: 'matematicas', featured: false },
    { slug: 'convertidor-bases', title: 'Convertidor de Bases Numéricas', desc: 'Convierte entre binario, octal, decimal y hexadecimal con validación.', category: 'matematicas', featured: false },
    { slug: 'regla-de-tres', title: 'Regla de Tres', desc: 'Resuelve reglas de tres directas e inversas al instante.', category: 'matematicas', featured: false },
    { slug: 'generador-tabla-multiplicar', title: 'Tablas de Multiplicar', desc: 'Genera tablas de multiplicar personalizadas para estudiar o imprimir.', category: 'matematicas', featured: false }
  ];

  /* --- Icon SVGs (Lucide-style inline) --- */
  var icons = {
    'contar-palabras-caracteres': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    'quitar-acentos': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><circle cx="12" cy="12" r="1"/></svg>',
    'convertir-mayusculas-minusculas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h12"/><path d="M6 18V6"/><path d="M18 12h3"/><path d="M19.5 6.5L21 18"/><path d="M15 18l3-12"/></svg>',
    'generar-lorem-ipsum': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    'quitar-espacios-duplicados': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="16" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="10" y2="16"/><line x1="14" y1="16" x2="20" y2="16"/></svg>',
    'quitar-saltos-de-linea': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    'invertir-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    'frecuencia-palabras': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    'texto-a-morse': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="2" fill="currentColor"/><line x1="12" y1="12" x2="17" y2="12"/><circle cx="20" cy="12" r="2" fill="currentColor"/></svg>',
    'generar-contrasenas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
    'eliminar-caracteres-especiales': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"/></svg>',
    'convertir-unicode-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'justificar-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    'buscar-reemplazar-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    'codificar-decodificar-base64': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="5" x2="20" y2="5"/><polyline points="20 7 20 17 12 17"/></svg>',
    'anadir-prefijo-sufijo-lineas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M21 16v3a2 2 0 0 1-2 2h-3"/><line x1="7" y1="12" x2="17" y2="12"/></svg>',
    'eliminar-lineas-duplicadas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="0"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    'eliminar-lineas-vacias': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    'filtrar-lineas-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    'numerar-lineas-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/><text x="4" y="8" font-size="6" fill="currentColor" stroke="none" font-family="monospace">1</text><text x="4" y="14" font-size="6" fill="currentColor" stroke="none" font-family="monospace">2</text><text x="4" y="20" font-size="6" fill="currentColor" stroke="none" font-family="monospace">3</text></svg>',
    'generar-lista-numeros': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3L8 21"/><path d="M16 3l-2 18"/></svg>',
    'texto-a-binario': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="0"/><circle cx="17" cy="6" r="3"/><circle cx="17" cy="17" r="3"/><line x1="10" y1="6.5" x2="14" y2="6.5"/><line x1="10" y1="17.5" x2="14" y2="17.5"/></svg>',
    'cifrado-rot13': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a8 8 0 0 1 14.93-2.5"/><path d="M20 15a8 8 0 0 1-14.93 2.5"/><polyline points="18.5 2.5 19 6.5 15 7"/><polyline points="5.5 21.5 5 17.5 9 17"/><text x="9" y="15" font-size="9" fill="currentColor" stroke="none" font-family="monospace">13</text></svg>',
    'quitar-vocales-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><line x1="4" y1="16" x2="20" y2="16"/><path d="M4 3l16 16"/></svg>',
    'mezclar-letras-palabras': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    'anadir-saltos-de-linea': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/><path d="M19 14v6"/><path d="M16 17h6"/></svg>',
    'extraer-columnas-texto': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
    'fusionar-texto-lineas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 8 9 16 9 16 3"/><line x1="12" y1="3" x2="12" y2="21"/><polyline points="8 21 8 15 16 15 16 21"/><line x1="7" y1="12" x2="17" y2="12"/></svg>',
    'limpiar-lista-urls': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></svg>',
    'cifrador-cesar': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="13" rx="0"/><path d="M4 10h16"/><path d="M9 10v9"/><path d="M15 10v9"/></svg>',
    'generar-combinaciones': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><circle cx="12" cy="16" r="3"/><line x1="9.5" y1="9" x2="11" y2="13"/><line x1="14.5" y1="9" x2="13" y2="13"/><line x1="10" y1="16" x2="14" y2="16"/></svg>',
    'combinar-lineas-listas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 6c6 0 6 12 8 12" /><path d="M8 18c6 0 6-12 8-12"/></svg>',
    'generador-permutaciones': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="0"/><rect x="15" y="3" width="6" height="6" rx="0"/><rect x="3" y="15" width="6" height="6" rx="0"/><rect x="15" y="15" width="6" height="6" rx="0"/></svg>',
    'contador-clics': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/></svg>',
    'separar-keywords-genero': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="5"/><circle cx="17" cy="17" r="3"/><line x1="12" y1="12" x2="8" y2="16"/></svg>',
    'comprimir-imagen': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    'convertir-imagen': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    'redimensionar-imagen': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    'marca-de-agua': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    'limpiar-exif': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16l8-8 9 9-3 3z"/><path d="M6.0001 17.9999l3-3"/><line x1="18" y1="2" x2="22" y2="6"/><line x1="22" y1="2" x2="18" y2="6"/></svg>',
    'recortar-imagen': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>',
    'formatear-json': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="12" cy="16" r="1"/></svg>',
    'minificar-codigo': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
    'regex-tester': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="10" y1="7" x2="10" y2="13"/><line x1="7" y1="10" x2="13" y2="10"/></svg>',
    'comparar-textos': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M15 21h4a2 2 0 0 0 2-2v-4"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="3" x2="12" y2="21"/></svg>',
    'generador-slugs': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1 1"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1-1"/></svg>',
    'codificar-url': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="8" y1="8" x2="16" y2="16"/></svg>',
    'generador-uuid': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M8 8h2v8H8z"/><path d="M14 8h2v4h-2z"/><path d="M14 14h2v2h-2z"/></svg>',
    'verificador-contrasenas': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    'generador-hashes': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
    'limites-redes': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H7l-3 3z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12" x2="13" y2="12"/></svg>',
    'json-a-csv': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="3" x2="12" y2="21"/></svg>',
    'markdown-a-html': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="1"/><path d="M6 15V9l3 4 3-4v6"/><path d="M16 9v6"/><path d="m14 13 2 2 2-2"/></svg>',
    'imagen-a-pdf': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="9" cy="13" r="1.5"/><path d="m19 19-4-4-2 2"/></svg>',
    'cifrar-texto-aes': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
    'generador-hmac': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-8 4 16 3-8h6"/></svg>',
    'decodificar-jwt': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></svg>',
    'comparar-hashes': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    'generar-par-claves': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.5 12.5 9-9"/><path d="m15 7 3 3"/><path d="m18 4 3 3"/></svg>',
    'calculadora-porcentajes': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
    'calculadora-descuentos': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>',
    'estadistica-basica': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="20" x2="21" y2="20"/><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="18" y1="20" x2="18" y2="15"/></svg>',
    'conversor-unidades': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>',
    'convertidor-bases': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="0"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>',
    'regla-de-tres': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4z"/><path d="M14 14h6v6h-6z"/><path d="M10 7h4v4"/><line x1="7" y1="10" x2="14" y2="17"/></svg>',
    'generador-tabla-multiplicar': '<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="0"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>'
  };

  /* --- Render Card (cards iguales en home y relacionadas) --- */
  var CATEGORY_LABELS = {
    texto: 'Texto',
    seguridad: 'Seguridad',
    conversion: 'Conversión',
    desarrollo: 'Desarrollo',
    matematicas: 'Matemáticas',
    imagen: 'Imagen'
  };
  var CATEGORY_BADGE = {
    texto: 'badge-primary',
    seguridad: 'badge-dark',
    conversion: 'badge-secondary',
    desarrollo: 'badge-dark',
    matematicas: 'badge-primary',
    imagen: 'badge-primary'
  };

  function renderCardTool(tool) {
    var icon = icons[tool.slug] || '';
    var catLabel = CATEGORY_LABELS[tool.category] || tool.category;
    var badge = tool.featured ? '<span class="badge badge-secondary">Destacada</span>' : '<span class="badge ' + (CATEGORY_BADGE[tool.category] || 'badge-primary') + '">' + catLabel + '</span>';
    return '<a href="/herramientas/' + tool.category + '/' + tool.slug + '/" class="card-tool" data-slug="' + tool.slug + '" data-title="' + tool.title.toLowerCase() + '" data-desc="' + tool.desc.toLowerCase() + '" data-category="' + tool.category + '">' +
      icon +
      '<div class="card-title">' + tool.title + '</div>' +
      '<div class="card-desc">' + tool.desc + '</div>' +
      badge +
    '</a>';
  }

  /* --- Cards relacionadas (encima de #related-tools en cada tool) ---
     Estrategia de 6: [1-3] curados por la tool → [4-6] auto-fill con
     hermanos de la misma categoría → si faltan, destacadas de otras categorías */
  function renderRelatedTools(containerId, slugs) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var seen = {};
    var picked = [];

    function pushBySlug(slug) {
      if (seen[slug] || picked.length >= 6) return;
      var tool = tools.find(function (t) { return t.slug === slug; });
      if (tool) { seen[slug] = true; picked.push(tool); }
    }
    function pushByFilter(fn) {
      tools.forEach(function (t) {
        if (picked.length >= 6) return;
        if (!seen[t.slug] && fn(t)) { seen[t.slug] = true; picked.push(t); }
      });
    }

    // 1) Curados (contextuales, prioridad editorial)
    slugs.forEach(pushBySlug);
    // 2) Resto de la misma categoría
    var cat = picked.length ? picked[0].category : null;
    var selfSlug = slugs[0];
    var self = tools.find(function (t) { return t.slug === selfSlug; });
    var ownCat = self ? self.category : cat;
    if (ownCat) pushByFilter(function (t) { return t.category === ownCat; });
    // 3) Relleno con destacadas de otras categorías
    pushByFilter(function (t) { return t.featured; });
    // 4) Última red: cualquier otra herramienta
    pushByFilter(function () { return true; });

    if (picked.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = picked.map(renderCardTool).join('');
  }

  /* --- localStorage: Track Usage --- */
  function trackToolUsage(slug) {
    try {
      var data = JSON.parse(localStorage.getItem('pp-tools-usage') || '{}');
      data[slug] = (data[slug] || 0) + 1;
      localStorage.setItem('pp-tools-usage', JSON.stringify(data));
    } catch (e) {}
  }

  function getMostUsedTools(limit) {
    try {
      var data = JSON.parse(localStorage.getItem('pp-tools-usage') || '{}');
      return Object.keys(data)
        .map(function (slug) { return { slug: slug, count: data[slug] }; })
        .sort(function (a, b) { return b.count - a.count; })
        .slice(0, limit);
    } catch (e) { return []; }
  }

  /* --- Render grid de una categoría (páginas de categoría) --- */
  function renderCategoryGrid(containerId, category) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var grid = tools.filter(function (t) { return t.category === category; });
    if (grid.length === 0) return;
    var html = grid.map(renderCardTool).join('');
    container.innerHTML = html;
    var countEl = document.getElementById(containerId + '-count');
    if (countEl) countEl.textContent = grid.length + ' herramienta' + (grid.length === 1 ? '' : 's');
  }

  /* --- Expose --- */
  window.ProyectosPixel = window.ProyectosPixel || {};
  window.ProyectosPixel.tools = tools;
  window.ProyectosPixel.icons = icons;
  window.ProyectosPixel.renderCardTool = renderCardTool;
  window.ProyectosPixel.renderRelatedTools = renderRelatedTools;
  window.ProyectosPixel.renderCategoryGrid = renderCategoryGrid;
  window.ProyectosPixel.trackToolUsage = trackToolUsage;
  window.ProyectosPixel.getMostUsedTools = getMostUsedTools;

})();
