import AbstractView from '../abstract-view';
import AnswerBtnsView from './items/answer-btns';

// TODO: resize
export default class TwoOfTwoGameView extends AbstractView {
  getTemplate() {
    const options = (tasks) => {
      const _callback = (item) => {
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
}
