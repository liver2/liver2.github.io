var fm = 25; // Focus minutes
var sbm = 5; // Short break minutes
var lbm = 15; // Long break minutes

var fs = 0; // Focus seconds
var sbs = 0; // Short break seconds
var lbs = 0; // Long break seconds

var dm = 25; // Display minutes
var ds = 0; // Display seconds

var block = "F"; // other options: "SB" & "LB"
var timerStatus = "NOT_STARTED"; // other options: "TICKING", "PAUSED", "FINISHED"

var timerInterval; // Declaring this variable now so that it's global

var timerFinishedAudio = new Audio("kinderszenenRingtone.mp3"); // New audio for timer finished

// --------------

document.getElementById("focusBlockButton").style.textDecoration = "underline";

document.querySelector('input[id="minuteFieldInput"]').style.textDecoration = "underline";
document.querySelector('input[id="secondFieldInput"]').style.textDecoration = "underline";

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

    document.querySelector('input[id="minuteFieldInput"]').style.textDecoration = "underline";
    document.querySelector('input[id="secondFieldInput"]').style.textDecoration = "underline";

    document.getElementById("playButton").innerHTML = "PLAY";
    document.getElementById("pauseButton").innerHTML = "";
    document.getElementById("resumeButton").innerHTML = "";

    timerFinishedAudio.pause();
    timerFinishedAudio.currentTime = 0;
}

function playResume() {
    if (timerStatus == "NOT_STARTED") {
        timerStatus = "TICKING";

        document.querySelector('input[id="minuteFieldInput"]').disabled = true;
        document.querySelector('input[id="secondFieldInput"]').disabled = true;

        document.querySelector('input[id="minuteFieldInput"]').style.textDecoration = "none";
        document.querySelector('input[id="secondFieldInput"]').style.textDecoration = "none";

        document.getElementById("playButton").style.opacity = 0;
        document.getElementById("pauseButton").style.opacity = 100;

        timerInterval = setInterval(timer,1000);
    } else if (timerStatus == "PAUSED") {
        timerStatus = "TICKING";

        document.getElementById("playButton").style.opacity = 0;
        document.getElementById("pauseButton").style.opacity = 100;

        timerInterval = setInterval(timer,1000);
    };
}

function pause() {
    if (timerStatus == "TICKING") {
        timerStatus = "PAUSED";

        document.getElementById("playButton").style.opacity = 100;
        document.getElementById("pauseButton").style.opacity = 0;

        clearInterval(timerInterval);
    }
}

function timer() {
    if (ds > 9) {
        document.querySelector('input[id="minuteFieldInput"]').value = dm;
        document.querySelector('input[id="secondFieldInput"]').value = ds;
    } else if (ds > -1) {
        document.querySelector('input[id="minuteFieldInput"]').value = dm;
        document.querySelector('input[id="secondFieldInput"]').value = "0" + ds;
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

function fSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "F";

        document.getElementById("focusBlockButton").style.textDecoration = "underline";
        document.getElementById("shortBreakButton").style.textDecoration = "none";
        document.getElementById("longBreakButton").style.textDecoration = "none";

        dm = fm;
        ds = fs;

        tabSwitch();
    }
}

function sbSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "SB";

        document.getElementById("focusBlockButton").style.textDecoration = "none";
        document.getElementById("shortBreakButton").style.textDecoration = "underline";
        document.getElementById("longBreakButton").style.textDecoration = "none";

        dm = sbm;
        ds = sbs;

        tabSwitch();
    }
}

function lbSwitch() {
    if (timerStatus == "NOT_STARTED" || timerStatus == "PAUSED" || timerStatus == "FINISHED") {
        block = "LB";

        document.getElementById("focusBlockButton").style.textDecoration = "none";
        document.getElementById("shortBreakButton").style.textDecoration = "none";
        document.getElementById("longBreakButton").style.textDecoration = "underline";

        dm = lbm;
        ds = lbs;

        tabSwitch();
    }
}

function minuteChange() {
    if (block == "F") {
        fm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    } else if (block == "SB") {
        sbm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    } else if (block == "LB") {
        lbm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
        dm = parseInt(document.querySelector('input[id="minuteFieldInput"]').value);
    }
}

function secondChange() {
    if (block == "F") {
        fs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    } else if (block == "SB") {
        sbs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    } else if (block == "LB") {
        lbs = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
        ds = parseInt(document.querySelector('input[id="secondFieldInput"]').value);
    }
}

// --------------

/* TO DO: 

make a debug function

*/
