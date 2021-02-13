import { handler, READ_MOD_COLLECTION_V2 } from "@main/communication";

import {
  createCollection,
  updateCollection,
  emptyCollectionBuilder,
  getModDirectory,
  ModCollection,
} from "@common/mod";
import { base64 } from "@common/utils/uuid";
import { validateCaches } from "@common/utils/caches";

export const readModCollectionV2 = handler(READ_MOD_COLLECTION_V2, async ({ store, data, logger }) => {
  // query information from mod storage
  const directoryUuid = base64(store.mod.get("directory"));
  const limit = store.mod.get("recusiveLimit");
  const threshold = store.mod.get("updateThreshold");

  // query cache collection from caches storage
  const cache = store.caches.getAny(`modCollections.${directoryUuid}`, emptyCollectionBuilder());

  // defined information
  const { datetime, exist, expired } = validateCaches(threshold, cache);
  const allowUpdate = data.input.allowAutoLoad;

  logger.debug(`Settings: Updating enabled_auto=${allowUpdate}, threshold=${threshold}`);
  logger.debug(`Cache system: exist=${exist}, expired=${expired}`);

  // valid caches
  if (exist && !expired) {
    logger.debug(`return valid cache data without fetch anything`);
    return cache;
  }

  if (allowUpdate) {
    logger.debug(`starting auto update new mod directory`);

    let collection: ModCollection | undefined = undefined;
    if (exist && expired) {
      collection = await updateCollection(cache, limit);
    } else {
      collection = await createCollection(getModDirectory(), limit, datetime);
    }

    store.caches.setAny(`modCollections.${collection.uuid}`, collection);
    return collection;
  } else {
    const errMessage = expired
      ? `cache is already expire, but client send denied to auto update`
      : `cache is not exist, and client send denied to auto update`;
    throw new Error(errMessage);
  }
});
