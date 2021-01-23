import { shell } from "electron";
import { join } from "path";

import { Logger } from "@common/logger";
import { ModData, MANIFEST_JSON } from "@common/mod";

import type { MainHandler } from "../models/main";

const logger = new Logger("event", "open-directory");

const openDirectory: MainHandler<void, ModData> = (_, data) => {
  const value = data.value;
  if (value) {
    const fullpath = join(value.dirpath, value.filename, MANIFEST_JSON);

    logger.debug(`try to open directory at ${fullpath}`);
    shell.showItemInFolder(fullpath);
  }
};

export default openDirectory;
