document.addEventListener("DOMContentLoaded", function(){

  const pauseTime = document.getElementById("pause");
  const workTime = document.getElementById("time");
  const breakTime = document.getElementById("break");
  const breakMinutesLeft = document.getElementById("break-minutes-left");
  const breakSecondsLeft = document.getElementById("break-seconds-left");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");
  const startButton = document.getElementById("start-button");

  let setMinutes = 25;
  let setPause = 5;
  let setSeconds = 0;

  pauseTime.textContent = setPause.toString();
  workTime.textContent = setMinutes.toString();
  minutesLeft.textContent = setMinutes.toString();

  addZeroIfOneDigit(setPause, breakMinutesLeft);
  breakSecondsLeft.textContent = "00";

  addZeroIfOneDigit(setMinutes, minutesLeft);
  addZeroIfOneDigit(setSeconds, secondsLeft);

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
    addZeroIfOneDigit(setMinutes, minutesLeft);
    workTime.textContent = setMinutes.toString();
  });

  document.getElementById("time-decrease").addEventListener("click", function(){
    if (setMinutes > 0){
      setMinutes -= 1;
      addZeroIfOneDigit(setMinutes, minutesLeft);
      workTime.textContent = setMinutes.toString();
    }
  });

  startButton.addEventListener("click", function(){
    setMinutes--;
    setSeconds = 59;
    addZeroIfOneDigit(setMinutes, minutesLeft);
    addZeroIfOneDigit(setSeconds, secondsLeft);

    countDownMinutes(setMinutes, setSeconds, minutesLeft);
    countDownSeconds(setMinutes, setSeconds, secondsLeft);
  });

  function countDownSeconds(mins, secs, field){
    const secTimer = setInterval(function(){
      secs--;
      addZeroIfOneDigit(secs, field);
      if(secs === 0 && mins === 0){
        clearInterval(secTimer);
      }
    },1000);
  }

  function countDownMinutes(mins, secs, field){
    const minTimer = setInterval(function(){
      if (mins > 0){
        mins--;
      }
      secs = 60;
      if (mins === 0){
        clearInterval(minTimer);
      }
      addZeroIfOneDigit(mins, field);
    },60000);
  }

  function addZeroIfOneDigit(timeUnit, elem){
    if (timeUnit <= 9){
      elem.textContent = `0${timeUnit}`;
    } else {
      elem.textContent = timeUnit.toString();
    }
  }
});

