import { handler, FETCH_APP_STATUS } from "@main/communication";

import { statusLatest } from "@common/application";

export const fetchAppStatus = handler(FETCH_APP_STATUS, async () => {
  return statusLatest();
});
