/*jshint esversion: 6 */

// ---------------------- Functions ---------------------- \\

// Make h5 en h6 fontsize relative to the width of the parent.
function changeTextSize() {
     var sidebarWidth;

     if (document.getElementById("sidebarTimer") && document.getElementById("sidebar")) {
          // Meet de breedte van de tekst in de h5 tag.
          var h5Size = document.getElementById("sidebarTimer").scrollWidth;
          // Meet de breedte van de sidebar.
          sidebarWidth = document.getElementById("sidebar").clientWidth;
          // Berekend hoe groot de fontsize moet zijn om de tekst te laten passen in de sidebar.
          var sidebarCalcWidth = Math.floor((sidebarWidth / h5Size) * parseInt(window.getComputedStyle(document.getElementById("sidebarTimer")).fontSize)) + "px";
          // Plaatst de berekende fontsize in de css.
          document.getElementById("sidebarTimer").style.fontSize = sidebarCalcWidth;
     }

     if (document.getElementById("sidebarTimer2") && document.getElementById("sidebar")) {
          // Meet de breedte van de tekst in de h6 tag.
          var h6Size = document.getElementById("sidebarTimer2").scrollWidth;
          // Meet de breedte van de sidebar.
          sidebarWidth = document.getElementById("sidebar").clientWidth;
          // Berekend hoe groot de fontsize moet zijn om de tekst te laten passen in de sidebar.
          var sidebarCalcWidth2 = Math.floor((sidebarWidth / h6Size) * parseInt(window.getComputedStyle(document.getElementById("sidebarTimer2")).fontSize)) + "px";
          // Plaatst de berekende fontsize in de css.
          document.getElementById("sidebarTimer2").style.fontSize = sidebarCalcWidth2;
     }

     // console.log("Breedte h5: " + h5Size + "px");
     // console.log("Breedte sidebar: " + document.getElementById("sidebar").clientWidth + "px");
     // console.log("Huidige breedte h5: " + window.getComputedStyle(document.getElementById("sidebarTimer")).fontSize);
     // console.log("Berekende breedte: " + (sidebarWidth / h5Size) * parseInt(window.getComputedStyle(document.getElementById("sidebarTimer")).fontSize) + "px");

}
