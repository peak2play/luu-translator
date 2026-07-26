const CACHE="luu-v1";


const FILES=[

"./",

"./index.html",

"./style.css",

"./app.js",

"./manifest.json",

"./data/dictionary.json",

"./assets/logo.svg"

];



self.addEventListener(
"install",
event=>{


event.waitUntil(

caches.open(CACHE)

.then(cache=>

cache.addAll(FILES)

)

);


});




self.addEventListener(
"fetch",
event=>{


event.respondWith(

caches.match(event.request)

.then(response=>{


return response ||
fetch(event.request);


})

);


});