import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const WRITE_ALL_STORAGE = "write-all-storage";

type WriteAllStorage<K extends keyof StorageType> = DataMapper<
  typeof WRITE_ALL_STORAGE,
  K,
  Partial<StorageType[K]>,
  void
>;
const builder = <K extends keyof StorageType>(key: K, data: Partial<StorageType[K]>): WriteAllStorage<K> => {
  return wrapper({
    type: WRITE_ALL_STORAGE,
    subtype: key,
    input: data,
  });
};

export default builder;
export { WRITE_ALL_STORAGE };
export type { WriteAllStorage };
