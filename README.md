# EuskApp — Learn Basque

A lightweight web/mobile app to learn Basque (euskera) through phrase practice, with cloud-synced progress and daily statistics.

## Features

- **Authentication** — email/password login and registration via Supabase Auth
- **Phrase practice** — translate between Basque and Spanish in both directions
- **Smart validation** — ignores accents, punctuation, case, and extra spaces, and accepts alternative translations
- **Visual feedback** — green/red cards with the correct answer and optional grammar notes
- **My correct phrases** — review the phrases you've answered correctly, with per-phrase accuracy
- **Daily statistics** — day-by-day progress plus overall accuracy
- **Add content** — add your own phrases (with alternatives and notes) to the shared database
- **Cloud storage** — progress and phrases live in Supabase and sync across devices
- **Responsive & installable** — works on mobile, tablet, and desktop, and is a PWA

## Tech stack

- **HTML5 / CSS3 / vanilla JavaScript** — no build step, no framework
- **Supabase** — authentication and PostgreSQL database
- **Vercel** — static hosting
- **Capacitor** (optional) — package as a native Android/iOS app

## Project structure

```
euskapp/
├── index.html              # App entry point
├── styles.css              # Global styles
├── manifest.json           # PWA manifest
├── vercel.json             # Vercel deployment config
├── capacitor.json          # Native app config (optional)
│
├── assets/
│   └── icons/              # App icons (PWA + favicon) and SVG source
│
├── js/
│   ├── app.js              # Navigation / routing + app bootstrap
│   ├── supabase-client.js  # Supabase client + Auth/Phrases/Vocabulary/Progress APIs
│   ├── data.js             # Phrase/vocabulary loading + answer comparison helpers
│   └── screens/
│       ├── login.js        # Login / registration
│       ├── menu.js         # Main menu
│       ├── study.js        # Study categories
│       ├── phrases.js      # Phrase practice + review
│       ├── addcontent.js   # Add custom phrases
│       ├── challenges.js   # Challenges (coming soon)
│       └── statistics.js   # Daily statistics
│
├── database/               # Supabase SQL (schema + seed/maintenance scripts)
└── docs/                   # Requirements and deployment guides
```

## Running locally

Browsers block JavaScript on `file://` URLs, so the app needs a local server.

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve
```

Then open `http://localhost:8000`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL in [`database/supabase-schema.sql`](database/supabase-schema.sql) from the Supabase SQL editor to create the `phrases`, `user_progress`, and `daily_progress` tables with their RLS policies and seed data.
3. Put your project URL and anon key in `js/supabase-client.js` (`SUPABASE_URL` and `SUPABASE_ANON_KEY`).

Additional SQL helpers live in `database/` (e.g. confirming existing users, bulk-inserting phrases).

## Deployment

The app is a static site served from the repository root (see `vercel.json`). Deploying to Vercel requires no build step — push to the connected branch and Vercel serves the root directory. `docs/` and `database/` are excluded from the deploy via `.vercelignore`.

## Adding phrases

Phrases are stored in Supabase. The easiest way to add one is the in-app **Add Content** screen, which writes directly to the database. Alternatively, insert rows into the `phrases` table (see `database/insert-all-phrases.sql` for the format).

## How validation works

Answers are normalized before comparison:

1. Lowercased and trimmed
2. Accents removed (`qué` → `que`)
3. Punctuation removed (`hola, ¿qué tal?` → `hola que tal`)
4. Multiple spaces collapsed

The normalized answer is checked against the main translation and any alternatives, so these all count as correct for "hola que tal": `HOLA QUE TAL`, `hola, qué tal?`, `Hola que tal`.

## Documentation

- [Project requirements](docs/PROJECT_REQUIREMENTS.md)
- [Supabase migration guide](docs/SUPABASE_MIGRATION_GUIDE.md)
- [Mobile deployment guide](docs/MOBILE_DEPLOYMENT_GUIDE.md)
- [Build a native app with Capacitor](docs/BUILD_MOBILE_APP.md)
- [Icon instructions](docs/ICON_INSTRUCTIONS.md)

## Roadmap

- [ ] Verbs and vocabulary sections
- [ ] Challenges / gamification
- [ ] Reset progress and statistics (currently placeholders)
- [ ] Audio pronunciation
- [ ] Spaced-repetition review

## License

Personal project for learning euskera.
