# 📱 Cómo usar EuskApp desde el móvil

Tu app ya está lista para funcionar desde el móvil porque usa **Supabase** (base de datos en la nube). Cualquier cambio se guarda automáticamente en la nube.

## 🌟 OPCIÓN 1: Desplegar en Vercel (RECOMENDADO - GRATIS)

**¿Por qué Vercel?**
- ✅ 100% GRATIS
- ✅ Se despliega en 2 minutos
- ✅ Tu app tendrá una URL pública (ej: euskapp.vercel.app)
- ✅ Funciona desde cualquier móvil/tablet/PC
- ✅ HTTPS automático (seguro)
- ✅ Actualizaciones automáticas cuando subas cambios

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a: https://vercel.com
   - Clic en "Sign Up" → Usa tu cuenta de GitHub (o crea una)

2. **Conectar tu proyecto**
   - Si tu proyecto está en GitHub:
     - Clic en "Add New..." → "Project"
     - Selecciona tu repositorio `euskapp`
     - Clic en "Deploy"
     - ¡Listo! Te dará una URL como: `https://euskapp.vercel.app`
   
   - Si NO está en GitHub:
     - Instala Vercel CLI:
       ```bash
       npm install -g vercel
       ```
     - En la terminal, navega a tu carpeta:
       ```bash
       cd C:\Users\29851\repos\euskapp
       vercel
       ```
     - Sigue las instrucciones (presiona Enter en todo)
     - Te dará una URL pública

3. **Usar desde el móvil**
   - Abre la URL en tu móvil (ej: euskapp.vercel.app)
   - ¡Ya puedes crear cuenta y agregar frases!
   - Todo se guarda en Supabase automáticamente

---

## 🏠 OPCIÓN 2: Red Local WiFi (Temporal - Para probar)

Si tu móvil y PC están en la misma WiFi, puedes acceder sin desplegar.

### Pasos:

1. **Obtener tu IP local**
   - Abre CMD o Terminal
   - Escribe: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
   - Busca tu IP local (algo como: `192.168.1.100`)

2. **Iniciar el servidor**
   - Ejecuta `START_SERVER.bat` como siempre
   - Pero ahora, en tu móvil, abre:
     ```
     http://192.168.1.100:8000
     ```
     (Reemplaza con tu IP real)

**Limitaciones:**
- ⚠️ Solo funciona si móvil y PC están en la misma WiFi
- ⚠️ Debes tener la PC encendida y el servidor corriendo
- ⚠️ No funciona fuera de casa

---

## 📱 OPCIÓN 3: App Móvil Nativa (iOS/Android)

Tu proyecto YA TIENE Capacitor configurado para crear apps nativas.

### Pasos:

1. **Instalar dependencias**
   ```bash
   cd C:\Users\29851\repos\euskapp
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android @capacitor/ios
   ```

2. **Inicializar Capacitor** (si no está inicializado)
   ```bash
   npx cap init "EuskApp" "com.euskapp.app"
   ```

3. **Agregar plataformas**
   
   Para Android:
   ```bash
   npx cap add android
   npx cap sync
   npx cap open android
   ```
   
   Para iOS (solo en Mac):
   ```bash
   npx cap add ios
   npx cap sync
   npx cap open ios
   ```

4. **Compilar y probar**
   - Se abrirá Android Studio o Xcode
   - Conecta tu móvil o usa un emulador
   - Dale a "Run" para instalar la app

5. **Publicar en las tiendas**
   - **Google Play**: Sigue la guía oficial de Android
   - **App Store**: Necesitas una cuenta de desarrollador de Apple ($99/año)

---

## 🎯 ¿Cuál opción elegir?

| Opción | Mejor para | Tiempo | Costo |
|--------|-----------|--------|-------|
| **Vercel** | Uso diario desde cualquier dispositivo | 5 min | Gratis |
| **Red Local** | Solo para probar rápidamente | 2 min | Gratis |
| **App Nativa** | Publicar en Play Store/App Store | 1-2 horas | Gratis (Play $25 una vez, App Store $99/año) |

---

## 💡 Recomendación

1. **Ahora mismo**: Despliega en **Vercel** (5 minutos)
   - Es gratis
   - Tendrás una URL profesional
   - Funciona desde cualquier dispositivo
   - Todo se guarda en Supabase

2. **Más adelante**: Si quieres estar en las tiendas oficiales, usa **Capacitor**

---

## 🔧 Ayuda Rápida

### Si usas Vercel:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
cd C:\Users\29851\repos\euskapp
vercel

# Seguir instrucciones en pantalla
# Te dará una URL como: https://euskapp-xxxx.vercel.app
```

### Si usas GitHub + Vercel (sin terminal):
1. Sube tu proyecto a GitHub
2. Ve a vercel.com → "Import Project"
3. Selecciona tu repositorio
4. ¡Listo!

---

## ✅ Ventajas de usar Supabase (ya lo tienes)

- ✅ Funciona desde CUALQUIER dispositivo (PC, móvil, tablet)
- ✅ Los datos se sincronizan automáticamente
- ✅ Puedes agregar frases desde el móvil y verlas en la PC
- ✅ Multi-usuario: varios pueden usar la app al mismo tiempo
- ✅ Backups automáticos en Supabase

---

## 🆘 ¿Problemas?

**"No tengo GitHub"**
- Usa Vercel CLI (instrucciones arriba)
- O crea una cuenta gratis en github.com

**"Quiero una URL personalizada"**
- Vercel te deja configurar dominios personalizados gratis
- Ej: `euskapp.com` o `aprendeuskera.com`

**"¿Cuánto cuesta Vercel?"**
- Plan gratuito es más que suficiente
- 100GB de ancho de banda/mes
- Ilimitados despliegues

**"Quiero la app en Play Store"**
- Usa Capacitor (Opción 3)
- Costo: $25 una sola vez para Google Play
- Costo: $99/año para App Store

---

¿Quieres que te ayude con alguna opción en específico? 🚀
