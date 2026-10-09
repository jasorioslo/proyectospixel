/* ProyectosPixel - Añadir Saltos de Línea al Texto
   Casos borde: no corta palabras (modo caracteres avanza hasta el último espacio);
   una palabra más larga que N se deja entera en su línea; N >= 1 */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlN = document.getElementById('ctl-n');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega tu texto primero.'); return; }
    var n = parseInt(ctlN.value, 10);
    if (!n || n < 1) { showError('Define un valor N igual o mayor que 1.'); return; }
    hideError();

    var out;
    if (ctlMode.value === 'words') {
      var words = text.split(/\s+/).filter(Boolean);
      var lines = [];
      for (var i = 0; i < words.length; i += n) lines.push(words.slice(i, i + n).join(' '));
      out = lines.join('\n');
    } else {
      // Cada N caracteres sin cortar palabras
      var chunks = [];
      var current = '';
      text.split(/\s+/).filter(Boolean).forEach(function (word) {
        if (current === '') { current = word; }
        else if ((current + ' ' + word).length <= n) { current += ' ' + word; }
        else { chunks.push(current); current = word.length > n ? word : word; }
        while (current.length > n) {
          // Palabra gigante: se corta a la fuerza para no perder contenido
          chunks.push(current.slice(0, n));
          current = current.slice(n);
        }
      });
      if (current) chunks.push(current);
      out = chunks.join('\n');
    }

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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('anadir-saltos-de-linea');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-saltos-de-linea', 'numerar-lineas-texto', 'justificar-texto']);
  }
})();
