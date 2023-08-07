var fm = 25; // Focus minutes
var sbm = 5; // Short break minutes
var lbm = 15; // Long break minutes

var fs = 0; // Focus seconds
var sbs = 0; // Short break seconds
var lbs = 0; // Long break seconds

var dm = 25; // Display minutes
var ds = 0; // Display seconds

var block = "F.B."; // other options: "S.B." & "L.B."
var timerStatus = "NOT_STARTED"; // other options: "TICKING", "PAUSED", "FINISHED"

var timerInterval; // Declaring this variable now so that it's global

var timerFinishedAudio = new Audio("kinderszenenRingtone.mp3"); // New audio for timer finished

var clickAudio = new Audio("Mouse-Click-00-m-FesliyanStudios.com.mp3"); 

// --------------

document.getElementById("focusBlockButton").style.textDecoration = "underline";

document.getElementById('clickMe').style.visibility = "visible";

document.title = "Focus With Cats";

document.querySelector('input[id="minuteFieldInput"]').value = dm.toString();
document.querySelector('input[id="secondFieldInput"]').value = 0 + ds.toString();

document.getElementById("pauseButton").style.opacity = 0;

// --------------

function tabSwitch() {
    timerStatus = "NOT_STARTED";

    document.querySelector('input[id="minuteFieldInput"]').value = dm.toString();
    document.querySelector('input[id="secondFieldInput"]').value = 0 + ds.toString();

    document.querySelector('input[id="minuteFieldInput"]').disabled = false;
    document.querySelector('input[id="secondFieldInput"]').disabled = false;

    document.getElementById('clickMe').style.visibility = "visible";
    
    document.getElementById("playButton").style.opacity = 100;
    document.getElementById("pauseButton").style.opacity = 0;

    timerFinishedAudio.pause();
    timerFinishedAudio.currentTime = 0;

    // clickAudio.play();
}

// --------------

function playResume() {
    if (timerStatus == "NOT_STARTED") {
        timerStatus = "TICKING";

        document.querySelector('input[id="minuteFieldInput"]').disabled = true;
        document.querySelector('input[id="secondFieldInput"]').disabled = true;

        document.getElementById('clickMe').style.visibility = "hidden";

        document.getElementById("playButton").style.opacity = 0;
        document.getElementById("pauseButton").style.opacity = 100;

        timerInterval = setInterval(timer,1000);

        // clickAudio.play();
    } else if (timerStatus == "PAUSED") {
        timerStatus = "TICKING";

        document.getElementById("playButton").style.opacity = 0;
        document.getElementById("pauseButton").style.opacity = 100;

        timerInterval = setInterval(timer,1000);

        // clickAudio.play();
    };
}

// --------------

function pause() {
    if (timerStatus == "TICKING") {
        timerStatus = "PAUSED";

        document.getElementById("playButton").style.opacity = 100;
        document.getElementById("pauseButton").style.opacity = 0;

        clearInterval(timerInterval);

        document.title = "Focus With Cats | " + block + " " + "Paused"

        // clickAudio.play();
    }
}

// --------------

function timer() {
    if (ds > 9) {
        document.querySelector('input[id="minuteFieldInput"]').value = dm;
        document.querySelector('input[id="secondFieldInput"]').value = ds;
        document.title = "Focus With Cats | " + block + " " + dm + ":" + ds;
    } else if (ds > -1) {
        document.querySelector('input[id="minuteFieldInput"]').value = dm;
        document.querySelector('input[id="secondFieldInput"]').value = "0" + ds;
        document.title = "Focus With Cats | " + block + " " + dm + ":0" + ds;
    }

    if (ds == 0) {
        dm--;
        ds = 59;
    } else {
        ds--;
    }

    if (dm < 0) {
        clearInterval(timerInterval);
        timerFinishedAudio.play();
        timerStatus = "FINISHED";
    }
}

// --------------

function fSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "F.B.";

        document.getElementById("focusBlockButton").style.textDecoration = "underline";
        document.getElementById("shortBreakButton").style.textDecoration = "none";
        document.getElementById("longBreakButton").style.textDecoration = "none";

        dm = fm;
        ds = fs;

        tabSwitch();
    }

    if (timerStatus == "FINISHED" || timerStatus == "PAUSED") {
        timerStatus = "NOT_STARTED";
    }
}

// --------------

function sbSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "S.B.";

        document.getElementById("focusBlockButton").style.textDecoration = "none";
        document.getElementById("shortBreakButton").style.textDecoration = "underline";
        document.getElementById("longBreakButton").style.textDecoration = "none";

        dm = sbm;
        ds = sbs;

        tabSwitch();
    }

    if (timerStatus == "FINISHED" || timerStatus == "PAUSED") {
        timerStatus = "NOT_STARTED";
    }
}

// --------------

function lbSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "L.B.";

        document.getElementById("focusBlockButton").style.textDecoration = "none";
        document.getElementById("shortBreakButton").style.textDecoration = "none";
        document.getElementById("longBreakButton").style.textDecoration = "underline";

        dm = lbm;
        ds = lbs;

        tabSwitch();
    }

    if (timerStatus == "FINISHED" || timerStatus == "PAUSED") {
        timerStatus = "NOT_STARTED";
    }
}

// --------------

function minuteChange() {
    if (block == "F.B.") {
        fm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    } else if (block == "S.B.") {
        sbm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    } else if (block == "L.B.") {
        lbm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    }
}

// --------------

function secondChange() {
    if (block == "F.B.") {
        fs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    } else if (block == "S.B.") {
        sbs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    } else if (block == "L.B.") {
        lbs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    }
}

// --------------

/* TO DO: 

make a debug function

*/
