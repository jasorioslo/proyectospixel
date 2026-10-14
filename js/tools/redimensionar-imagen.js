/* ProyectosPixel - Redimensionar Imagen (px o %, proporción bloqueable) */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var result = document.getElementById('tool-result');
  var previewOut = document.getElementById('preview-result');
  var metaOut = document.getElementById('result-meta');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlWidth = document.getElementById('ctl-width');
  var ctlHeight = document.getElementById('ctl-height');
  var ctlLock = document.getElementById('ctl-lock');
  var ctlPercent = document.getElementById('ctl-percent');

  var ratio = 1;
  var lastBlob = null;

  var ui = IMG.setupImageInput({
    onImage: function (img) {
      ratio = img.naturalWidth / img.naturalHeight;
      ctlWidth.value = img.naturalWidth;
      ctlHeight.value = img.naturalHeight;
      ctlPercent.value = '100';
    }
  });

  ctlWidth.addEventListener('input', function () {
    var w = parseInt(ctlWidth.value, 10);
    if (ctlLock.checked && w) ctlHeight.value = Math.round(w / ratio);
  });
  ctlHeight.addEventListener('input', function () {
    var h = parseInt(ctlHeight.value, 10);
    if (ctlLock.checked && h) ctlWidth.value = Math.round(h * ratio);
  });
  ctlPercent.addEventListener('change', function () {
    if (!ui.state.img) return;
    var p = parseInt(ctlPercent.value, 10) / 100;
    if (p > 0) {
      ctlWidth.value = Math.round(ui.state.img.naturalWidth * p);
      ctlHeight.value = Math.round(ui.state.img.naturalHeight * p);
    }
  });

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    var w = parseInt(ctlWidth.value, 10);
    var h = parseInt(ctlHeight.value, 10);
    if (!w || !h || w < 1 || h < 1) { ui.showError('Define un ancho y alto válidos (en píxeles).'); return; }
    if (w > 10000 || h > 10000) { ui.showError('Máximo 10.000 px por lado.'); return; }
    ui.hideError();

    var canvas = IMG.drawToCanvas(ui.state.img, w, h);
    IMG.canvasToBlob(canvas, 'image/png').then(function (blob) {
      lastBlob = blob;
      var name = IMG.baseName(ui.state.file.name) + '-' + w + 'x' + h + '.png';
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      result.textContent = name;
      metaOut.innerHTML = 'Original: <strong>' + ui.state.img.naturalWidth + '×' + ui.state.img.naturalHeight + '</strong> → Nueva: <strong>' +
        w + '×' + h + '</strong> px · ' + IMG.formatBytes(blob.size);
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen-redimensionada.png');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('redimensionar-imagen');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['comprimir-imagen', 'recortar-imagen', 'convertir-imagen']);
  }
})();
