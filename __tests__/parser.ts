import {parser} from "../src/index";

describe("Parser", () => {
  it("export is a function", () => {
    expect(typeof parser).toBe("function");
  });

  it("parse and group allow definitions", () => {
    const result = parser(`
      User-agent: *
      Allow: /humans.txt

      User-agent: duckduckbot
      Allow: /legal/terms
      Allow: /safetycheck/
    `);
    expect(result.allow).toEqual([
      "/humans.txt",
      "/legal/terms",
      "/safetycheck/",
    ]);
  });

  it("parse and group disallow definitions", () => {
    const result = parser(`
      User-agent: Googlebot
      Disallow: /archive/
      Disallow: /search

      User-agent: msnbot
      Disallow: /downloads/
    `);
    expect(result.disallow).toEqual([
      "/archive/",
      "/search",
      "/downloads/",
    ]);
  });

  it("extracts agents definitions", () => {
    const result = parser(`
      User-agent: Bingbot
      Allow: /safetycheck/
      Disallow: /archive/

      User-agent: Twitterbot
      Allow: /legal/terms
      Allow: /safetycheck/
      Disallow: /archive/
      Disallow: /search
    `);
    expect(result.agents).toEqual({
      Bingbot: {
        allow: ["/safetycheck/"],
        disallow: ["/archive/"],
      },
      Twitterbot: {
        allow: ["/legal/terms", "/safetycheck/"],
        disallow: ["/archive/", "/search"],
      },
    });
  });

  it("extracts sitemaps definitions", () => {
    const result = parser(`
      Sitemap: http://www.domain.com/sitemap-products.xml
      Sitemap: http://www.domain.com/sitemap-categories.xml
      Sitemap: http://www.domain.com/sitemap-blogposts.xml
    `);
    expect(result.sitemaps).toEqual([
      "http://www.domain.com/sitemap-products.xml",
      "http://www.domain.com/sitemap-categories.xml",
      "http://www.domain.com/sitemap-blogposts.xml",
    ]);
  });

  it("extracts host definitions", () => {
    const result = parser(`
      host: example.com
    `);
    expect(result.host).toEqual("example.com");
  });
});
