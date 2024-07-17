import Swiper from "swiper";

export default () => {
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
  let body = document.getElementsByTagName("body")[0];

  const setSlider = function () {
    const updateBackgroundAndClass = () => {
      // Remove the active class from body
      body.className = body.className
        .split(" ")
        .filter((className) => !className.startsWith("activedSlide-"))
        .join(" ");

      // Add the active class to body
      body.classList.add(`activedSlide-${storySlider.activeIndex}`);

      // Update the background image
      if (storySlider.activeIndex === 0) {
        sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
      } else if (storySlider.activeIndex === 2) {
        sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
      } else if (storySlider.activeIndex === 4) {
        sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
      } else if (storySlider.activeIndex === 6) {
        sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
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
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
