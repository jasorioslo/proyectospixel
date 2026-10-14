/* ProyectosPixel - Convertir Imagen de formato (WebP/PNG/JPG, 100% local) */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var result = document.getElementById('tool-result');
  var previewOut = document.getElementById('preview-result');
  var metaOut = document.getElementById('result-meta');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlFormat = document.getElementById('ctl-format');
  var ctlQuality = document.getElementById('ctl-quality');
  var qualityValue = document.getElementById('quality-value');
  var noteEl = document.getElementById('format-note');

  var ui = IMG.setupImageInput({});
  var lastBlob = null;

  if (ctlQuality) ctlQuality.addEventListener('input', function () { qualityValue.textContent = Math.round(ctlQuality.value * 100) + '%'; });

  function updateNote() {
    if (!ctlFormat || !noteEl) return;
    var t = ctlFormat.value;
    var webpOk = IMG.canEncode('image/webp');
    if (t === 'image/webp' && !webpOk) {
      noteEl.textContent = '⚠ Tu navegador no puede codificar WebP (pasa en Safari/Firefox). Usaremos PNG en su lugar.';
      noteEl.style.display = 'block';
    } else if (t === 'image/png' && ui.state.img && /image\/jpeg/.test(ui.state.img._file.type)) {
      noteEl.textContent = 'ℹ Convertir una foto a PNG suele subir el peso (PNG no comprime fotos).';
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }
  }
  if (ctlFormat) ctlFormat.addEventListener('change', updateNote);

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    ui.hideError();
    var img = ui.state.img;
    var type = ctlFormat.value;
    if (type === 'image/webp' && !IMG.canEncode('image/webp')) type = 'image/png';
    var quality = parseFloat(ctlQuality.value);

    var canvas = IMG.drawToCanvas(img, img.naturalWidth, img.naturalHeight);
    IMG.canvasToBlob(canvas, type, type === 'image/png' ? undefined : quality).then(function (blob) {
      lastBlob = blob;
      var ext = IMG.extFor(type);
      var name = IMG.baseName(ui.state.file.name) + '.' + ext;
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      result.textContent = name;
      metaOut.innerHTML = 'Formato: <strong>' + ext.toUpperCase() + '</strong> · ' + canvas.width + '×' + canvas.height + ' px · ' +
        IMG.formatBytes(ui.state.file.size) + ' → <strong>' + IMG.formatBytes(blob.size) + '</strong>';
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('convertir-imagen');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['comprimir-imagen', 'redimensionar-imagen', 'limpiar-exif']);
  }
})();
