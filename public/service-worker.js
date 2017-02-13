var dataCacheName = 'todo-dataCache-v1';
var cacheName = 'todo-cache-v1';
var filesToCache = [
	'/', 
	'/index.html', 
	'css/material-shell.css', 
	'css/materialize.css', 
	'js/app.js', 
	'js/scripts/materialize.js', 
	'js/scripts/angular.js', 
	'js/scripts/angular-route.js', 
	'js/scripts/angular-resource.js', 
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
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = '';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});