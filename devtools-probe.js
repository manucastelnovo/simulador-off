const WebSocket = require('ws');
const http = require('http');

function getPages() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const pages = await getPages();
  const page = pages[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve) => {
      id++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  await new Promise((r) => ws.once('open', r));
  await send('Runtime.enable');

  console.log('--- Try XHR from iframe ---');
  const xhrTest = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const f = document.querySelector('iframe');
        const w = f.contentWindow;
        return await new Promise((resolve) => {
          try {
            const xhr = new w.XMLHttpRequest();
            xhr.open('GET', 'constants/261.1.1.json', true);
            xhr.onload = () => resolve({ ok: true, status: xhr.status, len: xhr.responseText.length, first200: xhr.responseText.slice(0, 200) });
            xhr.onerror = () => resolve({ ok: false, status: xhr.status, statusText: xhr.statusText, errMsg: 'onerror' });
            xhr.send();
            setTimeout(() => resolve({ ok: false, msg: 'timeout' }), 5000);
          } catch (e) {
            resolve({ ok: false, error: e.message });
          }
        });
      })()
    `,
    awaitPromise: true,
    returnByValue: true,
  });
  if (xhrTest.result.exceptionDetails) console.log('EX:', xhrTest.result.exceptionDetails.text);
  else console.log(JSON.stringify(xhrTest.result.result.value, null, 2));

  console.log('\n--- Try fetch from iframe with various URL forms ---');
  const fetchTests = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const f = document.querySelector('iframe');
        const w = f.contentWindow;
        const results = {};
        for (const url of [
          'constants/261.1.1.json',
          './constants/261.1.1.json',
          '/constants/261.1.1.json',
          'file:///android_asset/simulador/constants/261.1.1.json',
        ]) {
          try {
            const r = await w.fetch(url);
            results[url] = { ok: r.ok, status: r.status };
          } catch (e) {
            results[url] = { error: e.message };
          }
        }
        return results;
      })()
    `,
    awaitPromise: true,
    returnByValue: true,
  });
  if (fetchTests.result.exceptionDetails) console.log('EX:', fetchTests.result.exceptionDetails.text);
  else console.log(JSON.stringify(fetchTests.result.result.value, null, 2));

  ws.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
