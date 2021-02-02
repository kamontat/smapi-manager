import { join } from "path";
import { MainAPIs, TOGGLE_MOD_DIRECTORY } from "@common/communication";
import { Logger } from "@common/logger";
import { rename } from "@common/file-system";

const logger = Logger.Common("toggle-mod-directory");
const toggleModDirectory: MainAPIs[typeof TOGGLE_MOD_DIRECTORY] = async ({ data }) => {
  const mod = data.input;

  const newName = mod.status.isHidden ? mod.transformer.shownName : mod.transformer.hiddenName;

  const from = join(mod.dirpath, mod.filename);
  const to = join(mod.dirpath, newName);

  logger.debug(`update ${from} => ${to}`);
  await rename(from, to);

  const newMod = Object.assign({}, mod);

  newMod.status.isHidden = !newMod.status.isHidden;
  newMod.filename = newName;

  return newMod;
};

export default toggleModDirectory;
export { TOGGLE_MOD_DIRECTORY };
