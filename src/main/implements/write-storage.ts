import { MainAPIs, WRITE_STORAGE } from "@common/communication";
import type { CoreStorage } from "@common/storage";

const writeStorage: MainAPIs[typeof WRITE_STORAGE] = async ({ store, data }) => {
  const storage: CoreStorage<string, Record<string, string>> = store[data.subtypeString];
  return storage.set(data.input.key, data.input.value);
};

export default writeStorage;
export { WRITE_STORAGE };
