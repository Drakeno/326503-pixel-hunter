import AbstractView from '../abstract-view';
import AnswerBtnsView from './items/answer-btns';
import {imageType} from '../data/game-data';
import timer from './items/timer';
import {renderElement, resizeImg} from '../utils';

export default class OneOfOneGameView extends AbstractView {
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
    const option = (item) => {
      const content = renderElement(``, `form`, `game__content game__content--wide`);
      const properImg = OneOfOneGameView.properSize(item);
      properImg.alt = `Option 1`;
      const answersBtns = new AnswerBtnsView(`question1`).element;

      const soloOption = renderElement(``, `div`, `game__option`);
      soloOption.appendChild(properImg);
      soloOption.appendChild(answersBtns);

      content.appendChild(soloOption);

      return content;
    };

    return option(this.data.tasks[0]);
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__answer`);
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
