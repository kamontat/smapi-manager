import { handler, OPEN_FILE } from "@main/communication";

import { shell } from "electron";

export const openFile = handler(OPEN_FILE, async ({ data, logger }) => {
  logger.debug(`try to open directory at ${data.input}`);
  shell.showItemInFolder(data.input);
});
