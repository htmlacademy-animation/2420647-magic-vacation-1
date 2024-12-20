import throttle from "lodash/throttle";
//import gameTimer from "./game-timer";
import { timerStart, stopTimer } from "./game-timer";
import prizesCounter from "./prizes-counter";
import { sceneController } from "../script";
import {
  sonyaStartAnimation,
  sonyaEndAnimation,
} from "./3d-animation/animation-sonya";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;
    this.screenElements = document.querySelectorAll(
      `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
      `.page-header__menu .js-menu-link`
    );
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
      `wheel`,
      throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true })
    );
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);
    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
      (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const filling = document.querySelector(".filling-prize");
    const activeScreenElement = this.screenElements[this.activeScreen];

    if (activeScreenElement.classList.contains("screen--game")) {
      //gameTimer();
      timerStart();
      sonyaStartAnimation();
    }

    if (activeScreenElement.classList.contains("screen--prizes")) {
      const prizesList = document.querySelector(".prizes__list");
      filling.classList.add("animate");
      setTimeout(() => {
        this.screenElements.forEach((screen) => {
          screen.classList.add(`screen--hidden`);
          screen.classList.add(`active`);
          prizesList.classList.add(`playAnimation`);
        });
        activeScreenElement.classList.remove(`screen--hidden`);
        filling.classList.remove("animate");
        prizesCounter();
      }, 550);
    } else {
      if (activeScreenElement.classList.contains("screen--story")) {
        //console.log(1);
      }
      filling.classList.remove("animate");
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      activeScreenElement.classList.remove(`screen--hidden`);
      setTimeout(() => {
        activeScreenElement.classList.add(`active`);

        const formField = document.querySelector(".form__field");
        if (activeScreenElement.classList.contains("screen--game")) {
          formField.classList.add("form__field__end");
        } else {
          formField.classList.remove("form__field__end");
        }
      }, 100);
    }

    let body = document.getElementsByTagName("body")[0];
    body.classList.forEach((className) => {
      if (className.startsWith("activedSlide-")) {
        body.classList.remove(className);
      }
    });

    const prevActiveScreen = document.querySelector(`.screen.active`);
    const nextActiveScreen = this.screenElements[this.activeScreen];

    if (prevActiveScreen === nextActiveScreen) {
      return;
    }

    const isIntroPage = nextActiveScreen.classList.contains(`screen--intro`);
    const isStoryPage = nextActiveScreen.classList.contains(`screen--story`);

    if (isIntroPage) {
      sceneController.showMainScene();
    } else if (isStoryPage) {
      sceneController.showRoomScene();
    }

    if (
      prevActiveScreen &&
      prevActiveScreen.classList.contains(`screen--story`)
    ) {
      // bodyTheme.clearBodyTheme();
    }

    if (nextActiveScreen.classList.contains(`screen--story`)) {
      // bodyTheme.applyTheme();
    }

    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    nextActiveScreen.classList.remove(`screen--hidden`);
    setTimeout(() => {
      nextActiveScreen.classList.add(`active`);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
      (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
        this.screenElements.length - 1,
        ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
