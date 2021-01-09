import { IpcMainInvokeEvent } from "electron";
import { join } from "path";
import { rename as oldRename } from "fs";
import { promisify } from "util";

import { createDirectoryObject, DirectoryObject } from "@common/models/directory";
import Logger, { color } from "@common/models/logger";
import { EventObject } from "@common/models/event";

const rename = promisify(oldRename);
const logger = new Logger(color.lightGreen, "event", "modify-directory");
const modifyDirectory = async (_: IpcMainInvokeEvent, obj: EventObject<DirectoryObject>): Promise<DirectoryObject> => {
  const directory = obj.value;

  logger.debug("starting to toggle directory");
  const from = join(directory.path, directory.name.original);
  const to = directory.isHidden
    ? join(directory.path, directory.name.shown)
    : join(directory.path, directory.name.hidden);

  await rename(from, to);
  return createDirectoryObject(to, directory.id);
};

export default modifyDirectory;
