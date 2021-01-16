import { IpcMainInvokeEvent } from "electron";
import Store from "electron-store";

import StorageType from "@common/constants/storage-type";
import { EventObject } from "@common/models/event";
import { Logger } from "@common/logger";
import { createModCollection, ModCollection } from "@common/mod";

const logger = new Logger("event", "storage");

export const readConfig = (store: Store<StorageType>) => {
  return (_: IpcMainInvokeEvent, obj: EventObject<string>): string => {
    const search: string = obj.subtype;
    logger.debug(`reading data from ${search}`);

    if (store.has(search)) {
      return store.get(search);
    }
    throw new Error(`cannot receive any data from search name = '${search}'`);
  };
};

export const readModConfigV2 = (store: Store<StorageType>) => {
  return (): Promise<ModCollection | undefined> => {
    const directoryName = store.get("modDirectory");
    if (directoryName) return createModCollection(directoryName);
    return undefined;
  };
};

export const writeConfig = (store: Store<StorageType>) => {
  return (_: IpcMainInvokeEvent, obj: EventObject<string>): void => {
    logger.debug(`writing ${obj.subtype} [key = ${obj.value}]`);
    store.set(obj.subtype, obj.value);
  };
};
