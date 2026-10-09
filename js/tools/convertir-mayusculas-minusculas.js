(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function process(fn) {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    result.textContent = fn(text);
    btnCopy.disabled = false;
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, function (c) { return c.toUpperCase(); });
  }

  document.getElementById('btn-upper').addEventListener('click', function () { process(function (t) { return t.toUpperCase(); }); });
  document.getElementById('btn-lower').addEventListener('click', function () { process(function (t) { return t.toLowerCase(); }); });
  document.getElementById('btn-title').addEventListener('click', function () { process(toTitleCase); });
  document.getElementById('btn-sentence').addEventListener('click', function () { process(toSentenceCase); });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('convertir-mayusculas-minusculas');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'contar-palabras-caracteres', 'buscar-reemplazar-texto']);
  }
})();
