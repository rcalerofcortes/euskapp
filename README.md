# EuskApp - Learn Basque Application

A simple and effective web/mobile application to learn Basque (euskera) through phrase practice with integrated statistics and review system.

## ?? Features

- ? **User Authentication**: Login and registration system
- ? **Phrase Practice**: Translate between Basque and Spanish
- ? **Smart Validation**: Ignores accents, punctuation, and case
- ? **Visual Feedback**: Green/red borders based on correctness
- ? **Error Detection**: Word-by-word comparison with detailed feedback
- ? **My Correct Phrases**: Review system for mastered phrases
- ? **Daily Statistics**: Track your progress day by day
- ? **Overall Analytics**: View total performance and accuracy
- ? **Reset Options**: Reset all data, all stats, or specific days
- ? **Local Storage**: Data saved in browser/device
- ? **Responsive Design**: Works on mobile, tablet, and desktop
- ? **Progressive**: Ready to convert to native app

## ?? Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos modernos y responsive
- **JavaScript (Vanilla)**: Lógica de la aplicación
- **LocalStorage**: Almacenamiento de datos local
- **Capacitor** (opcional): Para exportar a Play Store/App Store

## ?? Estructura del Proyecto

```
euskapp/
?
??? index.html              # Punto de entrada de la aplicación
??? styles.css              # Estilos globales
?
??? js/
?   ??? app.js             # Sistema de navegación
?   ??? storage.js         # Gestión de datos locales
?   ??? data.js            # Base de datos de frases
?   ?
?   ??? screens/
?       ??? login.js       # Pantalla de login/registro
?       ??? menu.js        # Menú principal
?       ??? study.js       # Categorías de estudio
?       ??? phrases.js     # Práctica de frases
?       ??? challenges.js  # Retos (próximamente)
?
??? capacitor.json         # Configuración para apps nativas (opcional)
```

## ????? Cómo Usar (Web)

### Opción 1: Abrir directamente
1. Abre el archivo `index.html` en tu navegador
2. ¡Ya está! La aplicación funcionará

### Opción 2: Con servidor local (recomendado)
1. Instala un servidor local simple:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes instalado)
   npx serve
   ```

2. Abre en el navegador: `http://localhost:8000`

## ?? Exportar a Móvil (Play Store/App Store)

Para convertir la app web en aplicación nativa:

### 1. Instalar Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

### 2. Añadir plataformas
```bash
# Para Android
npm install @capacitor/android
npx cap add android

# Para iOS (solo en Mac)
npm install @capacitor/ios
npx cap add ios
```

