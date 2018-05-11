document.addEventListener("DOMContentLoaded", function(){
  let origBoard;// keeps track of the changes on the board
  let tie = false;//del
  const fields = Array.from(document.querySelectorAll(".board-row > button")); // the actual board


  const info = document.getElementById("info");//shows the result of the match

  const rematch = document.getElementById("rematch");
  rematch.addEventListener("click", handleRematch);

  //player chooses X or O
  Array.from(document.getElementsByClassName("mark-choice")).map(elem => {
    elem.addEventListener("click", chooseMark);
  });

  let computerMark;
  let humanMark;

  function chooseMark(e){
    humanMark = e.target.textContent;
    computerMark = humanMark === "X" ? "O" : "X";
    startGame();
  }

  //match starts
  function startGame(){
    document.getElementById("options").style.display = "none";
    document.getElementById("board").style.display = "block";
    origBoard = Array.from(Array(9).keys());
    fields.map(field =>
      field.addEventListener("click", takeTurn, false)
    );
  }

  function takeTurn(e){
    if (e.target.innerText === ""){
      putMark(e.target.id, humanMark);
      if (!checkWin(origBoard, humanMark) && !isTie()){
        putMark(getBestField(), computerMark);
      }
    }
  }


  function putMark(fieldID, player){
    origBoard[fieldID] = player;
    fields[fieldID].innerText = player;

    let winner = checkWin(origBoard, player)

    if (winner) {
      gameOver(winner)
    }
    isTie();
  }


  function checkWin(board, player){//hasWon
    let winner = null;
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
      if (board[p1] && board[p1] === player &&
          board[p1] === board[p2] && board[p1] === board[p3]){
        winner = {winningCombinationIndex: winningCombinations.indexOf(combination), player: player};
        break;
      }
    }
    return winner;
  }

  function gameOver(winner){
    fields.map(field => field.removeEventListener("click", takeTurn, false));
    let winnerText = "";
    if (winner.player === humanMark){
      winnerText = "You won";
    }
    else{
      winnerText = "Computer won";
    }
    info.innerHTML = `<p>${winnerText}</p>`;
    info.style.visibility = "visible";
    rematch.style.visibility = "visible";
  }

  function handleRematch(e){
    info.style.visibility = "hidden";
    e.target.style.visibility = "hidden";
    fields.map(field => field.textContent = "");
    origBoard = Array.from(Array(9).keys());
    startGame();
  }

  function getBestField(){
    return minimax(origBoard, computerMark).index;
  }


  function getAvailableFields(){
    return origBoard.filter(elem => typeof(elem) === "number");
  }

  function isTie(){
    if (getAvailableFields().length === 0 ){
      info.style.visibility = "visible"
      info.innerHTML = "<p>It is a tie</p>";
      rematch.style.visibility = "visible";
      fields.map(field => field.removeEventListener("click", takeTurn, false));
      return true;
    }
    return false;
  }


  function minimax(latestBoard, player){
    //after each turn computer calculates the best move possible

    //algorithm makes computer unbeatable, best result a player can get is tie
    //minimax function based on the article:
    //https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
    let availableFields = getAvailableFields(latestBoard);

    //base cases of the recursion
    if (checkWin(latestBoard, humanMark)){
      return {score: -10};
    } else if (checkWin(latestBoard, computerMark)){
      return {score: 10};
    } else if (availableFields.length === 0){
        return {score: 0};
    }

    let moves = [];

    for (let i = 0; i < availableFields.length; i++){
      var move = {};
      move.index = latestBoard[availableFields[i]];
      latestBoard[availableFields[i]] = player;//we simulate move

      //we alternate moves between players during the recursion
      if (player === computerMark){
        let result = minimax(latestBoard, humanMark);
        move.score = result.score;
      } else {
        let result = minimax(latestBoard, computerMark);
        move.score = result.score;
      }

      latestBoard[availableFields[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    //higher the score of a computer move, better for the computer
    if (player === computerMark){
      let bestScore = -10000;
      for (const move of moves){
        if (move.score > bestScore){
          bestScore = move.score;
          bestMove = moves.indexOf(move);
        }
      }
    } else {
      //lower the score of a move for the human, better for the computer
      let bestScore = 10000;
      for (const move of moves){
        if (move.score < bestScore){
          bestScore = move.score;
          bestMove = moves.indexOf(move);
        }
      }
    }
    return moves[bestMove];
  }
});
