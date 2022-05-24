const staticProductoro = "productoroProd";
const assets = [
  "./index.html",
  "./styles.css",
  "./main.js",
  "./img/tomato.png",
  "./img/tomato.ico",
  "./img/settings-icon.png",
  "./img/dream-team-logo.png",
  "./audio/HoliznaCC0-Ghosts.mp3",
  "./audio/HoliznaCC0-Letting-Go-Of-The-Past.mp3",
  "./audio/notification-alert-1.wav",
  "./audio/notification-alert-2.wav",
  "./audio/notification-alert-3.wav",
  "./audio/Waltz-Tchaikovsky-Op40.mp3",
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
