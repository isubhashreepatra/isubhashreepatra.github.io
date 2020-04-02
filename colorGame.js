DOM = {
    rgbDisplay: document.querySelector(".rgb-label"),
    squareDisplay: document.querySelectorAll(".square"),
    header: document.querySelector("#header"),
    content: document.querySelector("#content"),
    btnNew: document.querySelector(".btn-new"),
    btnTry: document.querySelector(".btn-try"),
    btnEasy: document.querySelector(".btn-easy"),
    btnHard: document.querySelector(".btn-hard"),
    scoreDisplay: document.querySelector(".score"),
    winAudio: document.querySelector("#winAudio"),
    clickAudio: document.querySelector("#clickAudio")
}

var dispRGB = [];
var score = 0;
var trial = 0;
var round = 0;
var isGameWon = false;
var headerRGB = [41, 128, 185]
initGame();


function setEventListeners() {
    console.log("This is starting");
    console.log(DOM.squareDisplay);

    for (i = 0; i < DOM.squareDisplay.length; i++) {
        var tempRGB = [];
        DOM.squareDisplay[i].addEventListener("click", function() {           
            if (!isGameWon) {
                DOM.clickAudio.load();
                DOM.clickAudio.play();
                trial++;
                tempRGB = this.style.backgroundColor.match(/\((.*?)\)/)[1].split(",").map(Number);
                if (tempRGB[0] === dispRGB[0] && tempRGB[1] === dispRGB[1] && tempRGB[2] === dispRGB[2]) {
                    gameWon();
                } else {
                    this.style.backgroundColor = "rgb(0, 0, 0)";
                    this.style.transition = "background-color 500ms linear";
                }
            }
        });
    }

    DOM.btnNew.addEventListener("click", initGame);
    DOM.btnTry.addEventListener("click", tryAgain);

    // Listening to click of Button -Easy & Hard
    DOM.btnEasy.addEventListener("click", function() {
        deleteSquareRow();
    });
    DOM.btnHard.addEventListener("click", function() {
        addSquareRow();
    });

}

function addSquareRow() {
    
    if (DOM.squareDisplay.length === 3) {
        DOM.btnHard.classList.add("active");
        DOM.btnEasy.classList.remove("active");
        var html = '<div class="square"></div>';
        for (var i = 0; i < 3; i++) {
            DOM.content.insertAdjacentHTML("beforeend", html);
        }
        DOM.squareDisplay = document.querySelectorAll(".square");
        initGame();
        setEventListeners();
    }
}

function deleteSquareRow() {
    if (DOM.squareDisplay.length === 6) {
        DOM.btnHard.classList.remove("active");
        DOM.btnEasy.classList.add("active");
        for (var i = 0; i < 3; i++) {
            DOM.squareDisplay[i].remove();
        }
        DOM.squareDisplay = document.querySelectorAll(".square");
        initGame();
        setEventListeners();
    }
}

function initGame() {
    score = 0;
    round = 0;
    DOM.scoreDisplay.textContent = score + " / " + round;
    tryAgain();
    setEventListeners();
}

function tryAgain() {
    trial = 0;  // Number to clicks it takes to win a game
    isGameWon = false;

    dispRGB = getRandomRGB(); // Get a random RGB color to display on TOP
    var randomSquare = getRandomNumber(DOM.squareDisplay.length);

    DOM.rgbDisplay.textContent = dispRGB[0] + ", " + dispRGB[1] + ", " + dispRGB[2];
    
    styleBackground(DOM.header, headerRGB);

    DOM.squareDisplay.forEach(function(el, i) {
        if (i === randomSquare) styleBackground(el, dispRGB);
        else styleBackground(el, getRandomRGB());
    });
    DOM.winAudio.pause();
}

function styleBackground(el, rgbArr) {
    el.style.backgroundColor = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
}

function gameWon() {
    round++;
    if (trial == 1) score++;
    isGameWon = true;

    DOM.squareDisplay.forEach(el => styleBackground(el, dispRGB));
    styleBackground(DOM.header, dispRGB);
    DOM.scoreDisplay.textContent = score + " / " + round;
    DOM.winAudio.load();
    DOM.winAudio.play();
}

function getRandomRGB() {
    return Array.from({length: 3}, getRandomNumber);
}

function getRandomNumber(val = 256) {
    return Math.floor(Math.random() * val);
}