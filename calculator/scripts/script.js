document.addEventListener("DOMContentLoaded",function(){
  const screen = document.getElementById("screen-value");
  screen.textContent = "";
  const calcNumbers = Array.from(document.getElementsByClassName("num"));//number buttons from 0 to 9
  const calcOperators = Array.from(document.getElementsByClassName("operator"));// +,-,/,* buttons
  const clear = document.getElementById("clear");
  const bspace = document.getElementById("bspace");
  const equal = document.getElementById("equal");
  const point = document.getElementById("point");
  const operators = {"incr": "+", "decr": "-", "division": "/", "multiplication": "*"};
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  let operations = new String();
//equal vegeredményét tovább modositani
//function def külön az eventlistenertöl
//screen.textContent helyett vmi
  let equalClicked = false;

  calcNumbers.forEach(function(button){
    button.addEventListener("click", function(){
      //if the last button that was pressed is the equal button
      if (equalClicked){
        clearOperationsAndScreen();
        equalClicked = false;
      // if last element is an operator clear screen
      } else if (Object.values(operators).includes(operations.slice(-1))) {
        screen.textContent = "";
      }
      addSameTextToOperationsAndScreen(numbers[this.textContent]);
    });
  });

  calcOperators.forEach(function(button){
    button.addEventListener("click", function(e){
      screen.textContent = operators[e.target.getAttribute('data-op')];
      operations += operators[e.target.getAttribute('data-op')];
    });
  });

  clear.addEventListener("click", clearOperationsAndScreen);

  equal.addEventListener("click", function(){
    // if equal is clicked multiple times we repeat the last operation
    if (equalClicked){
      const reg = /(\-|\+|\/|\*)[0-9]+$/;
      operations += operations.match(reg)[0];
    }
    screen.textContent = (eval(operations));// get result
    equalClicked = true;
  });

  bspace.addEventListener("click", function(){
    screen.textContent = screen.textContent.slice(0, -1);
    operations = operations.slice(0, -1);
  });

  point.addEventListener("click", function(){
    // if last element is a number we add decimal point
    if (operations.slice(-1) === parseInt(operations.slice(-1), 10).toString()){
      addSameTextToOperationsAndScreen(".");
    }
  });

  function clearOperationsAndScreen(){
    operations = "";
    screen.textContent = "";
  }

  function addSameTextToOperationsAndScreen(str){
    screen.textContent += str;
    operations += str;
  }
});


