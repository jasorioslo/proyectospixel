/* ProyectosPixel - Calculadora de Porcentajes (3 operaciones + variación %) */
(function () {
  'use strict';

  var errorEl = document.getElementById('tool-error');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlOp = document.getElementById('ctl-op');
  var ctlA = document.getElementById('ctl-a');
  var ctlB = document.getElementById('ctl-b');
  var labelA = document.getElementById('label-a');
  var labelB = document.getElementById('label-b');

  var OPS = {
    'pct-de': { a: 'Porcentaje (%)', b: 'Del número', out: function (a, b) { return a + '% de ' + b + ' = ' + fmt(a * b / 100); } },
    'que-pct': { a: 'Número (parte)', b: 'Total', out: function (a, b) { return b === 0 ? 'No se puede dividir entre 0' : a + ' es el ' + fmt(a / b * 100) + '% de ' + b; } },
    'variacion': { a: 'Valor inicial', b: 'Valor final', out: function (a, b) { return a === 0 ? 'El valor inicial no puede ser 0' : 'Variación: ' + fmt((b - a) / Math.abs(a) * 100) + '% (' + (b >= a ? 'aumento' : 'reducción') + ')'; } },
    'aumento': { a: 'Número', b: 'Aumentar (%)', out: function (a, b) { return a + ' + ' + b + '% = ' + fmt(a * (1 + b / 100)); } },
    'descuento': { a: 'Precio', b: 'Descuento (%)', out: function (a, b) { return 'Con ' + b + '% de descuento: ' + fmt(a * (1 - b / 100)) + ' (ahorras ' + fmt(a * b / 100) + ')'; } },
    'es-pct-de': { a: 'Porcentaje (%)', b: 'Número', out: function (a, b) { return a + '% de ' + b + ' = ' + fmt(a * b / 100); } }
  };

  function fmt(n) {
    if (!isFinite(n)) return '—';
    return (Math.round(n * 100) / 100).toLocaleString('es-ES', { maximumFractionDigits: 2 });
  }

  function updateLabels() {
    var o = OPS[ctlOp.value];
    labelA.textContent = o.a;
    labelB.textContent = o.b;
  }
  ctlOp.addEventListener('change', updateLabels);
  updateLabels();

  btnProcess.addEventListener('click', function () {
    var a = parseFloat(ctlA.value);
    var b = parseFloat(ctlB.value);
    if (isNaN(a) || isNaN(b)) { errorEl.textContent = 'Rellena los dos valores numéricos.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');
    result.textContent = OPS[ctlOp.value].out(a, b);
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    ctlA.value = ''; ctlB.value = ''; result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('calculadora-porcentajes');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['calculadora-descuentos', 'regla-de-tres', 'estadistica-basica']);
  }
})();
