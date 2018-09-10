import BackBtnView from './back-btn';
import LivesView from './lives';
import AbstractView from '../../abstract-view';

export default class GameHeaderView extends AbstractView {
  constructor(numLives) {
    super();
    this.numLives = numLives;
    this.backBtn = new BackBtnView();
  }

  getTemplate() {
    const livesView = new LivesView(this.numLives);
    return `<header class="header">${this.backBtn.getTemplate()}<div class="game__timer">30</div>${livesView.getTemplate()}</header>`;
  }
}
