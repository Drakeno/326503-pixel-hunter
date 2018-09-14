import AbstractView from '../abstract-view';
import {imageType} from '../data/game-data';
import timer from './items/timer';
import {renderElement, resizeImg} from '../utils';

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
    const options = (tasks) => {
      const content = renderElement(``, `form`, `game__content game__content--triple`);
      tasks.forEach((item) => {
        const properImg = OneOfThreeGameView.properSize(item);
        const index = tasks.indexOf(item) + 1;
        properImg.alt = `Option ${index}`;
        const option = renderElement(``, `div`, `game__option`);
        option.appendChild(properImg);

        content.appendChild(option);
      });

      return content;
    };

    return options(this.data.tasks);
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__option`);
    super.bind();
  }

  static properSize(image) {
    const frame = {
      width: image.width,
      height: image.height
    };
    return resizeImg(image, frame);
  }

  static setGame(e, state, GameView) {
    e.preventDefault();
    timer.stop();
    const gameOptions = document.querySelectorAll(`.game__option`);
    const answer = [];
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
