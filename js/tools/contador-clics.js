/* ProyectosPixel - Contador de Clics (Tally)
   Casos borde: atajos de teclado (+ / - / R y flechas) ignorados si se edita el ajuste manual;
   display actualizado en toLocaleString; reset vuelve a 0 */
(function () {
  'use strict';

  var display = document.getElementById('tally-display');
  var btnPlus = document.getElementById('btn-plus');
  var btnMinus = document.getElementById('btn-minus');
  var btnReset = document.getElementById('btn-reset');
  var ctlValue = document.getElementById('ctl-value');
  var count = 0;

  function render() {
    display.textContent = count.toLocaleString('es');
    ctlValue.value = count;
  }

  btnPlus.addEventListener('click', function () { count++; render(); });
  btnMinus.addEventListener('click', function () { count--; render(); });
  btnReset.addEventListener('click', function () { count = 0; render(); });

  ctlValue.addEventListener('input', function () {
    var v = parseInt(ctlValue.value, 10);
    if (!isNaN(v)) { count = v; display.textContent = count.toLocaleString('es'); }
  });

  document.addEventListener('keydown', function (e) {
    if (document.activeElement === ctlValue) return; // no interferir al escribir
    if (e.key === '+' || e.key === 'ArrowUp') { count++; render(); }
    else if (e.key === '-' || e.key === 'ArrowDown') { count--; render(); }
    else if (e.key === 'r' || e.key === 'R') { count = 0; render(); }
  });

  render();

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('contador-clics');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-lista-numeros', 'contar-palabras-caracteres', 'numerar-lineas-texto']);
  }
})();
