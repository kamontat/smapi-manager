import { handler, OPEN_EXTERNAL_LINK } from "@main/communication";

import { shell } from "electron";

export const openExternalLink = handler(OPEN_EXTERNAL_LINK, async ({ data, logger }) => {
  logger.debug(`open external link (${data.input})`);
  shell.openExternal(data.input);
});
