(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnAnalyze = document.getElementById('btn-analyze');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  btnAnalyze.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();

    var words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    var freq = {};
    words.forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });

    var sorted = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; });
    var maxCount = freq[sorted[0]] || 1;

    var html = '<table class="freq-table"><thead><tr><th>Palabra</th><th>Frecuencia</th><th></th></tr></thead><tbody>';
    sorted.forEach(function (w) {
      var pct = (freq[w] / maxCount) * 100;
      html += '<tr><td>' + w + '</td><td>' + freq[w] + '</td><td style="width:40%"><div class="freq-bar" style="width:' + pct + '%"></div></td></tr>';
    });
    html += '</tbody></table>';
    result.innerHTML = html;
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    var text = result.innerText || result.textContent;
    navigator.clipboard.writeText(text).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.innerHTML = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('frecuencia-palabras');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['contar-palabras-caracteres', 'buscar-reemplazar-texto', 'quitar-acentos']);
  }
})();
