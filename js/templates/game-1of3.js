import AbstractView from '../abstract-view';

// TODO: resize
export default class OneOfThreeGameView extends AbstractView {
  getTemplate() {
    const options = (tasks) => {
      const _callback = (item) => `<div class="game__option${item.isSelected ? ` game__option--selected` : ``}">
        <img src="${item.src}" alt="${item.alt}" width="304" height="455">
      </div>`;
      return tasks.map(_callback).join(``);
    };

    return `<form class="game__content  game__content--triple">${options(this.data.tasks)}</form>`;
  }
  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__option`);
    super.bind();
  }
}
