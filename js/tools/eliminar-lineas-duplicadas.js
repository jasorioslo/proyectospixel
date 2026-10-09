/* ProyectosPixel - Quitar Líneas Duplicadas
   Casos borde: conserva la primera aparición; línea de espacios tras trim opcional;
   case-insensitive compara en minúsculas pero devuelve la línea original */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlTrim = document.getElementById('ctl-trim');
  var ctlCi = document.getElementById('ctl-ci');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu lista primero.'); return; }
    hideError();

    var trim = ctlTrim.checked;
    var ci = ctlCi.checked;
    var seen = {};
    var out = [];
    var lines = text.split(/\r?\n/).filter(function (line) { return line.trim() !== ''; });

    lines.forEach(function (line) {
      var candidate = trim ? line.trim() : line;
      var key = ci ? candidate.toLowerCase() : candidate;
      if (!seen.hasOwnProperty(key)) {
        seen[key] = true;
        out.push(candidate);
      }
    });

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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('eliminar-lineas-duplicadas');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-espacios-duplicados', 'eliminar-lineas-vacias', 'quitar-saltos-de-linea']);
  }
})();
