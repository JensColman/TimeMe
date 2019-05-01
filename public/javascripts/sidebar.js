/*jshint esversion: 6 */

// ---------------------- Functions ---------------------- \\

// Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
function importSidebarContent() {
     if (document.getElementById("sidebar")) {
          document.getElementById("sidebar").innerHTML = '<h5 id="sidebarTimer"><span id="date"></span><span id="date-hour"></span><br></h5><h6 id="sidebarTimer2">remaining</h6>';
     }
}

// Zet de timer placeholder op 0.
function emptySidebarTimeSetting() {
     if (document.getElementById("date")) {
          document.getElementById("date").innerHTML = "0";
     }
     if (document.getElementById("date-hour")) {
          document.getElementById("date-hour").innerHTML = " days";
     }
}

// Berekend het enkelvoud of meervoud om te plaatsen in de HTML.
function showTimeSettingSidebar() {

     if (window.localStorage.getItem("timerSettingDays") >= 1) {
          // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
          importSidebarContent();
          if (document.getElementById("date-hour")) {
               if (window.localStorage.getItem("timerSettingDays") == 1) {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingDays") + " day";
               } else {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingDays") + " days";
               }
          }
          //console.log(window.localStorage.getItem("timerSettingDays"));

     } else if (window.localStorage.getItem("timerSettingDays") <= 0 && window.localStorage.getItem("timerSettingHours") >= 1) {
          // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
          importSidebarContent();
          if (document.getElementById("date-hour")) {
               if (window.localStorage.getItem("timerSettingHours") == 1) {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingHours") + " hour";
               } else {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingHours") + " hours";
               }
          }
          //console.log(window.localStorage.getItem("timerSettingHours"));

     } else if (window.localStorage.getItem("timerSettingHours") <= 0 && window.localStorage.getItem("timerSettingMinutes") >= 1) {
          // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
          importSidebarContent();
          if (document.getElementById("date-hour")) {
               if (window.localStorage.getItem("timerSettingMinutes") == 1) {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingMinutes") + " minute";
               } else {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingMinutes") + " minutes";
               }
          }
          //console.log(window.localStorage.getItem("timerSettingMinutes"));

     } else if (window.localStorage.getItem("timerSettingMinutes") <= 0 && window.localStorage.getItem("timerSettingSeconds") >= 1) {
          // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
          importSidebarContent();
          if (document.getElementById("date-hour")) {
               if (window.localStorage.getItem("timerSettingSeconds") == 1) {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingSeconds") +  " second";
               } else {
                    document.getElementById("date-hour").innerHTML = window.localStorage.getItem("timerSettingSeconds") + " seconds";
               }
          }
          console.log(window.localStorage.getItem("timerSettingSeconds"));

     } else {

          //console.log("Niets");
     }
}

// Bereken of de timer al afgelopen is.
function isItDoneYet2() {
     // Parsed de ingestelde tijd om te kunnen gebruiken tijdens de bewerking.
     var countdownDate4 = Date.parse(window.localStorage.getItem("timerSetting"));
     // Berekenen hoeveel tijd er tussen de ingestelde- en de eigen tijd zit.
     var distance = countdownDate4 - now;

     console.log("Eigen tijd in nummers: " + now);
     console.log("Ingestelde tijd in nummers: " + countdownDate4);
     console.log("Verschil tussen de ingestelde- en de eigen tijd: " + distance);
     console.log("");

     // Resterende dagen berekenen.
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
     // Resterende uren berekenen.
     var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
     );
     // Resterende minuten berekenen.
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     // Resterende seconden berekenen.
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

     // Logged de resterende tijd in de console.
     console.log(
          "Resterende dagen: " + window.localStorage.getItem("timerSettingDays")
     );
     console.log(
          "Resterende uren: " + window.localStorage.getItem("timerSettingHours")
     );
     console.log(
          "Resterende minuten: " +
          window.localStorage.getItem("timerSettingMinutes")
     );
     console.log(
          "Resterende seconden: " +
          window.localStorage.getItem("timerSettingSeconds")
     );
     console.log("");

     // Controleert of de timer is afgelopen.
     if (distance < 0) {
          // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
          importSidebarContent();
          // Zet de timer placeholder op 0.
          emptySidebarTimeSetting();
          console.log("Time's up");
          console.log("");

          // Reset de timer.
          clearInterval(timer2);

          // Wist de localstorage.
          localStorage.removeItem("timerSetting");
          localStorage.removeItem("timerSettingDays");
          localStorage.removeItem("timerSettingHours");
          localStorage.removeItem("timerSettingMinutes");
          localStorage.removeItem("timerSettingSeconds");

          // Geeft een notificatie wanneer de timer gestopt is.
          notificationTimerEnd();
          // Herlaad de pagina om een nieuwe timer in te kunnen stellen.
          //window.location.reload();
     } else {
          // Wordt uitgevoerd als er nog meer dan 1 seconde resteert.
          if (seconds >= 1) {
               // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
               importSidebarContent();
               // Berekend het enkelvoud of meervoud om te plaatsen in de HTML.
               showTimeSettingSidebar();
          }
     }
}

// ---------------------- Sidebar timer ---------------------- \\

// Controleert in de localstorage of er een datum is ingesteld in "timersetting".
if (localStorage.getItem("timerSetting") === null) {
     // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
     importSidebarContent();
     // Zet de timer placeholder op 0.
     emptySidebarTimeSetting();
     // Make h5 en h6 fontsize relative to the width of the parent.
     changeTextSize();
} else {
     // Plaatst een teller sidebar in de pagina die nog opgevuld moet worden met de resterende tijd.
     importSidebarContent();

     var timer2 = setInterval(function() {
          // Resterende tijd berekenen en opslaan in localstorage.
          calculateRestingTime();
          // Berekend het enkelvoud of meervoud om te plaatsen in de HTML.
          showTimeSettingSidebar();
          // Bereken of de timer al afgelopen is.
          isItDoneYet2();
          // Make h5 en h6 fontsize relative to the width of the parent.
          changeTextSize();
     }, 1000);
}
