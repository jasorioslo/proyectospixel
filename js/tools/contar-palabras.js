/* =========================================================
   ProyectosPixel - Contar Palabras y Caracteres
   ========================================================= */

(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var countWords = document.getElementById('count-words');
  var countChars = document.getElementById('count-chars');
  var countCharsNoSpaces = document.getElementById('count-chars-nospaces');
  var countSentences = document.getElementById('count-sentences');
  var countParagraphs = document.getElementById('count-paragraphs');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');

  function count() {
    var text = input.value;

    // Characters
    var chars = text.length;
    var charsNoSpaces = text.replace(/\s/g, '').length;

    // Words
    var words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    // Sentences (split by . ! ?)
    var sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(function (s) { return s.trim().length > 0; }).length;

    // Paragraphs (split by double newline)
    var paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; }).length;

    countWords.textContent = words;
    countChars.textContent = chars;
    countCharsNoSpaces.textContent = charsNoSpaces;
    countSentences.textContent = sentences;
    countParagraphs.textContent = paragraphs;

    // Enable/disable copy button
    btnCopy.disabled = text.trim() === '';
  }

  // Copy result
  btnCopy.addEventListener('click', function () {
    var result = 'Palabras: ' + countWords.textContent +
      '\nCaracteres: ' + countChars.textContent +
      '\nSin espacios: ' + countCharsNoSpaces.textContent +
      '\nOraciones: ' + countSentences.textContent +
      '\nPárrafos: ' + countParagraphs.textContent;

    navigator.clipboard.writeText(result).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  // Clear
  btnClear.addEventListener('click', function () {
    input.value = '';
    count();
  });

  // Real-time counting
  input.addEventListener('input', count);

  // Track usage
  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) {
    ProyectosPixel.trackToolUsage('contar-palabras-caracteres');
  }
  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['quitar-acentos', 'convertir-mayusculas-minusculas', 'buscar-reemplazar-texto']);
  }

})();
