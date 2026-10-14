/* =========================================================
   ProyectosPixel Tools - Service Worker (PWA)
   ========================================================= */

var CACHE_NAME = 'pp-v17';
var ASSETS = [
  '/',
  '/index.html',
  '/privacidad.html',
  '/terminos.html',
  '/herramientas/texto/',
  '/herramientas/',
  '/herramientas/conversion/',
  '/herramientas/seguridad/',
  '/herramientas/desarrollo/',
  '/herramientas/matematicas/',
  '/herramientas/imagen/',
  '/herramientas/desarrollo/formatear-json/',
  '/herramientas/desarrollo/minificar-codigo/',
  '/herramientas/desarrollo/regex-tester/',
  '/herramientas/desarrollo/comparar-textos/',
  '/herramientas/texto/generador-slugs/',
  '/herramientas/desarrollo/codificar-url/',
  '/herramientas/seguridad/generador-uuid/',
  '/herramientas/seguridad/verificador-contrasenas/',
  '/herramientas/seguridad/generador-hashes/',
  '/herramientas/texto/limites-redes/',
  '/herramientas/conversion/json-a-csv/',
  '/herramientas/conversion/markdown-a-html/',
  '/herramientas/conversion/imagen-a-pdf/',
  '/herramientas/seguridad/cifrar-texto-aes/',
  '/herramientas/seguridad/generador-hmac/',
  '/herramientas/seguridad/decodificar-jwt/',
  '/herramientas/seguridad/comparar-hashes/',
  '/herramientas/seguridad/generar-par-claves/',
  '/herramientas/matematicas/calculadora-porcentajes/',
  '/herramientas/matematicas/calculadora-descuentos/',
  '/herramientas/matematicas/estadistica-basica/',
  '/herramientas/matematicas/conversor-unidades/',
  '/herramientas/matematicas/convertidor-bases/',
  '/herramientas/matematicas/regla-de-tres/',
  '/herramientas/matematicas/generador-tabla-multiplicar/',
  '/herramientas/imagen/comprimir-imagen/',
  '/herramientas/imagen/convertir-imagen/',
  '/herramientas/imagen/redimensionar-imagen/',
  '/herramientas/imagen/marca-de-agua/',
  '/herramientas/imagen/limpiar-exif/',
  '/herramientas/imagen/recortar-imagen/',
  '/css/styles.css',
  '/js/components.js',
  '/js/tools-data.js',
  '/js/home.js',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/assets/img/og-image.png',
  '/herramientas/texto/contar-palabras-caracteres/',
  '/herramientas/texto/quitar-acentos/',
  '/herramientas/texto/convertir-mayusculas-minusculas/',
  '/herramientas/texto/generar-lorem-ipsum/',
  '/herramientas/texto/quitar-espacios-duplicados/',
  '/herramientas/texto/quitar-saltos-de-linea/',
  '/herramientas/texto/invertir-texto/',
  '/herramientas/texto/frecuencia-palabras/',
  '/herramientas/conversion/texto-a-morse/',
  '/herramientas/seguridad/generar-contrasenas/',
  '/herramientas/texto/eliminar-caracteres-especiales/',
  '/herramientas/conversion/convertir-unicode-texto/',
  '/herramientas/texto/justificar-texto/',
  '/herramientas/texto/buscar-reemplazar-texto/',
  '/herramientas/conversion/codificar-decodificar-base64/',
  '/herramientas/texto/anadir-prefijo-sufijo-lineas/',
  '/herramientas/texto/eliminar-lineas-duplicadas/',
  '/herramientas/texto/eliminar-lineas-vacias/',
  '/herramientas/texto/filtrar-lineas-texto/',
  '/herramientas/texto/numerar-lineas-texto/',
  '/herramientas/matematicas/generar-lista-numeros/',
  '/herramientas/conversion/texto-a-binario/',
  '/herramientas/seguridad/cifrado-rot13/',
  '/herramientas/texto/quitar-vocales-texto/',
  '/herramientas/texto/mezclar-letras-palabras/',
  '/herramientas/texto/anadir-saltos-de-linea/',
  '/herramientas/texto/extraer-columnas-texto/',
  '/herramientas/texto/fusionar-texto-lineas/',
  '/herramientas/desarrollo/limpiar-lista-urls/',
  '/herramientas/seguridad/cifrador-cesar/',
  '/herramientas/matematicas/generar-combinaciones/',
  '/herramientas/matematicas/combinar-lineas-listas/',
  '/herramientas/matematicas/generador-permutaciones/',
  '/herramientas/matematicas/contador-clics/',
  '/herramientas/texto/separar-keywords-genero/',
  '/js/tools/contar-palabras.js',
  '/js/tools/quitar-acentos.js',
  '/js/tools/convertir-mayusculas-minusculas.js',
  '/js/tools/generar-lorem-ipsum.js',
  '/js/tools/quitar-espacios-duplicados.js',
  '/js/tools/quitar-saltos-de-linea.js',
  '/js/tools/invertir-texto.js',
  '/js/tools/frecuencia-palabras.js',
  '/js/tools/texto-a-morse.js',
  '/js/tools/generar-contrasenas.js',
  '/js/tools/eliminar-caracteres-especiales.js',
  '/js/tools/convertir-unicode-texto.js',
  '/js/tools/justificar-texto.js',
  '/js/tools/buscar-reemplazar-texto.js',
  '/js/tools/codificar-decodificar-base64.js',
  '/js/tools/anadir-prefijo-sufijo-lineas.js',
  '/js/tools/eliminar-lineas-duplicadas.js',
  '/js/tools/eliminar-lineas-vacias.js',
  '/js/tools/filtrar-lineas-texto.js',
  '/js/tools/numerar-lineas-texto.js',
  '/js/tools/generar-lista-numeros.js',
  '/js/tools/texto-a-binario.js',
  '/js/tools/cifrado-rot13.js',
  '/js/tools/quitar-vocales-texto.js',
  '/js/tools/mezclar-letras-palabras.js',
  '/js/tools/anadir-saltos-de-linea.js',
  '/js/tools/extraer-columnas-texto.js',
  '/js/tools/fusionar-texto-lineas.js',
  '/js/tools/limpiar-lista-urls.js',
  '/js/tools/cifrador-cesar.js',
  '/js/tools/generar-combinaciones.js',
  '/js/tools/combinar-lineas-listas.js',
  '/js/tools/generador-permutaciones.js',
  '/js/tools/contador-clics.js',
  '/js/tools/separar-keywords-genero.js',
  '/js/tools/image-utils.js',
  '/js/tools/comprimir-imagen.js',
  '/js/tools/convertir-imagen.js',
  '/js/tools/redimensionar-imagen.js',
  '/js/tools/marca-de-agua.js',
  '/js/tools/limpiar-exif.js',
  '/js/tools/recortar-imagen.js',
  '/js/tools/formatear-json.js',
  '/js/tools/minificar-codigo.js',
  '/js/tools/regex-tester.js',
  '/js/tools/comparar-textos.js',
  '/js/tools/generador-slugs.js',
  '/js/tools/codificar-url.js',
  '/js/tools/generador-uuid.js',
  '/js/tools/verificador-contrasenas.js',
  '/js/tools/generador-hashes.js',
  '/js/tools/limites-redes.js',
  '/js/tools/json-a-csv.js',
  '/js/tools/markdown-a-html.js',
  '/js/tools/imagen-a-pdf.js',
  '/js/tools/hash-utils.js',
  '/js/tools/cifrar-texto-aes.js',
  '/js/tools/generador-hmac.js',
  '/js/tools/decodificar-jwt.js',
  '/js/tools/comparar-hashes.js',
  '/js/tools/generar-par-claves.js',
  '/js/tools/calculadora-porcentajes.js',
  '/js/tools/calculadora-descuentos.js',
  '/js/tools/estadistica-basica.js',
  '/js/tools/conversor-unidades.js',
  '/js/tools/convertidor-bases.js',
  '/js/tools/regla-de-tres.js',
  '/js/tools/generador-tabla-multiplicar.js'
];

// Install: cache static assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache First for assets, Network First for HTML
self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // Static assets: Cache First
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.destination === 'font' ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.match(request).then(function (cached) {
        return cached || fetch(request).then(function (response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, clone);
          });
          return response;
        });
      })
    );
    return;
  }

  // HTML pages: Network First, fallback to cache
  if (request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, clone);
        });
        return response;
      }).catch(function () {
        return caches.match(request);
      })
    );
    return;
  }

  // Default: Network First
  event.respondWith(
    fetch(request).catch(function () {
      return caches.match(request);
    })
  );
});
