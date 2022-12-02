/**
 * @param time - millisecond number, or '1s' which https://www.npmjs.com/package/ms support
 */
declare function sleep(time: number | string): Promise<void>;
export = sleep;
