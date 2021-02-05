import type { Level } from "./level";

export const isAcceptedLevel = (first: Level, second: Level): boolean => {
  return first.code >= second.code;
};
