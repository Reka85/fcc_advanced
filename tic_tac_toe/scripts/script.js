document.addEventListener("DOMContentLoaded", function(){
  let isPlayerX = true;

  Array.from(document.getElementsByClassName("mark-choice")).map(elem => {
    elem.addEventListener("click", chooseMark);
  });


  function chooseMark(){
    isPlayerX = this.textContent === "X";
    startGame();
  }

  function startGame(){
    document.getElementById("info").innerHTML = "";
    document.getElementById("board").style.display = "block";
  }

  Array.from(document.querySelectorAll(".board-row > button")).map(elem => {
    elem.addEventListener("click", putMark);
    });

  function putMark(){
    if (isPlayerX && this.textContent === ""){
      this.textContent = "X";
    }
    else if (!isPlayerX && this.textContent === ""){
      this.textContent = "O";
    }
  }
});
