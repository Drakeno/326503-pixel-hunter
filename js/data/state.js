import gameData from './game-data';
import {isEquivalent} from '../utils';

const initialState = {
  currentRound: 0,
  rounds: [
    {
      questions: gameData.questions,
      currentTask: 0,
      lives: 3,
      stats: [],
      result: []
    }
  ]
};

const points = gameData.points;

const statsType = gameData.statsType;

export const setLives = (round, lives) => Object.assign({}, round, {lives});
export const getLives = (round) => round.lives;
export const decreaseLives = (round) => Object.assign({}, round, {lives: round.lives - 1});

export const setCurrent = (round, currentTask) => Object.assign({}, round, {currentTask});
export const getCurrent = (round) => round.currentTask;
export const increaseCurrent = (round) => Object.assign({}, round, {currentTask: round.currentTask + 1});

export const setTime = (taskResult, time) => Object.assign({}, taskResult, {time});
export const getTime = (taskResult) => taskResult.time;

export const checkCorrect = (taskResult) => {
  const answer = taskResult.answer;
  const real = taskResult.realAnswer;
  const isCorrect = isEquivalent(answer, real);
  return Object.assign({}, taskResult, {isCorrect});
};

export const getCorrect = (taskResult) => taskResult.isCorrect;

export const checkAnswerType = (taskResult) => {
  let res;

  if (taskResult.isCorrect === true) {
    if (taskResult.time > 20) {
      res = statsType.FAST;
    } else if (taskResult.time < 10) {
      res = statsType.SLOW;
    } else {
      res = statsType.CORRECT;
    }
  } else if (taskResult.isCorrect === false) {
    res = statsType.WRONG;
  } else {
    res = statsType.UNKNOWN;
  }
  return Object.assign({}, taskResult, {
    statsType: res
  });
};

export const getAnswerType = (taskResult) => taskResult.statsType;
export const setUserAnswer = (taskResult, answer) => Object.assign({}, taskResult, {answer});
export const setRealAnswer = (taskResult, realAnswer) => Object.assign({}, taskResult, {realAnswer});

export const setStats = (round, value) => {
  let newStats = round.stats.slice();
  newStats[round.currentTask] = value;
  return Object.assign({}, round, {
    stats: newStats
  });
};

export const setResult = (momentState, answer, time) => {
  const currentRoundNum = momentState.currentRound;
  const round = momentState.rounds[currentRoundNum];
  const currentTaskNum = getCurrent(round);

  const currentQuestion = round.questions[currentTaskNum].tasks;
  const realAnswer = currentQuestion.map((item) => {
    return item.type;
  });
  const resultWithAnswers = setRealAnswer(setUserAnswer({}, answer), realAnswer);

  const resultWithTime = setTime(resultWithAnswers, time);
  const taskResult = checkAnswerType(checkCorrect(resultWithTime));

  let res = setStats(round, taskResult.statsType);
  if (!getCorrect(taskResult)) {
    res = decreaseLives(res);
  }
  res = setCurrent(res, currentTaskNum + 1);
  res.result[currentTaskNum] = taskResult;

  const rounds = momentState.rounds.slice();
  rounds[momentState.currentRound] = res;
  return Object.assign({}, momentState, {rounds});
};

export const countTotal = (momentState) => {
  const round = momentState.rounds[momentState.currentRound];
  const result = round.result;

  let correct = 0;
  let wrong = 0;
  let fastBonuses = 0;
  let livesBonuses = round.lives > 0 ? round.lives : 0;
  let fines = 0;

  result.forEach((item) => {
    if (item.isCorrect === true) {
      correct += 1;
    } else {
      wrong += 1;
    }
    if (item.statsType === statsType.SLOW) {
      fines += 1;
    } else if (item.statsType === statsType.FAST) {
      fastBonuses += 1;
    }
  });

  const isWin = wrong < 4;

  let total;
  if (isWin) {
    total = {
      isWin,
      isCorrect: correct,
      totalPoints: correct * points.CORRECT + (livesBonuses + fastBonuses) * points.BONUS + fines * points.FINE,
      fastBonuses,
      livesBonuses: round.lives,
      slowFine: fines
    };
  } else {
    total = {
      isWin,
      isCorrect: 0,
      totalPoints: 0,
      fastBonuses: 0,
      livesBonuses: 0,
      slowFine: 0
    };
  }
  const res = Object.assign({}, round, total);
  const rounds = momentState.rounds.slice();
  rounds[momentState.currentRound] = res;
  return Object.assign({}, momentState, {rounds});
};

class State {
  constructor(state = initialState) {
    this._state = state;
  }
  get currentRound() {
    return this._state.rounds[this._state.currentRound];
  }
  setResult(answer, time) {
    this._state = setResult(this._state, answer, time);
  }
  countTotal() {
    this._state = countTotal(this._state);
  }
}

const state = new State();
export default state;
