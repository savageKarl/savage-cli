"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const shelljs_1 = __importDefault(require("shelljs"));
const os_1 = __importDefault(require("os"));
const templates_1 = __importDefault(require("@/src/config/template/templates"));
const log_1 = require("@/src/utils/log");
const downTemplate_1 = require("@/src/utils/downTemplate");
const exit_1 = require("@/src/utils/exit");
function init(pm) {
    pm.command("init <project-name>")
        .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
        .description("选择模板来进行项目的初始化")
        .action(function (name, options) {
        create(Object.assign({ name }, options));
    });
}
exports.default = init;
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
let ac = ["shit", "u"];
function create(config) {
    console.log(config);
    const cwd = process.cwd();
    const target = path_1.default.resolve(cwd, config.name || ".");
    // 获取可选模板
    const templates = Object.assign({}, templates_1.default);
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
    if (fs_1.default.existsSync(target)) {
        (0, exit_1.exit)("当前路径下已存在该文件夹");
    }
    // c创建交互
    inquirer_1.default.prompt(promptList).then((answers) => __awaiter(this, void 0, void 0, function* () {
        const { template, description, author, gitrepo } = answers;
        const templateUrl = templates[template];
        try {
            // 拉取模板
            yield (0, downTemplate_1.down)(templateUrl, config.name);
            afterDown(config.name, answers);
        }
        catch (error) {
            (0, exit_1.exit)(error.message);
        }
        // 替换
    }));
}
const afterDown = (name, answers) => {
    // 1.重写packageJson
    writePackageJson(name, answers);
    // 1.1.重写nginx配置
    // writeNginxConfig(name);
    // 2.移除.git并添加新的上传
    (0, log_1.successLog)("初始化git");
    gitInit(name, answers.gitrepo);
    // 3.执行npm install,这一步时间太长了，抛出去让用户做吧
    // console.log('npm install 中，请耐心等待');
    //npmInstall();
    // 4.成功提示
    success(name);
};
const gitInit = (name, gitrepo) => {
    shelljs_1.default.cd(name);
    // 判断是否安装了git
    if (!shelljs_1.default.which("git")) {
        shelljs_1.default.echo("请检查本机是否安装git环境");
        shelljs_1.default.exit(1);
    }
    else {
        shelljs_1.default.exec("git init");
        shelljs_1.default.exec("git add .");
        shelljs_1.default.exec('git commit -m "init"');
        if (gitrepo !== "") {
            shelljs_1.default.exec("git remote add origin " + gitrepo);
            shelljs_1.default.exec("git push --set-upstream origin master");
        }
    }
};
const writePackageJson = (name, answers) => {
    const { description, author } = answers;
    const cwd = process.cwd();
    const packagePath = path_1.default.resolve(cwd, name, "./package.json");
    // 读取内容并覆盖
    let tmpJson = fs_1.default.readFileSync(packagePath);
    let packageJson = JSON.parse(tmpJson);
    let result = Object.assign(Object.assign({}, packageJson), { name,
        description,
        author });
    fs_1.default.writeFileSync(packagePath, JSON.stringify(result, null, "\t"));
};
const success = (name) => {
    (0, log_1.successLog)("success");
    (0, log_1.markLog)(`${name} 创建成功`);
    (0, log_1.successLog)("执行下面命令启动项目");
    (0, log_1.markLog)(`cd ${name}`);
    (0, log_1.markLog)("npm install");
    (0, log_1.markLog)("npm run serve");
    if (os_1.default.type() == "Windows_NT") {
        //windows
        (0, log_1.markLog)("请在git bash 中执行 npm run lf");
    }
};
//# sourceMappingURL=init.command.js.map