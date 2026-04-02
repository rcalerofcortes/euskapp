# Cómo Actualizar EuskApp en GitHub Pages

## 🚀 Proceso completo de actualización

### 1. Hacer cambios en el código
Edita los archivos que necesites (data.js, estilos, funcionalidades, etc.)

### 2. Actualizar la versión del Service Worker
**IMPORTANTE:** Cada vez que hagas cambios, actualiza la versión en `service-worker.js`:

```javascript
// Cambia esto cada vez que actualices:
const CACHE_NAME = 'euskapp-v1.0.1'; // v1.0.0 -> v1.0.1 -> v1.0.2, etc.
```

### 3. Subir cambios a GitHub
```bash
git add .
git commit -m "Update: descripción de los cambios"
git push
```

### 4. GitHub Pages se actualiza automáticamente
- Espera 1-2 minutos
- GitHub Pages despliega automáticamente

### 5. En el móvil
Los usuarios verán automáticamente un banner verde:
> **🎉 New version available!**  
> [Update Now]

Al hacer click en "Update Now":
- La app se actualiza automáticamente
- Se recarga con la nueva versión
- ¡Listo!

## 📱 Si no ves el banner de actualización

1. **Cierra completamente la app** (desliza hacia arriba)
2. Abre la app de nuevo
3. Espera 5-10 segundos
4. El banner debería aparecer

## 🔧 Forzar actualización manual

Si necesitas forzar la actualización:

1. Abre la app
2. Abre las herramientas de desarrollo (si es posible)
3. Ve a Application > Service Workers
4. Click en "Update" o "Unregister"
5. Recarga la página

## 📝 Notas importantes

- **Siempre** cambia la versión en `service-worker.js` antes de hacer push
- Los usuarios **NO** necesitan desinstalar y reinstalar la app
- La actualización es automática y transparente
- Los datos del usuario (progreso, frases personalizadas) se mantienen

## 🎯 Ejemplo de flujo completo

```bash
# 1. Haces cambios en data.js
# 2. Actualizas service-worker.js (v1.0.0 -> v1.0.1)
# 3. Subes los cambios
git add .
git commit -m "Add new phrases"
git push

# 4. Esperas 2 minutos
# 5. Los usuarios ven el banner y actualizan con 1 click
```

## ✅ Ventajas del sistema actual

- ✅ Actualización automática
- ✅ No requiere reinstalación
- ✅ Mantiene datos del usuario
- ✅ Funciona offline después de la primera carga
- ✅ Banner visual de actualización
- ✅ Control total de versiones
