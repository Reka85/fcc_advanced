document.addEventListener("DOMContentLoaded", function(){
  const arr = [0,1,2,3];
  let chosenNumbers = [];
  let userNumbers = [];
  const circles = Array.from(document.getElementsByClassName("circle"));

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
    getRandomIndex();
    e.target.removeEventListener("click", startGame, false);
    e.target.style.background = "grey";
  }

  //computer chooses a random index
  function getRandomIndex(){
    chosenNumbers.push(arr[Math.floor(Math.random() * arr.length)]);
    count.textContent++;
    console.log(chosenNumbers);
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
    },1500)
  }

  function showButton(field){
    console.log(field);
  }

  //user has to click on button that has the corresponding index
  function addToUserNumbers(e){
    userNumbers.push(parseInt(e.target.getAttribute("data-index"), 10));
    console.log(userNumbers)
    isCorrect(userNumbers, chosenNumbers)
  }

  function isCorrect(arr1, arr2){
    //user has not yet finished clicking on the buttons
    for(let i = 0; i < arr1.length; i++) {
      if(arr2[i] !== arr1[i]){
        if(strict){
          console.log("you have to start again");
          resetGame();
          return false;
        } else {
          console.log("sg wrong"),
          console.log(`the correct order: ${arr2}`)
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
        console.log("ok");
        getRandomIndex();
        userNumbers = [];
      }
    }
    return true;
  }

  function handleWin(){
    console.log("You won!!!!");
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
