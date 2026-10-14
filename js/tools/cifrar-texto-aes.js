/* ProyectosPixel - Cifrar y Descifrar Texto (AES-256-GCM + PBKDF2, 100% local)
   Formato de salida: v1:base64(salt[16] | iv[12] | ciphertext)
   Casos borde: contraseña incorrecta → error claro; formato inválido → error; texto vacío */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlPass = document.getElementById('ctl-pass');
  var ctlIter = document.getElementById('ctl-iter');

  var ITER_DEFAULT = 150000;

  function b64(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }
  function unb64(str) {
    var bin = atob(str);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function deriveKey(password, salt, iterations) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
          base,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt', 'decrypt']
        );
      });
  }

  function encrypt() {
    var text = input.value;
    var pass = ctlPass.value;
    if (!text) { showError('Escribe el texto a cifrar.'); return; }
    if (!pass) { showError('Escribe una contraseña (será la clave del cifrado).'); return; }
    hideError();

    var iterations = parseInt(ctlIter.value, 10) || ITER_DEFAULT;
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));

    deriveKey(pass, salt, iterations).then(function (key) {
      return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(text));
    }).then(function (cipherBuf) {
      var ct = new Uint8Array(cipherBuf);
      var packed = new Uint8Array(salt.length + iv.length + ct.length);
      packed.set(salt, 0);
      packed.set(iv, salt.length);
      packed.set(ct, salt.length + iv.length);
      result.textContent = 'v1:' + iterations + ':' + b64(packed);
      btnCopy.disabled = false;
      ctlMode.value = 'encrypt';
    }).catch(function (e) { showError('No se pudo cifrar: ' + e.message); });
  }

  function decrypt() {
    var payload = input.value.trim();
    var pass = ctlPass.value;
    if (!payload) { showError('Pega el texto cifrado (formato v1:...).'); return; }
    if (!pass) { showError('Escribe la contraseña usada al cifrar.'); return; }
    var parts = payload.split(':');
    if (parts[0] !== 'v1' || parts.length !== 3) {
      showError('Formato no reconocido. Debe empezar por "v1:" (generado por esta herramienta).');
      return;
    }
    var iterations = parseInt(parts[1], 10) || ITER_DEFAULT;
    var packed;
    try { packed = unb64(parts[2]); } catch (e) { showError('Base64 inválido en el texto cifrado.'); return; }
    if (packed.length < 29) { showError('El texto cifrado está incompleto o corrupto.'); return; }

    var salt = packed.slice(0, 16);
    var iv = packed.slice(16, 28);
    var ct = packed.slice(28);
    hideError();

    deriveKey(pass, salt, iterations).then(function (key) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct);
    }).then(function (plainBuf) {
      result.textContent = new TextDecoder().decode(plainBuf);
      btnCopy.disabled = false;
    }).catch(function () {
      showError('No se pudo descifrar: contraseña incorrecta o datos alterados.');
      result.textContent = '';
      btnCopy.disabled = true;
    });
  }

  btnProcess.addEventListener('click', function () {
    if (ctlMode.value === 'encrypt') encrypt(); else decrypt();
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('cifrar-texto-aes');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generador-hashes', 'cifrador-cesar', 'generar-contrasenas']);
  }
})();
