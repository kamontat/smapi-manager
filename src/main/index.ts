import { app, ipcMain, Menu } from "electron";
import Store from "electron-store";

import ProcessorType from "@common/constants/processor-type";
import StorageType, { defaults as defaultStorageType } from "@common/constants/storage-type";
import {
  APP_INFO,
  APP_METRICS,
  ELECTRON_INFO,
  FIND_MODS,
  LOAD_XML_FILE,
  OPEN_DIRECTORY_V2,
  MODIFY_DIRECTORY_V2,
  READ_CONFIG,
  READ_MOD_CONFIG_V2,
  WRITE_CONFIG,
} from "@common/constants/events";
import MENU_BAR from "@common/constants/menu";
import { Logger, Global, DEBUG, ERROR } from "@common/logger";
import { isDevelopment } from "@common/utils/env";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import { getAppInfo, getAppMetrics, getElectronInfo } from "./events/appinfo";
import { loadXmlFile } from "./events/xml";
import { readConfig, readModConfigV2, writeConfig } from "./events/storage";
import findMods from "./events/find-mods";
import modifyDirectory from "./events/modify-directory";
import openDirectory from "./events/open-directory";

Global.setLevel(isDevelopment() ? DEBUG : ERROR);

const logger = new Logger(ProcessorType.MAIN, "index");
const storage = new Store<StorageType>({
  name: "config",
  defaults: defaultStorageType,
  encryptionKey: "secret-key",
});

Menu.setApplicationMenu(MENU_BAR);

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

ipcMain.handle(APP_INFO, getAppInfo);
ipcMain.handle(APP_METRICS, getAppMetrics);
ipcMain.handle(ELECTRON_INFO, getElectronInfo);

ipcMain.handle(FIND_MODS, findMods);
ipcMain.handle(LOAD_XML_FILE, loadXmlFile);
ipcMain.handle(OPEN_DIRECTORY_V2, openDirectory);

ipcMain.handle(MODIFY_DIRECTORY_V2, modifyDirectory);

ipcMain.handle(READ_CONFIG, readConfig(storage));
ipcMain.handle(READ_MOD_CONFIG_V2, readModConfigV2(storage));
ipcMain.handle(WRITE_CONFIG, writeConfig(storage));
