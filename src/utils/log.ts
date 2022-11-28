import chalk from "chalk";
import figlet from "figlet";

import { Callback } from "../types";

export const warnLog = (msg: string) => {
  console.log(chalk.yellow(msg));
};

export const errorLog = (msg: string) => {
  console.log(chalk.red(msg));
};

export const successLog = (msg: string) => {
  console.log(chalk.green(msg));
};

export const markLog = (msg: string) => {
  console.log(chalk.magenta(msg));
};

export const figletLog = (msg: string, callback: Callback) => {
  figlet(msg, (err, result) => {
    result && successLog(result);
    callback && callback();
  });
};
