import type { Information } from "@common/application";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_APP_INFO = "read-app-info";

type ReadAppInfo = DataMapper<typeof READ_APP_INFO, void, void, Information>;

const readAppInfo = (): ReadAppInfo => {
  return wrapper({
    type: READ_APP_INFO,
  });
};

export { READ_APP_INFO, readAppInfo };
export type { ReadAppInfo };
