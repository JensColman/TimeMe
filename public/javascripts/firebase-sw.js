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
        "title": "Firebase",
        "body": "Your timer has run out!",
        "click_action": "http://localhost:3000/",
        "icon": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01ODMuNzI4LDM3NS43OTNjLTEyLjMxNiwxMjQuMDAxLTExMi43OSwyMjMuNjY2LTIzNi44OCwyMzUuMDY4QzIwMC4xNiw2MjQuMzQsNzUuMDc3LDUxNi40OSw2MC41NjgsMzc2LjMxMkgzNC43MTYgICBjLTE1LjcxNywwLTI1LjU0LTE3LjAxNi0xNy42OC0zMC42MjZsNTcuODE4LTEwMC4xMjJjNy44NTktMTMuNjA5LDI3LjUwMy0xMy42MDgsMzUuMzYxLDAuMDAxbDU3LjgwNywxMDAuMTIyICAgYzcuODU4LDEzLjYxMS0xLjk2NSwzMC42MjUtMTcuNjgxLDMwLjYyNWgtMjIuNTA2YzE0LjYyMSwxMDQuNjU5LDExMi4wNTcsMTgzLjE1MiwyMjMuNzcyLDE2Ni43NzggICBjODIuNjY3LTEyLjExNSwxNDkuNzIyLTc3LjMzNiwxNjMuNzczLTE1OS42OTdjMjEuMDMxLTEyMy4yNzEtNzMuODI5LTIzMC41NTgtMTkzLjI3MS0yMzAuNTU4ICAgYy0zOC43MzQsMC03Ni4xMTksMTEuMjM4LTEwOC4yMzMsMzIuNTE5Yy0xNC45MDQsOS44NzYtMzUuNTY0LDcuOTIyLTQ2LjQ5OC02LjIyM2MtMTEuOTA1LTE1LjQwMi04LjE4OC0zNy4zODksNy42ODctNDguMTA5ICAgYzM0LjQ1NS0yMy4yNzYsNzMuNTE1LTM3LjgyMiwxMTQuNDM4LTQyLjg4N1Y1MC4xODRoLTI2Ljc4NGMtOS4yMTUsMC0xNi42ODYtNy40Ny0xNi42ODYtMTYuNjg2VjE2LjY4NiAgIEMyNDYuMDMzLDcuNDcsMjUzLjUwMywwLDI2Mi43MTksMEgzODYuOTNjOS4yMTUsMCwxNi42ODYsNy40NywxNi42ODYsMTYuNjg2djE2LjgxMmMwLDkuMjE1LTcuNDcsMTYuNjg2LTE2LjY4NiwxNi42ODZoLTI5LjUwMiAgIHYzOC4zNDdDNDk0LjI4LDEwNi45OTYsNTk4LjEwMiwyMzEuMDYyLDU4My43MjgsMzc1Ljc5M3ogTTU5Mi4zNywxMjMuMjY1TDU0Mi4wNTgsNzYuNzZjLTYuNzY4LTYuMjU1LTE3LjMyNC01Ljg0LTIzLjU4LDAuOTI3ICAgbC0xMy4zMDksMTQuMzk5Yy02LjI1Niw2Ljc2Ny01Ljg0MSwxNy4zMjQsMC45MjcsMjMuNThsNTAuMzEyLDQ2LjUwNGM2Ljc2OCw2LjI1NCwxNy4zMjQsNS44NCwyMy41OC0wLjkyN2wxMy4zMDktMTQuMzk5ICAgQzU5OS41NTMsMTQwLjA3Nyw1OTkuMTM4LDEyOS41Miw1OTIuMzcsMTIzLjI2NXogTTMyMS4zMTgsMTg3LjEzOXYxNjMuMTk0aDE2MS41NjUgICBDNDgyLjg4NSwyNTAuOTQ5LDQwNy40ODEsMTg3LjEzOSwzMjEuMzE4LDE4Ny4xMzl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
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
        "icon": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01ODMuNzI4LDM3NS43OTNjLTEyLjMxNiwxMjQuMDAxLTExMi43OSwyMjMuNjY2LTIzNi44OCwyMzUuMDY4QzIwMC4xNiw2MjQuMzQsNzUuMDc3LDUxNi40OSw2MC41NjgsMzc2LjMxMkgzNC43MTYgICBjLTE1LjcxNywwLTI1LjU0LTE3LjAxNi0xNy42OC0zMC42MjZsNTcuODE4LTEwMC4xMjJjNy44NTktMTMuNjA5LDI3LjUwMy0xMy42MDgsMzUuMzYxLDAuMDAxbDU3LjgwNywxMDAuMTIyICAgYzcuODU4LDEzLjYxMS0xLjk2NSwzMC42MjUtMTcuNjgxLDMwLjYyNWgtMjIuNTA2YzE0LjYyMSwxMDQuNjU5LDExMi4wNTcsMTgzLjE1MiwyMjMuNzcyLDE2Ni43NzggICBjODIuNjY3LTEyLjExNSwxNDkuNzIyLTc3LjMzNiwxNjMuNzczLTE1OS42OTdjMjEuMDMxLTEyMy4yNzEtNzMuODI5LTIzMC41NTgtMTkzLjI3MS0yMzAuNTU4ICAgYy0zOC43MzQsMC03Ni4xMTksMTEuMjM4LTEwOC4yMzMsMzIuNTE5Yy0xNC45MDQsOS44NzYtMzUuNTY0LDcuOTIyLTQ2LjQ5OC02LjIyM2MtMTEuOTA1LTE1LjQwMi04LjE4OC0zNy4zODksNy42ODctNDguMTA5ICAgYzM0LjQ1NS0yMy4yNzYsNzMuNTE1LTM3LjgyMiwxMTQuNDM4LTQyLjg4N1Y1MC4xODRoLTI2Ljc4NGMtOS4yMTUsMC0xNi42ODYtNy40Ny0xNi42ODYtMTYuNjg2VjE2LjY4NiAgIEMyNDYuMDMzLDcuNDcsMjUzLjUwMywwLDI2Mi43MTksMEgzODYuOTNjOS4yMTUsMCwxNi42ODYsNy40NywxNi42ODYsMTYuNjg2djE2LjgxMmMwLDkuMjE1LTcuNDcsMTYuNjg2LTE2LjY4NiwxNi42ODZoLTI5LjUwMiAgIHYzOC4zNDdDNDk0LjI4LDEwNi45OTYsNTk4LjEwMiwyMzEuMDYyLDU4My43MjgsMzc1Ljc5M3ogTTU5Mi4zNywxMjMuMjY1TDU0Mi4wNTgsNzYuNzZjLTYuNzY4LTYuMjU1LTE3LjMyNC01Ljg0LTIzLjU4LDAuOTI3ICAgbC0xMy4zMDksMTQuMzk5Yy02LjI1Niw2Ljc2Ny01Ljg0MSwxNy4zMjQsMC45MjcsMjMuNThsNTAuMzEyLDQ2LjUwNGM2Ljc2OCw2LjI1NCwxNy4zMjQsNS44NCwyMy41OC0wLjkyN2wxMy4zMDktMTQuMzk5ICAgQzU5OS41NTMsMTQwLjA3Nyw1OTkuMTM4LDEyOS41Miw1OTIuMzcsMTIzLjI2NXogTTMyMS4zMTgsMTg3LjEzOXYxNjMuMTk0aDE2MS41NjUgICBDNDgyLjg4NSwyNTAuOTQ5LDQwNy40ODEsMTg3LjEzOSwzMjEuMzE4LDE4Ny4xMzl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
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
        "icon": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01ODMuNzI4LDM3NS43OTNjLTEyLjMxNiwxMjQuMDAxLTExMi43OSwyMjMuNjY2LTIzNi44OCwyMzUuMDY4QzIwMC4xNiw2MjQuMzQsNzUuMDc3LDUxNi40OSw2MC41NjgsMzc2LjMxMkgzNC43MTYgICBjLTE1LjcxNywwLTI1LjU0LTE3LjAxNi0xNy42OC0zMC42MjZsNTcuODE4LTEwMC4xMjJjNy44NTktMTMuNjA5LDI3LjUwMy0xMy42MDgsMzUuMzYxLDAuMDAxbDU3LjgwNywxMDAuMTIyICAgYzcuODU4LDEzLjYxMS0xLjk2NSwzMC42MjUtMTcuNjgxLDMwLjYyNWgtMjIuNTA2YzE0LjYyMSwxMDQuNjU5LDExMi4wNTcsMTgzLjE1MiwyMjMuNzcyLDE2Ni43NzggICBjODIuNjY3LTEyLjExNSwxNDkuNzIyLTc3LjMzNiwxNjMuNzczLTE1OS42OTdjMjEuMDMxLTEyMy4yNzEtNzMuODI5LTIzMC41NTgtMTkzLjI3MS0yMzAuNTU4ICAgYy0zOC43MzQsMC03Ni4xMTksMTEuMjM4LTEwOC4yMzMsMzIuNTE5Yy0xNC45MDQsOS44NzYtMzUuNTY0LDcuOTIyLTQ2LjQ5OC02LjIyM2MtMTEuOTA1LTE1LjQwMi04LjE4OC0zNy4zODksNy42ODctNDguMTA5ICAgYzM0LjQ1NS0yMy4yNzYsNzMuNTE1LTM3LjgyMiwxMTQuNDM4LTQyLjg4N1Y1MC4xODRoLTI2Ljc4NGMtOS4yMTUsMC0xNi42ODYtNy40Ny0xNi42ODYtMTYuNjg2VjE2LjY4NiAgIEMyNDYuMDMzLDcuNDcsMjUzLjUwMywwLDI2Mi43MTksMEgzODYuOTNjOS4yMTUsMCwxNi42ODYsNy40NywxNi42ODYsMTYuNjg2djE2LjgxMmMwLDkuMjE1LTcuNDcsMTYuNjg2LTE2LjY4NiwxNi42ODZoLTI5LjUwMiAgIHYzOC4zNDdDNDk0LjI4LDEwNi45OTYsNTk4LjEwMiwyMzEuMDYyLDU4My43MjgsMzc1Ljc5M3ogTTU5Mi4zNywxMjMuMjY1TDU0Mi4wNTgsNzYuNzZjLTYuNzY4LTYuMjU1LTE3LjMyNC01Ljg0LTIzLjU4LDAuOTI3ICAgbC0xMy4zMDksMTQuMzk5Yy02LjI1Niw2Ljc2Ny01Ljg0MSwxNy4zMjQsMC45MjcsMjMuNThsNTAuMzEyLDQ2LjUwNGM2Ljc2OCw2LjI1NCwxNy4zMjQsNS44NCwyMy41OC0wLjkyN2wxMy4zMDktMTQuMzk5ICAgQzU5OS41NTMsMTQwLjA3Nyw1OTkuMTM4LDEyOS41Miw1OTIuMzcsMTIzLjI2NXogTTMyMS4zMTgsMTg3LjEzOXYxNjMuMTk0aDE2MS41NjUgICBDNDgyLjg4NSwyNTAuOTQ5LDQwNy40ODEsMTg3LjEzOSwzMjEuMzE4LDE4Ny4xMzl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
    },
    "to": "USER_TOKEN"
}
*/
















