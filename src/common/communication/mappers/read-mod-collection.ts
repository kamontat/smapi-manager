import type { ModCollection } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_MOD_COLLECTION = "read-mod-collection";

type ReadModCollection = DataMapper<typeof READ_MOD_COLLECTION, void, { allowAuto: boolean }, ModCollection>;
const builder = (allowAutoLoad = true): ReadModCollection => {
  return wrapper({
    type: READ_MOD_COLLECTION,
    input: {
      allowAuto: allowAutoLoad,
    },
  });
};

export default builder;
export { READ_MOD_COLLECTION };
export type { ReadModCollection };
