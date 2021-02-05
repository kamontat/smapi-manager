import { shell } from "electron";
import { MainAPIs, OPEN_FILE } from "@common/communication";
import { Logger } from "@common/logger";

const logger = Logger.Common("open-file");
const openFile: MainAPIs[typeof OPEN_FILE] = async ({ data }) => {
  logger.debug(`try to open directory at ${data.input}`);
  shell.showItemInFolder(data.input);
};

export default openFile;
export { OPEN_FILE };
