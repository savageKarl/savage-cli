"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = void 0;
const log_1 = require("./log");
const exit = (msg) => {
    (0, log_1.errorLog)(msg);
    process.exit(1);
};
exports.exit = exit;
module.exports = exports.exit;
//# sourceMappingURL=exit.js.map