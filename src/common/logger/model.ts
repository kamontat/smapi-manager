import { Chalk } from "chalk";
import { Level, isAcceptedLevel, getLevelName, Global, DEBUG, INFO, WARN, ERROR } from ".";
import colors from "./colors";

class Logger {
  private namespace: string;
  private color: Chalk;
  constructor(...namespaces: string[]) {
    this.namespace = namespaces.join(":");

    const size = this.namespace.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    this.color = colors[size];
  }

  private log(level: Level, ...msg: string[]) {
    if (isAcceptedLevel(Global.level, level)) {
      console.log(`[${getLevelName(level)}] ${this.color(this.namespace)}`, ...msg);
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
