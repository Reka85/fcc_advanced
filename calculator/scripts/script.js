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
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  let operations = new String();

  let equalClicked = false;

  calcNumbers.forEach(function(button){
    button.addEventListener("click", function(){
      //if the last button that was pressed is the equal button
      if (equalClicked){
        operations = "";
        screen.textContent = "";
        equalClicked = false;
      }
      // if screen is empty or there is already a number or the last character is a decimal point
      else if (screen.textContent === "" || screen.textContent === parseInt(screen.textContent, 10).toString() || screen.textContent.slice(-1) === "."){
        //pass
      }else{
        screen.textContent = "";
      }
      screen.textContent += numbers[button.textContent].toString();
      operations += numbers[button.textContent].toString();
    });
  });

  calcOperators.forEach(function(button){
    button.addEventListener("click", function(){
      screen.textContent = operators[button.getAttribute('data-op')];
      operations += operators[button.getAttribute('data-op')];
    });
  });

  clear.addEventListener("click", function(){
    screen.textContent = "";
    operations = "";
  });

  equal.addEventListener("click", function(){
    // if enter is clicked multiple times we repeat the last operation
    if (equalClicked){
      const reg = /(\-|\+|\/|\*)[0-9]+$/;
      operations += operations.match(reg)[0];
    }
    screen.textContent = (eval(operations));
    equalClicked = true;
  });

  bspace.addEventListener("click", function(){
    if (screen.textContent !== ""){
      screen.textContent = screen.textContent.slice(0, -1);
      operations = operations.slice(0, -1);
    }
  });

  point.addEventListener("click", function(){
    if (screen.textContent === parseInt(screen.textContent, 10).toString()){
      screen.textContent += ".";
      operations += ".";
    }
  });
});


