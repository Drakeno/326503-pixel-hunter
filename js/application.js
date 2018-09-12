import {showScreen} from './utils.js';
import Intro from './templates/intro';
import Greeting from './templates/greeting';
import Rules from './templates/rules';
import Game from './templates/game-screen';
import createResults from './templates/stats';

export default class Application {
  static showIntro() {
    this.currentView = new Intro();
    showScreen(this.currentView.element);
  }
  static showGreeting() {
    this.currentView = new Greeting();
    showScreen(this.currentView.element);
  }
  static showRules() {
    this.currentView.clear();
    this.currentView = new Rules();
    showScreen(this.currentView.element);
  }
  static showGame() {
    if (this.currentView) {
      this.currentView.clear();
    }
    this.currentView = null;
    showScreen(new Game().startLevel());
  }
  static showResults() {
    showScreen(createResults());
  }
}
