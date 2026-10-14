/* ProyectosPixel - Comparar Textos (diff línea a línea, algoritmo LCS)
   Casos borde: textos idénticos → aviso; muestra +/- y estadísticas */
(function () {
  'use strict';

  var inputA = document.getElementById('tool-input');
  var inputB = document.getElementById('tool-input-b');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var statsEl = document.getElementById('diff-stats');

  function lcsMatrix(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) { dp.push(new Array(n + 1).fill(0)); }
    for (var i2 = 1; i2 <= m; i2++) {
      for (var j = 1; j <= n; j++) {
        dp[i2][j] = a[i2 - 1] === b[j - 1] ? dp[i2 - 1][j - 1] + 1 : Math.max(dp[i2 - 1][j], dp[i2][j - 1]);
      }
    }
    return dp;
  }

  function diffLines(a, b) {
    var dp = lcsMatrix(a, b);
    var out = [];
    var i = a.length, j = b.length;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) { out.unshift(['=', a[i - 1]]); i--; j--; }
      else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { out.unshift(['+', b[j - 1]]); j--; }
      else { out.unshift(['-', a[i - 1]]); i--; }
    }
    return out;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  btnProcess.addEventListener('click', function () {
    var a = inputA.value.split(/\r?\n/);
    var b = inputB.value.split(/\r?\n/);
    if (!inputA.value.trim() && !inputB.value.trim()) { showError('Pega al menos un texto para comparar.'); return; }
    hideError();

    var ops = diffLines(a, b);
    var adds = 0, dels = 0, same = 0;
    var html = '';
    ops.forEach(function (op) {
      if (op[0] === '+') adds++;
      else if (op[0] === '-') dels++;
      else same++;
      var cls = op[0] === '+' ? 'diff-add' : op[0] === '-' ? 'diff-del' : 'diff-same';
      var prefix = op[0] === '+' ? '+ ' : op[0] === '-' ? '- ' : '  ';
      html += '<div class="diff-line ' + cls + '">' + escapeHtml(prefix + op[1]) + '</div>';
    });

    result.innerHTML = '<div class="diff-view">' + html + '</div>';
    statsEl.innerHTML = 'Líneas: <span class="add">+' + adds + '</span> añadidas · <span class="del">-' + dels +
      '</span> eliminadas · ' + same + ' iguales' + (adds === 0 && dels === 0 ? ' — <strong>los textos son idénticos</strong>' : '');
    statsEl.style.display = 'block';
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    inputA.value = '';
    inputB.value = '';
    result.innerHTML = '';
    statsEl.style.display = 'none';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('comparar-textos');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['fusionar-texto-lineas', 'buscar-reemplazar-texto', 'formatear-json']);
  }
})();
