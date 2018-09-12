export const gameType = {
  TwoOfTwo: 0,
  OneOfOne: 1,
  OneOfThree: 2
};

export const imageType = {
  PAINT: 0,
  PHOTO: 1
};

const initialPictures = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const gameData = {
  TOTAL_LIVES: 3,
  MIN_LIVES: 0,
  MAX_ANSWERS: 10,
  START_TIME: 30,
  FAST_TIME: 20,
  SLOW_TIME: 10,

  statsType: {
    WRONG: 0,
    CORRECT: 1,
    SLOW: 2,
    FAST: 3,
    UNKNOWN: 4
  },

  points: {
    CORRECT: 100,
    BONUS: 50,
    FINE: -50
  },

  questionText: {
    [gameType.TwoOfTwo]: `Угадайте для каждого изображения фото или рисунок?`,
    [gameType.OneOfOne]: `Угадай, фото или рисунок?`,
    [gameType.OneOfThree]: `Найдите рисунок среди изображений`
  },

  questions: [
    {
      gameType: gameType.TwoOfTwo,
      tasks: [{
        src: initialPictures.paintings[0],
        type: imageType.PAINT
      }, {
        src: initialPictures.photos[0],
        type: imageType.PHOTO
      }]
    },
    {
      gameType: gameType.OneOfOne,
      tasks: [{
        src: initialPictures.paintings[1],
        type: imageType.PAINT
      }]
    },
    {
      gameType: gameType.OneOfThree,
      tasks: [{
        src: initialPictures.photos[1],
        type: imageType.PHOTO
      }, {
        src: initialPictures.photos[0],
        type: imageType.PHOTO
      }, {
        src: initialPictures.paintings[1],
        type: imageType.PAINT
      }]
    },
    {
      gameType: gameType.TwoOfTwo,
      tasks: [{
        src: initialPictures.paintings[2],
        type: imageType.PAINT
      }, {
        src: initialPictures.photos[0],
        type: imageType.PHOTO
      }]
    },
    {
      gameType: gameType.OneOfOne,
      tasks: [{
        src: initialPictures.paintings[2],
        type: imageType.PAINT
      }]
    },
    {
      gameType: gameType.OneOfThree,
      tasks: [{
        src: initialPictures.paintings[2],
        type: imageType.PAINT
      }, {
        src: initialPictures.photos[0],
        type: imageType.PHOTO
      }, {
        src: initialPictures.photos[2],
        type: imageType.PHOTO
      }]
    },
    {
      gameType: gameType.TwoOfTwo,
      tasks: [{
        src: initialPictures.paintings[2],
        type: imageType.PAINT
      }, {
        src: initialPictures.paintings[1],
        type: imageType.PAINT
      }]
    },
    {
      gameType: gameType.OneOfOne,
      tasks: [{
        src: initialPictures.paintings[0],
        type: imageType.PAINT
      }]
    },
    {
      gameType: gameType.OneOfThree,
      tasks: [{
        src: initialPictures.photos[2],
        type: imageType.PHOTO
      }, {
        src: initialPictures.paintings[1],
        type: imageType.PAINT
      }, {
        src: initialPictures.photos[1],
        type: imageType.PHOTO
      }]
    },
    {
      gameType: gameType.TwoOfTwo,
      tasks: [{
        src: initialPictures.paintings[0],
        type: imageType.PAINT
      }, {
        src: initialPictures.photos[0],
        type: imageType.PHOTO
      }]
    }
  ]
};

export default gameData;
