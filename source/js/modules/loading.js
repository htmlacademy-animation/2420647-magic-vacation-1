export default () => {
  window.addEventListener("load", () => {
    let introMessage = document.querySelector(`.intro__message`);
    introMessage.classList.add("intro__message__end");
  });
};
