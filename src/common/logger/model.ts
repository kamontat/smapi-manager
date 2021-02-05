import { DataOrigin } from "@common/communication";

import Global from "./global";
import { DEBUG, ERROR, INFO, Level, WARN } from "./level";
import { isAcceptedLevel } from "./utils";

class Logger {
  static Main(...namespaces: string[]): Logger {
    return new Logger(DataOrigin.MAIN, ...namespaces);
  }

  static Renderer(...namespaces: string[]): Logger {
    return new Logger(DataOrigin.RENDERER, ...namespaces);
  }

  static Preload(...namespaces: string[]): Logger {
    return new Logger(DataOrigin.PRELOAD, ...namespaces);
  }

  static Common(...namespaces: string[]): Logger {
    return new Logger(DataOrigin.COMMON, ...namespaces);
  }

  private namespace: string;
  constructor(...namespaces: string[]) {
    this.namespace = namespaces.join(":");
  }

  private log(level: Level, ...msg: string[]) {
    if (isAcceptedLevel(Global.level, level)) {
      if (this.namespace) console.log(`[${level.name.padStart(5)}] ${this.namespace}`, ...msg);
      else console.log(`[${level.name.padStart(5)}]`, ...msg);
    }
  }

  event(from: string, message: string): void {
    this.debug(`${JSON.stringify(message)} [from ${from}]`);
  }

  debug(...msg: string[]): void {
    this.log(DEBUG, ...msg);
  }

  info(...msg: string[]): void {
    this.log(INFO, ...msg);
  }

  warn(...msg: string[]): void {
    this.log(WARN, ...msg);
  }

  error(error: Error): void {
    this.log(ERROR, `${error.name}: ${error.message}`);
  }
}

export default Logger;
