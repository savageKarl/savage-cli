import { Command } from "commander";

import pkg from "@/package.json";
import { list } from "@src/actions/ls";
import { init } from "@src/actions/init";
import { upgrade } from "@src/actions/upgrade";
const pm = new Command("savage");


pm.name("savage").usage("[options] [command]");

pm.version(pkg.version);

pm.command("init")
  .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
  .description("选择模板来进行项目的初始化")
  .action(function () {});

pm.command("upgrade")
  .option("-f, --force", "强制升级项目，会覆盖掉原有项目中的构建相关文件")
  .description("根据最新模板对已有项目进行升级")
  .action(function () {});

pm.command("list")
  .description("查看当前所有模板")
  .action(function () {
    list();
  });

pm.parse(process.argv);
