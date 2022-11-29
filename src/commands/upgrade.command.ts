import { Command } from "commander";

export default function upgrade(pm: Command) {
  pm.command("upgrade")
    .option("-f, --force", "强制升级项目，会覆盖掉原有项目中的构建相关文件")
    .description("根据最新模板对已有项目进行升级")
    .action(function () {});
}
