const CACHE_NAME = 'ice-cream-man-plan-v2';
const FILES = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/hyde-park.jpg', './assets/breakfast-bed.jpg', './assets/perth-sunset.jpg',
  './assets/icon-192.png', './assets/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(found => found || fetch(event.request)));
});
