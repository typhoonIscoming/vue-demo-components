self.addEventListener('install', (event) => {
    console.log('V1 installing…')

    // 这里缓存一个 cat.svg
    event.waitUntil(
        caches.open('static-v1').then((cache) => cache.add('/sw.jpg'))
    )
})

self.addEventListener('activate', (event) => {
    console.log('V1 now ready to handle fetches!')
})

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
    if (url.origin == location.origin && url.pathname == '/sw.jpg') {
        event.respondWith(caches.match('/sw2.jpg'))
    }
})
