import type { AppInfo } from "@common/application";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_APP_INFO = "read-app-info";

type ReadAppInfo = DataMapper<typeof READ_APP_INFO, void, void, AppInfo>;

const builder = (): ReadAppInfo => {
  return wrapper({
    type: READ_APP_INFO,
  });
};

export default builder;
export { READ_APP_INFO };
export type { ReadAppInfo };
