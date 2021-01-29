import type { ModCollection } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const FIND_MOD_DIRECTORY = "find-mod-directory";

type ModType = "auto" | "steam" | "gog" | "custom";

type FindModDirectory = DataMapper<typeof FIND_MOD_DIRECTORY, ModType, void, ModCollection>;
const builder = (type: ModType): FindModDirectory => {
  return wrapper({
    type: FIND_MOD_DIRECTORY,
    subtype: type,
  });
};

export default builder;
export { FIND_MOD_DIRECTORY };
export type { FindModDirectory };
