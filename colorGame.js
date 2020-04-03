DOM = {
    rgbDisplay: document.querySelector(".rgb-label"),
    squareDisplay: document.getElementsByClassName('square'),
    selectedDisplay: document.getElementsByClassName('selected-square'),
    header: document.querySelector("#header"),
    content: document.getElementById("content"),
    btnNew: document.querySelector(".btn-new"),
    btnTry: document.querySelector(".btn-try"),
    btnEasy: document.querySelector(".btn-easy"),
    btnHard: document.querySelector(".btn-hard"),
    scoreDisplay: document.querySelector("#score-display"),
    roundDisplay: document.querySelector("#round-display"),
    winAudio: document.querySelector("#winAudio"),
    clickAudio: document.getElementById("clickAudio"),
    displayArea: document.getElementById('display-area')
}

var dispRGB = [];
var score = 0;
var trial = 0;
var round = 0;
var isGameWon = false;
var headerRGB = [41, 128, 185];
var squareDisplayArray = [];
var selectedDisplayArray = [];
initGame();


function setEventListeners() {

    for (i = 0; i < squareDisplayArray.length; i++) {
        var tempRGB = [];
        squareDisplayArray[i].addEventListener("click", function() {           
            if (!isGameWon) {
                DOM.clickAudio.load();
                DOM.clickAudio.play();
                trial++;
                tempRGB = this.style.backgroundColor.match(/\((.*?)\)/)[1].split(",").map(Number);
                if (tempRGB[0] === dispRGB[0] && tempRGB[1] === dispRGB[1] && tempRGB[2] === dispRGB[2]) {                                        
                    gameWon();                    
                } else {
                    this.setAttribute('class','selected-square');                              
                    selectedDisplayArray = Array.from(DOM.selectedDisplay);                                            
                }
            }
        });
    }

    DOM.btnNew.addEventListener("click", initGame);
    DOM.btnTry.addEventListener("click", tryAgain);

    // Listening to click of Button -Easy & Hard
    DOM.btnEasy.addEventListener("click",deleteSquareRow);
    DOM.btnHard.addEventListener("click", addSquareRow);

}

function addSquareRow() {
    var numberOfSquares = DOM.squareDisplay.length;

    DOM.btnHard.classList.add("active");
    DOM.btnEasy.classList.remove("active");
    
    var hiddenSquares = document.querySelectorAll(".selected-square");
    
    for (let index = 0; index < hiddenSquares.length; index++) {
        hiddenSquares[index].remove();
    }
    
    if (numberOfSquares >= 1 && numberOfSquares < 6) {
        for (var i = 0; i < (6-numberOfSquares); i++) {            
            var newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'square');
            DOM.displayArea.appendChild(newDiv);
        }
    }
    initGame();
    setEventListeners();
}

function deleteSquareRow() {

    DOM.btnHard.classList.remove("active");
    DOM.btnEasy.classList.add("active");

    var hiddenSquares = document.querySelectorAll(".selected-square");
        
    for (var i = 0; i < hiddenSquares.length; i++) {
        hiddenSquares[i].remove();
    }

    var nRemainingSquares = DOM.squareDisplay.length;
  
    if (nRemainingSquares > 3 && nRemainingSquares <=6) {
        DOM.btnHard.classList.remove("active");
        DOM.btnEasy.classList.add("active");        
        for (var i = 0; i < (nRemainingSquares - 3); i++) {
            DOM.squareDisplay[i].remove();     
        }

    } else if (nRemainingSquares >=1 && nRemainingSquares <3) {
        DOM.btnHard.classList.remove("active");
        DOM.btnEasy.classList.add("active");
        for (var i = 0; i < (3-nRemainingSquares); i++) {            
            var newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'square');
            DOM.displayArea.appendChild(newDiv);
        }

    }
    initGame();
    setEventListeners();
}

function initGame() {
    score = 0;
    round = 0;
    DOM.scoreDisplay.textContent = score;
    DOM.roundDisplay.textContent = round;
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
   
    squareDisplayArray = Array.from(DOM.squareDisplay);
    
    squareDisplayArray.forEach(function(el, i) {
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
    
    if(selectedDisplayArray){
        selectedDisplayArray.forEach(function(item) {
            item.setAttribute('class', 'square');
        });
    }
    
    squareDisplayArray.forEach(el => styleBackground(el, dispRGB));
    styleBackground(DOM.header, dispRGB);
    DOM.scoreDisplay.textContent = score;
    DOM.roundDisplay.textContent = round;
    DOM.winAudio.load();
    DOM.winAudio.play();
}

function getRandomRGB() {
    return Array.from({length: 3}, getRandomNumber);
}

function getRandomNumber(val = 256) {
    return Math.floor(Math.random() * val);
}

