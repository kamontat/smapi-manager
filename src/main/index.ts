import { app, ipcMain } from "electron";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import findDirectory from "./events/find-directory";
import modifyDirectory from "./events/modify-directory";
import openDirectory from "./events/open-directory";
import { getAppInfo, getAppMetrics, getElectronInfo } from "./events/appinfo";

import {
  APP_INFO,
  APP_METRICS,
  ELECTRON_INFO,
  MODIFY_DIRECTORY,
  FIND_DIRECTORY,
  OPEN_DIRECTORY,
} from "@common/constants/events";
import Logger from "@common/models/logger";
import { isProduction } from "@common/utils/env";

const logger = new Logger("main", "index");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(APP_INFO, getAppInfo);
ipcMain.handle(APP_METRICS, getAppMetrics);
ipcMain.handle(ELECTRON_INFO, getElectronInfo);

ipcMain.handle(FIND_DIRECTORY, findDirectory);
ipcMain.handle(OPEN_DIRECTORY, openDirectory);
ipcMain.handle(MODIFY_DIRECTORY, modifyDirectory);

if (isProduction()) {
  require("update-electron-app")(); // eslint-disable-line @typescript-eslint/no-var-requires
}
