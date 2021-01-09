import {
  LINUX_GOG_MOD_LOCATION,
  LINUX_SAVE_FILES,
  LINUX_STEAM_MOD_LOCATION,
  MACOS_GOG_MOD_LOCATION,
  MACOS_SAVE_FILES,
  MACOS_STEAM_MOD_LOCATION,
  WINDOW_GOG_MOD_LOCATION,
  WINDOW_SAVE_FILES,
  WINDOW_STEAM_MOD_LOCATION,
} from "@common/constants/directory";
import { existsSync } from "fs";
import { isLinux, isMacOS, isWindows } from "./os";

export const getExistDirectory = (choices: string[]): string | undefined => {
  return choices.find(c => existsSync(c));
};

export const getSaveDirectory = (): string | undefined => {
  const result: string[] = [];

  if (isMacOS()) result.push(...MACOS_SAVE_FILES);
  else if (isLinux()) result.push(...LINUX_SAVE_FILES);
  else if (isWindows()) result.push(...WINDOW_SAVE_FILES);

  return getExistDirectory(result);
};

export const getSteamModDirectory = (): string | undefined => {
  const result: string[] = [];

  if (isMacOS()) result.push(...MACOS_STEAM_MOD_LOCATION);
  else if (isLinux()) result.push(...LINUX_STEAM_MOD_LOCATION);
  else if (isWindows()) result.push(...WINDOW_STEAM_MOD_LOCATION);

  return getExistDirectory(result);
};

export const getGOGModDirectory = (): string | undefined => {
  const result: string[] = [];

  if (isMacOS()) result.push(...MACOS_GOG_MOD_LOCATION);
  else if (isLinux()) result.push(...LINUX_GOG_MOD_LOCATION);
  else if (isWindows()) result.push(...WINDOW_GOG_MOD_LOCATION);

  return getExistDirectory(result);
};
