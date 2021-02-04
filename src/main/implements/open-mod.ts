import { join } from "path";
import { shell } from "electron";

import { MainAPIs, OPEN_MOD } from "@common/communication";
import { MANIFEST_JSON } from "@common/mod";
import { buildDirectoryPath, buildUpdaterUrl, loadFromCaches } from "@common/mod/utils";

const openMod: MainAPIs[typeof OPEN_MOD] = async ({ data, store }) => {
  const mod = loadFromCaches(store, data.input);

  if (data.subtype === "directory") shell.showItemInFolder(join(buildDirectoryPath(mod), MANIFEST_JSON));
  else if (data.subtype === "updater") shell.openExternal(buildUpdaterUrl(mod));
};

export default openMod;
export { OPEN_MOD };
