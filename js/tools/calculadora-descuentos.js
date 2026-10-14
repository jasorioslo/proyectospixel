/* ProyectosPixel - Calculadora de Descuentos e IVA */
(function () {
  'use strict';

  var errorEl = document.getElementById('tool-error');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlPrice = document.getElementById('ctl-price');
  var ctlDiscount = document.getElementById('ctl-discount');
  var ctlIva = document.getElementById('ctl-iva');
  var ctlIvaMode = document.getElementById('ctl-iva-mode');

  function fmt(n) {
    return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  }

  btnProcess.addEventListener('click', function () {
    var price = parseFloat(ctlPrice.value);
    var discount = parseFloat(ctlDiscount.value) || 0;
    var iva = parseFloat(ctlIva.value) || 0;
    if (isNaN(price) || price < 0) { errorEl.textContent = 'Introduce un precio válido.'; errorEl.classList.add('visible'); return; }
    if (discount < 0 || discount > 100) { errorEl.textContent = 'El descuento debe estar entre 0 y 100%.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');

    var base = price * (1 - discount / 100);
    var saved = price - base;
    var ivaAmount = base * iva / 100;
    var final_ = ctlIvaMode.value === 'add' ? base + ivaAmount : base;

    var out = 'Precio original: ' + fmt(price) + '\n' +
      'Descuento (' + discount + '%): -' + fmt(saved) + '\n' +
      'Precio con descuento: ' + fmt(base) + '\n' +
      'IVA (' + iva + '%): ' + (ctlIvaMode.value === 'add' ? '+' + fmt(ivaAmount) : 'no incluido en el total') + '\n' +
      '──────────────\n' +
      'PRECIO FINAL: ' + fmt(final_);
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
    ctlPrice.value = ''; ctlDiscount.value = '0'; ctlIva.value = '21'; result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('calculadora-descuentos');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['calculadora-porcentajes', 'regla-de-tres', 'generar-lista-numeros']);
  }
})();
