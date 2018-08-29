const mainElement = document.querySelector(`#main`);

export const renderElement = (template, tagName = `div`, tagClass) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template;
  wrapper.setAttribute(`class`, tagClass || ``);
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

export const elementConstruct = (container, elements) => {
  container.innerHTML = ``;
  elements.forEach(
      (el) => container.appendChild(el)
  );
};

export const clickShowScreen = (element, screen) => {
  element.addEventListener(`click`, () => {
    showScreen(screen);
  });
};

export const isEquivalent = (arr1, arr2) => {
  const aStr = arr1.toString();
  const bStr = arr2.toString();

  return (aStr === bStr) ? true : false;
};

export default mainElement;
