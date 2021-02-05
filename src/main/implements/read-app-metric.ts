import { app } from "electron";
import { MainAPIs, READ_APP_METRIC } from "@common/communication";

const readAppMetric: MainAPIs[typeof READ_APP_METRIC] = async () => {
  return app.getAppMetrics();
};

export default readAppMetric;
export { READ_APP_METRIC };
