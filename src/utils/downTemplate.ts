import download from "download-git-repo";

import { markLog, errorLog, successLog } from "./log";

import { spinner } from "./spinner";

import { Callback } from "../types";

/**
 * 下载模板
 * @param {*} url git下载地址
 * @param {*} name 项目名称
 * @returns
 */
export const down = (url: string, name: string) => {
  // spiner.start();
  markLog("下载中");
  return new Promise((resolve: Callback, reject: Callback) => {
    download(url, name, { clone: true }, (err: any) => {
      if (err) {
        // spiner.fail();
        errorLog("下载失败");
        reject(err);
      } else {
        // spiner.succeed();
        successLog("下载完毕");
        resolve();
      }
    });
  });
};

