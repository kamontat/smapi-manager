import type { ModServerExtender } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const FETCH_MOD_DATA = "fetch-mod-data";

type FetchModData = DataMapper<typeof FETCH_MOD_DATA, void, string, ModServerExtender>;
const builder = (modId: string): FetchModData => {
  return wrapper({
    type: FETCH_MOD_DATA,
    input: modId,
  });
};

export default builder;
export { FETCH_MOD_DATA };
export type { FetchModData };
