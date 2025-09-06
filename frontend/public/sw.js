// Cache versioning for better updates
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `supernatural-institute-${CACHE_VERSION}`;
const STATIC_CACHE = `supernatural-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `supernatural-dynamic-${CACHE_VERSION}`;
const API_CACHE = `supernatural-api-${CACHE_VERSION}`;

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/site.webmanifest',
  '/favicon.ico',
  '/offline.html',
  '/dashboard'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_FILES);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !cacheName.includes('supernatural-'))
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle API requests differently
  if (event.request.url.includes('/api/') || event.request.url.includes('supernaturalins-tmi2.encr.app')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // Advanced caching strategies based on request type
    const url = new URL(event.request.url);

    // Network-first for dynamic content (HTML pages)
    if (event.request.destination === 'document' ||
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/academy')) {
      event.respondWith(networkFirstStrategy(event.request));
    }
    // Stale-while-revalidate for static assets
    else if (event.request.destination === 'script' ||
             event.request.destination === 'style' ||
             event.request.destination === 'image' ||
             event.request.destination === 'font') {
      event.respondWith(staleWhileRevalidateStrategy(event.request));
    }
    // Cache-first for other static assets
    else {
      event.respondWith(cacheFirstStrategy(event.request));
    }
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Supernatural Institute',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Supernatural Institute', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    clients.openWindow('/dashboard');
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'storeOfflineData') {
    const { type, data } = event.data.data;
    storeOfflineData(type, data).then((key) => {
      event.ports[0]?.postMessage({ success: true, key });
    }).catch((error) => {
      event.ports[0]?.postMessage({ success: false, error: error.message });
    });
  }
});

// Background sync for offline form submissions
async function doBackgroundSync() {
  try {
    console.log('Starting background sync...');

    // Sync prayer requests
    const prayerRequests = await getOfflineData('prayer-requests');
    for (const request of prayerRequests) {
      await syncPrayerRequest(request);
    }

    // Sync recruit submissions
    const recruits = await getOfflineData('recruits');
    for (const recruit of recruits) {
      await syncRecruit(recruit);
    }

    // Sync testimonies
    const testimonies = await getOfflineData('testimonies');
    for (const testimony of testimonies) {
      await syncTestimony(testimony);
    }

    // Sync funding requests
    const fundingRequests = await getOfflineData('funding-requests');
    for (const request of fundingRequests) {
      await syncFundingRequest(request);
    }

    console.log('Background sync completed successfully');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Enhanced offline data management with IndexedDB-like functionality
const OFFLINE_STORE = 'supernatural-offline-data';

// Generic function to store data offline
async function storeOfflineData(type, data) {
  try {
    const cache = await caches.open(OFFLINE_STORE);
    const key = `${type}-${Date.now()}-${Math.random()}`;
    await cache.put(new Request(key), new Response(JSON.stringify({ type, data, timestamp: Date.now() })));
    return key;
  } catch (error) {
    console.error('Failed to store offline data:', error);
  }
}

// Generic function to retrieve offline data
async function getOfflineData(type) {
  try {
    const cache = await caches.open(OFFLINE_STORE);
    const keys = await cache.keys();
    const data = [];

    for (const key of keys) {
      if (key.url.includes(type)) {
        const response = await cache.match(key);
        if (response) {
          const item = await response.json();
          data.push(item);
        }
      }
    }

    return data;
  } catch (error) {
    console.error('Failed to get offline data:', error);
    return [];
  }
}

// Remove synced data from offline store
async function removeOfflineData(key) {
  try {
    const cache = await caches.open(OFFLINE_STORE);
    await cache.delete(key);
  } catch (error) {
    console.error('Failed to remove offline data:', error);
  }
}

// Sync functions for different data types
async function syncPrayerRequest(request) {
  try {
    const response = await fetch('/api/prayer-requests', {
      method: 'POST',
      body: JSON.stringify(request.data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      await removeOfflineData(request.key);
      console.log('Prayer request synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync prayer request:', error);
  }
}

async function syncRecruit(recruit) {
  try {
    const response = await fetch('/api/recruits', {
      method: 'POST',
      body: JSON.stringify(recruit.data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      await removeOfflineData(recruit.key);
      console.log('Recruit synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync recruit:', error);
  }
}

async function syncTestimony(testimony) {
  try {
    const response = await fetch('/api/testimonies', {
      method: 'POST',
      body: JSON.stringify(testimony.data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      await removeOfflineData(testimony.key);
      console.log('Testimony synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync testimony:', error);
  }
}

async function syncFundingRequest(request) {
  try {
    const response = await fetch('/api/funding-requests', {
      method: 'POST',
      body: JSON.stringify(request.data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      await removeOfflineData(request.key);
      console.log('Funding request synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync funding request:', error);
  }
}

// Advanced Caching Strategies

// Network-first caching strategy
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the successful response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed, trying cache:', error);
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Ultimate fallback
  return new Response('Offline - Content not available', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  // Return cached version immediately if available, then update cache
  if (cachedResponse) {
    // Update cache in background
    fetchPromise.catch(() => {
      // Ignore fetch errors for stale-while-revalidate
    });
    return cachedResponse;
  }

  // No cache, wait for network
  try {
    return await fetchPromise;
  } catch (error) {
    return new Response('Offline - Asset not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}
