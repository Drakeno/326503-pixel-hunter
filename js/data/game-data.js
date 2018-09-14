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
};

export class GameData {
  constructor() {
    this.currentRound = 0;
    this.rounds = [
      {
        questions: [],
        currentTask: 0,
        lives: gameData.TOTAL_LIVES,
        stats: [],
        result: []
      }
    ];
  }

  configure(questData) {
    this.rounds[0].questions = questData;
    return this;
  }
}

export default gameData;
