const TIMER_DURATION_SEC = 300;

let timeLeft;
let drawMinIntervalMs = 1000;
let now;
let drawLastTime = Date.now();
let elapsed;
let runningAnimation = null;

const counterMinutes = document.querySelector(`.js-timer-minutes`);
const counterSeconds = document.querySelector(`.js-timer-seconds`);

function draw() {
  if (timeLeft > 0) {
    timeLeft -= 1;
    const minutes = new Date(timeLeft * 1000).getMinutes();
    const seconds = new Date(timeLeft * 1000).getSeconds();
    counterMinutes.textContent = String(minutes).padStart(2, 0);
    counterSeconds.textContent = String(seconds).padStart(2, 0);
  }
}

function tick() {
  now = Date.now();
  elapsed = now - drawLastTime;

  if (elapsed > drawMinIntervalMs) {
    drawLastTime = now - (elapsed % drawMinIntervalMs);
    draw();
  }
  if (timeLeft > 0) {
    runningAnimation = requestAnimationFrame(tick);
  }
}

export function timerStart() {
  timeLeft = TIMER_DURATION_SEC;
  runningAnimation = requestAnimationFrame(tick);
}

export function stopTimer() {
  if (runningAnimation) {
    cancelAnimationFrame(runningAnimation);
  }
}
