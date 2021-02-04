import { MainAPIs, TOGGLE_MOD_DIRECTORY } from "@common/communication";
import { Logger } from "@common/logger";
import { rename } from "@common/file-system";
import { loadFromCaches, saveToCaches, buildDirectoryPath, buildTogglePath } from "@common/mod/utils";

const logger = Logger.Common("toggle-mod-directory");
const toggleModDirectory: MainAPIs[typeof TOGGLE_MOD_DIRECTORY] = async ({ data, store }) => {
  const mod = loadFromCaches(store, data.input);

  const current = buildDirectoryPath(mod);
  const next = buildTogglePath(mod);

  logger.debug(`update ${current} => ${next}`);
  await rename(current, next);

  mod.status.visibility = !mod.status.visibility;

  saveToCaches(store, mod);

  return mod;
};

export default toggleModDirectory;
export { TOGGLE_MOD_DIRECTORY };
