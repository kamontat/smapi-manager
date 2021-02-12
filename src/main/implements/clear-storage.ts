import { handler, CLEAR_STORAGE } from "@main/communication";

export const clearStorage = handler(CLEAR_STORAGE, async ({ store, data, logger }) => {
  for (const type of data.subtype) {
    logger.debug(`delete all items from ${type} storage`);
    store[type].clear();
  }
});
