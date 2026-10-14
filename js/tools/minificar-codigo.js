/* ProyectosPixel - Minificar HTML, CSS y JS (client-side, conservador)
   Casos borde: no toca cadenas de texto en JS básico; avisa que JS minificado es básico */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlType = document.getElementById('ctl-type');
  var noteEl = document.getElementById('minify-note');

  function minifyHTML(s) {
    return s
      .replace(/<!--[\s\S]*?-->/g, '')          // comentarios
      .replace(/>\s+</g, '><')                   // espacios entre tags
      .replace(/\s{2,}/g, ' ')                   // espacios múltiples
      .replace(/\n/g, '')
      .trim();
  }

  function minifyCSS(s) {
    return s
      .replace(/\/\*[\s\S]*?\*\//g, '')          // comentarios
      .replace(/\s*([{}:;,>])\s*/g, '$1')        // espacios alrededor de símbolos
      .replace(/;}/g, '}')                       // último ; antes de }
      .replace(/\s{2,}/g, ' ')
      .replace(/\n/g, '')
      .trim();
  }

  function minifyJS(s) {
    // Conservador: fuera comentarios y espacios sobrantes (no renombra variables)
    return s
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
      .split('\n').map(function (l) { return l.trim(); }).join('\n')
      .replace(/\n{2,}/g, '\n')
      .replace(/^\s+/gm, '')
      .trim();
  }

  function updateNote() {
    if (!noteEl) return;
    if (ctlType.value === 'js') {
      noteEl.textContent = 'ℹ Minificación básica de JS (quita comentarios y espacios). No renombra variables ni usa herramientas avanzadas — prueba siempre el resultado.';
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }
  }
  ctlType.addEventListener('change', updateNote);
  updateNote();

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Pega tu código primero.'); return; }
    hideError();
    var type = ctlType.value;
    var out = type === 'html' ? minifyHTML(text) : type === 'css' ? minifyCSS(text) : minifyJS(text);
    result.textContent = out;
    btnCopy.disabled = false;
    var saved = text.length > 0 ? Math.round((1 - out.length / text.length) * 100) : 0;
    noteEl.textContent = (type === 'js' ? 'ℹ Minificación básica de JS. ' : '') +
      'Original: ' + text.length.toLocaleString('es') + ' → Minificado: ' + out.length.toLocaleString('es') + ' caracteres (' +
      (saved > 0 ? '-' + saved + '%' : 'sin ahorro') + ').';
    noteEl.style.display = 'block';
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('minificar-codigo');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['formatear-json', 'comparar-textos', 'limpiar-lista-urls']);
  }
})();
