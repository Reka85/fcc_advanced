document.addEventListener("DOMContentLoaded", function(){
  const sound = document.getElementById("sound");

  const pauseTime = document.getElementById("pause");
  const sessionTime = document.getElementById("time");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const buttons = Array.from(document.getElementsByClassName("buttons"))
  const clock = document.getElementById("clock");
  const timeType = document.getElementById("time-type");

  let setSession = parseInt(sessionTime.textContent, 10);
  let setPause = parseInt(pauseTime.textContent, 10);
  let seconds = 0;

  refreshClock(setSession, seconds);

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
    refreshClock(setSession, seconds);
    sessionTime.textContent = setSession;
  });

  document.getElementById("time-decrease").addEventListener("click", function(){
    if (setSession > 1){
      setSession -= 1;
      refreshClock(setSession, seconds);
      sessionTime.textContent = setSession;
    }
  });

  let reseted = false

  startButton.addEventListener("click", function(){
    refreshClock(setSession, seconds);

    reseted = false;
    countDown(setSession,setPause);
  });

  resetButton.addEventListener("click", function(){
    reseted=true;
    refreshClock(setSession, seconds);

    buttons.map((elem) => (elem.style.display = "inline"));
    timeType.innerHTML = "";
    this.style.display = "none";
  });


  function countDown(mins, pause){
    var secs = mins * 60;
    let pauseSecs = pause * 60
    mins--;
    pause--;
    buttons.map((elem) => (elem.style.display = "none"));
    resetButton.style.display = "inline";
    const counter = setInterval(timer, 1000);

    timeType.innerHTML = "<p>Session time left:</p>"

    // session countdown starts
    function timer(){
      if (reseted){
        clearInterval(counter);
      }
      else if (mins === 0 && secs === 0){
        sound.play();
        clearInterval(counter);
        var breakStart = setInterval(breakTimer, 1000);
        refreshClock(mins, secs);
      }
      else if (mins >= 0){
        secs--;
        refreshClock(mins, secs);
        if (secs % 60 === 0 && mins !== 0){
          mins--;
        }
      }

      // break countdown starts
      function breakTimer(){
        timeType.innerHTML = "<p>Break time left:</p>"
        if (reseted){
          clearInterval(breakStart);
        }
        else if (pause === 0 && pauseSecs === 0){
          sound.play();
          clearInterval(breakStart);
          buttons.map((elem) => (elem.style.display = "inline"));
          resetButton.style.display = "none";
          timeType.innerHTML = "<p>You finished a cycle</p>"
          refreshClock(mins, secs);
        }
        else if (pause >= 0){
          pauseSecs--;
          if (pauseSecs % 60 === 0 && pause !== 0){
            pause--;
          }
        refreshClock(pause, pauseSecs);
        }
      }
    };
  }

  function refreshClock(minutes, seconds){
    seconds = seconds % 60;
    if (minutes < 10){
      minutes = `0${minutes}`
    }

    if (seconds < 10){
      seconds = `0${seconds}`
    }
    clock.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
  }
});

