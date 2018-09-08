import {showComplexScreen, renderElement, elementConstruct, isEquivalent} from './utils';
import INITIAL_STATE, {gameQuestions} from './data';
import {renderHeader} from './header';
import renderResults, {statsInGame, livesControl} from './stats';
import GameView from './game-view';

const getGameTask = (game) => game.task;

// Я помню, что не стоит делать let, но без них пока не могу придумать как сделать временный state и создать массив ответа юзера
let userAnswers = [];

// TODO не сбрасывается при кнопке назад
const state = Object.assign({}, INITIAL_STATE);

const gameScreen = renderElement(``, `section`, `game`);
const gameTask = renderElement(``, `p`, `game__task`);
const gameContent = renderElement(``, `form`, `game__content`);
const gameStats = renderElement(``, `ul`, `stats`);
elementConstruct(gameScreen, [gameTask, gameContent, gameStats]);

const checkGameType = (game) => {
  if (game.type === `1of3`) {
    gameContent.classList.add(`game__content--triple`);
  } else {
    gameContent.classList.remove(`game__content--triple`);
  }
};

const updateGame = (answers, game) => {
  gameTask.innerHTML = getGameTask(game);
  gameContent.innerHTML = new GameView(game).element;
  checkGameType(game);
  gameStats.innerHTML = statsInGame(answers);
};

export const renderGame = (answers, game) => {
  updateGame(answers, game);
  // Цепляемся за варианты ответов
  const gameCont = gameScreen.querySelector(`.game__content`);
  const gameOptions = gameScreen.querySelectorAll(`.game__option`);
  // Работа с ответами и инициирование включения следующей игры
  if (game.type === `1of3`) {
    userAnswers = [];
    gameOptions.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        userAnswers.push(index);
        changeGame();
      });
    });
  } else {
    gameCont.addEventListener(`change`, () => {
      const gameOptionsChecked = Array.from(gameScreen.querySelectorAll(`.game__option input:checked`));
      userAnswers = gameOptionsChecked.map((el) => (el.value));
      if (gameOptions.length === gameOptionsChecked.length) {
        changeGame();
      }
    });
  }

  // Переход на новый уровень
  const changeGame = () => {
    // Запись ответов в массив. Проверка на правильность и неправильность. Пока по ТЗ просто правильный и неправильный
    answers.push(isEquivalent(userAnswers, game.answers) ? {answer: true, time: 15} : {answer: false, time: 15});
    // Меняем игру на следующую и считаем другие параметры
    state.game = `game-${answers.length + 1}`;
    // temporary time = sreen number
    state.time = ++state.time;
    // Смотрим на последний ответ и считаем жизни
    state.lives = livesControl(answers[answers.length - 1].answer, state.lives);

    if (state.lives < 0) {
      showComplexScreen([renderHeader(state, 0), renderResults(answers, state.lives)]);
      return;
    }

    if (answers.length === Object.keys(gameQuestions).length) {
      showComplexScreen([renderHeader(state, 0), renderResults(answers, state.lives)]);
    }

    showComplexScreen([renderHeader(state, 1), renderGame(answers, gameQuestions[state.game])]);
  };

  return gameScreen;
};

export default renderGame;
