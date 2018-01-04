'use strict';

// Script dependencies
const url = require('url');
const request = require('request');

// Core scripts
const parser = require('./parser');

// Default http request options
const requestOptions = {
  followAllRedirects: false
};

module.exports = (domain, options = {}, callback = () => {}) => {
  // Parse the domain
  domain = url.parse(domain);

  // Set default protocol if missing
  if (!domain.protocol) {
    domain.href = `http://${domain.href}`;
  }

  // Build robots url
  const robotsUrl = url.resolve(domain.href, 'robots.txt');

  // Get the options
  const opts = Object.assign({
    url: robotsUrl
  }, requestOptions, options.requestOptions || {});

  // Get the remote robots file and
  request(opts, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return callback(new Error('The site robots file was not found.'));
    }
    callback(null, parser(body));
  });
};
