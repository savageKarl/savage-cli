import templatesJson from "@/src/config/template/templates";

import { markLog } from "@src/utils/log";

export function list() {
  const tmp = {
    ...templatesJson,
  };
  Object.entries(tmp).forEach(([key, value]) => {
    markLog(key + ": " + value);
  });
}
