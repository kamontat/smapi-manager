// enum LoggerLevel {
//   DEBUG = 3,
//   INFO = 2,
//   WARN = 1,
//   ERROR = 0,
//   SILENT = -1,
// }

import ansicolor, { AnsicolorMethods } from "ansicolor";

interface Level {
  readonly code: number;
  readonly name: string;
  readonly color: AnsicolorMethods;

  getName(): string;
  accept(level: Level): boolean;
}

class LoggerLevel implements Level {
  constructor(readonly code: number, readonly name: string, readonly color: AnsicolorMethods) {}

  getName() {
    return this.color(this.name);
  }

  accept(level: Level): boolean {
    return this.code >= level.code;
  }
}

const DEBUG = new LoggerLevel(3, "debug", ansicolor.lightGray);
const INFO = new LoggerLevel(2, "info", ansicolor.lightGreen);
const WARN = new LoggerLevel(1, "warn", ansicolor.yellow);
const ERROR = new LoggerLevel(0, "error", ansicolor.red);
const SILENT = new LoggerLevel(-1, "silent", ansicolor.default);

export default Level;
export { DEBUG, INFO, WARN, ERROR, SILENT };
