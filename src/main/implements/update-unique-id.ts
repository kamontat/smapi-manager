import { handler, UPDATE_UNIQUE_ID } from "@main/communication";

import { uuid } from "@common/utils/uuid";

export const updateUniqueId = handler(UPDATE_UNIQUE_ID, async ({ data, store, analytic }) => {
  const id = uuid(data.input);

  store.settings.set("uniqueid", id);
  analytic.nucleus.setUser(id);

  return id;
});
