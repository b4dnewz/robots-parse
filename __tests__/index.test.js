const robotsParse = require('../lib/index');

describe('robotsParse test suite', () => {
  it('exports by default a function', () => {
    expect(typeof robotsParse).toBe('function');
  });

  it('get and parse a remote robots file', (done) => {
    robotsParse('www.w3.org', (err, results) => {
      expect(err).toBeNull();
      expect(typeof results).toEqual('object');
      done()
    });
  });

  it('return promise if callback not specified', (done) => {
    robotsParse('www.w3.org')
      .then(res => {
        expect(typeof res).toEqual('object');
        done()
      })
      .catch(done);
  });
});