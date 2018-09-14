export const gameType = {
  TwoOfTwo: 0,
  OneOfOne: 1,
  OneOfThree: 2
};

export const imageType = {
  PAINT: 0,
  PHOTO: 1
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

  // example
  // questions: [
  //   {
  //     question: `Угадайте для каждого изображения фото или рисунок?`,
  //     gameType: gameType.TwoOfTwo,
  //     tasks: [
  //     {
  //       src: 'https://k39.kn3.net/E07A38605.jpg',
  //       type: imageType.PAINT,
  //       width: 468,
  //       height: 458
  //     },
  //     {
  //       src: 'http://i.imgur.com/zHRZW1C.jpg',
  //       type: imageType.PHOTO,
  //       width: 468,
  //       height: 458
  //     }
  //     ]
  //   }
  // ]
};

export default gameData;
