import Swiper from "swiper";
//import sceneStory from "./3d-animation/3d-scene-story";
import scene from "./3d-animation/3d-scene";

export default () => {
  let storySlider;
  let body = document.getElementsByTagName("body")[0];
  const story = new scene();

  const setSlider = function () {
    const updateBackgroundAndClass = () => {
      body.className = body.className
        .split(" ")
        .filter((className) => !className.startsWith("activedSlide-"))
        .join(" ");

      // Add the active class to body
      body.classList.add(`activedSlide-${storySlider.activeIndex}`);

      // Update the background image
      if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
        story.setScene(1);
      } else if (
        storySlider.activeIndex === 2 ||
        storySlider.activeIndex === 3
      ) {
        story.setScene(2);
      } else if (
        storySlider.activeIndex === 4 ||
        storySlider.activeIndex === 5
      ) {
        story.setScene(3);
      } else if (
        storySlider.activeIndex === 6 ||
        storySlider.activeIndex === 7
      ) {
        story.setScene(4);
      }
    };

    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: updateBackgroundAndClass,
          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: updateBackgroundAndClass,
          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      body.classList.remove(`activedSlide-${storySlider.activeIndex}`);
      storySlider.destroy();
    }
    setSlider();
    document.body.addEventListener(`screenChanged`, (e) => {
      if (e.detail.screenName === `story`) {
        story.init();
        story.setScene(1);
      }
    });
  });

  setSlider();
  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      story.init();
      story.setScene(1);
    }
  });
};
