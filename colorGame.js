DOM = {
    rgbDisplay: document.querySelector(".rgb-label"),
    squareDisplay: document.querySelectorAll(".square"),
    header: document.querySelector("#header"),
    btnNew: document.querySelector(".btn-new"),
    btnTry: document.querySelector(".btn-try"),
    scoreDisplay: document.querySelector(".score")
}

var dispRGB = [];
var score = 0;
var trial = 0;
var round = 0;
var isGameWon = false;
var headerRGB = [41, 128, 185]
initGame();
setEventListeners();

function setEventListeners() {

    for (i = 0; i < DOM.squareDisplay.length; i++) {
        var tempRGB = [];
        DOM.squareDisplay[i].addEventListener("click", function() {
            if (!isGameWon) {
                trial++;
                tempRGB = this.style.backgroundColor.match(/\((.*?)\)/)[1].split(",").map(Number);
                if (tempRGB[0] === dispRGB[0] && tempRGB[1] === dispRGB[1] && tempRGB[2] === dispRGB[2]) {
                    gameWon();
                } else {
                    this.style.backgroundColor = "black";
                }
            }
        });
    }

    DOM.btnNew.addEventListener("click", initGame);
    DOM.btnTry.addEventListener("click", tryAgain);

}

function initGame() {
    score = 0;
    round = 0;
    DOM.scoreDisplay.textContent = score + " / " + round;
    tryAgain();
}

function tryAgain() {
    trial = 0;
    isGameWon = false;

    dispRGB = getRandomRGB();
    var randomSquare = getRandomNumber(6);

    DOM.rgbDisplay.textContent = dispRGB[0] + ", " + dispRGB[1] + ", " + dispRGB[2];
    
    styleBackground(DOM.header, headerRGB);
    DOM.squareDisplay.forEach(function(el, i) {
        if (i === randomSquare) styleBackground(el, dispRGB);
        else styleBackground(el, getRandomRGB());
    });
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
}

function getRandomRGB() {
    return Array.from({length: 3}, getRandomNumber);
}

function getRandomNumber(val = 256) {
    return Math.floor(Math.random() * val);
}