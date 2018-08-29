import {showComplexScreen, renderElement} from './utils';
import initialState, {gameQuestions} from './data';
import {renderHeader} from './header';
import renderGame from './game';

const rulesTemplate = renderElement(`<section class="rules">
<h2 class="rules__title">Правила</h2>
<ul class="rules__description">
  <li>Угадай 10 раз для каждого изображения фото
    <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
    <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
  <li>Фотографиями или рисунками могут быть оба изображения.</li>
  <li>На каждую попытку отводится 30 секунд.</li>
  <li>Ошибиться можно не более 3 раз.</li>
</ul>
<p class="rules__ready">Готовы?</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</section>`);

const rulesForm = rulesTemplate.querySelector(`.rules__form`);
const rulesBtn = rulesForm.querySelector(`.rules__button`);
const rulesInput = rulesForm.querySelector(`.rules__input`);

rulesInput.addEventListener(`input`, () => {
  if (rulesInput.value !== ``) {
    rulesBtn.removeAttribute(`disabled`);
  } else {
    rulesBtn.setAttribute(`disabled`, `true`);
  }
});

rulesForm.addEventListener(`submit`, () => {
  showComplexScreen([renderHeader(initialState, 1), renderGame([], gameQuestions[initialState.game])]);
});

export default rulesTemplate;
