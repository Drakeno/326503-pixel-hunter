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

export const complexResize = (frame, objArray) => {
  const fitSizeArr = [];
  objArray.forEach((el) => {
    let img = new Image();
    img.src = `${el}`;

    fitSizeArr.push(resize(frame, img));
  });

  return fitSizeArr;
};

export default resize;
