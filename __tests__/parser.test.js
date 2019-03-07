const fs = require('fs');
const path = require('path');
const assert = require('assert');
const parser = require('../lib/parser');

const testFile = fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf-8');

describe('Parser Test Suite:', () => {
  it('exports by default a function', () => {
    assert.equal(typeof parser, 'function', 'it should export a function');
  });

  const result = parser(testFile);

  it('extracts allow definitions', () => {
    expect(result).toHaveProperty('allow');
    expect(Array.isArray(result.allow)).toBe(true);
    expect(result.allow).not.toHaveLength(0);
  });

  it('extracts disallow definitions', () => {
    expect(result).toHaveProperty('disallow');
    expect(Array.isArray(result.disallow)).toBe(true);
    expect(result.disallow).not.toHaveLength(0);
  });

  it('extracts agents definitions', () => {
    expect(result).toHaveProperty('agents');
    expect(typeof result.agents).toBe('object');
    expect(result.agents).not.toBe({});
    expect(result.agents.duckduckbot).toBeDefined();
  });

  it('extracts sitemaps definitions', () => {
    expect(result).toHaveProperty('sitemaps');
    expect(Array.isArray(result.sitemaps)).toBe(true);
    expect(result.sitemaps).not.toHaveLength(0);
  });

  it('extracts host definitions', () => {
    expect(result).toHaveProperty('host');
    expect(typeof result.host).toBe('string');
    expect(result.host).toBe('example.com');
  });
});
