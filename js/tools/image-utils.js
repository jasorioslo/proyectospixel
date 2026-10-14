/* ProyectosPixel - Utilidades compartidas para tools de Imagen (100% client-side) */
(function () {
  'use strict';

  var api = window.ProyectosPixel = window.ProyectosPixel || {};

  /* Formatea bytes a texto legible */
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    var units = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
  }

  /* Carga un File de imagen como HTMLImageElement */
  function loadImageFile(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) {
        reject(new Error('El archivo no es una imagen válida.'));
        return;
      }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { img._objectUrl = url; img._file = file; resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('No se pudo leer la imagen. ¿Está dañada o el formato no es compatible?')); };
      img.src = url;
    });
  }

  /* Crea un canvas del tamaño indicado y dibuja la imagen (cubre todo el canvas) */
  function drawToCanvas(img, w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(w));
    canvas.height = Math.max(1, Math.round(h));
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  /* Canvas -> Blob (usa toBlob con fallback a dataURL) */
  function canvasToBlob(canvas, type, quality) {
    return new Promise(function (resolve, reject) {
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          if (blob) resolve(blob);
          else reject(new Error('No se pudo generar la imagen con ese formato.'));
        }, type, quality);
      } else {
        try {
          var dataUrl = canvas.toDataURL(type, quality);
          var parts = dataUrl.split(',');
          var bin = atob(parts[1]);
          var arr = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          resolve(new Blob([arr], { type: type }));
        } catch (e) { reject(e); }
      }
    });
  }

  /* Comprueba si el navegador puede CODIFICAR un formato vía canvas */
  function canEncode(type) {
    try {
      var c = document.createElement('canvas');
      c.width = 1; c.height = 1;
      var d = c.toDataURL(type);
      return d.indexOf('data:' + type) === 0;
    } catch (e) { return false; }
  }

  /* Descarga un blob con el nombre indicado */
  function downloadBlob(blob, filename) {
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  /* Extensión de archivo segun mime */
  function extFor(type) {
    if (type === 'image/jpeg') return 'jpg';
    if (type === 'image/webp') return 'webp';
    if (type === 'image/png') return 'png';
    return 'img';
  }

  /* Nombre base sin extensión */
  function baseName(name) {
    return (name || 'imagen').replace(/\.[^.]+$/, '');
  }

  /* Conecta drop-zone + input file + preview.
     onImage(img) se llama en cada carga. */
  function setupImageInput(opts) {
    var fileInput = document.getElementById(opts.inputId || 'file-input');
    var dropZone = document.getElementById(opts.dropId || 'drop-zone');
    var preview = document.getElementById(opts.previewId || 'preview-original');
    var metaEl = document.getElementById(opts.metaId || 'file-meta');
    var errorEl = document.getElementById(opts.errorId || 'tool-error');
    var state = { img: null, file: null };

    function showError(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
    function hideError() { if (errorEl) errorEl.classList.remove('visible'); }

    function handleFile(file) {
      hideError();
      loadImageFile(file).then(function (img) {
        state.img = img;
        state.file = file;
        if (preview) {
          preview.src = img._objectUrl;
          preview.style.display = 'block';
        }
        if (metaEl) {
          metaEl.innerHTML = '<strong>' + file.name + '</strong> · ' +
            img.naturalWidth + '×' + img.naturalHeight + ' px · <strong>' + formatBytes(file.size) + '</strong>';
        }
        if (opts.onImage) opts.onImage(img, file, state);
      }).catch(function (e) { showError(e.message); });
    }

    if (dropZone) {
      dropZone.addEventListener('click', function () { fileInput.click(); });
      ['dragenter', 'dragover'].forEach(function (ev) {
        dropZone.addEventListener(ev, function (e) { e.preventDefault(); dropZone.classList.add('dragover'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        dropZone.addEventListener(ev, function (e) { e.preventDefault(); dropZone.classList.remove('dragover'); });
      });
      dropZone.addEventListener('drop', function (e) {
        if (e.dataTransfer && e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
      });
    }
    if (fileInput) {
      fileInput.addEventListener('change', function () {
        if (fileInput.files.length) handleFile(fileInput.files[0]);
      });
    }

    /* Permite pegar desde el portapapeles (Ctrl+V) */
    document.addEventListener('paste', function (e) {
      var items = (e.clipboardData || {}).items || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          handleFile(items[i].getAsFile());
          break;
        }
      }
    });

    return { state: state, showError: showError, hideError: hideError, handleFile: handleFile };
  }

  /* Registra los helpers en la API compartida */
  api.image = {
    formatBytes: formatBytes,
    loadImageFile: loadImageFile,
    drawToCanvas: drawToCanvas,
    canvasToBlob: canvasToBlob,
    canEncode: canEncode,
    downloadBlob: downloadBlob,
    extFor: extFor,
    baseName: baseName,
    setupImageInput: setupImageInput
  };

})();
