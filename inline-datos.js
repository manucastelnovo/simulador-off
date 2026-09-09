/*
 * Rebuilds the inlined data block in assets/simulador/app.html.
 *
 * app.html embeds window.__INLINED_CONSTANTS__ and window.__INLINED_DATA__ so
 * js/palier.js can skip the fetch of constants/ and datos/ on startup. Editing
 * the JSON files on disk is not enough: without regenerating this block the app
 * keeps rendering the previous election.
 *
 * Usage: node inline-datos.js [ubicacion]   (defaults to UBICACION below)
 */
const fs = require('fs');
const path = require('path');

const UBICACION = process.argv[2] || '59.7.1';
const ASSETS = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets', 'simulador');
const APP_HTML = path.join(ASSETS, 'app.html');
const DATA_KEYS = ['categorias', 'candidaturas', 'agrupaciones', 'boletas'];
const DATA_FILES = ['Categorias', 'Candidaturas', 'Agrupaciones', 'Boletas'];
const BLOCK_RE = /^<script>window\.__INLINED_CONSTANTS__=.*<\/script>$/m;

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
}

const constants = readJson(path.join(ASSETS, 'constants', UBICACION + '.json'));
const datos = DATA_FILES.map((name) =>
  readJson(path.join(ASSETS, 'datos', UBICACION, name + '.json'))
);

const inlinedData = DATA_KEYS.map((key, i) => key + ':' + JSON.stringify(datos[i])).join(',');
const block =
  '<script>window.__INLINED_CONSTANTS__=' +
  JSON.stringify(constants) +
  ';window.__INLINED_DATA__={' +
  inlinedData +
  '};</script>';

const html = fs.readFileSync(APP_HTML, 'utf8');
if (!BLOCK_RE.test(html)) {
  console.error('Inlined block not found in app.html — aborting so the patches are not lost.');
  process.exit(1);
}

fs.writeFileSync(APP_HTML, html.replace(BLOCK_RE, block), 'utf8');
console.log(`Inlined ${UBICACION}: ${block.length} chars`);
DATA_KEYS.forEach((key, i) => console.log(`  ${key}: ${datos[i].length} items`));
