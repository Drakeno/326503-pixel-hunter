import AbstractView from '../abstract-view';
import {imageType} from '../data/game-data';
import timer from './items/timer';

// TODO: resize
export default class OneOfThreeGameView extends AbstractView {
  getTemplate() {
    const options = (tasks) => {
      const _callback = (item) => {
        const index = tasks.indexOf(item) + 1;
        return `<div class="game__option${index === 2 ? ` game__option--selected` : ``}">
        <img src="${item.src}" alt="Option ${index}" width="304" height="455">
      </div>`;
      };
      return tasks.map(_callback).join(``);
    };

    return `<form class="game__content  game__content--triple">${options(this.data.tasks)}</form>`;
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__option`);
    super.bind();
  }

  static setGame(e, state, GameView) {
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
}
