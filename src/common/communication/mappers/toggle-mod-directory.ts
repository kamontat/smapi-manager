import type { Mod } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const TOGGLE_MOD_DIRECTORY = "toggle-mod-directory";

type ToggleModDirectory = DataMapper<typeof TOGGLE_MOD_DIRECTORY, void, string, Mod>;
const toggleModDirectory = (id: string): ToggleModDirectory => {
  return wrapper({
    type: TOGGLE_MOD_DIRECTORY,
    input: id,
  });
};

export { TOGGLE_MOD_DIRECTORY, toggleModDirectory };
export type { ToggleModDirectory };
