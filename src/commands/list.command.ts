import type { Command } from "commander";

import templatesJson from "@/src/config/template/templates";

import { markLog } from "@/src/utils/log";

export default function setupListCommand(pm: Command) {
  pm.command("list")
    .description("查看当前所有模板")
    .action(function () {
      list();
    });
}

function list() {
  const tmp = {
    ...templatesJson,
  };
  Object.entries(tmp).forEach(([key, value]) => {
    markLog(key + ": " + value);
  });
}
