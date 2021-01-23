import chalk, { Chalk } from "chalk";

interface Level {
  readonly code: number;
  readonly name: string;
  readonly color: Chalk;
}

export const DEBUG: Level = {
  code: 3,
  name: "debug",
  color: chalk.gray,
};

export const INFO: Level = {
  code: 2,
  name: "info",
  color: chalk.green,
};

export const WARN: Level = {
  code: 1,
  name: "warn",
  color: chalk.yellow,
};

export const ERROR: Level = {
  code: 0,
  name: "error",
  color: chalk.red,
};

export const SILENT: Level = {
  code: -1,
  name: "silent",
  color: chalk.reset,
};

export type { Level };
