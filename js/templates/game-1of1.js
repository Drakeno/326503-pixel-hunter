import AbstractView from '../abstract-view';
import AnswerBtnsView from './items/answer-btns';
import {imageType} from '../data/game-data';
import timer from './items/timer';

// TODO: resize
export default class OneOfOneGameView extends AbstractView {
  getTemplate() {
    const option = (item) => {
      const answersBtns = new AnswerBtnsView(item.name);

      return `<div class="game__option">
        <img src="${item.src}" alt="Option 1" width="705" height="455">
        ${answersBtns.getTemplate()}
      </div>`;
    };

    return `<form class="game__content  game__content--wide">${option(this.data.tasks[0])}</form>`;
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__answer`);
    super.bind();
  }

  static setGame(e, state, GameView) {
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
}
