import { ValueKey } from "@common/configuration/models";
import StorageType from "@common/constants/storage-type";
import { Logger } from "@common/logger";
import { createModCollection, ModCollection } from "@common/mod";

import { MainHandler } from "../models/main";

const logger = new Logger("event", "storage");

export const readConfig: MainHandler<string, string> = (store, obj) => {
  const search = obj.subtype as ValueKey;
  logger.debug(`reading data from ${search}`);

  if (store.has(search)) {
    return store.get(search);
  }
  throw new Error(`cannot receive any data from search name = '${search}'`);
};

export const readConfigAll: MainHandler<StorageType> = store => {
  logger.warn(`reading all data from config is expensive event`);
  return store.value;
};

export const readModConfigV2: MainHandler<Promise<ModCollection | undefined>, number> = (store, obj) => {
  const directoryName = store.get("modDirectory");
  const limit = store.get("recursiveLimit");

  if (directoryName) return createModCollection(directoryName, obj.value ?? limit);
  return undefined;
};

export const writeConfig: MainHandler<void, string> = (store, obj) => {
  logger.debug(`update '${obj.subtype}' key: '${obj.value}'`);
  store.set(obj.subtype as ValueKey, obj.value);
};
