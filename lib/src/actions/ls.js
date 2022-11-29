"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const templates_1 = __importDefault(require("@/src/config/template/templates"));
const log_1 = require("@src/utils/log");
function list() {
    const tmp = Object.assign({}, templates_1.default);
    Object.entries(tmp).forEach(([key, value]) => {
        (0, log_1.markLog)(key + ": " + value);
    });
}
exports.list = list;
//# sourceMappingURL=ls.js.map