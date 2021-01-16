import { isLinux, isMacOS, isWindows } from "@common/utils/os";
import { isExistSync } from "@common/file-system";

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
} from "./constants";

const osSelector = <T>(macos: T, linux: T, windows: T, defaults: T): T => {
  if (isMacOS()) return macos;
  else if (isLinux()) return linux;
  else if (isWindows()) return windows;
  else return defaults;
};

const getExistDirectory = (choices: string[]): string | undefined => {
  return choices.find(c => isExistSync(c));
};

const getSaveDirectory = (): string | undefined =>
  getExistDirectory(osSelector(MACOS_SAVE_FILES, LINUX_SAVE_FILES, WINDOW_SAVE_FILES, []));

const getSteamModDirectory = (): string | undefined =>
  getExistDirectory(osSelector(MACOS_STEAM_MOD_LOCATION, LINUX_STEAM_MOD_LOCATION, WINDOW_STEAM_MOD_LOCATION, []));

const getGOGModDirectory = (): string | undefined =>
  getExistDirectory(osSelector(MACOS_GOG_MOD_LOCATION, LINUX_GOG_MOD_LOCATION, WINDOW_GOG_MOD_LOCATION, []));

const getModDirectory = (): string | undefined => getSteamModDirectory() ?? getGOGModDirectory();

export { getSaveDirectory, getSteamModDirectory, getGOGModDirectory, getModDirectory };
