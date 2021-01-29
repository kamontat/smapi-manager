import { app } from "electron";
import type { Logger } from "@common/logger";
import { isMacOS } from "@common/utils/os";

const quitWindow = (logger: Logger) => {
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  return (): void => {
    if (isMacOS()) {
      logger.debug("quit all windows");
      app.quit();
    }
  };
};

export default quitWindow;
