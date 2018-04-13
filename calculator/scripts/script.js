document.addEventListener("DOMContentLoaded",function(){
  const calcElements = document.querySelectorAll("td");
  const screen = document.getElementById("screen-value");

  calcElements.forEach(function(button){
    button.addEventListener("click", function(){
      screen.value = (button.innerText);
    });
  });
});


