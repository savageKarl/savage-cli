import fs from "fs";
import path from "path";

import type { Command } from "commander";
import setupListCommand from './list.command'

export function setupCommands(pm: Command) {
  // setupListCommand(pm)
  // 自动加载每个命令，不用每次手动去加载
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js" && path.extname(file) !== ".map") {
      const res = require("./" + file);
      res.default(pm);
    }
  });
}
