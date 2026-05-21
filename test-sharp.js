const sharp = require('sharp');
const fs = require('fs');

const f = 'C:/dev/SimuOff/android/app/src/main/assets/simulador/imagenes_candidaturas/paraguay_internas_municipales_2026/1.0.webp';

console.log('Sharp version:', sharp.versions);
console.log('libvips formats:', Object.keys(sharp.format).filter(k => sharp.format[k].input.file));

// Try 1: path
sharp(f).metadata()
  .then(m => console.log('Path-based OK:', m))
  .catch(e => console.log('Path-based FAIL:', e.message));

// Try 2: buffer
const buf = fs.readFileSync(f);
console.log('Buffer size:', buf.length);
sharp(buf).metadata()
  .then(m => console.log('Buffer-based OK:', m))
  .catch(e => console.log('Buffer-based FAIL:', e.message));
