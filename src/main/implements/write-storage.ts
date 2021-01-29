import { MainAPIs, WRITE_STORAGE } from "@common/communication";
import type { CoreStorage } from "@common/storage";

const writeStorage: MainAPIs[typeof WRITE_STORAGE] = async (store, loader) => {
  const storage: CoreStorage<string, Record<string, string>> = store[loader.subtypeString];
  return storage.set(loader.input.key, loader.input.value);
};

export default writeStorage;
export { WRITE_STORAGE };
