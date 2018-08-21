// Управление жизнями игрока livesControl
// Переключение уровней levelChange
// Отсчёт времени timeFlow

import {assert} from 'chai';

describe(`Stats Calculation function`, () => {
  it(`text`, () => {
    assert.deepEqual(statsCalc(null, 3), -1);
  });
});
