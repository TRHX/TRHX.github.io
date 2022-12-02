# [Less] renderer

[![Build Status](https://travis-ci.com/hexojs/hexo-renderer-less.svg?branch=master)](https://travis-ci.com/hexojs/hexo-renderer-less)
[![NPM version](https://badge.fury.io/js/hexo-renderer-less.svg)](https://www.npmjs.com/package/hexo-renderer-less)
[![Coverage Status](https://coveralls.io/repos/github/hexojs/hexo-renderer-less/badge.svg?branch=master)](https://coveralls.io/github/hexojs/hexo-renderer-less?branch=master)

Add support for [Less].

## Install

``` bash
$ npm install hexo-renderer-less --save
```

## Configure

In your theme configuration,

```yaml
# themes/yourtheme/_config.yml
less:
  paths: []
  options:
```

- **paths**: Array of [include paths](http://lesscss.org/usage/#less-options-include-paths).
  * e.g. to include Bower Bootstrap, `['bower_components/bootstrap/less']`
  * globbing is also supported, `['bower_components/bootstrap/**']`
- **options**: Less.js [options](http://lesscss.org/usage/#less-options).
  * Example:
  ``` yml
  less:
    options:
      globalVars:
        var1: 'some value'
  ```

[Less]: http://lesscss.org/
