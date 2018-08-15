import {renderElement, clickShowScreen} from './utils.js';
import greetingTemplate from './greeting.js';

const introTemplate = renderElement(`<section class="intro">
<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`);

const asteriskBtn = introTemplate.querySelector(`.intro__asterisk`);

clickShowScreen(asteriskBtn, greetingTemplate);

export default introTemplate;
