const publicVapidKey = 'BHT-WtcoRmdI9-3C9dkXG-0HWnpivaGP8XgO6UW_8-tUXNFWRAoHjQ7KCXBbi7eQC-2Ml_7QyB17cxP2z8I4uoY';

//Check for service worker
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}

// Register service worker, Register Push, Send Push
async function send() {
    // Register serviceWorker
    console.log('Registering sw');
    const register = await navigator.serviceWorker.register('/javascripts/service-worker.js', {
        scope: '/javascripts/'
    });
    console.log('Registered sw');

    // Register Push
    console.log('Registering Push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Registered Push');

    // Send Push notification
    console.log('Sending Push');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent');
    
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
