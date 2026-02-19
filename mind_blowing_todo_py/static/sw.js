const CACHE_NAME = 'neon-focus-v1';
const ASSETS = [
    '/',
    '/static/css/style.css',
    '/static/js/script.js',
    '/static/images/icon-192.png',
    '/static/images/icon-512.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
