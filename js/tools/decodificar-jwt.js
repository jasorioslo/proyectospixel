/* ProyectosPixel - Decodificador de JWT (muestra header y payload, sin verificar firma) */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  function b64urlDecode(str) {
    var s = str.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    var bin = atob(s);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function fmtDate(ts) {
    if (typeof ts !== 'number') return null;
    var d = new Date(ts * 1000);
    return d.toLocaleString('es-ES', { timeZone: 'UTC' }) + ' UTC';
  }

  btnProcess.addEventListener('click', function () {
    var token = input.value.trim();
    if (!token) { showError('Pega un token JWT primero.'); return; }
    var parts = token.split('.');
    if (parts.length !== 3) {
      showError('Un JWT tiene 3 partes separadas por puntos (header.payload.signature). Encontradas: ' + parts.length + '.');
      return;
    }
    var header, payload;
    try {
      header = JSON.parse(b64urlDecode(parts[0]));
      payload = JSON.parse(b64urlDecode(parts[1]));
    } catch (e) {
      showError('No se pudo decodificar el JWT: ' + e.message);
      return;
    }
    hideError();

    var now = Math.floor(Date.now() / 1000);
    var avisos = [];
    if (header.alg === 'none') avisos.push('⚠ Algoritmo "none": el token NO está firmado.');
    if (payload.exp && payload.exp < now) avisos.push('⚠ Token EXPIRADO el ' + fmtDate(payload.exp));
    else if (payload.exp) avisos.push('✓ Válido hasta ' + fmtDate(payload.exp));
    if (payload.iat) avisos.push('Emitido: ' + fmtDate(payload.iat));
    if (payload.nbf && payload.nbf > now) avisos.push('⚠ Aún no válido (nbf): ' + fmtDate(payload.nbf));

    var out = '=== HEADER ===\n' + JSON.stringify(header, null, 2) +
      '\n\n=== PAYLOAD ===\n' + JSON.stringify(payload, null, 2) +
      '\n\n=== FIRMA ===\n' + parts[2].slice(0, 40) + (parts[2].length > 40 ? '…' : '') + ' (no verificada en el navegador)' +
      (avisos.length ? '\n\n=== AVISOS ===\n' + avisos.join('\n') : '');

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
    input.value = ''; result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('decodificar-jwt');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['codificar-decodificar-base64', 'generador-hashes', 'codificar-url']);
  }
})();
