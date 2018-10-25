const cache_Name = 'version_5';

const cache_Items = [
	'./',
	'restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/main.js',
	'/js/dbhelper.js',
	'/js/restaurant_info.js'
]

// install serviceWorker
self.addEventListener('install', (event) => {
	// installing service worker
	event.waitUntil(
		caches.open(cache_Name)
		.then(cache => {
			// start caching
			cache.addAll(cache_Items)
		})
		.then(() => self.skipWaiting())
		.catch(err => {
			// caching failed
			console.log(`install failed; ${err}`);
		})
	)
});

self.addEventListener('activate', (event) => {
	// activate the new service worker
	event.waitUntil(
		// list all cache_Names
		caches.keys()
		.then(keys => {
			// filter old cache
			return Promise.all(
				keys.map(oldCache => {
					if(oldCache !== cache_Name){
						// delete all oldCache
						return caches.delete(oldCache);
					}
				})
			)	
		})
	)
});

self.addEventListener('fetch', (event) => {
	// fetch updated cache
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	)
});