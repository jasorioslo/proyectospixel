/* ProyectosPixel - Fusionar Texto Línea por Línea
   Casos borde: listas de distinto tamaño → las líneas restantes de la mayor se dejan solas;
   filas vacías se omiten; separador custom puede ser multi-caracter */
(function () {
  'use strict';

  var inputA = document.getElementById('tool-input');
  var inputB = document.getElementById('tool-input-b');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlSep = document.getElementById('ctl-sep');
  var ctlTrim = document.getElementById('ctl-trim');

  function lines(textarea) {
    return textarea.value.split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
  }

  btnProcess.addEventListener('click', function () {
    var a = lines(inputA);
    var b = lines(inputB);
    if (a.length === 0 && b.length === 0) { showError('Pega al menos una lista con contenido.'); return; }
    if (a.length === 0) { showError('La lista A está vacía.'); return; }
    if (b.length === 0) { showError('La lista B está vacía.'); return; }
    hideError();

    var sep = ctlSep.value;
    var trim = ctlTrim.checked;
    var max = Math.max(a.length, b.length);
    var out = [];
    for (var i = 0; i < max; i++) {
      var va = i < a.length ? a[i] : '';
      var vb = i < b.length ? b[i] : '';
      var row = trim ? va.trim() + sep + vb.trim() : va + sep + vb;
      out.push(row);
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
    inputA.value = '';
    inputB.value = '';
    result.textContent = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('fusionar-texto-lineas');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['combinar-lineas-listas', 'extraer-columnas-texto', 'buscar-reemplazar-texto']);
  }
})();
