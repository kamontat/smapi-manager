import { MainAPIs, WRITE_ALL_STORAGE } from "@common/communication";

const writeAllStorage: MainAPIs[typeof WRITE_ALL_STORAGE] = async (store, data) => {
  const storage = store[data.subtype];
  return storage.setAll(data.input);
};

export default writeAllStorage;
export { WRITE_ALL_STORAGE };
