export const resize = (frame, object) => {
  const calcFrame = {};
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

  calcFrame.width = object.width / ratioX;
  calcFrame.height = object.height / ratioY;

  return calcFrame;
};

export const complexResize = (frame, picturesUrls) => picturesUrls.map((el) => {
  let img = new Image();
  img.src = `${el}`;
  return resize(frame, img);
});

export default resize;
