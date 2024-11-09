const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Adicione aqui outros recursos estáticos importantes
];

// Otimize o processo de instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      }),
      self.skipWaiting() // Força a ativação imediata
    ])
  );
});

// Otimize a estratégia de cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - retorna a resposta do cache
      if (response) {
        return response;
      }

      // Clone a requisição porque ela só pode ser usada uma vez
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Verifica se recebemos uma resposta válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone a resposta porque ela só pode ser usada uma vez
        const responseToCache = response.clone();

        // Adiciona a resposta ao cache para uso futuro
        caches.open(CACHE_NAME).then((cache) => {
          // Apenas cache recursos importantes
          if (event.request.url.match(/\.(js|css|png|jpg|jpeg|gif|ico)$/)) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});

// Limpa caches antigos durante a ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim() // Toma controle de todas as abas abertas
    ])
  );
});

// Adiciona listener para mensagens
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});