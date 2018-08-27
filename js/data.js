const initialState = {
  game: `game-1`,
  lives: 3,
  time: 1,
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

export const gameQuestions = {
  'game-1': {
    type: `2of2`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    pictures: [initialPictures.paintings[0], initialPictures.photos[0]],
    answers: [`paint`, `photo`]
  },

  'game-2': {
    type: `1of1`,
    task: `Угадай, фото или рисунок?`,
    pictures: [initialPictures.paintings[1]],
    answers: [`paint`]
  },

  'game-3': {
    type: `1of3`,
    task: `Найдите рисунок среди изображений`,
    pictures: [initialPictures.paintings[2], initialPictures.photos[1], initialPictures.photos[2]],
    answers: 1
  },

  'game-4': {
    type: `2of2`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    pictures: [initialPictures.paintings[0], initialPictures.photos[0]],
    answers: [`paint`, `photo`]
  },

  'game-5': {
    type: `2of2`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    pictures: [initialPictures.paintings[0], initialPictures.photos[0]],
    answers: [`paint`, `photo`]
  },

  'game-6': {
    type: `1of3`,
    task: `Найдите рисунок среди изображений`,
    pictures: [initialPictures.paintings[2], initialPictures.photos[1], initialPictures.photos[2]],
    answers: [0]
  },

  'game-7': {
    type: `1of3`,
    task: `Найдите рисунок среди изображений`,
    pictures: [initialPictures.paintings[2], initialPictures.photos[1], initialPictures.photos[2]],
    answers: [0]
  },

  'game-8': {
    type: `1of1`,
    task: `Угадай, фото или рисунок?`,
    pictures: [initialPictures.paintings[1]],
    answers: [`paint`]
  },

  'game-9': {
    type: `1of1`,
    task: `Угадай, фото или рисунок?`,
    pictures: [initialPictures.paintings[1]],
    answers: [`paint`]
  },

  'game-10': {
    type: `1of3`,
    task: `Найдите рисунок среди изображений`,
    pictures: [initialPictures.paintings[2], initialPictures.photos[1], initialPictures.photos[2]],
    answers: [0]
  },
};

export default initialState;
