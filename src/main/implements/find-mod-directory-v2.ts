import { handler, FIND_MOD_DIRECTORY_V2 } from "@main/communication";

import { dialog } from "electron";
import { createCollection, getModDirectory } from "@common/mod";

export const findModDirectoryV2 = handler(FIND_MOD_DIRECTORY_V2, async ({ store, data, logger }) => {
  logger.debug(`finding base on input type (${data.subtype})`);

  let directoryName: string | undefined = undefined;
  if (data.subtype === "auto") {
    directoryName = getModDirectory();
  }

  if (directoryName === undefined) {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (result.canceled) {
      logger.debug(`user canceled dialog, return empty directory`);
      return "";
    }

    if (result.filePaths.length < 1) {
      logger.debug(`user didn't select anything, return empty directory`);
      return "";
    }

    if (result.filePaths.length > 1) {
      logger.debug(`user select more than 1 directory, return first selection`);
    }

    directoryName = result.filePaths[0];
  }

  if (directoryName === undefined) {
    logger.debug(`something wrong. This will log only when dialog return undefined filepath`);
    return "";
  }

  const limit = store.mod.get("recusiveLimit");
  const collection = await createCollection(directoryName, limit, +new Date());

  logger.debug(`caching mod collection to cache storage`);
  store.caches.setAny(`modCollections.${collection.uuid}`, collection);

  return directoryName;
});
