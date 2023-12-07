// variables
let startingMinutes = 25;
let time = startingMinutes * 60;
let timerInterval;
let timerCount = 0;

const timer = document.querySelector(".timer");
const timerText = timer.querySelector("span");
const button = document.getElementById("timer-btn");

// format time
function formatTime(minutes, seconds) {
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${minutes}:${seconds}`;
}

// start timer
function startTimer() {
    if (time < 0) {
        time = startingMinutes * 60;
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    button.textContent = "Pause Timer";
}

// update timer
function updateTimer() {
    
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerText.textContent = formatTime(minutes, seconds);
    time--;

    updateProgressBar();

    if (time < 0) {
        timerCount++

        resetTimer();
        selectTimer();
    }
}

// pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;

    button.textContent = "Start Timer";
}

function resetTimer() {
    pauseTimer();

    time = startingMinutes * 60;
    timerText.textContent = formatTime(startingMinutes, 0);

    document.getElementById("progress-bar").setAttribute("stroke-dasharray", "283 283");
}

// toggle timer
function toggleTimer() {
    if (timerInterval !== undefined) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// calculate time fraction
function calculateTimeFraction() {
    const rawTimeFraction = time / (startingMinutes * 60);
    return rawTimeFraction
}

// update progress bar
function updateProgressBar() {
    const circleDasharray = `${(calculateTimeFraction() * 283)} 283`;
    document.getElementById("progress-bar").setAttribute("stroke-dasharray", circleDasharray);
}

// timer selections
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");

// set pomodoro
function setPomodoro() {
    resetTimer();

    startingMinutes = 25;
    time = startingMinutes * 60;
    timerText.textContent = formatTime(startingMinutes, 0);

    pomodoro.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
}

// set short break
function setShortBreak() {
    resetTimer();

    startingMinutes = 5;
    time = startingMinutes * 60;
    timerText.textContent = formatTime(startingMinutes, 0);

    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
    pomodoro.classList.remove("active");
}

// set long break
function setLongBreak() {
    resetTimer();

    startingMinutes = 15;
    time = startingMinutes * 60;
    timerText.textContent = formatTime(startingMinutes, 0);

    longBreak.classList.add("active");
    pomodoro.classList.remove("active");
    shortBreak.classList.remove("active");
}

// automate timer selection
function selectTimer() {
    if (timerCount == 1) {
        setShortBreak();
    } else if (timerCount == 2) {
        setPomodoro();
    } else if (timerCount == 3) {
        setShortBreak();
    } else if (timerCount == 4) {
        setPomodoro();
    } else if (timerCount == 5) {
        setShortBreak();
    } else if (timerCount == 6) {
        setPomodoro();
    } else if (timerCount == 7) {
        setLongBreak();
    } else {
        timerCount = 0;
        setPomodoro();
    }
}