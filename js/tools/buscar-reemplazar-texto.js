(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnReplace = document.getElementById('btn-replace');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var countEl = document.getElementById('replace-count');

  btnReplace.addEventListener('click', function () {
    var text = input.value;
    var searchText = document.getElementById('search-text').value;
    var replaceText = document.getElementById('replace-text').value;
    var caseSensitive = document.getElementById('case-sensitive').checked;
    var useRegex = document.getElementById('use-regex').checked;

    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    if (!searchText) { showError('Escribe el texto a buscar.'); return; }
    hideError();

    var regex;
    if (useRegex) {
      try {
        regex = new RegExp(searchText, caseSensitive ? 'g' : 'gi');
      } catch (e) {
        showError('Expresion regular no valida: ' + e.message);
        return;
      }
    } else {
      var escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escaped, caseSensitive ? 'g' : 'gi');
    }

    var matches = text.match(regex);
    var count = matches ? matches.length : 0;
    var output = text.replace(regex, replaceText);

    result.textContent = output;
    countEl.textContent = count + ' reemplazo(s) realizado(s)';
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.textContent = ''; countEl.textContent = '';
    document.getElementById('search-text').value = '';
    document.getElementById('replace-text').value = '';
    btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('buscar-reemplazar-texto');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'frecuencia-palabras', 'convertir-mayusculas-minusculas']);
  }
})();
