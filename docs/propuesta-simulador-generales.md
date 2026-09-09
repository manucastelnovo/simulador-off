# Propuesta de Desarrollo — Simulador de Votación (Elecciones Generales)

**Proyecto:** Actualización del simulador offline de la Boleta Única Electrónica (BUE) para las **elecciones municipales generales**
**Cliente:** [Nombre del cliente]
**Preparado por:** [Tu nombre]
**Contacto:** [tu correo / teléfono]
**Fecha:** ____ / ____ / 2026
**Validez de la propuesta:** 15 días

---

## 1. Resumen del proyecto

Actualmente existe una aplicación Android que replica el simulador oficial de la
máquina de votación de la Justicia Electoral y funciona **100% sin conexión a
internet**, pensada para capacitación ciudadana en tablets.

Esa versión está configurada para las **internas partidarias**: el encabezado
muestra el nombre del partido, y las agrupaciones que aparecen en la pantalla de
votación son **movimientos internos** (por ejemplo, listas numeradas dentro de un
mismo partido).

Esta propuesta cubre la **actualización de la aplicación a las elecciones
generales**, donde el elector ya no elige entre movimientos de un partido, sino
entre **partidos políticos, alianzas y concertaciones**, con la identidad visual
oficial de la Justicia Electoral.

Se mantiene todo lo que ya funciona: operación offline, orientación horizontal,
flujo idéntico al simulador oficial y rendimiento optimizado para tablets.

---

## 2. Alcance del trabajo (entregables)

### 2.1 Motor de datos electorales
- Armado del **nuevo juego de datos de elecciones generales**, reemplazando el
  actual de internas.
- Conversión de las agrupaciones de **movimientos internos** a **partidos,
  alianzas y concertaciones**, con su código, número de lista, nombre completo y
  nombre corto.
- Reconstrucción de las boletas: combinaciones válidas por categoría, lista
  completa y voto en blanco.
- Categorías electivas: **Intendente Municipal** y **Junta Municipal**,
  conservando el **voto preferente** en Junta y sus validaciones.

### 2.2 Identidad visual
- Cambio del encabezado de la pantalla: pasa del nombre del partido a la
  identidad de la **Justicia Electoral / República del Paraguay**.
- Incorporación de **colores y logotipos propios de cada partido o alianza**.
  (Hoy todas las listas usan un mismo marcador genérico en blanco y negro.)
- Actualización de la fecha de la elección y de los textos de las pantallas de
  apertura, recuento y transmisión.

### 2.3 Candidatos e imágenes
- Carga de las fotografías de los candidatos a Intendente por agrupación.
- Optimización automática de las imágenes para mantener el tamaño de la
  aplicación bajo control (proceso ya implementado y reutilizable).

### 2.4 Cobertura territorial
- La aplicación se entrega configurada para **un (1) distrito**, igual que la
  versión actual.
- Distritos adicionales pueden incorporarse y se cotizan aparte (ver sección 3).

### 2.5 Empaquetado y pruebas
- Generación del **APK de instalación** listo para distribuir, firmado y
  optimizado.
- Verificación de funcionamiento **sin conexión a internet**, en modo horizontal.
- Pruebas en la tablet objetivo del cliente y ajustes de compatibilidad.
- Instrucciones de instalación para el equipo del cliente.

---

## 3. No incluye (fuera de alcance)

Los siguientes puntos no están contemplados en este valor y pueden cotizarse aparte:

- **Distritos adicionales** al distrito incluido.
- **Categorías electivas distintas** a Intendente y Junta Municipal
  (por ejemplo, Gobernador, Junta Departamental, cargos nacionales).
- Digitalización manual de datos que el cliente no entregue en formato utilizable.
- Fotografías de los candidatos (las provee el cliente).
- Publicación en Google Play: se entrega el archivo de instalación para carga
  directa en las tablets.
- Versión para iPhone/iPad.
- Provisión de tablets u otro hardware.
- Nuevas funcionalidades no descritas en la sección 2.

---

## 4. Cronograma estimado

Duración total aproximada: **4 semanas (1 mes)** desde el pago inicial y la
entrega de los datos oficiales por parte del cliente.

| Semana | Etapa |
|-------|-------|
| 1 | Relevamiento de los datos oficiales de generales y armado del nuevo juego de datos |
| 2 | Adaptación del motor: partidos y alianzas, boletas, voto preferente y validaciones |
| 3 | Identidad visual, logotipos, imágenes de candidatos y optimización |
| 4 | Generación del instalador, pruebas en tablet, ajustes y entrega |

---

## 5. Inversión

| Concepto | Valor |
|----------|------:|
| Actualización completa del simulador a elecciones generales (un distrito), pruebas y entrega | **USD 1.600** |
| **Total** | **USD 1.600** |

*Valores en dólares estadounidenses (USD).*

### Forma de pago
- **50% al inicio** (USD 800) para comenzar el trabajo.
- **50% a la entrega** (USD 800) contra la entrega del instalador funcionando.

---

## 6. Requisitos a cargo del cliente

Para poder ejecutar el trabajo en el plazo indicado, el cliente entrega al inicio:

- Listado oficial de **partidos, alianzas y concertaciones** habilitados, con su
  número de lista.
- Nómina de **candidatos a Intendente y a Junta Municipal** por agrupación.
- **Logotipos** de las agrupaciones y **fotografías** de los candidatos.
- **Distrito** a configurar y fecha oficial de la elección.
- **Tablet de prueba** o su modelo exacto, para validar compatibilidad.

*Retrasos en la entrega de estos materiales pueden extender el cronograma.*

---

## 7. Condiciones

- **Revisiones:** se incluyen hasta **2 rondas de ajustes** sobre lo entregado.
  Cambios de alcance mayores se cotizan por separado.
- **Soporte post-entrega:** **15 días** de soporte para corrección de errores sin costo.
- **Mantenimiento posterior:** opcional, mediante acuerdo aparte.
- **Actualizaciones de datos** posteriores a la entrega (cambios de candidatos,
  correcciones de listas) se cotizan por separado.
- **Propiedad:** al completarse el pago total, la aplicación y su contenido pasan
  a ser propiedad del cliente.

---

## 8. Aceptación

En señal de conformidad con el alcance, valores y condiciones aquí descritos:

| | |
|---|---|
| **Cliente:** ______________________ | **Proveedor:** ______________________ |
| Nombre: [Nombre del cliente] | Nombre: [Tu nombre] |
| Fecha: ____ / ____ / 2026 | Fecha: ____ / ____ / 2026 |

---

*Gracias por la confianza. Quedo atento a cualquier consulta.*
