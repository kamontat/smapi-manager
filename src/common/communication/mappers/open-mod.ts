import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

type Opener = "directory" | "updater";

const OPEN_MOD = "open-mod";

type OpenMod = DataMapper<typeof OPEN_MOD, Opener, string, void>;
const builder = (type: Opener, id: string): OpenMod => {
  return wrapper({
    type: OPEN_MOD,
    subtype: type,
    input: id,
  });
};

export default builder;
export { OPEN_MOD };
export type { OpenMod };
