/* ProyectosPixel - Limpiar metadatos EXIF de una imagen (re-encode local) */
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
  var exifInfo = document.getElementById('exif-info');

  var lastBlob = null;
  var ui = IMG.setupImageInput({
    onImage: function (img, file) {
      // Intento de lectura EXIF en cliente (solo JPEG, best-effort informativo)
      if (/image\/jpeg/.test(file.type) && exifInfo) {
        readExifSummary(file).then(function (summary) {
          exifInfo.textContent = summary ? ('Metadatos detectados: ' + summary) : 'No se detectaron metadatos relevantes (o el navegador no pudo leerlos).';
          exifInfo.style.display = 'block';
        });
      }
    }
  });

  if (ctlQuality) ctlQuality.addEventListener('input', function () { qualityValue.textContent = Math.round(ctlQuality.value * 100) + '%'; });

  /* Lectura best-effort de etiquetas EXIF comunes (GPS, cámara, fecha) */
  function readExifSummary(file) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          var view = new DataView(e.target.result);
          if (view.getUint16(0, false) !== 0xFFD8) return resolve(null); // no es JPEG
          var length = view.byteLength, offset = 2;
          var found = [];
          while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8) return resolve(found.length ? found.join(', ') : null);
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
              if (view.getUint32(offset += 2, false) != 0x45786966) return resolve(null);
              var little = view.getUint16(offset += 6, false) == 0x4949;
              offset += view.getUint32(offset + 4, little);
              var tags = view.getUint16(offset, little);
              offset += 2;
              for (var i = 0; i < tags; i++) {
                var tag = view.getUint16(offset + (i * 12), little);
                if (tag == 0x0112) found.push('orientación');
                if (tag == 0x9003) found.push('fecha de captura');
              }
              if (view.getUint32(offset - 6, little) > 0) found.push('EXIF');
            } else if (marker == 0xFFE0) found.push('JFIF');
            else offset += view.getUint16(offset, false);
          }
          resolve(found.length ? found.join(', ') : null);
        } catch (err) { resolve(null); }
      };
      reader.readAsArrayBuffer(file.slice(0, 128 * 1024));
    });
  }

  btnProcess.addEventListener('click', function () {
    if (!ui.state.img) { ui.showError('Selecciona o arrastra una imagen primero.'); return; }
    ui.hideError();

    var type = ctlFormat.value;
    if (type === 'auto') type = /image\/png/.test(ui.state.file.type) ? 'image/png' : 'image/jpeg';
    var quality = parseFloat(ctlQuality.value);

    // Re-encodear desde el canvas: el EXIF no se copia (se elimina)
    var canvas = IMG.drawToCanvas(ui.state.img, ui.state.img.naturalWidth, ui.state.img.naturalHeight);
    IMG.canvasToBlob(canvas, type, type === 'image/png' ? undefined : quality).then(function (blob) {
      lastBlob = blob;
      var ext = IMG.extFor(type);
      var name = IMG.baseName(ui.state.file.name) + '-sin-metadatos.' + ext;
      if (previewOut) { previewOut.src = URL.createObjectURL(blob); previewOut.style.display = 'block'; }
      result.textContent = name;
      metaOut.innerHTML = '🛡️ Metadatos eliminados (EXIF/GPS/fecha) · ' + canvas.width + '×' + canvas.height + ' px · ' +
        IMG.formatBytes(ui.state.file.size) + ' → <strong>' + IMG.formatBytes(blob.size) + '</strong>';
      btnDownload.disabled = false;
      btnDownload.setAttribute('data-filename', name);
    }).catch(function (e) { ui.showError(e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastBlob) IMG.downloadBlob(lastBlob, btnDownload.getAttribute('data-filename') || 'imagen-sin-metadatos.jpg');
  });

  btnClear.addEventListener('click', function () { location.reload(); });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('limpiar-exif');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['comprimir-imagen', 'convertir-imagen', 'marca-de-agua']);
  }
})();
