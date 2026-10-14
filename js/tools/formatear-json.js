/* ProyectosPixel - Formatear y Validar JSON (100% local)
   Casos borde: JSON inválido → error con posición; minificar; ordenar claves opcional */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlIndent = document.getElementById('ctl-indent');
  var ctlSort = document.getElementById('ctl-sort');

  function sortKeys(value) {
    if (Array.isArray(value)) return value.map(sortKeys);
    if (value && typeof value === 'object') {
      var out = {};
      Object.keys(value).sort().forEach(function (k) { out[k] = sortKeys(value[k]); });
      return out;
    }
    return value;
  }

  function positionFromError(text, msg) {
    var m = msg.match(/position\s+(\d+)/i);
    if (!m) return '';
    var pos = parseInt(m[1], 10);
    var before = text.slice(0, pos);
    var line = before.split('\n').length;
    var col = pos - before.lastIndexOf('\n');
    return ' (línea ' + line + ', columna ' + col + ')';
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Pega un JSON primero.'); return; }
    var parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      showError('JSON inválido: ' + e.message + positionFromError(text, e.message));
      result.textContent = '';
      btnCopy.disabled = true;
      return;
    }
    hideError();
    if (ctlSort.checked) parsed = sortKeys(parsed);
    var indent = ctlIndent.value === 'tab' ? '\t' : parseInt(ctlIndent.value, 10);
    var output = JSON.stringify(parsed, null, indent);
    result.textContent = output;
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

  // Validación en vivo (aviso temprano)
  input.addEventListener('input', function () {
    var t = input.value.trim();
    if (!t) { hideError(); return; }
    try { JSON.parse(t); hideError(); }
    catch (e) { showError('⚠ ' + e.message + positionFromError(t, e.message)); }
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('formatear-json');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['minificar-codigo', 'comparar-textos', 'limpiar-lista-urls']);
  }
})();
