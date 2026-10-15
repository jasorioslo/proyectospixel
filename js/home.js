/* =========================================================
   ProyectosPixel Tools - Home: Búsqueda y Filtros
   Datos de tools: js/tools-data.js (fuente única)
   ========================================================= */

(function () {
  'use strict';

  /* --- Acceso a datos compartidos --- */
  var api = window.ProyectosPixel;
  var tools = api.tools;

  /* --- Render Sections --- */
  function renderMostUsed() {
    var container = document.getElementById('most-used-tools');
    if (!container) return;
    var LIMIT = 8;
    var mostUsed = api.getMostUsedTools(LIMIT);
    var picked = [];
    var seen = {};

    mostUsed.forEach(function (item) {
      var tool = tools.find(function (t) { return t.slug === item.slug; });
      if (tool && !seen[tool.slug]) { seen[tool.slug] = true; picked.push(tool); }
    });
    // Rellenar hasta LIMIT con destacadas (y si no, con el resto)
    tools.filter(function (t) { return t.featured; }).forEach(function (t) {
      if (picked.length < LIMIT && !seen[t.slug]) { seen[t.slug] = true; picked.push(t); }
    });
    tools.forEach(function (t) {
      if (picked.length < LIMIT && !seen[t.slug]) { seen[t.slug] = true; picked.push(t); }
    });

    container.innerHTML = picked.map(function (t) { return api.renderCardTool(t); }).join('');
  }

  function renderAllTools() {
    var container = document.getElementById('all-tools');
    if (!container) return;
    container.innerHTML = tools.map(function (t) { return api.renderCardTool(t); }).join('');
  }

  /* --- Favoritos (sección que aparece solo si el usuario tiene favoritos) --- */
  function renderFavorites() {
    var section = document.getElementById('favoritos');
    var container = document.getElementById('favorite-tools');
    if (!section || !container) return;
    var favs = (api.favorites && api.favorites.get()) || [];
    var picked = favs.map(function (slug) {
      return tools.find(function (t) { return t.slug === slug; });
    }).filter(Boolean);
    if (!picked.length) {
      section.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    section.style.display = '';
    container.innerHTML = picked.map(function (t) { return api.renderCardTool(t); }).join('');
    var countEl = document.getElementById('favorites-count');
    if (countEl) countEl.textContent = picked.length;
  }

  /* --- Search & Filter --- */
  function initSearch() {
    var searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    var debounceTimer;
    function onInput() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var query = searchInput.value.toLowerCase().trim();

        var cards = document.querySelectorAll('#all-tools .card-cell');
        var visibleCount = 0;
        cards.forEach(function (card) {
          var title = card.getAttribute('data-title');
          var desc = card.getAttribute('data-desc');
          var match = !query || title.indexOf(query) !== -1 || desc.indexOf(query) !== -1;
          if (match) {
            card.classList.remove('hidden');
            visibleCount++;
          } else {
            card.classList.add('hidden');
          }
        });

        // Show/hide no-results message
        var noResults = document.getElementById('no-results');
        if (noResults) {
          noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      }, 300);
    }

    searchInput.addEventListener('input', onInput);
  }

  /* --- Init --- */
  function init() {
    renderMostUsed();
    renderAllTools();
    renderFavorites();
    initSearch();
    document.addEventListener('pp:favorites-changed', renderFavorites);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* --- Expose for external use --- */
  window.ProyectosPixel = window.ProyectosPixel || {};
  window.ProyectosPixel.trackToolUsage = api.trackToolUsage;

})();
