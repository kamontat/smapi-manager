import { app, ipcMain, Menu } from "electron";
import Store from "electron-store";

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
  LOAD_XML_FILE,
} from "@common/constants/events";
import menu from "@common/constants/menu";
import ProcessorType from "@common/constants/processor-type";
import StorageType, { defaults as defaultStorage } from "@common/constants/storage-type";
import Logger, { Global, DEBUG, ERROR } from "@common/logger";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import findDirectory from "./events/find-directory";
import modifyDirectory from "./events/modify-directory";
import openDirectory from "./events/open-directory";
import { getAppInfo, getAppMetrics, getElectronInfo } from "./events/appinfo";
import { loadXmlFile } from "./events/xml";
import { readConfig, readModConfig, writeConfig } from "./events/storage";
import { isDevelopment } from "@common/utils/env";

Global.setLevel(isDevelopment() ? DEBUG : ERROR);

const logger = new Logger(ProcessorType.MAIN, "index");
const storage = new Store<StorageType>({
  name: "config",
  defaults: defaultStorage,
  encryptionKey: "secret-key",
});

Menu.setApplicationMenu(menu);

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(APP_INFO, getAppInfo);
ipcMain.handle(APP_METRICS, getAppMetrics);
ipcMain.handle(ELECTRON_INFO, getElectronInfo);

ipcMain.handle(FIND_DIRECTORY, findDirectory);
ipcMain.handle(LOAD_XML_FILE, loadXmlFile);
ipcMain.handle(OPEN_DIRECTORY, openDirectory);
ipcMain.handle(MODIFY_DIRECTORY, modifyDirectory);

ipcMain.handle(READ_CONFIG, readConfig(storage));
ipcMain.handle(READ_MOD_CONFIG, readModConfig(storage));
ipcMain.handle(WRITE_CONFIG, writeConfig(storage));
