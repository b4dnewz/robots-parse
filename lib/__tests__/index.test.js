const assert = require('assert');
const robotsParse = require('../index');

describe('robotsParse test suite', () => {
  it('exports by default a function', () => {
    assert.equal(typeof robotsParse, 'function', 'it should export a function');
  });

  it('get and parse a remote robots file', () => {
    robotsParse('www.w3.org', {}, (err, results) => {
      expect(err).toBeNull();
      expect(typeof results).toEqual('object');
    });
  });
});
