import { handler, READ_APP_METRIC } from "@main/communication";

import { app } from "electron";

export const readAppMetric = handler(READ_APP_METRIC, async () => {
  return app.getAppMetrics();
});
