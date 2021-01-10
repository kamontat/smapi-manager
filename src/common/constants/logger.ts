import chalk, { Chalk } from "chalk";

interface Level {
  readonly code: number;
  readonly name: string;
  readonly color: Chalk;
}

const createLoggerLevel = (code: number, name: string, color: Chalk): Level => {
  return {
    code,
    name,
    color,
  };
};

const getName = (level: Level): string => {
  return level.color(level.name);
};

const accept = (level: Level, second: Level): boolean => {
  return level.code >= second.code;
};

const DEBUG = createLoggerLevel(3, "debug", chalk.gray);
const INFO = createLoggerLevel(2, "info", chalk.green);
const WARN = createLoggerLevel(1, "warn", chalk.yellow);
const ERROR = createLoggerLevel(0, "error", chalk.red);
const SILENT = createLoggerLevel(-1, "silent", chalk.reset);

export default Level;
export { DEBUG, INFO, WARN, ERROR, SILENT, getName, accept };
