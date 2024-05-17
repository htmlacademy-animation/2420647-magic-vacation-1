import transformativeText from "./transformative-text";

export default () => {
  window.addEventListener("load", () => {
    let introMessage = document.querySelector(`.intro__message`);
    let body = document.getElementsByTagName("body")[0];
    introMessage.classList.add("intro__message__end");
    body.classList.add("loaded");
    transformativeText(".intro__title");
    transformativeText(".intro__date");
    transformativeText(".slider__item-title");
    transformativeText(".prizes__title");
    transformativeText(".rules__title");
    transformativeText(".game__title");
  });
};
