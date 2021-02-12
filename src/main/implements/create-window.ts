import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { getNodeEnv } from "@common/utils/env";

import {
  DEFAULT_HEIGHT,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_WEB_PREFERENCES,
} from "../constants/windows";
import type { AppExecutor } from "../models/app-executor";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow: AppExecutor = ({ event, logger, analytic }) => {
  const option: BrowserWindowConstructorOptions = Object.assign({
    height: DEFAULT_HEIGHT,
    minHeight: DEFAULT_MIN_HEIGHT,
    width: DEFAULT_WIDTH,
    minWidth: DEFAULT_MIN_WIDTH,
    webPreferences: {
      ...DEFAULT_WEB_PREFERENCES,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  logger.debug(`current environment: `, getNodeEnv().value());
  logger.debug(`create window option: `, JSON.stringify(option));
  if (event === "ready") analytic.nucleus.start();

  // Create the browser window.
  const wins = new BrowserWindow(option);

  // and load the index.html of the app.
  wins.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Auto open the DevTools.
  if (getNodeEnv().is("development")) {
    wins.webContents.openDevTools();
  }
};

export default createWindow;
