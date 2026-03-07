/* Simple cache-first SW for the whole suite */
const CACHE_NAME = "trackscore-suite-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/app.css",
  "./css/dartscore.css",
  "./js/pwa.js",
  "./js/trackscore.js",
  "./js/dartscore.js",
  "./games/trackscore.html",
  "./games/dartscore.html",
  "./manifest.webmanifest",
  "./img/icoon-192.png",
  "./img/icoon-512.png",
  "./img/icoon.png",
  "./img/logo.png",
  "./reset.svg",
  "./wissel.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => (k===CACHE_NAME)?null:caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (req.method === "GET" && res.ok){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
        }
        return res;
      }).catch(()=> cached);
    })
  );
});