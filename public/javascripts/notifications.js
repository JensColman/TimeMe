// /*jshint esversion: 6 */

// // ---------------------- Firebase ---------------------- \\

// // Niet vergeten om de beveiliging van de database terug aan te zetten: https://firebase.google.com/docs/web/setup.

// // Initialize Firebase.
// var config = {
//      apiKey: "AIzaSyDpyti5var4iXdnKG_EIpAZgTKQRnjFLps",
//      authDomain: "countdown-timer-9db4d.firebaseapp.com",
//      databaseURL: "https://countdown-timer-9db4d.firebaseio.com",
//      projectId: "countdown-timer-9db4d",
//      storageBucket: "countdown-timer-9db4d.appspot.com",
//      messagingSenderId: "70274656018"
// };

// firebase.initializeApp(config);

// const messaging = firebase.messaging();
// const database = firebase.database();
// const pushBtn = document.getElementById("push-button");

// // Voeg een knop toe waarbij de gebruiker kan subscriben om push notifications te ontvangen.
// // Meer info op https://css-tricks.com/implementing-push-notifications-setting-firebase/.

// let userToken = null;
// let isSubscribed = false;

// // Add the public key generated from the console here.
// // Zie https://firebase.google.com/docs/cloud-messaging/js/client
// messaging.usePublicVapidKey("BFB3g18JS2IChDumBW_6NNzFpdsSYJZS_h1oXz-rxah3NA_32edeR3h9S5M0bvVGR6XsV0UQ8Se3sotPxWGJ6OE");

// // function initializePush() {
// //      userToken = localStorage.getItem("pushToken");
// //
// //      isSubscribed = userToken !== null;
// //      updateBtn();
// //
// //      pushBtn.addEventListener("click", () => {
// //           pushBtn.disabled = true;
// //
// //           if (isSubscribed) {
// //                return unsubscribeUser();
// //           }
// //           return subscribeUser();
// //      });
// // }

// // function updateBtn() {
// //      if (Notification.permission === "denied") {
// //           pushBtn.textContent = "Subscription blocked";
// //           return;
// //      }
// //
// //      pushBtn.textContent = isSubscribed ? "Unsubscribe" : "Subscribe";
// //      pushBtn.disabled = false;
// // }

// // function subscribeUser() {
// //      messaging.requestPermission()
// //           .then(() => messaging.getToken())
// //           .then(token => {
// //
// //                updateSubscriptionOnServer(token);
// //                isSubscribed = true;
// //                userToken = token;
// //                localStorage.setItem('pushToken', token);
// //                updateBtn();
// //           })
// //           .catch(err => console.log('Denied', err));
// // }


// // function updateSubscriptionOnServer(token) {
// //      if (isSubscribed) {
// //           return database.ref('device_ids')
// //                .equalTo(token)
// //                .on('child_added', snapshot => snapshot.ref.remove());
// //      }
// //
// //      database.ref('device_ids').once('value')
// //           .then(snapshots => {
// //                let deviceExists = false;
// //
// //                snapshots.forEach(childSnapshot => {
// //                     if (childSnapshot.val() === token) {
// //                          deviceExists = true;
// //                          return console.log('Device already registered.');
// //                     }
// //
// //                });
// //
// //                if (!deviceExists) {
// //                     console.log('Device subscribed');
// //                     return database.ref('device_ids').push(token);
// //                }
// //           });
// // }

// // function unsubscribeUser() {
// //      messaging.deleteToken(userToken)
// //           .then(() => {
// //                updateSubscriptionOnServer(userToken);
// //                isSubscribed = false;
// //                userToken = null;
// //                localStorage.removeItem('pushToken');
// //                updateBtn();
// //           })
// //           .catch(err => console.log('Error unsubscribing', err));
// // }

// if ("serviceWorker" in navigator) {
//      navigator.serviceWorker
//           .register('/Countdown-timer/firebase-messaging-sw.js', {
//                scope: "/Countdown-timer/"
//           })
//           .then(function(registration) {
//                console.log("[Firebase serviceWorker] Registered. ");
//                messaging.useServiceWorker(registration);
//                // if (localStorage.getItem("pushToken")) {
//                //      initializePush();
//                // }
//                messaging.requestPermission()
//                     .then(function() {
//                          console.log("[Firebase] Permission granted.");
//                          return messaging.getToken();
//                     })
//                     .then(function(token) {
//                          console.log(token);
//                          // updateSubscriptionOnServer(token);
//                          // isSubscribed = true;
//                          // userToken = token;
//                          // localStorage.setItem("pushToken", token);
//                     })
//                     .catch(function(err) {
//                          console.log(err);
//                     });
//           })
//           .then(function(registration) {
//                console.log(registration);
//           })
//           .catch(function(err) {
//                console.log("[Firebase serviceWorker] Failed to register. ", err);
//           });
// }

// // messaging.onMessage(payload => {
// //
// //     const snackbarContainer = document.querySelector('#snackbar');
// //
// //     let data = {
// //         message: payload.notification.title,
// //         timeout: 5000,
// //         actionHandler() {
// //             location.reload();
// //         },
// //         actionText: 'Reload'
// //    };
// //     snackbarContainer.MaterialSnackbar.showSnackbar(data);
// // });



// ---------------------- Notifications ---------------------- \\

// Vraag permissie om notificaties weer te geven.
Notification.requestPermission().then(function(result) {
     if (result === "denied") {
          console.log("[Notification] Permission wasn't granted. Allow a retry.");
          return;
     }
     if (result === "default") {
          console.log("[Notification] The permission request was dismissed.");
          return;
     }
     // Do something with the granted permission.
     console.log(result);
     //PushManager.subscribe();
});

