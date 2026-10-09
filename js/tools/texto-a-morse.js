(function () {
  'use strict';
  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  var morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    '!': '-.-.--', ' ': '/'
  };

  var reverseMorse = {};
  Object.keys(morseMap).forEach(function (k) { reverseMorse[morseMap[k]] = k; });

  function textToMorse(text) {
    return text.toUpperCase().split('').map(function (c) {
      return morseMap[c] !== undefined ? morseMap[c] : c;
    }).join(' ');
  }

  function morseToText(morse) {
    var words = morse.split(' / ');
    return words.map(function (word) {
      return word.split(' ').map(function (code) {
        if (!code) return '';
        if (!reverseMorse[code]) {
          showError('Codigo Morse no valido: "' + code + '"');
          return '';
        }
        return reverseMorse[code];
      }).join('');
    }).join(' ');
  }

  document.getElementById('btn-to-morse').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega un texto primero.'); return; }
    hideError();
    result.textContent = textToMorse(text);
    btnCopy.disabled = false;
  });

  document.getElementById('btn-to-text').addEventListener('click', function () {
    var text = input.value;
    if (!text.trim()) { showError('Escribe o pega codigo Morse primero.'); return; }
    hideError();
    var output = morseToText(text);
    if (output) { result.textContent = output; btnCopy.disabled = false; }
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

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('texto-a-morse');

  
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['invertir-texto', 'convertir-unicode-texto', 'codificar-decodificar-base64']);
  }
})();
