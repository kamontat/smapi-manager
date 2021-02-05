import { MainAPIs, WRITE_ALL_STORAGE } from "@common/communication";
import { Logger } from "@common/logger";

const logger = Logger.Common("write-all-storage");
const writeAllStorage: MainAPIs[typeof WRITE_ALL_STORAGE] = async ({ store, data, analytic }) => {
  const storage = store[data.subtype];

  if (data.subtype === "settings") {
    Object.keys(data.input).forEach(key => {
      const old = store.settings.getAny(key);
      const input = data.input[key];

      if (input !== old) {
        logger.debug(`report 'settings' has been updated on '${key}'`);
        analytic.nucleus.updateStorage(`settings.${key}`, input);
      }
    });
  }

  return storage.setAll(data.input);
};

export default writeAllStorage;
export { WRITE_ALL_STORAGE };
