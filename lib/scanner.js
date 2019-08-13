const url = require('url');
const request = require('follow-redirects');
const parser = require('./parser');

module.exports = function(domain, callback = () => {}) {
  return new Promise((resolve, reject) => {
    domain = url.parse(domain);
    if (!domain.protocol) {
      domain.protocol = 'http:';
      domain.href = `http://${domain.href}`;
    }

    const method = domain.protocol === 'https:' ? 'https' : 'http'
    const robotsUrl = url.resolve(domain.href, 'robots.txt');

    request[method].get(robotsUrl, (res) => {
      if (res.statusCode !== 200) {
        res.destroy(new Error(res.statusMessage));
        return;
      }

      res.setEncoding('utf8');

      let body = '';
      res.on('data', function(d) {
        body += d;
      });
      res.on('end', () => {
        const parsed = parser(body);
        callback(null, parsed);
        resolve(parsed)
      });
    }).on('error', err => {
      callback(err)
      reject(err)
    });
  })
  .catch(error => {
    callback(error);
  })
};
