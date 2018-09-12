const mainElement = document.querySelector(`#main`);

export const renderElement = (template, tagName = `div`, tagClass) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template;
  wrapper.setAttribute(`class`, tagClass || ``);
  return wrapper;
};

export const appendElement = (element, tagName = `div`, tagClass) => {
  const wrapper = renderElement(``, tagName, tagClass);
  wrapper.appendChild(element);
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

export const isEquivalent = (arr1, arr2) => {
  const aStr = arr1.toString();
  const bStr = arr2.toString();

  return (aStr === bStr) ? true : false;
};

export const frameGenerate = (w, h) => {
  return {
    width: w,
    height: h,
  };
};

export const resize = (frame, object) => {

  let ratioX = object.width / frame.width;
  let ratioY = object.height / frame.height;

  if (object.width > object.height) {
    ratioY = ratioX;
  }

  if (object.width < object.height) {
    ratioX = ratioY;
  }

  if (object.width === object.height && frame.width > frame.height) {
    ratioX = ratioY;
  }

  return {
    width: object.width / ratioX,
    height: object.height / ratioY
  };
};

export const imageResize = (frame, imageUrl) => {
  let img = new Image();
  img.src = `${imageUrl}`;
  img.onload = () => resize(frame, img);
  return resize(frame, img);
};

export default mainElement;
