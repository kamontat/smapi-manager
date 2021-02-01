import type { Logger } from "@common/logger";
import { getNodeEnv } from "@common/utils/env";

import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import {
  DEFAULT_HEIGHT,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_WEB_PREFERENCES,
} from "../constants/windows";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow = (
  logger: Logger,
  opt?: Partial<BrowserWindowConstructorOptions>,
  entry = MAIN_WINDOW_WEBPACK_ENTRY
) => {
  return (): void => {
    const option: BrowserWindowConstructorOptions = Object.assign(
      {
        height: DEFAULT_HEIGHT,
        minHeight: DEFAULT_MIN_HEIGHT,
        width: DEFAULT_WIDTH,
        minWidth: DEFAULT_MIN_WIDTH,
        webPreferences: {
          ...DEFAULT_WEB_PREFERENCES,
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      },
      opt
    );

    logger.debug(`current environment: `, getNodeEnv().value());
    logger.debug(`create window option: `, JSON.stringify(option));

    // Create the browser window.
    const wins = new BrowserWindow(option);

    // and load the index.html of the app.
    wins.loadURL(entry);

    // Auto open the DevTools.
    if (getNodeEnv().is("development")) {
      wins.webContents.openDevTools();
    }
  };
};

export default createWindow;
