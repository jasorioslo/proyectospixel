/* ProyectosPixel - Verificador de Seguridad de Contraseñas
   Analiza longitud, variedad, patrones comunes y estima entropía + tiempo de fuerza bruta.
   100% local: la contraseña nunca sale del navegador. */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');
  var meterHost = document.getElementById('strength-meter');

  var COMMON = ['123456', 'password', '123456789', 'qwerty', 'abc123', '111111', '123123', 'admin', 'letmein', 'iloveyou', 'welcome', 'monkey', 'dragon', 'contrasena', 'contraseña', '12345678', '1234567', '000000', 'qwerty123', '1q2w3e4r'];

  function analyze(pw) {
    var checks = {
      length8: pw.length >= 8,
      length12: pw.length >= 12,
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      digits: /\d/.test(pw),
      symbols: /[^A-Za-z0-9]/.test(pw),
      noRepeat: !/(.)\1{2,}/.test(pw),
      noSequence: !/(abc|bcd|cde|123|234|345|456|567|678|789|qwe|asd)/i.test(pw),
      noCommon: COMMON.indexOf(pw.toLowerCase()) === -1
    };

    var charset = 0;
    if (checks.lower) charset += 26;
    if (checks.upper) charset += 26;
    if (checks.digits) charset += 10;
    if (checks.symbols) charset += 32;
    var entropy = pw.length > 0 && charset > 0 ? pw.length * Math.log2(charset) : 0;

    var score = 0;
    if (checks.length8) score++;
    if (checks.length12) score++;
    if (checks.lower && checks.upper) score++;
    if (checks.digits) score++;
    if (checks.symbols) score++;
    if (checks.noCommon && checks.noRepeat && checks.noSequence) score++;
    // penalizaciones
    if (!checks.noCommon) score = Math.min(score, 1);
    if (!checks.noRepeat || !checks.noSequence) score = Math.max(0, score - 1);
    score = Math.max(0, Math.min(5, score));

    // tiempo de crack (10^10 intentos/s supuesto GPU)
    var guesses = Math.pow(2, entropy);
    var seconds = guesses / 1e10;
    return { checks: checks, charset: charset, entropy: entropy, score: score, seconds: seconds };
  }

  function humanTime(s) {
    if (s < 1) return 'instantáneo';
    if (s < 60) return Math.round(s) + ' segundos';
    if (s < 3600) return Math.round(s / 60) + ' minutos';
    if (s < 86400) return Math.round(s / 3600) + ' horas';
    if (s < 31536000) return Math.round(s / 86400) + ' días';
    var years = s / 31536000;
    if (years < 1000) return Math.round(years) + ' años';
    if (years < 1e6) return Math.round(years / 1000) + ' mil años';
    if (years < 1e9) return Math.round(years / 1e6) + ' millones de años';
    return 'prácticamente imposible (más de mil millones de años)';
  }

  function render(pw) {
    if (!pw) {
      meterHost.innerHTML = '';
      result.textContent = '';
      return;
    }
    var a = analyze(pw);
    var labels = ['Muy débil', 'Muy débil', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte'];
    var classes = ['', 'weak', 'weak', 'medium', 'strong', 'strong'];
    var bars = '';
    for (var i = 0; i < 5; i++) {
      bars += '<div class="strength-bar ' + (i < a.score ? classes[a.score] : '') + '"></div>';
    }
    meterHost.innerHTML = bars + '<div class="strength-label" style="width:100%">Fortaleza: <strong>' + labels[a.score] +
      '</strong> · entropía ≈ ' + Math.round(a.entropy) + ' bits</div>';

    var list = [
      ['8+ caracteres', a.checks.length8],
      ['12+ caracteres', a.checks.length12],
      ['Minúsculas', a.checks.lower],
      ['Mayúsculas', a.checks.upper],
      ['Números', a.checks.digits],
      ['Símbolos', a.checks.symbols],
      ['Sin repeticiones (aaa)', a.checks.noRepeat],
      ['Sin secuencias (123, abc)', a.checks.noSequence],
      ['No está en lista de comunes', a.checks.noCommon]
    ];
    result.innerHTML = 'Tiempo estimado de descifrado (fuerza bruta): <strong>' + humanTime(a.seconds) + '</strong>\n\n' +
      list.map(function (x) { return (x[1] ? '✅ ' : '❌ ') + x[0]; }).join('\n');
  }

  function run() {
    var pw = input.value;
    if (!pw) { showError('Escribe una contraseña para analizar.'); return; }
    hideError();
    render(pw);
  }
  btnProcess.addEventListener('click', run);
  input.addEventListener('input', function () { if (input.value) render(input.value); });

  btnClear.addEventListener('click', function () {
    input.value = ''; meterHost.innerHTML = ''; result.textContent = ''; hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('verificador-contrasenas');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['generar-contrasenas', 'generador-hashes', 'generador-uuid']);
  }
})();
