

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const reference = document.querySelector(`body`);
const mainElement = document.querySelector(`#main`);

// Ссылки на все возможные DOM-элементы экранов
const templates = document.querySelectorAll(`template`);
const screens = Array.from(templates).map((it) => it.content);

// Функция отрисовки
const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let current = 0;

// Функция, которая по переданному номеру будет показывать экран из массива, карусель
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

select(current);

// Обработчик клавиатурных событий ← и →
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

// Визуальные стрелки, которые будут дублировать поведение с клавиатуры
const virtualArrows = document.createElement(`div`);
virtualArrows.className = `arrows__wrap`;
virtualArrows.innerHTML = `<style>
.arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  margin-left: -56px;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>`;

reference.appendChild(virtualArrows);

const arrows = document.querySelectorAll(`.arrows__btn`);

arrows.forEach((el) => {
  el.onclick = () => {
    if (el.textContent === `<-`) {
      select(current - 1);
    }

    if (el.textContent === `->`) {
      select(current + 1);
    }
  };
});
