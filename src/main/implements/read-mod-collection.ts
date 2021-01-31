import { MainAPIs, READ_MOD_COLLECTION } from "@common/communication";
import { Logger } from "@common/logger";
import { createModCollection, getModDirectory } from "@common/mod";

const logger = Logger.Common("read-mod-collection");
const builder: MainAPIs[typeof READ_MOD_COLLECTION] = async ({ store, data }) => {
  const datetime = +new Date();

  const limit = store.mod.get("recusiveLimit");
  const threshold = store.mod.get("updateThreshold");
  const cache = store.caches.get("modDirectories");

  const isCacheExist = cache.lastUpdate !== -1;
  const isCacheExpired = Math.abs(cache.lastUpdate - datetime) > threshold;
  const allowUpdate = data.input.allowAuto;

  if (isCacheExist && !isCacheExpired) {
    logger.debug(`return valid cache data without update anything`);
    return cache;
  }

  if (!allowUpdate) {
    throw new Error(`Cache not exist, and you didn't allow to auto update, please fetch data by yourself`);
  }

  const directoryName = getModDirectory();
  const collection = await createModCollection(directoryName, limit, datetime);

  logger.debug(`caching mod directory`);
  store.caches.set("modDirectories", collection);

  return collection;
};

export default builder;
export { READ_MOD_COLLECTION };
