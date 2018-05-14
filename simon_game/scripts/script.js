document.addEventListener("DOMContentLoaded", function(){
  const arr = [0,1,2,3];

  let chosenNumbers = [];
  let userNumbers = [];
  const count = document.getElementById("count");
  count.textContent = 0;
  const circles = Array.from(document.getElementsByClassName("circle"));

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);

  function startGame(e){
    circles.map(circle => {
      circle.addEventListener("click", addToUserNumbers);
    });
    getRandomIndex();
    e.target.removeEventListener("click", startGame, false);
  }

  function getRandomIndex(){
    chosenNumbers.push(arr[Math.floor(Math.random() * arr.length)]);
    count.textContent++;
    console.log(chosenNumbers);
    return chosenNumbers;
  }


  function addToUserNumbers(e){
    userNumbers.push(parseInt(e.target.getAttribute("data-index"), 10));
    console.log(userNumbers)
    isCorrect(userNumbers, chosenNumbers)
  }

  function isCorrect(arr1, arr2){
    for(let i = 0; i < arr1.length; i++) {
      if(arr2[i] !== arr1[i]){
        console.log("sg wrong")
        console.log(`the correct order: ${arr2}`)
        userNumbers = [];
        return false;
      }
    }
    //if the 2 arrays are of the same length and all their elements are identical
    if (arr1.length === arr2.length){
      if (arr1.length === 5){// win after 5 turns
        win();
      } else {
        console.log("ok");
        getRandomIndex();
      }
      userNumbers = [];
    }
    return true;
  }

  function win(){
    console.log("You won!!!!");
    chosenNumbers = [];
    count.textContent = 0;
    circles.map(circle => {
      circle.removeEventListener("click", addToUserNumbers, false);
    });
    startButton.addEventListener("click", startGame);
  }
});
