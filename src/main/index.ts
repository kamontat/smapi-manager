import { app, ipcMain } from "electron";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import openDirectory from "./events/open-directory";
import modifyDirectory from "./events/modify-directory";

import { MODIFY_DIRECTORY, OPEN_DIRECTORY } from "@common/constants/events";
import Logger from "@common/models/logger";

const logger = new Logger("main", "index");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(OPEN_DIRECTORY, openDirectory);
ipcMain.handle(MODIFY_DIRECTORY, modifyDirectory);
