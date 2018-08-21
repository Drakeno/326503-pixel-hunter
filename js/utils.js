const mainElement = document.querySelector(`#main`);

export const renderElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const clickShowScreen = (element, screen) => {
  element.addEventListener(`click`, () => {
    showScreen(screen);
  });
};

// Управление жизнями игрока
// Переключение уровней
// Отсчёт времени
