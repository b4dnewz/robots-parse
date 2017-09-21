'use strict';

// Script dependencies
const url = require('url');
const request = require('request');

// Patterns to check
const patterns = {
  agents: /(User-agent:) (.+)/,
  allow: /(Allow:) (\/.+)/,
  disallow: /(Disallow:) (\/.+)/,
  sitemaps: /(sitemap:) (.+)/,
  hosts: /(host:) (.+)/
};

// Default request options
const requestOptions = {
  followAllRedirects: false
};

// Check if value is already in array
const isAlreadyIn = (needle, haystack) => {
  return haystack.indexOf(needle) > -1;
};

const parser = (domain, options = {}, callback) => {
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

  // The result object
  const results = {
    agents: {},
    allow: [],
    disallow: [],
    sitemaps: [],
    hosts: []
  };

  // Get robot file
  request(opts, (err, response, body) => {
    // Exit on error
    if (err || response.statusCode !== 200) {
      console.log('Error:', err);
      return;
    }

    // Extract lines from body response
    const lines = body.match(/[^\r\n]+/g);

    // Default agent
    let lastAgent = 'all';

    // Loop through lines and check for patterns
    lines.forEach(line => {
      // Check for agent line
      if (patterns.agents.test(line)) {
        const matches = line.match(patterns.agents);
        lastAgent = matches[2] === '*' ? 'all' : matches[2];
        results.agents[lastAgent] = {};
      }

      // Check for allow rule line
      if (patterns.allow.test(line)) {
        const matches = line.match(patterns.allow);

        // If is not an array init it
        if (!results.agents[lastAgent].allow) {
          results.agents[lastAgent].allow = [];
        }

        // Add element if not already in
        if (!isAlreadyIn(matches[2], results.agents[lastAgent].allow)) {
          results.agents[lastAgent].allow.push(matches[2]);
        }

        // Add element if not already in
        if (!isAlreadyIn(matches[2], results.allow)) {
          results.allow.push(matches[2]);
        }
      }

      // Check for disallow rule lines
      if (patterns.disallow.test(line)) {
        const matches = line.match(patterns.disallow);

        // If is not an array init it
        if (!results.agents[lastAgent].disallow) {
          results.agents[lastAgent].disallow = [];
        }

        // Add element if not already in
        if (!isAlreadyIn(matches[2], results.agents[lastAgent].disallow)) {
          results.agents[lastAgent].disallow.push(matches[2]);
        }

        // Add element if not already in
        if (!isAlreadyIn(matches[2], results.disallow)) {
          results.disallow.push(matches[2]);
        }
      }
    });

    console.log('Final results:', results);
    // Optionally run the callback
    if (typeof callback === 'function') {
      callback(null, results);
    }
  });
};

module.exports = parser;
