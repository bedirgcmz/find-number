/** DOM elements */
const gameNumberContainer = document.querySelector(".game-numbers-container");
const levelOptions = document.querySelector(".level-options");
const guessOptions = document.querySelector(".guess-options");
const startGameButton = document.querySelector(".start-game-button");
const displayGuessNumber = document.querySelector(".display-guess-number");
const popupContainer = document.querySelector(".popup-container");
const popup = document.querySelector(".popup");
const resultMessage = document.querySelector(".result-message");
const popupBackground = document.querySelector(".popup-background");
const player1Point = document.querySelector(".player1-point");
const player2Point = document.querySelector(".player2-point");

/** Variables */
const levelNumbers = [12, 18, 24, 36];
const guessRights = [3, 5, 7, 9];
let selectedLevel;
let selectedGuessNumber;
let hiddenNumber;
let userAnswers = [];
let firstPlayerName;
let secondPlayerName;
let firstPlayerPoint;
let secondPlayerPoint;
let numberOfClicks;

/** This function works when you click on the Game button used to start the game. */

const playGame = () => {
  gameNumberContainer.innerHTML = "";
  userAnswers = [];
  selectedLevel = parseInt(levelOptions.value);
  selectedGuessNumber = parseInt(guessOptions.value) * 2;
  firstPlayerPoint = selectedGuessNumber / 2;
  secondPlayerPoint = selectedGuessNumber / 2;
  numberOfClicks = 1;
  if (
    levelOptions.value == "Please select a level" ||
    guessOptions.value == "How many guesses do you want?"
  ) {
    Swal.fire({
      title: "Are you sure you're ready for the game?!",
      text: "Please select LEVEL and GUESS NUMBER first!",
      icon: "warning",
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
    });
  } else {
    if (levelNumbers.includes(selectedLevel)) {
      hiddenNumber = Math.floor(Math.random() * selectedLevel) + 1;
      for (let index = 1; index <= levelOptions.value; index++) {
        gameNumberContainer.innerHTML += `
            <button id=${`number${index}`} onclick="userAnswer(${index})" class="number">${index}</button>
            `;
      }
      player1Point.innerHTML = firstPlayerPoint;
      player2Point.innerHTML = secondPlayerPoint;
    }
  }
  yourTurn(1, selectedGuessNumber);
};

startGameButton.addEventListener("click", playGame);

/** This function runs when the user clicks on a number in the number table. */
const userAnswer = (pClickedNumber) => {
  const clickedElement = document.getElementById(`number${pClickedNumber}`);

  if (!userAnswers.includes(pClickedNumber)) {
    if (numberOfClicks % 2 === 1 && firstPlayerPoint > 0) {
      //Player 1 area
      //burdan aldimmm
      userAnswers.push(pClickedNumber);
      if (selectedGuessNumber > 0) {
        if (pClickedNumber === hiddenNumber) {
          clickedElement.classList.add("correct");
          Swal.fire({
            title: "Great job!",
            text: "Today is your lucky day my friend, you won.",
            color: "#2ec4b6",
            imageUrl: "./images/winn.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
          startGameButton.textContent = "Play Again";
          for (let index = 1; index <= selectedLevel; index++) {
            document.getElementById(`number${index}`).disabled = true;
          }
        } else {
          clickedElement.classList.add("wrong-blue");
        }
        firstPlayerPoint--;
        selectedGuessNumber--;
        player1Point.innerHTML = firstPlayerPoint;
      }
    }

    if (numberOfClicks % 2 === 0 && secondPlayerPoint > 0) {
      //Player 2 area
      console.log("ikinci oyuncu");
      userAnswers.push(pClickedNumber);
      if (selectedGuessNumber > 0) {
        if (pClickedNumber === hiddenNumber) {
          clickedElement.classList.add("correct");
          Swal.fire({
            title: "Great job!",
            text: "Today is your lucky day my friend, you won.",
            color: "#2ec4b6",
            imageUrl: "./images/winn.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
          startGameButton.textContent = "Play Again";
          for (let index = 1; index <= selectedLevel; index++) {
            document.getElementById(`number${index}`).disabled = true;
          }
        } else {
          clickedElement.classList.add("wrong-red");
        }
        secondPlayerPoint--;
        selectedGuessNumber--;
        player2Point.innerHTML = secondPlayerPoint;
      }
    }

    if (firstPlayerPoint == 0 && secondPlayerPoint == 0) {
      clickedElement.classList.add("wrong");
      for (let index = 1; index <= selectedLevel; index++) {
        document.getElementById(`number${index}`).disabled = true;
      }
      Swal.fire({
        title: "Don't worry!",
        text: "You can play again",
        color: "#d90429",
        imageUrl: "./images/lost.gif",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      startGameButton.textContent = "Play Again";
    }

    numberOfClicks++;
  } else {
    alert("You have already pressed this number");
  }

  yourTurn(numberOfClicks, selectedGuessNumber, pClickedNumber);
};

const yourTurn = (pNumberOfClicks, pSelectedGuessNumber, pClickedNumber) => {
  if (pSelectedGuessNumber == 0 || pClickedNumber == hiddenNumber) {
    player2Point.classList.remove("your-turn");
    player1Point.classList.remove("your-turn");
  } else {
    if (pNumberOfClicks % 2 == 1) {
      player1Point.classList.add("your-turn");
      player2Point.classList.remove("your-turn");
      player2Point.style.transform = "scale(1)";
    } else {
      player1Point.classList.remove("your-turn");
      player2Point.classList.add("your-turn");
      player1Point.style.transform = "scale(1)";
    }
  }
};

$(document).ready(function () {
  setInterval(function () {
    $(".your-turn").css("transform", "scale(1.4)");

    setTimeout(function () {
      $(".your-turn").css("transform", "scale(1)");
    }, 400); // 1000 milliseconds = 1 second
  }, 800); // 2000 milliseconds = 2 seconds (bir saniyede büyüme, bir saniyede küçülme)
});