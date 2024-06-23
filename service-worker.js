self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('shopping-list-cache').then(cache => {
            return cache.addAll([
                '/shopping-list/',
                '/shopping-list/index.html',
                '/shopping-list/styles.css',
                '/shopping-list/app.js',
                '/shopping-list/manifest.json',
                '/shopping-list/icon-192x192.png',
                '/shopping-list/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
