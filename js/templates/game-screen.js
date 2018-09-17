import {renderElement, appendElement} from '../utils';
import GameHeaderView from './items/game-header';
import AnswersHistoryView from './items/answers-history';
import gameData, {GameType} from '../data/game-data';
import TwoOfTwoGameView from './game-2of2';
import OneOfOneGameView from './game-1of1';
import OneOfThreeGameView from './game-1of3';
import Application from '../application';
import state from '../data/state';
import timer from './items/timer';

export default class GameView {
  constructor(questData) {
    this.questData = questData;
    this.round = state.currentRound;
    this.task = this.questData[this.round.currentTask];
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
    return renderElement(this.questData[this.round.currentTask].question, `p`, `game__task`);
  }

  renderGameContent() {
    switch (this.task.gameType) {
      case GameType.TwoOfTwo:
        return new TwoOfTwoGameView(this.task, GameView.TwoOfTwoCallback).element;
      case GameType.OneOfOne:
        return new OneOfOneGameView(this.task, GameView.OneOfOneCallback).element;
      case GameType.OneOfThree:
        return new OneOfThreeGameView(this.task, GameView.OneOfThreeCallback).element;
      default:
        throw new Error(`Unknown game type`);
    }
  }

  renderGameStats() {
    return appendElement(new AnswersHistoryView(this.round.stats).element, `ul`, `stats`);
  }

  startLevel() {
    state.configure(this.questData);
    timer.configure(gameData.START_TIME, this.game.querySelector(`.game__timer`), GameView.timeOverCallback).start();

    return this.game;
  }

  returnQuestions() {
    return this.questData;
  }

  static timeOverCallback() {
    state.setResult([], 0);
    GameView.goToNextScreen();
  }

  static TwoOfTwoCallback(e) {
    TwoOfTwoGameView.setGame(e, state, GameView);
  }

  static OneOfOneCallback(e) {
    OneOfOneGameView.setGame(e, state, GameView);
  }

  static OneOfThreeCallback(e) {
    OneOfThreeGameView.setGame(e, state, GameView);
  }

  static goToNextScreen() {
    const round = state.currentRound;
    const current = round.currentTask;
    if (round.lives < gameData.MIN_LIVES || current >= gameData.MAX_ANSWERS) {
      state.countTotal();
      Application.showResults(state);
    } else {
      Application.showGame();
    }
  }
}
