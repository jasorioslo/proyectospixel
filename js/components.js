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
            '<span class="nav-comingsoon" title="Próximamente">Imagen</span>',
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

  /* --- Footer HTML --- */
  var footerHTML = [
    '<footer class="site-footer">',
      '<div class="footer-content">',
        '<span class="footer-tagline">100% Privado &middot; Sin servidor &middot; Funciona Offline</span>',
        '<div class="footer-links">',
          '<a href="/privacidad.html">Política de Privacidad</a>',
          '<a href="/terminos.html">Términos de Uso</a>',
        '</div>',
        '<span style="font-size:14px;color:var(--text-secondary)">&copy; 2026 ProyectosPixel</span>',
      '</div>',
      '<div class="footer-cats">',
        '<a href="/herramientas/texto/">Texto</a>',
        '<a href="/herramientas/conversion/">Conversión</a>',
        '<a href="/herramientas/seguridad/">Seguridad</a>',
        '<a href="/herramientas/desarrollo/">Desarrollo</a>',
        '<a href="/herramientas/matematicas/">Matemáticas</a>',
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

  /* --- Expose --- */
  window.ProyectosPixel = window.ProyectosPixel || {};
  window.ProyectosPixel.renderHeader = renderHeader;
  window.ProyectosPixel.renderFooter = renderFooter;

  // Auto-registro del SW (se salta en localhost para facilitar desarrollo)
  initServiceWorker();

})();
