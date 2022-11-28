"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.figletLog = exports.markLog = exports.successLog = exports.errorLog = exports.warnLog = void 0;
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const warnLog = (msg) => {
    console.log(chalk_1.default.yellow(msg));
};
exports.warnLog = warnLog;
const errorLog = (msg) => {
    console.log(chalk_1.default.red(msg));
};
exports.errorLog = errorLog;
const successLog = (msg) => {
    console.log(chalk_1.default.green(msg));
};
exports.successLog = successLog;
const markLog = (msg) => {
    console.log(chalk_1.default.magenta(msg));
};
exports.markLog = markLog;
const figletLog = (msg, callback) => {
    (0, figlet_1.default)(msg, (err, result) => {
        result && (0, exports.successLog)(result);
        callback && callback();
    });
};
exports.figletLog = figletLog;
//# sourceMappingURL=log.js.map