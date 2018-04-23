document.addEventListener("DOMContentLoaded",function(){
  const screen = document.getElementById("screen-value");
  screen.textContent = "";
  const calcNumbers = document.querySelectorAll(".num");//number buttons from 0 to 9
  const calcOperators = document.querySelectorAll(".operator");// +,-,/,* buttons
  const clear = document.getElementById("clear");
  const bspace = document.getElementById("bspace");
  const equal = document.getElementById("equal");
  const point = document.getElementById("point");
  const operators = {"incr": "+", "decr": "-", "division": "/", "multiplication": "*"};
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  let operations = new String();

  calcNumbers.forEach(function(button){
    button.addEventListener("click", function(){
      //if the last button that was pressed is the equal button
      if (equal.classList.contains("active")){
        screen.textContent = "";
        equal.classList.remove("active");
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

  clear.addEventListener('click', function(){
    screen.textContent = "";
    operations = "";
  });

  equal.addEventListener("click", function(){
    screen.textContent = (eval(operations)); // see eval
    operations = "";
    equal.classList.add("active");
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


