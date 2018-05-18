document.addEventListener("DOMContentLoaded", function(){
  const arr = [0,1,2,3]; //a random number will be chosen from it
  let chosenNumbers = [];
  let userNumbers = [];
  const info = document.getElementById("info");
  const circles = Array.from(document.getElementsByClassName("circle"));

  //setting up sound
  const blueClickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  const greenClickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const redClickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const yellowClickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

  let soundOn = true;
  const soundToggle = document.getElementById("sound");
  soundToggle.addEventListener("click", function(e){
    soundOn = !soundOn;
    e.target.textContent = e.target.textContent === "Sound on" ? "Sound off" : "Sound on";
  });


  // setting up checkbox
  const checkbox = document.getElementById("choose-strict");

  let strict = checkbox.checked;

  checkbox.addEventListener("change", toggleStrict);

  function toggleStrict(){
    strict = !strict;
  }

  //setting up buttons
  const count = document.getElementById("count");
  count.textContent = 0;

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);

  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetGame);

  //starting game
  function startGame(e){
    circles.map(circle => {
      circle.addEventListener("click", addToUserNumbers);
    });
    info.textContent = "Simon game"
    getRandomIndex();
    e.target.removeEventListener("click", startGame, false);
    e.target.style.background = "rgb(118,118,118)";
  }

  //computer chooses a random index
  function getRandomIndex(){
    chosenNumbers.push(arr[Math.floor(Math.random() * arr.length)]);
    count.textContent++;
    showChosenButtons();
    return chosenNumbers;
  }

  //showing the buttons chosen by the computer
  function showChosenButtons(){
    let i = 0;
    const buttons = setInterval(function(){
      showButton(chosenNumbers[i]);
      i++;
      if (i >= chosenNumbers.length){
        clearInterval(buttons);
      }
    },1200)
  }

  // button flashes
  function showButton(button){
    const b = circles[button];
    b.classList.add(`${b.id}Clicked`);
    if (soundOn) playSound(b.id);
    setTimeout(function(){
      b.classList.remove(`${b.id}Clicked`);
    },600)
  }

  //sound played when button flashes
  function playSound(color){
    switch (color){
      case "red":
        redClickSound.play();
        break;
      case "blue":
        blueClickSound.play();
        break;
      case "yellow":
        yellowClickSound.play();
        break;
      case "green":
        greenClickSound.play();
        break;
      default:
        console.log("Sound could not be found for the button");
        break;
    }
  }

  //user has to click on button that has the corresponding index
  function addToUserNumbers(e){
    const clickedButton = e.target
    userNumbers.push(parseInt(clickedButton.getAttribute("data-index"), 10));
    clickedButton.classList.add(`${clickedButton.id}Clicked`);
    if (soundOn) playSound(clickedButton.id);
    setTimeout(function(){
      clickedButton.classList.remove(`${clickedButton.id}Clicked`);
    },400)
    isCorrect(userNumbers, chosenNumbers);
  }

  function isCorrect(arr1, arr2){
    //user has not yet finished clicking on the buttons
    for(let i = 0; i < arr1.length; i++) {
      if(arr2[i] !== arr1[i]){
        if(strict){
          info.textContent = "Start again!";
          resetGame();
          return false;
        } else {
          showChosenButtons();
          userNumbers = [];
          return false;
        }
      }
    }
    //if the 2 arrays are of the same length and all their elements are identical
    if (arr1.length === arr2.length){
      if (arr1.length === 5){// win after 5 turns
        handleWin();
      } else {
        //round finished succcessfully
        getRandomIndex();
        userNumbers = [];
      }
    }
    return true;
  }

  function handleWin(){
    info.textContent = "You won!";
    resetGame();
  }

  function resetGame(){
    userNumbers = []
    chosenNumbers = [];
    count.textContent = 0;
    circles.map(circle => {
      circle.removeEventListener("click", addToUserNumbers, false);
    });
    startButton.addEventListener("click", startGame);
    startButton.style.background = "green";
  }
});
