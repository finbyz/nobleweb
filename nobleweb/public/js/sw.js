
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};  
const assets = [
  "/",
  "/index.html",
  "/about.html",
]
const offlineUrl = 'offline';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline)
      .then(cache => {
        return cache.addAll(assets);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(currentCache.offline)
      .then(cache => {
        return cache.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.filter(cacheName => {
                return assets.indexOf(cacheName) === -1;
              }).map(cacheName => {
                return caches.delete(cacheName);
              })
            );
          })
          .then(() => {
            return self.clients.claim();
          });
      })
  );
}); 

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    console.log(e.request)
    const cache = await caches.open(currentCache.offline);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    return response;
  })());
  console.log(`fetched succesfully`)
});
