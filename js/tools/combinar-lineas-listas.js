/* ProyectosPixel - Combinar Líneas de Dos Listas (A×B)
   Casos borde: límite de seguridad de 10.000 cruces; listas vacías → error;
   cruce mantiene el orden de A como lista exterior y B como interior */
(function () {
  'use strict';

  var MAX_OUTPUT = 10000;

  var inputA = document.getElementById('tool-input');
  var inputB = document.getElementById('tool-input-b');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlSep = document.getElementById('ctl-sep');
  var ctlOrder = document.getElementById('ctl-order');

  function lines(t) {
    return t.value.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
  }

  btnProcess.addEventListener('click', function () {
    var a = lines(inputA);
    var b = lines(inputB);
    if (a.length === 0) { showError('La lista A está vacía.'); return; }
    if (b.length === 0) { showError('La lista B está vacía.'); return; }

    var total = a.length * b.length;
    if (total > MAX_OUTPUT) {
      showError(a.length + ' × ' + b.length + ' = ' + total.toLocaleString('es') + ' combinaciones. El máximo es ' + MAX_OUTPUT.toLocaleString('es') + '.');
      return;
    }
    hideError();

    var sep = ctlSep.value;
    var outer = ctlOrder.checked ? b : a;
    var inner = ctlOrder.checked ? a : b;
    var out = [];
    outer.forEach(function (va) {
      inner.forEach(function (vb) {
        out.push(va + sep + vb);
      });
    });

    result.textContent = 'Total: ' + total.toLocaleString('es') + ' combinaciones\n\n' + out.join('\n');
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    inputA.value = '';
    inputB.value = '';
    result.textContent = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('combinar-lineas-listas');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['fusionar-texto-lineas', 'generar-combinaciones', 'generador-permutaciones']);
  }
})();
