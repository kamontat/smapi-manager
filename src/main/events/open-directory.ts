import { dialog, IpcMainInvokeEvent } from "electron";

import { EventProcessorObject } from "@common/models/event";
import Logger, { color } from "@common/models/logger";
import createDirectory, { Directory } from "@common/models/directory";
import { getGOGModDirectory, getSteamModDirectory } from "@common/utils/directory";

const logger = new Logger("event", "open-directory");

const openDirectory = async (event: IpcMainInvokeEvent, obj: EventProcessorObject): Promise<Directory> => {
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

  return createDirectory(directoryName);
};

export default openDirectory;
