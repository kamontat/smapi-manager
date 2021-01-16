import { IpcMainInvokeEvent, dialog } from "electron";

import { EventObject } from "@common/models/event";
import { Logger, color } from "@common/logger";
import { createModCollection, getGOGModDirectory, getSteamModDirectory, ModCollection } from "@common/mod";

const logger = new Logger("event", "find-mods");
const findMods = async (_: IpcMainInvokeEvent, obj: EventObject): Promise<ModCollection> => {
  let directoryName: string | undefined = undefined;

  if (obj.subtype === "steam") {
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

  return createModCollection(directoryName);
};

export default findMods;
