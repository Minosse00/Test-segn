const CACHE_NAME = 'gps-camera-v6';
const ASSETS = [
    './index.html',
    './manifest.json',
    './map.jpg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    // Esclude le risorse esterne (Tailwind, FontAwesome, Mappe) dalla cache rigorosa
    if (e.request.url.includes('tailwindcss') || e.request.url.includes('font-awesome') || e.request.url.includes('http')) {
        return;
    }
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
