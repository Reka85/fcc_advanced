document.addEventListener("DOMContentLoaded", function(){
  const arr = [0,1,2,3];

  let chosenNumbers = [];
  let userNumbers = [];

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", getRandomIndex);

  function getRandomIndex(){
    chosenNumbers.push(arr[Math.floor(Math.random() * arr.length)]);
    console.log(chosenNumbers);
    return chosenNumbers;
  }

  const circles = Array.from(document.getElementsByClassName("circle"));
  circles.map(circle => {
    circle.addEventListener("click", addToUserNumbers);
  });

  function addToUserNumbers(e){
    userNumbers.push(parseInt(e.target.getAttribute("data-index"), 10));
    console.log(userNumbers)
    isCorrect(userNumbers, chosenNumbers)
  }

  function isCorrect(arr1, arr2){
    for(let i = 0; i < arr1.length; i++) {
      if(arr2[i] !== arr1[i]){
        console.log("sg wrong")
        return false;
      }
    }
    if (arr1.length === arr2.length){
      console.log("ok")
      userNumbers = [];
      getRandomIndex();
    }
    return true;
  }

});