### 3. Compilar y abrir
```bash
# Android
npx cap sync
npx cap open android

# iOSHow It Works

### Screen 1 - Login
- Create new account or login
- Users stored in localStorage

### Screen 2 - Main Menu
- **Study**: Access learning categories
- **Challenges**: Coming soon
- **Statistics**: View your daily progress and analytics
- **Reset All Data**: Delete everything (double confirmation)

### Screen 3 - Study
- **Phrases**: Practice common phrases (active) with review system
- **Verbs**: Coming soon
- **Vocabulary**: Coming soon
- **Review**: Coming soon

### Screen 3.1 - Phrases
**Two tabs available:**

**Practice Tab:**
1. A phrase is shown in Basque or Spanish
2. Write the translation in the other language
3. Click **Check** to validate (or press Enter)
4. If correct ? green border ?
5. If incorrect ? red border with specific errors highlighted
6. Use **Clear** to erase and try again
7. Navigate between phrases with Previous/Next buttons

**My Correct Phrases Tab:**
1. See all phrases you've answered correctly
2. View accuracy percentage per phrase
3. Review correct/incorrect attempts
4. Study your mastered phrases anytime

### Screen 4 - Statistics
**Overall Statistics:**
- Total correct answers
- Total incorrect answers
- Overall accuracy percentage

**Daily Activity:**
- Day-by-day breakdown
- Date, accuracy, correct, incorrect, and total per day
- Reset individual days or all statistics
- Current day highlighted

**Validation Features:**
- Ignores accents: "qué" = "que"
- Ignores punctuation: "Hola, que tal?" = "hola que tal"
- Case insensitive: "HOLA" = "hola"
- Smart error detection with word-by-word feedbackcontrario
3. Haz clic en **Comprobar** para validar
4. Si es correcto ? rectángulo verde ?
5. Si es incorrecto ? rectángulo rojo con errores señalados
6. Usa **Limpiar** para borrar tu respuesta
7. Navega entre frases con los botones

## ?? Añadir Más Frases

Edita el archivo `js/data.js` y añade nuevas frases al array:

```javascript
{
    id: 11,
    euskera: "Tu frase en euskera",
    castellano: "Tu frase en castellano"
}
```

## ?? Next Features

- [ ] Verbs section
- [ ] Vocabulary section
- [ ] Challenges/gamification system
- [ ] Review mode (failed phrases)
- [ ] Level system
- [ ] Migration to Supabase (multi-user cloud sync)
- [ ] Audio pronunciation
- [ ] Offline mode
- [ ] Spaced repetition algorithm
- [ ] Custom phrase collections

## ?? Data Management

### Currently (Local)
- Data stored in browser's `localStorage`
- Each user has their own progress
- Data persists even after closing browser
- Three types of data:
  - **Users**: Account information
  - **Progress**: Per-phrase statistics
  - **Daily Progress**: Date-based activity tracking

### Future (Supabase)
- Cloud database
- Sync across devices
- Share phrases between users
- Rankings and competitions
- Backup and restore

## ??? Personalización

### Cambiar Colores
Edita `styles.css` y modifica las variables de color:
- Color principal: `#667eea`
- Color secundario: `#764ba2`

### MoValidation System

The phrase validation is smart and flexible:
1. Normalizes responses (lowercase, trim)
2. Removes accents (á?a, é?e, ñ?n, etc.)
3. Removes punctuation (commas, question marks, etc.)
4. Compares word by word
5. Detects incorrect, missing, or extra words
6. Shows specific feedback for each error

Examples that validate as correct:
- "hola que tal" ?
- "hola, qué tal?" ?
- "HOLA QUE TAL" ?
- "Hola, que tal?" ?
Q: Do I need internet to use the app?**  
A: No, once opened it works completely offline.

**Q: Where is my data stored?**  
A: In your browser's localStorage, locally on your device.

**Q: Can I use this on my phone?**  
A: Yes, open it in your mobile browser or use Capacitor to create a native app.

**Q: How do I add more content?**  
A: Edit `js/data.js` and add more objects to the phrases array.

**Q: Will I lose my data if I update the app?**  
A: No, localStorage data persists. Only deleted if you clear browser cache.

**Q: What happte

This is a personal app, but you can:
1. Add more phrases in `data.js`
2. Improve styles in `styles.css`
3. Add new features following the existing structure
4. Report issues or suggest improvements

## ?? License

Personal project for learning Basque.

---

**Made with ?? to learn euskera**

For detailed requirements and all implemented features, see [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md)
R: Sí, abre el archivo en el navegador móvil o usa Capacitor para crear una app nativa.

**P: ¿Cómo añado más contenido?**  
R: Edita `js/data.js` y añade más objetos al array de frases.

**P: ¿Se perderán mis datos si actualizo la app?**  
R: No, los datos de localStorage persisten. Solo se borran si limpias el caché del navegador.

## ?? Contribuir

Esta es una app personal, pero puedes:
1. Añadir más frases en `data.js`
2. Mejorar los estilos en `styles.css`
3. Añadir nuevas funcionalidades siguiendo la estructura existente

## ?? Licencia

Proyecto personal para aprendizaje de euskera.

---

**Hecho con ?? para aprender euskera**
