import type { Storage } from "@common/storage";
import { base64 } from "@common/utils/uuid";

import type { Mod } from "../v2/models/mod";

export const loadFromCaches = (storage: Storage, id: string): Mod => {
  // query information from mod storage
  const uuid = base64(storage.mod.get("directory"));

  // query cache collection from caches storage
  // I cannot add id to get query because id will include dot notation as well, that make application resolve wrong path
  const mod = storage.caches.getAny(`modCollections.${uuid}.mods`, {});

  if (mod[id] === undefined) throw new Error(`Cannot find mod '${id}' on collection id = '${uuid}'`);
  return mod[id];
};

export const saveToCaches = (storage: Storage, mod: Mod): void => {
  // query information from mod storage
  const uuid = base64(storage.mod.get("directory"));

  const old = storage.caches.getAny(`modCollections.${uuid}.mods`, {});
  old[mod.id] = mod;

  storage.caches.setAny(`modCollections.${uuid}.mods`, old);
};
