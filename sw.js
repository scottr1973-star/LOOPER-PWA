/* FILE: sw.js */
const CACHE_NAME = 'looper8-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/looper.css',
  './js/looper.js'
];

// 1. Install & Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Serve from Cache (Offline Mode)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// 3. Clean up old versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
});