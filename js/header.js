import {showScreen, renderElement} from './utils';
import greetingTemplate from './greeting';
import INITIAL_STATE from './data';

export const headerTemplate = `<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>`;

export const getHeaderTime = (state = INITIAL_STATE) => state.time;

export const getHeaderLives = (state = INITIAL_STATE) => `${new Array(3 - state.lives)
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
    .join(``)}
  ${state.lives > 0 ? new Array(state.lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``) : ``}`;

export const renderHeader = (state, gameStatus) => {
  const headerElement = renderElement(headerTemplate, `header`, `header`);
  if (gameStatus === 1) {
    const headerGameTime = renderElement(getHeaderTime(state), `div`, `game__timer`);
    const headerGameLives = renderElement(getHeaderLives(state), `div`, `game__lives`);
    headerElement.appendChild(headerGameTime);
    headerElement.appendChild(headerGameLives);
  }

  const backBtn = headerElement.querySelector(`button.back`);
  backBtn.addEventListener(`click`, () => {
    showScreen(greetingTemplate);
  });

  return headerElement;
};

export default renderHeader;
