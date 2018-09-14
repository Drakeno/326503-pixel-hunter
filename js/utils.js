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

export const showElement = (element) => {
  mainElement.appendChild(element);
};

export const isEquivalent = (arr1, arr2) => {
  const aStr = arr1.toString();
  const bStr = arr2.toString();

  return (aStr === bStr) ? true : false;
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

export const resizeImg = (image, frame) => {
  const img = new Image();
  img.src = image.src;
  img.onload = () => {
    const properSize = resize(frame, img);
    img.width = properSize.width;
    img.height = properSize.height;
  };
  return img;
};

export default mainElement;
