/* ProyectosPixel - Estadística Básica de una lista de números */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var errorEl = document.getElementById('tool-error');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');

  function fmt(n) {
    if (!isFinite(n)) return '—';
    return (Math.round(n * 10000) / 10000).toLocaleString('es-ES', { maximumFractionDigits: 4 });
  }

  function parseNumbers(text) {
    return text.split(/[\s,;]+/).map(function (t) { return parseFloat(t.replace(',', '.')); }).filter(function (n) { return !isNaN(n); });
  }

  btnProcess.addEventListener('click', function () {
    var nums = parseNumbers(input.value);
    if (nums.length === 0) { errorEl.textContent = 'Introduce números separados por espacios, comas o líneas.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');

    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var n = nums.length;
    var sum = nums.reduce(function (a, b) { return a + b; }, 0);
    var mean = sum / n;
    var median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

    var freq = {};
    nums.forEach(function (x) { freq[x] = (freq[x] || 0) + 1; });
    var maxFreq = Math.max.apply(null, Object.keys(freq).map(function (k) { return freq[k]; }));
    var modes = Object.keys(freq).filter(function (k) { return freq[k] === maxFreq; }).map(Number);
    var moda = maxFreq === 1 ? 'No hay moda (todos únicos)' : modes.join(', ');

    var varP = nums.reduce(function (a, x) { return a + Math.pow(x - mean, 2); }, 0) / n;
    var varM = n > 1 ? nums.reduce(function (a, x) { return a + Math.pow(x - mean, 2); }, 0) / (n - 1) : 0;

    var q = function (p) {
      var idx = (n - 1) * p;
      var lo = Math.floor(idx), hi = Math.ceil(idx);
      if (lo === hi) return sorted[lo];
      return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
    };

    var out = [
      'Cantidad (n): ' + n,
      'Suma: ' + fmt(sum),
      'Media (promedio): ' + fmt(mean),
      'Mediana: ' + fmt(median),
      'Moda: ' + moda,
      'Mínimo: ' + fmt(sorted[0]) + ' · Máximo: ' + fmt(sorted[n - 1]),
      'Rango: ' + fmt(sorted[n - 1] - sorted[0]),
      'Cuartiles: Q1 = ' + fmt(q(0.25)) + ' · Q2 = ' + fmt(q(0.5)) + ' · Q3 = ' + fmt(q(0.75)),
      'Varianza (poblacional): ' + fmt(varP),
      'Varianza (muestral): ' + fmt(varM),
      'Desviación estándar (poblacional): ' + fmt(Math.sqrt(varP)),
      'Desviación estándar (muestral): ' + fmt(Math.sqrt(varM))
    ].join('\n');

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
    input.value = ''; result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('estadistica-basica');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['calculadora-porcentajes', 'frecuencia-palabras', 'generar-lista-numeros']);
  }
})();
