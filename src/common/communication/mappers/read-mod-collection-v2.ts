import type { ModCollection } from "@common/mod";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_MOD_COLLECTION_V2 = "read-mod-collection-v2";
interface Option {
  allowAutoLoad: boolean;
}

type ReadModCollectionV2 = DataMapper<typeof READ_MOD_COLLECTION_V2, void, Option, ModCollection>;
const builder = (opts?: Partial<Option>): ReadModCollectionV2 => {
  return wrapper({
    type: READ_MOD_COLLECTION_V2,
    input: {
      allowAutoLoad: opts?.allowAutoLoad ?? true,
    },
  });
};

export default builder;
export { READ_MOD_COLLECTION_V2 };
export type { ReadModCollectionV2 };
