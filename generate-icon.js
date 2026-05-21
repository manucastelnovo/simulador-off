const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'android/app/src/main/assets/simulador/img/logo_eleccion.png');
const RES = path.join(__dirname, 'android/app/src/main/res');

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

async function makeIcon(size, outPath) {
  // Fit the wide logo into a square with white background, leaving a small margin.
  const logoTarget = Math.round(size * 0.92);
  const logo = await sharp(fs.readFileSync(SRC))
    .resize({ width: logoTarget, height: logoTarget, fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

(async () => {
  for (const [folder, size] of Object.entries(sizes)) {
    const dir = path.join(RES, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await makeIcon(size, path.join(dir, 'ic_launcher.png'));
    await makeIcon(size, path.join(dir, 'ic_launcher_round.png'));
    console.log(`wrote ${folder} (${size}x${size})`);
  }
})();
