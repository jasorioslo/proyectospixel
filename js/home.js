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
    var mostUsed = api.getMostUsedTools(8);
    if (mostUsed.length === 0) {
      // Sin datos aún: mostrar una selección de destacadas como punto de partida
      var featured = tools.filter(function (t) { return t.featured; });
      container.innerHTML = featured.slice(0, 8).map(function (t) { return api.renderCardTool(t); }).join('');
      return;
    }
    var html = mostUsed.map(function (item) {
      var tool = tools.find(function (t) { return t.slug === item.slug; });
      return tool ? api.renderCardTool(tool) : '';
    }).filter(Boolean).join('');
    container.innerHTML = html;
  }

  function renderAllTools() {
    var container = document.getElementById('all-tools');
    if (!container) return;
    container.innerHTML = tools.map(function (t) { return api.renderCardTool(t); }).join('');
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

        var cards = document.querySelectorAll('#all-tools .card-tool');
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
    initSearch();
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
