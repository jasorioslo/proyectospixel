/* ProyectosPixel - Filtrar Líneas de Texto
   Casos borde: sin palabra a buscar → aviso; conservar/eliminar según modo; case-insensitive opcional */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlFilter = document.getElementById('ctl-filter');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlCi = document.getElementById('ctl-ci');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu texto primero.'); return; }
    var needle = ctlFilter.value;
    if (!needle) { showError('Escribe la palabra o frase para filtrar.'); return; }
    hideError();

    var ci = ctlCi.checked;
    var keep = ctlMode.value === 'keep';
    var hay = ci ? needle.toLowerCase() : needle;
    var lines = text.split(/\r?\n/).filter(function (line) { return line.trim() !== ''; });

    var out = lines.filter(function (line) {
      var contains = (ci ? line.toLowerCase() : line).indexOf(hay) !== -1;
      return keep ? contains : !contains;
    });

    result.textContent = out.length ? out.join('\n') : '(Ninguna línea coincide con el filtro)';
    result.style.color = out.length ? '' : 'var(--text-secondary)';
    btnCopy.disabled = !out.length;
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
    result.style.color = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('filtrar-lineas-texto');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['eliminar-lineas-duplicadas', 'eliminar-lineas-vacias', 'buscar-reemplazar-texto']);
  }
})();
