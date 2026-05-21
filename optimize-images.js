const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets', 'simulador', 'imagenes_candidaturas');
const QUALITY = 50;
const MAX_WIDTH = 150;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.toLowerCase().endsWith('.webp')) out.push(p);
  }
  return out;
}

(async () => {
  const files = walk(ROOT);
  console.log(`Found ${files.length} webp files`);

  let sizeBefore = 0, sizeAfter = 0, processed = 0, errors = 0, skipped = 0;
  const start = Date.now();

  for (const f of files) {
    let input;
    try {
      input = fs.readFileSync(f);
    } catch (e) {
      errors++;
      if (errors < 3) console.log(`  read error ${path.basename(f)}: ${e.message}`);
      continue;
    }
    sizeBefore += input.length;

    try {
      const out = await sharp(input)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toBuffer();
      if (out.length < input.length) {
        fs.writeFileSync(f, out);
        sizeAfter += out.length;
      } else {
        sizeAfter += input.length;
        skipped++;
      }
      processed++;
      if (processed % 2000 === 0) {
        const pct = (processed / files.length * 100).toFixed(1);
        const elapsed = ((Date.now() - start) / 1000).toFixed(0);
        console.log(`  ${processed}/${files.length} (${pct}%) - elapsed ${elapsed}s`);
      }
    } catch (e) {
      errors++;
      sizeAfter += input.length;
      if (errors < 3) console.log(`  proc error ${path.basename(f)}: ${e.message}`);
    }
  }

  const mbBefore = (sizeBefore / 1024 / 1024).toFixed(1);
  const mbAfter = (sizeAfter / 1024 / 1024).toFixed(1);
  console.log(`\nDone in ${((Date.now() - start) / 1000).toFixed(0)}s`);
  console.log(`Before: ${mbBefore} MB, After: ${mbAfter} MB, Saved: ${(mbBefore - mbAfter).toFixed(1)} MB`);
  console.log(`Processed: ${processed}, Skipped (no improvement): ${skipped}, Errors: ${errors}`);
})();
