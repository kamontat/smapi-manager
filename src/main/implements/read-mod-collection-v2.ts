import { handler, READ_MOD_COLLECTION_V2 } from "@main/communication";

import {
  createCollection,
  updateCollection,
  emptyCollectionBuilder,
  getModDirectory,
  ModCollection,
} from "@common/mod";
import { base64 } from "@common/utils/uuid";

export const readModCollectionV2 = handler(READ_MOD_COLLECTION_V2, async ({ store, data, logger }) => {
  const datetime = +new Date();

  // query information from mod storage
  const directoryUuid = base64(store.mod.get("directory"));
  const limit = store.mod.get("recusiveLimit");
  const threshold = store.mod.get("updateThreshold");

  // query cache collection from caches storage
  const cache = store.caches.getAny(`modCollections.${directoryUuid}`, emptyCollectionBuilder());

  // defined information
  const isCacheExist = cache.lastUpdated !== -1;
  const isCacheExpired = Math.abs(cache.lastUpdated - datetime) > threshold;
  const allowUpdate = data.input.allowAutoLoad;

  logger.debug(`Settings: Updating enabled_auto=${allowUpdate}, threshold=${threshold}`);
  logger.debug(`Cache system: exist=${isCacheExist}, expired=${isCacheExpired}`);

  // valid caches
  if (isCacheExist && !isCacheExpired) {
    logger.debug(`return valid cache data without fetch anything`);
    return cache;
  }

  if (allowUpdate) {
    logger.debug(`starting auto update new mod directory`);

    let collection: ModCollection | undefined = undefined;
    if (isCacheExist && isCacheExpired) {
      collection = await updateCollection(cache, limit);
    } else {
      collection = await createCollection(getModDirectory(), limit, datetime);
    }

    store.caches.setAny(`modCollections.${collection.uuid}`, collection);
    return collection;
  } else {
    const errMessage = isCacheExpired
      ? `cache is already expire, but client send denied to auto update`
      : `cache is not exist, and client send denied to auto update`;
    throw new Error(errMessage);
  }
});
