#!/usr/bin/env node

const path = require("path");
// 开启 sourcemap转换，可以定位ts文件，便于查看排查
require("source-map-support").install();

const moduleAlias = require("module-alias");

// 定义路径别名
moduleAlias.addAliases({
  "@": path.resolve(__dirname, "../lib"),
});

require("@/src/index.js");
