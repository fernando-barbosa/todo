var dataCacheName = 'todo-dataCache-v1';
var cacheName = 'todo-cache-v1';
var filesToCache = [
	'/', 
	'/index.html', 
  '/manifest.json', 
  '/partials/login.html', 
  '/partials/list.html', 
  '/partials/add-new.html', 
  'service-worker.js', 
	'css/material-shell.css', 
	'css/materialize.min.css', 
	'js/app.js', 
  'js/controllers/todo-controller.js', 
  'js/controllers/login-controller.js', 
	'js/scripts/materialize.min.js', 
	'js/scripts/angular.js', 
	'js/scripts/angular-route.js', 
	'js/scripts/angular-resource.js', 
  'js/scripts/jquery-3.1.1.js'
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