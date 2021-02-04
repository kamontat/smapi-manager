import { MainAPIs, CLEAR_STORAGE } from "@common/communication";
import { Logger } from "@common/logger";

const logger = Logger.Common("open-storage");
const clearStorage: MainAPIs[typeof CLEAR_STORAGE] = async ({ store, data }) => {
  for (const type of data.subtype) {
    logger.debug(`delete all items from ${type} storage`);
    store[type].clear();
  }
};

export default clearStorage;
export { CLEAR_STORAGE };
