const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const request = require('request');
const firebase = require("firebase/app");
const database = require("firebase/database");
const messaging = require("firebase/messaging");


const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ---------------------- Firebase ---------------------- \\

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

var fcm = firebase.messaging;


// ---------------------- Firebase Cloud Messaging ---------------------- \\

var key = 'AAAAemC1CP8:APA91bF5LuwitLSDz2qGHm2vP02CPDtcTiX2WwrPNREY5-bGP-JlfuBjkxAhHQparpW1Shg7Fa8tNcPWLVrVI-FjMEYYTssB7UBQ-jeSXzmS9m8XP-QIZXepW4TeZrIQtWhWnRzwIwAt';
var notification = {
  "title": "Firebase",
  "body": "Your timer has run out!",
  "click_action": "http://localhost:3000/",
  "icon": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01ODMuNzI4LDM3NS43OTNjLTEyLjMxNiwxMjQuMDAxLTExMi43OSwyMjMuNjY2LTIzNi44OCwyMzUuMDY4QzIwMC4xNiw2MjQuMzQsNzUuMDc3LDUxNi40OSw2MC41NjgsMzc2LjMxMkgzNC43MTYgICBjLTE1LjcxNywwLTI1LjU0LTE3LjAxNi0xNy42OC0zMC42MjZsNTcuODE4LTEwMC4xMjJjNy44NTktMTMuNjA5LDI3LjUwMy0xMy42MDgsMzUuMzYxLDAuMDAxbDU3LjgwNywxMDAuMTIyICAgYzcuODU4LDEzLjYxMS0xLjk2NSwzMC42MjUtMTcuNjgxLDMwLjYyNWgtMjIuNTA2YzE0LjYyMSwxMDQuNjU5LDExMi4wNTcsMTgzLjE1MiwyMjMuNzcyLDE2Ni43NzggICBjODIuNjY3LTEyLjExNSwxNDkuNzIyLTc3LjMzNiwxNjMuNzczLTE1OS42OTdjMjEuMDMxLTEyMy4yNzEtNzMuODI5LTIzMC41NTgtMTkzLjI3MS0yMzAuNTU4ICAgYy0zOC43MzQsMC03Ni4xMTksMTEuMjM4LTEwOC4yMzMsMzIuNTE5Yy0xNC45MDQsOS44NzYtMzUuNTY0LDcuOTIyLTQ2LjQ5OC02LjIyM2MtMTEuOTA1LTE1LjQwMi04LjE4OC0zNy4zODksNy42ODctNDguMTA5ICAgYzM0LjQ1NS0yMy4yNzYsNzMuNTE1LTM3LjgyMiwxMTQuNDM4LTQyLjg4N1Y1MC4xODRoLTI2Ljc4NGMtOS4yMTUsMC0xNi42ODYtNy40Ny0xNi42ODYtMTYuNjg2VjE2LjY4NiAgIEMyNDYuMDMzLDcuNDcsMjUzLjUwMywwLDI2Mi43MTksMEgzODYuOTNjOS4yMTUsMCwxNi42ODYsNy40NywxNi42ODYsMTYuNjg2djE2LjgxMmMwLDkuMjE1LTcuNDcsMTYuNjg2LTE2LjY4NiwxNi42ODZoLTI5LjUwMiAgIHYzOC4zNDdDNDk0LjI4LDEwNi45OTYsNTk4LjEwMiwyMzEuMDYyLDU4My43MjgsMzc1Ljc5M3ogTTU5Mi4zNywxMjMuMjY1TDU0Mi4wNTgsNzYuNzZjLTYuNzY4LTYuMjU1LTE3LjMyNC01Ljg0LTIzLjU4LDAuOTI3ICAgbC0xMy4zMDksMTQuMzk5Yy02LjI1Niw2Ljc2Ny01Ljg0MSwxNy4zMjQsMC45MjcsMjMuNThsNTAuMzEyLDQ2LjUwNGM2Ljc2OCw2LjI1NCwxNy4zMjQsNS44NCwyMy41OC0wLjkyN2wxMy4zMDktMTQuMzk5ICAgQzU5OS41NTMsMTQwLjA3Nyw1OTkuMTM4LDEyOS41Miw1OTIuMzcsMTIzLjI2NXogTTMyMS4zMTgsMTg3LjEzOXYxNjMuMTk0aDE2MS41NjUgICBDNDgyLjg4NSwyNTAuOTQ5LDQwNy40ODEsMTg3LjEzOSwzMjEuMzE4LDE4Ny4xMzl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
};

function sendMessageToUser(deviceToken, notification) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Authorization': 'key=' + key,
      'Content-Type': ' application/json'
    },
    body: JSON.stringify({
        "notification": notification,
        "to": deviceToken
      })
  }, 

  function (error, response, body) {
    if (error) {
      console.error(error, response, body);
    }
    else if (response.statusCode >= 400) {
      console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
    }
    else {
      console.log('Done!')
    }
  });
}
  sendMessageToUser(
    "d-Q4CxGlfk4:APA91bFHH-7vbhBwZItTKUFv8tRgbcZxzBFw4e-LsWJmpGyKRgN5_yQbUx80W5Y0gfitD2rsdR0mVcKKkn3dKASZJvIzuob0lcc_TlWCjqaICOJlkcga5AxAEwPXdNR4oNHubqlE8yRr",
    notification
  );

  // ---------------------- Firebase Database ---------------------- \\

var db = firebase.database();
var UsersRef = db.ref("Users");

// // Vraag data uit database op en geef het weer in de console
UsersRef.on('value', gotData, errData);

function gotData(data) {
  // Vraagt de hele database op
  // console.log(data.val());
  var timerSettings = data.child("User").val();
  var keys = Object.keys(timerSettings);
  // var userID = timerSettings.messagingToken;
  // console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    // var k = keys[i];
    var messagingTokens = timerSettings.messagingToken;
    var setTime = timerSettings.setTime;
    console.log(setTime);
    // userID = messagingTokens;

  }
}

function errData(err) {
    console.log('Error!', err);

}

/*
- App.js: 
- App.js: Zorg ervoor dat de firebase token opgehaald kan worden
- App.js: haal data van gebruiker uit database
- App.js: vergelijk lokale naam met naam uit database
- App.js: Voeg een manier in om een push notificatie te lanceren als de tijd afgelopen is
- App.js: Laat push notification pas zien als de timer is afgelopen
- timer.js: Stuur de ingestelde timer door naar de database
- timer.js: als de timer is afgelopen; verwijder de data van de gebruiker in de database
*/




module.exports = app;
