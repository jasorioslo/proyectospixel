/* ProyectosPixel - Separar Keywords por Género
   Heurística ES: última palabra significativa termina en:
   - "es"/"s" tras vocal + "as"/"os" → plural
   - acaba en "a" → femenino; acaba en "o" → masculino; otras → neutro
   Salida agrupada por cuadrante: M-sing, M-plur, F-sing, F-plur, sin determinar */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var errorEl = document.getElementById('tool-error');

  // Devuelve { gender: 'm'|'f'|'?', number: 's'|'p' } con heurística de terminaciones ES
  function classify(keyword) {
    var k = keyword.toLowerCase().trim();
    var gender = '?';
    var number = 's';
    var last = k.split(/\s+/).pop();

    if (/as$/.test(last)) { gender = 'f'; number = 'p'; }
    else if (/os$/.test(last)) { gender = 'm'; number = 'p'; }
    else if (/es$/.test(last)) { number = 'p'; } // plural de género ambiguo (café→cafés, ágil→ágiles)
    else if (/a$/.test(last)) { gender = 'f'; }
    else if (/o$/.test(last)) { gender = 'm'; }

    return { gender: gender, number: number };
  }

  btnProcess.addEventListener('click', function () {
    var text = input.value;
    var keywords = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    if (keywords.length < 2) { showError('Pega al menos 2 keywords (una por línea).'); return; }
    hideError();

    var groups = {
      'Masculino singular': [],
      'Masculino plural': [],
      'Femenino singular': [],
      'Femenino plural': [],
      'Plural sin género claro': [],
      'Sin determinar': []
    };

    keywords.forEach(function (kw) {
      var c = classify(kw);
      var key;
      if (c.number === 'p' && c.gender === '?') key = 'Plural sin género claro';
      else if (c.gender === '?') key = 'Sin determinar';
      else key = (c.gender === 'm' ? 'Masculino ' : 'Femenino ') + (c.number === 'p' ? 'plural' : 'singular');
      groups[key].push(kw);
    });

    var blocks = [];
    Object.keys(groups).forEach(function (g) {
      if (groups[g].length === 0) return;
      blocks.push('## ' + g + ' (' + groups[g].length + ')\n' + groups[g].join('\n'));
    });

    result.textContent = blocks.join('\n\n');
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
    btnCopy.disabled = true;
    hideError();
  });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('separar-keywords-genero');

  // Render related tools (helper compartido en tools-data.js)
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['frecuencia-palabras', 'filtrar-lineas-texto', 'eliminar-lineas-duplicadas']);
  }
})();
