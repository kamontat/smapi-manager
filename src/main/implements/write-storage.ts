import { handler, WRITE_STORAGE } from "@main/communication";

import type { CoreStorage } from "@common/storage";

export const writeStorage = handler(WRITE_STORAGE, async ({ store, data }) => {
  const storage: CoreStorage<string, Record<string, string>> = store[data.subtypeString];
  return storage.set(data.input.key, data.input.value);
});
