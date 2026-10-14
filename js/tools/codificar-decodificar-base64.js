(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function encodeBase64(text) {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
      showError('Error al codificar: ' + e.message);
      return null;
    }
  }

  function decodeBase64(base64) {
    try {
      return decodeURIComponent(escape(atob(base64.trim())));
    } catch (e) {
      showError('Base64 no válido. Verifica que el texto sea Base64 correcto.');
      return null;
    }
  }

  document.getElementById('btn-encode').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    var output = encodeBase64(text);
    if (output !== null) { result.textContent = output; btnCopy.disabled = false; }
  });

  document.getElementById('btn-decode').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega código Base64 primero.'); return; }
    hideError();
    var output = decodeBase64(text);
    if (output !== null) { result.textContent = output; btnCopy.disabled = false; }
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('codificar-decodificar-base64');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['convertir-unicode-texto', 'texto-a-morse', 'generar-contrasenas']);
  }
})();
