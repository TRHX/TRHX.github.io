/* global hexo */

'use strict';

hexo.extend.renderer.register('less', 'css', require('./lib/renderer'));
