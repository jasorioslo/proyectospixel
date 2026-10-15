// Bumper de versiones de assets — subir V cuando cambien JS/CSS
// Uso: node bump-versions.js 9
// Actualiza: <link>/<script> ?v=N en HTML + CACHE_NAME ('pp-vN') del service worker
const fs = require('fs');
const path = require('path');
const v = process.argv[2] || '9';
const root = '.';

function walk(dir, cb) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (f === 'assets') continue; // assets nunca Referencian version
      walk(p, cb);
    } else cb(p);
  }
}

let changed = 0;
walk(root, (file) => {
  if (!file.endsWith('.html')) return;
  if (file.endsWith('404.html') && false) return;
  let txt = fs.readFileSync(file, 'utf8');
  const orig = txt;
  // styles.css
  txt = txt.replace(/<link rel="stylesheet" href="\/css\/styles\.css(?:\?[^"]*)?">/, '<link rel="stylesheet" href="/css/styles.css?v=' + v + '">');
  // scripts compartidos y de tool
  txt = txt.replace(/(<script src="\/js\/(?:components|tools-data|home)\.js)(?:\?[^"]*)?(")/g, '$1?v=' + v + '$2');
  txt = txt.replace(/(<script src="\/js\/tools\/[a-z0-9-]+\.js)(?:\?[^"]*)?(")/g, '$1?v=' + v + '$2');
  if (txt !== orig) { fs.writeFileSync(file, txt, 'utf8'); changed++; }
});
console.log('Version ' + v + ' aplicada a ' + changed + ' paginas');

// Service worker: actualizar CACHE_NAME (pp-vN) para invalidar la cache versionada
if (fs.existsSync('sw.js')) {
  let sw = fs.readFileSync('sw.js', 'utf8');
  const origSw = sw;
  sw = sw.replace(/(var CACHE_NAME\s*=\s*')pp-v\d+(')/, '$1pp-v' + v + '$2');
  if (sw !== origSw) {
    fs.writeFileSync('sw.js', sw, 'utf8');
    console.log('SW CACHE_NAME -> pp-v' + v);
  } else {
    console.log('SW CACHE_NAME sin cambios (patron no encontrado o ya en pp-v' + v + ')');
  }
}
