import { BrowserWindow } from "electron";
import type { Logger } from "@common/logger";

import createWindow from "./create-window";

const recreateWindow = (logger: Logger) => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  return (): void => {
    if (BrowserWindow.getAllWindows().length === 0) {
      logger.debug(`recreate windows when no windows exist`);
      createWindow(logger)();
    }
  };
};

export default recreateWindow;
