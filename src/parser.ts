const patterns = {
  agents: /^([Uu]ser-agent:) (.+)$/,
  allow: /^([Aa]llow:) (\/.+)$/,
  disallow: /^([Dd]isallow:) (\/.+)$/,
  host: /^([Hh]ost:) (.+)$/,
  sitemaps: /^([Ss]itemap:) (.+)$/,
};

export interface ParserResult {
  agents: {
    [key: string]: {
      allow: string[],
      disallow: string[],
    },
  };
  allow: string[];
  disallow: string[];
  sitemaps: string[];
  host: string;
}

export function parser(body: string) {
  const results: ParserResult = {
    agents: {},
    allow: [],
    disallow: [],
    host: "",
    sitemaps: [],
  };

  // Extract lines from body response
  const lines = body.match(/[^\r\n]+/g);

  // Default agent
  let lastAgent = "all";

  // Loop through lines and check for patterns
  lines.forEach((line) => {
    line = line.trim();

    // Check for agent rules
    if (patterns.agents.test(line)) {
      const matches = line.match(patterns.agents);
      lastAgent = matches[2] === "*" ? "all" : matches[2];
      results.agents[lastAgent] = {
        allow: [],
        disallow: [],
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

      results.agents[lastAgent].allow.push(matches[2]);

      // Add element to the global array if not already in
      if (!results.allow.includes(matches[2])) {
        results.allow.push(matches[2]);
      }
    }

    // Check for disallow rules
    if (patterns.disallow.test(line)) {
      const matches = line.match(patterns.disallow);

      results.agents[lastAgent].disallow.push(matches[2]);

      // Add element to the global array if not already in
      if (!results.disallow.includes(matches[2])) {
        results.disallow.push(matches[2]);
      }
    }

    // Check for sitemap rules
    if (patterns.sitemaps.test(line)) {
      const matches = line.match(patterns.sitemaps);
      results.sitemaps.push(matches[2]);
    }
  });

  return results;
}
