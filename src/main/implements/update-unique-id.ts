import { MainAPIs, UPDATE_UNIQUE_ID } from "@common/communication";
import { uuid } from "@common/utils/uuid";

const updateUniqueId: MainAPIs[typeof UPDATE_UNIQUE_ID] = async ({ data, store, analytic }) => {
  const id = uuid(data.input);

  store.settings.set("uniqueid", id);
  analytic.nucleus.setUser(id);

  return id;
};

export default updateUniqueId;
export { UPDATE_UNIQUE_ID };
