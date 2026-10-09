/* ProyectosPixel - Texto a Binario (UTF-8 real, bidireccional)
   Casos borde: acentos y ñ via TextEncoder (UTF-8 multiparte); binario suelto de 8 bits;
   contenido binario de 8 bits con o sin espacios; binario inválido → error inline */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var ctlMode = document.getElementById('ctl-mode');
  var ctlSpaced = document.getElementById('ctl-spaced');

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega algo primero.'); return; }
    hideError();

    if (ctlMode.value === 't2b') {
      var bytes = new TextEncoder().encode(text);
      var parts = [];
      for (var i = 0; i < bytes.length; i++) parts.push(bytes[i].toString(2).padStart(8, '0'));
      result.textContent = parts.join(ctlSpaced.checked ? ' ' : '');
    } else {
      var bits = text.replace(/[^01]/g, '');
      if (bits.length === 0) { showError('Pega código binario (solo 0 y 1).'); return; }
      if (bits.length % 8 !== 0) { showError('El binario no tiene grupos completos de 8 bits. Revisa que falte algún dígito.'); return; }
      var byteNums = [];
      for (var j = 0; j < bits.length; j += 8) byteNums.push(parseInt(bits.slice(j, j + 8), 2));
      try {
        var decoded = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(byteNums));
        result.textContent = decoded;
      } catch (e) {
        showError('El binario no corresponde a un texto UTF-8 válido.');
        return;
      }
    }
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    input.value = '';
    result.textContent = '';
    result.style.color = '';
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('texto-a-binario');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['cifrado-rot13', 'codificar-decodificar-base64', 'convertir-unicode-texto']);
  }
})();
