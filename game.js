const words =
  "fragile strange donate overflow spiritual careful operate shocking melted scared coordinated possible glorious thoughtful afterthought distribute withdraw obedient rhythm jumbled terrific family tightfisted kittens direction tremendous tested weather screeching enormous domineering righteous necessary progress obsolete accessible install guitar helpful cultured certain complain wanting adorable sweltering ";

const wordArr = words.split(" ");
const answer = wordArr[Math.round(Math.random() * wordArr.length)];
const letterInWord = answer.split("");
const numOfBlanks = answer.length;
const lastLetter = answer.length - 1;
let lives = document.getElementById("live").innerHTML;

let answers = [];
let newArr = [];
//console log for test
console.log(answer);
console.log(numOfBlanks);
console.log(letterInWord);
console.log(lastLetter);
//start game
let startBtn = document.getElementById("start");
let howTo = document.getElementById("howToPlay");
const keyboard = document.getElementById("keys");
const missingDiv = document.getElementById("guessingWord");

const startGame = () => {
  keyboard.style.visibility = "visible";
  howTo.style.visibility = "hidden";
  document.getElementById("lives").style.visibility = "visible";
  let startAudio = new Audio("start.wav");
  startAudio.play();
  //add blanks
  for (let i = 0; i < numOfBlanks; i++) {
    answers[i] = blankDiv = document.createElement("div");
    const blankBtn = document.createElement("button");
    missingDiv.classList.add("guessingWord");
    blankDiv.classList.add("blankDiv");
    blankBtn.classList.add("blankBtn");
    missingDiv.appendChild(blankDiv);
    blankDiv.appendChild(blankBtn);
    blankBtn.innerHTML = "_";
  }
};

const start = () => {
  startBtn.addEventListener("click", startGame);
};
function hide() {
  keyboard.style.visibility = "hidden";
  document.getElementById("lives").style.visibility = "hidden";
  missingDiv.style.visibility = "hidden";
}
//virtual keyboard button press
const btn = document.querySelectorAll(".key");
const myFun = () => {
  for (i = 0; i < btn.length; i++) {
    const ok = btn[i].addEventListener("click", function () {
      console.log(this.name);
      console.log(answer.includes(this.name));
      if (letterInWord.includes(this.name)) {
        let element = this;
        element.innerHTML = "";
        element.setAttribute("disabled", "disabled");
        element.classList.add("keyYes");
        let correct = new Audio("correct.mp3");
        correct.play();
      } else if (letterInWord.includes(this.name) === false) {
        let element = this;
        element.setAttribute("disabled", "disabled");
        element.style.border = "3px solid red";
        element.style.cursor = "default";
        let wrong = new Audio("wrong.mp3");
        wrong.play();

        let inner = document.getElementById("live");
        if (letterInWord.includes(this.name) === false) {
          let min = (lives -= 1);
          console.log("lives:" + lives);
          inner.innerHTML = lives;
        }
        //check if lose
        if (lives === 0) {
          let lose = new Audio("lose.wav");
          lose.play();
          hide();
          setTimeout(function () {
            const card = document.getElementById("win");
            const text = document.getElementById("endTitle");
            const loseSpan = document.getElementById("span");
            document.querySelector(".fas").className = "fas fa-heart-broken";
            loseSpan.innerText = "The word was " + answer;
            text.innerHTML = "Ohhh no <br> You are out of lives!!";
            card.style.visibility = "visible";
          }, 500);
        }
      }
      for (let m = 0; m < numOfBlanks; m++) {
        // if the selected letter is correct
        if (this.name === answer[m]) {
          answers[m].innerHTML = this.name;
          answers[m].classList.add("blankBtn");
          newArr.push(answer[m]);
          console.log(newArr);
          //win
          if (letterInWord.length === newArr.length) {
            letterInWord.every((element) => {
              if (newArr.includes(element)) {
                let win = new Audio("win.wav");
                win.play();
                hide();
                setTimeout(function () {
                  const card = document.getElementById("win");
                  card.style.visibility = "visible";
                }, 500);
              }
            });
          }
        }
      }
    });
  }
};
//  restart game

const playAgain = document.getElementById("playAgain");
playAgain.addEventListener("click", reload);
function reload() {
  location.reload();
}

//keyboard
/*
document.addEventListener('keypress', (event) => {
    let keycode = event.keyCode;
    let keyLetter = String.fromCharCode(keycode);
    console.log(keyLetter);
})*/

//test

//call functions
start();
myFun();
