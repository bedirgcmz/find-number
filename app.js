/** DOM elements */
const gameNumberContainer = document.querySelector(".game-numbers-container")
const levelOptions = document.querySelector(".level-options")
const guessOptions = document.querySelector(".guess-options")
const startGameButton = document.querySelector(".start-game-button")
const displayGuessNumber = document.querySelector(".display-guess-number")
const popupContainer = document.querySelector(".popup-container")
const popup = document.querySelector(".popup")
const resultMessage = document.querySelector(".result-message")
const popupBackground = document.querySelector(".popup-background")

/** Variables */
const levelNumbers = [12,18,24,36]
const guessRights = [3,5,7,9]
let selectedLevel;
let selectedGuessNumber;
let hiddenNumber;
let userAnswers = [];

/** This function works when you click on the Game button used to start the game. */
startGameButton.addEventListener("click", () => {
    gameNumberContainer.innerHTML = "";
    userAnswers = [];
    selectedLevel = parseInt(levelOptions.value);
    selectedGuessNumber = parseInt(guessOptions.value);
if (levelOptions.value == "Please select a level" || guessOptions.value == "How many guesses do you want?") {
      Swal.fire({
        title: "Are you sure you're ready for the game?!",
        text: "Please select LEVEL and GUESS NUMBER first!",
        icon: "warning",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });

} else {
    if (levelNumbers.includes(selectedLevel)) {
        hiddenNumber = Math.floor(Math.random() * selectedLevel) + 1;
        for (let index = 1; index <= levelOptions.value; index++) {
            gameNumberContainer.innerHTML += `
            <button id=${`number${index}`} onclick="userAnswer(${index})" class="number">${index}</button>
            `
        }; 
        displayGuessNumber.innerHTML = `You have  <b class="fs-3 p-2">${selectedGuessNumber}</b>  guesses to find the hidden number.`
    } else {
        hiddenNumber = Math.floor(Math.random() * levelNumbers[1]) + 1;
        selectedGuessNumber = 5;
        for (let index = 1; index <= levelNumbers[1]; index++) {
            gameNumberContainer.innerHTML += `
            <button id=${`number${index}`} onclick="userAnswer(${index})" class="number">${index}</button>
            `
        }; 
        displayGuessNumber.innerHTML = `You have  <b class="fs-3 p-2">${selectedGuessNumber}</b>  guesses to find the hidden number.`
    }
}   
})

/** This function runs when the user clicks on a number in the number table. */
const userAnswer = (clickedNumber) => {
    const clickedElement = document.getElementById(`number${clickedNumber}`);
    if (!userAnswers.includes(clickedNumber)) {
        selectedGuessNumber--
        displayGuessNumber.innerHTML = `You have  <b class="fs-3 p-2">${selectedGuessNumber}</b>  guesses to find the hidden number.`
        userAnswers.push(clickedNumber)
        if (selectedGuessNumber > 0) {
            if (clickedNumber === hiddenNumber) {
                clickedElement.classList.add('correct');
        Swal.fire({
            title: "Great job!",
            text: "Today is your lucky day my friend, you won.",
            color: "#2ec4b6",
            imageUrl: "./images/winn.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          startGameButton.textContent = "Play Again";
        //   clickedElement.classList.add('wrong'); 
            for (let index = 1; index <= selectedLevel; index++) {
                document.getElementById(`number${index}`).disabled = true
            }
            } else {
                clickedElement.classList.add('wrong'); 
            }
        } else {
            clickedElement.classList.add('wrong'); 
            for (let index = 1; index <= selectedLevel; index++) {
                document.getElementById(`number${index}`).disabled = true
            }
          Swal.fire({
            title: "Don't worry!",
            text: "You can play again",
            color: "#d90429",
            imageUrl: "./images/lost.gif",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          startGameButton.textContent = "Play Again";
        } 
    } else {
        alert("You have already pressed this number")
    }
}




