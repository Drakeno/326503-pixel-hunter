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

export const complexResize = (frame, picturesUrls) => picturesUrls.map((url) => {
  let img = new Image();
  img.onload = () => resize(frame, img);
  img.src = `${url}`;
  setTimeout(() => {
  }, 2000);
  return resize(frame, img);
});

export default resize;
