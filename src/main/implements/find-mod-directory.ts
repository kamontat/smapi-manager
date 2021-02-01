import { dialog } from "electron";
import { DataOrigin, MainAPIs, FIND_MOD_DIRECTORY } from "@common/communication";
import { Logger } from "@common/logger";
import { createModCollection, getGOGModDirectory, getModDirectory, getSteamModDirectory } from "@common/mod";

const logger = new Logger(DataOrigin.COMMON, "find-mod-directory");
const findModDirectory: MainAPIs[typeof FIND_MOD_DIRECTORY] = async ({ store, data }) => {
  logger.debug(`finding base on input type (${data.subtype})`);

  let directoryName: string | undefined = undefined;
  switch (data.subtype) {
    case "auto":
      directoryName = getModDirectory();
      break;
    case "steam":
      directoryName = getSteamModDirectory();
      break;
    case "gog":
      directoryName = getGOGModDirectory();
      break;
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

  if (directoryName === undefined) {
    logger.debug(`something wrong. This will log only when dialog return undefined filepath`);
    return createModCollection();
  }

  const limit = store.mod.get("recusiveLimit");
  const collection = await createModCollection(directoryName, limit, +new Date());

  // logger.debug(`caching mod directory`);
  // store.caches.set("modDirectories", collection);

  return collection;
};

export default findModDirectory;
export { FIND_MOD_DIRECTORY };
