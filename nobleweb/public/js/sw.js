var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/assets/nobleweb/js/noble.js',
];
console.log(urlsToCache);
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
                console.log('finished');
            })
    );
});