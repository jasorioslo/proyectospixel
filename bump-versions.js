// Bumper de versiones de assets — subir V bump misivo cuando cambien JS/CSS
// Uso: node pp-bump.js 9
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
