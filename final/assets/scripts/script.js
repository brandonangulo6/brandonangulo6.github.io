//Current chosen difficulty in ID form
let chosenDifficulty = "Circle4";

//Current chosen difficulty in integer form
let chosenDifficultyNum = 4;

//boolean that decides whether game is started or not
let gameStarted = false;

//the current pattern the user is trying to guess
let currentPattern = [];

//the users current guess
let userGuess = [];

//boolean that decides whether or not the pattern is playing
let patternPlaying = false;

//the score of the current player
let Score = 0;

//set default difficulty to 4
selectDifficulty(chosenDifficulty);

document.getElementById("Circle1").onclick = clickedCircle;

document.getElementById("Circle2").onclick = clickedCircle;

document.getElementById("Circle3").onclick = clickedCircle;

document.getElementById("Circle4").onclick = clickedCircle;

document.getElementById("Circle5").onclick = clickedCircle;

document.getElementById("Circle6").onclick = clickedCircle;

document.getElementById("Circle7").onclick = clickedCircle;

document.getElementById("startButton").onclick = startGame;

document.getElementById("title").onclick = homeButton;

function homeButton() {
    if (gameStarted) {
        endGame();
    }
}

function clickedCircle(){
    //if gameStarted is False then it calls selectDifficulty() with the buttonID and if True then it calls enterSingleGuess() with the buttonID
    if(!gameStarted) {
        selectDifficulty(this.id);
    } else if (gameStarted && !patternPlaying) {
        enterSingleGuess(this.id);
    }
}

function stringToNum() {
    //Sets chosenDifficultyNum to the integer from chosenDifficulty
    numString = chosenDifficulty.slice(-1);
    chosenDifficultyNum = parseInt(numString, 10);
}

function selectDifficulty(circle) {
    //changes opacity of selected circle, changes chosenDifficulty and calls stringToNum
    document.getElementById(chosenDifficulty).style.opacity = "50%";
    chosenDifficulty = circle;
    document.getElementById(chosenDifficulty).style.opacity = "100%";
    stringToNum();
    console.log("Current Difficulty is: " + chosenDifficultyNum.toString());
    
}

function startGame(){
    //if gameStarted is false then it sets gameStarted to true and calls switchdiffText, if gamestarted is false then it calls endGame() and switchDiffText()
    if (gameStarted == false) {
        gameStarted = true;
        switchdiffText();
        createPattern();
        unlight(chosenDifficulty);
        patternPlayerHandler();
    } else {
        checkPlayerGuess();
    }

}

function switchdiffText() {
    //if gameStarted is true then diffText becomes Current Score and startButton becomes Home and if false then diffText is Select and startButton is Press 
    if (gameStarted) {
        document.getElementById("diffText").innerHTML = "Current Score: " + Score.toString();
        document.getElementById("startButton").innerHTML = "Enter Guess";
    } else {
        document.getElementById("diffText").innerHTML = "Select your difficulty";
        document.getElementById("startButton").innerHTML = "Press to Start";
    }
}

function createPattern() {
    //creates a pattern and sets currentPattern to be that 
    currentPattern = [];
    for (let i=0; i < chosenDifficultyNum + Score; i++ ) {
        let randNum = Math.floor(Math.random() * 7) + 1;
        currentPattern[i] = "Circle" + randNum.toString();
    }
    console.log(currentPattern);
}

function unlight(circle) {
    //sets opacity of circle back to 50%
    document.getElementById(circle).style.opacity = "50%";
}

function patternPlayerHandler() {
    //sets patternPlaying to true, changes text, calls PlayPattern(currentPattern), sets patternPlaying back to false, resets userGuess, changes text again
    patternPlaying = true;
    document.getElementById("instructText").innerHTML = "Pattern is Playing";
    playPattern(currentPattern);
    patternPlaying = false;
    userGuess = [];
    setTimeout(() => {
        document.getElementById("instructText").innerHTML = "Guess the order they appeared then press button below";
    }, currentPattern.length * 1500);

}

function playPattern(pattern) {
    //plays pattern by recursively going through the pattern and changing the opacity with 1000 millisec delay
    let index = 0;
    const playCircle = () => {
        if (index >= pattern.length) {
            return;
        }

        const currentCircle = pattern[index];

        lightUp(currentCircle);

        setTimeout(() => {
            unlight(currentCircle);
            index ++;
            playCircle();
        }, 1500);
    }
    playCircle();
}

function enterSingleGuess(circleID) {
    //it adds the passed in circleID to userGuess and temporarily increases opacity of the guessed circle
    userGuess.push(circleID);
    lightUp(circleID);
    setTimeout(unlight, 1000, circleID);
    console.log(userGuess);
}

function checkPlayerGuess () {
    /*It checks to see if the userGuess is equal to currentPattern and if yes then it calls updateScore(true) and continueGame()
    and otherwise it calls updateScore(false)*/
    console.log("Checking");
    if (userGuess.length === currentPattern.length && userGuess.every((val, index) => val === currentPattern[index])) {
        updateScore(true);
        continueGame();
    } else {
        updateScore(false);
        endGame();
    }
}

function updateScore(correct) {
    // if correct is true then it increases Score and score text by 1 and if not then it changes it to "you lost"
    if (correct) {
        Score ++;
        document.getElementById("diffText").innerHTML = "Current Score: " + Score.toString();
    } else {
        document.getElementById("diffText").innerHTML = "You lost! Final Score: " + Score.toString();
    }
}

function continueGame() {
    //calls createPattern and patternPlayerHandler to continue the game
    createPattern();
    patternPlayerHandler();
}


function endGame(){
    //sets gameStarted to false, resets global variables
    gameStarted = false;
    chosenDifficulty = "Circle4";
    chosenDifficultyNum = 4;
    currentPattern = [];
    userGuess = [];
    patternPlaying = false;
    Score = 0;
    setTimeout(() => {
        document.getElementById("diffText").innerHTML = "Returning to Difficulty Selection in 3";}, 2000);
    setTimeout(() => {
        document.getElementById("diffText").innerHTML = "Returning to Difficulty Selection in 2";}, 3000);
    setTimeout(() => {
        document.getElementById("diffText").innerHTML = "Returning to Difficulty Selection in 1";}, 4000);
    setTimeout(() => {
        document.getElementById("diffText").innerHTML = "Select your difficulty";
        document.getElementById("instructText").innerHTML = "Press the circles in the order they appear";
        selectDifficulty(chosenDifficulty);
        document.getElementById("startButton").innerHTML = "Press to Start";}, 5000);
}


function lightUp(circle) {
    //changes opacity of circle to %100
    document.getElementById(circle).style.opacity = "100%";
}

