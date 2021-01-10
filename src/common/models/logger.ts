import chalk, { Chalk } from "chalk";

import LoggerLevel, { DEBUG, INFO, WARN, ERROR, SILENT, getName, accept } from "@common/constants/logger";
import { isDevelopment } from "@common/utils/env";

const colors = [
  chalk.red,
  chalk.redBright,

  chalk.blue,
  chalk.blueBright,

  chalk.cyan,
  chalk.cyanBright,

  chalk.magenta,
  chalk.magentaBright,

  chalk.green,
  chalk.greenBright,

  chalk.yellow,
  chalk.yellowBright,

  chalk.gray,
];

class Logger {
  private static level: LoggerLevel = DEBUG;
  static setLevel(level: LoggerLevel): void {
    Logger.level = level;
  }
  static getLevel(): LoggerLevel {
    return Logger.level;
  }

  private namespace: string;
  private color: Chalk;
  constructor(...namespaces: string[]) {
    Logger.setLevel(isDevelopment() ? DEBUG : SILENT);

    this.namespace = namespaces.join(":");

    const size = this.namespace.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    this.color = colors[size];
  }

  private log(level: LoggerLevel, ...msg: string[]) {
    if (accept(Logger.level, level)) {
      console.log(`[${getName(level)}] ${this.color(this.namespace)}`, ...msg);
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
export { DEBUG, INFO, WARN, ERROR, SILENT, chalk as color };
