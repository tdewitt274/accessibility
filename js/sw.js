const CACHE_NAME = 'gap-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
//JS
    './js/dictionary.js',
    './js/functions.js',
    './js/indexedDB.js',
    './js/keyboard.js',
    './js/keys.js',
    './js/predictive.js',
    './js/sw.js',
    './js/voice.js',
//Images
    './images/icon-192.png',
    './images/icon-512.png',
//CSS
    './css/app.css',
    './css/keyboard.css',
    './css/modal.css',
//Root
  './index.html',
  './manifest.json'
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((cachedRequest) => {
            return cachedRequest || fetch(event.request);
        })
    );
});
/*
const CACHE_NAME = 'gap-cache';

// Cache the core app shell immediately on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Fetch event: Try cache first. If not found, fetch from network and cache it for next time!
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch it from the network
      return fetch(event.request).then((networkResponse) => {
        // Optional: Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response because it's a stream and can only be consumed once
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback behavior if offline and file isn't cached yet
        // (e.g., you could return a fallback offline HTML page here)
      });
    })
  );
});
*/
