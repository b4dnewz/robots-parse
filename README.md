# robots-parse 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A lightweight and simple robots.txt parser in node.

## Installation

```sh
$ npm install --save robots-parse
```

## Usage

```js
const robotsParse = require('robots-parse');

robotsParse('github.com', options, (err, result) => {
  console.log('Result:', result);
});

```
## License

Apache-2.0 © [b4dnewz]()


[npm-image]: https://badge.fury.io/js/robots-parse.svg
[npm-url]: https://npmjs.org/package/robots-parse
[travis-image]: https://travis-ci.org/b4dnewz/robots-parse.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/robots-parse
[daviddm-image]: https://david-dm.org/b4dnewz/robots-parse.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/robots-parse
[coveralls-image]: https://coveralls.io/repos/b4dnewz/robots-parse/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/robots-parse
