import {renderElement, appendElement} from '../utils';
import GameHeaderView from './items/game-header';
import AnswersHistoryView from './items/answers-history';
import gameData, {gameType, imageType} from '../data/game-data';
import TwoOfTwoGameView from './game-2of2';
import OneOfOneGameView from './game-1of1';
import OneOfThreeGameView from './game-1of3';
import Application from '../application';
import state from '../data/state';
import timer from './items/timer';

export default class GameView {
  constructor() {
    this.round = state.currentRound;
    this.task = this.round.questions[this.round.currentTask];

    this.header = this.renderHeader();
    this.level = this.renderLevel();

    this.game = document.createDocumentFragment();
    this.game.appendChild(this.header);
    this.game.appendChild(this.level);
  }

  renderHeader() {
    const header = new GameHeaderView(this.round.lives);
    return header.element;
  }

  renderLevel() {
    const gameScreen = renderElement(``, `section`, `game`);
    gameScreen.appendChild(this.renderGameTask());
    gameScreen.appendChild(this.renderGameContent());
    gameScreen.appendChild(this.renderGameStats());
    return gameScreen;
  }

  renderGameTask() {
    return renderElement(gameData.questionText[this.task.gameType], `p`, `game__task`);
  }

  renderGameContent() {
    switch (this.task.gameType) {
      case gameType.TwoOfTwo:
        return new TwoOfTwoGameView(this.task, GameView.TwoOfTwoCallback).element;
      case gameType.OneOfOne:
        return new OneOfOneGameView(this.task, GameView.OneOfOneCallback).element;
      case gameType.OneOfThree:
        return new OneOfThreeGameView(this.task, GameView.OneOfThreeCallback).element;
      default:
        throw new Error(`Unknown game type`);
    }
  }

  renderGameStats() {
    return appendElement(new AnswersHistoryView(this.round.stats).element, `ul`, `stats`);
  }

  startLevel() {
    timer.configure(30, this.game.querySelector(`.game__timer`), GameView.timeOverCallback).start();
    return this.game;
  }

  static timeOverCallback() {
    state.setResult([], 0);
    GameView.goToNextScreen();
  }

  static TwoOfTwoCallback(e) {
    e.preventDefault();
    const firstAnswer = document.querySelector(`.game__answer.checked`);

    if (firstAnswer) {
      const firstInput = firstAnswer.querySelector(`input`);
      const currentInput = e.currentTarget.querySelector(`input`);

      if (firstInput.name === currentInput.name) {
        firstInput.checked = false;
        currentInput.checked = true;
      } else {
        timer.stop();
        const secondAnswer = e.currentTarget.querySelector(`input`).value;
        const answerSynh = (firstInput.name === `question1`) ? [firstInput.value, secondAnswer] : [secondAnswer, firstInput.value];
        const answer = answerSynh.map((userAnswer) => {
          switch (userAnswer) {
            case `photo`:
              return imageType.PHOTO;
            case `paint`:
              return imageType.PAINT;
            default:
              return null;
          }
        });
        state.setResult(answer, timer.getTime());
        GameView.goToNextScreen();
      }
    } else {
      e.currentTarget.classList.add(`checked`);
      e.currentTarget.querySelector(`input`).checked = true;
    }
  }

  static OneOfOneCallback(e) {
    e.preventDefault();
    timer.stop();
    let userAnswer = e.currentTarget.querySelector(`input`).value;
    let answer;
    if (userAnswer === `photo`) {
      answer = [imageType.PHOTO];
    } else if (userAnswer === `paint`) {
      answer = [imageType.PAINT];
    }
    state.setResult(answer, timer.getTime());
    GameView.goToNextScreen();
  }

  static OneOfThreeCallback(e) {
    e.preventDefault();
    timer.stop();
    const gameOptions = document.querySelectorAll(`.game__option`);
    let answer = [];
    gameOptions.forEach((userAnswer) => {
      if (userAnswer === e.currentTarget) {
        answer.push(imageType.PAINT);
      } else {
        answer.push(imageType.PHOTO);
      }
    });
    state.setResult(answer, timer.getTime());
    GameView.goToNextScreen();
  }

  static goToNextScreen() {
    const round = state.currentRound;
    const current = round.currentTask;
    if (round.lives < 0 || current >= 10) {
      state.countTotal();
      Application.showResults();
    } else {
      Application.showGame();
    }
  }
}
