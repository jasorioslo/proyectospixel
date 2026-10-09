/* =========================================================
   ProyectosPixel Tools - Service Worker (PWA)
   ========================================================= */

var CACHE_NAME = 'pp-v8';
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
  '/herramientas/texto/contar-palabras-caracteres.html',
  '/herramientas/texto/quitar-acentos.html',
  '/herramientas/texto/convertir-mayusculas-minusculas.html',
  '/herramientas/texto/generar-lorem-ipsum.html',
  '/herramientas/texto/quitar-espacios-duplicados.html',
  '/herramientas/texto/quitar-saltos-de-linea.html',
  '/herramientas/texto/invertir-texto.html',
  '/herramientas/texto/frecuencia-palabras.html',
  '/herramientas/conversion/texto-a-morse.html',
  '/herramientas/seguridad/generar-contrasenas.html',
  '/herramientas/texto/eliminar-caracteres-especiales.html',
  '/herramientas/conversion/convertir-unicode-texto.html',
  '/herramientas/texto/justificar-texto.html',
  '/herramientas/texto/buscar-reemplazar-texto.html',
  '/herramientas/conversion/codificar-decodificar-base64.html',
  '/herramientas/texto/anadir-prefijo-sufijo-lineas.html',
  '/herramientas/texto/eliminar-lineas-duplicadas.html',
  '/herramientas/texto/eliminar-lineas-vacias.html',
  '/herramientas/texto/filtrar-lineas-texto.html',
  '/herramientas/texto/numerar-lineas-texto.html',
  '/herramientas/matematicas/generar-lista-numeros.html',
  '/herramientas/conversion/texto-a-binario.html',
  '/herramientas/seguridad/cifrado-rot13.html',
  '/herramientas/texto/quitar-vocales-texto.html',
  '/herramientas/texto/mezclar-letras-palabras.html',
  '/herramientas/texto/anadir-saltos-de-linea.html',
  '/herramientas/texto/extraer-columnas-texto.html',
  '/herramientas/texto/fusionar-texto-lineas.html',
  '/herramientas/desarrollo/limpiar-lista-urls.html',
  '/herramientas/seguridad/cifrador-cesar.html',
  '/herramientas/matematicas/generar-combinaciones.html',
  '/herramientas/matematicas/combinar-lineas-listas.html',
  '/herramientas/matematicas/generador-permutaciones.html',
  '/herramientas/matematicas/contador-clics.html',
  '/herramientas/texto/separar-keywords-genero.html',
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
  '/js/tools/separar-keywords-genero.js'
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
