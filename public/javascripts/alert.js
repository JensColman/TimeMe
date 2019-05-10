var notice = "If your privacy is very important to you, I wouldn\'t use this website (for now). The data we save are not stored very securely and can be accessed by anyone.\n\nThis website is build to serve as a proof of concept, and is not supposed to serve a lot of people except myself.\n\nBy clicking \"OK\" you agree that you have read the provided info and you're using this website at your own risk.";

if (window.localStorage.getItem("privacySetting") !== "true") {
    if (confirm(notice) == true) {
        window.localStorage.setItem("privacySetting", "true");
    } else {
        window.localStorage.setItem("privacySetting", "false");
        window.history.back();
    }
}

