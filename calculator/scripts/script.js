document.addEventListener("DOMContentLoaded",function(){
  const screen = document.getElementById("screen-value");
  screen.value = "";
  const calcNumbers = document.querySelectorAll(".num");
  const calcOperators = document.querySelectorAll(".operator")
  const clear = document.getElementById("clear");
  const equal = document.getElementById("equal");
  let operations = new String();

  calcNumbers.forEach(function(button){
    button.addEventListener("click", function(){
      if (screen.innerText === "" || parseInt(screen.innerText, 10)){
        screen.innerText += button.innerText;
      }else{
        screen.innerText = "";
        screen.innerText += button.innerText;
      }
      operations += button.innerText;
    });
  });

  calcOperators.forEach(function(button){
    button.addEventListener("click", function(){
      screen.innerText = button.innerText;
      operations += button.innerText;
    });
  });

  clear.addEventListener('click', function(){
    screen.innerText = "";
    operations = "";
  });

  equal.addEventListener("click", function(){
    screen.innerText = (eval(operations));
    operations = "";
  });
});


