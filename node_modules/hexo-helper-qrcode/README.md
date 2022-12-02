# hexo-helper-qrcode
QRcode for Hexo helper plugins.

## install

```
$ npm i -S hexo-helper-qrcode
```

## useage

```html
<img src="<%- qrcode(url) %>">

<!-- white margin, default 0 -->
<img src="<%- qrcode(url, {
    margin: 2
}) %>">

<!-- size of one module in pixels, default 6 -->
<img src="<%- qrcode(url, {
    size: 4
}) %>">
```


## license

MIT
