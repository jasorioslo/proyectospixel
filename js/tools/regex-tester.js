/* ProyectosPixel - Probador de Expresiones Regulares (regex tester)
   Casos borde: regex inválida → error; sin flags → primera coincidencia; resaltado de matches; grupos */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var errorEl = document.getElementById('tool-error');
  var btnProcess = document.getElementById('btn-process');
  var btnClear = document.getElementById('btn-clear');
  var ctlPattern = document.getElementById('ctl-pattern');
  var flagBoxes = ['g', 'i', 'm', 's', 'u'];

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function currentFlags() {
    return flagBoxes.filter(function (f) {
      var el = document.getElementById('flag-' + f);
      return el && el.checked;
    }).join('');
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    var pattern = ctlPattern.value;
    if (!pattern) { showError('Escribe una expresión regular.'); return; }
    if (!text) { showError('Pega un texto de prueba.'); return; }

    var flags = currentFlags();
    var re;
    try {
      re = new RegExp(pattern, flags.indexOf('g') !== -1 ? flags : flags + 'g');
    } catch (e) {
      showError('Expresión regular inválida: ' + e.message);
      result.innerHTML = '';
      return;
    }
    hideError();

    var matches = [];
    var m;
    var guard = 0;
    while ((m = re.exec(text)) !== null && guard < 5000) {
      matches.push({ index: m.index, text: m[0], groups: m.slice(1) });
      if (m.index === re.lastIndex) re.lastIndex++; // evita bucle con matches vacíos
      guard++;
    }

    // Resaltado
    var html = '';
    var last = 0;
    matches.forEach(function (match) {
      html += escapeHtml(text.slice(last, match.index));
      html += '<mark>' + escapeHtml(match.text || '∅') + '</mark>';
      last = match.index + match.text.length;
    });
    html += escapeHtml(text.slice(last));

    var summary = '<div class="regex-legend" style="margin-bottom:8px;font-size:13px;color:var(--text-secondary)">' +
      '<strong>' + matches.length + '</strong> coincidencia' + (matches.length === 1 ? '' : 's') +
      ' · flags: <strong>' + (flags || '(ninguno)') + '</strong></div>';
    var groupsTable = '';
    if (matches.length && matches.some(function (x) { return x.groups.length; })) {
      groupsTable = '<div class="regex-groups"><strong>Grupos capturados</strong><table><thead><tr><th>#</th><th>Match</th><th>Grupos</th></tr></thead><tbody>';
      matches.slice(0, 50).forEach(function (x, i) {
        groupsTable += '<tr><td>' + (i + 1) + '</td><td>' + escapeHtml(x.text) + '</td><td>' +
          (x.groups.length ? x.groups.map(function (g) { return escapeHtml(g === undefined ? '(sin captura)' : g); }).join(' | ') : '—') + '</td></tr>';
      });
      groupsTable += '</tbody></table>' + (matches.length > 50 ? '<div style="margin-top:6px">Mostrando 50 de ' + matches.length + '</div>' : '') + '</div>';
    }

    result.innerHTML = summary + '<div class="regex-highlight" style="white-space:pre-wrap;word-break:break-word">' + html + '</div>' + groupsTable;
    var btnCopy = document.getElementById('btn-copy');
    if (btnCopy) btnCopy.disabled = matches.length === 0;
  });

  var btnCopy = document.getElementById('btn-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', function () {
      navigator.clipboard.writeText(result.textContent).then(function () {
        btnCopy.classList.add('copied');
        setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
      });
    });
  }

  btnClear.addEventListener('click', function () {
    input.value = '';
    ctlPattern.value = '';
    result.innerHTML = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('regex-tester');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['buscar-reemplazar-texto', 'comparar-textos', 'formatear-json']);
  }
})();
