const assert = require('assert');
const robotsParse = require('../index.js');

describe('robotsParse test suite', () => {
  it('exports by default a function', () => {
    assert.equal(typeof robotsParse, 'function', 'it should export a function');
  });
});
