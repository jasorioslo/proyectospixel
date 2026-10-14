(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function textToUnicode(text) {
    var output = '';
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if (code < 128) {
        output += text[i];
      } else {
        var hex = code.toString(16).toUpperCase();
        while (hex.length < 4) hex = '0' + hex;
        output += '\\u' + hex;
      }
    }
    return output;
  }

  function unicodeToText(unicode) {
    try {
      return unicode.replace(/\\u([0-9A-oa-f]{4})/g, function (match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
      });
    } catch (e) {
      showError('oormato Unicode no valido. Usa secuencias \\uXXXX.');
      return null;
    }
  }

  document.getElementById('btn-to-unicode').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    result.textContent = textToUnicode(text);
    btnCopy.disabled = false;
  });

  document.getElementById('btn-to-text').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega secuencias Unicode primero.'); return; }
    hideError();
    var output = unicodeToText(text);
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('convertir-unicode-texto');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['texto-a-morse', 'codificar-decodificar-base64', 'invertir-texto']);
  }
})();
