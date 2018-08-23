import {assert} from 'chai';

const timerCalc = (time) => time++;
timerCalc();
// const timeFlow = (time) => {
//   for (let i = 0; i <= 30; i++) {
//     setTimeout(timerCalc(i), 1000);
//   }
//   if (time > 30) {
//     return -1;
//   }
//   return time;
// };

const livesControl = (answer, lives) => {
  if (answer !== true) {
    lives--;
  }
  return lives;
};

describe(`Lives Calculation function`, () => {
  it(`Should work and return correct data`, () => {
    assert.deepEqual(livesControl(true, 3), 3);
    assert.deepEqual(livesControl(false, 3), 2);
    assert.deepEqual(livesControl(false, 1), 0);
  });
  it(`Should work with broken data`, () => {
    assert.deepEqual(livesControl(undefined, 3), 2);
    assert.deepEqual(livesControl(null, 3), 2);
    assert.deepEqual(livesControl([], 1), 0);
  });
});
