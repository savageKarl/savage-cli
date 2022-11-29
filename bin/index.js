#!/usr/bin/env node

const path = require("path");
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@": path.resolve(process.cwd(), "lib"),
  "@src": path.resolve(process.cwd(), "lib/src"),
});

require("../lib/src/index.js");
