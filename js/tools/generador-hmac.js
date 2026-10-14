/* ProyectosPixel - Generador de HMAC (SHA-256/384/512, WebCrypto, 100% local) */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlAlgo = document.getElementById('ctl-algo');
  var ctlKey = document.getElementById('ctl-key');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    var key = ctlKey.value;
    if (!key) { showError('Escribe la clave secreta (key) del HMAC.'); return; }
    hideError();
    ProyectosPixel.hashers.hmacHex(ctlAlgo.value, key, text).then(function (hex) {
      result.textContent = 'HMAC-' + ctlAlgo.value.toUpperCase() + '\n' + hex;
      btnCopy.disabled = false;
    }).catch(function (e) {
      showError('No se pudo calcular el HMAC: ' + e.message + ' (WebCrypto requiere HTTPS o localhost).');
    });
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = ''; result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-hmac');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generador-hashes', 'cifrar-texto-aes', 'codificar-decodificar-base64']);
  }
})();
