const staticProductoro = "productoroProd";
const assets = [
  "./",
  "./manifest.json",
  "./index.html",
  "./source/styles.css",
  "./source/main.js",
  "./source/img/tomato.png",
  "./source/img/tomato.ico",
  "./source/img/settings-icon.png",
  "./source/img/dream-team-logo.png",
  "./source/img/icons/delete.png",
  "./source/audio/HoliznaCC0-Ghosts.mp3",
  "./source/audio/HoliznaCC0-Letting-Go-Of-The-Past.mp3",
  "./source/audio/notification-alert-1.wav",
  "./source/audio/notification-alert-2.wav",
  "./source/audio/notification-alert-3.wav",
  "./source/audio/Waltz-Tchaikovsky-Op40.mp3",
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
