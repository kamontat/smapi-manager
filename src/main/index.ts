import { app, ipcMain, Menu } from "electron";

import ProcessorType from "@common/constants/processor-type";
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
  READ_CONFIG_ALL,
  OPEN_CONFIG_FILE,
} from "@common/event";
import MENU_BAR from "@common/constants/menu";
import { Logger, Global, DEBUG, ERROR } from "@common/logger";
import { isDevelopment } from "@common/utils/env";
import { ConfigStore } from "@common/storage";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import { getAppInfo, getAppMetrics, getElectronInfo } from "./events/appinfo";
import { loadXmlFile } from "./events/xml";
import { openConfigFile, readConfig, readConfigAll, readModConfigV2, writeConfig } from "./events/storage";
import findMods from "./events/find-mods";
import modifyDirectory from "./events/modify-directory";
import openDirectory from "./events/open-directory";

import Main from "./models/main";

Global.setLevel(isDevelopment() ? DEBUG : ERROR);
const logger = new Logger(ProcessorType.MAIN, "index");

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

Menu.setApplicationMenu(MENU_BAR);

const store = new ConfigStore();

const main = new Main(ipcMain, store);
main
  .handle(APP_INFO, getAppInfo)
  .handle(APP_METRICS, getAppMetrics)
  .handle(ELECTRON_INFO, getElectronInfo)
  .handle(FIND_MODS, findMods)
  .handle(LOAD_XML_FILE, loadXmlFile)
  .handle(OPEN_DIRECTORY_V2, openDirectory)
  .handle(MODIFY_DIRECTORY_V2, modifyDirectory)
  .handle(OPEN_CONFIG_FILE, openConfigFile)
  .handle(READ_CONFIG, readConfig)
  .handle(READ_CONFIG_ALL, readConfigAll)
  .handle(READ_MOD_CONFIG_V2, readModConfigV2)
  .handle(WRITE_CONFIG, writeConfig);
