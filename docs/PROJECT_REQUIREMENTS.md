# EuskApp - Complete Project Requirements (Updated)

## Project Overview
A mobile/web application to learn Basque (euskera) from personal notes. The app is built using **HTML, CSS, and vanilla JavaScript** for maximum simplicity and easy maintenance with AI assistance.

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (vanilla - no frameworks)
- **Storage**: localStorage (local data storage)
- **Future Mobile Export**: Capacitor for Play Store/App Store deployment
- **Language**: Interface in English, content in Basque and Spanish

## Core Input System
- **Primary Input**: Phrases in Basque (euskera) with Spanish translations
- **Data Storage**: Currently local (localStorage)
- **Future Migration**: Planned migration to Supabase for multi-user support and cloud sync

## Application Structure

### Screen 1 - Login/Registration
**Purpose**: User authentication and account management
- Create new account
- Login with existing credentials
- Users stored in localStorage
- Simple username/password system

### Screen 2 - Main Menu
**Purpose**: Navigation hub
- **Study** button - Access learning categories
- **Challenges** button - Future feature (coming soon)
- **Statistics** button - View daily progress and analytics
- **Reset All Data** button - Delete all users and data (double confirmation)
- Displays greeting with username
- Logout option

### Screen 3 - Study Categories
**Purpose**: Choose learning category
- **Phrases** - Active and functional
  - Integrated review system with tabs
- **Verbs** - Coming soon
- **Vocabulary** - Coming soon
- **Review** - Coming soon

### Screen 3.1 - Phrases (Main Practice Screen)
**Purpose**: Practice translating phrases

**Features**:
- **Two tabs system**:
  1. **Practice** - Active practice mode
  2. **My Correct Phrases** - Review mastered phrases

**Practice Mode**:
- Random translation direction (Basque → Spanish or Spanish → Basque)
- Input field for answer
- **Clear button** - Clears input and re-enables field
- **Check button** - Validates answer
- Visual feedback:
  - Green border when correct
  - Red border when incorrect
  - Detailed error highlighting (word-by-word comparison)
- Navigation buttons (Previous/Next) with phrase counter
- Enter key to submit answer

**My Correct Phrases Mode**:
- Lists all phrases answered correctly at least once
- Shows for each phrase:
  - Basque text
  - Spanish translation
  - Accuracy percentage
  - Number of correct attempts
  - Number of incorrect attempts
  - Total attempts
- Empty state with prompt to start practicing
- Button to switch back to Practice mode

**Validation System**:
- Case insensitive
- Ignores accents (á=a, é=e, ñ=n, etc.)
- Ignores punctuation (commas, question marks, etc.)
- Ignores extra whitespace
- Examples that validate as correct:
  - "hola que tal" = "Hola, que tal?"
  - "hola, qué tal?" = "Hola, que tal?"
  - "HOLA QUE TAL" = "Hola, que tal?"

**Error Detection**:
- Word-by-word comparison
- Identifies:
  - Incorrect words
  - Missing words
  - Extra words
- Clear error messages for learning

### Screen 4 - Challenges
**Purpose**: Future gamification feature
- Currently shows "Coming Soon" message
- Placeholder for competitive/challenge mode

### Screen 5 - Statistics
**Purpose**: Track daily progress and performance

**Features**:
- **Reset All Statistics** button - Deletes all stats (keeps user account, double confirmation)
- **Overall Statistics Section**:
  - Total correct answers
  - Total incorrect answers
  - Overall accuracy percentage
  
- **Daily Activity Section**:
  - Day cards showing:
    - Date (Today, Yesterday, or full date)
    - Daily accuracy percentage
    - Correct answers for that day
    - Incorrect answers for that day
    - Total attempts for that day
    - **Reset This Day** button (single confirmation)
  - Current day highlighted with purple border
  - Days sorted from most recent to oldest
  - Empty state when no data exists

**Data Tracking**:
- Automatic recording on each answer check
- Groups by date (YYYY-MM-DD format)
- Persistent across sessions
- User-specific statistics

## Data Management

### Current System (Local)
- localStorage for all data
- Separate storage for:
  - Users (username, password, creation date)
  - Phrase progress (per-phrase statistics)
  - Daily progress (date-based statistics)
- User-specific data isolation
- Persistent across browser sessions

