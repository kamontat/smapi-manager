import { join } from "path";

const HOME = process.env.HOME ?? "";
const APPDATA = process.env.APPDATA ?? "";

export const LINUX_SAVE_FILES = [join(HOME, ".config", "StardewValley", "Saves")];
export const MACOS_SAVE_FILES = [join(HOME, ".config", "StardewValley", "Saves")];
export const WINDOW_SAVE_FILES = [join(APPDATA, "StardewValley", "Saves")];

export const LINUX_STEAM_MOD_LOCATION = [
  join(HOME, ".local", "share", "Steam", "steamapps", "common", "Stardew Valley"),
];
export const LINUX_GOG_MOD_LOCATION = [join(HOME, "GOGGames", "StardewValley", "game")];

export const MACOS_STEAM_MOD_LOCATION = [
  join(
    HOME,
    "Library",
    "Application Support",
    "Steam",
    "SteamApps",
    "common",
    "Stardew Valley",
    "Contents",
    "MacOS",
    "Mods"
  ),
];
export const MACOS_GOG_MOD_LOCATION = [join("Applications", "Stardew Valley.app", "Contents", "MacOS", "Mods")];

export const WINDOW_STEAM_MOD_LOCATION = [
  "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Stardew Valley\\Mods",
  "C:\\Program Files\\Steam\\steamapps\\common\\Stardew Valley\\Mods",
];
export const WINDOW_GOG_MOD_LOCATION = [
  "C:\\Program Files (x86)\\GOG Galaxy\\Games\\Stardew Valley\\Mods",
  "C:\\Program Files\\GOG Galaxy\\Games\\Stardew Valley\\Mods",
  "C:\\GOG Games\\Stardew Valley\\Mods",
];

export const MANIFEST_JSON = "manifest.json";

export const RECUSIVE_LIMIT = 5;
