import { MainAPIs, READ_STORAGE } from "@common/communication";
import type { CoreStorage } from "@common/storage";

const readStorage: MainAPIs[typeof READ_STORAGE] = async (store, loader) => {
  const storage: CoreStorage<string, Record<string, string>> = store[loader.subtypeString];
  return storage.get(loader.input);
};

export default readStorage;
export { READ_STORAGE };
