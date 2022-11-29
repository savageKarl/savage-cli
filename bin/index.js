#!/usr/bin/env node

const path = require("path");
require("source-map-support").install();

const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@": path.resolve(__dirname, "../lib"),
});

require("@/src/index.js");
