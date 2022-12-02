# markdown-it-cjk-breaks

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-cjk-breaks/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-cjk-breaks)
[![NPM version](https://img.shields.io/npm/v/markdown-it-cjk-breaks.svg?style=flat)](https://www.npmjs.org/package/markdown-it-cjk-breaks)
[![Coverage Status](https://coveralls.io/repos/markdown-it/markdown-it-cjk-breaks/badge.svg?branch=master&service=github)](https://coveralls.io/github/markdown-it/markdown-it-cjk-breaks?branch=master)

> Plugin for [markdown-it](https://github.com/markdown-it/markdown-it) that suppresses linebreaks between east asian characters.

Normally newlines in a markdown text get rendered as newlines in output html text. Then browsers will usually render those newlines as whitespace (more smart behavior is included in w3c drafts, but not actually implemented by vendors).

This plugin finds and removes newlines that cannot be converted to space, algorithm matches [CSS Text Module Level 3](https://www.w3.org/TR/css-text-3/#line-break-transform):

 - If the character immediately before or immediately after the segment break is the zero-width space character (U+200B), then the break is removed, leaving behind the zero-width space.
 - Otherwise, if the East Asian Width property [UAX11] of both the character before and after the segment break is F, W, or H (not A), and neither side is Hangul, then the segment break is removed.
 - Otherwise, the segment break is converted to a space (U+0020).

## Install

```bash
yarn add markdown-it-cjk-breaks
```


## Usage

```js
var md = require('markdown-it')();
var cjk_breaks = require('markdown-it-cjk-breaks');

md.use(cjk_breaks);

md.render(`
あおえ
うい
aoe
ui
`);

// returns:
//
//<p>あおえうい
//aoe
//ui</p>
```


## License

[MIT](https://github.com/markdown-it/markdown-it-cjk-breaks/blob/master/LICENSE)
