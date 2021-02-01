import { app } from "electron";
import { isMacOS } from "@common/utils/os";

import type { AppExecutor } from "../models/app-executor";

const quitWindow: AppExecutor = ({ logger }) => {
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  if (isMacOS()) {
    logger.debug("quit all windows");
    app.quit();
  }
};

export default quitWindow;
