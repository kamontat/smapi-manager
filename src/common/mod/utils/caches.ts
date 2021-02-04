import type { Storage } from "@common/storage";
import { base64 } from "@common/utils/uuid";

import { emptyCollectionBuilder } from "../v2/models/collection";
import type { Mod } from "../v2/models/mod";

export const loadFromCaches = (storage: Storage, id: string): Mod => {
  // query information from mod storage
  const uuid = base64(storage.mod.get("directory"));

  // query cache collection from caches storage
  const caches = storage.caches.getAny(`modCollections.${uuid}`, emptyCollectionBuilder());

  const mod = caches.mods.find(m => m.id === id);
  if (mod === undefined) throw new Error(`Cannot find mod (${id}) on caches system`);

  return mod;
};

export const saveToCaches = (storage: Storage, mod: Mod): void => {
  // query information from mod storage
  const uuid = base64(storage.mod.get("directory"));

  // query cache collection from caches storage
  const caches = storage.caches.getAny(`modCollections.${uuid}`, emptyCollectionBuilder());

  const index = caches.mods.findIndex(m => m.id === m.id);
  caches.mods[index] = mod;

  storage.caches.setAny(`modCollections.${uuid}`, caches);
};
