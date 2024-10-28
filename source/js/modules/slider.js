import Swiper from "swiper";
//import sceneStory from "./3d-animation/3d-scene-story";
import { plainMeshController } from "./3d-animation/plainMeshController";

export default () => {
  let storySlider;
  let body = document.getElementsByTagName("body")[0];

  const setSlider = function () {
    plainMeshController.setStoryActiveMesh();
    const updateBackgroundAndClass = () => {
      body.className = body.className
        .split(" ")
        .filter((className) => !className.startsWith("activedSlide-"))
        .join(" ");

      // Add the active class to body
      body.classList.add(`activedSlide-${storySlider.activeIndex}`);

      // Update the background image
      if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
        plainMeshController.setStoryActiveMesh(0);
      } else if (
        storySlider.activeIndex === 2 ||
        storySlider.activeIndex === 3
      ) {
        plainMeshController.setStoryActiveMesh(1);
      } else if (
        storySlider.activeIndex === 4 ||
        storySlider.activeIndex === 5
      ) {
        plainMeshController.setStoryActiveMesh(2);
      } else if (
        storySlider.activeIndex === 6 ||
        storySlider.activeIndex === 7
      ) {
        plainMeshController.setStoryActiveMesh(3);
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
  });

  setSlider();
};
