'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "6a945b7b33a07d23474ebeba1227dc73",
"index.html": "faf1caf1e23363676826abc33daa079b",
"/": "faf1caf1e23363676826abc33daa079b",
"main.dart.js": "540208b2d8137af8cda7da53820f57f4",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0c523670c8c47ab1c5672612f73c81e4",
"assets/AssetManifest.json": "6e5762e9ec4d98eebeb13d58eca97ace",
"assets/NOTICES": "5f3fbad879e41e77c482b3f43539e765",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "c42ccc6ed9aa951f6eb00421093cabcb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "25b02d53a21190c4dae2ac285fb38681",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "9ea2d2a14a14b6a39484b577f29d3591",
"assets/fonts/MaterialIcons-Regular.otf": "1069e0b93a6e0a46bdb1d9b232c8fb5e",
"assets/assets/images/icons/arrow_right.png": "a81cd2b0f29143c3ec41dac798d467c2",
"assets/assets/images/icons/bitcoin.png": "f78003f2251383b09330930e54dae39f",
"assets/assets/images/icons/arrow_left.png": "948981c3caeaf68bf1893fba17d6ac31",
"assets/assets/images/icons/bookmark.png": "f41616faff98f1edb79846f10cf62a5b",
"assets/assets/images/icons/filter.png": "2bb8bc3241c17b7e6437d3aea0752b4e",
"assets/assets/images/nfts/nature.jpeg": "578b04a0ff8b3bb0d76c15d7250f0603",
"assets/assets/images/nfts/monkey2.jpeg": "b49a093b68a8d373a21a43e3c0e52ef8",
"assets/assets/images/nfts/owl.jpeg": "bbcec4c1b1db91db15a55aef422ad1b2",
"assets/assets/images/nfts/nft_0.png": "be7688bd5160430949b731d1e1c6f011",
"assets/assets/images/nfts/monkey.jpeg": "58439ac5a35837e7fff69ccbf4c41716",
"assets/assets/images/nfts/b0.png": "fedc864d9d8a0223e83bf928168603e9",
"assets/assets/images/artists/anna.png": "5f6c94914695dda6aac3d35ee6fdb8c8",
"assets/assets/images/artists/max.jpeg": "fb5dc35479e85b4f856c7a565c495053",
"assets/assets/images/artists/my_profile.jpg": "bd5e1077b4b685f9a69d6c96e6d835d3",
"assets/assets/images/artists/mathew.jpg": "fde0eb71ac8618cdff016b71915e4883",
"assets/assets/images/artists/profile2.png": "7a43e0a0a6f877b25db227622b699342",
"assets/assets/images/artists/john.jpeg": "e6dffd382e9373a1d9760735cf5d76c0",
"assets/assets/images/2.png": "16840a1b9c8a8b573e70776d00fa73c5",
"assets/assets/images/3.png": "1391f2bb9da36fce98c0bad7fa635dd6",
"assets/assets/images/1.png": "1b213df589d59807bfa85ff417715aa3",
"assets/assets/images/0.png": "74a44d56b923745db0d4ee7339694869",
"assets/assets/animations/congrats.json": "3bf3b91a51d20b2985fa9e5d5af205c6",
"assets/assets/animations/like.json": "3a38ea9140e107dbbda66d12852848b7",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
