# 📱 Guía para Construir y Actualizar la App Móvil

## 🚨 ERROR 404 NOT FOUND - SOLUCIÓN

El error 404 en la app móvil significa que los archivos no están sincronizados con Capacitor.

---

## 🔄 PASOS PARA ACTUALIZAR LA APP:

### 1. Sincronizar archivos con Capacitor

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npx cap sync
```

Esto copiará todos los archivos web (HTML, JS, CSS) a las carpetas de Android/iOS.

### 2. Si el comando anterior da error, instala Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### 3. Si no tienes `package.json`, créalo:

```bash
npm init -y
```

Luego instala Capacitor (paso 2) y sincroniza (paso 1).

### 4. Abre el proyecto en Android Studio:

```bash
npx cap open android
```

### 5. En Android Studio:

1. Espera a que Gradle termine de sincronizar (barra inferior)
2. Ve a **Build** → **Clean Project**
3. Ve a **Build** → **Rebuild Project**
4. Conecta tu dispositivo o usa un emulador
5. Clic en el botón **Run** (triángulo verde)

---

## ⚡ COMANDOS RÁPIDOS (copia y pega):

### Para actualizar la app después de cambios en el código:

```bash
npx cap sync
npx cap open android
```

### Para ver logs en tiempo real (debugging):

```bash
npx cap run android -l
```

---

## 🐛 Si TODAVÍA muestra 404:

### Opción 1: Limpiar cache de Capacitor

```bash
npx cap sync --force
```

### Opción 2: Eliminar y reinstalar

```bash
# Eliminar carpeta android
rm -rf android

# O en Windows:
# rmdir /s /q android

# Agregar plataforma de nuevo
npx cap add android

# Sincronizar
npx cap sync
```

### Opción 3: Verificar que index.html está en la raíz

Asegúrate de que estos archivos estén en la carpeta raíz:
- ✅ index.html
- ✅ styles.css
- ✅ manifest.json
- ✅ capacitor.config.json o capacitor.json
- ✅ Carpeta `js/` con todos los archivos

---

## 📝 IMPORTANTE para Supabase en Móvil

### Permisos de Internet (Android)

Asegúrate de que el archivo `android/app/src/main/AndroidManifest.xml` tenga:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Cleartext Traffic (para desarrollo)

En el mismo archivo, dentro de `<application>`:

```xml
android:usesCleartextTraffic="true"
```

---

## 🎯 FLUJO COMPLETO de Desarrollo:

1. **Haces cambios en el código** (HTML, JS, CSS)
2. **Sincronizas**: `npx cap sync`
3. **Abres Android Studio**: `npx cap open android`
4. **Reconstruyes**: Build → Rebuild Project
5. **Instalas en el dispositivo**: Click en Run

---

## 🔍 Verificar que está funcionando:

### En Android Studio, abre Logcat y busca:

- ✅ "Supabase client created successfully"
- ✅ "Loaded X phrases from Supabase"
- ✅ "App initialized successfully"

Si ves estos mensajes, la app está funcionando correctamente.

---

## 💡 TIPS:

- Usa `npx cap sync` cada vez que hagas cambios en archivos web
- Usa Android Studio's "Invalidate Caches / Restart" si algo se queda atascado
- Mantén Chrome abierto con `chrome://inspect` para ver logs de la WebView
- Para iOS: `npx cap open ios` (necesitas macOS)

---

## 🆘 Si nada funciona:

1. Elimina las carpetas `android` y `ios`
2. Ejecuta:
```bash
npx cap add android
npx cap sync
npx cap open android
```
3. En Android Studio, limpia y reconstruye el proyecto
