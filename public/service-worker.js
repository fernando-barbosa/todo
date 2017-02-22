var dataCacheName = 'todo-dataCache-v1';
var cacheName = 'todo-cache-v1';
var filesToCache = [
	'/',
	'/index.html',
  '/manifest.json',
  '/partials/login.html',
  '/partials/login-forget-pass.html',
  '/partials/list.html',
  '/partials/add-new.html',
  'service-worker.js',
	'css/material-shell.css',
	'assets/css/materialize.min.css',
  'js/app.js',
  'js/modules/app.config.js',
  'js/modules/app.core.js',
  'js/modules/app.routes.js',
	'js/modules/app.services.js',
  'js/controllers/localstorage.ctrl.js',
  'js/controllers/firebase.ctrl.js',
  'js/controllers/login.ctrl.js',
	'assets/js/materialize.min.js',
	'assets/js/angular.js',
	'assets/js/angular-route.js',
	'assets/js/angular-resource.js',
  'assets/js/jquery-3.1.1.js'
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