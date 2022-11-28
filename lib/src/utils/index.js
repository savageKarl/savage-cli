"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitTogitdown = exports.errorConsole = exports.successConsole = exports.wirteSync = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
/**
 * 当前cli所在路径
 */
// const cliPath = path.resolve(".")
/**
 *
 * @param {*} filepath file路径,需要带/,默认拼接cli所在路径cliPath
 * @param {*} object 需要写入的对象
 */
function wirteSync(filepath, jsonObject) {
    fs_extra_1.default.writeFileSync(filepath, JSON.stringify(jsonObject, null, '\t'));
}
exports.wirteSync = wirteSync;
/**
 *
 * @param {*} message 成功打印
 */
function successConsole(message) {
    console.log(chalk_1.default.green(message));
}
exports.successConsole = successConsole;
/**
 *
 * @param {*} message 错误打印
 */
function errorConsole(message) {
    console.log(log_symbols_1.default.error, chalk_1.default.red(message));
}
exports.errorConsole = errorConsole;
/**
 *
 * @param {*} url git地址转成可下载地址
 */
function gitTogitdown(url) {
    // 最后的地址格式
    // 域名:所有者/项目名称#分支
    // 例如https://gitea.51trust.com:front/vueDemo#master
    // "vue":"https://gitea.51trust.com:front/vueDemo#master",
    // "vue2":"https://gitea.51trust.com/front/vueDemo.git"
    // let tmpUrl = _.replace(url, ".git", "#master")
    // let tmpArray = _.split(tmpUrl, '/');
    // let result = tmpArray[0] + "//" + tmpArray[2] + ":" + tmpArray[3] + "/" + tmpArray[4]
    return url;
}
exports.gitTogitdown = gitTogitdown;
//# sourceMappingURL=index.js.map