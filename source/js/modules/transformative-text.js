export default function transformativeText(element) {
  let transformativeElem = document.querySelector(element);
  transformativeElem.classList.add("tranformatedText");

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

  // Создаем обертку для каждого слова
  words.forEach((word) => {
    word.split("").forEach((letter, index) => {
      let letterWrapper = document.createElement("span");
      if (index === word.split("").length - 1) {
        letterWrapper.textContent = letter + " ";
      } else {
        letterWrapper.textContent = letter;
      }
      currentLine.appendChild(letterWrapper);
    });
    tempElem.textContent = currentLine.textContent + " " + word;

    // Проверяем, переносится ли текст
    if (tempElem.offsetWidth > transformativeElem.offsetWidth) {
      currentLine = document.createElement("span");
      currentLine.classList.add("line");
      transformativeElem.appendChild(currentLine);
    }
  });

  // Удаляем временный элемент
  document.body.removeChild(tempElem);
}
