/* ProyectosPixel - Convertir Markdown a HTML (parser propio, sin dependencias)
   Soporta: títulos, negrita, cursiva, código inline y en bloque, enlaces, imágenes,
   listas, citas, separadores y párrafos. Escapa HTML de entrada por defecto (seguro). */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var previewEl = document.getElementById('md-preview');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlEscape = document.getElementById('ctl-escape');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function inline(md) {
    var s = md;
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    s = s.replace(/(^|[^_])_([^_]+)_/g, '$1<em>$2</em>');
    return s;
  }

  function mdToHtml(md, escapeInput) {
    function E(s) { return escapeInput ? escapeHtml(s) : s; }
    var lines = md.split(/\r?\n/);
    var html = [];
    var i = 0;
    var inCode = false;
    var codeBuf = [];
    var listType = null;
    var para = [];

    function flushPara() {
      if (para.length) { html.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; }
    }
    function closeList() {
      if (listType) { html.push('</' + listType + '>'); listType = null; }
    }

    while (i < lines.length) {
      var line = lines[i];

      if (/^```/.test(line)) {
        if (!inCode) { flushPara(); closeList(); inCode = true; codeBuf = []; }
        else { inCode = false; html.push('<pre><code>' + codeBuf.join('\n') + '</code></pre>'); }
        i++; continue;
      }
      if (inCode) { codeBuf.push(E(line)); i++; continue; }

      if (/^\s*$/.test(line)) { flushPara(); closeList(); i++; continue; }

      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { flushPara(); closeList(); html.push('<h' + h[1].length + '>' + inline(E(h[2])) + '</h' + h[1].length + '>'); i++; continue; }

      if (/^\s*([-*_])\s*\1\s*\1[\s\S]*$/.test(line)) { flushPara(); closeList(); html.push('<hr>'); i++; continue; }

      var q = line.match(/^>\s?(.*)$/);
      if (q) { flushPara(); closeList(); html.push('<blockquote>' + inline(E(q[1])) + '</blockquote>'); i++; continue; }

      var ul = line.match(/^\s*[-*+]\s+(.*)$/);
      var ol = line.match(/^\s*\d+\.\s+(.*)$/);
      if (ul || ol) {
        flushPara();
        var want = ul ? 'ul' : 'ol';
        if (listType !== want) { closeList(); html.push('<' + want + '>'); listType = want; }
        html.push('<li>' + inline(E((ul || ol)[1])) + '</li>');
        i++; continue;
      }

      closeList();
      para.push(E(line.trim()));
      i++;
    }

    if (inCode && codeBuf.length) html.push('<pre><code>' + codeBuf.join('\n') + '</code></pre>');
    flushPara();
    closeList();
    return html.join('\n');
  }

  btnProcess.addEventListener('click', function () {
    var md = input.value;
    if (!md.trim()) { showError('Escribe o pega tu Markdown primero.'); return; }
    hideError();
    var html = mdToHtml(md, ctlEscape.checked);
    result.textContent = html;
    previewEl.innerHTML = html;
    previewEl.style.display = 'block';
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.textContent = ''; previewEl.innerHTML = ''; previewEl.style.display = 'none'; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('markdown-a-html');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['minificar-codigo', 'json-a-csv', 'justificar-texto']);
  }
})();
