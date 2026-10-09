/* ProyectosPixel - Cifrador César de Texto
   Casos borde: desplazamiento 1-25 (26 = idéntico, se rechaza); conserva mayúsculas;
   descifrar = cifrar con 26 - N; dígitos y puntuación pasan sin cambio */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlShift = document.getElementById('ctl-shift');

  function caesar(str, shift, isEncode) {
    var n = ((isEncode ? shift : 26 - shift) % 26 + 26) % 26;
    return str.replace(/[a-zA-Z]/g, function (ch) {
      var start = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode((ch.charCodeAt(0) - start + n) % 26 + start);
    });
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    var shift = parseInt(ctlShift.value, 10);
    if (!shift || shift < 1 || shift > 25) { showError('El desplazamiento debe estar entre 1 y 25.'); return; }
    hideError();

    var isEncode = ctlMode.value === 'encode';
    result.textContent = caesar(text, shift, isEncode);
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('cifrador-cesar');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['cifrado-rot13', 'texto-a-binario', 'codificar-decodificar-base64']);
  }
})();
