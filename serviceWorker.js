const staticProductoro = "productoroProd";
const assets = [
  "./source/index.html",
  "./source/styles.css",
  "./source/main.js",
  "./source/img/tomato.png",
  "./source/img/tomato.ico",
  "./source/img/settings-icon.png",
  "./source/img/dream-team-logo.png",
  "./source/img/icons/delete.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticProductoro).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
