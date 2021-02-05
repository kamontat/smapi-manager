import { MainAPIs, READ_ALL_STORAGE } from "@common/communication";

const readAllStorage: MainAPIs[typeof READ_ALL_STORAGE] = async ({ store, data }) => {
  const storage = store[data.subtype];
  return storage.value;
};

export default readAllStorage;
export { READ_ALL_STORAGE };
