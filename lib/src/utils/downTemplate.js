"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = void 0;
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const log_1 = require("./log");
/**
 * 下载模板
 * @param {*} url git下载地址
 * @param {*} name 项目名称
 * @returns
 */
const down = (url, name) => {
    // spiner.start();
    (0, log_1.markLog)("下载中");
    return new Promise((resolve, reject) => {
        (0, download_git_repo_1.default)('direct:' + url, name, { clone: true }, (err) => {
            if (err) {
                // spiner.fail();
                (0, log_1.errorLog)("下载失败");
                reject(err);
            }
            else {
                // spiner.succeed();
                (0, log_1.successLog)("下载完毕");
                resolve();
            }
        });
    });
};
exports.down = down;
//# sourceMappingURL=downTemplate.js.map