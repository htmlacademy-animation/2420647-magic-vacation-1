export default function prizesCounter() {
  const counterElements = document.querySelectorAll(".prizes__desc");
  if (!counterElements) return;

  const startCounter = (element, startValue, delay, interval) => {
    let targetNumber = Number(element.textContent);
    let counter = startValue;

    setTimeout(() => {
      let intervalId = setInterval(() => {
        if (counter < targetNumber) {
          counter++;
          element.textContent = String(counter);
        } else {
          clearInterval(intervalId);
        }
      }, interval);
    }, delay);
  };

  for (let prizeCount = 0; prizeCount < counterElements.length; prizeCount++) {
    let numberElement =
      counterElements[prizeCount].getElementsByTagName("b")[0];
    if (numberElement) {
      switch (prizeCount) {
        case 1:
          startCounter(numberElement, 0, 6000, 300);
          break;
        case 2:
          startCounter(numberElement, 11, 7000, 5);
          break;
        default:
          break;
      }
    }
  }
}
