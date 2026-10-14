/* ProyectosPixel - Regla de Tres y Proporciones */
(function () {
  'use strict';

  var errorEl = document.getElementById('tool-error');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlA = document.getElementById('ctl-a');
  var ctlB = document.getElementById('ctl-b');
  var ctlC = document.getElementById('ctl-c');
  var ctlType = document.getElementById('ctl-type');

  function fmt(n) {
    if (!isFinite(n)) return '—';
    return (Math.round(n * 1e6) / 1e6).toLocaleString('es-ES', { maximumFractionDigits: 6 });
  }

  btnProcess.addEventListener('click', function () {
    var a = parseFloat(ctlA.value), b = parseFloat(ctlB.value), c = parseFloat(ctlC.value);
    if ([a, b, c].some(function (v) { return isNaN(v); })) {
      errorEl.textContent = 'Rellena los tres valores (A, B y C).';
      errorEl.classList.add('visible');
      return;
    }
    errorEl.classList.remove('visible');

    if (ctlType.value === 'directa') {
      // A → B, C → X   ⇒  X = B * C / A
      if (a === 0) { errorEl.textContent = 'A no puede ser 0 en una proporción directa.'; errorEl.classList.add('visible'); return; }
      var x = b * c / a;
      result.textContent = 'Proporción directa:\n' + fmt(a) + ' → ' + fmt(b) + '\n' + fmt(c) + ' → ' + fmt(x) + '\n\nX = ' + fmt(x);
    } else {
      // A → B, C → X   ⇒  X = B * A / C  (inversa)
      if (c === 0) { errorEl.textContent = 'El tercer valor no puede ser 0 en una proporción inversa.'; errorEl.classList.add('visible'); return; }
      var xi = b * a / c;
      result.textContent = 'Proporción inversa:\n' + fmt(a) + ' → ' + fmt(b) + '\n' + fmt(c) + ' → ' + fmt(xi) + '\n\nX = ' + fmt(xi);
    }
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    ctlA.value = ''; ctlB.value = ''; ctlC.value = ''; result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('regla-de-tres');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['calculadora-porcentajes', 'calculadora-descuentos', 'estadistica-basica']);
  }
})();
