import gameData from './game-data';
import {isEquivalent} from '../utils';

const initialState = {
  currentRound: 0,
  rounds: [
    {
      questions: [],
      currentTask: 0,
      lives: 3,
      stats: [],
      result: []
    }
  ]
};

const points = gameData.points;
const statsType = gameData.statsType;

class State {
  constructor(state = initialState) {
    this._state = state;
  }

  get currentRound() {
    return this._state.rounds[this._state.currentRound];
  }

  setQuestions(questions) {
    this._state.rounds = questions;
  }

  setResult(answer, time) {
    this._state = State.setResult(this._state, answer, time);
  }

  countTotal() {
    this._state = State.countTotal(this._state);
  }

  static checkCorrect(taskResult) {
    const answer = taskResult.userAnswer;
    const real = taskResult.realAnswer;
    const isCorrect = isEquivalent(answer, real);
    return Object.assign({}, taskResult, {isCorrect});
  }

  static setStats(round, value) {
    let newStats = round.stats.slice();
    newStats[round.currentTask] = value;
    return Object.assign({}, round, {
      stats: newStats
    });
  }

  static checkAnswerType(taskResult) {
    let res = statsType.UNKNOWN;

    if (taskResult.isCorrect === true) {
      if (taskResult.currentTime > gameData.FAST_TIME) {
        res = statsType.FAST;
      } else if (taskResult.currentTime < gameData.SLOW_TIME) {
        res = statsType.SLOW;
      } else {
        res = statsType.CORRECT;
      }
    } else if (taskResult.isCorrect === false) {
      res = statsType.WRONG;
    }
    return Object.assign({}, taskResult, {
      statsType: res
    });
  }

  static setResult(momentState, answer, time) {
    const decreaseLives = (round) => Object.assign({}, round, {lives: round.lives - 1});
    const setCurrent = (round, currentTask) => Object.assign({}, round, {currentTask});
    const getCurrent = (round) => round.currentTask;
    const setTime = (taskResult, currentTime) => Object.assign({}, taskResult, {currentTime});
    const setUserAnswer = (taskResult, userAnswer) => Object.assign({}, taskResult, {userAnswer});
    const setRealAnswer = (taskResult, realAnswer) => Object.assign({}, taskResult, {realAnswer});

    const currentRoundNum = momentState.currentRound;
    const round = momentState.rounds[currentRoundNum];
    const currentTaskNum = getCurrent(round);

    const currentQuestion = round.questions[currentTaskNum].tasks;
    const realAnswer = currentQuestion.map((item) => {
      return item.type;
    });
    const resultWithAnswers = setRealAnswer(setUserAnswer({}, answer), realAnswer);

    const resultWithTime = setTime(resultWithAnswers, time);
    const taskResult = State.checkAnswerType(State.checkCorrect(resultWithTime));

    let gameStatus = State.setStats(round, taskResult.statsType);

    if (!taskResult.isCorrect) {
      gameStatus = decreaseLives(gameStatus);
    }

    gameStatus = setCurrent(gameStatus, currentTaskNum + 1);
    gameStatus.result[currentTaskNum] = taskResult;

    const rounds = momentState.rounds.slice();
    rounds[momentState.currentRound] = gameStatus;
    return Object.assign({}, momentState, {rounds});
  }

  static countTotal(momentState) {
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

    const isWin = wrong < gameData.TOTAL_LIVES;

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
    const gameStatus = Object.assign({}, round, total);
    const rounds = momentState.rounds.slice();
    rounds[momentState.currentRound] = gameStatus;
    return Object.assign({}, momentState, {rounds});
  }
}

const state = new State();
export default state;
