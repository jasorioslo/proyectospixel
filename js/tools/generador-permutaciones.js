/* ProyectosPixel - Generador de Permutaciones n!
   Casos borde: máximo 8 elementos (8! = 40.320); duplicados se quitan automático;
   algoritmo deHeap para generar todas las permutaciones eficientemente */
(function () {
  'use strict';

  var MAX_ITEMS = 8;

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlSep = document.getElementById('ctl-sep');

  function heapPermute(arr, sep, out) {
    function swap(a, b) { var t = arr[a]; arr[a] = arr[b]; arr[b] = t; }
    function gen(len) {
      if (len === 1) { out.push(arr.join(sep)); return; }
      for (var i = 0; i < len; i++) {
        gen(len - 1);
        swap(len % 2 === 1 ? 0 : i, len - 1);
      }
    }
    gen(arr.length);
    return out;
  }

  btnProcess.addEventListener('click', function () {
    var seen = {};
    var items = input.value.split(/\r?\n/).map(function (l) { return l.trim(); })
      .filter(function (l) { return l !== '' && !seen[l] && (seen[l] = true); });

    if (items.length < 2) { showError('Pega al menos 2 elementos (uno por línea).'); return; }
    if (items.length > MAX_ITEMS) { showError('Máximo ' + MAX_ITEMS + ' elementos (' + MAX_ITEMS + '! = 40.320). Quita elementos o usa el Generador de Combinaciones.'); return; }
    hideError();

    var out = [];
    heapPermute(items, ctlSep.value || ' ', out);
    var total = out.length;

    result.textContent = 'Total: ' + total.toLocaleString('es') + ' permutaciones\n\n' + out.join('\n');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-permutaciones');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-combinaciones', 'combinar-lineas-listas', 'invertir-texto']);
  }
})();
