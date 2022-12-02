'use strict';

const less = require('less');
const { basename, dirname, join } = require('path');
const micromatch = require('micromatch');

async function lessFn(data) {
  const { route, theme } = this;

  theme.config.less = Object.assign({
    paths: [],
    options: {}
  }, theme.config.less);

  const config = theme.config.less;
  const { options, paths: pathsCfg } = config;
  const cwd = process.cwd();
  const routeList = route.list();
  const tmpPaths = typeof pathsCfg === 'string' ? [pathsCfg] : pathsCfg;

  const paths = tmpPaths.filter(path => !micromatch.scan(path).isGlob)
    .map(path => join(cwd, path)); // assuming paths are relative from the root of the project;
  const match = micromatch(routeList, config.paths).map(path => join(cwd, dirname(path)));
  paths.push(...match, dirname(data.path));

  const result = await less.render(data.text, {
    paths,
    filename: basename(data.path),
    ...options
  });

  return result.css;
}

lessFn.disableNunjucks = true;

module.exports = lessFn;
