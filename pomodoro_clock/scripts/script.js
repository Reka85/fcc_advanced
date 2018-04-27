document.addEventListener("DOMContentLoaded", function(){

  const pauseTime = document.getElementById("pause");
  const workTime = document.getElementById("time");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");
  const startButton = document.getElementById("start-button");

  let setMinutes = 20;
  let setPause = 5;
  let setSeconds = 0;

  pauseTime.textContent = setPause.toString();
  workTime.textContent = setMinutes.toString();
  minutesLeft.textContent = setMinutes.toString();

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

    const secTimer = setInterval(function(){
      setSeconds--;
      addZeroIfOneDigit(setSeconds, secondsLeft);
      if(setSeconds === 0 && setMinutes === 0){
        clearInterval(secTimer);
      }
      // console.log(`secs: ${setSeconds}`);
      // console.log(`mins: ${setMinutes}`);
    },1000);

    const minTimer = setInterval(function(){
      //console.log(setMinutes);
      if (setMinutes > 0){
        setMinutes--;
      }
      setSeconds = 60;
      if (setMinutes === 0){
        clearInterval(minTimer);
      }
      addZeroIfOneDigit(setMinutes, minutesLeft);
    },60000);
  });

  function addZeroIfOneDigit(timeUnit, elem){
    if (timeUnit <= 9){
      elem.textContent = `0${timeUnit}`;
    } else {
      elem.textContent = timeUnit.toString();
    }
  }
});

