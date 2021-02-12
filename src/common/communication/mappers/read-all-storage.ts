import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_ALL_STORAGE = "read-all-storage";

type ReadAllStorage<K extends keyof StorageType> = DataMapper<typeof READ_ALL_STORAGE, K, void, StorageType[K]>;

const readAllStorage = <K extends keyof StorageType>(key: K): ReadAllStorage<K> => {
  return wrapper({
    type: READ_ALL_STORAGE,
    subtype: key,
  });
};

export { READ_ALL_STORAGE, readAllStorage };
export type { ReadAllStorage };
