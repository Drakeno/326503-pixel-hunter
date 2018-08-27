const mainElement = document.querySelector(`#main`);

export const renderElement = (template, tagName = `div`, tagClass) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template;
  if (tagClass) {
    wrapper.setAttribute(`class`, tagClass);
  }
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
  const aProps = Object.getOwnPropertyNames(arr1);
  const bProps = Object.getOwnPropertyNames(arr2);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    if (arr1[propName] !== arr2[propName]) {
      return false;
    }
  }

  return true;
};

export default mainElement;
