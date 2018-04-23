document.addEventListener("DOMContentLoaded", function(){

  const pause = document.getElementById("pause");
  const time = document.getElementById("time");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");

  let set_time_minutes = 25;
  let set_pause = 5;
  pause.textContent = set_pause.toString();
  time.textContent = set_time_minutes.toString();
  let set_time_seconds = 0;
  minutesLeft.textContent = set_time_minutes;


  if (set_time_seconds === 0){
    secondsLeft.textContent = "00";
  }


  document.getElementById("pause-increase").addEventListener("click", function(){
    set_pause += 1;
    pause.textContent = set_pause.toString();
  });

  document.getElementById("pause-decrease").addEventListener("click", function(){
    if (set_pause > 0){
      set_pause -= 1;
      pause.textContent = set_pause.toString();
    }
  });

  document.getElementById("time-increase").addEventListener("click", function(){
    set_time_minutes += 1;
    time.textContent = set_time_minutes.toString();
    minutesLeft.textContent = set_time_minutes.toString();
  });

  document.getElementById("time-decrease").addEventListener("click", function(){
    set_time_minutes -= 1;
    time.textContent = set_time_minutes.toString();
    minutesLeft.textContent = set_time_minutes.toString();
  });

  // minutes.addEventListener("click", function(){
  //   while (set_minutes > 0){
  //     setTimeout(function(){
  //       set_minutes -= 1;
  //       minutes.innerText = set_minutes;
  //     },1000);
  //   }
  // });

});

