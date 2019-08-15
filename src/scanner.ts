import request from "follow-redirects";
import url from "url";
import {parser, ParserResult} from "./parser";

type CallbackFunction = (err: Error, res?: ParserResult) => void;

export function scanner(domain: string, callback: CallbackFunction = () => {}): Promise<ParserResult> {
  return new Promise((resolve, reject) => {
    const parsedDomain = url.parse(domain);
    if (!parsedDomain.protocol) {
      parsedDomain.protocol = "http:";
      parsedDomain.href = `http://${parsedDomain.href}`;
    }

    const method = parsedDomain.protocol === "https:" ? "https" : "http";
    const robotsUrl = url.resolve(parsedDomain.href, "robots.txt");

    // Shut the compiler about incorrect method interface
    // @ts-ignore
    request[method].get(robotsUrl, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode !== 200) {
        res.destroy(new Error(res.statusMessage || "Request error"));
        return;
      }

      res.setEncoding("utf8");

      let body = "";
      res.on("data", (d) => {
        body += d;
      });

      res.on("end", () => {
        const parsed = parser(body);
        callback(null, parsed);
        resolve(parsed);
      });
    }).on("error", (err) => {
      callback(err);
      reject(err);
    });
  });
}
