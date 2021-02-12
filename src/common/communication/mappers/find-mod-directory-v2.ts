import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const FIND_MOD_DIRECTORY_V2 = "find-mod-directory-v2";

type ModType = "auto" | "custom";

// return only directory path
type FindModDirectoryV2 = DataMapper<typeof FIND_MOD_DIRECTORY_V2, ModType, void, string>;
const findModDirectoryV2 = (type: ModType): FindModDirectoryV2 => {
  return wrapper({
    type: FIND_MOD_DIRECTORY_V2,
    subtype: type,
  });
};

export { FIND_MOD_DIRECTORY_V2, findModDirectoryV2 };
export type { FindModDirectoryV2 };
