export default () => {
  window.addEventListener("load", () => {
    let introMessage = document.querySelector(`.intro__message`);
    let body = document.getElementsByTagName("body")[0];

    introMessage.classList.add("intro__message__end");
    body.classList.add("loaded");
  });
};
