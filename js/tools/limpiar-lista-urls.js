/* ProyectosPixel - Limpiar Lista de URLs (Solo Dominio)
   Casos borde: URLs sin protocolo (www.x.com) y con ruta; inválidas → conservadas en
   '(no válida)'; dedup case-insensitive sobre dominio */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlDedup = document.getElementById('ctl-dedup');

  function parseUrl(raw) {
    var url = raw.trim();
    if (!url) return null;
    if (!/^https?:\/\//i.test(url)) url = 'http://' + url;
    try {
      var u = new URL(url);
      var host = u.hostname.toLowerCase().replace(/^www\./, '');
      if (!host || host.indexOf('.') === -1) return null;
      return {
        domain: host,
        www: 'www.' + host,
        root: 'https://' + host + '/'
      };
    } catch (e) {
      return null;
    }
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Pega tu lista de URLs primero.'); return; }
    hideError();

    var mode = ctlMode.value;
    var seen = {};
    var out = [];

    text.split(/\r?\n/).forEach(function (line) {
      var parsed = parseUrl(line);
      if (!parsed) return;
      var value = parsed[mode];
      if (ctlDedup.checked) {
        var key = parsed.domain;
        if (seen[key]) return;
        seen[key] = true;
      }
      out.push(value);
    });

    if (out.length === 0) { showError('Ninguna URL de la lista es válida. Revisa el formato.'); return; }

    result.textContent = out.join('\n');
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('limpiar-lista-urls');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['eliminar-lineas-duplicadas', 'filtrar-lineas-texto', 'quitar-acentos']);
  }
})();
