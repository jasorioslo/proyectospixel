/* ProyectosPixel - Conversor de Unidades (longitud, masa, volumen, temperatura, área, velocidad, datos) */
(function () {
  'use strict';

  var errorEl = document.getElementById('tool-error');
  var result = document.getElementById('tool-result');
  var btnProcess = document.getElementById('btn-process');
  var btnCopy = document.getElementById('btn-copy');
  var btnClear = document.getElementById('btn-clear');
  var ctlCat = document.getElementById('ctl-cat');
  var ctlFrom = document.getElementById('ctl-from');
  var ctlTo = document.getElementById('ctl-to');
  var ctlValue = document.getElementById('ctl-value');

  // Cada unidad: factor a unidad base (excepto temperatura, que usa funciones)
  var UNITS = {
    longitud: { base: 'm', units: { 'Milímetros (mm)': 0.001, 'Centímetros (cm)': 0.01, 'Metros (m)': 1, 'Kilómetros (km)': 1000, 'Pulgadas (in)': 0.0254, 'Pies (ft)': 0.3048, 'Yardas (yd)': 0.9144, 'Millas (mi)': 1609.344 } },
    masa: { base: 'kg', units: { 'Miligramos (mg)': 1e-6, 'Gramos (g)': 0.001, 'Kilogramos (kg)': 1, 'Toneladas (t)': 1000, 'Libras (lb)': 0.45359237, 'Onzas (oz)': 0.028349523125 } },
    volumen: { base: 'l', units: { 'Mililitros (ml)': 0.001, 'Litros (l)': 1, 'Metros cúbicos (m³)': 1000, 'Galones US (gal)': 3.785411784, 'Pintas US (pt)': 0.473176473, 'Tazas (cup)': 0.2365882365 } },
    area: { base: 'm2', units: { 'Milímetros² (mm²)': 1e-6, 'Centímetros² (cm²)': 1e-4, 'Metros² (m²)': 1, 'Hectáreas (ha)': 10000, 'Kilómetros² (km²)': 1e6, 'Pies² (ft²)': 0.09290304, 'Acres (ac)': 4046.8564224 } },
    velocidad: { base: 'ms', units: { 'Metros/segundo (m/s)': 1, 'Kilómetros/hora (km/h)': 0.277777778, 'Millas/hora (mph)': 0.44704, 'Nudos (kn)': 0.514444444 } },
    datos: { base: 'B', units: { 'Bytes (B)': 1, 'Kilobytes (KB)': 1024, 'Megabytes (MB)': 1048576, 'Gigabytes (GB)': 1073741824, 'Terabytes (TB)': 1099511627776 } },
    tiempo: { base: 's', units: { 'Milisegundos (ms)': 0.001, 'Segundos (s)': 1, 'Minutos (min)': 60, 'Horas (h)': 3600, 'Días (d)': 86400, 'Semanas (sem)': 604800, 'Años (365d)': 31536000 } }
  };
  var TEMP_UNITS = ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'];

  function fillUnits() {
    var cat = ctlCat.value;
    var list = cat === 'temperatura' ? TEMP_UNITS : Object.keys(UNITS[cat].units);
    ctlFrom.innerHTML = list.map(function (u) { return '<option>' + u + '</option>'; }).join('');
    ctlTo.innerHTML = list.map(function (u) { return '<option>' + u + '</option>'; }).join('');
    ctlFrom.selectedIndex = 0;
    ctlTo.selectedIndex = Math.min(1, list.length - 1);
  }
  ctlCat.addEventListener('change', fillUnits);
  fillUnits();

  function tempToC(v, unit) {
    if (/Celsius/.test(unit)) return v;
    if (/Fahrenheit/.test(unit)) return (v - 32) * 5 / 9;
    return v - 273.15; // Kelvin
  }
  function cToTemp(c, unit) {
    if (/Celsius/.test(unit)) return c;
    if (/Fahrenheit/.test(unit)) return c * 9 / 5 + 32;
    return c + 273.15;
  }

  function fmt(n) {
    if (!isFinite(n)) return '—';
    if (n !== 0 && (Math.abs(n) < 0.0001 || Math.abs(n) >= 1e12)) return n.toExponential(6);
    return (Math.round(n * 1e8) / 1e8).toLocaleString('es-ES', { maximumFractionDigits: 8 });
  }

  btnProcess.addEventListener('click', function () {
    var v = parseFloat(ctlValue.value);
    if (isNaN(v)) { errorEl.textContent = 'Introduce un valor numérico.'; errorEl.classList.add('visible'); return; }
    errorEl.classList.remove('visible');

    var cat = ctlCat.value;
    var out;
    if (cat === 'temperatura') {
      var c = tempToC(v, ctlFrom.value);
      out = fmt(v) + ' ' + ctlFrom.value + ' = ' + fmt(cToTemp(c, ctlTo.value)) + ' ' + ctlTo.value;
    } else {
      var u = UNITS[cat].units;
      var inBase = v * u[ctlFrom.value];
      out = fmt(v) + ' ' + ctlFrom.value + ' = ' + fmt(inBase / u[ctlTo.value]) + ' ' + ctlTo.value;
    }
    result.textContent = out;
    btnCopy.disabled = false;
  });

  btnCopy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.textContent).then(function () {
      btnCopy.classList.add('copied');
      setTimeout(function () { btnCopy.classList.remove('copied'); }, 2000);
    });
  });

  btnClear.addEventListener('click', function () {
    ctlValue.value = ''; result.textContent = ''; btnCopy.disabled = true; errorEl.classList.remove('visible');
  });

  if (window.ProyectosPixel && ProyectosPixel.trackToolUsage) ProyectosPixel.trackToolUsage('conversor-unidades');
  if (window.ProyectosPixel && ProyectosPixel.renderRelatedTools) {
    ProyectosPixel.renderRelatedTools('related-tools', ['convertidor-bases', 'calculadora-porcentajes', 'limpiar-exif']);
  }
})();
