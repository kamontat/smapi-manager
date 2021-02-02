import type { ModData } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const TOGGLE_MOD_DIRECTORY = "toggle-mod-directory";

type ToggleModDirectory = DataMapper<typeof TOGGLE_MOD_DIRECTORY, void, ModData, ModData>;
const builder = (mod: ModData): ToggleModDirectory => {
  return wrapper({
    type: TOGGLE_MOD_DIRECTORY,
    input: mod,
  });
};

export default builder;
export { TOGGLE_MOD_DIRECTORY };
export type { ToggleModDirectory };
