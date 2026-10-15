/* ProyectosPixel - Generador de Hashes (SHA-1/256/384/512 + MD5)
   Usa el módulo compartido js/tools/hash-utils.js (ProyectosPixel.hashers)
   Casos borde: WebCrypto requiere contexto seguro (localhost/https); MD5 es JS puro */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var algos = ['sha1', 'sha256', 'sha384', 'sha512', 'md5'];
  var ctlUpper = document.getElementById('ctl-upper');

  function selected() {
    return algos.filter(function (a) { return document.getElementById('algo-' + a).checked; });
  }

  function run() {
    var text = input.value;
    if (!text) { showError('Escribe o pega el texto a hashear.'); return; }
    var sel = selected();
    if (!sel.length) { showError('Marca al menos un algoritmo.'); return; }
    hideError();

    var hashers = ProyectosPixel.hashers;
    var jobs = sel.map(function (a) {
      if (a === 'md5') return Promise.resolve(['MD5', hashers.md5(text)]);
      var name = a.toUpperCase().replace('SHA', 'SHA-');
      return hashers.shaHex(a, text).then(function (hex) { return [name, hex]; });
    });

    Promise.all(jobs).then(function (results) {
      var upper = ctlUpper.checked;
      result.textContent = results.map(function (r) {
        var h = upper ? r[1].toUpperCase() : r[1];
        return r[0] + '\n' + h;
      }).join('\n\n');
      btnCopy.disabled = false;
    }).catch(function (e) {
      showError('Error al calcular el hash: ' + e.message + (String(e.message).indexOf('subtle') !== -1 ? ' (WebCrypto requiere HTTPS o localhost).' : ''));
    });
  }
  btnProcess.addEventListener('click', run);

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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-hashes');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['verificador-contrasenas', 'generar-contrasenas', 'codificar-decodificar-base64']);
  }
})();
