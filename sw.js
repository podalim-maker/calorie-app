const CACHE = 'futer-me-v8';
const ASSETS = [
  '/calorie-app/',
  '/calorie-app/index.html',
  '/calorie-app/interventions.html',
  '/calorie-app/treatment-info.html',
  '/calorie-app/exercise-info.html',
  '/calorie-app/activity-info.html',
  '/calorie-app/bmi-info.html',
  '/calorie-app/weight-info.html',
  '/calorie-app/steps-info.html',
  '/calorie-app/calorie-info.html',
  '/calorie-app/manifest.json',
  '/calorie-app/icons/icon-192.png',
  '/calorie-app/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// アプリから「アップデートして」と言われたら即座に切り替える
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
