import AbstractView from '../abstract-view';
import AnswerBtnsView from './items/answer-btns';
import {imageType} from '../data/game-data';
import timer from './items/timer';
// import {imageResize} from '../utils';

// TODO: resize
export default class TwoOfTwoGameView extends AbstractView {
  getTemplate() {
    const options = (tasks) => {
      const _callback = (item) => {
        // const frame = {
        //   width: 468,
        //   height: 458
        // };
        // imageResize(frame, item.src);

        const answersBtns = new AnswerBtnsView(item.name);
        return `<div class="game__option">
        <img src="${item.src}" alt=${item.alt}" width="468" height="458">
        ${answersBtns.getTemplate()}
        </div>`;
      };
      return tasks.map(_callback).join(``);
    };

    return `<form class="game__content">${options(this.data.tasks)}</form>`;
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__answer`);
    super.bind();
  }

  static setGame(e, state, GameView) {
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
        const answerSynchronize = (firstInput.name === `question1`) ? [firstInput.value, secondAnswer] : [secondAnswer, firstInput.value];
        const answer = answerSynchronize.map((userAnswer) => {
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
}