function notify() {
     var notification = new Notification("Time's up!", {
          body: "The timer has run out.",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARkSURBVGhD3dpnqBxVGIfxq8YWYsdEDXaxRyGCIoKoiYgFjCAYYsEOfhJFUBMIIliQ2PIliopBUbBhAUFFEQQbGDVoMMWGJrYPsWuM0fg8kAPD8M7uObsz9974h9+Hu+yeM7N75sw579yRDrIIf2NjD+vxArbHuM5xiE6gyVUY1zkT0YE3uQ3jOv+7EzoS0YE3uRjjPtdiNaITSH7E/ZiAzSJzEJ1I0m+onY83sRCTfGGsM8wJnY1/kd67DIdi1LMljsc8vIPqCdStwk04Edsg5SD8hPr7f8UZGJXsA7/xNagfSI4fcAeOxoebXovYfqfZEzmrgrZ8h06yBa6AM1XUcVcuR+vZAU8h6rBL96H17IFeYzziBb4c7+FjfI/ofb28herE0Up2x0pEHVY5Gz2K87AXouyM03EPck7QL8UJo7V4Y1uKqLPE62kudkRJtobLn88QtZs4E+6PVvIEok6S5zAFw8R90QJUb6h172MihsoliBqXnd8Kb6htxRXGn4j6k8N04HjdrEXUsC5DF3G18TuiPjfgWAyUexE1qtvRZc5F0/B7A8VxFfAXogY/gfWAO+H7usrNiPrXTBRlPqKG1sFJIP39G7yOnIrbzrb4AtX+E4+hKJ8jauhunALHcvV1p+0bMPQsVIv7omo/iVWjycjKdESN+Os4UZjTEK3lvoGVnLbu7M6gDvF6P7oUWbkOUQNPo5pDsALRez+F324bU/qNiPp4HFl5BlEDUUFjF7yM6P1yhXEBLoIX8iC/3FGI2vayyIqLyKiBgxFlK3htRZ+p8wSPQEncrkS72H+QVXn9A/UPO4X3q9A4pr3O6p+tc5FbOnm8i6itw9AzftvRBy1L5eQE5KygXVKV5HlE7Vh67pmdEH0we7wSawwfIGonuQUleQxROyejZ5p+oa9REpf6UTvJlShJ9WZe5bqvb6JryGujdAp+BfV25JfjSCiJRceorcPRNxb2og8fiJJ4J69fzF+i77gPEq36XbxmVVWfRf3D8n5SGn/VGbgGszFIWdeZLDqer5AV12RRA16YYxGL/9HxWH3KStNTODddpWO/jTRVmrKf/jlMvHCjRkqn22FzDqLjcJUwFdmxVh015K/U5aauGlcmTSttZ9Ci7Av3HFFjT2I00rTq11kozoOIGtP16DKnor6JTCxnuWAtjmP0F0SN2pnju4s4TTc9CPDecxIGztWIGpYn5f2lzTTthJNHMFT8aV9E1HjyMHwqMUzc+LkzbRpmcttRWmoOsxt8hBh1kvh0zWdGpTtSvzAL+/3ad4M3Da1lPzTdm6q+xV1wnG+HKK7oj4HPYpum5SoXxlaaWs8B6PdNVvmo0mHyOl7Cq/gIObva5Gf03fMME1fQryHqvG3+ev5nSudxaeQFHO2b2uDU/ABG/R8u3B9Z8moqqg/ibViXGNM4+zyEqNSUwyWWW+ziAnzXsUY2C/5/zhJYyI9OwJKYu+LFuBC7YrOJK3MLlE7TLmn2htN2RxkZ+Q/SzoSi3hNZIQAAAABJRU5ErkJggg==" // optional
     });

     // notification.onclick = function() {
     //      window.open("open website");
     // };
     setTimeout(notification.close.bind(notification), 7000);
}

function notificationTimerEnd() {
     // Controleert of de browser compatibel is.
     if (!("Notification" in window)) {
          console.log("This browser does not support notifications.");
          // Controleert of er toestemming is gegeven.
     } else if (Notification.permission === "granted") {
          // Laat een notificatie zien.
          notify();
          // Vraagt toestemming als die nog niet gegeven is.
     } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
               // Als deze gegeven is, dan opent de notificatie.
               if (permission === "granted") {
                    // Laat een notificatie zien.
                    notify();
               }
          });
     }
}




// ---------------------- Push API ---------------------- \\

// Zie https://blog.sessionstack.com/how-javascript-works-the-mechanics-of-web-push-notifications-290176c5c55d voor meer info.
// if ('PushManager' in window) {
//      console.log("[PushManager] PushManager is supported.");
//
//      var subscribeOptions = {
//           userVisibleOnly: true,
//           applicationServerKey: btoa(
//                // Key is gegenereerd op https://web-push-codelab.glitch.me/.
//                "BPzDwuNeR2T3NB6Mmlo8y35uwH-qTgPKfrcDuUVdD9Jptr6HNZQ03HvXB4v7AXbpu-ovwxscqk1oA-pWpdiPGtY"
//           )
//      };
//
//      registration.pushManager.subscribe(subscribeOptions);
//
// } else {
//      // Push wordt niet ondersteunt, verberg of verwijder UI.
//      console.log("[PushManager] PushManager is not supported.");
// }
