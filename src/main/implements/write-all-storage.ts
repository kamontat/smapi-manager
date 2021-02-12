import { handler, WRITE_ALL_STORAGE } from "@main/communication";

export const writeAllStorage = handler(WRITE_ALL_STORAGE, async ({ store, data, analytic, logger }) => {
  const storage = store[data.subtype];

  if (data.subtype === "settings") {
    Object.keys(data.input).forEach(key => {
      const old = store.settings.getAny(key);
      const input = data.input[key];

      if (input !== old) {
        logger.debug(`report 'settings' has been updated on '${key}'`);
        analytic.nucleus.updateStorage(`settings.${key}`, input);
      }
    });
  }

  return storage.setAll(data.input);
});
