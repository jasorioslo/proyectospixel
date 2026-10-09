/* ProyectosPixel - Generar Lista de Números
   Casos borde: rango descendente (desde > hasta con paso 1 → invertir de forma automática);
   límite de seguridad de 100.000 números; separadores por coma, espacio, guion o salto */
(function () {
  'use strict';

  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlFrom = document.getElementById('ctl-from');
  var ctlTo = document.getElementById('ctl-to');
  var ctlStep = document.getElementById('ctl-step');
  var ctlSep = document.getElementById('ctl-sep');

  var MAX = 100000;
  var SEPS = { nl: '\n', comma: ', ', space: ' ', dash: ' - ' };

  btnProcess.addEventListener('click', function () {
    var from = parseInt(ctlFrom.value, 10);
    var to = parseInt(ctlTo.value, 10);
    var step = parseInt(ctlStep.value, 10) || 1;
    if (isNaN(from) || isNaN(to)) { showError('Define desde y hasta con valores numéricos.'); return; }
    if (step < 1) { showError('El paso debe ser al menos 1.'); return; }
    if (step > Math.abs(to - from) + 1) { showError('El paso es mayor que el rango completo.'); return; }

    var reversed = from > to;
    var low = reversed ? to : from;
    var high = reversed ? from : to;
    var count = Math.floor((high - low) / step) + 1;
    if (count > MAX) { showError('El rango genera ' + count.toLocaleString('es') + ' números. El máximo es ' + MAX.toLocaleString('es') + '.'); return; }

    var nums = [];
    for (var i = 0; i < count; i++) {
      var v = low + i * step;
      nums.push(reversed ? (high - i * step) : v);
    }

    var out = nums.join(SEPS[ctlSep.value] || SEPS.nl);
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
    result.textContent = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generar-lista-numeros');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['numerar-lineas-texto', 'generador-permutaciones', 'contar-palabras-caracteres']);
  }
})();
