import { join } from "path";
import { IpcMainInvokeEvent, shell } from "electron";

import { EventObject } from "@common/models";
import { DirectoryObject } from "@common/models/directory";
import Logger from "@common/logger";
import { MANIFEST_JSON } from "@common/constants/directory";

const logger = new Logger("event", "open-directory");

const openDirectory = (_: IpcMainInvokeEvent, args: EventObject<DirectoryObject>): void => {
  if (args.value) {
    const fullpath = join(args.value.path, args.value.name.original, MANIFEST_JSON);

    logger.debug(`try to open directory at ${fullpath}`);
    shell.showItemInFolder(fullpath);
  }
};

export default openDirectory;
