/* ProyectosPixel - Convertidor de Bases Numéricas (binario, octal, decimal, hexadecimal) */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var errorEl = document.getElementById('tool-error');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlFrom = document.getElementById('ctl-from');

  var BASES = { '2': 'Binario', '8': 'Octal', '10': 'Decimal', '16': 'Hexadecimal' };

  function parseInBase(str, base) {
    var clean = str.trim().replace(/^0[bxo]/i, '').replace(/\s+/g, '').toUpperCase();
    var valid = base === 2 ? /^[01]+$/ : base === 8 ? /^[0-7]+$/ : base === 10 ? /^\d+$/ : /^[0-9A-F]+$/;
    if (!valid.test(clean)) return null;
    return parseInt(clean, base);
  }

  btnProcess.addEventListener('click', function () {
    var raw = input.value;
    if (!raw.trim()) { errorEl.textContent = 'Escribe un número primero.'; errorEl.classList.add('visible'); return; }
    var base = parseInt(ctlFrom.value, 10);
    var value = parseInBase(raw, base);
    if (value === null || isNaN(value)) {
      errorEl.textContent = 'Número inválido para base ' + base + ' (' + BASES[base] + '). Revisa los dígitos permitidos.';
      errorEl.classList.add('visible');
      return;
    }
    errorEl.classList.remove('visible');
    result.textContent =
      'Binario (base 2):       ' + value.toString(2) + '\n' +
      'Octal (base 8):         ' + value.toString(8) + '\n' +
      'Decimal (base 10):      ' + value.toString(10) + '\n' +
      'Hexadecimal (base 16):  ' + value.toString(16).toUpperCase() + '\n' +
      '──────────────\n' +
      'Bits necesarios: ' + value.toString(2).length + ' · Bytes: ' + Math.ceil(value.toString(2).length / 8);
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('convertidor-bases');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['texto-a-binario', 'conversor-unidades', 'generador-hashes']);
  }
})();
