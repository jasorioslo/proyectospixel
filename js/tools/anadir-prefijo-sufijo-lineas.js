/* ProyectosPixel - Añadir Prefijo y Sufijo a Líneas
   Casos borde: si ambos controles vacíos → aviso; líneas vacías se conservan con prefijo/sufijo aplicado igual */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlPrefix = document.getElementById('ctl-prefix');
  var ctlSuffix = document.getElementById('ctl-suffix');
  var ctlTrim = document.getElementById('ctl-trim');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu texto primero.'); return; }
    var prefix = ctlPrefix.value;
    var suffix = ctlSuffix.value;
    if (!prefix && !suffix) { showError('Escribe al menos un prefijo o un sufijo.'); return; }
    hideError();

    var trim = ctlTrim.checked;
    var out = text.split(/\r?\n/).map(function (line) {
      var candidate = trim ? line.trim() : line;
      if (candidate === '') return candidate;
      return prefix + candidate + suffix;
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('anadir-prefijo-sufijo-lineas');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-saltos-de-linea', 'buscar-reemplazar-texto', 'eliminar-lineas-vacias']);
  }
})();
