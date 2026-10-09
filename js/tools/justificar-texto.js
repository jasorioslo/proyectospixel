(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnJustify = document.getElementById('btn-justify');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function justifyText(text, width) {
    var words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return '';

    var lines = [];
    var currentLine = [];
    var currentLength = 0;

    words.forEach(function (word) {
      if (currentLength + word.length + currentLine.length > width && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [];
        currentLength = 0;
      }
      currentLine.push(word);
      currentLength += word.length;
    });
    if (currentLine.length > 0) lines.push(currentLine);

    var justified = lines.map(function (line, idx) {
      if (line.length === 1 || idx === lines.length - 1) return line.join(' ');
      var totalSpaces = width - line.reduce(function (sum, w) { return sum + w.length; }, 0);
      var gaps = line.length - 1;
      var baseSpaces = Math.floor(totalSpaces / gaps);
      var extraSpaces = totalSpaces % gaps;
      var justifiedLine = '';
      line.forEach(function (word, i) {
        justifiedLine += word;
        if (i < gaps) {
          justifiedLine += ' '.repeat(baseSpaces + (i < extraSpaces ? 1 : 0));
        }
      });
      return justifiedLine;
    });

    return justified.join('\n');
  }

  btnJustify.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    var width = parseInt(document.getElementById('line-width').value);
    result.textContent = justifyText(text, width);
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('justificar-texto');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-saltos-de-linea', 'buscar-reemplazar-texto', 'contar-palabras-caracteres']);
  }
})();
