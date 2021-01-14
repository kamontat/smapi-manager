import { app, ipcMain } from "electron";
import Store from "electron-store";

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
  READ_CONFIG,
  WRITE_CONFIG,
  READ_MOD_CONFIG,
} from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";
import StorageType, { defaults as defaultStorage } from "@common/constants/storage-type";
import Logger from "@common/models/logger";
import { readConfig, readModConfig, writeConfig } from "./events/storage";

const logger = new Logger(ProcessorType.MAIN, "index");
const storage = new Store<StorageType>({
  name: "config",
  defaults: defaultStorage,
  encryptionKey: "secret-key",
});

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(APP_INFO, getAppInfo);
ipcMain.handle(APP_METRICS, getAppMetrics);
ipcMain.handle(ELECTRON_INFO, getElectronInfo);

ipcMain.handle(FIND_DIRECTORY, findDirectory);
ipcMain.handle(OPEN_DIRECTORY, openDirectory);
ipcMain.handle(MODIFY_DIRECTORY, modifyDirectory);

ipcMain.handle(READ_CONFIG, readConfig(storage));
ipcMain.handle(READ_MOD_CONFIG, readModConfig(storage));
ipcMain.handle(WRITE_CONFIG, writeConfig(storage));
