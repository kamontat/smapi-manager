import { handler, READ_STORAGE } from "@main/communication";

import type { CoreStorage } from "@common/storage";

export const readStorage = handler(READ_STORAGE, async ({ store, data }) => {
  const storage: CoreStorage<string, Record<string, string>> = store[data.subtypeString];
  return storage.get(data.input);
});
