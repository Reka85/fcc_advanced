document.addEventListener("DOMContentLoaded", function(){
  let isPlayerX = true;
  const rematch = document.getElementById("rematch");
  const info = document.getElementById("info");

  rematch.addEventListener("click", handleRematch);

  Array.from(document.getElementsByClassName("mark-choice")).map(elem => {
    elem.addEventListener("click", chooseMark);
  });


  function chooseMark(){
    isPlayerX = this.textContent === "X";
    startGame();
  }

  function startGame(){
    info.innerHTML = "";
    document.getElementById("board").style.display = "block";
    computerMarks();
  }

  const fields = Array.from(document.querySelectorAll(".board-row > button"));
  fields.map(elem => {
    elem.addEventListener("click", putMark);
  });

  function putMark(){
    if (isPlayerX && this.textContent === "" && !won){
      this.textContent = "X";
      computerMarks();
      hasWon();
    }
    else if (!isPlayerX && this.textContent === "" && !won){
      this.textContent = "O";
      computerMarks();
      hasWon();
    }
  }
// is empty string false in jS?
  function computerMarks(){
    hasWon();
    if (!won){
      const field = getRandomField();
      field.textContent = isPlayerX ? "O" : "X";
    }
  }

  function getRandomField(){
    do{
      let randomField = fields[Math.floor(Math.random() * fields.length)];
      if (randomField.textContent === ""){
        return randomField;
      }
    }while(true)
  }

  let won = false;

  function hasWon(){
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let combination of winningCombinations){
      [p1, p2, p3] = combination;
      if (fields[p1].textContent && fields[p1].textContent === fields[p2].textContent && fields[p1].textContent === fields[p3].textContent){
        if ((isPlayerX && fields[p1].textContent === "X") || (!isPlayerX && fields[p1].textContent === "O")){
          info.innerHTML = "<p>You won</p>";
        }
        else{
          info.innerHTML = "<p>Computer won</p>";
        }
        won = true;
        rematch.style.display = "block";
        break;
      }
    }

    isTie();
  }

  function handleRematch(){
    document.getElementById("info").innerHTML = "";
    fields.map(field => field.textContent = "");
    won = false;
    this.style.display = "none";
    computerMarks();
  }

  function isTie(){
    if (fields.every(isXorO) && !won){
      info.innerHTML = "<p>It is a tie</p>";
      rematch.style.display = "block";
    }

    function isXorO(elem){
      return elem.textContent === "X" || elem.textContent === "O";
    }
  }
});
