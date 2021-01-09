import LoggerLevel, { DEBUG, INFO, WARN, ERROR, SILENT } from "@common/constants/logger";
import { isDevelopment } from "@common/utils/env";
import ansicolor, { AnsicolorMethods } from "ansicolor";

class Logger {
  private static level: LoggerLevel = DEBUG;
  static setLevel(level: LoggerLevel): void {
    Logger.level = level;
  }

  private namespace: string;
  constructor(private color: AnsicolorMethods, ...namespaces: string[]) {
    Logger.setLevel(isDevelopment() ? DEBUG : SILENT);

    this.namespace = namespaces.join(":");
  }

  private log(level: LoggerLevel, ...msg: string[]) {
    if (Logger.level.accept(level)) {
      console.log(`[${level.getName()}] ${this.color(this.namespace)}`, ...msg);
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

  error(...msg: string[]): void {
    this.log(ERROR, ...msg);
  }
}

export default Logger;
export { DEBUG, INFO, WARN, ERROR, SILENT, ansicolor as color };
