import { MainAPIs, READ_STORAGE } from "@common/communication";
import type { CoreStorage } from "@common/storage";

const readStorage: MainAPIs[typeof READ_STORAGE] = async ({ store, data }) => {
  const storage: CoreStorage<string, Record<string, string>> = store[data.subtypeString];
  return storage.get(data.input);
};

export default readStorage;
export { READ_STORAGE };
