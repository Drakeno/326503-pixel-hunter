import {showComplexScreen, renderElement, elementConstruct, isEquivalent} from './utils';
import initialState, {gameQuestions} from './data';
import {renderHeader} from './header';
import renderResults, {statsInGame, livesControl} from './stats';
import {complexResize} from './resize';

const getGameTask = (game) => game.task;

// Подбор варианта вывода для разных типов игры
const getGameScreen = (game) => {
  const frame = { };

  switch (game.type) {
    case `2of2`:
      frame.width = 468;
      frame.height = 458;
      let twoPictResized = complexResize(frame, game.pictures);

      return `<div class="game__option">
    <img src="${game.pictures[0]}" alt="Option 1" width="${twoPictResized[0].width}" height="${twoPictResized[0].height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
  <div class="game__option">
    <img src="${game.pictures[1]}" alt="Option 2" width="${twoPictResized[1].width}" height="${twoPictResized[1].height}">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

    case `1of1`:
      frame.width = 468;
      frame.height = 458;
      let onePictResized = complexResize(frame, game.pictures);
      return `<div class="game__option">
     <img src="${game.pictures[0]}" alt="Option 1" width="${onePictResized[0].width}" height="${onePictResized[0].height}">
     <label class="game__answer  game__answer--photo">
       <input class="visually-hidden" name="question1" type="radio" value="photo">
       <span>Фото</span>
     </label>
     <label class="game__answer  game__answer--paint">
       <input class="visually-hidden" name="question1" type="radio" value="paint">
       <span>Рисунок</span>
     </label>
   </div>`;

    case `1of3`:
      frame.width = 304;
      frame.height = 455;
      let threePictResized = complexResize(frame, game.pictures);
      return `<div class="game__option">
    <img src="${game.pictures[0]}" alt="Option 1" width="${threePictResized[0].width}" height="${threePictResized[0].height}">
  </div>
  <div class="game__option  game__option--selected">
    <img src="${game.pictures[1]}" alt="Option 2" width="${threePictResized[1].width}" height="${threePictResized[1].height}">
  </div>
  <div class="game__option">
    <img src="${game.pictures[2]}" alt="Option 3" width="${threePictResized[2].width}" height="${threePictResized[2].height}">
  </div>`;
  }
  return `Load Failed`;
};

// Я помню, что не стоит делать let, но без них пока не могу придумать как сделать временный state и создать массив ответа юзера
let userAnswers = [];

// TODO не сбрасывается при кнопке назад
const state = Object.assign({}, initialState);

export const renderGame = (answers, game) => {
  const gameScreen = renderElement(``, `section`, `game`);
  const gameTask = renderElement(getGameTask(game), `p`, `game__task`);
  const gameContent = renderElement(getGameScreen(game), `form`, `game__content ${game.type === `1of3` ? `game__content--triple` : ``}`);
  const gameStats = statsInGame(answers);
  // Сборка разных частей игрового экрана воедино
  elementConstruct(gameScreen, [gameTask, gameContent, gameStats]);

  // Цепляемся за варианты ответов
  const gameCont = gameScreen.querySelector(`.game__content`);
  const gameOptions = gameScreen.querySelectorAll(`.game__option`);

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

  return gameScreen;
};

export default renderGame;
