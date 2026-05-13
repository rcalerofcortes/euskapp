# Cómo Actualizar EuskApp en GitHub Pages

## 🚀 Proceso completo de actualización

### 1. Hacer cambios en el código
Edita los archivos que necesites (data.js, estilos, funcionalidades, etc.)

### 2. Subir cambios a GitHub
```bash
git add .
git commit -m "Update: descripción de los cambios"
git push
```

### 3. GitHub Pages se actualiza automáticamente
- Espera 1-2 minutos
- GitHub Pages despliega automáticamente

### 4. En el móvil - Actualización manual
Los usuarios necesitan actualizar manualmente:

**Opción 1: Forzar recarga**
1. Abre la app
2. Cierra completamente la app (desliza hacia arriba)
3. Vuelve a abrir la app
4. Si no se actualiza, ve a Opción 2

**Opción 2: Limpiar caché**
- **En iOS (Safari)**:
  1. Configuración → Safari
  2. Avanzado → Datos de sitios web
  3. Eliminar datos de tu sitio
  
- **En Android (Chrome)**:
  1. Chrome → Configuración
  2. Privacidad → Borrar datos de navegación
  3. Caché → Borrar

**Opción 3: Reinstalar (más drástico)**
1. Desinstala la app (mantén presionado el ícono)
2. Ve a tu sitio en el navegador
3. Añade a pantalla de inicio de nuevo

## 📝 Notas importantes

- Las actualizaciones NO son automáticas
- Los usuarios deben refrescar manualmente
- Los datos del usuario se mantienen (localStorage)
- La mayoría de veces basta con cerrar y reabrir la app

## 🎯 Ejemplo de flujo completo

```bash
# 1. Haces cambios en data.js
# 2. Subes los cambios
git add .
git commit -m "Add new phrases"
git push

# 3. Esperas 2 minutos
# 4. En el móvil: cierras la app completamente y la vuelves a abrir
```

## ✅ Recomendación

Para cambios importantes, avisa a los usuarios que:
- Cierren la app completamente
- La vuelvan a abrir
- Si no ven los cambios, limpien la caché del navegador
