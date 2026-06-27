const CACHE_NAME = 'farm-rush-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './game.js',
  './style.css',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './asset/logo_game1.png', './asset/play1.png', './asset/restart1.png', './asset/retry1.png',
  './asset/game_over1.png', './asset/next_level1.png', './asset/win_srceen1.png', './asset/hati1.png',
  './asset/panah_kiri1.png', './asset/panah_kanan1.png', './asset/panah_lompat1.png',
  './asset/idletelur1.png', './asset/idletelur2.png', './asset/walktelur3.png',
  './asset/jumptelur4.png', './asset/falltelur5.png',
  './asset/dietelur1.png', './asset/dietelur2.png', './asset/dietelur3.png', './asset/dietelur4.png', './asset/dietelur5.png',
  './asset/ulat1_kiri.png', './asset/ulat1_kanan.png', './asset/ulat_mati_diinjak.png',
  './asset/ayamjalan1.png', './asset/ayammarah1.png', './asset/ayammarah2.png', './asset/ayamkagetdiinjak1.png',
  './asset/bg_level1.png', './asset/bg_level2.png',
  './asset/ember1.png', './asset/ember2.png', './asset/taliember1.png',
  './asset/gandum1.png', './asset/gandum2.png', './asset/telur1.png',
  './asset/pintutertutup1.png', './asset/pintutertutup2.png', './asset/pintutertutup3.png', './asset/pintutertutup4.png',
  './asset/pintuterbuka1.png', './asset/pintuterbuka2.png', './asset/pintuterbuka3.png', './asset/pintuterbuka4.png',
  './asset/grass1.png', './asset/grass2.png', './asset/grass3.png', './asset/grass4.png', './asset/grass5.png', './asset/grass6.png', './asset/grass7.png',
  './asset/dritmiddle1.png', './asset/dritmiddle2.png', './asset/dritmiddle3.png', './asset/dritmiddle4.png', './asset/dritmiddle5.png', './asset/dritmiddle6.png', './asset/dritmiddle7.png',
  './asset/dirtbottom1.png', './asset/dirtbottom2.png', './asset/dirtbottom3.png', './asset/dirtbottom4.png', './asset/dirtbottom5.png',
  './asset/papankayu1.png', './asset/papankayu2.png', './asset/papankayu3.png', './asset/papankayu4.png', './asset/papankayu5.png',
  './asset/tiangkayu1.png', './asset/tiangkayu2.png', './asset/tiangkayu3.png', './asset/tiangkayu4.png', './asset/tiangkayu5.png',
  './asset/jerami1.png', './asset/jerami2.png', './asset/jerami3.png', './asset/jerami4.png', './asset/jeramipanjang1.png',
  './asset/tali1.png', './asset/tali2.png', './asset/tali3.png', './asset/tali4.png',
  './asset/lubang1.png', './asset/lubang2.png', './asset/lubang3.png', './asset/lubang4.png', './asset/exit1.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
