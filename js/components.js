/* =========================================================
   ProyectosPixel Tools - Componentes (Header / Footer)
   ========================================================= */

(function () {
  'use strict';

  /* --- Header HTML (cápsula flotante glass, sin buscador) --- */
  var headerHTML = [
    '<header class="site-header">',
      '<div class="header-capsule">',
        '<div class="header-inner">',
          '<a href="/" class="header-logo">',
            '<span class="logo-mark" aria-hidden="true">Px</span>',
            '<span class="logo-text">ProyectosPixel</span>',
          '</a>',
          '<nav class="header-nav" aria-label="Categorías">',
            '<a href="/herramientas/texto/">Texto</a>',
            '<a href="/herramientas/imagen/">Imagen</a>',
            '<a href="/herramientas/desarrollo/">Desarrollo</a>',
            '<a href="/herramientas/conversion/">Conversión</a>',
            '<a href="/herramientas/seguridad/">Seguridad</a>',
            '<a href="/herramientas/matematicas/">Matemáticas</a>',
          '</nav>',
          '<button class="theme-toggle" id="theme-toggle" aria-label="Cambiar tema">',
            '<svg id="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
            '<svg id="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
          '</button>',
        '</div>',
      '</div>',
    '</header>'
  ].join('');

  /* --- Footer HTML (rediseño: marca + categorías + explorar) --- */
  var footerHTML = [
    '<footer class="site-footer">',
      '<div class="footer-inner">',
        '<div class="footer-grid">',
          '<div class="footer-brand">',
            '<a href="/" class="footer-logo">',
              '<span class="logo-mark" aria-hidden="true">Px</span>',
              '<span>ProyectosPixel</span>',
            '</a>',
            '<p class="footer-tagline">Herramientas online gratuitas y 100% privadas. Todo funciona en tu navegador: sin servidores, sin registro y sin límites.</p>',
            '<span class="footer-badge">100% Privado · Sin servidor · Offline</span>',
          '</div>',
          '<nav class="footer-col" aria-label="Categorías">',
            '<h3 class="footer-col-title">Categorías</h3>',
            '<a href="/herramientas/texto/">Texto</a>',
            '<a href="/herramientas/imagen/">Imagen</a>',
            '<a href="/herramientas/conversion/">Conversión</a>',
            '<a href="/herramientas/seguridad/">Seguridad</a>',
            '<a href="/herramientas/desarrollo/">Desarrollo</a>',
            '<a href="/herramientas/matematicas/">Matemáticas</a>',
          '</nav>',
          '<nav class="footer-col" aria-label="Explorar">',
            '<h3 class="footer-col-title">Explorar</h3>',
            '<a href="/herramientas/">Todas las herramientas</a>',
            '<a href="/#mas-usadas">Más usadas</a>',
            '<a href="/privacidad.html">Política de Privacidad</a>',
            '<a href="/cookies.html">Política de Cookies</a>',
            '<a href="/terminos.html">Términos de Uso</a>',
          '</nav>',
        '</div>',
        '<div class="footer-bottom">',
          '<span>&copy; 2026 ProyectosPixel</span>',
          '<span class="footer-bottom-note">Tus datos nunca salen de tu navegador</span>',
        '</div>',
      '</div>',
    '</footer>'
  ].join('');

  /* --- Render --- */
  function renderHeader() {
    var el = document.getElementById('header');
    if (el) el.innerHTML = headerHTML;
    initThemeToggle();
  }

  function renderFooter() {
    var el = document.getElementById('footer');
    if (el) el.innerHTML = footerHTML;
  }

  /* --- Service Worker (registro unificado) --- */
  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }

  /* --- Anuncios (AdSense, con lazy-load y sin romper CWV) --- */
  var AD_CLIENT = 'ca-pub-4553600515484019';
  var AD_SLOTS = { top: '4318614334', mid: '9277006553', bottom: '4327932200' };
  var adsScriptState = 'idle'; // idle | loading | ready
  var adsCallbacks = [];

  function loadAdsScript(callback) {
    if (adsScriptState === 'ready') { callback(); return; }
    adsCallbacks.push(callback);
    if (adsScriptState === 'loading') return;
    adsScriptState = 'loading';
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-adsense', '1');
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + AD_CLIENT;
    s.onload = function () {
      adsScriptState = 'ready';
      var q = adsCallbacks; adsCallbacks = [];
      q.forEach(function (fn) { try { fn(); } catch (e) {} });
    };
    s.onerror = function () { /* bloqueado (adblock/CSP): no rompemos la página */ };
    document.head.appendChild(s);
  }

  function mountAd(zoneEl) {
    if (zoneEl.getAttribute('data-ad-mounted') === '1') return; // guarda anti-duplicado
    zoneEl.setAttribute('data-ad-mounted', '1');
    var zone = zoneEl.classList.contains('ad-top') ? 'top'
      : zoneEl.classList.contains('ad-bottom') ? 'bottom' : 'mid';
    if (!AD_SLOTS[zone]) return;
    loadAdsScript(function () {
      if (zoneEl.querySelector('ins.adsbygoogle')) return;
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', AD_CLIENT);
      ins.setAttribute('data-ad-slot', AD_SLOTS[zone]);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      zoneEl.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  function initAds() {
    var zones = document.querySelectorAll('.ad-container');
    if (!zones.length) return;
    // Nunca en páginas legales o de error
    if (/^\/(404|cookies|privacidad|terminos)/.test(location.pathname)) return;

    // Cada página decide dónde van los anuncios con sus contenedores
    // (la home no tiene ninguno; tools/categorías tienen mid + bottom)
    var targets = Array.prototype.filter.call(zones, function (z) {
      return getComputedStyle(z).display !== 'none';
    });
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(mountAd);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        mountAd(entry.target);
      });
    }, { rootMargin: '300px 0px' });
    targets.forEach(function (z) { observer.observe(z); });

    // Fallback de seguridad: tras el load (LCP ya pintado), montar lo que falte.
    // Cubre pestañas en segundo plano, navegadores que no disparan IO y scroll restaurado.
    window.addEventListener('load', function () {
      var run = function () {
        targets.forEach(function (z) { if (!z.querySelector('ins.adsbygoogle')) mountAd(z); });
      };
      if ('requestIdleCallback' in window) { requestIdleCallback(run, { timeout: 2500 }); }
      else { setTimeout(run, 800); }
    });
  }

  /* --- Theme Toggle --- */
  function initThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    var sunIcon = document.getElementById('icon-sun');
    var moonIcon = document.getElementById('icon-moon');

    function applyTheme(dark) {
      if (dark) {
        document.documentElement.classList.add('dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        document.documentElement.classList.remove('dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }

    // Read saved preference
    var saved = localStorage.getItem('pp-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved === 'dark' || (!saved && prefersDark);
    applyTheme(isDark);

    if (toggle) {
      toggle.addEventListener('click', function () {
        var nowDark = document.documentElement.classList.contains('dark');
        applyTheme(!nowDark);
        localStorage.setItem('pp-theme', !nowDark ? 'dark' : 'light');
      });
    }
  }

  /* --- Favoritos (localStorage: pp-favorites = [slug, ...]) --- */
  var FAV_KEY = 'pp-favorites';
  var FAV_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  function getFavs() {
    try { var a = JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function saveFavs(a) { try { localStorage.setItem(FAV_KEY, JSON.stringify(a)); } catch (e) {} }
  function isFav(slug) { return getFavs().indexOf(slug) !== -1; }
  function toggleFav(slug) {
    var a = getFavs();
    var i = a.indexOf(slug);
    if (i === -1) a.push(slug); else a.splice(i, 1);
    saveFavs(a);
    var nowFav = i === -1;
    try { document.dispatchEvent(new CustomEvent('pp:favorites-changed', { detail: { slug: slug, fav: nowFav } })); } catch (e) {}
    return nowFav;
  }

  function syncFavUI(slug, fav) {
    var nodes = document.querySelectorAll('[data-fav="' + slug + '"]');
    Array.prototype.forEach.call(nodes, function (el) {
      var label = fav ? 'Quitar de favoritos' : 'Añadir a favoritos';
      el.classList.toggle('is-fav', fav);
      el.setAttribute('aria-pressed', fav ? 'true' : 'false');
      if (el.classList.contains('card-fav')) {
        el.setAttribute('aria-label', label);
        el.setAttribute('title', label);
      } else if (el.classList.contains('tool-fav-btn')) {
        var lbl = el.querySelector('.tool-fav-label');
        if (lbl) lbl.textContent = fav ? 'En favoritos' : 'Añadir a favoritos';
      }
    });
  }

  function injectToolFavButton() {
    var m = location.pathname.match(/^\/herramientas\/[^/]+\/([^/]+)\/?/);
    if (!m) return;
    var h1 = document.querySelector('main .tool-h1') || document.querySelector('.tool-h1');
    if (!h1 || h1.parentNode.querySelector('.tool-fav-btn')) return;
    var slug = m[1];
    var fav = isFav(slug);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-fav-btn' + (fav ? ' is-fav' : '');
    btn.setAttribute('data-fav', slug);
    btn.setAttribute('aria-pressed', fav ? 'true' : 'false');
    btn.innerHTML = FAV_SVG + '<span class="tool-fav-label">' + (fav ? 'En favoritos' : 'Añadir a favoritos') + '</span>';
    btn.addEventListener('click', function () { toggleFav(slug); });
    h1.insertAdjacentElement('afterend', btn);
  }

  function initFavorites() {
    // Delegación: estrella en las tarjetas (no navega al pulsarla)
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('.card-fav');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      toggleFav(el.getAttribute('data-fav'));
    });
    // Teclado: Enter/Espacio sobre la estrella
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var el = e.target.closest && e.target.closest('.card-fav');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      toggleFav(el.getAttribute('data-fav'));
    });
    document.addEventListener('pp:favorites-changed', function (e) {
      syncFavUI(e.detail.slug, e.detail.fav);
    });
    injectToolFavButton();
  }

  /* --- Expose --- */
  window.ProyectosPixel = window.ProyectosPixel || {};
  window.ProyectosPixel.renderHeader = renderHeader;
  window.ProyectosPixel.renderFooter = renderFooter;
  window.ProyectosPixel.favorites = {
    get: getFavs,
    has: isFav,
    toggle: toggleFav,
    count: function () { return getFavs().length; },
    svg: FAV_SVG
  };

  // Favoritos: delegación global + botón en la página de la herramienta
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFavorites);
  } else {
    initFavorites();
  }

  // Auto-registro del SW (se salta en localhost para facilitar desarrollo)
  initServiceWorker();

  // Anuncios: montaje diferido por zona (no bloquea el render)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }

})();
