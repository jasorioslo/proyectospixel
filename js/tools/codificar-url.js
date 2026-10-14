/* ProyectosPixel - Codificar y Decodificar URL (encodeURIComponent / decodeURIComponent)
   Casos borde: decode inválido → error; modo componente vs URL completa */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlScope = document.getElementById('ctl-scope');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega el texto/URL primero.'); return; }
    var full = ctlScope.value === 'full';
    try {
      if (ctlMode.value === 'encode') {
        result.textContent = full ? encodeURI(text) : encodeURIComponent(text);
      } else {
        result.textContent = full ? decodeURI(text) : decodeURIComponent(text);
      }
      hideError();
      btnCopy.disabled = false;
    } catch (e) {
      showError('No se pudo decodificar: la secuencia de escapes no es válida (' + e.message + ').');
      result.textContent = '';
      btnCopy.disabled = true;
    }
  });

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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('codificar-url');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generador-slugs', 'codificar-decodificar-base64', 'limpiar-lista-urls']);
  }
})();
