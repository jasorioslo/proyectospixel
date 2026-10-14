/* ProyectosPixel - Comparar Hashes (¿este hash corresponde a este texto?)
   Casos borde: longitud no estándar → intenta detectar o pide algoritmo; comparación case-insensitive */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var errorEl = document.getElementById('tool-error');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlHash = document.getElementById('ctl-hash');
  var ctlAlgo = document.getElementById('ctl-algo');

  var LEN = { 32: 'md5', 40: 'sha1', 64: 'sha256', 96: 'sha384', 128: 'sha512' };

  btnProcess.addEventListener('click', function () {
    var expected = ctlHash.value.trim().toLowerCase();
    if (!expected) { showError('Pega el hash a comprobar.'); return; }
    var algo = ctlAlgo.value;
    if (algo === 'auto') {
      algo = LEN[expected.length];
      if (!algo) { showError('No se pudo detectar el algoritmo por la longitud (' + expected.length + ' caracteres). Elige uno manualmente.'); return; }
    }
    hideError();

    var compute = algo === 'md5'
      ? Promise.resolve(ProyectosPixel.hashers.md5(input.value))
      : ProyectosPixel.hashers.shaHex(algo, input.value);

    compute.then(function (actual) {
      var match = actual === expected;
      result.textContent = (match ? '✅ COINCIDE' : '❌ NO COINCIDE') +
        '\n\nAlgoritmo: ' + algo.toUpperCase() +
        '\nEsperado:  ' + expected +
        '\nCalculado: ' + actual;
      btnCopy.disabled = false;
      result.style.color = match ? '' : '';
    }).catch(function (e) { showError('Error al calcular: ' + e.message); });
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; ctlHash.value = ''; result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('comparar-hashes');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generador-hashes', 'generador-hmac', 'verificador-contrasenas']);
  }
})();
