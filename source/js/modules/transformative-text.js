export default function transformativeText(element) {
  let transformativeElem = document.querySelector(element);
  transformativeElem.classList.add("transformatedText");

  // Получаем текст из элемента
  let text = transformativeElem.textContent;

  // Очищаем содержимое элемента
  transformativeElem.innerHTML = "";

  // Создаем временный элемент, чтобы проверить, переносится ли текст
  let tempElem = document.createElement("div");
  tempElem.style.visibility = "hidden";
  tempElem.style.position = "absolute";
  tempElem.style.whiteSpace = "nowrap";
  tempElem.style.fontSize =
    window.getComputedStyle(transformativeElem).fontSize;
  document.body.appendChild(tempElem);

  // Разбиваем текст на слова
  let words = text.split(/\s+/);
  let currentLine = document.createElement("span");
  currentLine.classList.add("line");
  transformativeElem.appendChild(currentLine);

  const createLetterWrapper = (letter, isLastInWord) => {
    const letterWrapper = document.createElement("span");
    letterWrapper.textContent = letter + (isLastInWord ? " " : "");
    letterWrapper.style.animationDelay = `${Math.random() * 1000}ms`;
    return letterWrapper;
  };

  // Создаем обертку для каждой буквы
  words.forEach((word) => {
    const letters = word.split("");
    letters.forEach((letter, index) => {
      const letterWrapper = createLetterWrapper(
        letter,
        index === letters.length - 1
      );
      currentLine.appendChild(letterWrapper);
    });

    tempElem.textContent = currentLine.textContent + " " + word;

    // Проверяем, переносится ли текст
    if (tempElem.offsetWidth > transformativeElem.offsetWidth) {
      //document.body.removeChild(tempElem);
      currentLine = document.createElement("span");
      currentLine.classList.add("line");
      transformativeElem.appendChild(currentLine);
    }
  });
  // Удаляем временный элемент
  document.body.removeChild(tempElem);
}
