/* ProyectosPixel - Extractor de Columnas de Texto
   Casos borde: filas con menos columnas que la pedida → se omiten (opcionalmente);
   delimitador espacio colapsa separadores múltiples; sin cabecera, entrega solo valores */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlDelim = document.getElementById('ctl-delim');
  var ctlCol = document.getElementById('ctl-col');
  var ctlSkip = document.getElementById('ctl-skipempty');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu texto delimitado primero.'); return; }
    var col = parseInt(ctlCol.value, 10);
    if (!col || col < 1) { showError('El número de columna debe ser 1 o mayor.'); return; }
    hideError();

    var delim = ctlDelim.value === 'tab' ? '\t' : ctlDelim.value;
    var re = delim === ' ' ? /\s+/ : new RegExp(delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

    var out = [];
    var skipped = 0;
    text.split(/\r?\n/).forEach(function (line) {
      if (line.trim() === '') return;
      var parts = line.split(re).map(function (p) { return p.trim(); }).filter(function (p) { return p !== ''; });
      if (parts.length >= col) {
        out.push(parts[col - 1]);
      } else {
        skipped++;
      }
    });

    if (out.length === 0) {
      showError('Ninguna fila tiene la columna ' + col + '.' + (skipped ? ' (' + skipped + ' filas omitidas)' : ''));
      return;
    }

    result.textContent = out.join('\n');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('extraer-columnas-texto');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['fusionar-texto-lineas', 'filtrar-lineas-texto', 'eliminar-lineas-vacias']);
  }
})();
