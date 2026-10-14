/* ProyectosPixel - Generador de Slugs (URL amigable)
   Casos borde: acentos (NFD), espacios múltiples, símbolos, longitud máxima, separador _ o - */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlSep = document.getElementById('ctl-sep');
  var ctlLower = document.getElementById('ctl-lower');
  var ctlMax = document.getElementById('ctl-max');

  function slugify(text, sep, lower, max) {
    var s = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // quita tildes
    if (lower) s = s.toLowerCase();
    s = s.replace(/[^a-zA-Z0-9\s_-]/g, ' ')   // símbolos fuera
         .replace(/[\s_-]+/g, sep)            // espacios/guiones → separador
         .replace(new RegExp('^' + sep + '+|' + sep + '+$', 'g'), '');
    if (max && s.length > max) s = s.slice(0, max).replace(new RegExp(sep + '+$'), '');
    return s;
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega el título primero.'); return; }
    hideError();
    var max = parseInt(ctlMax.value, 10) || 0;
    result.textContent = slugify(text, ctlSep.value, ctlLower.checked, max);
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-slugs');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'codificar-url', 'limpiar-lista-urls']);
  }
})();
