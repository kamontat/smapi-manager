import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const CLEAR_STORAGE = "clear-storage";

type ClearStorage = DataMapper<typeof CLEAR_STORAGE, (keyof StorageType)[], void, void>;
const builder = (...keys: (keyof StorageType)[]): ClearStorage => {
  return wrapper({
    type: CLEAR_STORAGE,
    subtype: keys,
  });
};

export default builder;
export { CLEAR_STORAGE };
export type { ClearStorage };
