/* ProyectosPixel - Imagen a PDF (varias imágenes → un PDF), sin dependencias
   Genera el PDF a mano (estructura PDF 1.4) embebiendo JPEG (DCTDecode).
   Cada imagen se re-codifica a JPEG localmente; nada sale del navegador. */
(function () {
  'use strict';

  var IMG = ProyectosPixel.image;
  var filesInput = document.getElementById('file-input');
  var dropZone = document.getElementById('drop-zone');
  var listEl = document.getElementById('file-list');
  var errorEl = document.getElementById('tool-error');
  var btnProcess = document.getElementById('btn-process');
  var btnDownload = document.getElementById('btn-download');
  var btnClear = document.getElementById('btn-clear');
  var ctlQuality = document.getElementById('ctl-quality');
  var qualityValue = document.getElementById('quality-value');
  var ctlFit = document.getElementById('ctl-fit');
  var images = [];
  var lastPdf = null;

  if (ctlQuality) ctlQuality.addEventListener('input', function () { qualityValue.textContent = Math.round(ctlQuality.value * 100) + '%'; });

  function showError(msg) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
  function hideError() { errorEl.classList.remove('visible'); }

  function renderList() {
    listEl.innerHTML = images.map(function (item, idx) {
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">' +
        '<img src="' + item.url + '" style="width:64px;height:48px;object-fit:cover;border:1px solid var(--border)">' +
        '<span style="flex:1;font-size:13px">' + item.name + '<br><span style="color:var(--text-secondary);font-size:12px">' + item.width + '×' + item.height + ' px</span></span>' +
        '<button class="btn-secondary" data-remove="' + idx + '" style="padding:6px 12px">Quitar</button>' +
      '</div>';
    }).join('');
    listEl.style.display = images.length ? 'block' : 'none';
  }

  listEl.addEventListener('click', function (e) {
    var idx = e.target.getAttribute('data-remove');
    if (idx !== null && e.target.tagName === 'BUTTON') {
      images.splice(parseInt(idx, 10), 1);
      renderList();
    }
  });

  function addFiles(files) {
    hideError();
    var pending = Array.prototype.slice.call(files).filter(function (f) { return /^image\//.test(f.type); });
    if (!pending.length) { showError('Selecciona archivos de imagen (JPG, PNG, WebP...).'); return; }
    Promise.all(pending.map(function (f) {
      return IMG.loadImageFile(f).then(function (img) {
        return { url: img._objectUrl, name: f.name, width: img.naturalWidth, height: img.naturalHeight, el: img };
      });
    })).then(function (loaded) {
      images = images.concat(loaded);
      renderList();
    }).catch(function (e) { showError(e.message); });
  }

  dropZone.addEventListener('click', function () { filesInput.click(); });
  ['dragenter', 'dragover'].forEach(function (ev) { dropZone.addEventListener(ev, function (e) { e.preventDefault(); dropZone.classList.add('dragover'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { dropZone.addEventListener(ev, function (e) { e.preventDefault(); dropZone.classList.remove('dragover'); }); });
  dropZone.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
  filesInput.addEventListener('change', function () { if (filesInput.files.length) { addFiles(filesInput.files); filesInput.value = ''; } });

  /* ---------- Escritor PDF mínimo ---------- */
  function buildPdf(entries, opts) {
    // entries: [{ jpegBytes: Uint8Array, width, height }]
    var chunks = [];       // strings ASCII o Uint8Array
    var offsets = [];      // offset en bytes de cada objeto (1-indexed)
    var total = 0;

    function push(x) {
      if (typeof x === 'string') {
        chunks.push(x);
        total += x.length; // ASCII: 1 byte por char
      } else {
        chunks.push(x);
        total += x.length;
      }
    }
    function startObj(num) {
      offsets[num] = total;
      push(num + ' 0 obj\n');
    }
    function endObj() { push('endobj\n'); }

    var objCount = 2 + entries.length * 3; // catalog + pages + por imagen: page, contents, image

    push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    // 1: catalog
    startObj(1); push('<< /Type /Catalog /Pages 2 0 R >>\n'); endObj();
    // 2: pages
    var kids = [];
    for (var i = 0; i < entries.length; i++) kids.push((3 + i * 3) + ' 0 R');
    startObj(2); push('<< /Type /Pages /Count ' + entries.length + ' /Kids [' + kids.join(' ') + '] >>\n'); endObj();

    entries.forEach(function (entry, i) {
      var pageObj = 3 + i * 3;
      var contentObj = pageObj + 1;
      var imageObj = pageObj + 2;
      var pw, ph, dw, dh, tx = 0, ty = 0;

      if (opts.fit === 'a4') {
        pw = 595.28; ph = 841.89; // A4 en puntos
        var scale = Math.min(pw / entry.width, ph / entry.height);
        dw = entry.width * scale;
        dh = entry.height * scale;
        tx = (pw - dw) / 2;
        ty = (ph - dh) / 2;
      } else {
        pw = entry.width; ph = entry.height; dw = pw; dh = ph;
      }

      startObj(pageObj);
      push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pw.toFixed(2) + ' ' + ph.toFixed(2) + '] /Resources << /XObject << /Im0 ' + imageObj + ' 0 R >> >> /Contents ' + contentObj + ' 0 R >>\n');
      endObj();

      var content = 'q\n' + dw.toFixed(2) + ' 0 0 ' + dh.toFixed(2) + ' ' + tx.toFixed(2) + ' ' + ty.toFixed(2) + ' cm\n/Im0 Do\nQ\n';
      startObj(contentObj);
      push('<< /Length ' + content.length + ' >>\nstream\n' + content + 'endstream\n');
      endObj();

      startObj(imageObj);
      push('<< /Type /XObject /Subtype /Image /Width ' + entry.width + ' /Height ' + entry.height + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + entry.jpegBytes.length + ' >>\nstream\n');
      push(entry.jpegBytes);
      push('\nendstream\n');
      endObj();
    });

    var xrefOffset = total;
    var xref = 'xref\n0 ' + (objCount + 1) + '\n0000000000 65535 f \n';
    for (var n = 1; n <= objCount; n++) {
      xref += ('0000000000' + offsets[n]).slice(-10) + ' 00000 n \n';
    }
    push(xref);
    push('trailer\n<< /Size ' + (objCount + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefOffset + '\n%%EOF\n');

    // Concatenar en un Blob
    var parts = chunks.map(function (c) {
      return typeof c === 'string' ? new TextEncoder().encode(c) : c;
    });
    return new Blob(parts, { type: 'application/pdf' });
  }

  btnProcess.addEventListener('click', function () {
    if (!images.length) { showError('Añade al menos una imagen.'); return; }
    hideError();
    var quality = parseFloat(ctlQuality.value);
    var fit = ctlFit.value;

    Promise.all(images.map(function (item) {
      var canvas = IMG.drawToCanvas(item.el, item.width, item.height);
      return IMG.canvasToBlob(canvas, 'image/jpeg', quality).then(function (blob) {
        return blob.arrayBuffer().then(function (buf) {
          return { jpegBytes: new Uint8Array(buf), width: item.width, height: item.height };
        });
      });
    })).then(function (entries) {
      var pdf = buildPdf(entries, { fit: fit });
      lastPdf = pdf;
      var sizeEl = document.getElementById('pdf-size');
      if (sizeEl) sizeEl.textContent = 'PDF generado: ' + entries.length + ' página' + (entries.length === 1 ? '' : 's') + ' · ' + IMG.formatBytes(pdf.size);
      btnDownload.disabled = false;
    }).catch(function (e) { showError('No se pudo generar el PDF: ' + e.message); });
  });

  btnDownload.addEventListener('click', function () {
    if (lastPdf) IMG.downloadBlob(lastPdf, 'imagenes-proyectospixel.pdf');
  });

  btnClear.addEventListener('click', function () {
    images = [];
    lastPdf = null;
    renderList();
    var sizeEl = document.getElementById('pdf-size');
    if (sizeEl) sizeEl.textContent = '';
    btnDownload.disabled = true;
    hideError();
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('imagen-a-pdf');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['comprimir-imagen', 'convertir-imagen', 'recortar-imagen']);
  }
})();
