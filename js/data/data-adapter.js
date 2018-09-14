export const gameType = {
  TwoOfTwo: 0,
  OneOfOne: 1,
  OneOfThree: 2
};

export const imageType = {
  PAINT: 0,
  PHOTO: 1
};

const localTypeMapper = {
  'two-of-two': gameType.TwoOfTwo,
  'one-of-three': gameType.OneOfThree,
  'tinder-like': gameType.OneOfOne
};

const localAnswerTypeMapper = {
  'painting': imageType.PAINT,
  'photo': imageType.PHOTO,
};

const localTasksMapper = (tasks) => tasks.map((task) => {
  return {
    src: task[`image`][`url`],
    type: localAnswerTypeMapper[task[`type`]],
    width: task[`image`][`width`],
    height: task[`image`][`height`],
  };
});


export const adaptServerData = (data) => data.map((item) => {
  return {
    question: item[`question`],
    gameType: localTypeMapper[item[`type`]],
    tasks: localTasksMapper(item[`answers`])
  };
});

export default adaptServerData;
