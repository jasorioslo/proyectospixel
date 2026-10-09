(function () {
  'use strict';
  var result = document.getElementById('tool-result');
  var btnGenerate = document.getElementById('btn-generate');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var slider = document.getElementById('pw-length');
  var sliderVal = document.getElementById('pw-length-val');
  var strengthLabel = document.getElementById('strength-label');

  slider.addEventListener('input', function () { sliderVal.textContent = slider.value; });

  function getSecureRandom(max) {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  function generatePassword() {
    var length = parseInt(slider.value);
    var useUpper = document.getElementById('pw-upper').checked;
    var useLower = document.getElementById('pw-lower').checked;
    var useNumbers = document.getElementById('pw-numbers').checked;
    var useSymbols = document.getElementById('pw-symbols').checked;

    var chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) { alert('Selecciona al menos una opcion.'); return; }

    var password = '';
    for (var i = 0; i < length; i++) {
      password += chars[getSecureRandom(chars.length)];
    }

    result.textContent = password;
    btnCopy.disabled = false;
    updateStrength(password);
  }

  function updateStrength(pw) {
    var score = 0;
    if (pw.length >= 12) score++;
    if (pw.length >= 16) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;

    var bars = [document.getElementById('str-1'), document.getElementById('str-2'), document.getElementById('str-3'), document.getElementById('str-4')];
    bars.forEach(function (b) { b.className = 'strength-bar'; });

    var level, label;
    if (score <= 1) { level = 1; label = 'Debil'; }
    else if (score === 2) { level = 2; label = 'Medio'; }
    else if (score === 3) { level = 3; label = 'Fuerte'; }
    else { level = 4; label = 'Muy fuerte'; }

    var cls = level <= 1 ? 'weak' : level <= 2 ? 'medium' : 'strong';
    for (var i = 0; i < level; i++) { bars[i].classList.add(cls); }
    strengthLabel.textContent = label;
  }

  btnGenerate.addEventListener('click', generatePassword);

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () { result.textContent = ''; btnCopy.disabled = true; strengthLabel.textContent = ''; });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('generar-contrasenas');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['eliminar-caracteres-especiales', 'codificar-decodificar-base64', 'contar-palabras-caracteres']);
  }
})();
