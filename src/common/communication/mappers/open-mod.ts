import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

type Opener = "directory" | "updater";

const OPEN_MOD = "open-mod";

type OpenMod = DataMapper<typeof OPEN_MOD, Opener, string, void>;
const openMod = (type: Opener, id: string): OpenMod => {
  return wrapper({
    type: OPEN_MOD,
    subtype: type,
    input: id,
  });
};

export { OPEN_MOD, openMod };
export type { OpenMod };
