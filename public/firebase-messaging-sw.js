/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js');

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBbQXWnrqPPSlu2hGL8BtoCoxs8FtjxJVM",
    authDomain: "timeme-10a73.firebaseapp.com",
    databaseURL: "https://timeme-10a73.firebaseio.com",
    projectId: "timeme-10a73",
    storageBucket: "timeme-10a73.appspot.com",
    messagingSenderId: "525608487167",
    appId: "1:525608487167:web:ec5239204c003bb0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        click_action: notification.click_action,
        icon: notification.icon
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});