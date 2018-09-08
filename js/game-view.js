import {complexResize} from './resize';
import {renderElement} from './utils';
import AbstractView from './abstract-view';

const render = (html) => {
  return renderElement(html, `form`, `game__content`);
};

export default class GameView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  render() {
    let frame = {};
    let resizedPictures = [];

    if (this.game.type === `2of2` || this.game.type === `1of1`) {
      frame.width = 468;
      frame.height = 458;
      resizedPictures = complexResize(frame, this.game.pictures);

      return this.game.pictures.map((pictureUrl, index) => `<div class="game__option">
        <img src="${pictureUrl}" alt="Option ${index}" width="${resizedPictures[index].width}" height="${resizedPictures[index].height}">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``);
    }
    if (this.game.type === `1of3`) {
      frame.width = 304;
      frame.height = 455;
      resizedPictures = complexResize(frame, this.game.pictures);

      return this.game.pictures.map((pictureUrl, index) => `<div class="game__option">
    <img src="${pictureUrl}" alt="Option 1" width="${resizedPictures[index].width}" height="${resizedPictures[index].height}">
  </div>`).join(``);
    }
    return `Load Failed`;
  }
}
