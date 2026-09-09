import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const UBICACION = '59.7.1';

const PRESET_LOCALSTORAGE = `
  try {
    localStorage.setItem('ub_eleccion',     'ELECCIONES MUNICIPALES');
    localStorage.setItem('ub_departamento', '7-ITAPUA');
    localStorage.setItem('ub_distrito',     '1-ALTO VERA');
    localStorage.setItem('ub_localidad',    '0-ALTO VERA');
    localStorage.setItem('ubicacion',       '${UBICACION}');
  } catch (e) {}
  true;
`;

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <View style={styles.container}>
        <WebView
          source={{ uri: `file:///android_asset/simulador/sufragio.html?ubicacion=${UBICACION}` }}
          injectedJavaScriptBeforeContentLoaded={PRESET_LOCALSTORAGE}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          mixedContentMode="always"
          setSupportMultipleWindows={false}
          style={styles.webview}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
