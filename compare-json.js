const fs = require('fs');

const orig = 'C:/Users/manue/OneDrive/Desktop/proyect-claude/simuoffwind/simulador_offline_windows_oficial/simulador_offline-win32-ia32/resources/app/simulador';
const mini = 'C:/dev/SimuOff/android/app/src/main/assets/simulador';

const SAMPLES = [
  'ubicaciones.json',
  'datos/260.0.0.1/Candidaturas.json',
  'datos/260.0.0.1/Categorias.json',
  'datos/260.0.0.1/Agrupaciones.json',
  'datos/260.0.0.1/Boletas.json',
  'constants/260.0.0.1.json',
];

function loadJSON(p) {
  try {
    const txt = fs.readFileSync(p, 'utf8');
    return { ok: true, txt, obj: JSON.parse(txt) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function deepEqual(a, b, path = '$') {
  if (a === b) return null;
  if (typeof a !== typeof b) return `${path}: type mismatch ${typeof a} vs ${typeof b}`;
  if (typeof a === 'number' && typeof b === 'number') {
    if (a !== b) return `${path}: ${a} != ${b}`;
    return null;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return `${path}: array vs non-array`;
    if (a.length !== b.length) return `${path}: length ${a.length} vs ${b.length}`;
    for (let i = 0; i < a.length; i++) {
      const d = deepEqual(a[i], b[i], `${path}[${i}]`);
      if (d) return d;
    }
    return null;
  }
  if (a && typeof a === 'object') {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.length !== kb.length) return `${path}: key count ${ka.length} vs ${kb.length}`;
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return `${path}: key mismatch ${ka[i]} vs ${kb[i]}`;
      const d = deepEqual(a[ka[i]], b[ka[i]], `${path}.${ka[i]}`);
      if (d) return d;
    }
    return null;
  }
  return `${path}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`;
}

for (const s of SAMPLES) {
  const o = loadJSON(`${orig}/${s}`);
  const m = loadJSON(`${mini}/${s}`);
  if (!o.ok) { console.log(`${s}: ORIG load fail: ${o.error}`); continue; }
  if (!m.ok) { console.log(`${s}: MINI load fail: ${m.error}`); continue; }
  const sizeOrig = o.txt.length;
  const sizeMini = m.txt.length;
  const diff = deepEqual(o.obj, m.obj);
  if (diff) {
    console.log(`${s}: ❌ ${diff} | size ${sizeOrig} → ${sizeMini}`);
  } else {
    console.log(`${s}: ✅ identical | size ${sizeOrig} → ${sizeMini} (${((1 - sizeMini/sizeOrig) * 100).toFixed(0)}% smaller)`);
  }
}
