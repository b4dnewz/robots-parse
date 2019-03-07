const patterns = {
  agents: /([Uu]ser-agent:) (.+)/,
  allow: /([Aa]llow:) (\/.+)/,
  disallow: /([Dd]isallow:) (\/.+)/,
  sitemaps: /([Ss]itemap:) (.+)/,
  host: /([Hh]ost:) (.+)/
};

module.exports = body => {
  const results = {
    agents: {},
    allow: [],
    disallow: [],
    sitemaps: [],
    host: ''
  };

  // Extract lines from body response
  const lines = body.match(/[^\r\n]+/g);

  // Default agent
  let lastAgent = 'all';

  // Loop through lines and check for patterns
  lines.forEach(line => {
    // Check for agent rules
    if (patterns.agents.test(line)) {
      const matches = line.match(patterns.agents);
      lastAgent = matches[2] === '*' ? 'all' : matches[2];
      results.agents[lastAgent] = {
        allow: [],
        disallow: []
      };
    }

    // Check for host rule
    if (patterns.host.test(line)) {
      const matches = line.match(patterns.host);
      results.host = matches[2];
    }

    // Check for allow rules
    if (patterns.allow.test(line)) {
      const matches = line.match(patterns.allow);

      // Add element if not already in
      if (!results.agents[lastAgent].allow.includes(matches[2])) {
        results.agents[lastAgent].allow.push(matches[2]);
      }

      // Add element to the global array if not already in
      if (!results.allow.includes(matches[2])) {
        results.allow.push(matches[2]);
      }
    }

    // Check for disallow rules
    if (patterns.disallow.test(line)) {
      const matches = line.match(patterns.disallow);

      // Add element if not already in
      if (!results.agents[lastAgent].disallow.includes(matches[2])) {
        results.agents[lastAgent].disallow.push(matches[2]);
      }

      // Add element to the global array if not already in
      if (!results.disallow.includes(matches[2])) {
        results.disallow.push(matches[2]);
      }
    }

    // Check for sitemap rules
    if (patterns.sitemaps.test(line)) {
      const matches = line.match(patterns.sitemaps);
      // Add element to the global array if not already in
      if (!results.sitemaps.includes(matches[2])) {
        results.sitemaps.push(matches[2]);
      }
    }
  });

  return results;
};
