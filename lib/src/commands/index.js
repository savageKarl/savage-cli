"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function setupCommands(pm) {
    // setupListCommand(pm)
    // 自动加载每个命令，不用每次手动去加载
    fs_1.default.readdirSync(__dirname).forEach((file) => {
        if (file !== "index.js" && path_1.default.extname(file) !== ".map") {
            const res = require("./" + file);
            res.default(pm);
        }
    });
}
exports.setupCommands = setupCommands;
//# sourceMappingURL=index.js.map