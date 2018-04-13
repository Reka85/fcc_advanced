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
      if (screen.value === "" || parseInt(screen.value, 10)){
        screen.value += button.innerText;
      }else{
        screen.value = "";
        screen.value += button.innerText;
      }
      operations += button.innerText;
    });
  });

  calcOperators.forEach(function(button){
    button.addEventListener("click", function(){
      screen.value = button.innerText;
      operations += button.innerText;
    });
  });

  clear.addEventListener('click', function(){
    screen.value = "";
    operations = "";
  });

  equal.addEventListener("click", function(){
    screen.value = (eval(operations));
    operations = "";
  });
});


