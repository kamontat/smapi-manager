import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const OPEN_STORAGE = "open-storage";

type OpenStorage = DataMapper<typeof OPEN_STORAGE, keyof StorageType>;
const openStorage = (key: keyof StorageType): OpenStorage => {
  return wrapper({
    type: OPEN_STORAGE,
    subtype: key,
  });
};

export { OPEN_STORAGE, openStorage };
export type { OpenStorage };
