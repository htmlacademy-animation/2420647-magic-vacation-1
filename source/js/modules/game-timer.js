let timerStarted = false;

export default function gameTimer() {
  if (timerStarted) return;
  timerStarted = true;

  const timerElement = document.querySelector(".game__counter");
  if (!timerElement) return;

  let minutes = 5;
  let seconds = 0;

  function updateTimerDisplay() {
    timerElement.innerHTML = `<span>${String(minutes).padStart(
      2,
      "0"
    )}</span>:<span>${String(seconds).padStart(2, "0")}</span>`;
  }

  function countdown() {
    if (seconds === 0) {
      if (minutes === 0) {
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
    requestAnimationFrame(checkTime);
  }

  function checkTime() {
    const now = Date.now();
    const elapsedTime = now - startTime;

    if (elapsedTime >= 1000) {
      countdown();
      startTime = Date.now();
    } else {
      requestAnimationFrame(checkTime);
    }
  }

  let startTime = Date.now();
  updateTimerDisplay();
  requestAnimationFrame(checkTime);
}
