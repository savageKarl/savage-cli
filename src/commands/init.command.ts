import type { Command } from "commander";

import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import os from "os";
import tempaltes from "@/src/config/template/templates";
import { successLog, markLog, figletLog, errorLog } from "@/src/utils/log";
import { down } from "@/src/utils/downTemplate";
import { exit } from "@/src/utils/exit";

export default function setupInitCommand(pm: Command) {
  pm.command("init <project-name>")
    // .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
    .requiredOption("--template <template>", "选择一个项目模板")
    .description("选择模板来进行项目的初始化")
    .action(function (name, options) {
      console.log(name, options);
      init({ name, ...options });
    });
}

type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

const promptList = [
  {
    type: "input",
    name: "author",
    message: "作者：",
    default: "",
  },
  {
    type: "input",
    name: "mail",
    message: "邮箱:",
    default: "",
  },
  {
    type: "input",
    name: "description",
    message: "描述：",
    default: "",
  },
  {
    type: "input",
    name: "gitrepo",
    message: "git地址：",
    default: "",
  },
];

let ac = ["shit", "u"] as const;
type A = TupleToObject<typeof ac>;

function init(config: { name: string; force?: boolean; template: string }) {
  const cwd = process.cwd();
  const target = path.resolve(cwd, config.name || ".");
  // 获取可选模板
  const templates = { ...tempaltes };
  const templateUrl = templates[config.template as keyof typeof templates];

  // 交互添加模板
  if (fs.existsSync(target)) exit("当前路径下已存在该文件夹");

  if (!templateUrl) exit("请输入正确的模板名字");

  // c创建交互
  inquirer.prompt(promptList).then(async (answers) => {
    try {
      shell.exec(`git clone ${templateUrl} ${config.name}`);
      afterDown(config.name, answers);
    } catch (error: any) {
      exit(error.message);
    }
    // 替换
  });
}

const afterDown = (name: string, answers: any) => {
  writePackageJson(name, answers);
  // 2.移除.git并添加新的上传
  successLog("初始化git");
  gitInit(name, answers.gitrepo);
  success(name);
};

const gitInit = (name: string, gitrepo: string) => {
  shell.cd(name);
  // 判断是否安装了git
  if (!shell.which("git")) {
    shell.echo("请检查本机是否安装git环境");
    shell.exit(1);
  } else {
    shell.exec("git init");
    shell.exec("git add .");
    shell.exec('git commit -m "init"');
    if (gitrepo !== "") {
      shell.exec("git remote add origin " + gitrepo);
      shell.exec("git push --set-upstream origin master");
    }
  }
};

const writePackageJson = (name: string, answers: any) => {
  const { description, author } = answers;
  const cwd = process.cwd();
  const packagePath = path.resolve(cwd, name, "./package.json");
  // 读取内容并覆盖
  const tmpJson = fs.readFileSync(packagePath) as any;
  const packageJson = JSON.parse(tmpJson);
  const result = {
    ...packageJson,
    name,
    description,
    author,
  };
  fs.writeFileSync(packagePath, JSON.stringify(result, null, "\t"));
};

const success = (name: string) => {
  successLog("success");
  markLog(`${name} 创建成功`);
  successLog("执行下面命令启动项目");
  markLog(`cd ${name} & npm install`);
};
