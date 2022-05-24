const staticProductoro = "productoroProd";
const assets = [
  "./index.html",
  "./styles.css",
  "./main.js",
  "./img/tomato.png",
  "./img/tomato.ico",
  "./img/settings-icon.png",
  "./img/dream-team-logo.png",
  "./img/icons/delete.png",
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
