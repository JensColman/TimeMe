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

const messaging = firebase.messaging();

// ---------------------- Firebase Cloud Messaging ---------------------- \\

messaging.usePublicVapidKey("BKPMMaQ40J4mNXXo41dSUud6R7NqGnSh4d2VF9a0sz_iGOM6llyhtWHrkx1JxOzWAusX4fUhpjekBbn-di7-lLI");

messaging.requestPermission()
    .then(function () {
        console.log("[Firebase] Got notification permission");
        return messaging.getToken();
    })
    .then(function (token) {
        window.localStorage.setItem('firebaseToken', token);
        // console.log('[Firebase] Token is ' + token);
        // console.log('[Firebase] LocalStorage - firebaseToken: ' + window.localStorage.getItem('firebaseToken'));
        if(token) {
                sendTokenToServer(token);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
                setTokenSentToServer(false);
            }
    })
    .catch(function (err) {
        console.log("[Firebase] Didn't get notification permission", err);
        setTokenSentToServer(false);
    });

messaging.onMessage(function (payload) {
    console.log("[Firebase] Message received. ", JSON.stringify(payload));
});

messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('[Firebase] Token refreshed.');
            setTokenSentToServer(false);
            sendTokenToServer(refreshedToken);
        }).catch(function (err) {
            console.log('[Firebase] Unable to retrieve refreshed token ', err);
        });
});

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function sendPushMessage() {
    var key = 'AAAAemC1CP8:APA91bF5LuwitLSDz2qGHm2vP02CPDtcTiX2WwrPNREY5-bGP-JlfuBjkxAhHQparpW1Shg7Fa8tNcPWLVrVI-FjMEYYTssB7UBQ-jeSXzmS9m8XP-QIZXepW4TeZrIQtWhWnRzwIwAt';
    var notification = {
      title: "Firebase",
      body: "Your timer has run out!",
      click_action: "http://localhost:3000/",
      icon:
        "data:image/png;base64,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"
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'notification': notification,
            'to': window.localStorage.getItem('firebaseToken')
        })
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.error(error);
    });
}






// Plaats dit in de terminal om te testen
/*
curl -X POST -H "Authorization: key=AAAAemC1CP8:APA91bF5LuwitLSDz2qGHm2vP02CPDtcTiX2WwrPNREY5-bGP-JlfuBjkxAhHQparpW1Shg7Fa8tNcPWLVrVI-FjMEYYTssB7UBQ-jeSXzmS9m8XP-QIZXepW4TeZrIQtWhWnRzwIwAt" -H "Content-Type: application/json" -d '{
"data": {
    "notification": {
        "title": "TimeMe",
        "body": "Your timer has run out!",
        "click_action": "http://localhost:3000/",
        "icon": "data:image/png;base64,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",
    }
},
"to": "USER_TOKEN"
}' https://fcm.googleapis.com/fcm/send
*/

/*
{
    "notification": {
        "title": "TimeMe",
        "body": "Your timer has run out!",
        "click_action": "http://localhost:3000/",
        "icon": "data:image/png;base64,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"
    },
    "to": "USER_TOKEN"
}
*/
















