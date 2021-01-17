import { join } from "path";

import { Logger } from "@common/logger";
import { rename } from "@common/file-system";
import { ModData } from "@common/mod";

import { MainHandler } from "../models/main";

const logger = new Logger("event", "modify-directory");
const modifyDirectory: MainHandler<Promise<ModData>, ModData> = async (_, obj) => {
  const mod = obj.value;

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

export default modifyDirectory;
