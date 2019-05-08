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
          icon: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01ODMuNzI4LDM3NS43OTNjLTEyLjMxNiwxMjQuMDAxLTExMi43OSwyMjMuNjY2LTIzNi44OCwyMzUuMDY4QzIwMC4xNiw2MjQuMzQsNzUuMDc3LDUxNi40OSw2MC41NjgsMzc2LjMxMkgzNC43MTYgICBjLTE1LjcxNywwLTI1LjU0LTE3LjAxNi0xNy42OC0zMC42MjZsNTcuODE4LTEwMC4xMjJjNy44NTktMTMuNjA5LDI3LjUwMy0xMy42MDgsMzUuMzYxLDAuMDAxbDU3LjgwNywxMDAuMTIyICAgYzcuODU4LDEzLjYxMS0xLjk2NSwzMC42MjUtMTcuNjgxLDMwLjYyNWgtMjIuNTA2YzE0LjYyMSwxMDQuNjU5LDExMi4wNTcsMTgzLjE1MiwyMjMuNzcyLDE2Ni43NzggICBjODIuNjY3LTEyLjExNSwxNDkuNzIyLTc3LjMzNiwxNjMuNzczLTE1OS42OTdjMjEuMDMxLTEyMy4yNzEtNzMuODI5LTIzMC41NTgtMTkzLjI3MS0yMzAuNTU4ICAgYy0zOC43MzQsMC03Ni4xMTksMTEuMjM4LTEwOC4yMzMsMzIuNTE5Yy0xNC45MDQsOS44NzYtMzUuNTY0LDcuOTIyLTQ2LjQ5OC02LjIyM2MtMTEuOTA1LTE1LjQwMi04LjE4OC0zNy4zODksNy42ODctNDguMTA5ICAgYzM0LjQ1NS0yMy4yNzYsNzMuNTE1LTM3LjgyMiwxMTQuNDM4LTQyLjg4N1Y1MC4xODRoLTI2Ljc4NGMtOS4yMTUsMC0xNi42ODYtNy40Ny0xNi42ODYtMTYuNjg2VjE2LjY4NiAgIEMyNDYuMDMzLDcuNDcsMjUzLjUwMywwLDI2Mi43MTksMEgzODYuOTNjOS4yMTUsMCwxNi42ODYsNy40NywxNi42ODYsMTYuNjg2djE2LjgxMmMwLDkuMjE1LTcuNDcsMTYuNjg2LTE2LjY4NiwxNi42ODZoLTI5LjUwMiAgIHYzOC4zNDdDNDk0LjI4LDEwNi45OTYsNTk4LjEwMiwyMzEuMDYyLDU4My43MjgsMzc1Ljc5M3ogTTU5Mi4zNywxMjMuMjY1TDU0Mi4wNTgsNzYuNzZjLTYuNzY4LTYuMjU1LTE3LjMyNC01Ljg0LTIzLjU4LDAuOTI3ICAgbC0xMy4zMDksMTQuMzk5Yy02LjI1Niw2Ljc2Ny01Ljg0MSwxNy4zMjQsMC45MjcsMjMuNThsNTAuMzEyLDQ2LjUwNGM2Ljc2OCw2LjI1NCwxNy4zMjQsNS44NCwyMy41OC0wLjkyN2wxMy4zMDktMTQuMzk5ICAgQzU5OS41NTMsMTQwLjA3Nyw1OTkuMTM4LDEyOS41Miw1OTIuMzcsMTIzLjI2NXogTTMyMS4zMTgsMTg3LjEzOXYxNjMuMTk0aDE2MS41NjUgICBDNDgyLjg4NSwyNTAuOTQ5LDQwNy40ODEsMTg3LjEzOSwzMjEuMzE4LDE4Ny4xMzl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
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
          sendPushMessage();
          // Vraagt toestemming als die nog niet gegeven is.
     } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
               // Als deze gegeven is, dan opent de notificatie.
               if (permission === "granted") {
                    // Laat een notificatie zien.
                    notify();
                    sendPushMessage();
               }
          });
     }
}