import { handler, OPEN_MOD } from "@main/communication";

import { join } from "path";
import { shell } from "electron";

import { MANIFEST_JSON } from "@common/mod";
import { buildDirectoryPath, buildUpdaterUrl, loadFromCaches } from "@common/mod/utils";

export const openMod = handler(OPEN_MOD, async ({ data, store }) => {
  const mod = loadFromCaches(store, data.input);

  if (data.subtype === "directory") shell.showItemInFolder(join(buildDirectoryPath(mod), MANIFEST_JSON));
  else if (data.subtype === "updater") shell.openExternal(buildUpdaterUrl(mod));
});