### Sample Phrases Database
10 common Basque phrases included:
1. Kaixo, zer moduz? - Hola, que tal?
2. Oso ondo, eskerrik asko - Muy bien, muchas gracias
3. Nola duzu izena? - Como te llamas?
4. Nire izena Jon da - Mi nombre es Jon
5. Non bizi zara? - Donde vives?
6. Bilbon bizi naiz - Vivo en Bilbao
7. Zer egiten duzu? - Que haces?
8. Ikaslea naiz - Soy estudiante
9. Agur, gero arte - Adios, hasta luego
10. Bihar arte - Hasta manana

### Adding New Phrases
- Edit `js/data.js` file
- Add objects to `phrasesData` array:
```javascript
{
    id: 11,
    euskera: "Your Basque phrase",
    castellano: "Your Spanish phrase"
}
```

## Design & User Experience

### Visual Design
- Modern gradient purple background
- Clean white card-based interface
- Responsive layout (mobile, tablet, desktop)
- Color scheme:
  - Primary: #667eea (purple)
  - Secondary: #764ba2 (darker purple)
  - Success: #4caf50 (green)
  - Error: #f44336 (red)
  - Warning: #ff9800 (orange)

### User Interface Elements
- Box-based navigation (clickable cards)
- Hover effects on interactive elements
- Clear visual feedback for all actions
- Smooth transitions
- Accessible button sizes
- Mobile-friendly touch targets

### Character Encoding
- UTF-8 encoding for all files
- No emoji or special Unicode characters (compatibility)
- Simple ASCII symbols (< > instead of arrows)
- Accent handling via normalization in code

## File Structure
```
euskapp/
├── index.html                 # Main entry point
├── styles.css                 # Global styles
├── capacitor.json            # Mobile app configuration
├── README.md                  # Documentation
├── INSTRUCCIONES.md          # Quick start guide
│
├── .vscode/
│   └── settings.json         # UTF-8 encoding config
│
└── js/
    ├── app.js                # Navigation system
    ├── storage.js            # localStorage management
    ├── data.js               # Phrases database
    │
    └── screens/
        ├── login.js          # Login/registration screen
        ├── menu.js           # Main menu screen
        ├── study.js          # Study categories screen
        ├── phrases.js        # Phrases practice & review (with tabs)
        ├── challenges.js     # Challenges screen (placeholder)
        └── statistics.js     # Statistics screen with daily tracking
```

## Key Features Summary

### Implemented Features ✅
- User authentication (login/register)
- Phrase practice with bidirectional translation
- Flexible answer validation (accents, punctuation, case)
- Detailed error feedback
- Correct phrases review system (integrated in Phrases)
- Daily statistics tracking
- Overall statistics dashboard
- Reset capabilities (all data, all stats, specific day)
- Phrase counter and navigation
- Clean/Check functionality per phrase
- Mobile-responsive design
- Local data persistence
- UTF-8 character support

### Future Features 📋
- Verbs practice section
- Vocabulary practice section
- Review mode (failed phrases)
- Challenges/gamification system
- Audio pronunciation
- Supabase cloud sync
- Multi-device synchronization
- User rankings/leaderboards
- Spaced repetition system
- Custom phrase collections

## Development Principles
1. **Simplicity First**: Pure HTML/CSS/JS for easy AI-assisted maintenance
2. **Progressive Enhancement**: Build features incrementally
3. **User-Friendly**: Clear feedback and intuitive navigation
4. **Data Persistence**: All progress saved locally
5. **Mobile-Ready**: Responsive design, prepared for Capacitor conversion
6. **Extensible**: Modular structure for easy feature additions
7. **No Dependencies**: Vanilla JavaScript, no frameworks needed

## Mobile Deployment (Future)
- Use Capacitor to convert web app to native mobile app
- Target platforms: Android (Play Store), iOS (App Store)
- Simple deployment process using provided documentation
- Web app works perfectly in mobile browsers as-is

## Maintenance & Extension
- All code well-commented in English
- Modular screen-based architecture
- Easy to add new phrases via data.js
- AI-friendly codebase for iterative improvements
- Clear separation of concerns (data, UI, logic)

## Testing Considerations
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices (responsive design)
- Test localStorage limits (should handle hundreds of phrases)
- Verify UTF-8 encoding (check for ?? symbols)
- Ensure validation works with various input formats

---

**Last Updated**: March 28, 2026
**Current Version**: 1.0
**Status**: Fully Functional MVP with Statistics and Review System
