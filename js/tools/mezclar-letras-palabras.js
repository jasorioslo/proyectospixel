/* ProyectosPixel - Mezclar Letras de Palabras
   Casos borde: palabras de 3 letras o menos quedan igual (con primera/última);
   modo "palabras completas" baraja el orden de las palabras;
   Fisher-Yates con crypto.getRandomValues para azar de calidad */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlEdges = document.getElementById('ctl-edges');
  var ctlWhole = document.getElementById('ctl-whole');

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j;
      if (window.crypto && window.crypto.getRandomValues) {
        j = window.crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
      } else {
        j = Math.floor(Math.random() * (i + 1));
      }
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function scrambleWord(word, keepEdges) {
    if (word.length <= (keepEdges ? 3 : 1)) return word;
    var first = keepEdges ? word[0] : '';
    var last = keepEdges ? word[word.length - 1] : '';
    var middle = word.slice(keepEdges ? 1 : 0, keepEdges ? -1 : undefined).split('');
    return first + shuffle(middle).join('') + last;
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();

    var out;
    if (ctlWhole.checked) {
      out = text.split(/(\s+)/).map(function (chunk) {
        return /^\s+$/.test(chunk) ? chunk : shuffle(chunk.split('')).join('');
      }).join('');
    } else {
      out = text.split(/(\s+)/).map(function (chunk) {
        return /^\s+$/.test(chunk) ? chunk : scrambleWord(chunk, ctlEdges.checked);
      }).join('');
    }

    result.textContent = out;
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('mezclar-letras-palabras');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['invertir-texto', 'quitar-vocales-texto', 'frecuencia-palabras']);
  }
})();
