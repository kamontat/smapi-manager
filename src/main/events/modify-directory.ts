import { IpcMainInvokeEvent } from "electron";
import { join } from "path";
import { rename as oldRename } from "fs";
import { promisify } from "util";

import Logger from "@common/models/logger";
import { createDirectoryObject, DirectoryObject } from "@common/models/directory";
import { EventProcessorObject } from "@common/models/event";

const rename = promisify(oldRename);
const logger = new Logger("event", "modify-directory");
const modifyDirectory = async (
  _: IpcMainInvokeEvent,
  obj: EventProcessorObject<DirectoryObject>
): Promise<DirectoryObject> => {
  const directory = obj.value;

  const from = join(directory.path, directory.name.original);
  const to = directory.isHidden
    ? join(directory.path, directory.name.shown)
    : join(directory.path, directory.name.hidden);

  logger.debug(`update ${from} => ${to}`);
  await rename(from, to);
  return createDirectoryObject(to, directory.id);
};

export default modifyDirectory;
