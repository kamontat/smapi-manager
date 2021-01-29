import { shell } from "electron";
import { DataOrigin, MainAPIs, OPEN_FILE } from "@common/communication";
import { Logger } from "@common/logger";

const logger = new Logger(DataOrigin.COMMON, "open-file");
const openFile: MainAPIs[typeof OPEN_FILE] = async (_, data) => {
  logger.debug(`try to open directory at ${data.input}`);
  shell.showItemInFolder(data.input);
};

export default openFile;
export { OPEN_FILE };
