import { shell } from "electron";

import { MainAPIs, OPEN_EXTERNAL_LINK } from "@common/communication";
import { Logger } from "@common/logger";

const logger = Logger.Common("open-external-link");
const openExternalLink: MainAPIs[typeof OPEN_EXTERNAL_LINK] = async ({ data }) => {
  logger.debug(`open external link (${data.input})`);
  shell.openExternal(data.input);
};

export default openExternalLink;
export { OPEN_EXTERNAL_LINK };
