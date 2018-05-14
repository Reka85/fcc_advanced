document.addEventListener("DOMContentLoaded", function(){
  const arr = [0,1,2,3];
  const startButton = document.getElementById("start-button");

  let chosenNumber;
  startButton.addEventListener("click", getRandomIndex);

  const circles = Array.from(document.getElementsByClassName("circle"));
  circles.map(circle => {
    circle.addEventListener("click", isCorrect);
  });

  function getRandomIndex(){
    chosenNumber = arr[Math.floor(Math.random() * arr.length)];
    console.log(chosenNumber);
    return chosenNumber;
  }

  function isCorrect(e){
    const indexOfClicked = parseInt(e.target.getAttribute("data-index"), 10);
    if (indexOfClicked === chosenNumber){
      console.log("Yuppy");
    }
  }
});
