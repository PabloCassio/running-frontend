/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'maratona-v1';
const OFFLINE_URL = '/offline.html';
const API_CACHE_NAME = 'maratona-api-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first for API, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // For navigation requests, try network first, then cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(handleDefaultRequest(request));
});

async function handleApiRequest(request: Request): Promise<Response> {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses (except errors)
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] API network failed, trying cache:', error);
    
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cache, return error
    return new Response(JSON.stringify({
      error: 'Network error',
      message: 'Cannot connect to server. Please check your connection.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleStaticAsset(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_NAME);
  
  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Not in cache, try network
  try {
    const networkResponse = await fetch(request);
    
    // Cache the response for future use
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Static asset fetch failed:', error);
    
    // Return a generic error for static assets
    return new Response('Asset not available offline', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function handleNavigationRequest(request: Request): Promise<Response> {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    
    // Update cache with fresh response
    const cache = await caches.open(CACHE_NAME);
    const responseClone = networkResponse.clone();
    cache.put(request, responseClone);
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Navigation network failed:', error);
    
    // Try cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cache, return offline page
    const offlineResponse = await cache.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // No offline page cached, create a simple one
    return new Response(
      '<html><body><h1>Você está offline</h1><p>Por favor, conecte-se à internet para usar o app.</p></body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

async function handleDefaultRequest(request: Request): Promise<Response> {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Default request failed, trying cache:', error);
    
    // Try cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cache, return error
    return new Response('Network error', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

function isStaticAsset(request: Request): boolean {
  const url = new URL(request.url);
  
  // Check if it's a static asset
  return (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.ico')
  );
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-races') {
    event.waitUntil(syncRaces());
  }
});

async function syncRaces(): Promise<void> {
  console.log('[Service Worker] Syncing races...');
  // Implement race synchronization logic here
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received:', event);
  
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nova notificação da Maratona Ao Vivo',
    icon: '/pwa-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'dismiss',
        title: 'Fechar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Maratona Ao Vivo', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click:', event);
  
  event.notification.close();
  
  if (event.action === 'open') {
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Check if there's already a window/tab open with the target URL
          for (const client of clientList) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          
          // If not, open a new window/tab
          if (self.clients.openWindow) {
            return self.clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Periodic sync for background updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    console.log('[Service Worker] Periodic sync for content updates');
    event.waitUntil(updateContent());
  }
});

async function updateContent(): Promise<void> {
  console.log('[Service Worker] Updating content in background...');
  // Implement background content updates
}