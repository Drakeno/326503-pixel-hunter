import {renderElement, elementConstruct} from './utils';

const getResultTitile = (answers, lives) => (statsCalc(answers, lives) === -1) ? `Поражение!` : `Победа!`;
const getResults = (answers, lives) => {
  let rightAnswers = 0;
  answers.forEach(
      (el) => {
        rightAnswers += (el.answer) ? 1 : 0;
      }
  );
  const result = statsCalc(answers, lives);
  return `<tr>
  <td class="result__number">1.</td>
  <td colspan="2">
  <ul class="stats">
    ${statsInGameTemplate(answers)}
    </ul>
  </td>
  <td class="result__points">× 100</td>
  <td class="result__total">${rightAnswers * 100}</td>
</tr>
${lives > 0 ? `<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${lives * 50}</td>
</tr>` : ``}
<tr>
  <td colspan="5" class="result__total  result__total--final">${result === -1 ? `FAIL` : result}</td>
</tr>
`;
};

export const renderResults = (answers, lives) => {
  const resultScreen = renderElement(``, `section`, `result`);
  const resultTitle = renderElement(getResultTitile(answers, lives), `h2`, `result__title`);
  const resultContent = renderElement(getResults(answers, lives), `table`, `result__table`);

  elementConstruct(resultScreen, [resultTitle, resultContent]);

  return resultScreen;
};

const statsInGameTemplate = (answers) => {
  let currentStats = new Array(answers.length);
  answers.forEach(
      (el) => {
        currentStats.push(`<li class="stats__result stats__result--${el.answer ? `correct` : `wrong`}"></li>`);
      }
  );
  return currentStats.join(``);
};

export const statsInGame = (answers) => renderElement(statsInGameTemplate(answers), `ul`, `stats`);

export const livesControl = (answer, lives) => {
  if (answer !== true) {
    lives--;
  }
  return lives;
};

export const statsCalc = (answers, lives) => {
  let points = 0;

  if (!answers || answers === []) {
    return -1;
  }
  if (Object.prototype.toString.call(answers) !== `[object Array]`) {
    return -1;
  }
  if (answers.length !== 10) {
    return -1;
  }

  if (lives > 0) {
    points += lives * 50;
  }

  answers.forEach(
      (el) => {
        if (el.answer === true) {
          points += 100;
          if (el.time < 10) {
            points += 50;
          }
          if (el.time > 20) {
            points -= 50;
          }
        }
      }
  );

  return points;
};

export default renderResults;
