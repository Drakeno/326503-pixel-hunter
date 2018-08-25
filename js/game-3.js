import {renderElement, clickShowScreen} from './utils.js';
import statsTemplate from './stats.js';

const thirdGameTemplate = renderElement(`<section class="game">
<p class="game__task">Найдите рисунок среди изображений</p>
<form class="game__content  game__content--triple">
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option  game__option--selected">
    <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
  </div>
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
  </div>
</form>
<ul class="stats">
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--correct"></li>
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--unknown"></li>
</ul>
</section>`);

const gameContent = thirdGameTemplate.querySelector(`.game__content`);
const gameOptions = gameContent.querySelectorAll(`.game__option`);

Array.from(gameOptions).forEach((element) => clickShowScreen(element, statsTemplate));

export default thirdGameTemplate;
