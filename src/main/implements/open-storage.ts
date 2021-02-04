import { MainAPIs, OPEN_STORAGE } from "@common/communication";
import { Logger } from "@common/logger";

const logger = Logger.Common("open-storage");
const openStorage: MainAPIs[typeof OPEN_STORAGE] = async ({ store, data }) => {
  const storage = store[data.subtype];
  logger.debug(`try to open directory at ${storage.url}`);

  storage.open();
};

export default openStorage;
export { OPEN_STORAGE };
