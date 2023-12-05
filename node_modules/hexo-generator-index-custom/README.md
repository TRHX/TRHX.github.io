# hexo-generator-index-custom

![npm](https://img.shields.io/npm/v/hexo-generator-index-custom)

[中文文档](./README_zh.md)

Custom Index generator for [Hexo].

It generates an archive of posts on your homepage, according to the `index` or `archive` layout of your theme.

## Difference

- pin top

both the `sticky` and `top` parameters in the post Front-matter can be used to pin the post to the top of the index page.

> because of in the old version, hexo-generator-index cannot pin the post to the top of the index page
>
> many people use [hexo-generator-index-pin-top](https://github.com/Qyh-Q/hexo-generator-index-pin-top) to do this

- hide posts

use `hide: true` in in the post Front-matter to hide the post from the index page


## Installation

``` bash
$ npm uninstall hexo-generator-index

$ npm install hexo-generator-index-custom --save
```

## Options

Add or modify the following section to your root _config.yml file

``` yaml
index_generator:
  path: ''
  per_page: 10
  order_by: -date
  pagination_dir: page
```

- **path**: Root path for your blog's index page. 
  - default: ""
- **per_page**: Posts displayed per page.
  - default: [`config.per_page`](https://hexo.io/docs/configuration.html#Pagination) as specified in the official Hexo docs (if present), otherwise `10`
  - `0` disables pagination
- **order_by**: Posts order. 
  - default: date descending
- **pagination_dir**: URL format.
  - default: 'page'
  - `awesome-page` makes the URL ends with 'awesome-page/<page number>' for second page and beyond.

## Usage

The `sticky` or `top` parameter in the post [Front-matter](https://hexo.io/docs/front-matter) will be used to pin the post to the top of the index page. Higher `sticky` (or `top`) means that it will be ranked first.

You can also use `sticky: true` or `top: true` to pin the post to the top of the index page.

```yml
---
title: Hello World
date: 2013/7/13 20:46:25
sticky: 100
---
```

```yml
---
title: Hello World
date: 2013/7/13 20:46:25
top: 100
---
```

The `hide` parameter in the post Front-matter will be used to hide the post from the index page.

```yml
---
title: Hello World
date: 2013/7/13 20:46:25
hide: true
---
```

## Note

If your theme define a non-archive `index` layout (e.g. About Me page), this plugin would follow that layout instead and not generate an archive. In that case, use [hexo-generator-archive](https://github.com/hexojs/hexo-generator-archive) to generate an archive according to the `archive` layout.

## License

MIT

[hexojs/Hexo](https://github.com/hexojs/hexo)

[hexojs/hexo-generator-index](https://github.com/hexojs/hexo-generator-index)

[Hexo]: http://hexo.io/
