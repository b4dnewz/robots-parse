# robots-parse

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> A lightweight and simple robots.txt parser in node.

[![NPM](https://nodei.co/npm/robots-parse.png)](https://nodei.co/npm/robots-parse/)

## Installation

```
npm install --save robots-parse
```

## Usage

You can use the module to scan a **domain** for robots file like in the example below:

```js
const robotsParse = require('robots-parse');

robotsParse('github.com', (err, res) => {
  console.log('Result:', res);
});
```

You can also use it with __promises__ if the callback is not specified:

```js
const robotsParse = require('robots-parse');

(async () => {
  const res = await robotsParse('github.com');
  console.log('Result:', res);
})().catch(console.log)
```

Or you can use the built-in parser to parse an existing robots.txt file, for example a **local file** or a **string**. The parser works __in sync__ so you don't have to use callback or promises.

```js
const {parser} = require('robots-parse');

request('google.com/robots.txt', (err, res, body) => {
  const object = parser(body);
  console.log(object);
});
```

Parsing an existing local robots.txt file:

```js
const {parser} = require('robots-parse');
const content = fs.readFileSync('./robots.txt', 'utf-8');
const object = parser(content);

console.log(object);
```

## How it works?

By default the script will get and parse the `robots.txt` file for a given website or domain and it will search for various rules:

-   **Agents**: A user-agent identifies a specific spider. The user-agent field is matched against that specific spider’s (usually longer) user-agent.
-   **Host**: Supported by Yandex (and not by Google even though some posts say it does), this directive lets you decide whether you want the search engine to show.
-   **Allow**: The allow directive specifies paths that may be accessed by the designated crawlers. When no path is specified, the directive is ignored.
-   **Disallow**: The disallow directive specifies paths that must not be accessed by the designated crawlers. When no path is specified, the directive is ignored.
-   **Sitemap**: An absolute url that points to a Sitemap, Sitemap Index file or equivalent URL.

It returns, _if the robots files were successfully retrieved and parsed_, an object containing the properties mentioned above, inside every agent found you will find agent-specific **allow** and **disallow** rules, which also will be stored in **allow** and **disallow**  root properties containing all of them indistinctly.

You can read more about the specifications of the robots file on it's [Google Reference Page](https://developers.google.com/search/reference/robots_txt).

---

## Contributing

1.  Create an issue and describe your idea
2.  Fork the project (<https://github.com/b4dnewz/robots-parse/fork>)
3.  Create your feature branch (`git checkout -b my-new-feature`)
4.  Commit your changes (`git commit -am 'Add some feature'`)
5.  Write tests for your code (`npm run test`)
6.  Publish the branch (`git push origin my-new-feature`)
7.  Create a new Pull Request

## License

Apache-2.0 © [b4dnewz](https://b4dnewz.github.io/)

[npm-image]: https://badge.fury.io/js/robots-parse.svg

[npm-url]: https://npmjs.org/package/robots-parse

[travis-image]: https://travis-ci.org/b4dnewz/robots-parse.svg?branch=master

[travis-url]: https://travis-ci.org/b4dnewz/robots-parse

[daviddm-image]: https://david-dm.org/b4dnewz/robots-parse.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/b4dnewz/robots-parse

[coveralls-image]: https://coveralls.io/repos/b4dnewz/robots-parse/badge.svg

[coveralls-url]: https://coveralls.io/r/b4dnewz/robots-parse
