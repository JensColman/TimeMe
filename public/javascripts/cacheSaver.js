/*jshint esversion: 6 */

// ---------------------- Serviceworker ---------------------- \\

// Hiermee kan de timer verder lopen als je geen internet meer hebt.
// Zie https://github.com/ireade/boilerplate-service-worker voor meer info.
if ("serviceWorker" in navigator) {
     // Gebruik een absolute path als je gebruik maakt van Github, anders werkt het niet! Zie https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e voor meer info.
     navigator.serviceWorker
          .register("/javascripts/service-worker.js", {
               scope: "/javascripts/"
          })
          .then(function(registration) {
               console.log("[serviceWorker] Registered. ");
          })
          .catch(function(err) {
               console.log("[serviceWorker] Failed to register. ", err);
          });
}

// ---------------------- HTTP request ---------------------- \\

// Function to perform HTTP request
var get = function(url) {
     return new Promise(function(resolve, reject) {

          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
               if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                         var result = xhr.responseText;
                         result = JSON.parse(result);
                         resolve(result);
                    } else {
                         reject(xhr);
                    }
               }
          };

          xhr.open("GET", url, true);
          xhr.send();

     });
};

// // Hier kan je de externe link opvragen.
// get('https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ')
//   .then(function(response) {
//     // There is an issue with the image being pulled from the API, so using a different one instead.
//     document.getElementsByClassName('targetImage')[0].src = "https://api.nasa.gov/images/earth.png";
//
//   })
//   .catch(function(err) {
//     console.log("Error", err);
// });
