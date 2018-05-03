document.addEventListener("DOMContentLoaded", function(){
  //const sound = document.getElementById("sound")[0];
  //sound.play();
  const pauseTime = document.getElementById("pause");
  const sessionTime = document.getElementById("time");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const buttons = Array.from(document.getElementsByClassName("buttons"))
  let setSession = parseInt(sessionTime.textContent, 10);
  let setPause = parseInt(pauseTime.textContent, 10);
  let seconds = 0;

  addZeroIfOneDigit(setSession, minutesLeft);
  addZeroIfOneDigit(seconds, secondsLeft);

  document.getElementById("pause-increase").addEventListener("click", function(){
    setPause += 1;
    pauseTime.textContent = setPause;
  });

  document.getElementById("pause-decrease").addEventListener("click", function(){
    if (setPause > 1){
      setPause -= 1;
      pauseTime.textContent = setPause;
    }
  });

  document.getElementById("time-increase").addEventListener("click", function(){
    setSession += 1;
    addZeroIfOneDigit(setSession, minutesLeft);
    sessionTime.textContent = setSession;
  });

  document.getElementById("time-decrease").addEventListener("click", function(){
    if (setSession > 1){
      setSession -= 1;
      addZeroIfOneDigit(setSession, minutesLeft);
      sessionTime.textContent = setSession;
    }
  });

  let reseted=false
  startButton.addEventListener("click", function(){
    addZeroIfOneDigit(setSession, minutesLeft);
    addZeroIfOneDigit(seconds, secondsLeft);
    reseted = false;
    countDown(setSession,setPause, minutesLeft, secondsLeft);
  });
  resetButton.addEventListener("click", function(){
    reseted=true;

    addZeroIfOneDigit(setSession, minutesLeft);
    addZeroIfOneDigit(seconds, secondsLeft);
    buttons.map((elem) => (elem.style.display = "inline"));
    document.getElementById("time-type").innerHTML = "";
    this.style.display = "none";
  });


  function countDown(mins, pause, minField, secField){
    var secs = mins * 60;
    let pauseSecs = pause * 60
    mins--;
    pause--;
    buttons.map((elem) => (elem.style.display = "none"));
    resetButton.style.display = "inline";
    const counter = setInterval(timer, 500);

    document.getElementById("time-type").innerHTML = "<p>Session time left:</p>"

    function timer(){
      if (reseted){
        clearInterval(counter);
      }
      else if (mins === 0 && secs === 0){
        //ping!
        clearInterval(counter);
        var breakStart = setInterval(breakTimer, 500);
        addZeroIfOneDigit(mins, minField);
        addZeroIfOneDigit(secs % 60, secField);
      }
      else if (mins >= 0){
        secs--;
        if (secs % 60 === 0 && mins !== 0){
          mins--;
        }
        addZeroIfOneDigit(mins, minField);
        addZeroIfOneDigit(secs % 60, secField);
      }

      function breakTimer(){
        document.getElementById("time-type").innerHTML = "<p>Break time left:</p>"
        if (reseted){
          clearInterval(breakStart);
        }
        else if (pause === 0 && pauseSecs === 0){
          //ping!
          clearInterval(breakStart);
          buttons.map((elem) => (elem.style.display = "inline"));
          resetButton.style.display = "none";
          document.getElementById("time-type").innerHTML = "<p>You finished a cycle</p>"
          addZeroIfOneDigit(mins, minField);
          addZeroIfOneDigit(secs % 60, secField);
        }
        else if (pause >= 0){
          pauseSecs--;
          if (pauseSecs % 60 === 0 && pause !== 0){
            pause--;
          }
        addZeroIfOneDigit(pause, minField);
        addZeroIfOneDigit(pauseSecs % 60, secField);
        }
      }
    };
  }

  function addZeroIfOneDigit(timeUnit, elem){
    if (timeUnit <= 9){
      elem.textContent = `0${timeUnit}`;
    } else {
      elem.textContent = timeUnit;
    }
  }
});

