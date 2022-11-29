import type { Command } from "commander";

import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import os from "os";
import tempaltes from "@/src/config/template/templates";
import { successLog, markLog } from "@/src/utils/log";
import { down } from "@/src/utils/downTemplate";
import { exit } from "@/src/utils/exit";

export default function init(pm: Command) {
  pm.command("init <project-name>")
    .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
    .description("选择模板来进行项目的初始化")
    .action(function (name, options) {
      create({ name, ...options });
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

function create(config: { name: string; force?: boolean }) {
  console.log(config);
  const cwd = process.cwd();
  const target = path.resolve(cwd, config.name || ".");
  // 获取可选模板
  const templates = { ...tempaltes };
  const keys = Object.keys(templates);

  // 交互添加模板
  const tmpSwitch = {
    type: "list",
    name: "template",
    message: "选择需要的模板编号",
    choices: keys,
    default: "",
  };
  promptList.unshift(tmpSwitch);
  if (fs.existsSync(target)) {
    exit("当前路径下已存在该文件夹");
  }

  // c创建交互
  inquirer.prompt(promptList).then(async (answers) => {
    const { template, description, author, gitrepo } = answers;
    const templateUrl = templates[template as keyof typeof templates];
    try {
      // 拉取模板
      await down(templateUrl, config.name);
      // afterDown(config.name, answers);
    } catch (error: any) {
      exit(error.message);
    }
    // 替换
  });
}

const afterDown = (name: string, answers: any) => {
  // 1.重写packageJson
  writePackageJson(name, answers);
  // 1.1.重写nginx配置
  // writeNginxConfig(name);
  // 2.移除.git并添加新的上传
  successLog("初始化git");
  gitInit(name, answers.gitrepo);
  // 3.执行npm install,这一步时间太长了，抛出去让用户做吧
  // console.log('npm install 中，请耐心等待');
  //npmInstall();
  // 4.成功提示
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
  let tmpJson = fs.readFileSync(packagePath) as any;
  let packageJson = JSON.parse(tmpJson);
  let result = {
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
  markLog(`cd ${name}`);
  markLog("npm install");
  markLog("npm run serve");
  if (os.type() == "Windows_NT") {
    //windows
    markLog("请在git bash 中执行 npm run lf");
  }
};
