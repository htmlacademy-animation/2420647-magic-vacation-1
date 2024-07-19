import throttle from "lodash/throttle";

export default class FullPageScroll {
  constructor() {
    // Время задержки для throttle
    this.THROTTLE_TIMEOUT = 1000;

    // Флаг, разрешающий прокрутку
    this.scrollFlag = true;

    // Таймаут для сброса флага
    this.timeout = null;

    // Элементы экранов, исключая экраны с результатами
    this.screenElements = document.querySelectorAll(
      `.screen:not(.screen--result)`
    );

    // Элементы меню
    this.menuElements = document.querySelectorAll(
      `.page-header__menu .js-menu-link`
    );

    // Индекс активного экрана
    this.activeScreen = 0;

    // Привязка контекста методов
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    // Добавление обработчика прокрутки с throttle
    document.addEventListener(
      `wheel`,
      throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true })
    );

    // Добавление обработчика изменения URL-хеша
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);

    // Инициализация текущего состояния экрана
    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      // Пересчет позиции активного экрана в зависимости от направления прокрутки
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }

    // Блокировка прокрутки на время THROTTLE_TIMEOUT
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
    // Определение индекса экрана на основе хеша URL
    const newIndex = Array.from(this.screenElements).findIndex(
      (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    // Изменение видимости экранов
    this.changeVisibilityDisplay();

    // Обновление активного элемента меню
    this.changeActiveMenuItem();

    // Генерация события изменения экрана
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    let filling = document.querySelector(".filling-prize");

    if (
      this.screenElements[this.activeScreen].classList.contains(
        "screen--prizes"
      )
    ) {
      let prizesList = document.querySelector(".prizes__list");
      // Показ экрана с призами
      filling.classList.add("animate");
      setTimeout(() => {
        this.screenElements.forEach((screen) => {
          screen.classList.add(`screen--hidden`);
          screen.classList.add(`active`);
          prizesList.classList.add(`playAnimation`);
        });
        this.screenElements[this.activeScreen].classList.remove(
          `screen--hidden`
        );
        filling.classList.remove("animate");
      }, 550);
    } else {
      // Скрытие экрана с призами и показ других экранов
      filling.classList.remove("animate");
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);

        // Обновление класса поля формы для экрана игры
        let formField = document.querySelector(".form__field");
        if (
          this.screenElements[this.activeScreen].classList.contains(
            "screen--game"
          )
        ) {
          formField.classList.add("form__field__end");
        } else {
          formField.classList.remove("form__field__end");
        }
      }, 100);
    }
  }

  changeActiveMenuItem() {
    // Обновление активного пункта меню
    const activeItem = Array.from(this.menuElements).find(
      (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    // Создание и отправка пользовательского события screenChanged
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
    // Пересчет позиции активного экрана
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
