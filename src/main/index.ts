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
import ProcessorType from "@common/constants/processor-type";
import Logger from "@common/models/logger";

const logger = new Logger(ProcessorType.MAIN, "index");

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(APP_INFO, getAppInfo);
ipcMain.handle(APP_METRICS, getAppMetrics);
ipcMain.handle(ELECTRON_INFO, getElectronInfo);

ipcMain.handle(FIND_DIRECTORY, findDirectory);
ipcMain.handle(OPEN_DIRECTORY, openDirectory);
ipcMain.handle(MODIFY_DIRECTORY, modifyDirectory);
