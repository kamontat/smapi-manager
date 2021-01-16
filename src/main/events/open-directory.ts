import { IpcMainInvokeEvent, shell } from "electron";
import { join } from "path";

import { EventObject } from "@common/models/event";
import { Logger } from "@common/logger";
import { ModData, MANIFEST_JSON } from "@common/mod";

const logger = new Logger("event", "open-directory");

const openDirectory = (_: IpcMainInvokeEvent, data: EventObject<ModData>): void => {
  const value = data.value;
  if (value) {
    const fullpath = join(value.dirpath, value.filename, MANIFEST_JSON);

    logger.debug(`try to open directory at ${fullpath}`);
    shell.showItemInFolder(fullpath);
  }
};

export default openDirectory;
