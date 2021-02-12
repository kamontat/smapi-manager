import { handler, OPEN_STORAGE } from "@main/communication";

export const openStorage = handler(OPEN_STORAGE, async ({ store, data, logger }) => {
  const storage = store[data.subtype];
  logger.debug(`try to open directory at ${storage.url}`);

  storage.open();
});
