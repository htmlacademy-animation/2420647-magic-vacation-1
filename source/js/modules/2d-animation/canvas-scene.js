export default class canvasScene {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.size = 1000;

    this.sceneObjects = options.sceneObjects;
    this.objectsScene = {};
    this.arrImgs = [];
    this.loadingCounter = 0;

    this.animations = [];
    this.animationsDrop = [];
    this.afterInit = () => {};

    this.initObjects();
    this.initEventListeners();
  }

  initObjects() {
    this.sceneObjects.forEach((item) => {
      const itemImage = new Image();
      itemImage.src = item.url;

      // Инициализация объекта сцены
      this.objectsScene[item.objectId] = {
        x: item.x,
        y: item.y,
        size: item.size,
        opacity: item.opacity,
        transforms: item.transforms,
        img: itemImage,
        loaded: false, // Флаг для отслеживания состояния загрузки
      };

      this.arrImgs.push(itemImage);
    });

    if (this.afterInit && typeof this.afterInit === "function") {
      this.afterInit();
    }
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    // Отрисовываем сцену только когда все изображения загружены
    if (this.loadingCounter === this.arrImgs.length) {
      this.drawScene();
    }
  }

  initEventListeners() {
    this.arrImgs.forEach((item, index) => {
      item.onload = () => {
        const objectId = this.sceneObjects[index].objectId;
        this.objectsScene[objectId].loaded = true;
        this.increaseLoadingCounter();
      };

      item.onerror = () => {
        console.error(`Failed to load image: ${item.src}`);
        this.increaseLoadingCounter(); // Все равно увеличиваем счетчик, чтобы предотвратить зависание
      };
    });
  }

  drawImage(object) {
    const { x, y, size, opacity, img: image, transforms, loaded } = object;

    if (!loaded || !image.complete) {
      return; // Если изображение не загружено, выходим из функции
    }

    let width = this.size * (size / 100);
    let height = (this.size * (size / 100) * image.height) / image.width;

    let drawX = this.size * (x / 100) - width / 2;
    let drawY = this.size * (y / 100) - height / 2;

    if (opacity === 0 || !image.complete) {
      return;
    }

    if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }

    this.ctx.save();

    if (transforms) {
      if (transforms.translateX) {
        drawX += this.size * (transforms.translateX / 100);
      }

      if (transforms.translateY) {
        drawY += this.size * (transforms.translateY / 100);
      }

      if (transforms.rotate) {
        this.ctx.translate(drawX + width / 2, drawY + height / 2);
        this.ctx.rotate((transforms.rotate * Math.PI) / 180);
      }

      if (transforms.scaleX) {
        width *= transforms.scaleX;
        if (transforms.scaleX < 0) {
          this.ctx.scale(-1, 1);
          drawX = -drawX;
        }
      }

      if (transforms.scaleY) {
        height *= transforms.scaleY;
        if (transforms.scaleY < 0) {
          this.ctx.scale(1, -1);
          drawY = -drawY;
        }
      }

      if (transforms.rotate) {
        this.ctx.translate(-drawX - width / 2, -drawY - height / 2);
      }
    }

    if (opacity) {
      this.ctx.globalAlpha = opacity;
    }

    this.ctx.drawImage(image, drawX, drawY, width, height);

    object.widthImg = width;
    object.heightImg = height;

    this.ctx.restore();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const name in this.objectsScene) {
      const objectScene = this.objectsScene[name];
      if (objectScene.before && typeof objectScene.before === "function") {
        objectScene.before();
      }
      this.drawImage(objectScene);
      if (objectScene.after && typeof objectScene.after === "function") {
        objectScene.after();
      }
    }
  }
}
