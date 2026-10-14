/* ProyectosPixel - Generador de Tablas de Multiplicar */
(function () {
  'use strict';

  var errorEl = document.getElementById('tool-error');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlFrom = document.getElementById('ctl-from');
  var ctlTo = document.getElementById('ctl-to');
  var ctlUntil = document.getElementById('ctl-until');
  var ctlFormat = document.getElementById('ctl-format');

  btnProcess.addEventListener('click', function () {
    var from = parseInt(ctlFrom.value, 10);
    var to = parseInt(ctlTo.value, 10);
    var until = parseInt(ctlUntil.value, 10);
    if (isNaN(from) || isNaN(to) || isNaN(until) || until < 1) {
      errorEl.textContent = 'Revisa los valores: tablas desde/hasta y multiplicador máximo (≥1).';
      errorEl.classList.add('visible');
      return;
    }
    if (from > to) { var t = from; from = to; to = t; }
    if (to - from > 50) { errorEl.textContent = 'Máximo 50 tablas de una vez.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');

    var blocks = [];
    for (var n = from; n <= to; n++) {
      var lines = [];
      for (var i = 1; i <= until; i++) {
        if (ctlFormat.value === 'eq') lines.push(n + ' × ' + i + ' = ' + (n * i));
        else lines.push(n + ' × ' + i + ' = ' + (n * i) + (i === until ? '' : '\t'));
      }
      blocks.push('Tabla del ' + n + '\n' + lines.join('\n'));
    }
    result.textContent = blocks.join('\n\n');
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-tabla-multiplicar');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-lista-numeros', 'numerar-lineas-texto', 'calculadora-porcentajes']);
  }
})();
