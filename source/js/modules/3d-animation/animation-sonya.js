const sonya = document.getElementById(`sonya`);
const animationAppear = () =>
  sonya.animate(
    [
      { transform: `translate(400px, 300px) rotateZ(-22deg) scale(0.3)` },
      { transform: `translate(0, 0) rotateZ(0) scale(1)` },
    ],
    {
      easing: `cubic-bezier(.17,.17,.37,1)`,
      delay: 400,
      duration: 533,
    }
  );
const animationBounce = () =>
  sonya.animate(
    [{ transform: `translateY(0)` }, { transform: `translateY(-30px)` }],
    {
      duration: 1400,
      iterations: 1,
      easing: `ease-in-out`,
      fill: `both`,
    }
  );
let animation;
export const sonyaStartAnimation = () => {
  animation = animationAppear();
  animation.play();
  animation.onfinish = () => {
    animation = animationBounce();
    animation.onfinish = () => {
      animation.reverse();
    };
  };
};
export const sonyaEndAnimation = () => {
  if (!animation) {
    return;
  }
  animation.onfinish = () => {};
  animation.cancel();
  animation = animationAppear();
  animation.reverse();
  animation.onfinish = () => {
    animation = null;
  };
};
