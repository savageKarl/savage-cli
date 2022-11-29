import { errorLog } from "./log";

export const exit = (msg: string) => {
  errorLog(msg);
  process.exit(1);
};


