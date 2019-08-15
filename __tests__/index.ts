import {default as createServer, ExpressTestServer} from "@b4dnewz/express-test-server";
import nock from "nock";

import robotsParse from "../src/index";

describe("robotsParse test suite", () => {
  let server: ExpressTestServer;

  beforeAll(async () => {
    server = await createServer({
      certificate: true,
    });
    server.get("/robots.txt", () => `
      User-agent: *
      Disallow: /
    `);
  });

  afterAll(async () => {
    await server.close();
  });

  it("exports by default a function", () => {
    expect(typeof robotsParse).toBe("function");
  });

  it("support callbacks", (done) => {
    robotsParse(server.url, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      expect(typeof res).toEqual("object");
      done();
    });
  });

  it("support promises", async () => {
    const res = await robotsParse(server.url);
    expect(res).toBeDefined();
    expect(typeof res).toEqual("object");
  });

  it("support https protocol", async () => {
    const res = await robotsParse(server.sslUrl);
    expect(res).toBeDefined();
    expect(typeof res).toEqual("object");
  });

  it("rejects when request fails", async () => {
    const serv = await createServer();
    serv.get("/robots.txt", (req, res) => {
      res.status(404).send("Not found");
    });
    await expect(robotsParse(serv.url)).rejects.toMatchObject({
      message: "Not Found",
    });
    serv.close();
  });

  it("add the protocol if missing", async () => {
    nock("http://example.com")
      .get("/robots.txt")
      .reply(200);

    await expect(robotsParse("example.com")).resolves.toBeDefined();
  });
});
