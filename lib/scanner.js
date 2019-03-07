const url = require('url');
const http = require('follow-redirects').http;

// Core scripts
const parser = require('./parser');

// Export the main function
module.exports = function(domain, callback = () => {}) {
  return new Promise((resolve, reject) => {
    domain = url.parse(domain);
    if (!domain.protocol) {
      domain.href = `http://${domain.href}`;
    }

    // Build robots url
    const robotsUrl = url.resolve(domain.href, 'robots.txt');

    // Get the remote robots file and
    http.get(robotsUrl, (res) => {
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
};
