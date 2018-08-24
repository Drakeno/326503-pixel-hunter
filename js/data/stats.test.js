import {assert} from 'chai';

const statsCalc = (answers, lives) => {
  let points = 0;

  if (!answers || !answers.length) {
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

describe(`Stats Calculation function`, () => {
  it(`should work and return -1 with empty or non-correct data`, () => {
    assert.deepEqual(statsCalc(null, 3), -1);
    assert.deepEqual(statsCalc([], 3), -1);
    assert.deepEqual(statsCalc({}), -1);
    assert.deepEqual(statsCalc([]), -1);
    assert.deepEqual(statsCalc(undefined), -1);
  });

  it(`should return -1 when data < 10`, () => {
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }, {
      answer: true,
      time: 10
    }], 3), -1);
  });
  it(`should return correct points in different situations`, () => {
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 13
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }], 3), 1150);
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 13
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 8
    }, {
      answer: true,
      time: 8
    }], 3), 1250);
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 13
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 15123123
    }, {
      answer: true,
      time: 33
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 55
    }, {
      answer: true,
      time: 8
    }, {
      answer: true,
      time: 8
    }], 3), 1100);
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 13
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }], 1), 1050);
    assert.deepEqual(statsCalc([{
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 13
    }, {
      answer: true,
      time: 15
    }, {
      answer: true,
      time: 15
    }, {
      answer: false,
      time: 12
    }, {
      answer: false,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }, {
      answer: true,
      time: 12
    }], 2), 900);
  });
});
