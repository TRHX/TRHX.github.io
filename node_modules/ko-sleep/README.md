# ko-sleep

[![Build Status](https://travis-ci.org/alsotang/ko-sleep.svg)](https://travis-ci.org/alsotang/ko-sleep)

A promise wrapper for `setTimeout`

## usage

```js
sleep(time: number | string): Promise<void>
```

time - millisecond number, or '1s' which https://www.npmjs.com/package/ms support

## example

```js
import sleep from 'ko-sleep'

await sleep(3 * 1000)
await sleep('3s')
```

## license

MIT