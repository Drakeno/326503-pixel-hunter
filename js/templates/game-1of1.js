import AbstractView from '../abstract-view';
import AnswerBtnsView from './items/answer-btns';

// TODO: resize
export default class OneOfOneGameView extends AbstractView {
  getTemplate() {
    const option = (item) => {
      const answersBtns = new AnswerBtnsView(item.name);
      return `<div class="game__option">
        <img src="${item.src}" alt="${item.alt}" width="705" height="455">
        ${answersBtns.getTemplate()}
      </div>`;
    };

    return `<form class="game__content  game__content--wide">${option(this.data.tasks[0])}</form>`;
  }
  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__answer`);
    super.bind();
  }
}
