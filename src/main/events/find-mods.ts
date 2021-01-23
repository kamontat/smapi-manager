import { dialog } from "electron";
import { Logger, color } from "@common/logger";
import {
  createModCollection,
  getGOGModDirectory,
  getModDirectory,
  getSteamModDirectory,
  ModCollection,
} from "@common/mod";

import type { MainHandler } from "../models/main";

const logger = new Logger("event", "find-mods");
const findMods: MainHandler<Promise<ModCollection>, number> = async (store, obj) => {
  let directoryName: string | undefined = undefined;

  if (obj.subtype === "auto") {
    directoryName = getModDirectory();
    logger.debug("received directory from", color.magenta(obj.subtype));
  } else if (obj.subtype === "steam") {
    directoryName = getSteamModDirectory();
    logger.debug("received directory from", color.magenta(obj.subtype));
  } else if (obj.subtype === "gog") {
    directoryName = getGOGModDirectory();
    logger.debug("received directory from", color.magenta(obj.subtype));
  }

  if (directoryName === undefined) {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      directoryName = result.filePaths[0];
      logger.debug("received directory from", color.magenta.underline("dialog"));
    }
  }

  return createModCollection(directoryName, store.get("recursiveLimit"));
};

export default findMods;
