import SeaCalfScene from "./2d-animation/seacalf-canvas-animation";
import CrocodileScene from "./2d-animation/crocodile-canvas-animation.js";

export default () => {
  const showResultEls = document.querySelectorAll(`.js-show-result`);
  const results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    showResultEls.forEach((showResultEl) => {
      showResultEl.addEventListener(`click`, () => {
        const target = showResultEl.getAttribute(`data-target`);

        // Скрыть все результаты
        results.forEach((el) => {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });

        // Показать целевой результат
        const targetEl = Array.from(results).find(
          (el) => el.getAttribute(`id`) === target
        );
        if (targetEl) {
          targetEl.classList.add(`screen--show`);
          targetEl.classList.remove(`screen--hidden`);

          setTimeout(() => {
            const resultTitle = targetEl.querySelector(".result__title");
            const resultText = targetEl.querySelector(".result__text");
            const resultForm = targetEl.querySelector(".result__form");
            const resultButton = targetEl.querySelector(
              ".result__button.js-play"
            );

            if (resultTitle) {
              resultTitle.classList.add("visible");
            }

            if (resultText) {
              resultText.classList.add("visible");
            }

            if (resultForm) {
              resultForm.classList.add("visible");
            }

            if (target === "result") {
              let SeaCalfCanvasAnimate = new SeaCalfScene({
                canvas: document.querySelector(`#sea-calf-canvas`),
              });
              SeaCalfCanvasAnimate.startAnimation();
            }

            if (target === "result2") {
              const resultContainers =
                targetEl.querySelectorAll(`.result__image`);
              resultContainers.forEach((container) => {
                container.classList.add("visible--img");
              });
            } else if (target === "result3" && resultButton) {
              resultButton.classList.add("visible");
              let CrocodileCanvasAnimate = new CrocodileScene({
                canvas: document.querySelector(`#crocodile-canvas`),
              });
              CrocodileCanvasAnimate.startAnimation();
            }
          });
        }
      });
    });

    const playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, () => {
        results.forEach((el) => {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
