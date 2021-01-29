import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_STORAGE = "read-storage";

type ReadStorage<
  K extends keyof StorageType,
  KK extends keyof StorageType[K],
  O extends StorageType[K][KK]
> = DataMapper<typeof READ_STORAGE, K, KK, O>;

const builder = <K extends keyof StorageType, KK extends keyof StorageType[K], O extends StorageType[K][KK]>(
  key: K,
  configKey: KK
): ReadStorage<K, KK, O> => {
  return wrapper({
    type: READ_STORAGE,
    subtype: key,
    input: configKey,
  });
};

export default builder;
export { READ_STORAGE };
export type { ReadStorage };
