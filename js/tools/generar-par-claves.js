/* ProyectosPixel - Generador de Par de Claves (RSA-2048 / ECDSA P-256) en formato PEM
   WebCrypto exporta SPKI (pública) y PKCS#8 (privada). La clave privada NUNCA sale del navegador. */
(function () {
  'use strict';

  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlType = document.getElementById('ctl-type');
  var statusEl = document.getElementById('key-status');

  function toPem(buf, label) {
    var bytes = new Uint8Array(buf);
    var b64 = '';
    for (var i = 0; i < bytes.length; i++) b64 += String.fromCharCode(bytes[i]);
    b64 = btoa(b64);
    var lines = b64.match(/.{1,64}/g).join('\n');
    return '-----BEGIN ' + label + '-----\n' + lines + '\n-----END ' + label + '-----';
  }

  btnProcess.addEventListener('click', function () {
    hideError();
    var type = ctlType.value;
    if (statusEl) { statusEl.textContent = 'Generando claves… (puede tardar 1-2 segundos)'; statusEl.style.display = 'block'; }

    var promise;
    if (type === 'rsa') {
      promise = crypto.subtle.generateKey(
        { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
        true,
        ['encrypt', 'decrypt']
      ).then(function (pair) {
        return Promise.all([
          crypto.subtle.exportKey('spki', pair.publicKey),
          crypto.subtle.exportKey('pkcs8', pair.privateKey)
        ]);
      }).then(function (keys) {
        return { pub: toPem(keys[0], 'PUBLIC KEY'), priv: toPem(keys[1], 'PRIVATE KEY'), info: 'RSA-2048 (RSA-OAEP, SHA-256) — para cifrado' };
      });
    } else {
      promise = crypto.subtle.generateKey(
        { name: 'ECDSA', namedCurve: 'P-256' },
        true,
        ['sign', 'verify']
      ).then(function (pair) {
        return Promise.all([
          crypto.subtle.exportKey('spki', pair.publicKey),
          crypto.subtle.exportKey('pkcs8', pair.privateKey)
        ]);
      }).then(function (keys) {
        return { pub: toPem(keys[0], 'PUBLIC KEY'), priv: toPem(keys[1], 'PRIVATE KEY'), info: 'ECDSA P-256 (curva prime256v1) — para firmas' };
      });
    }

    promise.then(function (out) {
      result.textContent = '=== CLAVE PÚBLICA (' + out.info + ') ===\n' + out.pub +
        '\n\n=== CLAVE PRIVADA (¡guárdala con cuidado!) ===\n' + out.priv;
      if (statusEl) statusEl.textContent = '✅ Par de claves generado. La clave privada nunca se ha enviado a ningún servidor.';
      btnCopy.disabled = false;
    }).catch(function (e) {
      if (statusEl) statusEl.textContent = '';
      showError('No se pudieron generar las claves: ' + e.message);
    });
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    result.textContent = '';
    if (statusEl) statusEl.style.display = 'none';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generar-par-claves');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['cifrar-texto-aes', 'generador-hashes', 'generar-contrasenas']);
  }
})();
