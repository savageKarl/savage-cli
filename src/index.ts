import { Command } from "commander";

import pkg from "@/package.json";
import { setupCommands } from "@/src/commands/index";


const pm = new Command("savage");
pm.name("savage").usage("[options] [command]");
pm.version(pkg.version);

setupCommands(pm);



pm.parse(process.argv);
