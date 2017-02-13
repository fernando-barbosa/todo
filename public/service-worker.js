var cacheName = 'todo-cache-v1';
var filesToCache = [
	'/', 
	'/index.html', 
	'css/material-shell.css', 
	'css/materialize.css', 
	'js/app.js', 
	'js/materialize.js', 
	'js/angular.js', 
	'js/angular-route.js', 
	'js/angular-resource.js', 
	'js/controllers/list-controller.js', 
	'js/controllers/add-new-controller.js', 
];

if('serviceWorker' in navigator) {
  navigator.serviceWorker
  	.register('/service-worker.js')
	.then(function() {
		console.log("Service Worker Registered"); 
	});
}

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});