const VERSION="2026.11.20-111";
const CACHE="psc-field-maps-"+VERSION;
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>c.add(new Request(f,{cache:"reload"}))))));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("psc-field-maps-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
 /* open from the saved copy first (fast, works with weak signal); a new version arrives through sw.js and the Update bar */
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{if(n&&n.ok){const c=n.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return n;}).catch(()=>caches.match("./index.html"))));
});
