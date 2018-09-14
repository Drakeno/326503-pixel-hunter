import {showScreen, showElement} from './utils';
import SplashScreen from './splash-screen';
import ErrorModal from './templates/error-modal';
import Loader from './loader';
import Intro from './templates/intro';
import Greeting from './templates/greeting';
import Rules from './templates/rules';
import Game from './templates/game-screen';
import createResults from './templates/stats';

let questData;
export default class Application {
  static start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    splash.start();
    Loader.loadData().
      then((data) => {
        questData = data;
        return questData;
      }).
      then((response) => Application.showIntro(response)).
      catch(Application.showError).
    then(() => splash.stop());
  }

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
    showScreen(new Game(questData).startLevel());
  }
  static showResults() {
    showScreen(createResults());
  }

  static showError(error) {
    const errorScreen = new ErrorModal(error);
    showElement(errorScreen.element);
  }
}
