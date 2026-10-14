/* ProyectosPixel - Recortar Imagen (por porcentajes, 100% local) */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var result = document.getElementById('tool-result');
  var previewOut = document.getElementById('preview-result');
  var metaOut = document.getElementById('result-meta');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlX = document.getElementById('ctl-x');
  var ctlY = document.getElementById('ctl-y');
  var ctlW = document.getElementById('ctl-w');
  var ctlH = document.getElementById('ctl-h');
  var cropHint = document.getElementById('crop-hint');

  var lastBlob = null;
  var ui = IMG.setupImageInput({
    onImage: function (img) {
      ctlX.value = 0; ctlY.value = 0; ctlW.value = 100; ctlH.value = 100;
      updateHint();
    }
  });

  function updateHint() {
    if (!ui.state.img || !cropHint) return;
    var w = ui.state.img.naturalWidth, h = ui.state.img.naturalHeight;
    var px = Math.round(w * (parseFloat(ctlW.value) || 0) / 100);
    var py = Math.round(h * (parseFloat(ctlH.value) || 0) / 100);
    cropHint.textContent = 'Resultado: ' + px + ' × ' + py + ' px (de ' + w + ' × ' + h + ')';
    cropHint.style.display = 'block';
  }
  [ctlX, ctlY, ctlW, ctlH].forEach(function (el) { el.addEventListener('input', updateHint); });

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    var x = parseFloat(ctlX.value), y = parseFloat(ctlY.value), w = parseFloat(ctlW.value), h = parseFloat(ctlH.value);
    if ([x, y, w, h].some(function (v) { return isNaN(v); }) || w <= 0 || h <= 0) {
      ui.showError('Revisa los valores: ancho y alto deben ser mayores que 0.'); return;
    }
    if (x + w > 100 || y + h > 100) { ui.showError('El recorte se sale de la imagen (x + ancho ≤ 100).'); return; }
    ui.hideError();

    var img = ui.state.img;
    var sx = Math.round(img.naturalWidth * x / 100);
    var sy = Math.round(img.naturalHeight * y / 100);
    var sw = Math.round(img.naturalWidth * w / 100);
    var sh = Math.round(img.naturalHeight * h / 100);

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    IMG.canvasToBlob(canvas, 'image/png').then(function (blob) {
      lastBlob = blob;
      var name = IMG.baseName(ui.state.file.name) + '-recorte.png';
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      result.textContent = name;
      metaOut.innerHTML = 'Recorte: <strong>' + sw + '×' + sh + ' px</strong> · desde (' + x + '%, ' + y + '%) · ' + IMG.formatBytes(blob.size);
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen-recorte.png');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('recortar-imagen');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['redimensionar-imagen', 'comprimir-imagen', 'marca-de-agua']);
  }
})();
