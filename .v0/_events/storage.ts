import type { ConfigKey, ConfigValue, CoreStorage } from "@common/storage";
import { Logger } from "@common/logger";
import { createModCollection, ModCollection } from "@common/mod";

import type { MainHandler, MainHandlerV2 } from "../models/main";

const logger = new Logger("event", "storage");

type KeyValue = { key: string; value?: string };

export const openConfigFile: MainHandlerV2<void> = (store, obj) => {
  if (obj.subtype && store[obj.subtype]) {
    const storage: CoreStorage<string> = store[obj.subtype];

    logger.debug(`tring to open ${obj.subtype} config: ${storage.url}`);
    storage.open();
  }
};

export const readConfigV2: MainHandlerV2<string, KeyValue> = (store, obj) => {
  const storage: CoreStorage<string, Record<string, string>> = store[obj.subtype];
  logger.debug(`reading data from ${storage.url}`);

  if (storage.has(obj.value.key)) {
    return storage.get(obj.value.key);
  }
  throw new Error(`cannot receive any data from search name = '${JSON.stringify(obj.value)}'`);
};

export const readConfig: MainHandler<string, string> = (store, obj) => {
  const search = obj.subtype as ConfigKey;
  logger.debug(`reading data from ${search}`);

  if (store.has(search)) {
    return store.get(search);
  }
  throw new Error(`cannot receive any data from search name = '${search}'`);
};

export const readConfigAll: MainHandler<ConfigValue> = store => {
  logger.warn(`reading all data from config is expensive event`);
  return store.value;
};

export const readModConfigV2: MainHandler<Promise<ModCollection | undefined>, number> = (store, obj) => {
  const directoryName = store.get("modDirectory");
  const limit = store.get("recursiveLimit");

  if (directoryName) return createModCollection(directoryName, obj.value ?? limit);
  return undefined;
};

export const writeConfigV2: MainHandlerV2<void, KeyValue> = (store, obj) => {
  const storage: CoreStorage<string, Record<string, string>> = store[obj.subtype];
  logger.debug(`update ${obj.value.value} (key: '${obj.value.key}' at ${obj.subtype})`);

  storage.set(obj.value.key, obj.value.value);
};

export const writeConfig: MainHandler<void, string> = (store, obj) => {
  logger.debug(`update '${obj.subtype}' key: '${obj.value}'`);
  store.set(obj.subtype as ConfigKey, obj.value);
};
