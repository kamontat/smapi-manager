import type { ProcessMetric } from "electron";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_APP_METRIC = "read-app-metric";

type ReadAppMetric = DataMapper<typeof READ_APP_METRIC, void, void, ProcessMetric[]>;

const builder = (): ReadAppMetric => {
  return wrapper({
    type: READ_APP_METRIC,
  });
};

export default builder;
export { READ_APP_METRIC };
export type { ReadAppMetric };
