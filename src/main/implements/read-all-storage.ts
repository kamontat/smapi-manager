import { handler, READ_ALL_STORAGE } from "@main/communication";

export const readAllStorage = handler(READ_ALL_STORAGE, async ({ store, data }) => {
  const storage = store[data.subtype];
  return storage.value;
});
