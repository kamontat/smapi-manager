import { join } from "path";
import { toHiddenName, toShownName } from "@common/file-system";

import type { Mod } from "../v2/models/mod";

export const buildDirectoryPath = (mod: Mod): string => {
  const dirpath = mod.location.dirpath;
  const fileName = mod.status.visibility ? toShownName(mod.location.name) : toHiddenName(mod.location.name);

  return join(dirpath, fileName);
};

export const buildTogglePath = (mod: Mod): string => {
  const dirpath = mod.location.dirpath;
  const fileName = mod.status.visibility ? toHiddenName(mod.location.name) : toShownName(mod.location.name);

  return join(dirpath, fileName);
};
