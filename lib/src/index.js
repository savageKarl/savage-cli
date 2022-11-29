"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("@/package.json"));
const pm = new commander_1.Command("savage");
pm.name("savage").usage("[options] [command]");
pm.version(package_json_1.default.version);
pm.command("init")
    .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
    .description("选择模板来进行项目的初始化")
    .action(function () { });
pm.command("upgrade")
    .option("-f, --force", "强制升级项目，会覆盖掉原有项目中的构建相关文件")
    .description("根据最新模板对已有项目进行升级")
    .action(function () { });
pm.command("list")
    .description("查看当前所有模板")
    .action(function () { });
pm.parse(process.argv);
//# sourceMappingURL=index.js.map