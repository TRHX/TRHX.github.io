"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ms_1 = __importDefault(require("ms"));
/**
 * @param time - millisecond number, or '1s' which https://www.npmjs.com/package/ms support
 */
function sleep(time) {
    let numTime;
    if (typeof time === 'string') {
        numTime = (0, ms_1.default)(time);
    }
    else {
        numTime = time;
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, numTime);
    });
}
module.exports = sleep;
//# sourceMappingURL=sleep.js.map