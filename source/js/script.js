// modules
import mobileHeight from "./modules/mobile-height-adjust.js";
import slider from "./modules/slider.js";
import menu from "./modules/menu.js";
import footer from "./modules/footer.js";
import chat from "./modules/chat.js";
import result from "./modules/result.js";
import form from "./modules/form.js";
import social from "./modules/social.js";
import FullPageScroll from "./modules/full-page-scroll";
import loading from "./modules/loading";
import { SceneController } from "./modules/3d-animation/sceneController";

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
loading();

export const sceneController = new SceneController();

window.addEventListener(`load`, async () => {
  const isIntroPage = !window.location.hash || window.location.hash === `#top`;
  await sceneController.initScene(isIntroPage ? 0 : 1);
  const fullPageScroll = new FullPageScroll();
  fullPageScroll.init();
  document.body.classList.add(`loaded`);
});
