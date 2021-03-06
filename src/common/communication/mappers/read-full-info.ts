import type { KeyValue } from "@common/utils/array";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_FULL_INFO = "read-full-info";

type FullInformation = KeyValue<string>[];

type ReadFullInfo = DataMapper<typeof READ_FULL_INFO, void, void, FullInformation>;

const readFullInfo = (): ReadFullInfo => {
  return wrapper({
    type: READ_FULL_INFO,
  });
};

export { READ_FULL_INFO, readFullInfo };
export type { ReadFullInfo };
