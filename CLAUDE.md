# SimuladorOffline (Android)

React Native 0.85 wrapper around an existing **Electron** voting-machine simulator (Paraguay, "Simulador de la Boleta Única Electrónica"). The whole UI is the original HTML/CSS/JS app rendered inside `react-native-webview` from `file:///android_asset/simulador/index.html`. There is **no native UI** — `App.tsx` is just the WebView shell.

## Why this path is `C:\dev\SimuOff` (not OneDrive)

Windows MAX_PATH (260 chars) breaks the NDK/ninja step of the Android build when the project lives under the original OneDrive path. The RN project was moved here on purpose. Do not move it back.

The **original Electron source** is preserved at:
```
C:\Users\manue\OneDrive\Desktop\proyect-claude\simuoffwind\simulador_offline_windows_oficial\simulador_offline-win32-ia32\resources\app\simulador\
```
Use it as the source of truth if you need to re-copy assets after a simulator update — but re-apply the patches in `app.html` (below) every time.

## Critical patches to `simulador/app.html` (do NOT lose these on re-copy)

Two non-obvious fixes live at the top of `android/app/src/main/assets/simulador/app.html`. Without them the candidate-selection screen is **blank**.

1. **fetch → XHR shim**. The Amazon Fire WebView (Chromium 104) blocks `fetch()` for `file://` URLs inside the iframe (`sufragio.html` loads `app.html` in a sandboxed iframe). XHR still works. A shim at the top of `app.html` reroutes file/relative-URL `fetch()` calls through XHR.
2. **Static flavor CSS + visibility gate**. The original code injects the flavor CSS dynamically *after* fetches resolve, causing a long FOUC because the chipa CSS is ~12 MB. Fix: preload `flavors/chipa/sufragio/flavor.css` as a static `<link>` in `<head>`, hide `html,body` with `visibility:hidden`, and reveal once a `MutationObserver` sees the flavor class added to `<body>` (4 s safety fallback).

Both blocks are in `app.html` between `<title>` and the existing scripts. If you re-copy `app.html` from the original source, re-insert them.

## Active flavor

Only one flavor is in use: **chipa**. Verified by `grep '"flavor":' constants/*.json | sort -u`. The 5 other flavors (empanada, medialuna, milanga, soja, vanilla) were deleted from `assets/simulador/flavors/` to save ~14 MB. Vanilla appears as `<body class="vanilla">` in the welcome HTML but `constants.flavor` from each `constants/<ubicacion>.json` overrides it on the sufragio screen.

## Asset optimizations already applied

Net APK size: **229 MB → 114.7 MB**. Applied to `android/app/src/main/assets/simulador/`:

- **JSON minification** (~54 MB saved): all 8k+ JSONs reparsed and rewritten with `ConvertTo-Json -Compress`. Deep-equality verified vs originals.
- **Unused flavors deleted** (~14 MB).
- **`datos/Planillas.json` deleted** (~33 MB): referenced only by the service-worker cache manifest, no JS code uses it.
- **webp recompression** (~43 MB saved): `optimize-images.js` at project root uses `sharp` to resize candidatura images to 150px max width and re-encode at q=50. Re-run with `node optimize-images.js` after any image re-copy. NOTE: must use `fs.readFileSync` + `sharp(buffer)` form — the path-based form fails on Windows in long batches.
- **chipa flavor.css** lightly minified (~1 MB saved).

## Build & install

```powershell
cd C:\dev\SimuOff\android
.\gradlew.bat assembleRelease --no-daemon
```

Output: `android/app/build/outputs/apk/release/app-release.apk`.

Signing: uses the auto-generated `debug.keystore` (RN init default). Fine for sideload; for Play Store, generate a real keystore and update the `release` block in `app/build.gradle`.

Install on a connected device:
```powershell
C:\Android\Sdk\platform-tools\adb.exe install -r android\app\build\outputs\apk\release\app-release.apk
```

Manifest sets `android:screenOrientation="landscape"` to match the desktop layout.

## Tested device

Amazon Fire tablet (model KFMUWI, Fire OS / Android 9 base) running Amazon's bundled `com.amazon.webview.chromium` v104. The fetch-shim is required *because* of this WebView — newer/Google WebViews probably don't need it, but leave the shim in: it's harmless on modern WebViews (it only intercepts `file://`/relative URLs).

## Debug instrumentation (removed from prod build)

`App.tsx` is currently the minimal WebView wrapper. To diagnose a WebView issue, temporarily re-add:

- `webviewDebuggingEnabled` prop on `<WebView>`
- `injectedJavaScriptBeforeContentLoaded` with a bridge that posts `window.onerror` / `unhandledrejection` / `console.error` back via `ReactNativeWebView.postMessage`
- `onMessage={e => console.log('[WV]', e.nativeEvent.data)}`

Then connect via DevTools:
```powershell
$pid = (C:\Android\Sdk\platform-tools\adb.exe shell pidof com.simuladoroffline)
C:\Android\Sdk\platform-tools\adb.exe forward tcp:9222 localabstract:webview_devtools_remote_$pid
# open chrome://inspect on PC, or query http://localhost:9222/json
```

`devtools-probe.js` at project root is a Node script using `ws` to evaluate JS inside the page via the DevTools protocol — useful because the iframe and the parent share a single page target in this Chromium build, so iframe state must be accessed via `document.querySelector('iframe').contentWindow`.

## Files at project root (non-RN-template)

- `App.tsx` — WebView shell. Keep minimal.
- `optimize-images.js` — webp batch compression script.
- `devtools-probe.js` — DevTools protocol probe for debugging WebView state.
- `build-*.log` — gradle output logs from past builds. Safe to delete.

## Things NOT to do

- Don't `npm install` random RN packages. The whole UI is a WebView; everything else is dead weight.
- Don't move the project back into OneDrive or any long path.
- Don't delete `flavors/chipa/` — `constants.flavor === "chipa"` everywhere.
- Don't switch the WebView source away from `file:///android_asset/` without also rewriting the asset paths used by the simulator JS (relative paths assume that root).
