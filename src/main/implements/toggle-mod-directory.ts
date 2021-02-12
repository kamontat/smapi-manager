import { handler, TOGGLE_MOD_DIRECTORY } from "@main/communication";

import { rename } from "@common/file-system";
import { loadFromCaches, saveToCaches, buildDirectoryPath, buildTogglePath } from "@common/mod/utils";

export const toggleModDirectory = handler(TOGGLE_MOD_DIRECTORY, async ({ data, store, analytic, logger }) => {
  const mod = loadFromCaches(store, data.input);

  const current = buildDirectoryPath(mod);
  const next = buildTogglePath(mod);

  logger.debug(`update ${current} => ${next}`);
  await rename(current, next);

  mod.status.visibility = !mod.status.visibility;

  analytic.nucleus.toggleModDirectory(mod.id, mod.status.visibility);
  saveToCaches(store, mod);

  return mod;
});
