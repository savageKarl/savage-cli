"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const templates_1 = __importDefault(require("@/src/config/template/templates"));
const log_1 = require("@/src/utils/log");
function setupListCommand(pm) {
    pm.command("list")
        .description("查看当前所有模板")
        .action(function () {
        list();
    });
}
exports.default = setupListCommand;
function list() {
    throw new Error('error!!!');
    const tmp = Object.assign({}, templates_1.default);
    Object.entries(tmp).forEach(([key, value]) => {
        (0, log_1.markLog)(key + ": " + value);
    });
}
//# sourceMappingURL=list.command.js.map