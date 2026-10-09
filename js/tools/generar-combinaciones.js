/* ProyectosPixel - Generador de Combinaciones C(n,k)
   Casos borde: K > N → aviso; duplicados en la lista → quitarlos automáticamente;
   límite de seguridad: máximo 10.000 combinaciones de salida */
(function () {
  'use strict';

  var MAX_OUTPUT = 10000;

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlK = document.getElementById('ctl-k');
  var ctlSep = document.getElementById('ctl-sep');

  function countC(n, k) {
    if (k > n) return 0;
    var c = 1;
    for (var i = 0; i < k; i++) c = c * (n - i) / (i + 1);
    return Math.round(c);
  }

  function combine(items, k) {
    var out = [];
    var n = items.length;
    var idx = [];
    for (var i = 0; i < k; i++) idx.push(i);
    while (true) {
      out.push(idx.map(function (i) { return items[i]; }).join('|SEP|'));
      if (out.length > MAX_OUTPUT) break; // corte de seguridad
      var j = k - 1;
      while (j >= 0 && idx[j] === n - k + j) j--;
      if (j < 0) break;
      idx[j]++;
      for (var m = j + 1; m < k; m++) idx[m] = idx[m - 1] + 1;
    }
    return out;
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    var items = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    // Quitar duplicados conservando orden
    var seen = {};
    items = items.filter(function (item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });

    if (items.length < 2) { showError('Pega al menos 2 elementos (uno por línea).'); return; }
    var k = parseInt(ctlK.value, 10);
    if (!k || k < 1) { showError('Define K igual o mayor que 1.'); return; }
    if (k > items.length) { showError('K no puede ser mayor que el número de elementos (' + items.length + ').'); return; }

    var total = countC(items.length, k);
    if (total > MAX_OUTPUT) {
      showError('C(' + items.length + ',' + k + ') = ' + total.toLocaleString('es') + ' combinaciones. El máximo es ' + MAX_OUTPUT.toLocaleString('es') + '. Reduce elementos o K.');
      return;
    }
    hideError();

    var sepMap = { comma: ', ', space: ' ', pipe: ' | ', dash: ' - ' };
    var sep = sepMap[ctlSep.value] || ', ';
    var combos = combine(items, k).map(function (c) { return c.split('|SEP|').join(sep); });

    result.textContent = 'Total: ' + combos.length.toLocaleString('es') + ' combinaciones\n\n' + combos.join('\n');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generar-combinaciones');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generador-permutaciones', 'combinar-lineas-listas', 'generar-lista-numeros']);
  }
})();
