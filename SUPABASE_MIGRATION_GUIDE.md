# Migración a Supabase - Guía de Pruebas

## ⚠️ IMPORTANTE: Cómo Abrir la Aplicación

**NO puedes abrir `index.html` haciendo doble clic.** Los navegadores bloquean JavaScript cuando usas `file://` por seguridad.

### 🚀 Solución Rápida (Recomendada):

1. **Haz doble clic en `START_SERVER.bat`**
2. Se abrirá una ventana negra (déjala abierta)
3. Abre tu navegador en: **http://localhost:8000**
4. ¡Listo!

### 🎨 Alternativa (VS Code):

1. Instala la extensión "Live Server" en VS Code
2. Clic derecho en `index.html` → "Open with Live Server"

Para más opciones, abre el archivo [README_START.html](README_START.html)

---

## ✅ Migración Completada

Tu aplicación EuskApp ha sido migrada exitosamente de localStorage a Supabase. Ahora los datos están en la nube!

## 🔧 Cambios Implementados

### 1. Base de Datos en la Nube
- ✅ Tabla `phrases` - Almacena todas las frases en euskera y castellano
- ✅ Tabla `user_progress` - Progreso individual por frase de cada usuario
- ✅ Tabla `daily_progress` - Estadísticas diarias por usuario
- ✅ Políticas de seguridad (RLS) para proteger datos de usuarios

### 2. Autenticación
- ✅ Sistema de login/registro con **email y contraseña**
- ✅ Autenticación segura mediante Supabase Auth
- ✅ Sesiones persistentes (el usuario permanece logueado)
- ⚠️ **IMPORTANTE**: Ahora se requiere un **email válido** (no solo username)

### 3. Sistema de Progreso
- ✅ Progreso guardado en la nube por frase
- ✅ Estadísticas diarias sincronizadas
- ✅ Vista de frases correctas funcionando con Supabase
- ✅ Cálculo de precisión y estadísticas

### 4. Gestión de Frases
- ✅ Las frases se cargan desde Supabase al iniciar la app
- ✅ Agregar nuevas frases se guarda directamente en la nube
- ✅ Todas las frases están disponibles para todos los usuarios

## 🧪 Cómo Probar la Aplicación

### Paso 1: Abrir la aplicación
1. Abre `index.html` en tu navegador
2. Deberías ver la pantalla de login

### Paso 2: Crear una cuenta
1. Ingresa un **email válido** (ej: `tu@email.com`)
2. Ingresa una **contraseña** (mínimo 6 caracteres)
3. Clic en **"Create Account"**
4. ⚠️ Supabase enviará un email de confirmación
   - **OPCIÓN A**: Revisa tu email y confirma la cuenta
   - **OPCIÓN B**: Si no quieres confirmar, puedes desactivar la confirmación en Supabase:
     - Ve a tu proyecto en Supabase Dashboard
     - Authentication → Email Auth → Desactiva "Enable email confirmations"

### Paso 3: Login
1. Ingresa tu email y contraseña
2. Clic en **"Login"**
3. Deberías ver el menú principal

### Paso 4: Practicar frases
1. Clic en **"Study"** → **"Phrases"**
2. Practica traduciendo las 3 frases iniciales
3. Verifica que se guarde tu progreso (respuestas correctas/incorrectas)

### Paso 5: Ver estadísticas
1. Regresa al menú principal
2. Clic en **"Statistics"**
3. Verifica que aparezcan tus estadísticas del día

### Paso 6: Ver frases correctas
1. Ve a **"Study"** → **"Phrases"**
2. Clic en la pestaña **"My Correct Phrases"**
3. Deberías ver las frases que respondiste correctamente con sus estadísticas

### Paso 7: Agregar una nueva frase
1. Menú principal → **"Add Content"**
2. Rellena los campos:
   - **Spanish**: "Buenos días"
   - **Euskera**: "Egun on"
3. Clic en **"Add Phrase"**
4. La frase debería aparecer en la lista y también estar disponible para practicar

### Paso 8: Cerrar sesión y volver a entrar
1. Clic en **"Logout"**
2. Vuelve a hacer login con tus credenciales
3. Verifica que tu progreso se haya guardado correctamente

## 🐛 Posibles Problemas y Soluciones

### Error: "User not confirmed"
**Causa**: Supabase requiere confirmación de email por defecto
**Solución**: 
1. Ve a Supabase Dashboard → Authentication → Providers → Email
2. Desactiva "Confirm email" para desarrollo
3. O confirma tu email en la bandeja de entrada

### Error: "Invalid login credentials"
**Causa**: Email o contraseña incorrectos
**Solución**: Verifica que estés usando el email correcto y la contraseña exacta

### Error: "Failed to load phrases"
**Causa**: Problema de conexión con Supabase
**Solución**: 
1. Verifica tu conexión a internet
2. Abre la consola del navegador (F12) y revisa los errores
3. Verifica que las credenciales de Supabase en `supabase-client.js` sean correctas

### Las frases no aparecen
**Causa**: No se ejecutó el schema SQL
**Solución**: Ve a Supabase → SQL Editor y ejecuta todo el contenido de `supabase-schema.sql`

### "Error saving progress"
**Causa**: Políticas de seguridad (RLS) o usuario no autenticado
**Solución**: 
1. Verifica que estés logueado
2. Revisa que las políticas RLS se hayan creado correctamente en Supabase

## 📊 Verificar en Supabase Dashboard

Puedes verificar que todo funciona correctamente en Supabase:

1. **Ver usuarios registrados**:
   - Authentication → Users
   - Deberías ver tu email registrado

2. **Ver frases en la base de datos**:
   - Table Editor → phrases
   - Deberías ver las 3 frases iniciales + las que hayas agregado

3. **Ver progreso guardado**:
   - Table Editor → user_progress
   - Deberías ver registros con tus intentos por frase

4. **Ver estadísticas diarias**:
   - Table Editor → daily_progress
   - Deberías ver registro del día de hoy con tus estadísticas

## 🎯 Funcionalidades Probadas

- [x] Registro de usuario con email
- [x] Login y logout
- [x] Carga de frases desde Supabase
- [x] Guardar progreso al practicar
- [x] Ver estadísticas diarias
- [x] Ver frases correctas con porcentaje
- [x] Agregar nuevas frases a la base de datos
- [x] Sesión persistente (quedarse logueado)

## 🚀 Próximos Pasos (Opcionales)

1. **Desactivar confirmación de email** para facilitar desarrollo
2. **Agregar más frases** directamente en Supabase o desde la app
3. **Configurar recuperación de contraseña** (Supabase lo soporta)
4. **Agregar foto de perfil** usando Supabase Storage
5. **Implementar función de reset de progreso** que borre datos de Supabase

## 💡 Notas Importantes

- **Las frases son compartidas**: Todos los usuarios ven las mismas frases
- **El progreso es individual**: Cada usuario tiene su propio progreso
- **Modo offline**: La app requiere conexión a internet para funcionar
- **Seguridad**: Las credenciales de Supabase están en el código cliente (esto es normal para aplicaciones públicas con RLS)

## 📞 Si Encuentras Problemas

1. Abre la **consola del navegador** (F12) y busca errores
2. Revisa que el SQL se haya ejecutado correctamente en Supabase
3. Verifica las credenciales en `js/supabase-client.js`
4. Asegúrate de tener conexión a internet

¡Listo! Tu app ya está en la nube 🎉
