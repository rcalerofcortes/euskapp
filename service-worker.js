// Service Worker for EuskApp
const CACHE_NAME = 'euskapp-v1.0.0';
const urlsToCache = [
  '/euskapp/',
  '/euskapp/index.html',
  '/euskapp/styles.css',
  '/euskapp/js/app.js',
  '/euskapp/js/data.js',
  '/euskapp/js/storage.js',
  '/euskapp/js/screens/login.js',
  '/euskapp/js/screens/menu.js',
  '/euskapp/js/screens/study.js',
  '/euskapp/js/screens/phrases.js',
  '/euskapp/js/screens/addcontent.js',
  '/euskapp/js/screens/challenges.js',
  '/euskapp/js/screens/statistics.js',
  '/euskapp/js/screens/correctphrases.js',
  '/euskapp/manifest.json',
  '/euskapp/icon-192.png',
  '/euskapp/icon-512.png'
];

// Install event - cache files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control immediately
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Listen for messages from the page
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
