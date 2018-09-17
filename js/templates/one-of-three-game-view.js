import AbstractView from '../abstract-view';
import {ImageType} from '../data/game-data';
import timer from './items/timer';
import {renderElement, resizeToProperSize} from '../utils';

export default class OneOfThreeGameView extends AbstractView {
  get element() {
    if (this._element) {
      return this._element;
    }
    const wrapper = this.getTemplate();
    this._element = wrapper;
    this.bind();
    return this._element;
  }

  getTemplate() {
    const createOptions = (tasks) => {
      const content = renderElement(``, `form`, `game__content game__content--triple`);
      tasks.forEach((item) => {
        const properImage = resizeToProperSize(item);
        const index = tasks.indexOf(item) + 1;
        properImage.alt = `Option ${index}`;
        const option = renderElement(``, `div`, `game__option`);
        option.appendChild(properImage);

        content.appendChild(option);
      });

      return content;
    };

    return createOptions(this.data.tasks);
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__option`);
    super.bind();
  }

  static setGame(element, state, GameView) {
    element.preventDefault();
    timer.stop();
    const gameOptions = document.querySelectorAll(`.game__option`);
    const answer = [];
    gameOptions.forEach((userAnswer) => {
      if (userAnswer === element.currentTarget) {
        answer.push(ImageType.PAINT);
      } else {
        answer.push(ImageType.PHOTO);
      }
    });
    state.setResult(answer, timer.getTime());
    GameView.goToNextScreen();
  }
}
