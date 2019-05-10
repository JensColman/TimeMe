// Applicatienaam, moet consistent blijven.
var APP_PREFIX = "TimeMe_";
// Cache version.
var VERSION = "Version_001";
// Cache naam + versie.
var cacheName = APP_PREFIX + VERSION;
// Aanduiden welke files er gecached moeten worden.
var cacheFiles = [
     "/javascripts/cacheSaver.js",
     "/javascripts/firebase-sw.js",
     "/javascripts/firebase-database.js",
     "/javascripts/alert.js",
     "/javascripts/notifications.js",
     "/javascripts/sidebar.js",
     "/javascripts/styling.js",
     "/javascripts/timer.js",
     "/stylesheets/index.css",
     "https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,400,700"
];

// Installeren van serviceworker.
self.addEventListener("install", function(e) {
     console.log("[serviceWorker] Installed");
     // De installatie zal moeten wachten tot dit is uitgevoerd.
     e.waitUntil(
          caches.open(cacheName).then(function(cache) {
               console.log("[serviceWorker] Caching cacheFiles " + cacheName);
               // Hier wordt alle files die opgegeven zijn in cacheFiles opgeslagen in de cache.
               return cache.addAll(cacheFiles);
          })
     );
});

// Activeren van serviceworker.
self.addEventListener("activate", function(e) {
     console.log("[serviceWorker] Activated");

     // Dit zorgt ervoor dat files van oude caches niet bewaard blijven.
     e.waitUntil(
          // Hier worden alle keys en cache overlopen.
          caches.keys().then(function(cacheNames) {
               // Hier wordt er gelooped door de cacheNames om te zien of er geen verouderde bestanden bijzitten.
               return Promise.all(cacheNames.map(function(thisCacheName) {
                    // Hier wordt nagekeken of er versies zijn die verschillen van de huidige cacheName.
                    if (thisCacheName !== cacheName) {
                         console.log("[serviceWorker] Removing cached files from ", thisCacheName);
                         // Hier worden de caches verwijderd die niet overeenkomen met de huidige cacheName.
                         return caches.delete(thisCacheName);
                    }
               }));
          })
     );
});

// Fetching van serviceworker.
self.addEventListener("fetch", function(e) {
     console.log("[serviceWorker] Fetching ", e.request.url);
     // e.respondWidth Responds to the fetch event.
     e.respondWith(
          // Check in cache for the request being made.
          caches.match(e.request).then(function(response) {
               // If the request is in the cache.
               if (response) {
                    console.log("[serviceWorker] Found in cache ", e.request.url);
                    // Return the cached version.
                    return response;
               }
               // If the request is NOT in the cache, fetch and cache.
               var requestClone = e.request.clone();
               fetch(requestClone).then(function(response) {
                    if (!response) {
                         console.log("[serviceWorker] No response from fetch");
                         // Return the response.
                         return response;
                    }

                    var responseClone = response.clone();
                    //  Open the cache.
                    caches.open(cacheName).then(function(cache) {
                         cache.put(e.request, responseClone);
                         return response;
                    });
               }).catch(function(err) {
                    console.log("[serviceWorker] Error fetching & caching new data", err);
               });
          })
     );
});
