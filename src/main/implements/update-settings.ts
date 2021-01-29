import { MainAPIs, UPDATE_SETTINGS } from "@common/communication";

const updateSettings: MainAPIs[typeof UPDATE_SETTINGS] = async (store, data) => {
  store.settings.setAll(data.input);
};

export default updateSettings;
export { UPDATE_SETTINGS };
