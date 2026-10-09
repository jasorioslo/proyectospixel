/* ProyectosPixel - Numerar Líneas de Texto
   Casos borde: líneas vacías se conservan sin número (opcional); dirección de conteo según opción de inicio */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlStart = document.getElementById('ctl-start');
  var ctlSep = document.getElementById('ctl-sep');
  var ctlSkip = document.getElementById('ctl-skip');

  var SEP = { dot: '. ', paren: ') ', dash: '- ', bracket: '] ', colon: ': ' };

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu texto primero.'); return; }
    var start = parseInt(ctlStart.value, 10);
    if (isNaN(start)) start = 1;
    var n = start;
    var skip = ctlSkip.checked;
    var sep = SEP[ctlSep.value] || '. ';

    var out = text.split(/\r?\n/).map(function (line) {
      if (skip && line.trim() === '') return line;
      return n++ + sep + line;
    }).join('\n');

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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('numerar-lineas-texto');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-lista-numeros', 'quitar-saltos-de-linea', 'eliminar-lineas-vacias']);
  }
})();
