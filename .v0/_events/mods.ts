import { dialog } from "electron";
import { Logger } from "@common/logger";
import {
  createModCollection,
  getGOGModDirectory,
  getModDirectory,
  getSteamModDirectory,
  ModCollection,
} from "@common/mod";

import type { MainHandlerV2 } from "../models/main";

const logger = new Logger("event", "find-mods");
const findMods: MainHandlerV2<Promise<ModCollection>> = async (store, obj) => {
  let directoryName: string | undefined = undefined;

  logger.debug("received directory from", obj.subtype);
  if (obj.subtype === "auto") {
    directoryName = getModDirectory();
  } else if (obj.subtype === "steam") {
    directoryName = getSteamModDirectory();
  } else if (obj.subtype === "gog") {
    directoryName = getGOGModDirectory();
  }

  if (directoryName === undefined) {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (result.canceled) {
      logger.debug(`user canceled dialog, return empty directory`);
      return createModCollection();
    }

    if (result.filePaths.length < 1) {
      logger.debug(`user didn't select anything, return empty directory`);
      return createModCollection();
    }

    if (result.filePaths.length > 1) {
      logger.debug(`user select more than 1 directory, return first selection`);
    }

    directoryName = result.filePaths[0];
  }

  const collection = await createModCollection(directoryName, store);
  store.mod.set("directory", collection.path);

  return collection;
};

const loadMods: MainHandlerV2<Promise<ModCollection>> = store => {
  const directory = store.mod.get("directory");
  const limit = store.mod.get("recusiveLimit");

  return createModCollection(directory, limit);
};

export { findMods, loadMods };
