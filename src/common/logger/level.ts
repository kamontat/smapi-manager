interface Level {
  readonly code: number;
  readonly name: string;
}

export const DEBUG: Level = {
  code: 3,
  name: "debug",
};

export const INFO: Level = {
  code: 2,
  name: "info",
};

export const WARN: Level = {
  code: 1,
  name: "warn",
};

export const ERROR: Level = {
  code: 0,
  name: "error",
};

export const SILENT: Level = {
  code: -1,
  name: "silent",
};

export type { Level };
