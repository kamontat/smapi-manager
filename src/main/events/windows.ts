import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import {
  DEFAULT_HEIGHT,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_WEB_PREFERENCES,
} from "@common/constants/windows";
import type { Logger } from "@common/logger";
import { isMacOS } from "@common/utils/os";
import { isDevelopment } from "@common/utils/env";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const createWindow = (logger: Logger) => {
  return (): void => {
    const option: BrowserWindowConstructorOptions = {
      height: DEFAULT_HEIGHT,
      minHeight: DEFAULT_MIN_HEIGHT,
      width: DEFAULT_WIDTH,
      minWidth: DEFAULT_MIN_WIDTH,
      webPreferences: DEFAULT_WEB_PREFERENCES,
    };

    logger.debug(`current environment: `, process.env.NODE_ENV);
    logger.debug(`create window option: `, JSON.stringify(option));

    // Create the browser window.
    const mainWindow = new BrowserWindow(option);

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    if (isDevelopment()) {
      mainWindow.webContents.openDevTools();
    }
  };
};

export const recreateWindow = (logger: Logger) => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  return (): void => {
    if (BrowserWindow.getAllWindows().length === 0) {
      logger.debug(`recreate windows with no windows exist`);
      createWindow(logger)();
    }
  };
};

export const quitWindow = (logger: Logger) => {
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
