/* ProyectosPixel - Cifrado ROT13
   Casos borde: conserva mayúsculas/minúsculas; ñ → nn no estándar (la dejamos igual — ROT13 clásico es ASCII);
   ROT13 es su propio inverso: aplicarlo dos veces devuelve el original */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function (ch) {
      var start = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode((ch.charCodeAt(0) - start + 13) % 26 + start);
    });
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    result.textContent = rot13(text);
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = '';
    result.textContent = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('cifrado-rot13');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['cifrador-cesar', 'texto-a-binario', 'invertir-texto']);
  }
})();
