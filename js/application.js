import {showScreen, showElement} from './utils';
import SplashScreen from './splash-screen';
import ErrorModal from './templates/error-modal';
import Loader from './loader';
import Intro from './templates/intro-view';
import Greeting from './templates/greeting-view';
import Rules from './templates/rules-view';
import Game from './templates/game-view';
import StatsView from './templates/stats-view';

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
    showScreen(new Game(questData, name).startLevel());
  }
  static showResults(state) {
    const scoreBoard = new StatsView(state);
    showScreen(scoreBoard.element);
    Loader.saveResults(state.currentRound, `Default`).
      then(() => Loader.loadResults(`Default`).
      then((data) => scoreBoard.showScores(data)).
      catch(Application.showError));
  }

  static showError(error) {
    const errorScreen = new ErrorModal(error);
    showElement(errorScreen.element);
  }
}
