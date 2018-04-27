document.addEventListener("DOMContentLoaded", function(){

  const pauseTime = document.getElementById("pause");
  const workTime = document.getElementById("time");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");
  const startButton = document.getElementById("start-button");

  let setMinutes = 4;
  let setPause = 5;
  let setSeconds = 0;
  pauseTime.textContent = setPause.toString();
  workTime.textContent = setMinutes.toString();
  minutesLeft.textContent = setMinutes.toString();


  if (setSeconds === 0){
    secondsLeft.textContent = "00";
  }

  if (setMinutes <= 9){
    minutesLeft.textContent = `0${setMinutes}`;
  }

  document.getElementById("pause-increase").addEventListener("click", function(){
    setPause += 1;
    pauseTime.textContent = setPause.toString();
  });

  document.getElementById("pause-decrease").addEventListener("click", function(){
    if (setPause > 0){
      setPause -= 1;
      pauseTime.textContent = setPause.toString();
    }
  });

  document.getElementById("time-increase").addEventListener("click", function(){
    setMinutes += 1;
    if(setMinutes <= 9){
      minutesLeft.textContent = `0${setMinutes.toString()}`;
    }else{
      workTime.textContent = setMinutes.toString();
      minutesLeft.textContent = setMinutes.toString();
    }
  });

  document.getElementById("time-decrease").addEventListener("click", function(){
    if (setMinutes > 0){
      setMinutes -= 1;
      if(setMinutes <= 9){
        minutesLeft.textContent = `0${setMinutes.toString()}`;
      }else{
        workTime.textContent = setMinutes.toString();
        minutesLeft.textContent = setMinutes.toString();
      }
    }
  });

  startButton.addEventListener("click", function(){
      //setMinutes--;
      if (setMinutes <= 9){
        minutesLeft.textContent = `0${setMinutes}`;
      }
      const minTimer = setInterval(function(){
        setMinutes--;
        if (setMinutes <= 9){
          minutesLeft.textContent = `0${setMinutes}`;
        }
        if (setMinutes === 0){
          clearInterval(minTimer);
        }
      },60000);

      // let seconds = parseInt(secondsLeft.textContent, 10);
      // const secTimer = setInterval(function(){
      //   if (secondsLeft.textContent === "00" || secondsLeft.textContent === "0"){
      //     seconds = 60;
      //   }
      //   seconds--;
      //   secondsLeft.textContent = seconds.toString();
      //   if (setMinutes === 0 && secondsLeft.textContent === "00" || secondsLeft.textContent === "0"){
      //     clearInterval(secTimer);
      //   }
      // },1000)
  });
});

