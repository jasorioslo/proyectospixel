/* ProyectosPixel - Generador de UUID v4 (criptográficamente seguro)
   Casos borde: cantidad 1-100, mayúsculas, sin guiones */
(function () {
  'use strict';

  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlCount = document.getElementById('ctl-count');
  var ctlUpper = document.getElementById('ctl-upper');
  var ctlNoDash = document.getElementById('ctl-nodash');

  function uuidV4() {
    var bytes = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // versión 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variante
    var hex = [];
    for (var i = 0; i < 16; i++) hex.push((bytes[i] + 0x100).toString(16).slice(1));
    return hex.slice(0, 4).join('') + '-' + hex.slice(4, 6).join('') + '-' +
      hex.slice(6, 8).join('') + '-' + hex.slice(8, 10).join('') + '-' + hex.slice(10, 16).join('');
  }

  btnProcess.addEventListener('click', function () {
    var count = parseInt(ctlCount.value, 10);
    if (!count || count < 1 || count > 100) { showError('La cantidad debe estar entre 1 y 100.'); return; }
    hideError();
    var out = [];
    for (var i = 0; i < count; i++) {
      var id = uuidV4();
      if (ctlNoDash.checked) id = id.replace(/-/g, '');
      if (ctlUpper.checked) id = id.toUpperCase();
      out.push(id);
    }
    result.textContent = out.join('\n');
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    result.textContent = ''; btnCopy.disabled = true; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generador-uuid');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-contrasenas', 'generador-hashes', 'cifrado-rot13']);
  }
})();
