"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("@/package.json"));
const index_1 = require("@/src/commands/index");
const pm = new commander_1.Command("savage");
pm.name("savage").usage("[options] [command]");
pm.version(package_json_1.default.version);
(0, index_1.setupCommands)(pm);
pm.parse(process.argv);
//# sourceMappingURL=index.js.map