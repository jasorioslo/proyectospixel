/* ProyectosPixel - Comprimir Imagen (canvas + toBlob, 100% local) */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var result = document.getElementById('tool-result');
  var previewOut = document.getElementById('preview-result');
  var metaOut = document.getElementById('result-meta');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlQuality = document.getElementById('ctl-quality');
  var qualityValue = document.getElementById('quality-value');
  var ctlFormat = document.getElementById('ctl-format');
  var ctlResize = document.getElementById('ctl-resize');
  var shrinkValue = document.getElementById('shrink-value');

  var ui = IMG.setupImageInput({});
  var lastBlob = null;

  if (ctlQuality) ctlQuality.addEventListener('input', function () { qualityValue.textContent = Math.round(ctlQuality.value * 100) + '%'; });
  if (ctlResize) ctlResize.addEventListener('input', function () { shrinkValue.textContent = ctlResize.value === '100' ? 'Sin reescalar' : ctlResize.value + '%'; });

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    ui.hideError();
    var img = ui.state.img;
    var scale = parseInt(ctlResize.value, 10) / 100;
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var format = ctlFormat.value;
    if (format === 'auto') format = /png/.test(img._file.type) ? 'image/png' : 'image/jpeg';
    var quality = parseFloat(ctlQuality.value);

    var canvas = IMG.drawToCanvas(img, w, h);
    IMG.canvasToBlob(canvas, format, format === 'image/png' ? undefined : quality).then(function (blob) {
      lastBlob = blob;
      var originalSize = ui.state.file.size;
      var saving = Math.round((1 - blob.size / originalSize) * 100);
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      var ext = IMG.extFor(format);
      var name = IMG.baseName(ui.state.file.name) + '-comprimida.' + ext;
      result.textContent = name;
      metaOut.innerHTML = 'Antes: <strong>' + IMG.formatBytes(originalSize) + '</strong> · Después: <strong>' +
        IMG.formatBytes(blob.size) + '</strong> · ' + (saving > 0 ? '<span class="save">- ' + saving + '%</span>' : 'sin reducción (prueba calidad más baja o reescalar)');
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen-comprimida');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('comprimir-imagen');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['convertir-imagen', 'redimensionar-imagen', 'recortar-imagen']);
  }
})();
