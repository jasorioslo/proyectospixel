/* ProyectosPixel - Quitar Vocales del Texto
   Casos borde: acentuadas opcionales (áéíóúü), opción de quitar Y/y; texto sin vocales → igual */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlAccented = document.getElementById('ctl-accented');
  var ctlY = document.getElementById('ctl-y');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();

    var vowels = 'aeiouAEIOU';
    if (ctlAccented.checked) vowels += 'áéíóúüÁÉÍÓÚÜ';
    if (ctlY.checked) vowels += 'yY';

    var re = new RegExp('[' + vowels + ']', 'g');
    result.textContent = text.replace(re, '');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('quitar-vocales-texto');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'eliminar-caracteres-especiales', 'mezclar-letras-palabras']);
  }
})();
