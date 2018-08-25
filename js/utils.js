export const mainElement = document.querySelector(`#main`);

export const renderElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const showComplexScreen = (elements) => {
  mainElement.innerHTML = ``;
  elements.forEach(
      (el) => mainElement.appendChild(el)
  );
};

export const clickShowScreen = (element, screen) => {
  element.addEventListener(`click`, () => {
    showScreen(screen);
  });
};

export const livesControl = (answer, lives) => {
  if (answer !== true) {
    lives--;
  }
  return lives;
};

export default showScreen;
