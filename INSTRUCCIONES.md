# ?? INSTRUCCIONES RÁPIDAS - EuskApp

## ? Inicio Rápido (5 segundos)

1. Abre `index.html` en tu navegador (Chrome, Firefox, Safari, Edge)
2. Crea una cuenta (usuario y contraseña)
3. ¡Empieza a practicar!

---

## ?? Cómo Usar la Aplicación

### Primera Vez
1. **Crear Cuenta**: Escribe un usuario y contraseña ? Clic en "Crear Cuenta"
2. Accederás automáticamente al menú principal

### Navegar
- **Estudiar** ? **Frases** ? Practicar traducciones
- Los botones "Volver" te llevan a la pantalla anterior

### Practicar Frases
1. Lee la frase mostrada (euskera o castellano)
2. Escribe la traducción en el campo de texto
3. Clic en **"Comprobar"** (o presiona Enter)
4. Si aciertas ? Rectángulo verde ?
5. Si fallas ? Rectángulo rojo ? con los errores marcados
6. Usa **"Limpiar"** para borrar y volver a intentar
7. Usa **"Siguiente/Anterior"** para cambiar de frase

---

## ?? Cómo Añadir Tus Propias Frases

1. Abre el archivo: `js/data.js`
2. Busca el array `phrasesData`
3. Añade un nuevo objeto al final:

```javascript
{
    id: 11,  // Incrementa el número
    euskera: "Eskerrik asko",
    castellano: "Muchas gracias"
},
```

4. Guarda el archivo
5. Recarga la página en el navegador
6. ¡Tu nueva frase ya está disponible!

---

## ?? Solución de Problemas

### No funciona al abrir index.html
**Problema**: Algunos navegadores bloquean archivos locales  
**Solución**: Usa un servidor local:

```bash
# Si tienes Python instalado:
python -m http.server 8000

# Luego abre: http://localhost:8000
```

### Perdí mis datos
**Causa**: Limpiaste el caché del navegador  
**Prevención**: Los datos están en localStorage. No limpies el caché del sitio

### La app no se ve bien en móvil
**Solución**: Abre el navegador en modo escritorio o usa Capacitor para crear app nativa

---

## ?? Convertir a App de Móvil (Avanzado)

### Requisitos
- Node.js instalado
- Android Studio (para Android) o Xcode (para iOS en Mac)

### Pasos
```bash
# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init EuskApp com.euskapp.app

# 2. Añadir plataforma Android
npm install @capacitor/android
npx cap add android

# 3. Abrir en Android Studio
npx cap sync
npx cap open android

# 4. En Android Studio: Build ? Build APK
```

---

## ?? Personalización Fácil

### Cambiar colores
Abre `styles.css` y busca estos colores:
- `#667eea` ? Color principal (morado)
- `#764ba2` ? Color secundario
- `#4caf50` ? Verde (correcto)
- `#f44336` ? Rojo (incorrecto)

Reemplázalos por tus colores favoritos usando códigos hexadecimales.

### Cambiar el título
Abre `index.html` y modifica la línea:
```html
<title>EuskApp - Aprende Euskera</title>
```

---

## ?? Estructura de Archivos Simple

```
euskapp/
?
??? index.html          ? Abre este archivo en el navegador
??? styles.css          ? Estilos y colores
?
??? js/
    ??? data.js         ? AQUÍ añades frases
    ??? storage.js      ? Guarda datos
    ??? app.js          ? Navegación
    ??? screens/
        ??? login.js    ? Pantalla login
        ??? menu.js     ? Pantalla menú
        ??? study.js    ? Pantalla estudiar
        ??? phrases.js  ? Pantalla frases (la principal)
```

---

## ?? Próximos Pasos (Futuro)

1. **Más Contenido**: Verbos, vocabulario
2. **Retos**: Sistema de desafíos
3. **Estadísticas**: Gráficos de progreso
4. **Audio**: Pronunciación de frases
5. **Cloud**: Supabase para sincronizar entre dispositivos

---

## ?? Tips

- ? Practica 10 minutos al día
- ? Añade tus propias frases de vocabulario diario
- ? Usa la app en el móvil añadiendo un acceso directo
- ? Los errores te ayudan a aprender, no te frustres

---

## ?? ¿Necesitas Ayuda?

La aplicación es muy simple:
1. HTML muestra las pantallas
2. CSS las hace bonitas
3. JavaScript las hace funcionar
4. LocalStorage guarda los datos

Para modificar algo, usa la IA (Claude, ChatGPT, etc.) con instrucciones como:
- "Añade más frases al archivo data.js"
- "Cambia el color principal a azul"
- "Crea una sección de verbos similar a frases"

---

**¡Zorionak! Ya tienes tu app de euskera funcionando** ??