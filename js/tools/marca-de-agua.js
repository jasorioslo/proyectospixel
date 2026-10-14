/* ProyectosPixel - Marca de Agua en imagen (texto, posición, opacidad, tamaño) */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var result = document.getElementById('tool-result');
  var previewOut = document.getElementById('preview-result');
  var metaOut = document.getElementById('result-meta');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlText = document.getElementById('ctl-text');
  var ctlSize = document.getElementById('ctl-size');
  var sizeValue = document.getElementById('size-value');
  var ctlOpacity = document.getElementById('ctl-opacity');
  var opacityValue = document.getElementById('opacity-value');
  var ctlColor = document.getElementById('ctl-color');
  var ctlPosition = document.getElementById('ctl-position');

  var lastBlob = null;

  var ui = IMG.setupImageInput({});

  ctlSize.addEventListener('input', function () { sizeValue.textContent = ctlSize.value + '%'; });
  ctlOpacity.addEventListener('input', function () { opacityValue.textContent = Math.round(ctlOpacity.value * 100) + '%'; });

  function drawWatermark(img, text, sizePct, opacity, color, pos) {
    var canvas = IMG.drawToCanvas(img, img.naturalWidth, img.naturalHeight);
    var ctx = canvas.getContext('2d');
    var fontSize = Math.max(12, Math.round(canvas.width * (sizePct / 100)));
    ctx.font = '700 ' + fontSize + 'px "Geist Mono", ui-monospace, monospace';
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    var pad = Math.round(fontSize * 0.6);
    var tw = ctx.measureText(text).width;
    var x, y = 0;
    if (pos === 'tl') { ctx.textAlign = 'left'; x = pad; y = pad + fontSize / 2; }
    else if (pos === 'tc') { ctx.textAlign = 'center'; x = canvas.width / 2; y = pad + fontSize / 2; }
    else if (pos === 'tr') { ctx.textAlign = 'right'; x = canvas.width - pad; y = pad + fontSize / 2; }
    else if (pos === 'ml') { ctx.textAlign = 'left'; x = pad; y = canvas.height / 2; }
    else if (pos === 'mc') { ctx.textAlign = 'center'; x = canvas.width / 2; y = canvas.height / 2; }
    else if (pos === 'mr') { ctx.textAlign = 'right'; x = canvas.width - pad; y = canvas.height / 2; }
    else if (pos === 'bl') { ctx.textAlign = 'left'; x = pad; y = canvas.height - pad - fontSize / 2; }
    else if (pos === 'bc') { ctx.textAlign = 'center'; x = canvas.width / 2; y = canvas.height - pad - fontSize / 2; }
    else { ctx.textAlign = 'right'; x = canvas.width - pad; y = canvas.height - pad - fontSize / 2; }

    // sombra sutil para legibilidad
    ctx.globalAlpha = opacity * 0.5;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillText(text, x + Math.max(1, fontSize / 25), y + Math.max(1, fontSize / 25));
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    return canvas;
  }

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    var text = ctlText.value.trim();
    if (!text) { ui.showError('Escribe el texto de la marca de agua.'); return; }
    ui.hideError();

    var canvas = drawWatermark(ui.state.img, text, parseInt(ctlSize.value, 10), parseFloat(ctlOpacity.value), ctlColor.value, ctlPosition.value);
    var type = /image\/png/.test(ui.state.file.type) ? 'image/png' : 'image/jpeg';
    IMG.canvasToBlob(canvas, type, 0.92).then(function (blob) {
      lastBlob = blob;
      var name = IMG.baseName(ui.state.file.name) + '-marca.' + IMG.extFor(type);
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      result.textContent = name;
      metaOut.innerHTML = 'Marca: <strong>"' + text + '"</strong> · tamaño ' + ctlSize.value + '% · opacidad ' +
        Math.round(ctlOpacity.value * 100) + '% · ' + canvas.width + '×' + canvas.height + ' px';
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen-marca.jpg');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('marca-de-agua');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['redimensionar-imagen', 'comprimir-imagen', 'limpiar-exif']);
  }
})();
