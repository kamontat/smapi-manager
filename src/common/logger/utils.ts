import type { Level } from "./level";

export const getLevelName = (level: Level): string => {
  return level.color(level.name);
};

export const isAcceptedLevel = (first: Level, second: Level): boolean => {
  return first.code >= second.code;
};
