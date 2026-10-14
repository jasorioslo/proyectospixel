/* ProyectosPixel - Convertir JSON <> CSV (bidireccional, 100% local)
   Casos borde: JSON no-array, claves irregulares (unión), comillas/comas en valores (CSV quoting),
   CSV con campos entre comillas y saltos, delimitador configurable, límite de filas */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlDir = document.getElementById('ctl-direction');
  var ctlDelim = document.getElementById('ctl-delim');
  var ctlHeader = document.getElementById('ctl-header');

  var MAX_ROWS = 10000;
  function sep() { return ctlDelim.value === 'tab' ? '\t' : ctlDelim.value; }

  function csvEscape(value, d) {
    var s = value === null || value === undefined ? '' : String(value);
    if (s.indexOf('"') !== -1 || s.indexOf(d) !== -1 || /[\n\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function jsonToCsv(data) {
    if (!Array.isArray(data)) {
      if (typeof data === 'object' && data !== null) data = [data];
      else throw new Error('El JSON debe ser un array de objetos (o un objeto).');
    }
    if (data.length === 0) throw new Error('El array JSON está vacío.');
    if (data.length > MAX_ROWS) throw new Error('Máximo ' + MAX_ROWS.toLocaleString('es') + ' filas.');
    var keys = [];
    data.forEach(function (row) {
      if (row && typeof row === 'object' && !Array.isArray(row)) {
        Object.keys(row).forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); });
      }
    });
    if (keys.length === 0) throw new Error('No se encontraron claves en los objetos JSON.');
    var d = sep();
    var lines = [];
    if (ctlHeader.checked) lines.push(keys.map(function (k) { return csvEscape(k, d); }).join(d));
    data.forEach(function (row) {
      lines.push(keys.map(function (k) { return csvEscape(row ? row[k] : '', d); }).join(d));
    });
    return lines.join('\n');
  }

  function parseCsvLine(line, d) {
    var out = [], cur = '', inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; }
          else inQuotes = false;
        } else cur += ch;
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === d) { out.push(cur); cur = ''; }
        else cur += ch;
      }
    }
    out.push(cur);
    return out;
  }

  function csvToJson(text) {
    var d = sep();
    var rows = [];
    var lines = text.split(/\r?\n/).filter(function (l) { return l.length > 0; });
    if (lines.length > MAX_ROWS) throw new Error('Máximo ' + MAX_ROWS.toLocaleString('es') + ' filas.');
    lines.forEach(function (l) { rows.push(parseCsvLine(l, d)); });
    if (rows.length === 0) throw new Error('No hay filas en el CSV.');
    var header = rows[0];
    var data = [];
    for (var i = 1; i < rows.length; i++) {
      var obj = {};
      header.forEach(function (key, idx) { obj[key] = rows[i][idx] !== undefined ? rows[i][idx] : ''; });
      data.push(obj);
    }
    return JSON.stringify(data, null, 2);
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Pega tu JSON o CSV primero.'); return; }
    try {
      if (ctlDir.value === 'json2csv') {
        var data = JSON.parse(text);
        result.textContent = jsonToCsv(data);
      } else {
        result.textContent = csvToJson(text);
      }
      hideError();
      btnCopy.disabled = false;
    } catch (e) {
      showError((ctlDir.value === 'json2csv' ? 'JSON inválido: ' : 'CSV inválido: ') + e.message);
      result.textContent = '';
      btnCopy.disabled = true;
    }
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('json-a-csv');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['formatear-json', 'markdown-a-html', 'extraer-columnas-texto']);
  }
})();
