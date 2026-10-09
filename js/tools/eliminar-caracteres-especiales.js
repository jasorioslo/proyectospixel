(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();

    var keepAccents = document.getElementById('keep-accents').checked;
    var keepSpaces = document.getElementById('keep-spaces').checked;

    var regex;
    if (keepAccents && keepSpaces) {
      regex = /[^a-zA-Z0-9\s\u00C0-\u024F]/g;
    } else if (keepAccents) {
      regex = /[^a-zA-Z0-9\u00C0-\u024F]/g;
    } else if (keepSpaces) {
      regex = /[^a-zA-Z0-9\s]/g;
    } else {
      regex = /[^a-zA-Z0-9]/g;
    }

    result.textContent = text.replace(regex, '');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('eliminar-caracteres-especiales');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'quitar-espacios-duplicados', 'generar-contrasenas']);
  }
})();
