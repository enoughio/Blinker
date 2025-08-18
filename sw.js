function main() {
    // This is the main function of the service worker.
    console.log("Service Worker is running");


    self.addEventListener('install', (event) => {
        console.log('Service Worker installing...');
        // Perform install steps
        event.waitUntil(
            caches.open('v1').then((cache) => {
                console.log('Opened cache');
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js'
                ]);
            })
        );
    });

}


main();