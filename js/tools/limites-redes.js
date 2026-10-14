/* ProyectosPixel - Límites de Redes Sociales (contador por plataforma)
   Casos borde: cuenta caracteres con y sin espacios; avisa cuando se excede un límite */
(function () {
  'use strict';

  var input = document.getElementById('tool-input');
  var errorEl = document.getElementById('tool-error');
  var btnClear = document.getElementById('btn-clear');
  var btnAnalyze = document.getElementById('btn-process');
  var grid = document.getElementById('limits-grid');

  // Límites oficiales aproximados (2026)
  var LIMITS = [
    { name: 'X / Twitter', max: 280, note: 'post estándar' },
    { name: 'Instagram (pie de foto)', max: 2200, note: 'caption' },
    { name: 'TikTok (descripción)', max: 2200, note: 'caption' },
    { name: 'Meta description (SEO)', max: 160, note: 'Google muestra ~155-160' },
    { name: 'Title tag (SEO)', max: 60, note: 'Google muestra ~60' },
    { name: 'SMS', max: 160, note: '1 SMS' },
    { name: 'WhatsApp (estado)', max: 700, note: 'status de texto' },
    { name: 'YouTube (título)', max: 100, note: 'título de vídeo' }
  ];

  function update() {
    var text = input.value;
    var chars = text.length;
    var noSpaces = text.replace(/\s/g, '').length;

    var html = '';
    LIMITS.forEach(function (l) {
      var over = chars > l.max;
      var pct = l.max ? Math.min(100, Math.round(chars / l.max * 100)) : 0;
      html += '<div class="counter-item" style="text-align:left">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">' +
          '<strong style="font-size:13px">' + l.name + '</strong>' +
          '<span style="font-size:12px;color:' + (over ? 'var(--error)' : 'var(--text-secondary)') + '">' +
            chars + ' / ' + l.max + '</span>' +
        '</div>' +
        '<div class="freq-bar" style="height:6px;margin:8px 0;background:var(--border)">' +
          '<div class="freq-bar" style="width:' + pct + '%;height:6px;background:' + (over ? 'var(--error)' : 'var(--success)') + '"></div>' +
        '</div>' +
        '<div style="font-size:11.5px;color:var(--text-secondary)">' + l.note + (over ? ' · ⚠ ' + (chars - l.max) + ' sobre el límite' : ' · ✓ cabe') + '</div>' +
      '</div>';
    });

    grid.innerHTML = html;
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))';
    grid.style.display = 'grid';
    grid.style.gap = '12px';
  }

  btnAnalyze.addEventListener('click', function () {
    if (!input.value) { errorEl.textContent = 'Pega o escribe el texto primero.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');
    update();
  });

  input.addEventListener('input', update);
  btnClear.addEventListener('click', function () {
    input.value = '';
    grid.innerHTML = '';
    errorEl.classList.remove('visible');
  });

  update();

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('limites-redes');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['contar-palabras-caracteres', 'generador-slugs', 'buscar-reemplazar-texto']);
  }
})();
