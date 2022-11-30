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
const templates_1 = __importDefault(require("@/src/config/template/templates"));
const log_1 = require("@/src/utils/log");
const exit_1 = require("@/src/utils/exit");
function setupInitCommand(pm) {
    pm.command("init <project-name>")
        // .option("-f, --force", "强制初始化项目，可能会覆盖掉目录中已存在的项目")
        .requiredOption("--template <template>", "选择一个项目模板")
        .description("选择模板来进行项目的初始化")
        .action(function (name, options) {
        console.log(name, options);
        init(Object.assign({ name }, options));
    });
}
exports.default = setupInitCommand;
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
function init(config) {
    const cwd = process.cwd();
    const target = path_1.default.resolve(cwd, config.name || ".");
    // 获取可选模板
    const templates = Object.assign({}, templates_1.default);
    const templateUrl = templates[config.template];
    // 交互添加模板
    if (fs_1.default.existsSync(target)) {
        (0, exit_1.exit)("当前路径下已存在该文件夹");
        if (!templateUrl)
            (0, exit_1.exit)("请输入正确的模板名字");
        // c创建交互
        inquirer_1.default.prompt(promptList).then((answers) => __awaiter(this, void 0, void 0, function* () {
            try {
                shelljs_1.default.exec(`git clone ${templateUrl} ${config.name}`);
                afterDown(config.name, answers);
            }
            catch (error) {
                (0, exit_1.exit)(error.message);
            }
        }));
    }
    const afterDown = (name, answers) => {
        writePackageJson(name, answers);
        // 2.移除.git并添加新的上传
        (0, log_1.successLog)("初始化git");
        gitInit(name, answers.gitrepo);
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
        const tmpJson = fs_1.default.readFileSync(packagePath);
        const packageJson = JSON.parse(tmpJson);
        const result = Object.assign(Object.assign({}, packageJson), { name,
            description,
            author });
        fs_1.default.writeFileSync(packagePath, JSON.stringify(result, null, "\t"));
    };
    const success = (name) => {
        (0, log_1.successLog)("success");
        (0, log_1.markLog)(`${name} 创建成功`);
        (0, log_1.successLog)("执行下面命令启动项目");
        (0, log_1.markLog)(`cd ${name} & npm install`);
    };
}
//# sourceMappingURL=init.command.js.map