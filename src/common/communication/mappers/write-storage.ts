import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const WRITE_STORAGE = "write-storage";

type KeyValue<K, V> = { key: K; value: V };

type WriteStorage<
  K extends keyof StorageType,
  KK extends keyof StorageType[K],
  O extends StorageType[K][KK]
> = DataMapper<typeof WRITE_STORAGE, K, KeyValue<KK, O>, void>;

const writeStorage = <K extends keyof StorageType, KK extends keyof StorageType[K], O extends StorageType[K][KK]>(
  key: K,
  configKey: KK,
  value: O
): WriteStorage<K, KK, O> => {
  return wrapper({
    type: WRITE_STORAGE,
    subtype: key,
    input: {
      key: configKey,
      value,
    },
  });
};

export { WRITE_STORAGE, writeStorage };
export type { WriteStorage };
