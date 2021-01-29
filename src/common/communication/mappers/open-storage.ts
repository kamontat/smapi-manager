import type { StorageType } from "@common/storage";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const OPEN_STORAGE = "open-storage";

type OpenStorage = DataMapper<typeof OPEN_STORAGE, keyof StorageType>;
const builder = (key: keyof StorageType): OpenStorage => {
  return wrapper({
    type: "open-storage",
    subtype: key,
  });
};

export default builder;
export { OPEN_STORAGE };
export type { OpenStorage };
